import json
from payment_analysis import analyze_payment_dropoff
from treatment_analysis import analyze_treatment_opportunities

def main():
    print("Running Phase 3 Analytics & Opportunity Detection Engine...\n")
    
    opportunities = []
    
    print("Scanning PostgreSQL for Payment Drop-off Opportunities...")
    payment_opp = analyze_payment_dropoff()
    opportunities.append(payment_opp)
    
    print("Scanning Data Lake for Historical Causal Treatment Opportunities...")
    treatment_opps = analyze_treatment_opportunities()
    opportunities.extend(treatment_opps)
    
    print("\n--- DISCOVERY RESULTS ---")
    
    output = {"opportunities": opportunities}
    print(json.dumps(output, indent=2))
    
    print("\nPHASE 3 EXECUTION COMPLETE.")

if __name__ == "__main__":
    main()
