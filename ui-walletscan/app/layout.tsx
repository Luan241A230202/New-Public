import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WalletScan - Blockchain Explorer',
  description: 'Scan và theo dõi ví blockchain trên New Public Platform',
};

export default function WalletScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-2xl">🔍</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  WalletScan
                </div>
              </div>
              <div className="flex items-center gap-6">
                <a href="/" className="hover:text-blue-600">Home</a>
                <a href="/explore" className="hover:text-blue-600">Explore</a>
                <a href="/nfts" className="hover:text-blue-600">NFTs</a>
                <a href="/contracts" className="hover:text-blue-600">Contracts</a>
              </div>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t bg-white mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-3">WalletScan</h3>
                <p className="text-sm text-gray-600">
                  Blockchain explorer cho New Public Platform
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Blockchains</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Ethereum</li>
                  <li>Polygon</li>
                  <li>BSC</li>
                  <li>Solana</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Features</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Wallet Tracking</li>
                  <li>NFT Explorer</li>
                  <li>Transaction History</li>
                  <li>Contract Info</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>API Docs</li>
                  <li>Support</li>
                  <li>Status</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
              © 2026 WalletScan by New Public. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
