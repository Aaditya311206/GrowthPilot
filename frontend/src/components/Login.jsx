import React, { useState } from 'react';
import { PlaneTakeoff, Loader2, Sparkles, TrendingUp, Target, Database } from 'lucide-react';
import api from '../api';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const payload = isRegistering 
        ? { email, password, merchantName } 
        : { email, password };

      const res = await api.post(endpoint, payload);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onLogin(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-100 bg-slate-900">
      {/* Left side showcase panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-12 flex-col justify-between">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl mix-blend-screen"></div>
        
        <div className="relative z-10 flex items-center space-x-3">
          <div className="h-10 w-10 bg-white/10 rounded-lg backdrop-blur flex items-center justify-center shadow-inner border border-white/20">
            <PlaneTakeoff size={24} className="text-purple-300" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-cyan-200">
            GrowthPilot
          </span>
        </div>

        <div className="relative z-10 mt-20 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Deterministic AI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Profit Optimization.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md leading-relaxed font-light">
            Empower your merchant dashboard with a multi-agent system that analyzes RFM behavior, computes statistical uplift bounds, and recommends actionable interventions to maximize incremental profit.
          </p>
          
          <div className="mt-12 space-y-6">
            <div className="flex items-center space-x-4 text-slate-300 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <Database className="text-cyan-400" />
              <span>Real-time Database Ingestion</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-300 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <Sparkles className="text-purple-400" />
              <span>Predictive Uplift Modeling (Phase 4)</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-300 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <Target className="text-pink-400" />
              <span>Deterministic Execution Trace (Phase 6)</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-400 font-medium tracking-wide">
          &copy; 2026 GrowthPilot
        </div>
      </div>

      {/* Right side login panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="absolute inset-0 bg-mesh opacity-50 lg:hidden"></div>
        <div className="glass max-w-md w-full p-10 rounded-2xl relative z-10 animate-fade-in-up">
          
          <div className="text-center mb-10">
            <div className="lg:hidden mx-auto h-16 w-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <PlaneTakeoff size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-slate-400">
              {isRegistering ? 'Sign up for a fresh merchant sandbox.' : 'Sign in to access your dashboard.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              {isRegistering && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Merchant Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-500 transition-all"
                    placeholder="e.g. Acme Corp"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-500 transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 disabled:opacity-50 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (isRegistering ? 'Register Merchant' : 'Sign In')}
            </button>
            
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
                className="text-sm font-medium text-slate-400 hover:text-purple-400 transition-colors"
              >
                {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
