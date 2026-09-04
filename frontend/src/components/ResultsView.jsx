import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2, IndianRupee, Users, Wallet, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ResultsView({ data }) {
  const { trace, fullRun } = data;
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const output = trace.find(t => t.state === 'OUTPUT')?.output || {};
  const recommend = trace.find(t => t.state === 'RECOMMEND')?.output || {};
  const validate = trace.find(t => t.state === 'VALIDATE')?.output || {};

  const totalExpectedProfit = output.total_profit || 0;
  const customersEvaluated = validate.validated_customers || 0;
  const customersRecommended = recommend.recommendations_count || 0;
  const budgetUsed = output.total_cost || 0;

  const outputAction = fullRun?.actions?.find(a => a.state === 'OUTPUT');
  const finalRecommendations = outputAction?.inputJson?.final_recommendations || [];

  const chartData = finalRecommendations.map((r, idx) => ({
    name: `Cust ${idx+1}`,
    ExpectedProfit: r.expected_incremental_profit,
    Cost: r.cost
  })).slice(0, 10);

  const avgUplift = finalRecommendations.length > 0
    ? (finalRecommendations.reduce((acc, curr) => acc + curr.predicted_uplift, 0) / finalRecommendations.length * 100).toFixed(2)
    : 0;

  return (
    <div className="space-y-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Customers Evaluated" value={customersEvaluated} icon={<Users size={20} />} />
        <StatCard title="Targeted (Recommended)" value={customersRecommended} icon={<CheckCircle2 size={20} />} />
        <StatCard title="Expected Inc. Profit" value={`₹${totalExpectedProfit.toFixed(2)}`} icon={<IndianRupee size={20} />} highlight />
        <StatCard title="Budget Utilized" value={`₹${budgetUsed.toFixed(2)}`} icon={<Wallet size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profit vs Cost (Top 10 Recommendations)</h3>
            <span className="text-sm text-gray-500 font-medium">Avg Uplift: +{avgUplift}%</span>
          </div>
          {chartData.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="ExpectedProfit" name="Expected Profit" fill="#aa3bff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Cost" name="Intervention Cost" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-200">
              No profitable interventions recommended.
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-y-auto max-h-[350px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Decision Trace</h3>
          <div className="space-y-4">
            {trace.map((step, idx) => (
              <div key={idx} className="flex items-start">
                <div className="flex flex-col items-center mr-3 mt-1">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {idx !== trace.length - 1 && <div className="h-8 w-px bg-gray-200 my-1"></div>}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{step.state}</h4>
                  <pre className="mt-1 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 overflow-x-auto max-w-[200px] sm:max-w-[300px]">
                    {JSON.stringify(step.output, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recommended Customers</h3>
          <span className="text-sm bg-purple-50 text-purple-700 font-medium px-2.5 py-1 rounded-full border border-purple-100">
            {finalRecommendations.length} Targets
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Pred. Uplift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intervention</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Profit</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {finalRecommendations.length > 0 ? (
                finalRecommendations.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedCustomer(r)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">{r.customer_id.substring(0,8)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{(r.predicted_uplift * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {r.intervention}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{r.cost.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-right">₹{r.expected_incremental_profit.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-purple-600 hover:text-purple-900 font-medium">View</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                    No customers met the criteria for a profitable intervention.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Customer Analysis</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Customer ID</p>
                <p className="font-mono text-sm text-gray-900 bg-gray-100 p-2 rounded border border-gray-200">{selectedCustomer.customer_id}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-xs text-purple-700 font-semibold uppercase mb-1">Predicted Uplift</p>
                  <p className="text-xl font-bold text-purple-900">+{(selectedCustomer.predicted_uplift * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-xs text-green-700 font-semibold uppercase mb-1">Expected Profit</p>
                  <p className="text-xl font-bold text-green-900">₹{selectedCustomer.expected_incremental_profit.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-3">Decision Reasoning</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Proposed Intervention:</span>
                    <span className="font-medium text-gray-900">{selectedCustomer.intervention}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Intervention Cost:</span>
                    <span className="font-medium text-gray-900">₹{selectedCustomer.cost.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between pt-1">
                    <span>Statistical Bounds Passed:</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Yes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, highlight }) {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm border p-6 flex flex-col",
      highlight ? "border-purple-200 bg-purple-50/30" : "border-gray-200"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <div className={cn("p-2 rounded-lg", highlight ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500")}>
          {icon}
        </div>
      </div>
      <span className={cn("text-2xl font-bold", highlight ? "text-purple-700" : "text-gray-900")}>{value}</span>
    </div>
  );
}
