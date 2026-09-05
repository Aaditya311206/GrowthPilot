from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from ..agent.state_machine import GrowthAgent

router = APIRouter(prefix="/agent", tags=["AI Orchestrator"])

class AgentRunRequest(BaseModel):
    merchant_id: str
    goal: str

@router.post("/run")
def run_agent(req: AgentRunRequest, db: Session = Depends(get_db)):
    """
    Triggers a full custom state machine orchestration run.
    """
    if "budget:" in req.goal.lower():
        try:
            b_str = req.goal.lower().split("budget:")[1].strip().split()[0]
            val = float(b_str)
            if val < 0:
                raise ValueError("Budget cannot be negative")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid or malformed budget in goal: {e}")

    agent = GrowthAgent(db, req.merchant_id, req.goal)
    result = agent.run()
    
    if result["status"] == "failed":
        return result
    
    return result
