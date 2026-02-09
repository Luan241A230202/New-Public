import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'New Public - Video Platform',
  description: 'Nền tảng chia sẻ video với tính năng NFT, membership và monetization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="text-2xl font-bold">New Public</div>
              <div className="flex items-center gap-4">
                <a href="/" className="hover:text-primary">Trang chủ</a>
                <a href="/trending" className="hover:text-primary">Trending</a>
                <a href="/search" className="hover:text-primary">Tìm kiếm</a>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">
                  Đăng nhập
                </button>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-muted">
            © 2026 New Public. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
