import { FEATURES } from '@/lib/data';
import { Bot, ShieldCheck, Zap, Globe } from 'lucide-react';

const iconMap = {
  Bot,
  ShieldCheck,
  Zap,
  Globe,
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Why LinkForex</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Built for Security & Performance</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((item, idx) => {
            const IconComponent = iconMap[item.iconName as keyof typeof iconMap] || Zap;
            return (
              <div
                key={idx}
                className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}