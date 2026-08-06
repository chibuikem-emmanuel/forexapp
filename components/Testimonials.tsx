'use client';

import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
  location?: string;
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-black tracking-[0.25em] text-[#00A3FF] uppercase block">
            TRADER VERIFICATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Trusted by Quantitative Traders
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Discover how institutional investors and retail Forex traders scale their capital with our execution engine.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials && testimonials.map((item: Testimonial, index: number) => (
            <div
              key={index}
              className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800/80 hover:border-[#00A3FF]/40 rounded-3xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,163,255,0.15)] group"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#00A3FF]">
                    {Array.from({ length: item.rating || 5 }).map((_, i: number) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#00A3FF]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-700 group-hover:text-[#00A3FF]/40 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00A3FF] to-[#00E0FF] p-[1px] flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center text-xs font-bold text-[#00A3FF] uppercase">
                    {item.name ? item.name.charAt(0) : 'T'}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    {item.role} {item.location ? `• ${item.location}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}