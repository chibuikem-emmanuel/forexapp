'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

// Defined Investment Plans Data
const INVESTMENT_PLANS = [
  {
    category: '2-Days Plan',
    duration: '2 Days',
    options: [
      { invest: '$500', earn: '$6,200', id: '2D_500' },
      { invest: '$700', earn: '$7,300', id: '2D_700' },
      { invest: '$800', earn: '$8,000', id: '2D_800' },
    ],
  },
  {
    category: '3-Days Plan',
    duration: '3 Days',
    options: [
      { invest: '$1,000', earn: '$14,000', id: '3D_1000' },
      { invest: '$1,500', earn: '$16,000', id: '3D_1500' },
      { invest: '$2,000', earn: '$25,000', id: '3D_2000' },
      { invest: '$3,000', earn: '$30,000', id: '3D_3000' },
      { invest: '$5,000', earn: '$45,000', id: '3D_5000' },
    ],
  },
  {
    category: '⏱ Premium Trade',
    duration: '7 Days',
    options: [
      { invest: '1 BTC', earn: '7 BTC', id: '7D_1BTC' },
      { invest: '2 BTC', earn: '13 BTC', id: '7D_2BTC' },
      { invest: '3 BTC', earn: '28 BTC', id: '7D_3BTC' },
      { invest: '5 BTC', earn: '35 BTC', id: '7D_5BTC' },
    ],
  },
];

const PAYMENT_METHODS = [
  'Bitcoin 💰',
  'USDT 💎',
  'Other Cryptocurrency Address',
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    selectedPlan: '2D_500',
    planDetails: 'INVEST $500 EARN $6,200 (2 Days)',
    fullName: '',
    email: '',
    phone: '',
    telegram: '',
    country: '',
    cryptoWallet: '',
    paymentMethod: 'Bitcoin 💰',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (
    id: string,
    invest: string,
    earn: string,
    duration: string
  ) => {
    setFormData({
      ...formData,
      selectedPlan: id,
      planDetails: `INVEST ${invest} EARN ${earn} (${duration})`,
    });
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
          phone_number: formData.phone,
          telegram_username: formData.telegram,
          country: formData.country,
          service: formData.planDetails,
          btc_wallet_address: formData.cryptoWallet,
          payment_method: formData.paymentMethod,
          password: formData.password,
        }),
      });

      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-emerald-400">
          Create Investor Account
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 text-xs text-zinc-400">
          <span className={step >= 1 ? 'text-emerald-400 font-bold' : ''}>
            1. Select Plan
          </span>
          <span className={step >= 2 ? 'text-emerald-400 font-bold' : ''}>
            2. Details & Payout
          </span>
          <span className={step === 3 ? 'text-emerald-400 font-bold' : ''}>
            3. Confirm
          </span>
        </div>

        {/* STEP 1: INVESTMENT PLAN SELECTION */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-base font-semibold text-zinc-200">
              Step 1: Choose Trading Plan
            </h2>

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {INVESTMENT_PLANS.map((group) => (
                <div key={group.category} className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {group.category}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {group.options.map((opt) => {
                      const isSelected = formData.selectedPlan === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            handlePlanSelect(
                              opt.id,
                              opt.invest,
                              opt.earn,
                              group.duration
                            )
                          }
                          className={`p-3.5 rounded-lg border cursor-pointer transition flex justify-between items-center ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/10 text-white'
                              : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-extrabold text-white">
                              Invest {opt.invest}
                            </div>
                            <div className="text-xs text-emerald-400 font-semibold">
                              Earn {opt.earn}
                            </div>
                          </div>
                          <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-mono">
                            {group.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-lg transition text-sm"
            >
              Continue to Investor Details →
            </button>
          </div>
        )}

        {/* STEP 2: PERSONAL & PAYOUT DETAILS */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-200">
              Step 2: Investor & Payout Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Contact Number *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Nationality / Country *"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <input
              type="text"
              name="telegram"
              placeholder="Telegram Username (Optional)"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
            />

            <div>
              <label className="text-xs text-zinc-400 mb-1 block">
                Preferred Deposit Payment Method *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="cryptoWallet"
              placeholder="BTC / Crypto Wallet Address (For Receiving Returns) *"
              value={formData.cryptoWallet}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Account Password *"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded font-medium text-sm transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded text-sm transition"
              >
                Review Account
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRM & SUBMIT */}
        {step === 3 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-base font-semibold text-zinc-200">
              Step 3: Confirm Registration
            </h2>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg text-xs space-y-2.5 text-zinc-300">
              <p>
                <span className="text-zinc-500 block">Chosen Plan:</span>
                <strong className="text-emerald-400 text-sm">
                  {formData.planDetails}
                </strong>
              </p>
              <div className="grid grid-cols-2 gap-2 border-t border-zinc-800/80 pt-2">
                <p>
                  <span className="text-zinc-500">Full Name:</span>{' '}
                  {formData.fullName}
                </p>
                <p>
                  <span className="text-zinc-500">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="text-zinc-500">Contact Number:</span>{' '}
                  {formData.phone}
                </p>
                <p>
                  <span className="text-zinc-500">Nationality:</span>{' '}
                  {formData.country}
                </p>
                <p>
                  <span className="text-zinc-500">Payment Method:</span>{' '}
                  {formData.paymentMethod}
                </p>
                <p>
                  <span className="text-zinc-500">Telegram:</span>{' '}
                  {formData.telegram || 'N/A'}
                </p>
              </div>
              <p className="border-t border-zinc-800/80 pt-2 font-mono">
                <span className="text-zinc-500 block font-sans">
                  Payout Wallet Address:
                </span>
                <span className="text-emerald-400 break-all">
                  {formData.cryptoWallet}
                </span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/2 bg-zinc-800 hover:bg-zinc-700 py-3 rounded font-medium text-sm transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded text-sm transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'OPEN MY ACCOUNT'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}