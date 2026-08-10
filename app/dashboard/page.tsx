'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Deposit Wallets & TradingView Symbol Mappings
const WALLET_ADDRESSES: Record<string, { name: string; address: string; coingeckoId: string; tvSymbol: string }> = {
  BTC: { name: 'Bitcoin (BTC)', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', coingeckoId: 'bitcoin', tvSymbol: 'BINANCE:BTCUSDT' },
  ETH: { name: 'Ethereum (ETH)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', coingeckoId: 'ethereum', tvSymbol: 'BINANCE:ETHUSDT' },
  XAUUSD: { name: 'Gold / USD (XAUUSD)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', coingeckoId: 'pax-gold', tvSymbol: 'OANDA:XAUUSD' },
  USDT_TRC20: { name: 'Tether (USDT-TRC20)', address: 'TYD2pE4B56gN7f8A1b2c3d4e5f6g7h8i9j', coingeckoId: 'tether', tvSymbol: 'CRYPTOCAP:USDT' },
  USDT_ERC20: { name: 'Tether (USDT-ERC20)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', coingeckoId: 'tether', tvSymbol: 'CRYPTOCAP:USDT' },
  SOL: { name: 'Solana (SOL)', address: '7v9W8mP4zK2qL1rS5tU8vW3xY6zA9bC2dE5fG8hJ1kM', coingeckoId: 'solana', tvSymbol: 'BINANCE:SOLUSDT' },
  BNB: { name: 'Binance Coin (BNB)', address: 'bnb1gr2w8v4j72d3286423456789abcdef0123456', coingeckoId: 'binancecoin', tvSymbol: 'BINANCE:BNBUSDT' },
  XRP: { name: 'Ripple (XRP)', address: 'rEb8TK3gG22uuA5223456789abcdef0123456', coingeckoId: 'ripple', tvSymbol: 'BINANCE:XRPUSDT' },
  ADA: { name: 'Cardano (ADA)', address: 'addr1q9x2y3z4a5b6c7d8e9f0123456789abcdef0123456', coingeckoId: 'cardano', tvSymbol: 'BINANCE:ADAUSDT' },
  AVAX: { name: 'Avalanche (AVAX)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', coingeckoId: 'avalanche-2', tvSymbol: 'BINANCE:AVAXUSDT' },
  LINK: { name: 'Chainlink (LINK)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', coingeckoId: 'chainlink', tvSymbol: 'BINANCE:LINKUSDT' },
  DOGE: { name: 'Dogecoin (DOGE)', address: 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L', coingeckoId: 'dogecoin', tvSymbol: 'BINANCE:DOGEUSDT' },
  LTC: { name: 'Litecoin (LTC)', address: 'LTC123456789abcdef0123456789abcdef0123456', coingeckoId: 'litecoin', tvSymbol: 'BINANCE:LTCUSDT' },
  TRX: { name: 'TRON (TRX)', address: 'T123456789abcdef0123456789abcdef0123456', coingeckoId: 'tron', tvSymbol: 'BINANCE:TRXUSDT' },
};

// TradingView Widget Sub-Component
function TradingViewWidget({ symbol, height = 'h-[420px]' }: { symbol: string; height?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      backgroundColor: 'rgba(18, 18, 18, 1)',
      gridColor: 'rgba(38, 38, 38, 0.4)',
      hide_side_toolbar: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className={`tradingview-widget-container ${height} w-full rounded-xl overflow-hidden border border-zinc-800`} ref={containerRef}>
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
}

export default function UserDashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Live Prices & Chart State
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, number>>({});
  const [pricesLoading, setPricesLoading] = useState(true);
  const [selectedChartCoin, setSelectedChartCoin] = useState<string>('BTC');
  const [isChartFullscreen, setIsChartFullscreen] = useState<boolean>(false);

  // Active Action Tab (Deposit or Withdraw)
  const [activeAction, setActiveAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [historyTab, setHistoryTab] = useState<'deposits' | 'withdrawals'>('deposits');

  // Form States
  const [depositCoin, setDepositCoin] = useState('BTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [submittingDeposit, setSubmittingDeposit] = useState(false);
  const [depositMsg, setDepositMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const [withdrawCoin, setWithdrawCoin] = useState('BTC');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [submittingWithdraw, setSubmittingWithdraw] = useState(false);
  const [withdrawMsg, setWithdrawMsg] = useState('');

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsChartFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch Dashboard Profile Data
  async function fetchDashboard() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('https://cryp-backend.onrender.com/api/user/me/', {
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

  // Fetch Live Prices
  async function fetchLivePrices() {
    try {
      const ids = Array.from(new Set(Object.values(WALLET_ADDRESSES).map((c) => c.coingeckoId))).join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      if (res.ok) {
        const data = await res.json();
        const priceMap: Record<string, number> = {};
        Object.keys(WALLET_ADDRESSES).forEach((symbol) => {
          const geckoId = WALLET_ADDRESSES[symbol].coingeckoId;
          if (data[geckoId]) priceMap[symbol] = data[geckoId].usd;
        });
        setCryptoPrices(priceMap);
      }
    } catch (err) {
      console.error('Error fetching live crypto prices:', err);
    } finally {
      setPricesLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
    fetchLivePrices();

    const interval = setInterval(fetchLivePrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    const address = WALLET_ADDRESSES[depositCoin]?.address || '';
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
        body: JSON.stringify({ coin: depositCoin, amount: parseFloat(depositAmount) }),
      });

      if (res.ok) {
        setDepositMsg('Deposit request submitted! Awaiting admin approval.');
        setDepositAmount('');
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

  async function handleWithdrawSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittingWithdraw(true);
    setWithdrawMsg('');

    const userBalance = parseFloat(userData?.balance || 0);
    const requestedAmount = parseFloat(withdrawAmount);

    if (requestedAmount > userBalance) {
      setWithdrawMsg('Insufficient trading balance.');
      setSubmittingWithdraw(false);
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch('https://cryp-backend.onrender.com/api/user/withdraw/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coin: withdrawCoin,
          amount: requestedAmount,
          wallet_address: withdrawAddress,
        }),
      });

      if (res.ok) {
        setWithdrawMsg('Withdrawal request submitted! Pending admin processing.');
        setWithdrawAmount('');
        setWithdrawAddress('');
        fetchDashboard();
      } else {
        const data = await res.json();
        setWithdrawMsg(data.error || 'Failed to submit withdrawal request.');
      }
    } catch (err) {
      setWithdrawMsg('Network error submitting withdrawal.');
    } finally {
      setSubmittingWithdraw(false);
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
        <button onClick={() => router.push('/login')} className="bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm">
          Return to Login
        </button>
      </div>
    );
  }

  const isAdmin = userData.is_staff || userData.role?.toUpperCase() === 'ADMIN';
  const balanceUSD = parseFloat(userData.balance || 0);
  const activeChartSymbol = WALLET_ADDRESSES[selectedChartCoin]?.tvSymbol || 'BINANCE:BTCUSDT';

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Profile Header */}
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
            <p className="text-xs text-zinc-400 mt-1">
              {userData.email} • {userData.telegram_username ? `@${userData.telegram_username}` : 'No Telegram'}
            </p>
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

        {/* Balance & Market Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-3 flex flex-col justify-center">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Trading Balance</span>
            <div className="text-4xl font-extrabold text-emerald-400">
              ${balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Equivalent Holding: </span>
              <strong className="text-white font-mono">
                {balanceUSD > 0 && cryptoPrices[selectedChartCoin]
                  ? (balanceUSD / cryptoPrices[selectedChartCoin]).toFixed(4)
                  : '0.0000'} {selectedChartCoin}
              </strong>
            </div>
          </div>

          {/* Quick Rates Ticker */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Live Market Rates & Equivalents</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE STREAM
              </div>
            </div>

            {pricesLoading ? (
              <p className="text-xs text-zinc-500 font-mono">Fetching rates...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['BTC', 'ETH', 'XAUUSD', 'SOL'].map((symbol) => {
                  const unitPrice = cryptoPrices[symbol] || 1;
                  const equivCoins = balanceUSD > 0 ? (balanceUSD / unitPrice) : 0;
                  return (
                    <div 
                      key={symbol} 
                      onClick={() => setSelectedChartCoin(symbol)}
                      className={`p-3 rounded-xl border transition cursor-pointer ${
                        selectedChartCoin === symbol 
                          ? 'bg-emerald-500/10 border-emerald-500/40' 
                          : 'bg-black/50 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-[10px] text-zinc-400 font-bold block">
                        {symbol === 'XAUUSD' ? 'GOLD (XAUUSD)' : symbol.replace('_TRC20', '')}
                      </span>
                      <p className="text-sm font-mono font-bold text-emerald-400">
                        {equivCoins < 0.0001 ? equivCoins.toFixed(6) : equivCoins.toFixed(4)}
                      </p>
                      <p className="text-[10px] text-zinc-500">${unitPrice.toLocaleString()} / unit</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* LIVE TRADINGVIEW CRYPTO CHART */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Live Market Trend & Chart
              </h2>
              <p className="text-xs text-zinc-400">
                Track real-time candlesticks and technical movement for your chosen asset
              </p>
            </div>

            {/* Chart Options & Fullscreen Trigger */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-medium">Asset:</span>
                <select
                  value={selectedChartCoin}
                  onChange={(e) => setSelectedChartCoin(e.target.value)}
                  className="bg-black border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-bold focus:outline-none"
                >
                  {Object.entries(WALLET_ADDRESSES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fullscreen Toggle Button */}
              <button
                type="button"
                onClick={() => setIsChartFullscreen(true)}
                className="bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
                title="Expand chart to fullscreen"
              >
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4" />
                </svg>
                Fullscreen
              </button>
            </div>
          </div>

          {/* Inline Interactive TradingView Chart */}
          <TradingViewWidget symbol={activeChartSymbol} height="h-[450px]" />
        </div>

        {/* FULLSCREEN CHART OVERLAY MODAL */}
        {isChartFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">
                  {WALLET_ADDRESSES[selectedChartCoin]?.name || selectedChartCoin} — Fullscreen Interactive Chart
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {activeChartSymbol}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedChartCoin}
                  onChange={(e) => setSelectedChartCoin(e.target.value)}
                  className="bg-black border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-bold focus:outline-none"
                >
                  {Object.entries(WALLET_ADDRESSES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsChartFullscreen(false)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs px-3.5 py-1.5 rounded-xl border border-red-500/30 font-bold transition"
                >
                  Close (ESC) ✕
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <TradingViewWidget symbol={activeChartSymbol} height="h-[calc(100vh-120px)]" />
            </div>
          </div>
        )}

        {/* Deposit / Withdraw Forms & Activity Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Deposit & Withdraw Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 h-fit">
            <div className="grid grid-cols-2 bg-black border border-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveAction('deposit')}
                className={`text-xs py-2 rounded-lg font-bold transition ${
                  activeAction === 'deposit' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Deposit
              </button>
              <button
                onClick={() => setActiveAction('withdraw')}
                className={`text-xs py-2 rounded-lg font-bold transition ${
                  activeAction === 'withdraw' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Withdraw
              </button>
            </div>

            {/* DEPOSIT FORM */}
            {activeAction === 'deposit' && (
              <form onSubmit={handleDepositSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-white">Make a Deposit</h3>
                
                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium">Select Asset</label>
                  <select 
                    value={depositCoin} 
                    onChange={(e) => {
                      setDepositCoin(e.target.value);
                      setSelectedChartCoin(e.target.value);
                      setCopied(false);
                    }}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {Object.entries(WALLET_ADDRESSES).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium">
                    {WALLET_ADDRESSES[depositCoin]?.name || depositCoin} Wallet Address
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly
                      value={WALLET_ADDRESSES[depositCoin]?.address || ''}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-3 py-2 rounded-xl border border-zinc-700 shrink-0 font-medium"
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
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submittingDeposit}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold py-2.5 rounded-xl transition"
                >
                  {submittingDeposit ? 'Submitting...' : 'Initiate Deposit'}
                </button>

                {depositMsg && <p className="text-xs text-zinc-300 mt-2 text-center">{depositMsg}</p>}
              </form>
            )}

            {/* WITHDRAWAL FORM */}
            {activeAction === 'withdraw' && (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-white">Request Withdrawal</h3>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium">Select Asset</label>
                  <select 
                    value={withdrawCoin} 
                    onChange={(e) => setWithdrawCoin(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {Object.entries(WALLET_ADDRESSES).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium font-mono">Your Destination Address</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Paste your wallet address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1 font-medium">Amount ($ USD)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    max={balanceUSD}
                    placeholder="e.g. 200"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Available: ${balanceUSD.toFixed(2)} USD</p>
                </div>

                <button 
                  type="submit" 
                  disabled={submittingWithdraw || balanceUSD <= 0}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {submittingWithdraw ? 'Processing...' : 'Submit Withdrawal'}
                </button>

                {withdrawMsg && <p className="text-xs text-zinc-300 mt-2 text-center">{withdrawMsg}</p>}
              </form>
            )}
          </div>

          {/* Activity Tables */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Transaction History</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setHistoryTab('deposits')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                    historyTab === 'deposits' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Deposits
                </button>
                <button
                  onClick={() => setHistoryTab('withdrawals')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                    historyTab === 'withdrawals' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Withdrawals
                </button>
              </div>
            </div>

            {/* DEPOSITS TABLE */}
            {historyTab === 'deposits' && (
              userData.deposits?.length === 0 ? (
                <p className="text-xs text-zinc-500 py-4">No deposit records found.</p>
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
                          <td className="py-3 text-zinc-500">{new Date(dep.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {/* WITHDRAWALS TABLE */}
            {historyTab === 'withdrawals' && (
              !userData.withdrawals || userData.withdrawals.length === 0 ? (
                <p className="text-xs text-zinc-500 py-4">No withdrawal records found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-400">
                    <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                      <tr>
                        <th className="pb-3">Coin</th>
                        <th className="pb-3">Address</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {userData.withdrawals?.map((w: any) => (
                        <tr key={w.id}>
                          <td className="py-3 text-white font-medium">{w.coin}</td>
                          <td className="py-3 font-mono text-zinc-300 max-w-[140px] truncate">{w.wallet_address}</td>
                          <td className="py-3 font-bold text-white">${parseFloat(w.amount).toFixed(2)}</td>
                          <td className="py-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              w.status === 'APPROVED' || w.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              w.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {w.status}
                            </span>
                          </td>
                          <td className="py-3 text-zinc-500">{new Date(w.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
}