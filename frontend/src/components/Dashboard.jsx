import React, { useState } from 'react';
import { LogOut, Play, ShieldAlert, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api';
import ResultsView from './ResultsView';

export default function Dashboard({ onLogout }) {
  const [goal, setGoal] = useState('Increase repeat customer behavior.');
  const [budget, setBudget] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const runAgent = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        goal: budget ? `${goal} budget: ${budget}` : goal
      };
      const res = await api.post('/agent/run', payload);
      const runId = res.data.run_id;

      if (!runId) throw new Error("Agent run failed to return a valid ID");

      // Fetch the full trace
      const activityRes = await api.get('/agent/activity');
      const runs = Array.isArray(activityRes.data)
        ? activityRes.data
        : (activityRes.data?.runs || []);
      const latestRun = runs.find(r => r.id === runId) || runs[0];

      if (latestRun) {
        setResult(latestRun);
      } else {
        setResult({
          id: runId,
          status: res.data?.status || 'COMPLETED',
          actions: res.data?.trace || []
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'An error occurred during agent execution.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Premium Sticky Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">GrowthPilot Dashboard</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="animate-fade-in-up">
          <div className="glass-card rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl mix-blend-screen pointer-events-none"></div>
            
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Configure Growth Campaign</h2>
              <p className="text-slate-400 mb-8 text-lg">Define your business objective and constraints. GrowthPilot will deterministically calculate the optimal interventions for your customer base.</p>
              
              {error && (
                <div className="mb-8 bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={20} />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">Target Objective</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent p-4 transition-all resize-none shadow-inner"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="E.g., Increase repeat customer behavior."
                  />
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300">Budget Constraint (INR)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-500 font-medium">₹</span>
                      </div>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-4 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-inner text-lg font-medium"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <button
                    onClick={runAgent}
                    disabled={loading}
                    className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white transition-all ${
                      loading 
                        ? 'bg-slate-700 cursor-not-allowed opacity-80' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 animate-glow'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6" />
                        Executing AI Pipeline...
                      </>
                    ) : (
                      <>
                        <Play className="-ml-1 mr-3 h-6 w-6 fill-current" />
                        Run GrowthPilot Pipeline
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Injection */}
        {result && (
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 flex items-center space-x-2">
              <ShieldAlert className="text-cyan-400" size={24} />
              <h2 className="text-2xl font-bold text-white tracking-tight">Execution Trace & Results</h2>
            </div>
            <ResultsView runData={result} />
          </div>
        )}
      </main>
    </div>
  );
}

