'use client';

import Link from 'next/link';
import { Rocket, PlayCircle } from 'lucide-react';

export default function Hero() {
  const stats = [
    { value: '3+', label: 'YEARS ACTIVE', color: 'text-[#00A3FF]' },
    { value: '$2M+', label: 'MANAGED CAPITAL', color: 'text-[#00A3FF]' },
    { value: '500+', label: 'INVESTORS', color: 'text-[#00A3FF]' },
    { value: 'UK Reg.', label: 'INCORPORATED', color: 'text-[#00A3FF]' },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-grid-pattern">
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Large Faded Gold Text Backdrop */}
        <div className="text-[13vw] font-black tracking-tighter text-[#8B734B]/10 select-none text-center leading-none uppercase">
          LINK FX
          <br />
          <span className="text-[8vw] tracking-normal">TRADING COMPANY</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center my-auto">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-8">
          <span className="block text-white">PROFESSIONAL TRADING.</span>
          <span className="block bg-gradient-to-r from-[#00A3FF] via-[#00C2FF] to-[#00E0FF] bg-clip-text text-transparent">
            CONSISTENT PERFORMANCE.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-10">
          Data-driven strategies across forex, crypto, and global equities — managed by professionals who treat risk as seriously as returns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-started"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(0,163,255,0.5)] hover:shadow-[0_0_45px_rgba(0,163,255,0.7)] transition-all"
          >
            <Rocket className="w-4 h-4 fill-white" />
            Get Started
          </Link>
          <Link
            href="#why-choose-linkforex"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
          >
            <PlayCircle className="w-4 h-4 text-slate-400" />
            Learn More
          </Link>
        </div>

      </div>

      {/* Bottom Metrics Bar */}
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-6 pt-16 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {stat.value.includes('UK') ? (
                  <>
                    UK <span className="text-[#00A3FF]">Reg.</span>
                  </>
                ) : (
                  <>
                    {stat.value.replace('+', '')}
                    <span className="text-[#00A3FF]">+</span>
                  </>
                )}
              </div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}