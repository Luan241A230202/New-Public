'use client';

import { Hash, ExternalLink, Copy, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

export default function TransactionDetailsPage({ params }: { params: { hash: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Hash className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Transaction Details</h1>
              <div className="flex items-center gap-2 text-sm">
                <code className="font-mono">{params.hash}</code>
                <button className="p-1 hover:bg-white/20 rounded">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-white/20 rounded">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Confirmed
            </span>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4">Transaction Information</h2>
          <div className="space-y-4">
            {[
              { label: 'Block', value: '18,234,567' },
              { label: 'Timestamp', value: '2024-02-09 14:30:25 UTC (2 hours ago)' },
              { label: 'From', value: '0x1234...ABCD', copyable: true },
              { label: 'To', value: '0xABCD...5678', copyable: true },
              { label: 'Value', value: '2.5 ETH ($5,000.00)' },
              { label: 'Transaction Fee', value: '0.0021 ETH ($4.20)' },
              { label: 'Gas Price', value: '35 Gwei' },
              { label: 'Gas Limit', value: '21,000' },
              { label: 'Gas Used', value: '21,000 (100%)' },
              { label: 'Nonce', value: '127' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/10">
                <div className="text-white/60">{item.label}</div>
                <div className="flex items-center gap-2 font-mono">
                  {item.value}
                  {item.copyable && (
                    <button className="p-1 hover:bg-white/20 rounded">
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Details */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold mb-4">Advanced Details</h2>
          <div className="space-y-3">
            <div>
              <div className="text-white/60 text-sm mb-1">Input Data</div>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                0xa9059cbb0000000000000000000000001234567890abcdef1234567890abcdef12345678
              </div>
            </div>
            <div>
              <div className="text-white/60 text-sm mb-1">Transaction Type</div>
              <div>Legacy (Type 0)</div>
            </div>
            <div>
              <div className="text-white/60 text-sm mb-1">Position in Block</div>
              <div>Transaction #42 in block</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
