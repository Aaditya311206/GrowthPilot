# ai-engine/training/03_uplift_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

CANONICAL_FEATURES = [
    "total_orders",
    "total_spent",
    "avg_order_value",
    "last_order_days_ago",
    "pay_count_credit_card",
    "pay_count_netbanking",
    "pay_count_upi"
]

def train_uplift_model():
    print("Loading processed feature matrix...")
    df = pd.read_csv("../data/processed/feature_matrix.csv", keep_default_na=False)
    if "intervention" in df.columns:
        df["intervention"] = df["intervention"].replace("", "None").fillna("None")

    # Strictly enforce canonical features (zero target leakage)
    for feat in CANONICAL_FEATURES:
        assert feat in df.columns, f"Required canonical feature {feat} missing from feature matrix!"

    X = df[CANONICAL_FEATURES].astype(float)
    z = df["Z"]  # Transformed Causal Target

    # Train / Test Split
    X_train, X_test, z_train, z_test, df_train, df_test = train_test_split(
        X, z, df, test_size=0.2, random_state=42
    )

    print("Training Primary Uplift Model (Class Transformation Method)...")
    uplift_model = RandomForestClassifier(n_estimators=150, max_depth=5, random_state=42)
    uplift_model.fit(X_train, z_train)

    # Estimate Incremental Uplift Score: 2 * P(Z=1|X) - 1
    prob_z1 = uplift_model.predict_proba(X_test)[:, 1]
    uplift_scores = 2 * prob_z1 - 1

    df_test = df_test.copy()
    df_test["uplift_score"] = uplift_scores

    print("Training Multi-Treatment Models (T-Learner)...")
    ctrl_mask = (df_train["intervention"] == "None")
    m_ctrl = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    m_ctrl.fit(X_train.loc[ctrl_mask], df_train.loc[ctrl_mask, "Y"])

    treatment_models = {}
    for treat in ["10% Cashback", "5% Discount", "Free Shipping"]:
        t_mask = (df_train["intervention"] == treat)
        if t_mask.sum() > 0:
            m_t = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
            m_t.fit(X_train.loc[t_mask], df_train.loc[t_mask, "Y"])
            treatment_models[treat] = m_t
            
            # Predict specific treatment uplift on test set
            df_test[f"uplift_{treat}"] = m_t.predict_proba(X_test)[:, 1] - m_ctrl.predict_proba(X_test)[:, 1]

    print("\n--- Sample Predicted Uplift Scores ---")
    print(df_test[["customer_id", "segment", "T", "Y", "uplift_score"]].head(10).to_string(index=False))

    # Save model artifact to ai-engine/models/
    models_dir = "../models"
    os.makedirs(models_dir, exist_ok=True)
    model_path = os.path.join(models_dir, "trained_model.pkl")
    
    joblib.dump({
        "model": uplift_model, 
        "control_model": m_ctrl,
        "treatment_models": treatment_models,
        "features": CANONICAL_FEATURES
    }, model_path)
    
    print(f"\nSuccessfully exported trained model artifact to {model_path}")
    print(f"Artifact features: {CANONICAL_FEATURES}")

    return df_test

if __name__ == "__main__":
    train_uplift_model()