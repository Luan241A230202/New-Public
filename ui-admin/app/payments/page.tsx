'use client';

import { DollarSign, TrendingUp, CreditCard, Download, Filter, Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PaymentsPage() {
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18300 },
    { month: 'Apr', revenue: 22100 },
    { month: 'May', revenue: 25400 },
    { month: 'Jun', revenue: 28900 },
  ];

  const transactions = [
    { id: 'TXN-001', user: 'John Doe', type: 'Purchase', amount: '$49.99', status: 'completed', date: '2024-02-09 14:30' },
    { id: 'TXN-002', user: 'Jane Smith', type: 'Subscription', amount: '$9.99', status: 'completed', date: '2024-02-09 13:15' },
    { id: 'TXN-003', user: 'Bob Wilson', type: 'Gift', amount: '$25.00', status: 'pending', date: '2024-02-09 12:00' },
    { id: 'TXN-004', user: 'Alice Johnson', type: 'Boost', amount: '$99.99', status: 'completed', date: '2024-02-09 10:45' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="w-8 h-8" />
          Payments & Revenue
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$128,450', change: '+15.3%', color: 'text-green-600' },
          { label: 'This Month', value: '$28,900', change: '+12.8%', color: 'text-blue-600' },
          { label: 'Transactions', value: '2,345', change: '+8.2%', color: 'text-purple-600' },
          { label: 'Avg. Order', value: '$54.75', change: '+5.1%', color: 'text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              <TrendingUp className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className={`text-sm ${stat.color}`}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              <Filter className="w-5 h-5" />
            </button>
            <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{tx.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tx.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tx.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
