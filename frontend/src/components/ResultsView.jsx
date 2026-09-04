import React, { useState } from 'react';
import IncrementalImpact from './IncrementalImpact';
import InterventionSimulator from './InterventionSimulator';
import CausalDiagnostics from './CausalDiagnostics';
import CohortExplorer from './CohortExplorer';
import { Activity, Target, ShieldAlert, Users } from 'lucide-react';

export default function ResultsView({ runData }) {
  const [activeTab, setActiveTab] = useState('impact');

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50 w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab('impact')}
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'impact' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity size={16} className="mr-2" /> Incremental Impact
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Target size={16} className="mr-2" /> Campaign Simulator
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'diagnostics' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldAlert size={16} className="mr-2" /> Causal Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('cohort')}
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'cohort' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users size={16} className="mr-2" /> Cohort Explorer
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl relative">
        <div className="w-full h-full min-h-[600px] overflow-y-auto">
          {activeTab === 'impact' && <IncrementalImpact />}
          {activeTab === 'simulator' && <InterventionSimulator />}
          {activeTab === 'diagnostics' && <CausalDiagnostics />}
          {activeTab === 'cohort' && <CohortExplorer />}
        </div>
      </div>
    </div>
  );
}
