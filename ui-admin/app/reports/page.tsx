'use client';

import { Flag, AlertTriangle, CheckCircle, XCircle, Eye, Shield } from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  const [filter, setFilter] = useState('pending');

  const reports = [
    { id: 1, type: 'video', title: 'Inappropriate Content Video', reporter: 'User123', reason: 'Violence', status: 'pending', date: '2 hours ago', severity: 'high' },
    { id: 2, type: 'comment', title: 'Spam Comment', reporter: 'User456', reason: 'Spam', status: 'pending', date: '5 hours ago', severity: 'low' },
    { id: 3, type: 'user', title: 'Harassment by User', reporter: 'User789', reason: 'Harassment', status: 'reviewing', date: '1 day ago', severity: 'high' },
    { id: 4, type: 'video', title: 'Copyright Violation', reporter: 'Creator1', reason: 'Copyright', status: 'pending', date: '2 days ago', severity: 'medium' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Flag className="w-8 h-8" />
          Reports & Moderation
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: '45', icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
          { label: 'Reviewing', value: '12', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
          { label: 'Resolved', value: '234', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
          { label: 'Dismissed', value: '89', icon: XCircle, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-900/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 flex-wrap">
          {['pending', 'reviewing', 'resolved', 'dismissed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl font-medium capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                report.severity === 'high' ? 'bg-red-100 dark:bg-red-900/20 text-red-600' :
                report.severity === 'medium' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600' :
                'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600'
              }`}>
                <Flag className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{report.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>Reported by {report.reporter}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span className="capitalize">{report.type}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    report.status === 'reviewing' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded ${
                    report.severity === 'high' ? 'bg-red-100 text-red-600' :
                    report.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <AlertTriangle className="w-3 h-3" />
                    {report.severity} severity
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 rounded">
                    {report.reason}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Review
                  </button>
                  <button className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Take Action
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
