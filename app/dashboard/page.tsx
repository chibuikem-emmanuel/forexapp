'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// System deposit wallet addresses mapped to each coin
const WALLET_ADDRESSES: Record<string, string> = {
  BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  USDT: 'TYD2pE4B56gN7f8A1b2c3d4e5f6g7h8i9j',
  SOL: '7v9W8mP4zK2qL1rS5tU8vW3xY6zA9bC2dE5fG8hJ1kM',
};

export default function UserDashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Deposit Form State
  const [coin, setCoin] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [submittingDeposit, setSubmittingDeposit] = useState(false);
  const [depositMsg, setDepositMsg] = useState('');
  const [copied, setCopied] = useState(false);

  async function fetchDashboard() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('https://cryp-backend.onrender.com/user/me/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to load user profile');
      const data = await res.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleCopyAddress = () => {
    const address = WALLET_ADDRESSES[coin] || '';
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  async function handleDepositSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittingDeposit(true);
    setDepositMsg('');

    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch('https://cryp-backend.onrender.com/api/user/deposit/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coin, amount: parseFloat(amount) }),
      });

      if (res.ok) {
        setDepositMsg('Deposit request submitted! Awaiting admin approval.');
        setAmount('');
        fetchDashboard();
      } else {
        const data = await res.json();
        setDepositMsg(data.error || 'Failed to initiate deposit.');
      }
    } catch (err) {
      setDepositMsg('Network error submitting deposit.');
    } finally {
      setSubmittingDeposit(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-sm">
        Loading Account Dashboard...
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
        <p className="text-red-400 font-semibold">{error || 'Session expired'}</p>
        <button 
          onClick={() => router.push('/login')} 
          className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm"
        >
          Return to Login
        </button>
      </div>
    );
  }

  const isAdmin = userData.is_staff || userData.role?.toUpperCase() === 'ADMIN';

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{userData.full_name}</h1>
              <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                userData.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                userData.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {userData.status}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">{userData.email} • {userData.telegram_username ? `@${userData.telegram_username}` : 'No Telegram'}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => router.push('/admin/dashboard')} 
                className="text-xs bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-xl font-bold transition"
              >
                Admin Portal →
              </button>
            )}
            <button 
              onClick={() => {
                localStorage.removeItem('access_token');
                router.push('/login');
              }} 
              className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2.5 rounded-xl font-medium transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <span className="text-[11px] text-zinc-500 font-semibold uppercase">Country</span>
            <p className="text-sm font-bold text-white mt-1">{userData.country || 'N/A'}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <span className="text-[11px] text-zinc-500 font-semibold uppercase">Selected Service</span>
            <p className="text-sm font-bold text-white mt-1">{userData.service || 'N/A'}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <span className="text-[11px] text-zinc-500 font-semibold uppercase">Account Role</span>
            <p className="text-sm font-bold text-emerald-400 mt-1">{userData.role}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <span className="text-[11px] text-zinc-500 font-semibold uppercase">Joined Date</span>
            <p className="text-sm font-bold text-white mt-1">
              {new Date(userData.date_joined).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Balance Display */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-2xl space-y-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Trading Balance</span>
          <div className="text-4xl font-extrabold text-emerald-400">
            ${parseFloat(userData.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Deposit Form & Table Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Deposit Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 h-fit">
            <h2 className="text-base font-bold text-white">Make a Deposit</h2>
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Select Asset</label>
                <select 
                  value={coin} 
                  onChange={(e) => {
                    setCoin(e.target.value);
                    setCopied(false);
                  }}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDT">Tether (USDT-TRC20)</option>
                  <option value="SOL">Solana (SOL)</option>
                </select>
              </div>

              {/* Copyable Deposit Address Field */}
              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">
                  {coin} Deposit Address
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={WALLET_ADDRESSES[coin] || ''}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-3 py-2 rounded-xl border border-zinc-700 transition shrink-0 font-medium"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Amount ($ USD)</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  placeholder="e.g. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
                />
              </div>

              <button 
                type="submit" 
                disabled={submittingDeposit}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold py-2.5 rounded-xl transition"
              >
                {submittingDeposit ? 'Submitting...' : 'Initiate Deposit'}
              </button>

              {depositMsg && (
                <p className="text-xs text-zinc-300 mt-2 text-center">{depositMsg}</p>
              )}
            </form>
          </div>

          {/* Deposit Activity Table */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Deposit History</h2>
            {userData.deposits?.length === 0 ? (
              <p className="text-xs text-zinc-500">No deposit records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-400">
                  <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                    <tr>
                      <th className="pb-3">Reference</th>
                      <th className="pb-3">Coin</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {userData.deposits?.map((dep: any) => (
                      <tr key={dep.id}>
                        <td className="py-3 font-mono text-zinc-200">{dep.reference}</td>
                        <td className="py-3 text-white font-medium">{dep.coin}</td>
                        <td className="py-3 font-bold text-white">${parseFloat(dep.amount).toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            dep.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            dep.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {dep.status}
                          </span>
                        </td>
                        <td className="py-3 text-zinc-500">
                          {new Date(dep.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}