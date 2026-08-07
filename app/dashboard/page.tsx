'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  Crown,
  Users,
  Copy,
  Check,
  LogOut,
  Clock,
  ShieldAlert,
  Calendar,
  Layers,
  ArrowDownLeft,
  ArrowUpRight,
  MessageSquare,
  Activity,
  Loader2,
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  accountId: string;
  status: string;
  service: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'pool' | 'vip' | 'management'>('vip');
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyId = () => {
    if (user?.accountId) {
      navigator.clipboard.writeText(user.accountId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'LF';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#00A3FF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col relative overflow-x-hidden">
      
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#00E0FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <header className="bg-[#070F21]/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#00A3FF] to-[#00E0FF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]" />
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-white leading-tight uppercase">
                AUTOMATED TRADING
              </span>
              <span className="text-[9px] tracking-[0.2em] font-bold text-[#00A3FF] uppercase">
                MERCHANT
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-4 bg-[#030816] border border-slate-800 px-4 py-1.5 rounded-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase">
                LIVE PORTAL
              </span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="font-mono text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00A3FF]" />
              {currentTime || '15:48:38'}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#030816] border border-slate-800/80 p-1.5 pl-3 pr-4 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-[#00A3FF] text-white font-black text-xs flex items-center justify-center">
                {getInitials(user?.name || '')}
              </div>
              <span className="text-xs font-bold text-slate-200">{user?.name}</span>
            </div>

            <button
              onClick={handleSignOut}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all font-bold text-xs flex items-center gap-2 uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">SIGN OUT</span>
            </button>
          </div>

        </div>
      </header>

      <div className="max-w-[1500px] mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <aside className="lg:col-span-3 space-y-6">
          
          <div className="bg-gradient-to-b from-[#00A3FF] to-[#0066FF] rounded-3xl p-6 text-white text-center space-y-4 shadow-[0_10px_30px_rgba(0,163,255,0.25)] relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-xl flex items-center justify-center mx-auto shadow-inner">
              {getInitials(user?.name || '')}
            </div>

            <div>
              <h2 className="text-lg font-black tracking-wider uppercase">{user?.name}</h2>
              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold tracking-widest uppercase">
                • {user?.status || 'PENDING'}
              </span>
            </div>

            <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <span className="font-mono text-white/90 font-medium">ID: {user?.accountId}</span>
              <button
                onClick={handleCopyId}
                className="p-1 hover:bg-white/20 rounded transition-colors text-white"
                title="Copy User ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              MARKET OPEN
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {currentTime || '15:48:38'}
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl space-y-4">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block border-b border-slate-800 pb-2">
              ACCOUNT OVERVIEW
            </span>

            <div className="space-y-3 text-xs">
              <div className="bg-[#030816] border border-slate-800/60 p-3 rounded-xl flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#00A3FF]" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">SERVICE</span>
                  <span className="font-bold text-white">{user?.service || 'VIP Sign Up'}</span>
                </div>
              </div>

              <div className="bg-[#030816] border border-slate-800/60 p-3 rounded-xl flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#00A3FF]" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">MEMBER SINCE</span>
                  <span className="font-bold text-slate-200">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : '05/08/2026'}
                  </span>
                </div>
              </div>

              <div className="bg-[#030816] border border-slate-800/60 p-3 rounded-xl flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">STATUS</span>
                  <span className="font-bold text-amber-400">{user?.status || 'PENDING'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl space-y-3">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block border-b border-slate-800 pb-2">
              MANAGE FUNDS
            </span>

            <Link
              href="/deposit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <ArrowDownLeft className="w-4 h-4" /> DEPOSIT
            </Link>

            <button className="w-full py-3 rounded-xl bg-[#030816] border border-slate-800 text-slate-300 font-extrabold text-xs tracking-wider uppercase hover:border-slate-700 transition-all flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" /> WITHDRAW
            </button>

          <Link 
            href="/support" 
            className="w-full py-2.5 rounded-xl border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 text-[11px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00A3FF]" /> Contact Support
          </Link>
          </div>

        </aside>

        <main className="lg:col-span-9 space-y-6">
          
          <div className="grid grid-cols-3 bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-1.5 rounded-2xl gap-2">
            {[
              { id: 'pool', title: 'POOL TRADING', icon: TrendingUp },
              { id: 'vip', title: 'VIP SIGN UP', icon: Crown },
              { id: 'management', title: 'ACCOUNT MANAGEMENT', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.title}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00A3FF] uppercase block">
                  TRADING DASHBOARD
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  {activeTab === 'vip' ? 'VIP SIGN UP' : activeTab === 'pool' ? 'POOL TRADING' : 'ACCOUNT MANAGEMENT'}
                </h1>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-widest uppercase self-start sm:self-auto">
                {user?.status || 'PENDING APPROVAL'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00A3FF]" />
                <h3 className="text-xs font-black text-slate-200 tracking-wider uppercase">
                  PORTFOLIO STATUS
                </h3>
              </div>
              <p className="text-xs text-slate-400">Latest update from your trading team</p>

              <div className="bg-[#030816] border border-slate-800/80 p-5 rounded-2xl text-xs text-slate-300 font-medium leading-relaxed">
                Status: <span className="text-amber-400 font-bold uppercase">{user?.status || 'PENDING'}</span> for {activeTab === 'vip' ? 'VIP Sign Up' : activeTab === 'pool' ? 'Pool Trading' : 'Account Management'}. Account allocation in progress.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#030816] border border-slate-800/80 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block">
                  START DATE
                </span>
                <span className="text-sm font-bold font-mono text-white">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : '05/08/2026'}
                </span>
              </div>

              <div className="bg-[#030816] border border-slate-800/80 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block">
                  END DATE
                </span>
                <span className="text-sm font-bold font-mono text-slate-400">TBD</span>
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}