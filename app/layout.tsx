import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Automated Trading Merchant',
  description: 'Algorithmic portfolio management and automated execution platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}