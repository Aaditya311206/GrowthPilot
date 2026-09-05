# ai-engine/training/01_data_prep.py
import pandas as pd
import numpy as np
import os

def load_and_prepare_data(data_dir="../data"):
    print("Loading raw CSV files...")
    customers = pd.read_csv(os.path.join(data_dir, "customers.csv"))
    orders = pd.read_csv(os.path.join(data_dir, "orders.csv"))
    payments = pd.read_csv(os.path.join(data_dir, "payments.csv"))
    exp_history = pd.read_csv(os.path.join(data_dir, "experiments_history.csv"))

    print("Computing customer-level RFM and behavioral features...")
    
    # 1. Filter completed orders only (matches database service logic)
    completed_statuses = {'completed', 'captured', 'success'}
    orders_valid = orders[orders['status'].astype(str).str.strip().str.lower().isin(completed_statuses)].copy()

    # Compute recency from created_at
    orders_valid['created_at_dt'] = pd.to_datetime(orders_valid['created_at'])
    ref_date = orders_valid['created_at_dt'].max() + pd.Timedelta(days=1)

    order_aggregates = orders_valid.groupby("customer_id").agg(
        total_orders=("order_id", "count"),
        total_spent=("amount", "sum"),
        avg_order_value=("amount", "mean"),
        most_recent_order=("created_at_dt", "max")
    ).reset_index()

    order_aggregates["last_order_days_ago"] = (
        (ref_date - order_aggregates["most_recent_order"]).dt.total_seconds() / 86400.0
    ).round(1)
    order_aggregates.drop(columns=["most_recent_order"], inplace=True)

    # 2. Payment Method Preferences on successful payments
    success_statuses = {'success', 'captured', 'completed'}
    payments_valid = payments[payments['status'].astype(str).str.strip().str.lower().isin(success_statuses)].copy()

    if "customer_id" not in payments_valid.columns:
        payments_valid = payments_valid.merge(orders[["order_id", "customer_id"]], on="order_id", how="left")

    pay_method_col = "payment_method" if "payment_method" in payments_valid.columns else "method"

    def normalize_method(val):
        m = str(val).strip().lower().replace(" ", "_").replace("-", "_")
        if "upi" in m:
            return "pay_count_upi"
        elif "card" in m:
            return "pay_count_credit_card"
        elif "netbanking" in m or "net_banking" in m:
            return "pay_count_netbanking"
        return "pay_count_other"

    payments_valid["normalized_method"] = payments_valid[pay_method_col].apply(normalize_method)
    payment_counts = payments_valid.groupby(["customer_id", "normalized_method"]).size().unstack(fill_value=0).reset_index()

    # 3. Merge Customer Features (Strictly exclude baseline_purchase_prob target leakage!)
    cust_cols = ["customer_id", "segment"]
    df = customers[cust_cols].merge(order_aggregates, on="customer_id", how="left")
    df = df.merge(payment_counts, on="customer_id", how="left")

    canonical_fill = {
        "total_orders": 0.0,
        "total_spent": 0.0,
        "avg_order_value": 0.0,
        "last_order_days_ago": 999.0,
        "pay_count_credit_card": 0.0,
        "pay_count_netbanking": 0.0,
        "pay_count_upi": 0.0
    }
    for col, default_val in canonical_fill.items():
        if col not in df.columns:
            df[col] = default_val
        else:
            df[col] = df[col].fillna(default_val)

    if "pay_count_other" in df.columns:
        df.drop(columns=["pay_count_other"], inplace=True)

    # 4. Merge Experiments History & Map Treatment / Control
    exp_cols_to_keep = ["customer_id", "intervention", "converted"]
    df = df.merge(exp_history[exp_cols_to_keep], on="customer_id", how="inner")
    df["intervention"] = df["intervention"].fillna("None")

    # Map Control ('None') as 0, any active intervention as 1
    df["T"] = np.where(df["intervention"] == "None", 0, 1)
    df["Y"] = df["converted"].astype(int)


    # Statistical RCT validation: Treatment ratio must be approximately 50/50 for class transformation
    treatment_ratio = df["T"].mean()
    assert abs(treatment_ratio - 0.5) < 0.05, f"Treatment ratio {treatment_ratio:.2%} violates RCT 50/50 design requirement!"

    # 5. Compute Transformed Target Z for Class Transformation: Z = 1 if Y == T else 0
    df["Z"] = np.where(df["Y"] == df["T"], 1, 0)

    print(f"\nPreparation Complete!")
    print(f"Total Customer Records Processed: {len(df)}")
    print(f"Treatment Ratio (T=1): {treatment_ratio:.2%}")
    print(f"Overall Conversion Rate (Y=1): {df['Y'].mean():.2%}")
    print(f"Transformed Target Ratio (Z=1): {df['Z'].mean():.2%}")
    print(f"Canonical Features present: {[c for c in canonical_fill.keys()]}")

    return df

if __name__ == "__main__":
    df = load_and_prepare_data()
    output_dir = "../data/processed"
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "feature_matrix.csv")
    df.to_csv(output_path, index=False)
    print(f"Feature matrix saved to {output_path}")