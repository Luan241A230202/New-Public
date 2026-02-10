'use client';

import { Wallet, Copy, ExternalLink, TrendingUp, TrendingDown, Clock, DollarSign, Image, FileCode } from 'lucide-react';
import { useState } from 'react';

export default function WalletDetailsPage({ params }: { params: { address: string } }) {
  const [activeTab, setActiveTab] = useState('tokens');

  const tokens = [
    { name: 'Ethereum', symbol: 'ETH', balance: '12.5432', value: '$25,086.40', change: '+5.2%', logo: '⟠' },
    { name: 'USD Coin', symbol: 'USDC', balance: '15,420.50', value: '$15,420.50', change: '0%', logo: '💵' },
    { name: 'Wrapped BTC', symbol: 'WBTC', balance: '0.8521', value: '$42,605.00', change: '+3.8%', logo: '₿' },
  ];

  const transactions = [
    { type: 'sent', to: '0xABCD...5678', amount: '2.5 ETH', value: '$5,000', time: '2 hours ago', status: 'confirmed' },
    { type: 'received', from: '0x1234...ABCD', amount: '1,000 USDC', value: '$1,000', time: '5 hours ago', status: 'confirmed' },
    { type: 'sent', to: '0x9876...4321', amount: '0.1 WBTC', value: '$5,000', time: '1 day ago', status: 'confirmed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Wallet Address</h1>
              <div className="flex items-center gap-2 text-sm">
                <code className="font-mono">{params.address}</code>
                <button className="p-1 hover:bg-white/20 rounded">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-white/20 rounded">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Balance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Balance', value: '$83,111.90', icon: DollarSign },
              { label: 'Total Tokens', value: '24', icon: Wallet },
              { label: 'NFTs', value: '156', icon: Image },
              { label: 'Transactions', value: '2,345', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <stat.icon className="w-4 h-4" />
                  {stat.label}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-6">
          <div className="flex gap-2 p-2 border-b border-white/20">
            {['tokens', 'nfts', 'transactions', 'contracts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'tokens' && (
              <div className="space-y-3">
                {tokens.map((token, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{token.logo}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{token.name}</div>
                        <div className="text-white/60">{token.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{token.balance}</div>
                        <div className="text-white/60">{token.value}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        token.change.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-3">
                {transactions.map((tx, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'sent' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {tx.type === 'sent' ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold capitalize">{tx.type}</div>
                        <div className="text-sm text-white/60">
                          {tx.type === 'sent' ? `To: ${tx.to}` : `From: ${tx.from}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{tx.amount}</div>
                        <div className="text-sm text-white/60">{tx.value}</div>
                      </div>
                      <div className="text-sm text-white/60">{tx.time}</div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'nfts' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    <div className="p-3">
                      <div className="font-semibold mb-1">NFT #{i}</div>
                      <div className="text-sm text-white/60">Collection Name</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <FileCode className="w-8 h-8 text-blue-400" />
                      <div className="flex-1">
                        <div className="font-semibold">Contract {i}</div>
                        <code className="text-sm text-white/60 font-mono">0x1234...ABCD</code>
                      </div>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
