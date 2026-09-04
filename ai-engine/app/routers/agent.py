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
    agent = GrowthAgent(db, req.merchant_id, req.goal)
    result = agent.run()
    
    if result["status"] == "failed":
        # We can still return 200 with failed status so the client sees the trace, or 500
        # Given it's a tracked run, returning 200 with the error allows the UI to render the trace
        return result
    
    return result
