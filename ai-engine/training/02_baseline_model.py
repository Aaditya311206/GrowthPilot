# ai-engine/training/02_baseline_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

def train_baseline():
    print("Loading feature matrix...")
    df = pd.read_csv("../data/processed/feature_matrix.csv")

    # Exclude IDs, target labels, metadata, and non-numeric columns from training features
    exclude_cols = [
        "customer_id", "merchant_id", "created_at", "signup_date", 
        "signup_timestamp", "segment", "T", "Y", "Z", "profit_impact"
    ]
    feature_cols = [col for col in df.columns if col not in exclude_cols and not col.startswith("id")]

    # Keep only numeric features for Scikit-Learn
    X = df[feature_cols].select_dtypes(include=["number"])
    y = df["Y"]

    # Split into train/test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training Baseline Random Forest (Propensity Model)...")
    clf = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    probs = clf.predict_proba(X_test)[:, 1]

    print("\n--- Baseline Propensity Model Evaluation ---")
    print(classification_report(y_test, preds))
    print(f"ROC AUC Score: {roc_auc_score(y_test, probs):.4f}")

    return clf, list(X.columns)

if __name__ == "__main__":
    train_baseline()