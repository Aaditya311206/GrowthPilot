def calculate_contribution_profit(
    treatment_users: int,
    control_users: int,
    treatment_revenue: float,
    control_revenue: float,
    treatment_conversions: int,
    offer_cost_per_conversion: float,
    margin_percentage: float = 0.30
) -> dict:
    """
    Compute normalized incremental revenue, gross margin earned, total intervention cost, and net contribution profit.
    """
    if treatment_users <= 0 or control_users <= 0:
        return {
            "incremental_revenue": 0.0,
            "total_intervention_cost": 0.0,
            "gross_margin_earned": 0.0,
            "net_contribution_profit": 0.0,
            "is_profitable": False
        }

    # Normalize control expected revenue to the treatment group size
    expected_control_revenue_per_user = control_revenue / control_users
    baseline_expected_revenue = treatment_users * expected_control_revenue_per_user
    
    incremental_revenue = treatment_revenue - baseline_expected_revenue
    
    total_intervention_cost = treatment_conversions * offer_cost_per_conversion
    gross_margin_earned = incremental_revenue * margin_percentage
    net_contribution_profit = gross_margin_earned - total_intervention_cost

    is_profitable = net_contribution_profit > 0

    return {
        "incremental_revenue": round(incremental_revenue, 4),
        "total_intervention_cost": round(total_intervention_cost, 4),
        "gross_margin_earned": round(gross_margin_earned, 4),
        "net_contribution_profit": round(net_contribution_profit, 4),
        "is_profitable": is_profitable
    }
