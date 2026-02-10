'use client';

import { useState } from 'react';

export default function WalletScanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'address' | 'username' | 'tx'>('address');

  const handleSearch = () => {
    console.log('Searching:', searchType, searchQuery);
    // Implement search logic
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Blockchain Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Tìm kiếm và theo dõi ví, NFT, và transactions trên nhiều blockchains
        </p>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSearchType('address')}
                className={`px-4 py-2 rounded-lg ${
                  searchType === 'address'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Wallet Address
              </button>
              <button
                onClick={() => setSearchType('username')}
                className={`px-4 py-2 rounded-lg ${
                  searchType === 'username'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Username
              </button>
              <button
                onClick={() => setSearchType('tx')}
                className={`px-4 py-2 rounded-lg ${
                  searchType === 'tx'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Transaction
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === 'address'
                    ? 'Nhập wallet address (0x...)'
                    : searchType === 'username'
                    ? 'Nhập username'
                    : 'Nhập transaction hash'
                }
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Tính năng</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">Wallet Tracking</h3>
            <p className="text-gray-600">
              Theo dõi balance, tokens, và NFTs trong ví của bạn trên nhiều blockchains
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold mb-2">NFT Explorer</h3>
            <p className="text-gray-600">
              Khám phá NFT collections, xem metadata và lịch sử transfers
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
            <p className="text-gray-600">
              Xem chi tiết mọi transaction với đầy đủ thông tin và status
            </p>
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Blockchains được hỗ trợ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Ethereum', icon: '⟠' },
            { name: 'Polygon', icon: '⬢' },
            { name: 'BSC', icon: '◆' },
            { name: 'Solana', icon: '◎' },
            { name: 'Tron', icon: '▲' },
            { name: 'Avalanche', icon: '🔺' },
          ].map((chain) => (
            <div
              key={chain.name}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-4xl mb-2">{chain.icon}</div>
              <div className="font-semibold">{chain.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Tìm kiếm gần đây</h2>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full"></div>
                  <div>
                    <div className="font-medium">0x1234...5678</div>
                    <div className="text-sm text-gray-600">Ethereum Mainnet</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{i} phút trước</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
