import os
import json
from pydantic import BaseModel, Field

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
    tot_cust = observation_data.get("total_customers", 0)
    rep_rate = observation_data.get("repeat_rate", 0.0)
    aov = observation_data.get("merchant_aov", 0.0)
    
    return DiscoveryOutput(
        target_segment="At-Risk & Low-Frequency Customers",
        observed_problem=f"Repeat purchase rate is {rep_rate:.1%} across {tot_cust} total customers with average order value of INR {aov:.2f}.",
        evidence=f"Total Customers: {tot_cust}, Repeat Rate: {rep_rate:.2%}, Merchant AOV: INR {aov:.2f}"
    )

def generate_hypothesis(discovery_data: dict) -> HypothesisOutput:
    seg = discovery_data.get("target_segment", "Target Customers")
    return HypothesisOutput(
        proposed_intervention="Personalized Targeted Incentive Allocation (Discount / Cashback / Free Shipping)",
        expected_behavioral_change=f"Increase purchase frequency and re-engagement among {seg}.",
        expected_business_impact="Maximize net incremental contribution profit under strict merchant budget constraints."
    )

def explain_analysis(analysis_data: dict) -> ExplanationOutput:
    actual_profit = float(analysis_data.get("profitability", {}).get("net_contribution_profit", 0.0))
    actual_lift = float(analysis_data.get("absolute_lift", 0.0))
    actual_p = float(analysis_data.get("statistics", {}).get("p_value", 1.0))
    
    is_sig = analysis_data.get("statistics", {}).get("is_significant", False)
    is_prof = analysis_data.get("profitability", {}).get("is_profitable", False)
    
    expl_text = (
        f"Experiment yields an absolute lift of {actual_lift:.2%} (p-value: {actual_p:.4f}) and "
        f"net incremental profit of INR {actual_profit:.2f}. "
        f"Statistical significance: {is_sig}. Economic profitability: {is_prof}."
    )
    
    return ExplanationOutput(
        incrementalProfit=round(actual_profit, 2),
        lift=round(actual_lift, 4),
        pValue=round(actual_p, 4),
        explanation=expl_text
    )
