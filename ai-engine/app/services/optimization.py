from typing import List, Dict, Any

class Intervention:
    def __init__(self, id: str, name: str, cost: float, uplift_multiplier: float):
        self.id = id
        self.name = name
        self.cost = cost
        self.uplift_multiplier = uplift_multiplier

# Define static interventions based on standard e-commerce growth strategies
AVAILABLE_INTERVENTIONS = [
    Intervention(id="no_offer", name="No Intervention", cost=0.0, uplift_multiplier=0.0),
    Intervention(id="discount_5", name="5% Discount", cost=5.0, uplift_multiplier=1.0),
    Intervention(id="cashback_10", name="10% Cashback", cost=10.0, uplift_multiplier=1.5),
    Intervention(id="free_shipping", name="Free Shipping", cost=8.0, uplift_multiplier=1.2),
]

def evaluate_interventions(customer_features: Dict[str, Any], base_uplift: float, margin_percentage: float = 0.30) -> List[Dict[str, Any]]:
    """
    Evaluates all available interventions for a given customer based on expected incremental profit.
    Returns a list of evaluated interventions sorted by highest profit.
    """
    avg_order_value = customer_features.get("avg_order_value", 0.0)
    
    # If AOV is zero (no prior orders), assume a default average value for optimization purposes (e.g., $50)
    # This prevents new customers from always receiving negative expected profit.
    if avg_order_value <= 0:
        avg_order_value = 50.0

    evaluations = []
    
    for inv in AVAILABLE_INTERVENTIONS:
        # Expected incremental conversion probability caused by the intervention
        incremental_conversion_prob = base_uplift * inv.uplift_multiplier
        
        # Expected Incremental Revenue
        expected_incremental_revenue = incremental_conversion_prob * avg_order_value
        
        # Gross Margin Earned from incremental revenue
        gross_margin = expected_incremental_revenue * margin_percentage
        
        # Expected Intervention Cost
        # Note: Cost is usually incurred on all conversions (baseline + incremental), 
        # but for simplicity and strict incremental optimization, we evaluate cost against the incremental benefit.
        # Cost is deterministic if they use it. We assume cost applies to the conversion event.
        # We will assume a simplified uniform cost of the intervention if applied.
        expected_cost = inv.cost
        
        # Expected Incremental Profit
        expected_incremental_profit = gross_margin - expected_cost
        
        evaluations.append({
            "intervention_id": inv.id,
            "intervention_name": inv.name,
            "cost": inv.cost,
            "expected_incremental_revenue": round(expected_incremental_revenue, 4),
            "expected_incremental_profit": round(expected_incremental_profit, 4)
        })
        
    # Sort by profit descending
    evaluations.sort(key=lambda x: x["expected_incremental_profit"], reverse=True)
    return evaluations

def select_best_interventions(evaluations_by_customer: List[Dict[str, Any]], budget: float = None) -> List[Dict[str, Any]]:
    """
    Given a list of evaluated customers (each with their best intervention),
    rank them globally by Expected Incremental Profit and apply budget constraints.
    """
    # Flatten to get the top positive profit intervention per customer
    best_picks = []
    for cust_eval in evaluations_by_customer:
        customer_id = cust_eval["customer_id"]
        evals = cust_eval["evaluations"]
        predicted_uplift = cust_eval["predicted_uplift"]
        
        # Select the highest profit intervention that is strictly positive
        # If none are positive, or the best is "no_offer", we default to "no_offer".
        best_inv = evals[0]
        
        if best_inv["expected_incremental_profit"] <= 0:
            # Fallback to no intervention
            best_inv = next((e for e in evals if e["intervention_id"] == "no_offer"), evals[-1])
            
        best_picks.append({
            "customer_id": customer_id,
            "predicted_uplift": predicted_uplift,
            "recommended_intervention": best_inv["intervention_id"],
            "intervention_name": best_inv["intervention_name"],
            "cost": best_inv["cost"],
            "expected_incremental_profit": best_inv["expected_incremental_profit"]
        })
        
    # Rank all picks globally by expected profit descending
    best_picks.sort(key=lambda x: x["expected_incremental_profit"], reverse=True)
    
    # Apply budget constraint
    final_recommendations = []
    current_spend = 0.0
    
    for pick in best_picks:
        if pick["recommended_intervention"] == "no_offer":
            final_recommendations.append(pick)
            continue
            
        if budget is not None:
            if current_spend + pick["cost"] <= budget:
                final_recommendations.append(pick)
                current_spend += pick["cost"]
            else:
                # Can't afford this one, switch to no_offer
                no_offer = {
                    "customer_id": pick["customer_id"],
                    "predicted_uplift": pick["predicted_uplift"],
                    "recommended_intervention": "no_offer",
                    "intervention_name": "No Intervention",
                    "cost": 0.0,
                    "expected_incremental_profit": 0.0
                }
                final_recommendations.append(no_offer)
        else:
            final_recommendations.append(pick)
            
    return final_recommendations
