'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Copy,
  Info,
  ShieldAlert,
  ArrowRight,
  QrCode,
  Coins,
  Send,
  FileCheck,
} from 'lucide-react';

interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  network: string;
  address: string;
  iconBg: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Mainnet',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum Mainnet',
    address: '0x32eeb18ed4ea822d8ebde2a8def2ee22dfd',
    iconBg: 'bg-[#00A3FF]/20 text-[#00A3FF] border-[#00A3FF]/30',
  },
  {
    id: 'usdt',
    name: 'Tether USD',
    symbol: 'USDT',
    network: 'TRC-20 / ERC-20',
    address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    network: 'ERC-20',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
];

export default function DepositPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCoin, setSelectedCoin] = useState<CryptoOption | null>(null);
  const [copied, setCopied] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectCoin = (coin: CryptoOption) => {
    setSelectedCoin(coin);
    setStep(2);
  };

  const handleCopyAddress = () => {
    if (!selectedCoin) return;
    navigator.clipboard.writeText(selectedCoin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Background Neon Glows */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#00E0FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="bg-[#070F21]/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#00A3FF] to-[#00E0FF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]" />
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-white leading-tight uppercase">
                LINK FOREX
              </span>
              <span className="text-[9px] tracking-[0.2em] font-bold text-[#00A3FF] uppercase">
                QUANTUM PORTAL
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl border border-slate-800 bg-[#030816] text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs font-bold tracking-wider uppercase flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#00A3FF]" /> DASHBOARD
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-[1500px] mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Wizard Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Description */}
          <div className="space-y-1">
            <span className="text-[10px] font-black tracking-[0.25em] text-[#00A3FF] uppercase block">
              — FUND YOUR ACCOUNT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              MAKE A DEPOSIT
            </h1>
            <p className="text-xs text-slate-400 font-medium max-w-2xl">
              Choose your cryptocurrency, copy the wallet address, send your funds, then confirm the amount. Your deposited amount will be reflected in your dashboard as your investment capital.
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-3 bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-1.5 rounded-2xl gap-2">
            {[
              { id: 1, label: 'SELECT COIN' },
              { id: 2, label: 'COPY ADDRESS' },
              { id: 3, label: 'CONFIRM' },
            ].map((s) => {
              const isCurrent = step === s.id && !isSubmitted;
              const isDone = step > s.id || isSubmitted;

              return (
                <div
                  key={s.id}
                  className={`py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.3)]'
                      : isDone
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[#030816]/50 text-slate-500 border border-slate-800/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-white text-[#0075FF]' : isDone ? 'bg-emerald-400 text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : s.id}
                  </div>
                  <span className="text-[11px] font-black tracking-wider uppercase hidden sm:inline">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Step Content Box */}
          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
            
            {!isSubmitted ? (
              <>
                {/* Banner Banner Info Header */}
                <div className="bg-[#030816] border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
                  <Coins className="w-5 h-5 text-[#00A3FF] shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">DEPOSIT FUNDS</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Minimum deposit: $100 USD equivalent</p>
                  </div>
                </div>

                {/* STEP 1 & 2: SELECT CRYPTOCURRENCY */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black tracking-widest text-[#00A3FF] uppercase block">
                    ⚡ SELECT CRYPTOCURRENCY
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cryptoOptions.map((coin) => {
                      const isSelected = selectedCoin?.id === coin.id;

                      return (
                        <button
                          key={coin.id}
                          onClick={() => handleSelectCoin(coin)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#00A3FF]/10 border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.2)]'
                              : 'bg-[#030816] border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs ${coin.iconBg}`}>
                              {coin.symbol.slice(0, 3)}
                            </div>
                            <div>
                              <div className="text-xs font-black text-white">{coin.symbol}</div>
                              <div className="text-[10px] text-slate-400 font-medium">{coin.name}</div>
                            </div>
                          </div>

                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#00A3FF] bg-[#00A3FF] text-white' : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: ADDRESS & QR DISPLAY */}
                {selectedCoin && (
                  <div className="space-y-4 pt-4 border-t border-slate-800/80">
                    <div className="bg-[#030816] border border-slate-800 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="text-[10px] font-sans font-bold text-[#00A3FF] uppercase">
                          {selectedCoin.symbol} {selectedCoin.network}
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                          ACTIVE
                        </span>
                      </div>

                      <div className="bg-black/40 border border-slate-800 p-3 rounded-xl font-mono text-xs text-slate-200 break-all select-all">
                        {selectedCoin.address}
                      </div>

                      <button
                        onClick={handleCopyAddress}
                        className="w-full py-3 rounded-xl bg-[#00A3FF]/20 border border-[#00A3FF]/40 text-[#00A3FF] font-extrabold text-xs tracking-wider uppercase hover:bg-[#00A3FF]/30 transition-all flex items-center justify-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'ADDRESS COPIED' : 'COPY ADDRESS'}
                      </button>
                    </div>

                    {/* QR Code Warning Box */}
                    <div className="bg-[#030816] border border-slate-800/80 p-4 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-white rounded-xl text-black shrink-0">
                        <QrCode className="w-10 h-10" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        <strong className="text-white">Scan QR code or copy the address above.</strong> Send only the selected coin on the correct network. Sending to the wrong network causes permanent loss of funds.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 3: AMOUNT CONFIRMATION FORM */}
                {selectedCoin && (
                  <form onSubmit={handleSubmitDeposit} className="space-y-4 pt-4 border-t border-slate-800/80">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                        AMOUNT YOU ARE SENDING (USD VALUE)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min="100"
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => {
                            setDepositAmount(e.target.value);
                            setStep(3);
                          }}
                          className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[#030816] border border-slate-800 text-sm font-mono text-white focus:outline-none focus:border-[#00A3FF] transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 uppercase">
                          USD
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Enter the USD equivalent of what you sent. This amount will be recorded as your investment capital in your dashboard.
                      </p>
                    </div>

                    <div className="bg-amber-400/10 border border-amber-400/20 p-3.5 rounded-xl flex items-start gap-2 text-[11px] text-amber-300 font-medium">
                      <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        After sending your funds, click <strong>Submit Deposit Request</strong> below. Our compliance team will verify your transaction and update your dashboard. Typically takes 10–30 minutes.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!depositAmount}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white font-black text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> SUBMIT DEPOSIT REQUEST
                    </button>
                  </form>
                )}
              </>
            ) : (
              /* SUCCESS STATE SCREEN */
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                    DEPOSIT SUBMITTED!
                  </h2>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    Your deposit request has been received and our team has been notified. Your investment capital in the dashboard will be updated once confirmed.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <div className="px-4 py-2.5 rounded-xl bg-[#030816] border border-slate-800 font-mono text-xs text-slate-300 font-bold">
                    REF: DEP-253243
                  </div>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00A3FF] hover:bg-[#0082FF] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                  >
                    ← BACK TO DASHBOARD
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Sidebar Details Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Summary Panel */}
          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-[#00A3FF] p-4 text-white flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-slate-900" />
              <div>
                <h3 className="text-xs font-black tracking-wider uppercase text-slate-950">DEPOSIT SUMMARY</h3>
                <p className="text-[10px] text-slate-900/80 font-bold">Updates as you fill in the form</p>
              </div>
            </div>

            <div className="p-5 divide-y divide-slate-800 text-xs font-medium space-y-3">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500 uppercase text-[10px] font-bold">INVESTOR</span>
                <span className="text-slate-300 font-bold">ehhhee</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 uppercase text-[10px] font-bold">INVESTOR ID</span>
                <span className="font-mono text-slate-300">LF-AF920BFE</span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 uppercase text-[10px] font-bold">COIN</span>
                <span className="font-extrabold text-[#00A3FF]">
                  {selectedCoin ? selectedCoin.symbol : 'Not selected'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 uppercase text-[10px] font-bold">NETWORK</span>
                <span className="text-slate-300 font-bold">
                  {selectedCoin ? selectedCoin.network : '—'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 uppercase text-[10px] font-bold">AMOUNT (USD)</span>
                <span className="text-lg font-black font-mono text-white">
                  ${depositAmount || '0.00'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-500 uppercase text-[10px] font-bold">STATUS</span>
                <span className={`text-[11px] font-bold uppercase ${isSubmitted ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isSubmitted ? '✔ Submitted' : 'Awaiting submission'}
                </span>
              </div>
            </div>
          </div>

          {/* How It Works Guide Box */}
          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-5 rounded-3xl space-y-4">
            <span className="text-[10px] font-black tracking-widest text-[#00A3FF] uppercase block border-b border-slate-800 pb-2">
              HOW IT WORKS
            </span>

            <div className="space-y-3 text-xs">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-md bg-[#00A3FF]/20 text-[#00A3FF] text-[10px] font-black flex items-center justify-center shrink-0">1</div>
                <div>
                  <strong className="text-white block">Choose Your Coin</strong>
                  <span className="text-[11px] text-slate-400">Select BTC, ETH, USDT, or USDC and the correct network.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-md bg-[#00A3FF]/20 text-[#00A3FF] text-[10px] font-black flex items-center justify-center shrink-0">2</div>
                <div>
                  <strong className="text-white block">Send Your Funds</strong>
                  <span className="text-[11px] text-slate-400">Copy the wallet address, send the crypto from your own wallet.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-md bg-[#00A3FF]/20 text-[#00A3FF] text-[10px] font-black flex items-center justify-center shrink-0">3</div>
                <div>
                  <strong className="text-white block">Confirm Amount</strong>
                  <span className="text-[11px] text-slate-400">Enter the USD value you sent and submit. Our team verifies and credits your account.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 text-xs text-red-300">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Always double-check the wallet address and network before sending. Cryptocurrency transactions are irreversible. Link Forex is not responsible for funds sent to the wrong address.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}