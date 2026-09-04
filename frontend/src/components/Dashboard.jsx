import React, { useState } from 'react';
import { PlaneTakeoff, LogOut, Play, Loader2 } from 'lucide-react';
import api from '../api';
import ResultsView from './ResultsView';

export default function Dashboard({ onLogout }) {
  const [goal, setGoal] = useState('Increase repeat customer behavior');
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleRun = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const runRes = await api.post('/agent/run', { goal: `${goal}. budget: ${budget}` });
      if (runRes.data.status === 'success') {
        const activityRes = await api.get('/agent/activity');
        const runs = activityRes.data;
        const currentRun = runs.find(r => r.id === runRes.data.run_id);
        
        if (currentRun) {
          setResults({ ...runRes.data, fullRun: currentRun });
        } else {
          setError('Agent completed but could not fetch full database trace.');
        }
      } else {
        setError(runRes.data.error || 'Agent run failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to connect to GrowthPilot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <PlaneTakeoff size={28} />
            <span className="text-xl font-bold text-gray-900 tracking-tight">GrowthPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 hidden sm:block">{user?.email}</span>
            <button onClick={onLogout} className="text-gray-400 hover:text-gray-600 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900">Configure Growth Agent</h2>
            <p className="text-sm text-gray-500 mt-1">Define your business objective and intervention constraints.</p>
          </div>
          <form onSubmit={handleRun} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goal</label>
              <input
                type="text"
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="block w-full px-4 py-2.5 rounded-lg border-gray-300 border shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Constraint (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="block w-full px-4 py-2.5 rounded-lg border-gray-300 border shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75 transition-colors"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Play className="h-4 w-4" />}
                {loading ? 'Optimizing...' : 'Run GrowthPilot'}
              </button>
            </div>
          </form>
          {error && (
            <div className="px-6 pb-6">
              <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm font-medium border border-red-100">
                {error}
              </div>
            </div>
          )}
        </section>

        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Running GrowthPilot...</h3>
              <p className="text-sm text-gray-500 mt-1">Executing deterministic decision pipeline.</p>
            </div>
          </div>
        )}

        {!loading && !results && !error && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <PlaneTakeoff className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No GrowthPilot run yet.</h3>
            <p className="text-sm text-gray-500 mt-1">Enter a goal and budget to generate your first recommendation.</p>
          </div>
        )}

        {!loading && results && <ResultsView data={results} />}
      </main>
    </div>
  );
}
