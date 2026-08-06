'use client';

import Image from 'next/image';
import { Bitcoin, LineChart, Briefcase } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      title: 'CRYPTOCURRENCY',
      category: 'SERVICES',
      icon: Bitcoin,
      imageSrc:
        'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800',
      imageAlt: 'Cryptocurrency trading with Bitcoin coins and candlestick chart',
    },
    {
      title: 'FOREX TRADING',
      category: 'SERVICES',
      icon: LineChart,
      imageSrc:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
      imageAlt: 'Forex market financial analytics on electronic screen',
    },
    {
      title: 'ASSET MANAGEMENT',
      category: 'SERVICES',
      icon: Briefcase,
      imageSrc:
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
      imageAlt: 'Gold dollar signs and coins representing asset management',
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
              WHAT WE OFFER
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase">
            OUR SERVICES
          </h2>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-[#0A192F] border border-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,163,255,0.18)] transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full h-64 overflow-hidden bg-slate-900">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60" />
                </div>

                {/* Footer Content */}
                <div className="bg-[#0B1E36] p-5 flex items-center gap-4 border-t border-slate-800/80">
                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/30 flex items-center justify-center text-[#00A3FF] shrink-0 group-hover:bg-[#00A3FF] group-hover:text-slate-950 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Text Container */}
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase block">
                      {service.category}
                    </span>
                    <h3 className="text-sm font-black tracking-wider text-white uppercase flex items-center gap-1.5 group-hover:text-[#00A3FF] transition-colors">
                      <span className="text-[#00A3FF] font-bold">|</span>
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}