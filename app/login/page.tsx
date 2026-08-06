'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030710] text-white flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden bg-grid-pattern">
      <div className="absolute w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#00A3FF]" />
          Back to Home
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-tr from-[#00A3FF] to-[#00E0FF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]" />
          <span className="text-xs font-black tracking-widest text-white">LINK FOREX</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Sign in to your Link Forex account
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#030816] border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-[#00A3FF] hover:underline font-medium"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#030816] border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:shadow-[0_0_35px_rgba(0,163,255,0.6)] transition-all mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
          <span>Encrypted · Regulated · Protected</span>
        </div>

        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-bold text-[#00A3FF] hover:underline transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}