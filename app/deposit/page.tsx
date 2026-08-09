'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

const WALLETS: Record<string, string> = {
  BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  USDT: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  USDC: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
};

export default function DepositPage() {
  const router = useRouter();
  const [coin, setCoin] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiFetch('/api/user/deposit/', {
        method: 'POST',
        body: JSON.stringify({
          coin,
          amount: parseFloat(amount),
          network: 'Mainnet',
        }),
      });

      setSubmittedRef(res.reference);
    } catch (err: any) {
      alert(err.message || 'Deposit submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
          <h2 className="text-xl font-bold">Deposit Submitted</h2>
          <p className="text-xs text-zinc-400">Reference: <span className="font-mono text-emerald-400">{submittedRef}</span></p>
          <p className="text-sm text-zinc-300">Your deposit request is under review. Your balance will update automatically upon admin approval.</p>
          <button onClick={() => router.push('/dashboard')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2.5 rounded text-sm">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Fund Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Select Asset</label>
            <select value={coin} onChange={(e) => setCoin(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white">
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether USD (USDT - ERC20)</option>
              <option value="USDC">USD Coin (USDC - ERC20)</option>
            </select>
          </div>

          <div className="bg-zinc-950 p-3 rounded border border-zinc-800 text-xs">
            <span className="text-zinc-500 block">Deposit Address ({coin}):</span>
            <span className="font-mono text-emerald-400 break-all">{WALLETS[coin]}</span>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Deposit Amount (USD Value)</label>
            <input type="number" step="0.01" placeholder="e.g. 500" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded text-sm transition">
            {loading ? 'Submitting...' : 'Confirm Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
}