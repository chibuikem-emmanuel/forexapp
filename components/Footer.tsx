'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, X, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <>
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
                  href="https://wa.me/message/3RAHVPCRCVDWN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Support"
                  className="w-10 h-10 rounded-xl bg-[#091833] border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-[#00A3FF] hover:border-[#00A3FF]/50 hover:bg-[#00A3FF]/10 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/Team_Supportonline"
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

              <button
                type="button"
                onClick={() => setShowCertificate(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700 bg-[#091833]/80 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#00A3FF]" />
                View Certificate
              </button>
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

      {/* CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white text-zinc-900 rounded-sm shadow-2xl p-8 sm:p-14 border border-zinc-300 font-serif my-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-black bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Document Content */}
            <div className="text-center space-y-6">
              
              {/* Top File Copy Header */}
              <div className="text-sm font-sans tracking-widest font-semibold text-zinc-800 uppercase">
                FILE COPY
              </div>

              {/* Royal Coat of Arms Emblem */}
              <div className="flex justify-center py-1">
                <svg className="w-20 h-20 text-zinc-900 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L9.5 5H4v4.5L1 12l3 2.5V19h5.5l2.5 3 2.5-3H19v-4.5l3-2.5-3-2.5V5h-5.5L12 2zm0 3.8L13.8 8h3.2v3.2l2.1 1.8-2.1 1.8V18h-3.2L12 20.2 10.2 18H7v-3.2L4.9 13 7 11.2V8h3.2L12 5.8zM12 9a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
              </div>

              {/* Certificate Title */}
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold font-sans tracking-wide text-zinc-900 uppercase">
                  CERTIFICATE OF INCORPORATION
                </h2>
                <h3 className="text-base sm:text-lg font-bold font-sans tracking-wide text-zinc-900 uppercase">
                  OF A
                </h3>
                <h3 className="text-lg sm:text-xl font-bold font-sans tracking-wide text-zinc-900 uppercase">
                  PRIVATE LIMITED COMPANY
                </h3>
              </div>

              {/* Company Number */}
              <p className="text-sm font-sans font-medium text-zinc-800 pt-2">
                Company Number <span className="font-bold">12422197</span>
              </p>

              {/* Main Certification Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-zinc-800 text-left max-w-lg mx-auto pt-4 font-sans">
                <p>
                  The Registrar of Companies for England and Wales, hereby certifies that
                </p>

                <p className="text-center font-extrabold text-base sm:text-lg tracking-wide text-black py-2 uppercase">
                  AUTOMATED TRADING MERCHANT LTD
                </p>

                <p>
                  is this day incorporated under the Companies Act 2006 as a private company, that the company is limited by shares, and the situation of its registered office is in England and Wales.
                </p>

                <p className="pt-2">
                  Given at Companies House, Cardiff, on <span className="font-bold">23rd January 2020</span>
                </p>
              </div>

              {/* Barcode representation */}
              <div className="pt-6 pb-4 flex flex-col items-center">
                <div className="flex items-center gap-[2px] h-10 px-4">
                  {[3,1,2,1,4,1,2,3,1,2,1,4,1,2,1,3,1,4,2,1,3,1,2,1,4,1,2,3].map((w, i) => (
                    <div key={i} className="bg-black h-full" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
                <p className="text-[10px] font-mono tracking-widest text-zinc-700 mt-1">
                  * N12422197F *
                </p>
              </div>

              {/* Footer Logos & Seals */}
              <div className="flex items-end justify-between pt-6 border-t border-zinc-200 font-sans">
                {/* Companies House Logo */}
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-900">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L18.8 8 12 11.2 5.2 8 12 4.8zm-8 4.7l7 3.3v6.7l-7-3.5V9.5zm16 6.5l-7 3.5v-6.7l7-3.3v6.5z"/>
                    </svg>
                    <span className="font-bold text-sm tracking-tight text-black">Companies House</span>
                  </div>
                </div>

                {/* Registrar Official Seal */}
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-800 p-1 flex items-center justify-center text-center">
                  <div className="w-full h-full rounded-full border border-zinc-800 flex flex-col items-center justify-center p-1">
                    <span className="text-[6px] font-bold tracking-tighter uppercase leading-tight text-zinc-800">
                      THE OFFICIAL SEAL OF THE REGISTRAR OF COMPANIES
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal Disclaimer Footer */}
              <p className="text-[9px] text-zinc-500 font-sans leading-tight pt-4">
                The above information was communicated by electronic means and authenticated by the Registrar of Companies under section 1115 of the Companies Act 2006.
              </p>

            </div>
          </div>
        </div>
      )}
    </>
  );
}