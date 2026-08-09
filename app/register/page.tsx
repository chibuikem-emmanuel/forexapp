'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    service: 'VIP_SIGN_UP', // 'VIP_SIGN_UP' or 'POOL_TRADING'
    fullName: '',
    email: '',
    telegram: '',
    country: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiFetch('/api/auth/register/', {
        method: 'POST',
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          telegram_username: formData.telegram,
          country: formData.country,
          service: formData.service,
          password: formData.password,
        }),
      });

      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">Create Investor Account</h1>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Step 1: Select Service</h2>
            <div 
              onClick={() => setFormData({ ...formData, service: 'VIP_SIGN_UP' })}
              className={`p-4 rounded-lg border cursor-pointer transition ${formData.service === 'VIP_SIGN_UP' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950'}`}
            >
              <h3 className="font-bold">VIP Sign Up</h3>
              <p className="text-xs text-zinc-400 mt-1">Access premier trading insights and managed liquidity pools.</p>
            </div>

            <div 
              onClick={() => setFormData({ ...formData, service: 'POOL_TRADING' })}
              className={`p-4 rounded-lg border cursor-pointer transition ${formData.service === 'POOL_TRADING' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950'}`}
            >
              <h3 className="font-bold">Pool Trading</h3>
              <p className="text-xs text-zinc-400 mt-1">Participate in algorithmic yield-generating asset pools.</p>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition mt-4">
              Continue to Account Details
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Step 2: Personal Details</h2>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
            <input type="text" name="telegram" placeholder="Telegram Username" value={formData.telegram} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white" required />

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className="w-1/2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded font-medium text-sm">Back</button>
              <button type="button" onClick={() => setStep(3)} className="w-1/2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded text-sm">Review Account</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Step 3: Confirm Registration</h2>
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg text-sm space-y-2 text-zinc-300">
              <p><span className="text-zinc-500">Service:</span> {formData.service}</p>
              <p><span className="text-zinc-500">Full Name:</span> {formData.fullName}</p>
              <p><span className="text-zinc-500">Email:</span> {formData.email}</p>
              <p><span className="text-zinc-500">Telegram:</span> {formData.telegram || 'N/A'}</p>
              <p><span className="text-zinc-500">Country:</span> {formData.country}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(2)} className="w-1/2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded font-medium text-sm">Back</button>
              <button type="submit" disabled={loading} className="w-1/2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded text-sm">
                {loading ? 'Creating...' : 'OPEN MY ACCOUNT'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}