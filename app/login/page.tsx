'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { apiFetch } from '@/lib/api';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiFetch('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Save tokens in LocalStorage for client API requests
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // Save cookies for Next.js Middleware routing
      Cookies.set('access_token', data.access, { expires: 1, path: '/' });
      Cookies.set('is_staff', String(data.user.is_staff), { expires: 1, path: '/' });

      // Automatically route staff users to the admin dashboard
      if (data.user.is_staff) {
        router.push('/admin/dashboard');
      } else {
        router.push(redirectTo);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">Sign In</h1>
        <p className="text-xs text-zinc-400">Enter your credentials to access your account</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-xs font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 p-3 rounded-lg text-sm text-white focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 p-3 rounded-lg text-sm text-white focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg text-sm transition"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="pt-4 border-t border-zinc-800/80 flex flex-col items-center gap-2 text-xs text-zinc-400">
        <p>
          Don't have an account?{' '}
          <Link href="/register" className="text-emerald-400 hover:underline font-semibold">
            Register Investor Account
          </Link>
        </p>
        <p>
          Staff member?{' '}
          <Link href="/register-staff" className="text-zinc-300 hover:underline">
            Create Staff Portal
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-zinc-500 text-sm">Loading login portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}