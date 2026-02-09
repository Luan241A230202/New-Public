import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard - New Public',
  description: 'Bảng điều khiển quản trị hệ thống New Public',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
            <div className="text-2xl font-bold mb-8">Admin Panel</div>
            <nav className="space-y-2">
              <a href="/" className="block px-4 py-2 rounded hover:bg-gray-800">
                📊 Dashboard
              </a>
              <a href="/users" className="block px-4 py-2 rounded hover:bg-gray-800">
                👥 Users
              </a>
              <a href="/videos" className="block px-4 py-2 rounded hover:bg-gray-800">
                🎬 Videos
              </a>
              <a href="/payments" className="block px-4 py-2 rounded hover:bg-gray-800">
                💳 Payments
              </a>
              <a href="/reports" className="block px-4 py-2 rounded hover:bg-gray-800">
                🚨 Reports
              </a>
              <a href="/boost" className="block px-4 py-2 rounded hover:bg-gray-800">
                🚀 Boost
              </a>
              <a href="/nft" className="block px-4 py-2 rounded hover:bg-gray-800">
                🖼️ NFT
              </a>
              <a href="/config" className="block px-4 py-2 rounded hover:bg-gray-800">
                ⚙️ Config
              </a>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <header className="bg-white border-b px-8 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Quản trị hệ thống</h1>
                <div className="flex items-center gap-4">
                  <button className="text-sm">Thông báo</button>
                  <button className="text-sm">Admin User</button>
                </div>
              </div>
            </header>
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
