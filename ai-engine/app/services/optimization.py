from typing import List, Dict, Any

class Intervention:
    def __init__(
        self, 
        id: str, 
        name: str, 
        cost: float = 0.0, 
        cost_rate: float = 0.0, 
        flat_cost: float = 0.0,
        uplift_multiplier: float = 1.0, 
        treatment_key: str = None
    ):
        self.id = id
        self.name = name
        self.cost = cost if cost > 0 else flat_cost
        self.cost_rate = cost_rate      # Percentage of AOV (e.g. 0.05, 0.10)
        self.flat_cost = flat_cost      # Flat subsidy (e.g. 5.0 for shipping)
        self.uplift_multiplier = uplift_multiplier
        self.treatment_key = treatment_key

# Available growth interventions with realistic percentage cost rates and treatment keys
AVAILABLE_INTERVENTIONS = [
    Intervention(id="no_offer", name="No Intervention", cost=0.0, cost_rate=0.0, flat_cost=0.0, uplift_multiplier=0.0, treatment_key=None),
    Intervention(id="discount_5", name="5% Discount", cost=5.0, cost_rate=0.05, flat_cost=5.0, uplift_multiplier=1.0, treatment_key="5% Discount"),
    Intervention(id="cashback_10", name="10% Cashback", cost=10.0, cost_rate=0.10, flat_cost=10.0, uplift_multiplier=1.5, treatment_key="10% Cashback"),
    Intervention(id="free_shipping", name="Free Shipping", cost=8.0, cost_rate=0.0, flat_cost=8.0, uplift_multiplier=1.2, treatment_key="Free Shipping"),
]


def evaluate_interventions(
    customer_features: Dict[str, Any], 
    base_uplift: float, 
    margin_percentage: float = 0.30,
    merchant_aov: float = 50.0,
    use_percentage_cost: bool = False,
    treatment_uplifts: Dict[str, float] = None,
    treatment_models: Dict[str, Any] = None,
    control_model: Any = None
) -> List[Dict[str, Any]]:
    """
    Evaluates all available interventions for a given customer based on expected incremental profit and efficiency.
    Returns a list of evaluated interventions sorted by highest profit descending.
    """
    avg_order_value = customer_features.get("avg_order_value", 0.0)
    
    # If AOV is zero (no prior completed orders), use merchant historical AOV
    if avg_order_value <= 0:
        avg_order_value = merchant_aov if merchant_aov > 0 else 50.0

    evaluations = []
    
    for inv in AVAILABLE_INTERVENTIONS:
        if inv.id == "no_offer":
            evaluations.append({
                "intervention_id": "no_offer",
                "intervention_name": "No Intervention",
                "cost": 0.0,
                "expected_incremental_revenue": 0.0,
                "expected_incremental_profit": 0.0,
                "efficiency": 0.0
            })
            continue

        # Determine expected incremental conversion probability using learned treatment models if available
        if treatment_models and control_model and inv.treatment_key in treatment_models:
            # Predict P(Y=1 | X, T=t) - P(Y=1 | X, T=c)
            t_model = treatment_models[inv.treatment_key]
            # Build 1-row DataFrame for features
            import pandas as pd
            feat_names = getattr(t_model, "feature_names_in_", None)
            df_feat = pd.DataFrame([customer_features])
            if feat_names is not None:
                # Reindex safely for missing keys in partial test feature dicts
                df_feat = df_feat.reindex(columns=feat_names, fill_value=0.0)
            
            p_treat = float(t_model.predict_proba(df_feat)[:, 1][0])
            p_ctrl = float(control_model.predict_proba(df_feat)[:, 1][0])
            incremental_conversion_prob = p_treat - p_ctrl
        elif treatment_uplifts and inv.treatment_key in treatment_uplifts:
            incremental_conversion_prob = treatment_uplifts[inv.treatment_key]
        else:
            incremental_conversion_prob = base_uplift * inv.uplift_multiplier
        
        # Expected Incremental Revenue
        expected_incremental_revenue = incremental_conversion_prob * avg_order_value
        
        # Gross Margin Earned from incremental revenue
        gross_margin = expected_incremental_revenue * margin_percentage
        
        # Intervention cost calculation
        if use_percentage_cost and inv.cost_rate > 0:
            expected_cost = inv.cost_rate * avg_order_value
        elif inv.flat_cost > 0:
            expected_cost = inv.flat_cost
        else:
            expected_cost = inv.cost
        
        # Expected Incremental Profit
        expected_incremental_profit = gross_margin - expected_cost
        
        # Efficiency (Expected Profit per Dollar Spent)
        efficiency = (expected_incremental_profit / expected_cost) if expected_cost > 0 else 0.0
        
        evaluations.append({
            "intervention_id": inv.id,
            "intervention_name": inv.name,
            "cost": round(expected_cost, 4),
            "expected_incremental_revenue": round(expected_incremental_revenue, 4),
            "expected_incremental_profit": round(expected_incremental_profit, 4),
            "efficiency": round(efficiency, 4)
        })
        
    # Sort by profit descending
    evaluations.sort(key=lambda x: x["expected_incremental_profit"], reverse=True)
    return evaluations

def select_best_interventions(
    evaluations_by_customer: List[Dict[str, Any]], 
    budget: float = None,
    rank_by_efficiency: bool = False
) -> List[Dict[str, Any]]:
    """
    Given a list of evaluated customers, rank them globally and apply budget constraints
    with intelligent downgrade behavior: if the top intervention exceeds remaining budget,
    the customer is downgraded to the highest-performing affordable intervention before no_offer.
    """
    customer_candidates = []
    
    for cust_eval in evaluations_by_customer:
        customer_id = cust_eval["customer_id"]
        evals = cust_eval.get("evaluations", [])
        predicted_uplift = cust_eval.get("predicted_uplift", 0.0)
        
        # Filter to profitable non-zero options
        positive_evals = [e for e in evals if e["expected_incremental_profit"] > 0 and e["intervention_id"] != "no_offer"]
        
        if positive_evals:
            top_eval = positive_evals[0]
            metric = top_eval.get("efficiency", 0.0) if rank_by_efficiency else top_eval["expected_incremental_profit"]
        else:
            top_eval = next((e for e in evals if e["intervention_id"] == "no_offer"), {
                "intervention_id": "no_offer", "intervention_name": "No Intervention",
                "cost": 0.0, "expected_incremental_profit": 0.0, "efficiency": 0.0
            })
            metric = 0.0
            
        customer_candidates.append({
            "customer_id": customer_id,
            "predicted_uplift": predicted_uplift,
            "evaluations": evals,
            "positive_evals": positive_evals,
            "top_eval": top_eval,
            "rank_metric": metric
        })
        
    # Rank candidates globally
    customer_candidates.sort(key=lambda x: (x["rank_metric"], x["top_eval"]["expected_incremental_profit"]), reverse=True)
    
    final_recommendations = []
    current_spend = 0.0
    
    for candidate in customer_candidates:
        customer_id = candidate["customer_id"]
        predicted_uplift = candidate["predicted_uplift"]
        positive_evals = candidate["positive_evals"]
        
        assigned = None
        
        if not positive_evals:
            # No profitable option available
            assigned = {
                "customer_id": customer_id,
                "predicted_uplift": predicted_uplift,
                "recommended_intervention": "no_offer",
                "intervention_name": "No Intervention",
                "cost": 0.0,
                "expected_incremental_profit": 0.0
            }
        elif budget is None:
            # Unconstrained budget: allocate top profitable intervention
            best_opt = positive_evals[0]
            assigned = {
                "customer_id": customer_id,
                "predicted_uplift": predicted_uplift,
                "recommended_intervention": best_opt["intervention_id"],
                "intervention_name": best_opt["intervention_name"],
                "cost": best_opt["cost"],
                "expected_incremental_profit": best_opt["expected_incremental_profit"]
            }
        else:
            remaining_budget = budget - current_spend
            
            # Intelligent Downgrade: check available options in descending order of value
            # that fit within remaining budget
            for opt in positive_evals:
                if opt["cost"] <= remaining_budget:
                    assigned = {
                        "customer_id": customer_id,
                        "predicted_uplift": predicted_uplift,
                        "recommended_intervention": opt["intervention_id"],
                        "intervention_name": opt["intervention_name"],
                        "cost": opt["cost"],
                        "expected_incremental_profit": opt["expected_incremental_profit"]
                    }
                    current_spend += opt["cost"]
                    break
                    
            # If no positive-profit option fits the remaining budget, fall back to no_offer
            if assigned is None:
                assigned = {
                    "customer_id": customer_id,
                    "predicted_uplift": predicted_uplift,
                    "recommended_intervention": "no_offer",
                    "intervention_name": "No Intervention",
                    "cost": 0.0,
                    "expected_incremental_profit": 0.0
                }
                
        final_recommendations.append(assigned)
        
    return final_recommendations

