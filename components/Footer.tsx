'use client';

import Link from 'next/link';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030B1E] text-slate-300 pt-16 pb-8 border-t border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          
          {/* Brand Info & Socials */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-black tracking-widest text-white uppercase leading-tight">
                AUTOMATED TRADING
              </h3>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-slate-500 uppercase">
                MERCHANT PLATFORM
              </p>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A modern algorithmic merchant platform delivering disciplined, data-driven automated solutions across forex, cryptocurrency, and global equity markets.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:support@automatedtradingmerchant.com"
                aria-label="Email Us"
                className="w-10 h-10 rounded-xl bg-[#091833] border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/50 hover:bg-[#00A3FF]/10 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Support"
                className="w-10 h-10 rounded-xl bg-[#091833] border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/50 hover:bg-[#00A3FF]/10 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="w-10 h-10 rounded-xl bg-[#091833] border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/50 hover:bg-[#00A3FF]/10 transition-all"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Head Office Address */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-[0.2em] text-slate-500 uppercase">
              HEAD OFFICE
            </h4>

            <div className="text-xs text-slate-300 space-y-1 font-medium leading-relaxed">
              <p className="font-bold text-white text-sm pb-1">Automated Trading Merchant Ltd</p>
              <p className="uppercase">94 TORBAY ROAD</p>
              <p className="uppercase">HARROW</p>
              <p className="uppercase">MIDDLESEX HA2 9QJ</p>
              <p className="text-slate-400 pt-1">United Kingdom</p>
            </div>
          </div>

          {/* Verification Section */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] font-extrabold tracking-[0.2em] text-slate-500 uppercase">
              VERIFICATION
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed">
              View our official certificate of incorporation.
            </p>

            <Link
              href="/certificate.pdf"
              target="_blank"
              className="inline-block px-6 py-2.5 rounded-xl border border-slate-700 bg-[#091833]/80 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider transition-all"
            >
              View Certificate
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Automated Trading Merchant. All rights reserved.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/register" className="hover:text-white transition-colors">
              Open Account
            </Link>
            <span>·</span>
            <Link href="/login" className="hover:text-white transition-colors">
              Client Login
            </Link>
            <span>·</span>
            <Link href="/support" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}