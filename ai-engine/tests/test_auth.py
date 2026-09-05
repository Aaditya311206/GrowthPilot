import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check_public():
    # Health check is public
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "online"

def test_protected_route_without_secret():
    # Requesting protected endpoint without X-Internal-Secret returns 401
    res = client.post("/agent/run", json={"merchant_id": "m1", "goal": "test"})
    assert res.status_code == 401
    assert "Unauthorized" in res.json()["detail"]

def test_protected_route_with_invalid_secret():
    # Requesting with wrong secret returns 401
    headers = {"X-Internal-Secret": "wrong-secret"}
    res = client.post("/agent/run", json={"merchant_id": "m1", "goal": "test"}, headers=headers)
    assert res.status_code == 401
    assert "Unauthorized" in res.json()["detail"]

def test_protected_route_with_valid_secret():
    # Requesting with correct secret passes authentication (fails on validation or DB if not mocked)
    headers = {"X-Internal-Secret": "growthpilot-internal-secret-2026"}
    res = client.post("/ml/predict-uplift", json={"customer_id": "c1"}, headers=headers)
    # Should get 422 (validation error due to missing required fields), NOT 401!
    assert res.status_code == 422
