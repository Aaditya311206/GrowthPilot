# ai-engine/training/04_evaluate_and_export.py
import pandas as pd
import numpy as np
import importlib

# Dynamic import for 03_uplift_model
uplift_module = importlib.import_module("03_uplift_model")
train_uplift_model = uplift_module.train_uplift_model

def evaluate_uplift(df_results):
    print("\nEvaluating Uplift Model Performance...")
    
    # Sort test set by predicted uplift score descending
    df_sorted = df_results.sort_values(by="uplift_score", ascending=False).reset_index(drop=True)
    
    # Split test set into 10 deciles
    df_sorted["decile"] = pd.qcut(df_sorted.index, q=10, labels=False)

    decile_summary = []
    
    for d in range(10):
        group = df_sorted[df_sorted["decile"] == d]
        
        treat = group[group["T"] == 1]
        control = group[group["T"] == 0]
        
        y_treat = treat["Y"].mean() if len(treat) > 0 else 0
        y_control = control["Y"].mean() if len(control) > 0 else 0
        
        lift = y_treat - y_control
        
        decile_summary.append({
            "Decile": d + 1,
            "Count": len(group),
            "Treatment Conv Rate": f"{y_treat:.2%}",
            "Control Conv Rate": f"{y_control:.2%}",
            "Incremental Lift": f"{lift:+.2%}"
        })

    summary_df = pd.DataFrame(decile_summary)
    print("\n--- Uplift Performance by Decile ---")
    print(summary_df.to_string(index=False))

    # Evaluate Top Decile Impact
    top_group = df_sorted[df_sorted["decile"] == 0]
    top_lift = top_group[top_group["T"] == 1]["Y"].mean() - top_group[top_group["T"] == 0]["Y"].mean()
    
    print(f"\nTop 10% High-Uplift Customer Incremental Lift: {top_lift:+.2%}")
    if top_lift > 0:
        print("MODEL VALIDATED: Targeting top deciles yields positive incremental conversions!")
    else:
        print("WARNING: Top decile lift is non-positive. Check synthetic feature distributions.")

    # Thesis Verification: Check Segment Distribution in High-Uplift deciles
    print("\n--- Thesis Verification: Segment Breakdown in Top Decile (Top 10%) ---")
    top_segments = top_group["segment"].value_counts(normalize=True)
    for seg, pct in top_segments.items():
        print(f"   {seg}: {pct:.2%}")

    student_pct = top_segments.get("Student", 0.0)
    print(f"\nPersuadable Segment (Student) Share in Top Decile: {student_pct:.2%}")
    if student_pct > 0.70:
        print("THESIS VALIDATED: Persuadable customers (Students) dominate the top uplift decile!")
    else:
        print("WARNING: Persuadable customers do not dominate top decile. Check feature weights.")

if __name__ == "__main__":
    df_results = train_uplift_model()
    evaluate_uplift(df_results)