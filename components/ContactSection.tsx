'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00A3FF]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            24/7 Client Support
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            WE ARE HERE TO <span className="bg-gradient-to-r from-[#00A3FF] to-[#00E0FF] bg-clip-text text-transparent">HELP YOU</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about managed accounts, capital requirements, or platform integration? Reach out to our dedicated support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#070F21]/80 border border-slate-800 backdrop-blur-sm hover:border-[#00A3FF]/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Email Inquiry</h3>
                  <p className="text-xs text-slate-400 mb-2">Our support team typically responds within 2 hours.</p>
                  <a href="mailto:support@linkfx.com" className="text-sm font-semibold text-[#00A3FF] hover:underline">
                    support@linkfx.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#070F21]/80 border border-slate-800 backdrop-blur-sm hover:border-[#00A3FF]/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Direct Phone Support</h3>
                  <p className="text-xs text-slate-400 mb-2">Mon - Fri from 8:00 AM to 6:00 PM GMT</p>
                  <a href="tel:+442080000000" className="text-sm font-semibold text-[#00A3FF] hover:underline">
                    +44 (20) 8000 0000
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#070F21]/80 border border-slate-800 backdrop-blur-sm hover:border-[#00A3FF]/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Headquarters</h3>
                  <p className="text-xs text-slate-400">
                    100 Bishopsgate, Financial District<br />
                    London, EC2N 4AG, United Kingdom
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#00A3FF]" />
                <span className="text-xs text-slate-300">Average Desk Response Time</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">&lt; 15 mins</span>
            </div>
          </div>

          {/* Public Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#070F21] border border-slate-800 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Thank you for contacting LinkFX. An account specialist has been assigned to your inquiry and will reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-700 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#00A3FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#00A3FF] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Subject *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-white text-sm focus:outline-none focus:border-[#00A3FF] transition-all"
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="general">General Inquiry</option>
                    <option value="capital">Managed Capital & Investment</option>
                    <option value="verification">KYC & Account Verification</option>
                    <option value="partnership">Institutional Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we assist you today?"
                    className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#00A3FF] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:shadow-[0_0_35px_rgba(0,163,255,0.6)] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    'Submitting Ticket...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}