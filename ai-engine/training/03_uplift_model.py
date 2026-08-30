# ai-engine/training/03_uplift_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def train_uplift_model():
    print("Loading processed feature matrix...")
    df = pd.read_csv("../data/processed/feature_matrix.csv")

    # Exclude IDs, labels, metadata, and non-numeric fields from feature set
    exclude_cols = [
        "customer_id", "merchant_id", "created_at", "signup_date", 
        "signup_timestamp", "segment", "intervention", "converted", "T", "Y", "Z", "profit_impact"
    ]
    feature_cols = [col for col in df.columns if col not in exclude_cols and not col.startswith("id")]

    X = df[feature_cols].select_dtypes(include=["number"])
    z = df["Z"]  # Transformed Causal Target

    # Train / Test Split
    X_train, X_test, z_train, z_test, df_train, df_test = train_test_split(
        X, z, df, test_size=0.2, random_state=42
    )

    print("Training Uplift Model (Class Transformation Method)...")
    uplift_model = RandomForestClassifier(n_estimators=150, max_depth=5, random_state=42)
    uplift_model.fit(X_train, z_train)

    # Estimate Incremental Uplift Score: 2 * P(Z=1|X) - 1
    prob_z1 = uplift_model.predict_proba(X_test)[:, 1]
    uplift_scores = 2 * prob_z1 - 1

    df_test = df_test.copy()
    df_test["uplift_score"] = uplift_scores

    print("\n--- Sample Predicted Uplift Scores ---")
    print(df_test[["customer_id", "T", "Y", "uplift_score"]].head(10).to_string(index=False))

    # Save model artifact to ai-engine/models/
    models_dir = "../models"
    os.makedirs(models_dir, exist_ok=True)
    model_path = os.path.join(models_dir, "trained_model.pkl")
    
    joblib.dump({
        "model": uplift_model, 
        "features": list(X.columns)
    }, model_path)
    
    print(f"\nSuccessfully exported trained model artifact to {model_path}")

    return df_test

if __name__ == "__main__":
    train_uplift_model()