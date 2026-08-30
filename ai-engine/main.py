# ai-engine/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os
from statsmodels.stats.proportion import proportions_ztest

app = FastAPI(
    title="GrowthPilot AI Engine",
    description="Causal ML Inference, A/B Assignment, and Contribution Profit Engine",
    version="1.0"
)

# Global variables for model storage
model_artifact = None
model = None
feature_names = []

@app.on_event("startup")
def load_model_artifact():
    global model_artifact, model, feature_names
    model_path = os.path.join(os.path.dirname(__file__), "models", "trained_model.pkl")
    
    if not os.path.exists(model_path):
        print(f"WARNING: Model artifact not found at {model_path}. Train the model in Phase 4 first.")
        return

    model_artifact = joblib.load(model_path)
    model = model_artifact["model"]
    feature_names = model_artifact["features"]
    print(f"SUCCESS: Loaded Causal ML model with {len(feature_names)} features.")

# -------------------------------------------------------------------
# Request Schemas
# -------------------------------------------------------------------

class CustomerFeatures(BaseModel):
    customer_id: str
    total_orders: float = 0.0
    total_spent: float = 0.0
    avg_order_value: float = 0.0
    last_order_days_ago: float = 999.0
    pay_count_upi: float = 0.0
    pay_count_card: float = 0.0
    pay_count_netbanking: float = 0.0
    pay_count_wallet: float = 0.0

class ProfitCalculationRequest(BaseModel):
    treatment_users: int
    control_users: int
    treatment_conversions: int
    control_conversions: int
    treatment_revenue: float
    control_revenue: float
    offer_cost_per_conversion: float
    margin_percentage: float = 0.30

class SignificanceTestRequest(BaseModel):
    treatment_users: int
    control_users: int
    treatment_conversions: int
    control_conversions: int
    alpha: float = 0.05

# -------------------------------------------------------------------
# Endpoints
# -------------------------------------------------------------------

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "GrowthPilot Experiment & Profit Engine",
        "model_loaded": model is not None
    }

@app.post("/predict-uplift")
def predict_uplift(customer: CustomerFeatures):
    if model is None:
        raise HTTPException(status_code=500, detail="Model artifact is not loaded.")

    input_dict = customer.dict()
    df_input = pd.DataFrame([input_dict])

    for col in feature_names:
        if col not in df_input.columns:
            df_input[col] = 0.0

    X = df_input[feature_names]

    prob_z1 = model.predict_proba(X)[:, 1][0]
    uplift_score = float(2 * prob_z1 - 1)

    should_target = uplift_score > 0.10
    assigned_group = "TREATMENT" if should_target else "CONTROL"

    return {
        "customer_id": customer.customer_id,
        "uplift_score": round(uplift_score, 4),
        "assigned_group": assigned_group,
        "recommended_action": "Send Offer / Incentive" if should_target else "Do Not Target (Save Margin)"
    }

@app.post("/calculate-profit")
def calculate_profit(req: ProfitCalculationRequest):
    if req.treatment_users <= 0 or req.control_users <= 0:
        raise HTTPException(status_code=400, detail="Treatment and Control user counts must be greater than zero.")

    treat_conv_rate = req.treatment_conversions / req.treatment_users
    control_conv_rate = req.control_conversions / req.control_users
    incremental_lift = treat_conv_rate - control_conv_rate

    expected_control_revenue_per_user = req.control_revenue / req.control_users
    baseline_expected_revenue = req.treatment_users * expected_control_revenue_per_user
    incremental_revenue = req.treatment_revenue - baseline_expected_revenue

    total_intervention_cost = req.treatment_conversions * req.offer_cost_per_conversion
    gross_margin_earned = incremental_revenue * req.margin_percentage
    net_contribution_profit = gross_margin_earned - total_intervention_cost

    is_profitable = net_contribution_profit > 0

    return {
        "treatment_conversion_rate": round(treat_conv_rate, 4),
        "control_conversion_rate": round(control_conv_rate, 4),
        "incremental_lift_percentage": f"{incremental_lift:+.2%}",
        "incremental_revenue": round(incremental_revenue, 2),
        "total_intervention_cost": round(total_intervention_cost, 2),
        "gross_margin_earned": round(gross_margin_earned, 2),
        "net_contribution_profit": round(net_contribution_profit, 2),
        "is_profitable": is_profitable,
        "verdict": "PROFITABLE EXPERIMENT" if is_profitable else "UNPROFITABLE EXPERIMENT (Margin Eaten by Incentive)"
    }

@app.post("/evaluate-experiment")
def evaluate_experiment(req: SignificanceTestRequest):
    if req.treatment_users <= 0 or req.control_users <= 0:
        raise HTTPException(status_code=400, detail="User counts must be greater than zero.")

    treat_conv_rate = req.treatment_conversions / req.treatment_users
    control_conv_rate = req.control_conversions / req.control_users
    absolute_lift = treat_conv_rate - control_conv_rate
    relative_lift = (absolute_lift / control_conv_rate) if control_conv_rate > 0 else 0.0

    count = np.array([req.treatment_conversions, req.control_conversions])
    nobs = np.array([req.treatment_users, req.control_users])

    z_stat, p_value = proportions_ztest(count, nobs, alternative='larger')

    is_significant = bool(p_value < req.alpha)

    if is_significant and absolute_lift > 0:
        verdict = "VALIDATED: Treatment effect is statistically significant. Roll out intervention to segment."
    elif is_significant and absolute_lift <= 0:
        verdict = "HARMFUL: Treatment significantly reduced conversions (Sleeping Dogs). Stop intervention."
    else:
        verdict = "INCONCLUSIVE: Observed difference is not statistically significant. Continue experiment or increase sample size."

    return {
        "treatment_conversion_rate": round(treat_conv_rate, 4),
        "control_conversion_rate": round(control_conv_rate, 4),
        "absolute_lift": f"{absolute_lift:+.2%}",
        "relative_lift": f"{relative_lift:+.2%}",
        "z_statistic": round(float(z_stat), 4),
        "p_value": round(float(p_value), 5),
        "confidence_level": f"{(1 - req.alpha):.0%}",
        "is_statistically_significant": is_significant,
        "verdict": verdict
    }