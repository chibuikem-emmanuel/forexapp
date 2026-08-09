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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleCopy = () => {
    if (WALLETS[coin]) {
      navigator.clipboard.writeText(WALLETS[coin]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Please enter a valid deposit amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiFetch('/api/user/deposit/', {
        method: 'POST',
        body: JSON.stringify({
          coin,
          amount: parsedAmount,
          network: 'Mainnet',
        }),
      });

      const ref = res.reference || res.id || res.tx_ref || 'PENDING';
      setSubmittedRef(String(ref));
    } catch (err: any) {
      setErrorMsg(err.message || 'Deposit submission failed. Please try again.');
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
          <button onClick={() => router.push('/dashboard')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2.5 rounded text-sm transition">
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

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Select Asset</label>
            <select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether USD (USDT - ERC20)</option>
              <option value="USDC">USD Coin (USDC - ERC20)</option>
            </select>
          </div>

          <div className="bg-zinc-950 p-3 rounded border border-zinc-800 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Deposit Address ({coin}):</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <span className="font-mono text-emerald-400 break-all block select-all">{WALLETS[coin]}</span>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Deposit Amount (USD Value)</label>
            <input
              type="number"
              step="0.01"
              min="1"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Confirm Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
}