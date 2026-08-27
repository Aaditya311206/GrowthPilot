import os
import pandas as pd
from statsmodels.stats.proportion import proportions_ztest

def analyze_treatment_opportunities() -> list:
    """
    Analyzes historical experimental data to find causal uplift opportunities.
    Because historical raw interventions do not fit the strict Phase 1 Prisma schema,
    this engine seamlessly reads the historical experiments dataset directly from the
    local data lake (CSV), while transactions are sourced from PostgreSQL.
    """
    csv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/experiments_history.csv'))
    
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Historical experiments data not found at {csv_path}")
        
    df = pd.read_csv(csv_path, keep_default_na=False)
    
    segments = df['segment'].unique()
    opportunities = []
    
    for segment in segments:
        seg_df = df[df['segment'] == segment]
        
        control = seg_df[seg_df['intervention'] == 'None']
        treatment = seg_df[seg_df['intervention'] == '10% Cashback']
        
        n_c = len(control)
        n_t = len(treatment)
        
        conv_c = control['converted'].sum()
        conv_t = treatment['converted'].sum()
        
        rate_c = conv_c / n_c if n_c > 0 else 0
        rate_t = conv_t / n_t if n_t > 0 else 0
        
        # Two-proportion z-test (H1: treatment > control)
        count = [conv_t, conv_c]
        nobs = [n_t, n_c]
        
        if n_t > 0 and n_c > 0:
            stat, p_value = proportions_ztest(count, nobs, alternative='larger')
        else:
            p_value = 1.0
            
        alpha = 0.05
        is_significant = p_value < alpha
        uplift = rate_t - rate_c
        
        evidence = (
            f"Segment: {segment}. Control Conv (n={n_c}): {rate_c:.2%}. "
            f"Treatment Conv (n={n_t}): {rate_t:.2%}. Absolute Uplift: {uplift:.2%}."
        )
        
        opportunities.append({
            "type": "Causal Treatment Effect",
            "segment": segment,
            "sample_size": n_c + n_t,
            "control_metric": round(rate_c, 4),
            "treatment_metric": round(rate_t, 4),
            "difference": round(uplift, 4),
            "p_value": float(p_value),
            "statistically_significant": bool(is_significant),
            "evidence": evidence
        })
        
    # Rank opportunities by absolute uplift
    opportunities.sort(key=lambda x: x['difference'], reverse=True)
    return opportunities
