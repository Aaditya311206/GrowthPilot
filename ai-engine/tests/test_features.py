import pytest
from datetime import datetime, timedelta
from unittest.mock import MagicMock
from app.services.features import extract_features
from app.models import Order, Payment

def test_extract_features_no_transactions():
    db = MagicMock()
    # Query for orders returns empty
    db.query().filter().all.return_value = []
    
    features = extract_features(db, "cust1")
    
    assert features["customer_id"] == "cust1"
    assert features["total_orders"] == 0.0
    assert features["total_spent"] == 0.0
    assert features["avg_order_value"] == 0.0
    assert features["last_order_days_ago"] == 999.0
    assert features["pay_count_upi"] == 0.0

def test_extract_features_multiple_transactions():
    db = MagicMock()
    
    # Mock orders
    now = datetime.utcnow()
    o1 = Order(id="o1", customerId="cust2", amount=100.0, status="captured", createdAt=now - timedelta(days=5))
    o2 = Order(id="o2", customerId="cust2", amount=200.0, status="captured", createdAt=now - timedelta(days=2))
    
    # Mock payments
    p1 = Payment(id="p1", orderId="o1", method="upi", status="captured")
    p2 = Payment(id="p2", orderId="o2", method="card", status="captured")
    
    # Setup mock behavior
    def mock_filter(*args, **kwargs):
        mock_query = MagicMock()
        # If filtering Order, return orders
        if args and hasattr(args[0], 'left') and args[0].left.name == 'customerId':
            mock_query.all.return_value = [o1, o2]
        # If filtering Payment, return payments
        elif args and hasattr(args[0], 'left') and args[0].left.name == 'orderId':
            mock_query.all.return_value = [p1, p2]
        else:
            mock_query.all.return_value = []
        return mock_query
        
    db.query().filter.side_effect = mock_filter
    
    features = extract_features(db, "cust2")
    
    assert features["customer_id"] == "cust2"
    assert features["total_orders"] == 2.0
    assert features["total_spent"] == 300.0
    assert features["avg_order_value"] == 150.0
    assert features["last_order_days_ago"] == 2.0
    assert features["pay_count_upi"] == 1.0
    assert features["pay_count_card"] == 1.0
    assert features["pay_count_wallet"] == 0.0
