'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { apiFetch } from '@/lib/api';

export default function StaffRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country: 'USA',
    password: '',
    staff_secret: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiFetch('/api/auth/register-staff/', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      Cookies.set('access_token', data.access, { expires: 1, path: '/' });
      Cookies.set('is_staff', 'true', { expires: 1, path: '/' });

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Staff registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-emerald-400">Create Staff Account</h1>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-xs">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
          <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
          <input type="password" placeholder="Staff Secret Key" value={formData.staff_secret} onChange={(e) => setFormData({ ...formData, staff_secret: e.target.value })} className="w-full bg-zinc-950 border border-emerald-500/50 p-3 rounded text-sm text-white font-mono" required />

          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded text-sm transition">
            {loading ? 'Registering Staff...' : 'Register & Access Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}