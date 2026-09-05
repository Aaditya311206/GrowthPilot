from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from ..database import get_db
from ..models import Experiment, ExperimentAssignment, Order, ExperimentResult
from ..services.assignment import get_hash_assignment
from ..services.stats import calculate_significance
from ..services.profit import calculate_contribution_profit
import uuid

router = APIRouter(prefix="/experiments", tags=["Experiments"])

class AssignRequest(BaseModel):
    customer_id: str
    experiment_id: str
    traffic_split: int = 50

class EvaluateRequest(BaseModel):
    offer_cost_per_conversion: float
    margin_percentage: float = 0.30
    alpha: float = 0.05

@router.post("/assign")
def assign_customer(req: AssignRequest, db: Session = Depends(get_db)):
    """
    Randomized A/B assignment via MD5 hash with DB persistence.
    """
    arm = get_hash_assignment(db, req.customer_id, req.experiment_id, req.traffic_split)
    return {
        "customer_id": req.customer_id,
        "experiment_id": req.experiment_id,
        "assigned_group": arm.upper()
    }

@router.post("/evaluate/{experiment_id}")
def evaluate_experiment(experiment_id: str, req: EvaluateRequest, db: Session = Depends(get_db)):
    """
    Query exact populations from Postgres, calculate stats & profit, persist to DB.
    """
    # 1. Ensure experiment exists
    experiment = db.query(Experiment).filter(Experiment.id == experiment_id).first()
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")

    # 2. Query assignments for this experiment
    assignments = db.query(ExperimentAssignment).filter(ExperimentAssignment.experimentId == experiment_id).all()
    if not assignments:
        raise HTTPException(status_code=400, detail="No assignments found for this experiment")

    treat_customers = [a.customerId for a in assignments if a.arm == "treatment"]
    ctrl_customers = [a.customerId for a in assignments if a.arm == "control"]

    nobs_treat = len(treat_customers)
    nobs_ctrl = len(ctrl_customers)

    if nobs_treat == 0 or nobs_ctrl == 0:
        raise HTTPException(status_code=400, detail="Both treatment and control groups must have assigned users.")

    # 3. Query related orders with canonical valid completed statuses
    completed_statuses = {'completed', 'captured', 'success'}
    
    treat_orders_raw = db.query(Order).filter(Order.customerId.in_(treat_customers)).all()
    ctrl_orders_raw = db.query(Order).filter(Order.customerId.in_(ctrl_customers)).all()
    
    treat_orders = [o for o in treat_orders_raw if o.status and o.status.strip().lower() in completed_statuses]
    ctrl_orders = [o for o in ctrl_orders_raw if o.status and o.status.strip().lower() in completed_statuses]

    # Conversions (number of distinct customers who bought)
    treat_conv = len(set([o.customerId for o in treat_orders]))
    ctrl_conv = len(set([o.customerId for o in ctrl_orders]))

    # Revenues
    treat_rev = sum([o.amount for o in treat_orders])
    ctrl_rev = sum([o.amount for o in ctrl_orders])

    # 4. Statistical Tests
    stats_res = calculate_significance(
        count_treat=treat_conv,
        count_ctrl=ctrl_conv,
        nobs_treat=nobs_treat,
        nobs_ctrl=nobs_ctrl,
        alpha=req.alpha
    )

    # 5. Profit Math
    profit_res = calculate_contribution_profit(
        treatment_users=nobs_treat,
        control_users=nobs_ctrl,
        treatment_revenue=treat_rev,
        control_revenue=ctrl_rev,
        treatment_conversions=treat_conv,
        offer_cost_per_conversion=req.offer_cost_per_conversion,
        margin_percentage=req.margin_percentage
    )

    # Absolute Lift
    treat_rate = treat_conv / nobs_treat
    ctrl_rate = ctrl_conv / nobs_ctrl
    lift = treat_rate - ctrl_rate

    explanation = (
        f"Treat Conv: {treat_rate:.2%} | Ctrl Conv: {ctrl_rate:.2%} | "
        f"Significant: {stats_res['is_significant']} | Profitable: {profit_res['is_profitable']}"
    )

    # 6. Save or update ExperimentResult
    result = db.query(ExperimentResult).filter(ExperimentResult.experimentId == experiment_id).first()
    if not result:
        result = ExperimentResult(
            id=str(uuid.uuid4()),
            experimentId=experiment_id
        )
        db.add(result)
        
    result.lift = lift
    result.pValue = stats_res["p_value"]
    result.confidenceInterval = f"T:{stats_res['ci_treat']} C:{stats_res['ci_ctrl']}"
    result.incrementalRevenue = profit_res["incremental_revenue"]
    result.incrementalProfit = profit_res["net_contribution_profit"]
    result.explanationText = explanation

    experiment.status = "analyzed"
    db.commit()

    return {
        "status": "success",
        "populations": {
            "treatment": nobs_treat,
            "control": nobs_ctrl
        },
        "metrics": {
            "treatment_conversions": treat_conv,
            "control_conversions": ctrl_conv,
            "treatment_revenue": treat_rev,
            "control_revenue": ctrl_rev
        },
        "statistics": stats_res,
        "profitability": profit_res,
        "summary": explanation
    }
