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
    
    # 1. Flexible Order Aggregations
    order_cols = orders.columns.tolist()
    agg_dict = {
        "order_id": "count",
        "amount": ["sum", "mean"]
    }
    
    if "days_since_last_order" in order_cols:
        agg_dict["days_since_last_order"] = "min"
    
    order_aggregates = orders.groupby("customer_id").agg(agg_dict)
    
    if isinstance(order_aggregates.columns, pd.MultiIndex):
        order_aggregates.columns = ['_'.join(col).strip() for col in order_aggregates.columns.values]
    
    rename_map = {
        "order_id_count": "total_orders",
        "amount_sum": "total_spent",
        "amount_mean": "avg_order_value",
        "days_since_last_order_min": "last_order_days_ago"
    }
    order_aggregates.rename(columns=rename_map, inplace=True)
    order_aggregates.reset_index(inplace=True)

    # 2. Payment Method Preferences
    if "customer_id" not in payments.columns:
        payments_with_cust = payments.merge(orders[["order_id", "customer_id"]], on="order_id", how="left")
    else:
        payments_with_cust = payments

    pay_method_col = "payment_method" if "payment_method" in payments_with_cust.columns else "method"

    payment_counts = payments_with_cust.groupby(["customer_id", pay_method_col]).size().unstack(fill_value=0)
    payment_counts.columns = [f"pay_count_{str(col).lower()}" for col in payment_counts.columns]
    payment_counts.reset_index(inplace=True)

    # 3. Merge Customer Features
    df = customers.merge(order_aggregates, on="customer_id", how="left")
    df = df.merge(payment_counts, on="customer_id", how="left")
    
    fill_defaults = {
        "total_orders": 0,
        "total_spent": 0.0,
        "avg_order_value": 0.0
    }
    if "last_order_days_ago" in df.columns:
        fill_defaults["last_order_days_ago"] = 999
        
    df.fillna(fill_defaults, inplace=True)
    df.fillna(0, inplace=True)

    # 4. Merge Experiments History & Map Treatment / Control
    exp_cols_to_keep = ["customer_id", "intervention", "converted"]
    df = df.merge(exp_history[exp_cols_to_keep], on="customer_id", how="inner")

    # Map NaN / missing intervention as Control (0), non-null as Treatment (1)
    df["T"] = np.where(df["intervention"].isna() | (df["intervention"] == "0") | (df["intervention"] == "control"), 0, 1)
    df["Y"] = df["converted"].astype(int)

    # 5. Compute Transformed Target Z
    df["Z"] = np.where(df["Y"] == df["T"], 1, 0)

    print(f"\nPreparation Complete!")
    print(f"Total Customer Records Processed: {len(df)}")
    print(f"Treatment Ratio (T=1): {df['T'].mean():.2%}")
    print(f"Overall Conversion Rate (Y=1): {df['Y'].mean():.2%}")
    print(f"Transformed Target Ratio (Z=1): {df['Z'].mean():.2%}")

    return df

if __name__ == "__main__":
    df = load_and_prepare_data()
    output_dir = "../data/processed"
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "feature_matrix.csv")
    df.to_csv(output_path, index=False)
    print(f"Feature matrix saved to {output_path}")