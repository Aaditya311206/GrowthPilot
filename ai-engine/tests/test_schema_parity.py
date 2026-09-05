import pytest
import os
import joblib
from unittest.mock import MagicMock
from app.services.features import extract_features

def test_schema_parity_with_model_artifact():
    # Load model artifact
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../models/trained_model.pkl"))
    assert os.path.exists(model_path), f"Model artifact not found at {model_path}"
    
    artifact = joblib.load(model_path)
    model_features = artifact["features"]
    
    # Extract features using mock database
    db = MagicMock()
    db.query().filter().all.return_value = []
    
    customer_features = extract_features(db, "test_customer_id")
    feature_keys = set(customer_features.keys())
    
    # Assert that all required model features are provided by extract_features
    for feat in model_features:
        assert feat in feature_keys, f"Model expects feature '{feat}', but extract_features does not provide it!"
        assert isinstance(customer_features[feat], (int, float)), f"Feature '{feat}' must be numeric"

def test_no_silent_zero_filling_on_missing_features():
    from app.routers.ml import predict_uplift, CustomerFeatures
    from fastapi import HTTPException
    
    # Incomplete dictionary missing required features
    incomplete_features = {
        "customer_id": "cust1",
        "total_orders": 1.0,
        "total_spent": 100.0,
        "avg_order_value": 100.0,
        "last_order_days_ago": 5.0,
        "pay_count_credit_card": 1.0,
        # missing pay_count_netbanking and pay_count_upi
    }
    
    with pytest.raises(Exception):
        # Pydantic should reject missing required fields
        CustomerFeatures(**incomplete_features)
