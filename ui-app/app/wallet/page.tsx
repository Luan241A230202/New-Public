'use client';

import { Wallet as WalletIcon, Star, TrendingUp, TrendingDown, Gift, ShoppingBag, Send, Plus, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <WalletIcon className="w-8 h-8" />
          My Wallet
        </h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 mb-1">Total Balance</p>
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8" fill="white" />
                <span className="text-5xl font-bold">12,345</span>
              </div>
              <p className="text-white/80 mt-2">≈ $1,234.50 USD</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">This Month</p>
              <div className="flex items-center gap-1 text-green-300">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">+345</span>
              </div>
              <p className="text-white/80 text-sm">+2.8%</p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button className="flex-1 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Buy Stars
            </button>
            <button className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Stars
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Gift, label: 'Send Gift', color: 'from-pink-500 to-rose-500' },
            { icon: ShoppingBag, label: 'Buy Bundle', color: 'from-blue-500 to-cyan-500' },
            { icon: Star, label: 'Earn Stars', color: 'from-yellow-500 to-orange-500' },
            { icon: History, label: 'History', color: 'from-purple-500 to-indigo-500' },
          ].map((action, i) => (
            <button
              key={i}
              className={`bg-gradient-to-br ${action.color} text-white rounded-2xl p-6 hover:shadow-lg transition-all`}
            >
              <action.icon className="w-8 h-8 mb-2" />
              <div className="font-semibold">{action.label}</div>
            </button>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <History className="w-6 h-6" />
              Recent Transactions
            </h2>
            <Link href="/wallet/history" className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { type: 'received', from: 'Creator Name', amount: '+250', reason: 'Gift received', time: '2 hours ago', icon: Gift },
              { type: 'sent', to: 'Video Title', amount: '-100', reason: 'Video unlock', time: '5 hours ago', icon: ShoppingBag },
              { type: 'received', from: 'User123', amount: '+50', reason: 'Tip', time: '1 day ago', icon: Star },
              { type: 'sent', to: 'Membership', amount: '-500', reason: 'Premium subscription', time: '2 days ago', icon: ShoppingBag },
              { type: 'received', from: 'Boost reward', amount: '+1000', reason: 'Video boost bonus', time: '3 days ago', icon: TrendingUp },
            ].map((tx, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  tx.type === 'received' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'
                }`}>
                  {tx.type === 'received' ? (
                    <ArrowDownLeft className="w-6 h-6" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{tx.reason}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {tx.type === 'received' ? 'From' : 'To'} {tx.from || tx.to}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    tx.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.amount} <Star className="w-4 h-4 inline" />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{tx.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Star Bundles */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Buy Stars Bundles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stars: 1000, price: '$9.99', bonus: '', popular: false },
              { stars: 5000, price: '$44.99', bonus: '+500 Bonus', popular: true },
              { stars: 10000, price: '$84.99', bonus: '+2000 Bonus', popular: false },
            ].map((bundle, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 border-2 ${
                  bundle.popular
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-4">
                  <Star className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold">{bundle.stars.toLocaleString()}</div>
                  {bundle.bonus && (
                    <div className="text-sm text-green-600 font-semibold">{bundle.bonus}</div>
                  )}
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold">{bundle.price}</div>
                </div>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  bundle.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
