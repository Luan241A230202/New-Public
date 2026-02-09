import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Authentication - New Public',
  description: 'Secure authentication for New Public Platform',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        {children}
      </body>
    </html>
  );
}
