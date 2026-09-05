from collections import defaultdict
from sqlalchemy.orm import Session
from datetime import datetime
from ..models import Order, Payment

COMPLETED_ORDER_STATUSES = {'completed', 'captured', 'success'}
SUCCESSFUL_PAYMENT_STATUSES = {'success', 'captured', 'completed'}

def extract_features_batch(db: Session, customer_ids: list[str]) -> list[dict]:
    """
    Batch extract RFM and Payment behavior features for a list of customers from the database.
    Performs batched queries instead of 2N queries.
    Matches the canonical feature contract:
    ['total_orders', 'total_spent', 'avg_order_value', 'last_order_days_ago',
     'pay_count_credit_card', 'pay_count_netbanking', 'pay_count_upi']
    """
    if not customer_ids:
        return []

    # Initialize defaults for all customers
    results = {
        cid: {
            "customer_id": cid,
            "total_orders": 0.0,
            "total_spent": 0.0,
            "avg_order_value": 0.0,
            "last_order_days_ago": 999.0,
            "pay_count_credit_card": 0.0,
            "pay_count_netbanking": 0.0,
            "pay_count_upi": 0.0
        }
        for cid in customer_ids
    }

    # 1. Fetch completed orders for customers in chunks
    orders_by_cust = defaultdict(list)
    order_id_to_cust = {}
    chunk_size = 1000

    for i in range(0, len(customer_ids), chunk_size):
        chunk = customer_ids[i:i + chunk_size]
        orders_chunk = db.query(
            Order.id, Order.customerId, Order.amount, Order.status, Order.createdAt
        ).filter(Order.customerId.in_(chunk)).all()
        for o in orders_chunk:
            if o.status and o.status.strip().lower() in COMPLETED_ORDER_STATUSES:
                orders_by_cust[o.customerId].append(o)
                order_id_to_cust[o.id] = o.customerId

    for cid, orders in orders_by_cust.items():
        if not orders:
            continue
        feat = results[cid]
        feat["total_orders"] = float(len(orders))
        feat["total_spent"] = float(sum(o.amount for o in orders))
        feat["avg_order_value"] = feat["total_spent"] / feat["total_orders"]

        most_recent_order = max(o.createdAt for o in orders)
        now = datetime.now(most_recent_order.tzinfo) if most_recent_order.tzinfo else datetime.utcnow()
        feat["last_order_days_ago"] = float(max(0.0, (now - most_recent_order).total_seconds() / 86400.0))

    # 2. Query payments for all completed orders
    all_order_ids = list(order_id_to_cust.keys())
    for i in range(0, len(all_order_ids), chunk_size):
        chunk_order_ids = all_order_ids[i:i + chunk_size]
        payments_chunk = db.query(
            Payment.orderId, Payment.method, Payment.status
        ).filter(Payment.orderId.in_(chunk_order_ids)).all()
        for p in payments_chunk:
            if p.status and p.status.strip().lower() in SUCCESSFUL_PAYMENT_STATUSES:
                cid = order_id_to_cust.get(p.orderId)
                if not cid or cid not in results:
                    continue
                m = p.method.strip().lower().replace(" ", "_").replace("-", "_") if p.method else ""
                if "upi" in m:
                    results[cid]["pay_count_upi"] += 1.0
                elif "card" in m:
                    results[cid]["pay_count_credit_card"] += 1.0
                elif "netbanking" in m or "net_banking" in m:
                    results[cid]["pay_count_netbanking"] += 1.0

    return [results[cid] for cid in customer_ids]

def extract_features(db: Session, customer_id: str) -> dict:
    """
    Extract RFM and Payment behavior features for a single customer.
    """
    batch = extract_features_batch(db, [customer_id])
    return batch[0] if batch else {}


