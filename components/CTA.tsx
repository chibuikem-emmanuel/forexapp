import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Ready to Start Generating Forex Returns?
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base">
          Join thousands of investors already leveraging automated trading algorithms for consistent yields.
        </p>
        <div className="pt-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-emerald-400 text-slate-950 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/20"
          >
            Create Your Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}