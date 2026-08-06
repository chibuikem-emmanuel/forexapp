'use client';

import { INVESTMENT_PLANS } from '@/lib/data';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentPlans() {
  return (
    <section id="plans" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">High Yield Plans</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Choose Your Investment Tier</p>
          <p className="text-slate-400 text-sm">Tailored strategies designed for both retail and institutional capital.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {INVESTMENT_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 bg-slate-900/80 border transition-all flex flex-col justify-between ${
                plan.popular
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105 z-10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-emerald-400">{plan.returnRate}</span>
                  <span className="text-xs text-slate-400 ml-2">Daily Profit</span>
                  <p className="text-xs text-slate-500 mt-1">{plan.duration}</p>
                </div>

                <div className="space-y-2 py-4 border-y border-slate-800 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min Deposit:</span>
                    <span className="font-semibold text-white">{plan.minDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Deposit:</span>
                    <span className="font-semibold text-white">{plan.maxDeposit}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/register"
                className={`mt-8 w-full py-3 rounded-xl font-bold text-sm text-center transition-all ${
                  plan.popular
                    ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                Invest Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}