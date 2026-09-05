import os
import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

model_artifact = None
model = None
control_model = None
treatment_models = {}
feature_names = []

def load_model():
    global model_artifact, model, control_model, treatment_models, feature_names
    # Assuming models/ directory is at ai-engine/models/
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../models/trained_model.pkl"))
    if not os.path.exists(model_path):
        print(f"WARNING: Model artifact not found at {model_path}.")
        return
    try:
        model_artifact = joblib.load(model_path)
        model = model_artifact["model"]
        control_model = model_artifact.get("control_model")
        treatment_models = model_artifact.get("treatment_models", {})
        feature_names = model_artifact["features"]
    except Exception as e:
        print(f"Failed to load model: {e}")

load_model()

class CustomerFeatures(BaseModel):
    customer_id: str
    total_orders: float
    total_spent: float
    avg_order_value: float
    last_order_days_ago: float
    pay_count_credit_card: float
    pay_count_netbanking: float
    pay_count_upi: float

@router.post("/predict-uplift")
def predict_uplift(customer: CustomerFeatures):
    if model is None:
        raise HTTPException(status_code=500, detail="Model artifact is not loaded.")

    input_dict = customer.dict()
    df_input = pd.DataFrame([input_dict])

    missing_features = [col for col in feature_names if col not in df_input.columns]
    if missing_features:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required features for model inference: {missing_features}. Silent zero-filling is prohibited."
        )

    X = df_input[feature_names]
    prob_z1 = model.predict_proba(X)[:, 1][0]
    uplift_score = float(2 * prob_z1 - 1)

    return {
        "customer_id": customer.customer_id,
        "uplift_score": round(uplift_score, 4)
    }

