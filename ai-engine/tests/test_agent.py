import pytest
import os
import json
from unittest.mock import MagicMock

os.environ["DATABASE_URL"] = "postgresql+pg8000://mock:mock@mock/mock"
from app.agent.state_machine import GrowthAgent, State
from app.agent.llm import discover_opportunities

# Setup mock database session
class MockDB:
    def __init__(self):
        self.adds = []
        self.commits = 0
        
    def add(self, obj):
        # Fake an ID generation
        if hasattr(obj, 'id') and not obj.id:
            obj.id = "mock-id-123"
        self.adds.append(obj)
        
    def commit(self):
        self.commits += 1
        
    def query(self, model):
        mock_query = MagicMock()
        mock_query.filter.return_value = mock_query
        mock_query.all.return_value = []
        return mock_query

def test_numeric_validation_failure(monkeypatch):
    # LLM hallucinates profit
    # actual is 25000, LLM outputs 50000
    mock_response = {
        "incrementalProfit": 50000.0,
        "lift": 0.08,
        "pValue": 0.03,
        "explanation": "Tests"
    }
    monkeypatch.setenv("MOCK_LLM_RESPONSE", json.dumps(mock_response))
    
    from app.agent.llm import explain_analysis
    analysis_data = {
        "profitability": {"net_contribution_profit": 25000.0},
        "absolute_lift": 0.08
    }
    
    with pytest.raises(ValueError, match="hallucinated incremental profit"):
        explain_analysis(analysis_data)

def test_agent_run_failure_halts_states(monkeypatch):
    # Mocking internal state
    mock_discovery = {
        "target_segment": "All",
        "observed_problem": "None",
        "evidence": "123"
    }
    monkeypatch.setenv("MOCK_LLM_RESPONSE", json.dumps(mock_discovery))
    db = MockDB()
    agent = GrowthAgent(db, "merch123", "test goal")
    
    # Run agent
    res = agent.run()
    
    assert res["status"] == "failed"
    assert "LLM failed" in res["error"] or "ML model is not loaded" in res["error"]
    
def test_optimization_logic():
    db = MockDB()
    agent = GrowthAgent(db, "merch123", "budget: 12.0")
    
    agent.state_data = {
        "prediction": {
            "customers": [
                {"customer_id": "c1", "features": {"avg_order_value": 500.0}, "predicted_uplift": 0.1},
                {"customer_id": "c2", "features": {"avg_order_value": 200.0}, "predicted_uplift": 0.1}
            ]
        }
    }
    
    # Run _validate, _optimize, _recommend, _output
    agent._validate()
    assert agent.state_data["validation"]["validated_customers"] == 2
    
    agent._optimize()
    assert len(agent.state_data["optimization"]["evaluations_by_customer"]) == 2
    
    agent._recommend()
    recs = agent.state_data["recommendation"]["final_recommendations"]
    assert len(recs) == 2
    
    # c1 is more profitable. Costs 10. Budget is 12.
    assert recs[0]["customer_id"] == "c1"
    assert recs[0]["recommended_intervention"] == "cashback_10"
    
    # c2 costs 5. Budget left is 2. So defaults to no_offer.
    assert recs[1]["customer_id"] == "c2"
    assert recs[1]["recommended_intervention"] == "no_offer"
    
    agent._output()
    assert "total_expected_profit" in agent.state_data["output"]
