'use client';

import { useState } from 'react';
import { Star, Wallet, Check, Copy, ExternalLink, TrendingUp, ShoppingBag, Gift, ArrowRight, Sparkles, Zap, Crown, Shield, ChevronDown, DollarSign } from 'lucide-react';

// Star packages with bonuses and USD prices
const STAR_PACKAGES = [
  { 
    id: 1, 
    stars: 100, 
    bonus: 0, 
    price: 0.99, 
    popular: false,
    icon: Star,
    color: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-50 dark:bg-gray-800'
  },
  { 
    id: 2, 
    stars: 500, 
    bonus: 50, 
    price: 4.99, 
    popular: false,
    icon: Sparkles,
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  { 
    id: 3, 
    stars: 1000, 
    bonus: 150, 
    price: 9.99, 
    popular: true,
    icon: Zap,
    color: 'from-purple-400 to-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    badge: 'Most Popular'
  },
  { 
    id: 4, 
    stars: 5000, 
    bonus: 1000, 
    price: 49.99, 
    popular: false,
    icon: Crown,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
  },
  { 
    id: 5, 
    stars: 10000, 
    bonus: 2500, 
    price: 99.99, 
    popular: false,
    icon: Shield,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20'
  },
  { 
    id: 6, 
    stars: 50000, 
    bonus: 15000, 
    price: 499.99, 
    popular: false,
    icon: Crown,
    color: 'from-indigo-400 via-purple-400 to-pink-400',
    bgColor: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20',
    badge: 'Best Value'
  }
];

// Currency options
const CURRENCIES = [
  { id: 'usd', name: 'USD', symbol: '$', icon: '💵', description: 'US Dollar (Fiat)' },
  { id: 'usdt', name: 'USDT', symbol: 'USDT', icon: '₮', description: 'Tether (Stablecoin)', networks: ['Ethereum', 'BSC', 'Polygon', 'Solana'] },
  { id: 'usdc', name: 'USDC', symbol: 'USDC', icon: '◎', description: 'USD Coin (Stablecoin)', networks: ['Ethereum', 'BSC', 'Polygon', 'Solana'] }
];

// Web3 wallet options
const WALLETS = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', type: 'wallet', color: 'orange' },
  { id: 'phantom', name: 'Phantom', icon: '👻', type: 'wallet', color: 'purple' },
  { id: 'trust', name: 'Trust Wallet', icon: '🛡️', type: 'wallet', color: 'blue' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔵', type: 'wallet', color: 'blue' },
  { id: 'binance', name: 'Binance', icon: '🟡', type: 'exchange', color: 'yellow' },
  { id: 'okx', name: 'OKX', icon: '⚫', type: 'exchange', color: 'gray' },
  { id: 'bybit', name: 'Bybit', icon: '🟠', type: 'exchange', color: 'orange' },
  { id: 'gate', name: 'Gate.io', icon: '🔷', type: 'exchange', color: 'blue' }
];

// Mock transaction history
const MOCK_TRANSACTIONS = [
  {
    id: 1,
    date: '2026-02-09T10:30:00',
    stars: 1000,
    bonus: 150,
    price: 9.99,
    status: 'completed',
    txHash: '0x1234567890abcdef1234567890abcdef12345678',
    wallet: 'MetaMask',
    chain: 'Ethereum'
  },
  {
    id: 2,
    date: '2026-02-08T14:20:00',
    stars: 500,
    bonus: 50,
    price: 4.99,
    status: 'completed',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
    wallet: 'Phantom',
    chain: 'Solana'
  },
  {
    id: 3,
    date: '2026-02-07T09:15:00',
    stars: 5000,
    bonus: 1000,
    price: 49.99,
    status: 'processing',
    txHash: '0x567890abcdef1234567890abcdef1234567890ab',
    wallet: 'Binance',
    chain: 'BSC'
  },
  {
    id: 4,
    date: '2026-02-06T16:45:00',
    stars: 100,
    bonus: 0,
    price: 0.99,
    status: 'failed',
    txHash: '0xcdef1234567890abcdef1234567890abcdef1234',
    wallet: 'Trust Wallet',
    chain: 'Ethereum'
  }
];

export default function StarsPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Ethereum');
  const [walletFilter, setWalletFilter] = useState<'all' | 'wallet' | 'exchange'>('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Statistics
  const totalPurchased = 6650;
  const totalGifted = 1200;
  const totalTransactions = 4;

  const filteredWallets = walletFilter === 'all' 
    ? WALLETS 
    : WALLETS.filter(w => w.type === walletFilter);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getExplorerLink = (chain: string, hash: string) => {
    const explorers: Record<string, string> = {
      'Ethereum': `https://etherscan.io/tx/${hash}`,
      'Solana': `https://solscan.io/tx/${hash}`,
      'BSC': `https://bscscan.com/tx/${hash}`
    };
    return explorers[chain] || '#';
  };

  const selectedPkg = STAR_PACKAGES.find(p => p.id === selectedPackage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pb-32">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <Star className="w-7 h-7 text-white" fill="white" />
            </div>
            Nạp Sao (Buy Stars)
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Mua sao để tặng quà, Super Thanks và hỗ trợ nhà sáng tạo yêu thích
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalPurchased.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tổng Sao Đã Nạp</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Gift className="w-5 h-5 text-pink-500" />
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalGifted.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tổng Sao Đã Tặng</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-5 h-5 text-purple-500" />
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalTransactions}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Số Giao Dịch</div>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Chọn Loại Tiền</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CURRENCIES.map((currency) => {
              const isSelected = selectedCurrency === currency.id;
              const isStablecoin = currency.id !== 'usd';
              
              return (
                <div
                  key={currency.id}
                  onClick={() => {
                    setSelectedCurrency(currency.id);
                    if (currency.networks && currency.networks.length > 0) {
                      setSelectedNetwork(currency.networks[0]);
                    }
                  }}
                  className={`
                    relative cursor-pointer rounded-xl p-6 transition-all transform hover:scale-105
                    ${isSelected 
                      ? 'ring-4 ring-purple-500 shadow-xl bg-white dark:bg-gray-800' 
                      : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute -top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{currency.icon}</div>
                    <div>
                      <div className="text-xl font-bold">{currency.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{currency.description}</div>
                    </div>
                  </div>
                  
                  {isStablecoin && currency.networks && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Supported Networks:</div>
                      <div className="flex flex-wrap gap-1">
                        {currency.networks.map((network) => (
                          <span key={network} className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                            {network}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Network Selection for Stablecoins */}
          {selectedCurrency !== 'usd' && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-900 dark:text-blue-100">Chọn Mạng (Network)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.find(c => c.id === selectedCurrency)?.networks?.map((network) => (
                  <button
                    key={network}
                    onClick={() => setSelectedNetwork(network)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${selectedNetwork === network
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                      }
                    `}
                  >
                    {network}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Star Packages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Chọn Gói Sao</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAR_PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              const isSelected = selectedPackage === pkg.id;
              const totalStars = pkg.stars + pkg.bonus;
              
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`
                    relative cursor-pointer rounded-xl p-6 transition-all transform hover:scale-105
                    ${isSelected 
                      ? 'ring-4 ring-purple-500 shadow-xl' 
                      : 'hover:shadow-lg'
                    }
                    ${pkg.bgColor}
                  `}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {pkg.badge}
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-3xl font-bold flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
                      {pkg.stars.toLocaleString()}
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="text-sm text-green-600 dark:text-green-400 font-semibold mt-1">
                        +{pkg.bonus.toLocaleString()} bonus ({Math.round((pkg.bonus / pkg.stars) * 100)}%)
                      </div>
                    )}
                  </div>
                  
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {CURRENCIES.find(c => c.id === selectedCurrency)?.symbol === '$' 
                      ? `$${pkg.price}` 
                      : `${pkg.price} ${CURRENCIES.find(c => c.id === selectedCurrency)?.symbol}`
                    }
                  </div>
                  
                  {pkg.bonus > 0 && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Total: {totalStars.toLocaleString()} stars
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wallet Selection */}
        {selectedPackage && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Chọn Phương Thức Thanh Toán</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setWalletFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    walletFilter === 'all'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Tất Cả
                </button>
                <button
                  onClick={() => setWalletFilter('wallet')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    walletFilter === 'wallet'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Ví Tiền Ảo
                </button>
                <button
                  onClick={() => setWalletFilter('exchange')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    walletFilter === 'exchange'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Sàn Giao Dịch
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => setSelectedWallet(wallet.id)}
                  className={`
                    p-6 rounded-xl transition-all transform hover:scale-105
                    ${selectedWallet === wallet.id
                      ? 'bg-purple-500 text-white ring-4 ring-purple-300 shadow-xl'
                      : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                    }
                  `}
                >
                  <div className="text-4xl mb-2">{wallet.icon}</div>
                  <div className="font-semibold">{wallet.name}</div>
                  <div className={`text-xs mt-1 ${selectedWallet === wallet.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {wallet.type === 'wallet' ? 'Ví' : 'Sàn'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Lịch Sử Giao Dịch</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Số Sao
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ví
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Trạng Thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      TX Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {MOCK_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(tx.date).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                          <span className="font-semibold">{tx.stars.toLocaleString()}</span>
                          {tx.bonus > 0 && (
                            <span className="text-xs text-green-600 dark:text-green-400">
                              +{tx.bonus}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        ${tx.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {tx.wallet}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          px-2 py-1 text-xs font-semibold rounded-full
                          ${tx.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                          ${tx.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                          ${tx.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                        `}>
                          {tx.status === 'completed' ? 'Hoàn thành' : ''}
                          {tx.status === 'processing' ? 'Đang xử lý' : ''}
                          {tx.status === 'failed' ? 'Thất bại' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {tx.txHash.slice(0, 8)}...{tx.txHash.slice(-6)}
                          </code>
                          <button
                            onClick={() => handleCopyHash(tx.txHash)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            title="Copy"
                          >
                            {copiedHash === tx.txHash ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <a
                            href={getExplorerLink(tx.chain, tx.txHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            title="View on Explorer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Confirm Bar */}
      {selectedPackage && selectedWallet && selectedPkg && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-4 border-purple-500 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Đã chọn</div>
                  <div className="text-xl font-bold flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    {selectedPkg.stars.toLocaleString()}
                    {selectedPkg.bonus > 0 && (
                      <span className="text-sm text-green-600 dark:text-green-400">
                        +{selectedPkg.bonus.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tổng</div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {CURRENCIES.find(c => c.id === selectedCurrency)?.symbol === '$' 
                      ? `$${selectedPkg.price}` 
                      : `${selectedPkg.price} ${CURRENCIES.find(c => c.id === selectedCurrency)?.symbol}`
                    }
                  </div>
                  {selectedCurrency !== 'usd' && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedNetwork}
                    </div>
                  )}
                </div>
                
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Phương thức</div>
                  <div className="text-lg font-semibold">
                    {WALLETS.find(w => w.id === selectedWallet)?.name}
                  </div>
                </div>
              </div>
              
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 text-lg">
                Kết Nối Ví & Thanh Toán
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
