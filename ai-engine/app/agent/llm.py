import os
import json
from pydantic import BaseModel, Field

def call_llm(prompt: str, response_model: type[BaseModel]) -> BaseModel:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(__file__), '../../../backend/.env'))
    mock_json = os.environ.get('MOCK_LLM_RESPONSE', '{}')
    try:
        data = json.loads(mock_json)
        return response_model(**data)
    except Exception as e:
        raise RuntimeError(f"LLM failed to return valid schema: {e}")

class DiscoveryOutput(BaseModel):
    target_segment: str = Field(description="The customer segment identified as an opportunity.")
    observed_problem: str = Field(description="Description of the issue or opportunity based ONLY on provided data.")
    evidence: str = Field(description="Citation of exact numbers from the data.")

class HypothesisOutput(BaseModel):
    proposed_intervention: str = Field(description="What action to take.")
    expected_behavioral_change: str = Field(description="What customer behavior will change.")
    expected_business_impact: str = Field(description="How this affects revenue/profit.")

class ExplanationOutput(BaseModel):
    incrementalProfit: float = Field(description="The exact incremental profit calculated by the engine.")
    lift: float = Field(description="The exact absolute lift calculated by the engine.")
    pValue: float = Field(description="The exact p-value calculated by the engine.")
    explanation: str = Field(description="Plain English explanation of the experiment results.")

def discover_opportunities(observation_data: dict) -> DiscoveryOutput:
    prompt = f"Analyze the following observation data: {json.dumps(observation_data)}. Identify the biggest opportunity. Do not invent numbers."
    return call_llm(prompt, DiscoveryOutput)

def generate_hypothesis(discovery_data: dict) -> HypothesisOutput:
    prompt = f"Given this discovery: {json.dumps(discovery_data)}, generate a business hypothesis. Do not invent numbers."
    return call_llm(prompt, HypothesisOutput)

def explain_analysis(analysis_data: dict) -> ExplanationOutput:
    prompt = f"Explain these statistical results: {json.dumps(analysis_data)}. Output the exact numerical values."
    explanation = call_llm(prompt, ExplanationOutput)
    
    # STRICT NUMERIC VALIDATION
    actual_profit = analysis_data["profitability"]["net_contribution_profit"]
    actual_lift = analysis_data["absolute_lift"]
    
    if abs(explanation.incrementalProfit - actual_profit) > 0.01:
        raise ValueError(f"LLM hallucinated incremental profit. Expected {actual_profit}, got {explanation.incrementalProfit}")
    if abs(explanation.lift - actual_lift) > 0.01:
        raise ValueError(f"LLM hallucinated lift. Expected {actual_lift}, got {explanation.lift}")
    
    return explanation
