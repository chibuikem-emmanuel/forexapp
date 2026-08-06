import { STATS } from '@/lib/data';

export default function Stats() {
  return (
    <section className="py-12 bg-slate-950 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all"
            >
              <p className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="text-sm font-medium text-slate-300 mt-1">{stat.label}</p>
              {stat.change && (
                <p className="text-xs text-emerald-400 font-medium mt-2">{stat.change}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}