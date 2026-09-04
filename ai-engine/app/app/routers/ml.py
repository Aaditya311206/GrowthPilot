import os
import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

model_artifact = None
model = None
feature_names = []

def load_model():
    global model_artifact, model, feature_names
    # Assuming models/ directory is at ai-engine/models/
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../models/trained_model.pkl"))
    if not os.path.exists(model_path):
        print(f"WARNING: Model artifact not found at {model_path}.")
        return
    try:
        model_artifact = joblib.load(model_path)
        model = model_artifact["model"]
        feature_names = model_artifact["features"]
    except Exception as e:
        print(f"Failed to load model: {e}")

load_model()

class CustomerFeatures(BaseModel):
    customer_id: str
    total_orders: float = 0.0
    total_spent: float = 0.0
    avg_order_value: float = 0.0
    last_order_days_ago: float = 999.0
    pay_count_upi: float = 0.0
    pay_count_card: float = 0.0
    pay_count_netbanking: float = 0.0
    pay_count_wallet: float = 0.0

@router.post("/predict-uplift")
def predict_uplift(customer: CustomerFeatures):
    if model is None:
        raise HTTPException(status_code=500, detail="Model artifact is not loaded.")

    input_dict = customer.dict()
    df_input = pd.DataFrame([input_dict])

    for col in feature_names:
        if col not in df_input.columns:
            df_input[col] = 0.0

    X = df_input[feature_names]
    prob_z1 = model.predict_proba(X)[:, 1][0]
    uplift_score = float(2 * prob_z1 - 1)

    return {
        "customer_id": customer.customer_id,
        "uplift_score": round(uplift_score, 4)
    }
