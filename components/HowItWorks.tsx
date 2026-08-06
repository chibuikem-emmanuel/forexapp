import { STEPS } from '@/lib/data';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Getting Started</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Start Earning in 3 Steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl relative space-y-4"
            >
              <span className="text-4xl font-black text-emerald-500/30">{step.number}</span>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}