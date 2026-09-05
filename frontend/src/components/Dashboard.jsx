import React, { useState, useEffect } from 'react';
import AppShell from './AppShell';
import Overview from './Overview';
import Recommendations from './Recommendations';
import CustomerDetail from './CustomerDetail';
import Experiments from './Experiments';
import BudgetOptimizer from './BudgetOptimizer';
import api from '../api';

export default function Dashboard({ onLogout }) {
  const [activePath, setActivePath] = useState('overview');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [agentResult, setAgentResult] = useState(null);

  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const runAgentAnalysis = async (customBudget = '200') => {
    setIsRunning(true);
    try {
      const payload = {
        goal: `Increase repeat customer behavior. budget: ${customBudget}`
      };
      const res = await api.post('/agent/run', payload);
      
      if (res.data && res.data.trace && res.data.trace.length > 0) {
        setAgentResult({
          id: res.data.run_id,
          status: res.data.status,
          trace: res.data.trace
        });
      } else {
        const activityRes = await api.get('/agent/activity');
        const runs = Array.isArray(activityRes.data) ? activityRes.data : [];
        const completedRun = runs.find(r => r.actions && r.actions.length >= 7) || runs[0];
        if (completedRun && completedRun.actions && completedRun.actions.length > 0) {
          const formattedTrace = completedRun.actions.map(a => ({
            state: a.state,
            output: a.outputJson
          }));
          setAgentResult({
            id: completedRun.id,
            status: completedRun.finalState || 'COMPLETED',
            trace: formattedTrace
          });
        }
      }
    } catch (err) {
      console.error('Agent Execution Error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  // Fetch existing completed run from DB or run once on mount
  useEffect(() => {
    let isMounted = true;
    const initData = async () => {
      try {
        const activityRes = await api.get('/agent/activity');
        const runs = Array.isArray(activityRes.data) ? activityRes.data : [];
        const completedRun = runs.find(r => 
          r.actions && 
          r.actions.some(a => (a.state === 'RECOMMEND' || a.state === 'OUTPUT') && a.outputJson && a.outputJson.recommendations && a.outputJson.recommendations.length > 0)
        ) || runs.find(r => r.actions && r.actions.length >= 7) || runs[0];

        if (completedRun && completedRun.actions && completedRun.actions.length > 0) {
          const formattedTrace = completedRun.actions.map(a => ({
            state: a.state,
            output: a.outputJson
          }));
          if (isMounted) {
            setAgentResult({
              id: completedRun.id,
              status: completedRun.finalState || 'COMPLETED',
              trace: formattedTrace
            });
          }
        } else {
          if (isMounted) runAgentAnalysis('200');
        }
      } catch (err) {
        if (isMounted) runAgentAnalysis('200');
      }
    };
    initData();
    return () => { isMounted = false; };
  }, []);

  const handleNavigate = (path) => {
    setActivePath(path);
    setSelectedCustomerId(null);
  };

  const handleSelectCustomer = (cid) => {
    setSelectedCustomerId(cid);
    setActivePath('customer-detail');
  };

  return (
    <AppShell
      activePath={activePath}
      onNavigate={handleNavigate}
      onLogout={onLogout}
      user={user}
      onRunAnalysis={() => runAgentAnalysis('200')}
      isRunning={isRunning}
    >
      {activePath === 'overview' && (
        <Overview
          agentResult={agentResult}
          onRunAnalysis={() => runAgentAnalysis('200')}
          isRunning={isRunning}
          onNavigate={handleNavigate}
        />
      )}

      {activePath === 'customers' && (
        <Recommendations
          agentResult={agentResult}
          onSelectCustomer={handleSelectCustomer}
          onRunAnalysis={() => runAgentAnalysis('200')}
          isRunning={isRunning}
        />
      )}

      {activePath === 'customer-detail' && (
        <CustomerDetail
          customerId={selectedCustomerId}
          agentResult={agentResult}
          onBack={() => setActivePath('customers')}
        />
      )}

      {activePath === 'insights' && (
        <Overview
          agentResult={agentResult}
          onRunAnalysis={() => runAgentAnalysis('200')}
          isRunning={isRunning}
          onNavigate={handleNavigate}
        />
      )}

      {activePath === 'experiments' && (
        <Experiments agentResult={agentResult} />
      )}

      {activePath === 'optimizer' && (
        <BudgetOptimizer
          agentResult={agentResult}
          onRunAnalysis={(b) => runAgentAnalysis(b)}
          isRunning={isRunning}
        />
      )}

      {(activePath === 'settings' || activePath === 'documentation' || activePath === 'api-keys') && (
        <div className="p-space-12 rounded-xl bg-surface-container-lowest text-center shadow-sm">
          <span className="material-symbols-outlined text-[48px] text-primary mb-space-3">settings_applications</span>
          <h2 className="font-headline-md text-headline-md text-on-surface capitalize">{activePath.replace('-', ' ')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2">
            System operation and merchant configuration options for GrowthPilot v2.4.
          </p>
        </div>
      )}
    </AppShell>
  );
}
