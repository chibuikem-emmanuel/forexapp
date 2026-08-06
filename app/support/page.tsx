'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  Headphones 
} from 'lucide-react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col relative overflow-x-hidden pt-24 pb-16">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#00E0FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full px-6 space-y-10 relative z-10">
        
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00A3FF] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-[0.25em] text-[#00A3FF] uppercase block">
                QUANTUM SUPPORT DESK
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                Contact Support
              </h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#070F21] border border-slate-800 text-slate-300 text-xs font-semibold">
              <Clock className="w-4 h-4 text-[#00A3FF]" />
              <span>Average response time: <strong className="text-white">&lt; 15 mins</strong></span>
            </div>
          </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Quick Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF]">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Direct Assistance</h3>
                  <p className="text-xs text-slate-400">Our specialized FX trading desk is online 24/5.</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="mailto:support@linkforex.com"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#030816] border border-slate-800/80 hover:border-[#00A3FF]/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#00A3FF]" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Email Support</span>
                      <span className="text-xs font-bold text-slate-200">support@linkforex.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white uppercase font-bold">Send Mail →</span>
                </a>

                <a
                  href="https://t.me/linkforex"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#030816] border border-slate-800/80 hover:border-[#00A3FF]/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#00E0FF]" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Telegram Desk</span>
                      <span className="text-xs font-bold text-slate-200">@LinkForexSupport</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white uppercase font-bold">Open Chat →</span>
                </a>
              </div>
            </div>

            {/* SLA Trust Card */}
            <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl space-y-4">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block border-b border-slate-800 pb-2">
                ACCOUNT &amp; TRADING SECURITY
              </span>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  For account safety, support agents will never ask for your private passwords or seed keys. Always verify support domain integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Main Ticket Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#070F21]/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
              
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Submit a Ticket</h2>
                <p className="text-xs text-slate-400 mt-1">Fill out the form below and our quantitative team will review your inquiry.</p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 bg-[#030816] border border-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Ticket Submitted Successfully</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    We have received your ticket. A representative will reach out to your registered email address shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'general', message: '' });
                    }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Submit Another Ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#030816] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#030816] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inquiry Category</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#030816] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors"
                    >
                      <option value="general">General Support</option>
                      <option value="deposit">Deposits &amp; Withdrawals</option>
                      <option value="vip">VIP Sign Up &amp; Allocation</option>
                      <option value="pool">Pool Trading Query</option>
                      <option value="technical">Technical Portal Issue</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your issue or request in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#030816] border border-slate-800 focus:border-[#00A3FF] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white font-black text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending Ticket...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Support Ticket
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}