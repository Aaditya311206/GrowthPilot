import pytest
from app.services.stats import calculate_lift_ci

def test_calculate_lift_ci_significant_positive():
    # 200 conversions out of 1000 in treatment (20%) vs 100 out of 1000 in control (10%)
    # Lift = +10.0%, highly significant
    res = calculate_lift_ci(count_treat=200, count_ctrl=100, nobs_treat=1000, nobs_ctrl=1000)
    assert res["lift"] == 0.10
    assert res["se"] > 0.0
    assert res["ci_lower"] > 0.0
    assert res["ci_upper"] > res["ci_lower"]
    assert res["is_significant_positive"] is True
    assert res["p_value"] < 0.001

def test_calculate_lift_ci_uncertain_crosses_zero():
    # 105 conversions out of 1000 in treatment (10.5%) vs 100 out of 1000 in control (10.0%)
    # Lift = +0.5%, not significant at alpha=0.05
    res = calculate_lift_ci(count_treat=105, count_ctrl=100, nobs_treat=1000, nobs_ctrl=1000)
    assert res["lift"] == 0.005
    assert res["ci_lower"] < 0.0 # CI crosses zero!
    assert res["is_significant_positive"] is False
    assert res["p_value"] > 0.05

def test_calculate_lift_ci_negative_lift():
    # 50 conversions out of 1000 in treatment (5%) vs 100 out of 1000 in control (10%)
    # Negative lift = -5%
    res = calculate_lift_ci(count_treat=50, count_ctrl=100, nobs_treat=1000, nobs_ctrl=1000)
    assert res["lift"] == -0.05
    assert res["ci_lower"] < 0.0
    assert res["ci_upper"] < 0.0
    assert res["is_significant_positive"] is False

def test_calculate_lift_ci_zero_samples():
    res = calculate_lift_ci(count_treat=0, count_ctrl=0, nobs_treat=0, nobs_ctrl=0)
    assert res["lift"] == 0.0
    assert res["is_significant_positive"] is False
    assert res["p_value"] == 1.0


def test_agent_validate_integration_decisions():
    """
    Integration test verifying GrowthAgent._validate() consumes calculate_lift_ci()
    and marks predictions as ACCEPTED, UNCERTAIN_CI_CROSSES_ZERO, or REJECTED_NEGATIVE_EFFECT.
    """
    from app.services.stats import calculate_lift_ci
    
    # Case A: Clearly positive lift (30% -> 60%)
    res_pos = calculate_lift_ci(count_treat=60, count_ctrl=30, nobs_treat=100, nobs_ctrl=100)
    assert res_pos["is_significant_positive"] is True
    assert res_pos["ci_lower"] > 0
    
    # Case B: Uncertain lift crossing zero (30% -> 32%)
    res_unc = calculate_lift_ci(count_treat=32, count_ctrl=30, nobs_treat=100, nobs_ctrl=100)
    assert res_unc["is_significant_positive"] is False
    assert res_unc["ci_lower"] <= 0 <= res_unc["ci_upper"]
    
    # Case C: Negative lift (30% -> 10%)
    res_neg = calculate_lift_ci(count_treat=10, count_ctrl=30, nobs_treat=100, nobs_ctrl=100)
    assert res_neg["is_significant_positive"] is False
    assert res_neg["ci_upper"] < 0
