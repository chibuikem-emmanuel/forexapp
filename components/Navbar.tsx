'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030710]/90 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group">
          {/* Blue Hexagon Icon */}
          <div className="w-8 h-8 bg-gradient-to-tr from-[#00A3FF] to-[#00E0FF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] flex items-center justify-center shadow-[0_0_15px_rgba(0,163,255,0.5)] group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-widest text-white leading-tight">
              AUTOMATED TRADING
            </span>
            <span className="text-[9px] tracking-[0.2em] font-medium text-slate-400 uppercase">
              Merchant Platform
            </span>
          </div>
        </Link>

        {/* Center Badge Pill (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#00A3FF]/40 bg-[#00A3FF]/5 shadow-[0_0_15px_rgba(0,163,255,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#00A3FF] uppercase font-semibold">
            AUTOMATED · SECURE · DISCIPLINED
          </span>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-xs font-semibold tracking-wider text-slate-300 hover:text-white transition-colors uppercase"
          >
            Sign In
          </Link>
          <Link
            href="/support"
            className="text-xs font-semibold tracking-wider text-white px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-[#00A3FF]/50 transition-all uppercase"
          >
            Contact Support
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#00A3FF]" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070F21] border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A3FF]/30 bg-[#00A3FF]/10 mb-2 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-[#00A3FF] uppercase font-bold">
              AUTOMATED MERCHANT DESK
            </span>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <Link
              href="/login"
              onClick={closeMenu}
              className="w-full text-center py-3 rounded-xl border border-slate-800 bg-[#030712] text-xs font-bold tracking-wider text-slate-300 hover:text-white uppercase transition-all"
            >
              Sign In
            </Link>

            <Link
              href="/support"
              onClick={closeMenu}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0075FF] text-white text-xs font-black tracking-wider uppercase shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}