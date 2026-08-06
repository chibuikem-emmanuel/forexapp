export interface InvestmentPlan {
  id: string;
  name: string;
  returnRate: string;
  duration: string;
  minDeposit: string;
  maxDeposit: string;
  popular?: boolean;
  features: string[];
}

export interface StatItem {
  label: string;
  value: string;
  change?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Plans', href: '#plans' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
];

export const STATS: StatItem[] = [
  { label: 'Active Investors', value: '45.2K+', change: '+12% this month' },
  { label: 'Total Paid Out', value: '$128.4M', change: 'Instant withdrawals' },
  { label: 'Supported Assets', value: '250+', change: 'Forex, Crypto, Metals' },
  { label: 'System Uptime', value: '99.99%', change: 'Enterprise security' },
];

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: 'starter',
    name: 'Starter Forex',
    returnRate: '1.8%',
    duration: 'Daily for 10 Days',
    minDeposit: '$100',
    maxDeposit: '$4,999',
    features: ['Instant Withdrawals', 'Principal Returned', '24/7 Support', 'Standard Analytics'],
  },
  {
    id: 'pro',
    name: 'Pro Trader',
    returnRate: '2.5%',
    duration: 'Daily for 20 Days',
    minDeposit: '$5,000',
    maxDeposit: '$24,999',
    popular: true,
    features: ['Instant Withdrawals', 'Principal Returned', 'VIP Support', 'AI Trading Signals', 'Dedicated Account Manager'],
  },
  {
    id: 'institutional',
    name: 'Institutional',
    returnRate: '3.8%',
    duration: 'Daily for 30 Days',
    minDeposit: '$25,000',
    maxDeposit: '$500,000',
    features: ['Instant Withdrawals', 'Principal Returned', '1-on-1 Trading Consultation', 'Custom Portfolio Engine', 'Zero Fee Transfers'],
  },
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Automated Algo Trading',
    description: 'Execute trades automatically using high-frequency algorithms optimized for currency pairs.',
    iconName: 'Bot',
  },
  {
    title: 'Bank-Grade Security',
    description: 'Multi-layer encryption, cold storage backing, and 2FA authentication safeguard all accounts.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Instant Cashouts',
    description: 'Automated payment gateway processes withdrawal requests within minutes.',
    iconName: 'Zap',
  },
  {
    title: 'Global Markets Access',
    description: 'Trade major, minor, and exotic Forex pairs alongside gold, oil, and digital assets.',
    iconName: 'Globe',
  },
];

export const STEPS = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up in less than 2 minutes with zero complex paperwork.',
  },
  {
    number: '02',
    title: 'Select Plan & Deposit',
    description: 'Choose an investment strategy and fund your balance with crypto or fiat.',
  },
  {
    number: '03',
    title: 'Earn & Withdraw',
    description: 'Watch daily returns accrue in real time and request cashouts anytime.',
  },
];

export const FAQS = [
  {
    question: 'How are daily returns generated?',
    answer: 'Returns are generated via proprietary algorithmic trading strategies in global currency markets, arbitrage execution, and automated liquidity provision.',
  },
  {
    question: 'What is the minimum amount required to start?',
    answer: 'You can start investing with as little as $100 on the Starter plan.',
  },
  {
    question: 'Are withdrawals instant?',
    answer: 'Yes, our automated withdrawal engine processes request directly to your preferred wallet or bank account.',
  },
  {
    question: 'Is my principal deposit returned?',
    answer: 'Yes, your initial principal deposit is unlocked and returned upon completion of the plan duration.',
  },
];