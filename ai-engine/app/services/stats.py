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

def calculate_lift_ci(count_treat: int, count_ctrl: int, nobs_treat: int, nobs_ctrl: int, alpha: float = 0.05) -> dict:
    """
    Compute two-sample risk difference (lift): Lift = P(Y=1|T) - P(Y=1|C)
    along with standard error, Z-statistic, p-value, and two-sided (1 - alpha) confidence interval.
    """
    if nobs_treat <= 0 or nobs_ctrl <= 0:
        return {
            "lift": 0.0,
            "se": 0.0,
            "ci_lower": 0.0,
            "ci_upper": 0.0,
            "is_significant_positive": False,
            "p_value": 1.0
        }
        
    p_t = count_treat / nobs_treat
    p_c = count_ctrl / nobs_ctrl
    lift = p_t - p_c
    
    # Standard error of the difference in two independent proportions
    se = np.sqrt((p_t * (1.0 - p_t) / nobs_treat) + (p_c * (1.0 - p_c) / nobs_ctrl))
    
    # Standard normal critical value (1.95996 for alpha = 0.05)
    import scipy.stats as stats
    z_crit = float(stats.norm.ppf(1.0 - alpha / 2.0))
    
    ci_lower = float(lift - z_crit * se)
    ci_upper = float(lift + z_crit * se)
    
    # One-sided test that lift > 0
    if se > 0:
        z_stat = lift / se
        p_value = float(1.0 - stats.norm.cdf(z_stat))
    else:
        z_stat = 0.0
        p_value = 1.0 if lift <= 0 else 0.0
        
    is_significant_positive = bool(ci_lower > 0)
    
    return {
        "lift": round(lift, 4),
        "se": round(se, 4),
        "ci_lower": round(ci_lower, 4),
        "ci_upper": round(ci_upper, 4),
        "is_significant_positive": is_significant_positive,
        "p_value": round(p_value, 4)
    }

