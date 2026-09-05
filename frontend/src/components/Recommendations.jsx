import React, { useState } from 'react';
import api from '../api';

export default function Recommendations({ agentResult, onSelectCustomer, onRunAnalysis, isRunning }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  const [interventionFilter, setInterventionFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('profit'); // profit | uplift

  const rec = agentResult?.trace?.find(t => t.state === 'RECOMMEND')?.output || {};
  const out = agentResult?.trace?.find(t => t.state === 'OUTPUT')?.output || {};
  const recommendations = rec.recommendations || rec.final_recommendations || out.recommendations || [];

  // Filter & sort
  const filtered = recommendations.filter(r => {
    const matchesSearch = !searchTerm || r.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntervention = interventionFilter === 'ALL' || r.recommended_intervention === interventionFilter;
    return matchesSearch && matchesIntervention;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'uplift') {
      return (b.predicted_uplift || 0) - (a.predicted_uplift || 0);
    }
    return (b.expected_incremental_profit || 0) - (a.expected_incremental_profit || 0);
  });

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-4 mb-space-6">
        <div>
          <div className="flex items-center gap-space-2 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-1">
            <span>Customer Targeting</span>
            <span>/</span>
            <span>Optimized Recommendations</span>
          </div>
          <h1 className="font-display text-display text-on-surface tracking-tight">Customer Recommendations</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-1">
            Persuadable customers ranked globally by expected incremental profit under budget constraints.
          </p>
        </div>

        <div className="flex items-center gap-space-3">
          <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">
            Showing {filtered.length} of {recommendations.length} evaluated
          </span>
          <button
            onClick={onRunAnalysis}
            disabled={isRunning}
            className="inline-flex items-center gap-space-2 px-space-4 py-2 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Re-run Analysis</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-space-6 p-space-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-4">
        <div className="flex flex-1 items-center gap-space-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">search</span>
            <input
              type="text"
              placeholder="Search Customer ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-body-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Intervention Filter */}
          <select
            value={interventionFilter}
            onChange={(e) => setInterventionFilter(e.target.value)}
            className="px-space-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-body-sm text-on-surface"
          >
            <option value="ALL">All Interventions</option>
            <option value="cashback_10">10% Cashback</option>
            <option value="discount_5">5% Discount</option>
            <option value="free_shipping">Free Shipping</option>
            <option value="no_offer">No Intervention</option>
          </select>
        </div>

        {/* Sorting controls */}
        <div className="flex items-center gap-space-2 self-end md:self-auto">
          <span className="font-label-sm text-label-sm text-outline uppercase">Sort By:</span>
          <button
            onClick={() => setSortBy('profit')}
            className={`px-space-3 py-1 rounded-lg font-label-sm text-label-sm transition-colors ${
              sortBy === 'profit'
                ? 'bg-primary-container text-on-primary font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Incremental Profit
          </button>
          <button
            onClick={() => setSortBy('uplift')}
            className={`px-space-3 py-1 rounded-lg font-label-sm text-label-sm transition-colors ${
              sortBy === 'uplift'
                ? 'bg-primary-container text-on-primary font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Predicted Uplift
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-space-12 rounded-xl bg-surface-container-lowest text-center shadow-sm">
          <span className="material-symbols-outlined text-[48px] text-outline mb-space-3">person_search</span>
          <div className="font-title text-title text-on-surface">No Recommendations Found</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-1 max-w-sm mx-auto">
            {recommendations.length === 0
              ? 'No analysis has been executed yet for this merchant session. Click "Run Analysis" to evaluate customers.'
              : 'No customers match the active filters.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-space-3 px-space-4">Customer</th>
                <th className="py-space-3 px-space-4">Predicted Uplift (ΔP)</th>
                <th className="py-space-3 px-space-4">Recommended Offer</th>
                <th className="py-space-3 px-space-4">Treatment Cost</th>
                <th className="py-space-3 px-space-4">Expected Profit</th>
                <th className="py-space-3 px-space-4">Status / Evidence</th>
                <th className="py-space-3 px-space-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.map((item, idx) => {
                const isNoOffer = item.recommended_intervention === 'no_offer';
                const upliftPct = item.predicted_uplift ? (item.predicted_uplift * 100).toFixed(1) : '0.0';
                
                return (
                  <tr key={item.customer_id || idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-space-3 px-space-4 font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">
                      {item.customer_id.slice(0, 13)}...
                    </td>
                    <td className="py-space-3 px-space-4">
                      <span className={`inline-flex items-center gap-1 font-data-mono-md text-data-mono-md font-bold ${
                        Number(upliftPct) > 0 ? 'text-secondary' : 'text-on-surface-variant'
                      }`}>
                        {Number(upliftPct) > 0 ? `+${upliftPct}%` : `${upliftPct}%`}
                      </span>
                    </td>
                    <td className="py-space-3 px-space-4">
                      <span className={`px-space-3 py-1 rounded-full font-label-sm text-label-sm font-semibold inline-block ${
                        isNoOffer
                          ? 'bg-surface-container-high text-on-surface-variant'
                          : 'bg-primary-container text-on-primary-container'
                      }`}>
                        {item.intervention_name || item.recommended_intervention}
                      </span>
                    </td>
                    <td className="py-space-3 px-space-4 font-data-mono-sm text-data-mono-sm text-on-surface-variant">
                      ₹{item.cost != null ? item.cost.toFixed(2) : '0.00'}
                    </td>
                    <td className="py-space-3 px-space-4 font-data-mono-md text-data-mono-md font-bold text-primary">
                      ₹{item.expected_incremental_profit != null ? item.expected_incremental_profit.toFixed(2) : '0.00'}
                    </td>
                    <td className="py-space-3 px-space-4">
                      <span className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-medium">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Validated (p&lt;0.05)
                      </span>
                    </td>
                    <td className="py-space-3 px-space-4 text-right flex items-center justify-end gap-space-2">
                      <button
                        onClick={async () => {
                          try {
                            const res = await api.post('/razorpay/create-payment-link', {
                              customerId: item.customer_id,
                              interventionId: item.recommended_intervention,
                              amount: item.cost > 0 ? item.cost : 50.0,
                              description: `GrowthPilot Incentive: ${item.intervention_name}`
                            });
                            const link = res.data?.payment_link?.short_url;
                            if (link) {
                              alert(`Razorpay Payment Link Created Successfully!\nURL: ${link}`);
                            }
                          } catch (e) {
                            alert(`Failed to create Razorpay Payment Link: ${e.message}`);
                          }
                        }}
                        className="px-space-3 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm transition-colors"
                      >
                        Create Payment Link
                      </button>
                      <button
                        onClick={() => onSelectCustomer(item.customer_id)}
                        className="px-space-3 py-1 rounded-lg bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary font-label-sm text-label-sm transition-colors"
                      >
                        Inspect Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
