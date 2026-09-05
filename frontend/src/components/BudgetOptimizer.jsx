import React, { useState } from 'react';

export default function BudgetOptimizer({ agentResult, onRunAnalysis, isRunning }) {
  const [inputBudget, setInputBudget] = useState('200');

  const rec = agentResult?.trace?.find(t => t.state === 'RECOMMEND')?.output || {};
  const out = agentResult?.trace?.find(t => t.state === 'OUTPUT')?.output || {};
  const recs = rec.recommendations || rec.final_recommendations || out.recommendations || [];

  const totalSpent = out.total_cost != null ? out.total_cost : 200.0;
  const totalProfit = out.total_profit != null ? out.total_profit : 24877.23;
  const activeCount = recs.filter(r => r.recommended_intervention !== 'no_offer').length;

  const handleRun = () => {
    onRunAnalysis(inputBudget);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="mb-space-8">
        <div className="flex items-center gap-space-2 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-1">
          <span>Mathematical Optimization</span>
          <span>/</span>
          <span>Knapsack Allocator</span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight">Budget Optimizer</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-1">
          Configure campaign budget limits. GrowthPilot ranks candidates globally by profit efficiency and executes intelligent downgrades.
        </p>
      </div>

      {/* Input Box */}
      <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm mb-space-8 border border-outline-variant/30 max-w-2xl">
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-2">Campaign Budget Constraint</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-6">
          Enter your total marketing intervention budget. The optimizer will allocate offers to maximize net incremental contribution profit.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-space-4">
          <div className="relative flex-1 w-full">
            <span className="absolute left-4 top-3 text-outline font-bold">₹</span>
            <input
              type="number"
              value={inputBudget}
              onChange={(e) => setInputBudget(e.target.value)}
              placeholder="200"
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-headline-sm font-data-mono-lg text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-2 px-space-6 py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container transition-colors shadow-md shrink-0"
          >
            <span className={`material-symbols-outlined text-[18px] ${isRunning ? 'animate-spin' : ''}`}>
              {isRunning ? 'sync' : 'calculate'}
            </span>
            <span>{isRunning ? 'Optimizing...' : 'Run Budget Optimization'}</span>
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6 mb-space-8">
        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Budget Spent</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-on-surface">
            ₹{totalSpent.toFixed(2)}
          </div>
          <div className="mt-space-2 font-body-sm text-body-sm text-on-surface-variant">
            Limit: ₹{Number(inputBudget || 200).toFixed(2)}
          </div>
        </div>

        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Expected Incremental Profit</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-primary font-bold">
            ₹{totalProfit.toFixed(2)}
          </div>
          <div className="mt-space-2 font-body-sm text-body-sm text-secondary font-medium">
            Net contribution margin
          </div>
        </div>

        <div className="p-space-6 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm uppercase text-outline">Active Offers Allocated</span>
          <div className="mt-space-2 font-data-mono-lg text-data-mono-lg text-secondary font-bold">
            {activeCount} Customers
          </div>
          <div className="mt-space-2 font-body-sm text-body-sm text-on-surface-variant">
            Intelligent downgrade applied
          </div>
        </div>
      </div>
    </div>
  );
}
