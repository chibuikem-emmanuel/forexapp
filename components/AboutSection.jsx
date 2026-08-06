'use client';

import { 
  ShieldCheck, 
  Lock, 
  TrendingUp, 
  Headphones, 
  Award,
  Coins, 
  Users, 
  Globe2 
} from 'lucide-react';

export default function AboutSection() {
  const trustItems = [
    { label: 'UK Incorporated', icon: ShieldCheck },
    { label: 'Secure Client Funds', icon: Lock },
    { label: 'Multi-Asset Trading', icon: TrendingUp },
    { label: 'Dedicated Support', icon: Headphones },
    { label: 'Verified Certificate', icon: Award },
  ];

  const highlights = [
    {
      value: '$2M+',
      label: 'Capital Under Management',
      icon: Coins,
    },
    {
      value: '500+',
      label: 'Active Investors Globally',
      icon: Users,
    },
    {
      value: '20+',
      label: 'Countries Represented',
      icon: Globe2,
    },
  ];

  return (
    <section className="w-full">
      {/* Top Dark Trust Bar */}
      <div className="bg-[#030816] border-y border-slate-800/80 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-center sm:justify-between gap-6 text-slate-400 text-xs font-semibold">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 hover:text-white transition-colors">
              <item.icon className="w-4 h-4 text-[#00A3FF]" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Light Section */}
      <div className="bg-[#F8FAFC] text-slate-900 py-24 border-b border-slate-200">
        <div className="max-w-[1000px] mx-auto px-6 space-y-12">
          
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#00A3FF]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00A3FF] uppercase">
                WHO WE ARE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase">
              INTRODUCTION
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl pt-2">
              <p>
                Link Forex Trading Company is a modern trading and investment firm focused on delivering disciplined, data-driven trading solutions across forex, cryptocurrency, and global equity markets.
              </p>
              <p>
                Our approach emphasizes precision, consistency, transparency, and structured execution.
              </p>
            </div>
          </div>

          {/* Highlight Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {highlights.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,163,255,0.1)] hover:border-[#00A3FF]/40 transition-all space-y-6"
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
                  <card.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <div className="text-3xl font-black tracking-tight text-slate-900">
                    {card.value.startsWith('$') ? (
                      <>
                        <span className="text-[#00A3FF]">$</span>
                        {card.value.slice(1, -1)}
                        <span className="text-[#00A3FF]">+</span>
                      </>
                    ) : (
                      <>
                        {card.value.replace('+', '')}
                        <span className="text-[#00A3FF]">+</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 tracking-wide">
                    {card.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}