import pytest
from app.services.stats import calculate_significance
from app.services.profit import calculate_contribution_profit

def test_significance_zero_conversion():
    # Edge case: nobs > 0, but exactly 0 conversions
    res = calculate_significance(
        count_treat=0, count_ctrl=0,
        nobs_treat=100, nobs_ctrl=100
    )
    assert res["z_statistic"] == 0.0
    assert res["p_value"] == 1.0
    assert res["is_significant"] is False
    assert res["ci_treat"] == (0.0, 0.0)

def test_significance_zero_users():
    # Edge case: no users
    res = calculate_significance(
        count_treat=10, count_ctrl=10,
        nobs_treat=0, nobs_ctrl=0
    )
    assert res["z_statistic"] == 0.0
    assert res["p_value"] == 1.0

def test_profit_calculation_profitable():
    res = calculate_contribution_profit(
        treatment_users=100,
        control_users=100,
        treatment_revenue=1500.0,
        control_revenue=1000.0,
        treatment_conversions=15,
        offer_cost_per_conversion=10.0,
        margin_percentage=0.30
    )
    # Incremental Revenue = 500
    # Margin Earned = 150
    # Cost = 150
    # Net = 0
    assert res["incremental_revenue"] == 500.0
    assert res["gross_margin_earned"] == 150.0
    assert res["total_intervention_cost"] == 150.0
    assert res["net_contribution_profit"] == 0.0
    assert res["is_profitable"] is False # strictly greater than 0

def test_profit_calculation_unprofitable():
    res = calculate_contribution_profit(
        treatment_users=100,
        control_users=100,
        treatment_revenue=1100.0,
        control_revenue=1000.0,
        treatment_conversions=11,
        offer_cost_per_conversion=10.0,
        margin_percentage=0.30
    )
    # Incremental Revenue = 100
    # Margin = 30
    # Cost = 110
    # Net = -80
    assert res["net_contribution_profit"] == -80.0
    assert res["is_profitable"] is False

def test_profit_calculation_profitable_true():
    res = calculate_contribution_profit(
        treatment_users=100,
        control_users=100,
        treatment_revenue=2000.0,
        control_revenue=1000.0,
        treatment_conversions=20,
        offer_cost_per_conversion=5.0,
        margin_percentage=0.30
    )
    # Incremental Rev = 1000
    # Margin = 300
    # Cost = 100
    # Net = 200
    assert res["net_contribution_profit"] == 200.0
    assert res["is_profitable"] is True
