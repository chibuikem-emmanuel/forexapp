'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Relative URL ensures this points to your deployed domain on Vercel
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Save user session data to localStorage for frontend access
      if (data.user) {
        localStorage.setItem('investflow_user', JSON.stringify(data.user));
      }

      // Successful login redirect
      window.location.href = '/dashboard';
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network connectivity lost. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#070F21] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black uppercase text-white tracking-wide">
            Trader Sign In
          </h1>
          <p className="text-xs text-slate-400">
            Access your active quantitative positions and portfolio portal.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00A3FF]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-semibold text-slate-300 uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-[#00A3FF] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00A3FF]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/get-started"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}