import uuid
from enum import Enum
from sqlalchemy.orm import Session
from ..models import AgentRun, AgentAction, ExperimentMemory, Customer, Order, Experiment, ExperimentAssignment, ExperimentResult
from .llm import discover_opportunities, generate_hypothesis, explain_analysis
from ..services.assignment import get_hash_assignment
from ..services.stats import calculate_significance
from ..services.profit import calculate_contribution_profit
from ..routers.ml import model, feature_names
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
            self.run_record.finalState = f"FAILED: {str(e)}"
            self.db.commit()
            return {"run_id": self.run_record.id, "status": "failed", "error": str(e), "trace": self.trace}

    def _observe(self):
        customers = self.db.query(Customer).filter(Customer.merchantId == self.merchant_id).all()
        orders = self.db.query(Order).filter(Order.merchantId == self.merchant_id).all()
        
        total_rev = sum([o.amount for o in orders])
        repeat_rate = len(set([o.customerId for o in orders])) / len(customers) if len(customers) > 0 else 0
        
        obs_data = {
            "total_customers": len(customers),
            "total_orders": len(orders),
            "total_revenue": total_rev,
            "repeat_rate": repeat_rate,
            "sample_customer_ids": [c.id for c in customers[:50]] # Just keep some sample IDs for predictions
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
        
        from ..services.features import extract_features
        
        # Predict uplift for the sampled customers to find targets
        sample_ids = self.state_data["observation"]["sample_customer_ids"]
        predictions = []
        for cid in sample_ids:
            features_dict = extract_features(self.db, cid)
            df_input = pd.DataFrame([features_dict])
            
            for col in feature_names:
                if col not in df_input.columns:
                    df_input[col] = 0.0
            
            prob_z1 = model.predict_proba(df_input[feature_names])[:, 1][0]
            uplift_score = float(2 * prob_z1 - 1)
            
            predictions.append({
                "customer_id": cid,
                "features": features_dict,
                "predicted_uplift": round(uplift_score, 4)
            })
                
        self.state_data["prediction"] = {"customers": predictions}
        self._log_action(State.PREDICT, {"sample_size": len(sample_ids)}, {"customers_predicted": len(predictions)})

    def _validate(self):
        # Phase 5 Statistical Validation logic on the predictions
        # We ensure predictions are bounded and valid before optimizing.
        # In a real system, we'd calculate confidence intervals on the uplift here.
        predictions = self.state_data["prediction"]["customers"]
        validated = []
        for p in predictions:
            # Simple validation: bound uplift between -1 and 1
            uplift = max(min(p["predicted_uplift"], 1.0), -1.0)
            p["predicted_uplift"] = uplift
            validated.append(p)
            
        self.state_data["validation"] = {"validated_customers": len(validated)}
        self._log_action(State.VALIDATE, {"customers_predicted": len(predictions)}, self.state_data["validation"])

    def _optimize(self):
        from ..services.optimization import evaluate_interventions
        
        predictions = self.state_data["prediction"]["customers"]
        evaluations_by_customer = []
        
        for p in predictions:
            evals = evaluate_interventions(p["features"], p["predicted_uplift"])
            evaluations_by_customer.append({
                "customer_id": p["customer_id"],
                "predicted_uplift": p["predicted_uplift"],
                "evaluations": evals
            })
            
        self.state_data["optimization"] = {"evaluations_by_customer": evaluations_by_customer}
        self._log_action(State.OPTIMIZE, {"customers_to_optimize": len(predictions)}, {"evaluated_customers": len(evaluations_by_customer)})

    def _recommend(self):
        from ..services.optimization import select_best_interventions
        
        evaluations = self.state_data["optimization"]["evaluations_by_customer"]
        # Use goal logic to parse budget if needed, but for now assume 100 or None
        # We will parse budget from self.goal if it contains 'budget:' for demonstration
        budget = None
        if "budget:" in self.goal.lower():
            try:
                budget_str = self.goal.lower().split("budget:")[1].strip().split()[0]
                budget = float(budget_str)
            except:
                budget = None
                
        final_recommendations = select_best_interventions(evaluations, budget)
        
        self.state_data["recommendation"] = {
            "budget_applied": budget,
            "final_recommendations": final_recommendations
        }
        
        self._log_action(State.RECOMMEND, {"budget": budget}, {"recommendations_count": len(final_recommendations)})

    def _output(self):
        recommendations = self.state_data["recommendation"]["final_recommendations"]
        
        total_expected_profit = sum(r["expected_incremental_profit"] for r in recommendations)
        total_cost = sum(r["cost"] for r in recommendations)
        
        self.state_data["output"] = {
            "total_expected_profit": total_expected_profit,
            "total_cost": total_cost,
            "recommendations": recommendations
        }
        self._log_action(State.OUTPUT, self.state_data["recommendation"], {"total_profit": total_expected_profit})
