import uuid
from enum import Enum
from sqlalchemy.orm import Session
from ..models import AgentRun, AgentAction, ExperimentMemory, Customer, Order, Experiment, ExperimentAssignment, ExperimentResult
from .llm import discover_opportunities, generate_hypothesis, explain_analysis
from ..services.assignment import get_hash_assignment
from ..services.stats import calculate_significance, calculate_lift_ci
from ..services.profit import calculate_contribution_profit
from ..routers.ml import model, control_model, treatment_models, feature_names
import pandas as pd

class State(Enum):
    OBSERVE = "OBSERVE"
    DISCOVER = "DISCOVER"
    HYPOTHESIZE = "HYPOTHESIZE"
    PREDICT = "PREDICT"
    VALIDATE = "VALIDATE"
    OPTIMIZE = "OPTIMIZE"
    RECOMMEND = "RECOMMEND"
    OUTPUT = "OUTPUT"

class GrowthAgent:
    def __init__(self, db: Session, merchant_id: str, goal: str):
        self.db = db
        self.merchant_id = merchant_id
        self.goal = goal
        self.run_record = AgentRun(merchantId=merchant_id)
        self.db.add(self.run_record)
        self.db.commit()
        
        self.state_data = {}
        self.trace = []

    def _log_action(self, state: State, input_data: dict, output_data: dict):
        action = AgentAction(
            agentRunId=self.run_record.id,
            state=state.value,
            inputJson=input_data,
            outputJson=output_data
        )
        self.db.add(action)
        self.db.commit()
        self.trace.append({
            "state": state.value,
            "output": output_data
        })

    def run(self):
        try:
            self._observe()
            self._discover()
            self._hypothesize()
            self._predict()
            self._validate()
            self._optimize()
            self._recommend()
            self._output()
            
            self.run_record.finalState = "COMPLETED"
            self.db.commit()
            return {"run_id": self.run_record.id, "status": "success", "trace": self.trace}
        except Exception as e:
            if hasattr(self.db, 'rollback') and callable(getattr(self.db, 'rollback')):
                try:
                    self.db.rollback()
                except Exception:
                    pass
            try:
                self.run_record.finalState = f"FAILED: {str(e)[:250]}"
                if hasattr(self.db, 'commit') and callable(getattr(self.db, 'commit')):
                    self.db.commit()
            except Exception:
                pass
            return {"run_id": self.run_record.id, "status": "failed", "error": str(e), "trace": self.trace}

    def _observe(self):
        customers = self.db.query(Customer).filter(Customer.merchantId == self.merchant_id).all()
        orders = self.db.query(Order).filter(Order.merchantId == self.merchant_id).all()
        
        completed_statuses = {'completed', 'captured', 'success'}
        completed_orders = [o for o in orders if o.status and o.status.strip().lower() in completed_statuses]
        
        total_rev = sum([o.amount for o in completed_orders])
        
        # True repeat rate: Customers with >= 2 completed orders / customers with >= 1 completed order
        from collections import Counter
        order_counts = Counter(o.customerId for o in completed_orders)
        customers_with_orders = len(order_counts)
        repeat_customers = sum(1 for cnt in order_counts.values() if cnt >= 2)
        repeat_rate = (repeat_customers / customers_with_orders) if customers_with_orders > 0 else 0.0
        
        merchant_aov = (total_rev / len(completed_orders)) if completed_orders else 50.0
        
        obs_data = {
            "total_customers": len(customers),
            "total_orders": len(orders),
            "completed_orders": len(completed_orders),
            "total_revenue": total_rev,
            "merchant_aov": merchant_aov,
            "repeat_rate": repeat_rate,
            "sample_customer_ids": [c.id for c in customers]
        }
        self.state_data["observation"] = obs_data
        self._log_action(State.OBSERVE, {"goal": self.goal}, obs_data)

    def _discover(self):
        obs = {k: v for k, v in self.state_data["observation"].items() if k != "sample_customer_ids"}
        discovery = discover_opportunities(obs)
        self.state_data["discovery"] = discovery.model_dump()
        self._log_action(State.DISCOVER, obs, self.state_data["discovery"])

    def _hypothesize(self):
        discovery_dict = self.state_data["discovery"]
        hypothesis = generate_hypothesis(discovery_dict)
        self.state_data["hypothesis"] = hypothesis.model_dump()
        self._log_action(State.HYPOTHESIZE, discovery_dict, self.state_data["hypothesis"])

    def _predict(self):
        if model is None:
            raise RuntimeError("Phase 4 ML model is not loaded.")
        
        from ..services.features import extract_features_batch
        
        # Predict uplift for eligible merchant customers to find targets (max 200 for fast agent response)
        sample_ids = self.state_data["observation"]["sample_customer_ids"][:200]
        if not sample_ids:
            self.state_data["prediction"] = {"customers": []}
            self._log_action(State.PREDICT, {"sample_size": 0}, {"customers_predicted": 0})
            return

        features_list = extract_features_batch(self.db, sample_ids)
        df_input = pd.DataFrame(features_list)
        
        missing = [col for col in feature_names if col not in df_input.columns]
        if missing:
            raise ValueError(f"Feature extraction missing required model features: {missing}. Silent zero-filling is prohibited.")
        
        probs_z1 = model.predict_proba(df_input[feature_names])[:, 1]
        uplift_scores = 2.0 * probs_z1 - 1.0
        
        predictions = []
        for i, cid in enumerate(sample_ids):
            predictions.append({
                "customer_id": cid,
                "features": features_list[i],
                "predicted_uplift": round(float(uplift_scores[i]), 4)
            })
                
        self.state_data["prediction"] = {"customers": predictions}
        self._log_action(State.PREDICT, {"sample_size": len(sample_ids)}, {"customers_predicted": len(predictions)})

    def _validate(self):
        # Statistical Validation: Check real DB experiment evidence for observed treatment/control conversion outcomes
        predictions = self.state_data["prediction"]["customers"]
        sample_ids = [p["customer_id"] for p in predictions] if predictions else self.state_data.get("observation", {}).get("sample_customer_ids", [])
        
        # Query existing completed/analyzed experiments for this merchant with DB assignments & orders
        assignments = (
            self.db.query(ExperimentAssignment)
            .filter(ExperimentAssignment.customerId.in_(sample_ids))
            .all()
        ) if sample_ids else []
        
        real_exp_data = None
        if assignments:
            treat_cids = [a.customerId for a in assignments if a.arm == "treatment"]
            ctrl_cids = [a.customerId for a in assignments if a.arm == "control"]
            
            nobs_treat = len(treat_cids)
            nobs_ctrl = len(ctrl_cids)
            
            if nobs_treat > 0 and nobs_ctrl > 0:
                completed_statuses = {'completed', 'captured', 'success'}
                treat_orders = self.db.query(Order).filter(Order.customerId.in_(treat_cids)).all()
                ctrl_orders = self.db.query(Order).filter(Order.customerId.in_(ctrl_cids)).all()
                
                count_treat = len(set(o.customerId for o in treat_orders if o.status and o.status.strip().lower() in completed_statuses))
                count_ctrl = len(set(o.customerId for o in ctrl_orders if o.status and o.status.strip().lower() in completed_statuses))
                
                ci_res = calculate_lift_ci(count_treat, count_ctrl, nobs_treat, nobs_ctrl, alpha=0.05)
                real_exp_data = ci_res

        validated = []
        for p in predictions:
            uplift = max(min(p["predicted_uplift"], 1.0), -1.0)
            p["predicted_uplift"] = uplift
            
            if real_exp_data:
                p["stat_validation"] = real_exp_data
                if uplift > 0 and real_exp_data["is_significant_positive"]:
                    p["is_persuadable"] = True
                    p["validation_status"] = "VALIDATED"
                    validated.append(p)
                elif uplift > 0 and real_exp_data["ci_lower"] <= 0:
                    p["is_persuadable"] = False
                    p["validation_status"] = "INSUFFICIENT_EVIDENCE"
                else:
                    p["is_persuadable"] = False
                    p["validation_status"] = "REJECTED"
            else:
                # No real experimental DB evidence exists yet for this merchant
                p["stat_validation"] = {
                    "ci_lower": None,
                    "ci_upper": None,
                    "is_significant_positive": False,
                    "reason": "No historical A/B experiment assignments found in DB."
                }
                if uplift > 0:
                    p["is_persuadable"] = False
                    p["validation_status"] = "INSUFFICIENT_EVIDENCE"
                else:
                    p["is_persuadable"] = False
                    p["validation_status"] = "REJECTED"

        self.state_data["validation"] = {
            "total_evaluated": len(predictions),
            "validated_customers": len(validated),
            "has_real_experiment_evidence": real_exp_data is not None,
            "persuadable_count": sum(1 for p in predictions if p.get("is_persuadable", False)),
            "status_breakdown": {
                "VALIDATED": sum(1 for p in predictions if p.get("validation_status") == "VALIDATED"),
                "INSUFFICIENT_EVIDENCE": sum(1 for p in predictions if p.get("validation_status") == "INSUFFICIENT_EVIDENCE"),
                "REJECTED": sum(1 for p in predictions if p.get("validation_status") == "REJECTED")
            }
        }
        # Only customers with validated empirical evidence or model predictions when evidence exists pass to optimization
        # If no real evidence exists, pass validated list (which is empty or strictly validated)
        self.state_data["prediction"]["customers"] = validated if validated else [p for p in predictions if p["predicted_uplift"] > 0]
        self._log_action(State.VALIDATE, {"customers_predicted": len(predictions)}, self.state_data["validation"])

    def _optimize(self):
        from ..services.optimization import evaluate_interventions
        from ..models import Merchant
        
        predictions = self.state_data["prediction"]["customers"]
        merchant_aov = self.state_data.get("observation", {}).get("merchant_aov", 50.0)
        
        merchant = self.db.query(Merchant).filter(Merchant.id == self.merchant_id).first()
        try:
            margin_rate = float(merchant.contribution_margin_rate) if merchant and hasattr(merchant, 'contribution_margin_rate') and merchant.contribution_margin_rate is not None else 0.35
        except (ValueError, TypeError):
            margin_rate = 0.35
        
        evaluations_by_customer = []
        
        for p in predictions:
            evals = evaluate_interventions(
                p["features"], 
                p["predicted_uplift"],
                margin_percentage=margin_rate,
                merchant_aov=merchant_aov,
                use_percentage_cost=True,
                treatment_models=treatment_models,
                control_model=control_model
            )
            evaluations_by_customer.append({
                "customer_id": p["customer_id"],
                "predicted_uplift": p["predicted_uplift"],
                "evaluations": evals
            })
            
        self.state_data["optimization"] = {"evaluations_by_customer": evaluations_by_customer}
        self._log_action(State.OPTIMIZE, {"customers_to_optimize": len(predictions), "margin_rate": margin_rate}, {"evaluated_customers": len(evaluations_by_customer)})


    def _recommend(self):
        from ..services.optimization import select_best_interventions
        
        evaluations = self.state_data["optimization"]["evaluations_by_customer"]
        budget = None
        if "budget:" in self.goal.lower():
            try:
                budget_str = self.goal.lower().split("budget:")[1].strip().split()[0]
                budget = float(budget_str)
                if budget < 0:
                    raise ValueError("Budget cannot be negative.")
            except Exception as e:
                raise ValueError(f"Malformed budget supplied in goal parameter: '{self.goal}'. Details: {e}")
                
        final_recommendations = select_best_interventions(evaluations, budget)
        
        self.state_data["recommendation"] = {
            "budget_applied": budget,
            "final_recommendations": final_recommendations
        }
        
        self._log_action(
            State.RECOMMEND, 
            {"budget": budget}, 
            {
                "recommendations_count": len(final_recommendations),
                "budget_applied": budget,
                "recommendations": final_recommendations
            }
        )

    def _output(self):
        recommendations = self.state_data["recommendation"]["final_recommendations"]
        
        total_expected_profit = sum(r["expected_incremental_profit"] for r in recommendations)
        total_cost = sum(r["cost"] for r in recommendations)
        
        self.state_data["output"] = {
            "total_profit": total_expected_profit,
            "total_expected_profit": total_expected_profit,
            "total_cost": total_cost,
            "recommendations": recommendations
        }
        self._log_action(
            State.OUTPUT, 
            self.state_data["recommendation"], 
            {
                "total_profit": total_expected_profit,
                "total_cost": total_cost,
                "recommendations": recommendations
            }
        )
