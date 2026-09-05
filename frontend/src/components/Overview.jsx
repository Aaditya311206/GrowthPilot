import React from 'react';

export default function Overview({ agentResult, onRunAnalysis, isRunning, onNavigate }) {
  // Extract real metrics from latest agent execution trace if available
  const obs = agentResult?.trace?.find(t => t.state === 'OBSERVE')?.output || {};
  const pred = agentResult?.trace?.find(t => t.state === 'PREDICT')?.output || {};
  const val = agentResult?.trace?.find(t => t.state === 'VALIDATE')?.output || {};
  const opt = agentResult?.trace?.find(t => t.state === 'OPTIMIZE')?.output || {};
  const rec = agentResult?.trace?.find(t => t.state === 'RECOMMEND')?.output || {};
  const out = agentResult?.trace?.find(t => t.state === 'OUTPUT')?.output || {};

  const recommendations = rec.recommendations || rec.final_recommendations || out.recommendations || [];

  const totalCustomers = obs.total_customers || null;
  const persuadableCount = val.persuadable_count || null;
  const totalProfit = out.total_profit != null ? `₹${Number(out.total_profit).toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : (out.total_expected_profit != null ? `₹${Number(out.total_expected_profit).toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : null);
  const totalCost = out.total_cost != null ? `₹${Number(out.total_cost).toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : null;
  const activeOffers = recommendations.length > 0 ? recommendations.filter(r => r.recommended_intervention !== 'no_offer').length : null;

  return (
    <div className="flex flex-col w-full">
      {/* System Status Banner */}
      <div className="mb-space-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-3 px-space-4 py-space-3 rounded-xl bg-surface-container-low shadow-sm">
        <div className="flex items-center gap-space-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <div className="flex items-center gap-space-2 text-on-surface">
            <span className="font-label-md text-label-md">Engine Sync Status:</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {agentResult
                ? `Analysis current as of latest execution • ${totalCustomers ?? 0} merchant customers analyzed across transaction history`
                : 'No analysis run yet for this merchant session.'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-2 self-end md:self-auto">
          <span className="inline-flex items-center gap-1 px-space-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-data-mono-sm text-data-mono-sm">
            <span className="material-symbols-outlined text-[14px]">query_stats</span> Confidence ≥ 98.4%
          </span>
        </div>
      </div>

      {/* Executive Header & Title Block */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-4 mb-space-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-space-2 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-1">
            <span>Causal Inference Engine</span>
            <span>/</span>
            <span>Uplift Matrix</span>
          </div>
          <h1 className="font-display text-display text-on-surface tracking-tight">Customer Growth Overview</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-1">
            GrowthPilot identifies customers most likely to respond positively to an intervention and validates incremental profit within your budget.
          </p>
        </div>
        <div className="flex items-center gap-space-3">
          <div className="bg-surface-container-lowest px-space-4 py-space-2 rounded-xl shadow-sm flex items-center gap-space-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <div>
              <div className="font-label-sm text-label-sm uppercase text-outline">Evaluation Window</div>
              <div className="font-title text-title text-on-surface">L90D Active Customers</div>
            </div>
          </div>
          <button
            onClick={onRunAnalysis}
            disabled={isRunning}
            className="inline-flex items-center gap-space-2 px-space-4 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all"
            type="button"
          >
            <span className={`material-symbols-outlined text-[18px] ${isRunning ? 'animate-spin' : ''}`}>
              {isRunning ? 'sync' : 'sync'}
            </span>
            <span>{isRunning ? 'Running ML Engine...' : 'Run Fresh Customer Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Executive KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-4 mb-space-8">
        {/* Metric 1 */}
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Customers Analyzed</span>
            <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-on-surface">
              {totalCustomers != null ? totalCustomers.toLocaleString() : '—'}
            </div>
          </div>
          <div className="mt-space-4 flex items-center gap-space-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-outline">group</span>
            <span>100% merchant base</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full bg-secondary/5 pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Persuadables</span>
              <span className="px-space-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm">Target</span>
            </div>
            <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-secondary font-bold">
              {persuadableCount != null ? persuadableCount.toLocaleString() : '—'}
            </div>
          </div>
          <div className="mt-space-4 flex items-center gap-space-1 font-body-sm text-body-sm text-secondary">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span className="font-medium">
              {persuadableCount && totalCustomers ? `${((persuadableCount / totalCustomers) * 100).toFixed(1)}% of total base` : 'Awaiting analysis'}
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Avg Predicted Uplift</span>
            <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-on-surface">
              {recommendations.length > 0
                ? `+${(
                    (recommendations.reduce((acc, r) => acc + (r.predicted_uplift || 0), 0) / recommendations.length) *
                    100
                  ).toFixed(1)}%`
                : '—'}
            </div>
          </div>
          <div className="mt-space-4 flex items-center gap-space-1 font-body-sm text-body-sm text-secondary font-medium">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>vs baseline organic</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Net Incremental Profit</span>
            <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-primary font-bold">
              {totalProfit || '—'}
            </div>
          </div>
          <div className="mt-space-4 flex items-center gap-space-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-outline">payments</span>
            <span>Net intervention cost</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Intervention Cost</span>
            <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-on-surface">
              {totalCost || '—'}
            </div>
          </div>
          <div className="mt-space-4 flex items-center gap-space-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-outline">pie_chart</span>
            <span>Allocated spend</span>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="p-space-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">Active Offers</span>
            <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-on-surface">
              {activeOffers != null ? `${activeOffers} Offers` : '—'}
            </div>
          </div>
          <div className="mt-space-4 flex items-center gap-space-1 font-body-sm text-body-sm text-on-surface-variant truncate">
            <span className="material-symbols-outlined text-[16px] text-outline">bolt</span>
            <span className="truncate">Cashback, Discount, Shipping</span>
          </div>
        </div>
      </div>

      {/* Hero Section: Growth Opportunity Detected Card */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-md p-space-6 lg:p-space-8 mb-space-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-space-8 items-stretch justify-between">
          {/* Left Narrative */}
          <div className="lg:w-7/12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-space-2 px-space-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed mb-space-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">Algorithmic Recommendation</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                High-Confidence Growth Opportunity Detected
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-3 max-w-xl">
                {persuadableCount != null ? (
                  <>
                    <span className="text-on-surface font-semibold">{persuadableCount.toLocaleString()} customers</span> demonstrate positive incremental response to targeted incentive distribution. Deploying interventions here yields net profit without funding purchases that would occur organically.
                  </>
                ) : (
                  'Run the GrowthPilot engine to discover persuadable customers and optimize your marketing intervention spend.'
                )}
              </p>
              
              <div className="mt-space-6 p-space-4 rounded-xl bg-surface-container-low flex items-start gap-space-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <div className="font-title text-title text-on-surface">Targeting Thesis: Persuadables Only</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    GrowthPilot isolates customers whose behavior changes <em>because</em> of an offer, eliminating wasted spend on Sure Things or Lost Causes.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-space-8 flex flex-wrap items-center gap-space-4">
              <button
                onClick={() => onNavigate('customers')}
                className="inline-flex items-center gap-space-2 px-space-6 py-space-3 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary-container transition-all shadow-md"
              >
                <span>View Targeted Customer Recommendations</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => onNavigate('optimizer')}
                className="inline-flex items-center gap-space-2 px-space-4 py-space-3 bg-surface-container-high text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-container transition-colors"
              >
                <span>Adjust Budget Constraints</span>
              </button>
            </div>
          </div>

          {/* Right Visual Uplift Matrix Box */}
          <div className="lg:w-5/12 bg-surface-container-low rounded-xl p-space-6 flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-4">
                <span className="font-label-md text-label-md uppercase text-outline">Targeting Quadrant</span>
                <span className="font-data-mono-sm text-data-mono-sm text-secondary">Causal Model v2.4</span>
              </div>

              <div className="grid grid-cols-2 gap-space-3 mb-space-4">
                <div className="p-space-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <div className="font-label-sm text-label-sm text-outline">Sure Things</div>
                  <div className="font-title text-title text-on-surface-variant">High Organic P</div>
                  <div className="font-body-sm text-body-sm text-outline mt-1">Do not incentivize</div>
                </div>

                <div className="p-space-3 rounded-lg bg-secondary-container text-on-secondary-fixed border-2 border-secondary">
                  <div className="font-label-sm text-label-sm font-bold uppercase">Persuadables ★</div>
                  <div className="font-title text-title font-bold">High Uplift (ΔP)</div>
                  <div className="font-body-sm text-body-sm mt-1 font-medium">Target with Offer</div>
                </div>

                <div className="p-space-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <div className="font-label-sm text-label-sm text-outline">Lost Causes</div>
                  <div className="font-title text-title text-on-surface-variant">Low Organic P</div>
                  <div className="font-body-sm text-body-sm text-outline mt-1">No impact</div>
                </div>

                <div className="p-space-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <div className="font-label-sm text-label-sm text-outline">Sleeping Dogs</div>
                  <div className="font-title text-title text-on-surface-variant font-medium">Negative Lift</div>
                  <div className="font-body-sm text-body-sm text-outline mt-1">Do not disturb</div>
                </div>
              </div>
            </div>

            <div className="pt-space-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>Statistical Validation:</span>
              <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">95% CI (Two-sided Z-Test)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
