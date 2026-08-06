'use client';

import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Link Forex\'s pool trading program returned results I couldn\'t have imagined with a traditional fund. Transparent, professional, and truly impressive execution.',
      name: 'Lydia M.',
      country: 'United Kingdom',
      initials: 'LD',
    },
    {
      quote:
        'The VIP program gave me dedicated account management and genuine returns. The support team responds within minutes. Highly recommended.',
      name: 'Tamara G.',
      country: 'Nigeria',
      initials: 'TG',
    },
    {
      quote:
        'What sets Link Forex apart is clarity. Every step of my investment was communicated clearly. I finally feel like I understand where my money is going.',
      name: 'James K.',
      country: 'United States',
      initials: 'JK',
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#00A3FF]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00A3FF] uppercase">
              CLIENT VOICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase">
            WHAT OUR INVESTORS SAY
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 border-t-4 border-t-[#00A3FF] shadow-[0_10px_30px_rgba(0,163,255,0.06)] hover:shadow-[0_15px_35px_rgba(0,163,255,0.12)] transition-all duration-300 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                {/* Quote Accent */}
                <div className="text-[#A5F3FC]">
                  <Quote className="w-8 h-8 rotate-180 fill-[#C084FC]/10 text-[#7DD3FC]" />
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-600 text-sm leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-2 border-t border-slate-100">
                {/* Initials Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0080FF] to-[#00A3FF] flex items-center justify-center text-white text-xs font-black tracking-wider shadow-[0_4px_12px_rgba(0,163,255,0.3)] shrink-0">
                  {item.initials}
                </div>

                {/* Name & Country */}
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.country}
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