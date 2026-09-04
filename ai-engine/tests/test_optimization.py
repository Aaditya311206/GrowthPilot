import pytest
from app.services.optimization import evaluate_interventions, select_best_interventions

def test_evaluate_interventions_positive_profit():
    # Base uplift: 0.1, AOV: 100
    # Expected EIR for 5% Discount (mult 1.0): 0.1 * 1.0 * 100 = 10. Margin = 3. Cost = 5. EIP = -2
    # Expected EIR for 10% Cashback (mult 1.5): 0.1 * 1.5 * 100 = 15. Margin = 4.5. Cost = 10. EIP = -5.5
    # Wait, let's use a higher AOV: 500
    # 5% discount EIR: 0.1 * 1.0 * 500 = 50. Margin (30%)=15. Cost=5. EIP = 10.
    features = {"avg_order_value": 500.0}
    evals = evaluate_interventions(features, 0.1)
    
    # 10% Cashback: EIR = 0.1 * 1.5 * 500 = 75. Margin = 22.5. Cost = 10. EIP = 12.5.
    assert evals[0]["intervention_id"] == "cashback_10"
    assert evals[0]["expected_incremental_profit"] == 12.5
    assert evals[1]["intervention_id"] == "discount_5"
    assert evals[1]["expected_incremental_profit"] == 10.0

def test_evaluate_interventions_negative_profit():
    # Low AOV: 50. Base uplift: 0.02.
    # 5% Discount: EIR = 0.02 * 1.0 * 50 = 1.0. Margin = 0.3. Cost = 5. EIP = -4.7
    features = {"avg_order_value": 50.0}
    evals = evaluate_interventions(features, 0.02)
    
    assert evals[0]["intervention_id"] == "no_offer"
    assert evals[0]["expected_incremental_profit"] == 0.0

def test_evaluate_interventions_zero_aov():
    # New customer with 0 AOV should default to $50 AOV inside the function.
    features = {"avg_order_value": 0.0}
    # Base uplift: 0.5 (very high)
    # 5% Discount EIR: 0.5 * 1.0 * 50 = 25. Margin = 7.5. Cost = 5. EIP = 2.5
    evals = evaluate_interventions(features, 0.5)
    
    assert evals[0]["intervention_id"] == "discount_5"
    assert evals[0]["expected_incremental_profit"] == 2.5

def test_select_best_interventions_budget_unconstrained():
    evals_by_cust = [
        {
            "customer_id": "c1", "predicted_uplift": 0.1,
            "evaluations": [
                {"intervention_id": "cashback_10", "intervention_name": "10% CB", "cost": 10.0, "expected_incremental_profit": 50.0}
            ]
        },
        {
            "customer_id": "c2", "predicted_uplift": 0.1,
            "evaluations": [
                {"intervention_id": "discount_5", "intervention_name": "5% D", "cost": 5.0, "expected_incremental_profit": 20.0}
            ]
        }
    ]
    picks = select_best_interventions(evals_by_cust, budget=None)
    assert len(picks) == 2
    assert picks[0]["customer_id"] == "c1"  # ranked higher by profit
    assert picks[1]["customer_id"] == "c2"

def test_select_best_interventions_budget_exhausted():
    evals_by_cust = [
        {
            "customer_id": "c1", "predicted_uplift": 0.1,
            "evaluations": [
                {"intervention_id": "cashback_10", "intervention_name": "10% CB", "cost": 10.0, "expected_incremental_profit": 50.0}
            ]
        },
        {
            "customer_id": "c2", "predicted_uplift": 0.1,
            "evaluations": [
                {"intervention_id": "discount_5", "intervention_name": "5% D", "cost": 5.0, "expected_incremental_profit": 20.0}
            ]
        }
    ]
    picks = select_best_interventions(evals_by_cust, budget=12.0)
    
    # c1 costs 10, so it gets the intervention.
    # Budget remaining = 2.0. c2 costs 5.0, so it gets no_offer.
    assert picks[0]["customer_id"] == "c1"
    assert picks[0]["recommended_intervention"] == "cashback_10"
    
    assert picks[1]["customer_id"] == "c2"
    assert picks[1]["recommended_intervention"] == "no_offer"
    assert picks[1]["expected_incremental_profit"] == 0.0
