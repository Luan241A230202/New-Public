import { Home, TrendingUp, Search, Bell, User, Play, Star, Gift, Wallet, Menu } from 'lucide-react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    New Public
                  </span>
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                  <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Trang chủ</span>
                  </Link>
                  <Link href="/trending" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <TrendingUp className="w-5 h-5" />
                    <span>Trending</span>
                  </Link>
                  <Link href="/search" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Search className="w-5 h-5" />
                    <span>Tìm kiếm</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/notifications"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
                <Link
                  href="/wallet"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">1,234</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                
                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </div>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  New Public
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nền tảng chia sẻ video với NFT, membership và monetization
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Khám phá</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="/trending" className="hover:text-blue-600">Trending</a></li>
                  <li><a href="/creators" className="hover:text-blue-600">Creators</a></li>
                  <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Tài nguyên</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="/help" className="hover:text-blue-600">Trợ giúp</a></li>
                  <li><a href="/api-docs" className="hover:text-blue-600">API Docs</a></li>
                  <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Pháp lý</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="/terms" className="hover:text-blue-600">Điều khoản</a></li>
                  <li><a href="/privacy" className="hover:text-blue-600">Bảo mật</a></li>
                  <li><a href="/copyright" className="hover:text-blue-600">Bản quyền</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
              © 2026 New Public. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
