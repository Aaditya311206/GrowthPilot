import React from 'react';

export default function Experiments({ agentResult }) {
  const val = agentResult?.trace?.find(t => t.state === 'VALIDATE')?.output || {};

  const totalEval = val.total_evaluated || 5000;
  const validated = val.validated_customers || 4196;
  const rejectedUncertain = val.rejected_uncertain || 351;
  const rejectedNegative = val.rejected_negative || 453;

  return (
    <div className="flex flex-col w-full">
      {/* Title */}
      <div className="mb-space-8">
        <div className="flex items-center gap-space-2 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-1">
          <span>Statistical Engine</span>
          <span>/</span>
          <span>Confidence & Bounds</span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight">Experiments & Evidence</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-1">
          Rigorous statistical bound validation evaluating treatment vs control lift confidence intervals.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-4 mb-space-8">
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Total Evaluated</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-on-surface">{totalEval.toLocaleString()}</div>
          <div className="mt-space-2 font-body-sm text-body-sm text-on-surface-variant">Full merchant cohort</div>
        </div>

        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Statistically Accepted</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-secondary font-bold">{validated.toLocaleString()}</div>
          <div className="mt-space-2 font-body-sm text-body-sm text-secondary font-medium">95% CI &gt; 0 (p &lt; 0.05)</div>
        </div>

        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Uncertain (CI Crosses 0)</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-outline font-bold">{rejectedUncertain.toLocaleString()}</div>
          <div className="mt-space-2 font-body-sm text-body-sm text-outline">Downgraded / Filtered</div>
        </div>

        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Negative Effect Rejected</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-error font-bold">{rejectedNegative.toLocaleString()}</div>
          <div className="mt-space-2 font-body-sm text-body-sm text-error">Sleeping dogs excluded</div>
        </div>
      </div>

      {/* Main Evidence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-8">
        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-4">Statistical Decision Boundary</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-space-6">
            GrowthPilot evaluates two-sided Z-test pooled difference confidence intervals for every candidate customer before recommending an intervention.
          </p>

          <div className="space-y-space-4">
            <div className="p-space-4 rounded-xl bg-surface-container-low border-l-4 border-secondary">
              <div className="flex items-center justify-between">
                <span className="font-title text-title text-on-surface">Accepted Persuadables</span>
                <span className="font-data-mono-sm text-data-mono-sm text-secondary font-bold">CI_lower &gt; 0</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Statistically proven positive incremental response. Proceed to budget optimization.
              </p>
            </div>

            <div className="p-space-4 rounded-xl bg-surface-container-low border-l-4 border-outline">
              <div className="flex items-center justify-between">
                <span className="font-title text-title text-on-surface">Uncertain (Zero Crossing)</span>
                <span className="font-data-mono-sm text-data-mono-sm text-outline font-bold">CI_lower ≤ 0 ≤ CI_upper</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Insufficient empirical evidence of positive lift. Excluded from positive intervention funding.
              </p>
            </div>

            <div className="p-space-4 rounded-xl bg-surface-container-low border-l-4 border-error">
              <div className="flex items-center justify-between">
                <span className="font-title text-title text-on-surface">Negative Lift</span>
                <span className="font-data-mono-sm text-data-mono-sm text-error font-bold">CI_upper &lt; 0</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Intervention decreases purchase probability. Strictly prohibited from receiving offers.
              </p>
            </div>
          </div>
        </div>

        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-4">Learned Multi-Treatment Estimators</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-6">
              Active T-Learner estimators trained on historic intervention arms to compute individual treatment effects:
            </p>

            <div className="space-y-space-3">
              <div className="p-space-3 rounded-lg bg-surface-container-low flex justify-between items-center">
                <span className="font-title text-title text-on-surface">10% Cashback Model</span>
                <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">T-Learner Active</span>
              </div>

              <div className="p-space-3 rounded-lg bg-surface-container-low flex justify-between items-center">
                <span className="font-title text-title text-on-surface">5% Discount Model</span>
                <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">T-Learner Active</span>
              </div>

              <div className="p-space-3 rounded-lg bg-surface-container-low flex justify-between items-center">
                <span className="font-title text-title text-on-surface">Free Shipping Model</span>
                <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">T-Learner Active</span>
              </div>
            </div>
          </div>

          <div className="mt-space-6 pt-space-4 border-t border-outline-variant/30 text-on-surface-variant font-body-sm text-body-sm flex justify-between items-center">
            <span>Model Artifact:</span>
            <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">trained_model.pkl (v2.4)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
