'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#070F21] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black uppercase text-white tracking-wide">
            Reset Password
          </h1>
          <p className="text-xs text-slate-400">
            Enter your account email to receive security verification instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#00A3FF]/10 border border-[#00A3FF]/30 rounded-2xl p-4 text-center space-y-3">
            <p className="text-xs text-[#00A3FF] font-semibold">
              If an account matches <span className="text-white">{email}</span>, password reset instructions have been dispatched.
            </p>
            <Link
              href="/login"
              className="inline-block text-xs font-bold text-slate-300 hover:text-white uppercase pt-2"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all"
            >
              Send Instructions
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}