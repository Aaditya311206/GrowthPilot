import numpy as np
from statsmodels.stats.proportion import proportions_ztest, proportion_confint

def calculate_significance(count_treat: int, count_ctrl: int, nobs_treat: int, nobs_ctrl: int, alpha: float = 0.05):
    """
    Perform two-sample Z-test and compute 95% Confidence Intervals safely.
    """
    if nobs_treat == 0 or nobs_ctrl == 0:
        return {
            "z_statistic": 0.0,
            "p_value": 1.0,
            "is_significant": False,
            "ci_treat": (0.0, 0.0),
            "ci_ctrl": (0.0, 0.0)
        }

    # Zero-variance edge case (e.g. 0 conversions in both groups)
    if count_treat == 0 and count_ctrl == 0:
        return {
            "z_statistic": 0.0,
            "p_value": 1.0,
            "is_significant": False,
            "ci_treat": (0.0, 0.0),
            "ci_ctrl": (0.0, 0.0)
        }

    count = np.array([count_treat, count_ctrl])
    nobs = np.array([nobs_treat, nobs_ctrl])

    # Statsmodels Z-test
    z_stat, p_value = proportions_ztest(count, nobs, alternative='larger')
    is_significant = bool(p_value < alpha)

    # 95% CI calculation
    ci_low, ci_high = proportion_confint(count, nobs, alpha=alpha, method='normal')
    
    ci_treat = (float(ci_low[0]), float(ci_high[0]))
    ci_ctrl = (float(ci_low[1]), float(ci_high[1]))

    return {
        "z_statistic": float(z_stat) if not np.isnan(z_stat) else 0.0,
        "p_value": float(p_value) if not np.isnan(p_value) else 1.0,
        "is_significant": is_significant,
        "ci_treat": ci_treat,
        "ci_ctrl": ci_ctrl
    }
