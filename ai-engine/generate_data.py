import pandas as pd
import numpy as np
import uuid
from datetime import datetime, timedelta
import os

# ==================================================================
# GROWTHPILOT - SYNTHETIC DATA GENERATOR (PHASE 2)
# ==================================================================
# This script generates realistic merchant data with planted ground 
# truths (hidden opportunities) for the ML model to discover later.
# ==================================================================

# Set random seed for reproducibility
np.random.seed(42)

NUM_CUSTOMERS = 10000
NUM_ORDERS = 25000

# Constants for planted ground truth 1 (Payment Drop-off)
HIGH_VALUE_THRESHOLD = 5000
CC_NORMAL_FAIL_RATE = 0.05
CC_HIGH_VALUE_FAIL_RATE = 0.25 # The planted gateway timeout issue!

# Constants for planted ground truth 2 (Causal Uplift)
# Segment A (Students): Highly price sensitive
STUDENT_BASE_CONV = 0.15
STUDENT_LIFTS = {
    '10% Cashback': 0.30,
    '5% Discount': 0.15,
    'Free Shipping': 0.10,
    'None': 0.00
}

# Segment B (Professionals): Low price sensitivity
PROF_BASE_CONV = 0.60
PROF_LIFTS = {
    '10% Cashback': 0.02,
    '5% Discount': 0.01,
    'Free Shipping': 0.03,
    'None': 0.00
}

# Segment C (Enterprise): No uplift, fixed budgets
ENT_BASE_CONV = 0.85
ENT_LIFTS = {
    '10% Cashback': 0.00,
    '5% Discount': 0.00,
    'Free Shipping': 0.01,
    'None': 0.00
}

def generate_customers(num_customers):
    segments = ['Student', 'Professional', 'Enterprise']
    probs = [0.4, 0.5, 0.1]
    
    customers = []
    for _ in range(num_customers):
        segment = np.random.choice(segments, p=probs)
        
        # Base conversion probability based on segment
        if segment == 'Student':
            base_prob = STUDENT_BASE_CONV
        elif segment == 'Professional':
            base_prob = PROF_BASE_CONV
        else:
            base_prob = ENT_BASE_CONV
            
        customers.append({
            'customer_id': str(uuid.uuid4()),
            'segment': segment,
            'signup_date': (datetime.now() - timedelta(days=np.random.randint(1, 365))).strftime('%Y-%m-%d'),
            'baseline_purchase_prob': base_prob
        })
        
    return pd.DataFrame(customers)

def generate_experiments_history(customers_df):
    history = []
    
    interventions = ['None', '10% Cashback', '5% Discount', 'Free Shipping']
    # 50% Control ('None'), 25% '10% Cashback', 15% '5% Discount', 10% 'Free Shipping'
    # This guarantees P(T=1) == 0.50 for binary uplift (Intervention vs Control)
    intervention_probs = [0.50, 0.25, 0.15, 0.10]
    
    assigned = np.random.choice(interventions, size=len(customers_df), p=intervention_probs)
    
    for idx, (_, row) in enumerate(customers_df.iterrows()):
        intervention = assigned[idx]
        base_prob = row['baseline_purchase_prob']
        segment = row['segment']
        
        if segment == 'Student':
            lift = STUDENT_LIFTS[intervention]
        elif segment == 'Professional':
            lift = PROF_LIFTS[intervention]
        else:
            lift = ENT_LIFTS[intervention]
            
        final_prob = min(1.0, max(0.0, base_prob + lift))
        converted = 1 if np.random.random() < final_prob else 0
        
        history.append({
            'customer_id': row['customer_id'],
            'segment': segment,
            'intervention': intervention,
            'converted': converted
        })
        
    return pd.DataFrame(history)

def generate_orders_and_payments(customers_df, num_orders):
    orders = []
    payments = []
    
    payment_methods = ['UPI', 'Credit Card', 'NetBanking']
    method_probs = [0.6, 0.3, 0.1]
    
    # We will pick random customers based on their baseline purchase prob
    weights = customers_df['baseline_purchase_prob'].values
    weights = weights / weights.sum()
    
    selected_customers = np.random.choice(customers_df['customer_id'], size=num_orders, p=weights)
    
    for i in range(num_orders):
        order_id = str(uuid.uuid4())
        customer_id = selected_customers[i]
        
        # Order amount logic (log-normal distribution for realistic skewed pricing)
        amount = round(np.random.lognormal(mean=7, sigma=1.2), 2)
        # Cap minimum amount
        if amount < 100: amount = np.random.randint(100, 500)
        
        created_at = (datetime.now() - timedelta(days=np.random.randint(1, 180), hours=np.random.randint(0, 24))).strftime('%Y-%m-%d %H:%M:%S')
        
        # Payment Logic (Planted Ground Truth 1)
        method = np.random.choice(payment_methods, p=method_probs)
        fail_rate = 0.02 # Base default fail rate
        
        if method == 'Credit Card':
            if amount > HIGH_VALUE_THRESHOLD:
                fail_rate = CC_HIGH_VALUE_FAIL_RATE # 25% failure!
            else:
                fail_rate = CC_NORMAL_FAIL_RATE
        elif method == 'UPI':
            fail_rate = 0.04
            
        is_success = np.random.random() > fail_rate
        payment_status = 'Success' if is_success else 'Failed'
        order_status = 'Completed' if is_success else 'Abandoned'
        
        failure_reason = 'None'
        if not is_success:
            if method == 'Credit Card' and amount > HIGH_VALUE_THRESHOLD:
                failure_reason = 'Gateway Timeout'
            else:
                failure_reason = np.random.choice(['Insufficient Funds', 'Bank Declined', 'Timeout'])

        orders.append({
            'order_id': order_id,
            'customer_id': customer_id,
            'amount': amount,
            'created_at': created_at,
            'status': order_status
        })
        
        payments.append({
            'payment_id': str(uuid.uuid4()),
            'order_id': order_id,
            'method': method,
            'status': payment_status,
            'failure_reason': failure_reason
        })
        
    return pd.DataFrame(orders), pd.DataFrame(payments)

def main():
    print("Initializing GrowthPilot Synthetic Data Generator...")
    
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    
    print(f"Generating {NUM_CUSTOMERS} customers...")
    customers_df = generate_customers(NUM_CUSTOMERS)
    customers_df.to_csv('data/customers.csv', index=False)
    
    print("Generating historical experiment data (Causal Ground Truth)...")
    history_df = generate_experiments_history(customers_df)
    history_df.to_csv('data/experiments_history.csv', index=False)
    
    print(f"Generating {NUM_ORDERS} orders and payments (Gateway Timeout Ground Truth)...")
    orders_df, payments_df = generate_orders_and_payments(customers_df, NUM_ORDERS)
    orders_df.to_csv('data/orders.csv', index=False)
    payments_df.to_csv('data/payments.csv', index=False)
    
    print("\nGeneration Complete! Data saved to 'ai-engine/data/'")
    print("\n--- GROUND TRUTH VERIFICATION ---")
    print("1. Causal Uplift (Students across interventions):")
    student_ctrl = history_df[(history_df['segment'] == 'Student') & (history_df['intervention'] == 'None')]['converted'].mean()
    for t in ['10% Cashback', '5% Discount', 'Free Shipping']:
        t_conv = history_df[(history_df['segment'] == 'Student') & (history_df['intervention'] == t)]['converted'].mean()
        print(f"   Student Lift ({t}): {t_conv - student_ctrl:+.2%}")
    
    print("2. Payment Drop-off (Credit Cards > 5000):")
    merged = pd.merge(orders_df, payments_df, on='order_id')
    high_value_cc = merged[(merged['method'] == 'Credit Card') & (merged['amount'] > HIGH_VALUE_THRESHOLD)]
    cc_fail_rate = high_value_cc[high_value_cc['status_y'] == 'Failed'].shape[0] / max(1, high_value_cc.shape[0])
    print(f"   High-Value CC Failure Rate: {cc_fail_rate:.2%} (Expected ~25%)")

if __name__ == "__main__":
    main()

