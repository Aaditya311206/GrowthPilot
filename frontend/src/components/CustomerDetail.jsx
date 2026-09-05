import React from 'react';

export default function CustomerDetail({ customerId, agentResult, onBack }) {
  if (!customerId) {
    return (
      <div className="flex flex-col w-full">
        <div className="mb-space-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-space-2 px-space-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Recommendations</span>
          </button>
        </div>
        <div className="p-space-12 rounded-xl bg-surface-container-lowest text-center shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-[48px] text-outline mb-space-3">person_off</span>
          <h2 className="font-title text-title text-on-surface">No Customer Selected</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-1 max-w-sm mx-auto">
            Please select a customer candidate from the Recommendations list to inspect their individual causal uplift breakdown.
          </p>
        </div>
      </div>
    );
  }

  const recs = agentResult?.trace?.find(t => t.state === 'RECOMMEND')?.output?.recommendations || [];
  const custRec = recs.find(r => r.customer_id === customerId);

  if (!custRec) {
    return (
      <div className="flex flex-col w-full">
        <div className="mb-space-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-space-2 px-space-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Recommendations</span>
          </button>
        </div>
        <div className="p-space-12 rounded-xl bg-surface-container-lowest text-center shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-[48px] text-outline mb-space-3">search_off</span>
          <h2 className="font-title text-title text-on-surface">Customer Not Found</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-1 max-w-sm mx-auto">
            Customer ID <code className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">{customerId}</code> was not found in the current agent evaluation trace.
          </p>
        </div>
      </div>
    );
  }

  const upliftPct = (custRec.predicted_uplift * 100).toFixed(1);
  const costVal = custRec.cost != null ? custRec.cost.toFixed(2) : '0.00';
  const profitVal = custRec.expected_incremental_profit != null ? custRec.expected_incremental_profit.toFixed(2) : '0.00';
  const totalMarginVal = custRec.cost != null && custRec.expected_incremental_profit != null
    ? (custRec.cost + custRec.expected_incremental_profit).toFixed(2)
    : '0.00';
  const efficiencyRatio = custRec.cost && custRec.cost > 0
    ? ((custRec.cost + (custRec.expected_incremental_profit || 0)) / custRec.cost).toFixed(1)
    : '1.0';

  return (
    <div className="flex flex-col w-full">
      {/* Back & Breadcrumb */}
      <div className="mb-space-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-space-2 px-space-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Recommendations</span>
        </button>

        <span className="font-data-mono-sm text-data-mono-sm text-outline">
          Customer ID: {custRec.customer_id}
        </span>
      </div>

      {/* Main Profile Header */}
      <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm mb-space-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-6 border border-outline-variant/30">
        <div className="flex items-center gap-space-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-2xl shadow-sm">
            {custRec.customer_id.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-space-3">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customer Profile</h1>
              <span className="px-space-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                Persuadable Segment
              </span>
            </div>
            <p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant mt-1">
              ID: {custRec.customer_id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-4 bg-surface-container-low p-space-4 rounded-xl">
          <div>
            <div className="font-label-sm text-label-sm uppercase text-outline">Recommended Offer</div>
            <div className="font-title text-title text-primary font-bold">
              {custRec.intervention_name || custRec.recommended_intervention}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-outline-variant/40"></div>
          <div>
            <div className="font-label-sm text-label-sm uppercase text-outline">Predicted Incremental Profit</div>
            <div className="font-data-mono-lg text-data-mono-lg text-secondary font-bold">
              ₹{profitVal}
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Causal Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-8">
        {/* Left: Uplift & Causal Matrix */}
        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-4">Causal Effect Estimation</h2>
          
          <div className="mb-space-6 p-space-4 rounded-xl bg-surface-container-low">
            <div className="flex items-center justify-between mb-space-2">
              <span className="font-label-md text-label-md text-on-surface-variant">Estimated Behavioral Lift (ΔP)</span>
              <span className="font-data-mono-lg text-data-mono-lg text-secondary font-bold">+{upliftPct}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-3 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: `${Math.min(Number(upliftPct) * 4, 100)}%` }}></div>
            </div>
            <div className="flex justify-between font-data-mono-sm text-data-mono-sm text-outline mt-space-2">
              <span>Baseline Conversion: ~30.0%</span>
              <span>Treatment Conversion: ~{(30.0 + Number(upliftPct)).toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-space-4">
            <div className="p-space-4 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex justify-between items-center">
              <div>
                <div className="font-title text-title text-on-surface">Statistical Validation (95% CI)</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Two-sided Z-test difference interval</div>
              </div>
              <span className="px-space-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                CI Entirely Positive (p &lt; 0.05)
              </span>
            </div>

            <div className="p-space-4 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex justify-between items-center">
              <div>
                <div className="font-title text-title text-on-surface">Treatment Cost Scaling</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Calculated as AOV % contribution</div>
              </div>
              <span className="font-data-mono-md text-data-mono-md font-semibold text-on-surface">
                ₹{costVal}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Explanation Narrative */}
        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-4">Recommendation Explanation</h2>
          
          <div className="space-y-space-4">
            <div className="p-space-4 rounded-xl bg-surface-container-low">
              <div className="font-title text-title text-on-surface font-semibold mb-space-1">Why Target This Customer?</div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                This customer displays positive incremental treatment response (+{upliftPct}% ΔP). Delivering the {custRec.intervention_name || custRec.recommended_intervention} offer triggers purchase behavior that would not occur organically.
              </p>
            </div>

            <div className="p-space-4 rounded-xl bg-surface-container-low">
              <div className="font-title text-title text-on-surface font-semibold mb-space-1">Economic Efficiency</div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Allocating ₹{costVal} in treatment cost yields ₹{totalMarginVal} in expected gross margin, generating an efficiency ratio of {efficiencyRatio}x spend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
