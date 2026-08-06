'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/data';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">FAQ</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-5 flex justify-between items-center font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-400 transition-transform ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}