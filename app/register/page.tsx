'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/app/actions/portal';

// Make sure 'export default' is present here
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    telegram: '',
    service: 'Managed Account',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#070F21] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black uppercase text-white tracking-wide">
            Create Trader Account
          </h1>
          <p className="text-xs text-slate-400">
            Join the quantitative execution engine platform.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00A3FF]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00A3FF]"
              placeholder="trader@example.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00A3FF]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
              Telegram Handle (Optional)
            </label>
            <input
              type="text"
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00A3FF]"
              placeholder="@traderhandle"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs text-slate-400 hover:text-white transition-colors">
            Already registered? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}