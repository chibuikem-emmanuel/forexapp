'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Users,
  TrendingUp,
  Check,
  ArrowRight,
  User,
  Mail,
  Lock,
  Globe,
  Send,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { registerUser } from '@/app/actions/portal';

export default function GetStartedPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    serviceId: 'vip',
    serviceTitle: 'VIP SIGN UP',
    capitalPlan: '$2,500 - $10,000',
    fullName: '',
    telegram: '',
    country: '',
    email: '',
    password: '',
  });

  const steps = [
    { number: 1, title: 'SERVICE' },
    { number: 2, title: 'PLAN' },
    { number: 3, title: 'ACCOUNT' },
    { number: 4, title: 'CONFIRM' },
  ];

  const services = [
    {
      id: 'vip',
      title: 'VIP SIGN UP',
      description: 'Exclusive membership with priority support and premium return structures.',
      icon: Crown,
    },
    {
      id: 'management',
      title: 'ACCOUNT MANAGEMENT',
      description: 'Professional portfolio management with a dedicated trading team.',
      icon: Users,
    },
    {
      id: 'pool',
      title: 'POOL TRADING',
      description: 'Collective investment pools with structured returns across trading cycles.',
      icon: TrendingUp,
    },
  ];

  const validateStep3 = () => {
    setErrorMessage(null);
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 3 && !validateStep3()) return;
    setErrorMessage(null);
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        telegram: formData.telegram,
        country: formData.country,
        service: formData.serviceTitle,
        capitalPlan: formData.capitalPlan,
        password: formData.password,
      });

      if (res.success && res.userId) {
        localStorage.setItem('currentUserId', res.userId);
        router.push('/dashboard');
      } else {
        setErrorMessage(res.error || 'Failed to complete registration.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0090FF] flex flex-col justify-between font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0070F3]/30 via-transparent to-[#00C2FF]/20 pointer-events-none" />

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#00A3FF] to-[#00E0FF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]" />
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-slate-900 leading-tight uppercase">
                LINK FOREX
              </span>
              <span className="text-[9px] tracking-[0.2em] font-bold text-[#00A3FF] uppercase">
                QUANTUM PORTAL
              </span>
            </div>
          </Link>
          <div className="text-xs font-semibold text-slate-500">
            Already a member?{' '}
            <Link href="/login" className="text-[#0070F3] font-bold hover:underline">
              Sign In →
            </Link>
          </div>
        </div>
      </header>

      {/* Steps Indicator */}
      <div className="bg-white/90 border-b border-slate-200 relative z-10 shadow-sm">
        <div className="max-w-[1000px] mx-auto grid grid-cols-4">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <button
                key={step.number}
                type="button"
                disabled={!isCompleted}
                onClick={() => isCompleted && setCurrentStep(step.number)}
                className={`py-4 px-2 flex flex-col items-center text-center transition-all border-b-2 ${
                  isActive
                    ? 'border-[#0070F3] bg-[#0070F3]/5'
                    : isCompleted
                    ? 'border-[#00C853] bg-emerald-50/50 cursor-pointer'
                    : 'border-transparent text-slate-400 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1 ${
                    isActive
                      ? 'bg-[#0070F3] text-white'
                      : isCompleted
                      ? 'bg-[#00C853] text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                </div>
                <span className="text-[11px] font-black tracking-widest uppercase text-slate-800">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Content */}
      <main className="max-w-[850px] mx-auto w-full px-6 py-10 relative z-10 my-auto">
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-extrabold text-white uppercase">Choose Your Service</h1>
              <div className="space-y-4">
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setFormData({ ...formData, serviceId: s.id, serviceTitle: s.title })}
                    className={`p-6 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                      formData.serviceId === s.id ? 'bg-white border-[#0070F3]' : 'bg-white/90 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <s.icon className="w-6 h-6 text-[#0070F3]" />
                      <div>
                        <h3 className="font-bold text-slate-900">{s.title}</h3>
                        <p className="text-xs text-slate-500">{s.description}</p>
                      </div>
                    </div>
                    {formData.serviceId === s.id && <Check className="w-5 h-5 text-[#0070F3]" />}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-4 bg-[#030B1E] text-white font-bold rounded-2xl flex items-center justify-center gap-2"
              >
                CONTINUE <ArrowRight className="w-4 h-4 text-[#00A3FF]" />
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-extrabold text-white uppercase">Select Capital Plan</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['$500 - $2,500', '$2,500 - $10,000', '$10,000 - $50,000', 'Set after deposit'].map((cap) => (
                  <div
                    key={cap}
                    onClick={() => setFormData({ ...formData, capitalPlan: cap })}
                    className={`p-6 rounded-2xl border cursor-pointer ${
                      formData.capitalPlan === cap ? 'bg-white border-[#0070F3]' : 'bg-white/90'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block">{cap}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-4 bg-white/90 text-slate-900 font-bold rounded-2xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-4 bg-[#030B1E] text-white font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  CONTINUE <ArrowRight className="w-4 h-4 text-[#00A3FF]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-extrabold text-white uppercase">Your Account Details</h1>
              <div className="bg-white/95 p-6 rounded-3xl space-y-4 shadow-sm border border-slate-100">
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
                  />
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
                  />
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Password (Min. 6 chars) *"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
                  />
                </div>
                <div className="relative">
                  <Send className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Telegram Username (@username)"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
                  />
                </div>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-4 bg-white/90 text-slate-900 font-bold rounded-2xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-4 bg-[#030B1E] text-white font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  REVIEW ACCOUNT <ArrowRight className="w-4 h-4 text-[#00A3FF]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-extrabold text-white uppercase">Confirm Details</h1>
              <div className="bg-white/95 p-8 rounded-3xl space-y-4 border border-slate-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 uppercase block font-semibold">Service</span>
                    <span className="font-bold">{formData.serviceTitle}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase block font-semibold">Capital Tier</span>
                    <span className="font-bold">{formData.capitalPlan}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase block font-semibold">Full Name</span>
                    <span className="font-bold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase block font-semibold">Email</span>
                    <span className="font-bold">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase block font-semibold">Telegram</span>
                    <span className="font-bold">{formData.telegram || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase block font-semibold">Country</span>
                    <span className="font-bold">{formData.country || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-4 bg-white/90 text-slate-900 font-bold rounded-2xl"
                >
                  Edit Details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-[#030B1E] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#071638] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#00A3FF]" />
                  ) : (
                    <>
                      <span>CREATE ACCOUNT</span>
                      <ShieldCheck className="w-5 h-5 text-[#00A3FF]" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-4 text-white/70 text-xs relative z-10">
        © 2026 Link Forex. All rights reserved.
      </footer>
    </div>
  );
}