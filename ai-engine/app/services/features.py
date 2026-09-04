from sqlalchemy.orm import Session
from datetime import datetime
from ..models import Order, Payment

def extract_features(db: Session, customer_id: str) -> dict:
    """
    Extract RFM and Payment behavior features for a given customer from the database.
    Calculates features based on successful orders.
    """
    # Fetch successful orders for the customer
    orders = db.query(Order).filter(
        Order.customerId == customer_id,
        Order.status == 'captured'
    ).all()
    
    # Defaults for zero transactions
    features = {
        "customer_id": customer_id,
        "total_orders": 0.0,
        "total_spent": 0.0,
        "avg_order_value": 0.0,
        "last_order_days_ago": 999.0,
        "pay_count_upi": 0.0,
        "pay_count_card": 0.0,
        "pay_count_netbanking": 0.0,
        "pay_count_wallet": 0.0
    }
    
    if not orders:
        return features

    features["total_orders"] = float(len(orders))
    features["total_spent"] = float(sum(o.amount for o in orders))
    features["avg_order_value"] = features["total_spent"] / features["total_orders"]
    
    most_recent_order = max(o.createdAt for o in orders)
    features["last_order_days_ago"] = float((datetime.utcnow() - most_recent_order).days)
    
    order_ids = [o.id for o in orders]
    payments = db.query(Payment).filter(
        Payment.orderId.in_(order_ids),
        Payment.status == 'captured'
    ).all()
    
    for p in payments:
        if p.method.lower() == 'upi':
            features["pay_count_upi"] += 1.0
        elif p.method.lower() == 'card':
            features["pay_count_card"] += 1.0
        elif p.method.lower() == 'netbanking':
            features["pay_count_netbanking"] += 1.0
        elif p.method.lower() == 'wallet':
            features["pay_count_wallet"] += 1.0
            
    return features
