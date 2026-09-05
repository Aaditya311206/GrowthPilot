import pytest
import os
import json
from unittest.mock import MagicMock

os.environ["DATABASE_URL"] = "postgresql+pg8000://mock:mock@mock/mock"
from app.agent.state_machine import GrowthAgent, State
from app.agent.llm import discover_opportunities, generate_hypothesis, explain_analysis

# Setup mock database session
class MockDB:
    def __init__(self):
        self.adds = []
        self.commits = 0
        
    def add(self, obj):
        if hasattr(obj, 'id') and not obj.id:
            obj.id = "mock-id-123"
        self.adds.append(obj)
        
    def commit(self):
        self.commits += 1
        
    def query(self, model):
        mock_query = MagicMock()
        mock_query.filter.return_value = mock_query
        mock_query.all.return_value = []
        mock_query.join.return_value = mock_query
        return mock_query

def test_explain_analysis_output():
    analysis_data = {
        "profitability": {"net_contribution_profit": 25000.0, "is_profitable": True},
        "absolute_lift": 0.08,
        "statistics": {"p_value": 0.03, "is_significant": True}
    }
    
    explanation = explain_analysis(analysis_data)
    assert explanation.incrementalProfit == 25000.0
    assert explanation.lift == 0.08
    assert explanation.pValue == 0.03

def test_agent_run_failure_halts_states():
    db = MockDB()
    agent = GrowthAgent(db, "merch123", "test goal budget: -10")
    
    res = agent.run()
    assert res["status"] == "failed"
    assert "Budget cannot be negative" in res["error"] or "ML model is not loaded" in res["error"]
    
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
    # Without historical experiment DB records, validated_customers is 0 and validation_status is INSUFFICIENT_EVIDENCE
    assert agent.state_data["validation"]["validated_customers"] == 0
    assert agent.state_data["validation"]["status_breakdown"]["INSUFFICIENT_EVIDENCE"] == 2
    
    agent._optimize()
    assert len(agent.state_data["optimization"]["evaluations_by_customer"]) == 2
    
    agent._recommend()
    recs = agent.state_data["recommendation"]["final_recommendations"]
    assert len(recs) == 2
    
    # c1 is more profitable under percentage cost (AOV 500 => free_shipping flat cost 8 vs 10% cashback cost 50). Budget is 12.
    assert recs[0]["customer_id"] == "c1"
    assert recs[0]["recommended_intervention"] in ["free_shipping", "cashback_10"]
    
    # c2 costs 5. Budget left is 2. So defaults to no_offer.
    assert recs[1]["customer_id"] == "c2"
    assert recs[1]["recommended_intervention"] == "no_offer"
    
    agent._output()
    assert "total_expected_profit" in agent.state_data["output"]

