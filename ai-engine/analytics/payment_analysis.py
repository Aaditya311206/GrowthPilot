import pandas as pd
from statsmodels.stats.proportion import proportions_ztest
from database import fetch_data

def analyze_payment_dropoff() -> dict:
    # Fetch all credit card payments with order amounts
    query = """
        SELECT o.amount, p.status, p."failureReason"
        FROM "Payment" p
        JOIN "Order" o ON p."orderId" = o.id
        WHERE p.method = 'Credit Card'
    """
    df = fetch_data(query)
    
    # Split into normal and high value
    HIGH_VALUE_THRESHOLD = 5000
    normal_cc = df[df['amount'] <= HIGH_VALUE_THRESHOLD]
    high_cc = df[df['amount'] > HIGH_VALUE_THRESHOLD]
    
    # Calculate stats
    n_normal = len(normal_cc)
    n_high = len(high_cc)
    
    fails_normal = len(normal_cc[normal_cc['status'] == 'Failed'])
    fails_high = len(high_cc[high_cc['status'] == 'Failed'])
    
    rate_normal = fails_normal / n_normal if n_normal > 0 else 0
    rate_high = fails_high / n_high if n_high > 0 else 0
    
    # Gateway Timeout representation
    high_failures = high_cc[high_cc['status'] == 'Failed']
    n_high_fails = len(high_failures)
    n_timeout = len(high_failures[high_failures['failureReason'] == 'Gateway Timeout'])
    pct_timeout = n_timeout / n_high_fails if n_high_fails > 0 else 0
    
    # Statistical Test (Two-proportion z-test)
    # H0: rate_high <= rate_normal
    # H1: rate_high > rate_normal
    count = [fails_high, fails_normal]
    nobs = [n_high, n_normal]
    
    stat, p_value = proportions_ztest(count, nobs, alternative='larger')
    
    alpha = 0.05
    is_significant = p_value < alpha
    
    evidence = (
        f"Normal CC Failure Rate (n={n_normal}): {rate_normal:.2%}. "
        f"High-Value CC Failure Rate (n={n_high}): {rate_high:.2%}. "
        f"Gateway Timeouts account for {pct_timeout:.2%} of high-value failures."
    )
    
    return {
        "type": "Payment Drop-off",
        "segment": "Credit Card > 5000",
        "sample_size": n_high + n_normal,
        "control_metric": round(rate_normal, 4),
        "treatment_metric": round(rate_high, 4),
        "difference": round(rate_high - rate_normal, 4),
        "p_value": float(p_value),
        "statistically_significant": bool(is_significant),
        "evidence": evidence
    }
