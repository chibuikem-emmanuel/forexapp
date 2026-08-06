'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FeaturePoint {
  title: string;
  description: string;
}

interface FeatureBlockProps {
  badge: string;
  title: string;
  points: FeaturePoint[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

function FeatureBlock({
  badge,
  title,
  points,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth vertical parallax effect linked to scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-16 ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Content Column */}
      <div className={`lg:col-span-7 space-y-8 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#00A3FF]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00A3FF] uppercase">
              {badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase">
            {title}
          </h2>
        </div>

        {/* Feature Points */}
        <div className="space-y-6">
          {points.map((point, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="text-sm font-extrabold tracking-wide text-[#00A3FF] uppercase flex items-center gap-2">
                <span className="w-1 h-3.5 bg-[#00A3FF] rounded-full inline-block" />
                {point.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-3">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Scroll Image Column */}
      <div className={`lg:col-span-5 relative ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          style={{ y: yParallax }}
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,163,255,0.15)] border border-slate-200"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function OurEdgeSection() {
  const blockOnePoints: FeaturePoint[] = [
    {
      title: 'MARKET PRECISION',
      description:
        'We trade with structure and intent. Our strategies are built on market psychology, liquidity flows, and technical confluence not emotions or noise.',
    },
    {
      title: 'AGGRESSIVE WHERE IT MATTERS',
      description:
        'We are decisive when opportunity presents itself and defensive when risk outweighs reward. This balance allows us to push performance without compromising discipline.',
    },
    {
      title: 'MULTI-ASSET DOMINANCE',
      description:
        'From currency pairs to digital assets and equities, we adapt across markets to capture opportunity wherever momentum and structure align.',
    },
    {
      title: 'RELENTLESS RISK CONTROL',
      description:
        'Aggression without control is gambling. We apply strict risk frameworks to ensure capital protection while pursuing growth.',
    },
    {
      title: 'EXECUTION OVER EXCUSES',
      description:
        "Markets don't reward hesitation. We prioritize speed, clarity, and execution — because results matter more than promises.",
    },
  ];

  const blockTwoPoints: FeaturePoint[] = [
    {
      title: 'INSTITUTIONAL LIQUIDITY ENGINE',
      description:
        'Direct connection to Tier-1 banking partners guarantees minimal slippage and optimal trade execution under high volatility conditions.',
    },
    {
      title: 'ALGORITHMIC COMPLIANCE',
      description:
        'Automated drawdown caps and automated profit-taking protocols safeguard portfolio integrity 24 hours a day.',
    },
    {
      title: 'TRANSPARENT LEDGER',
      description:
        'Every single position, trade duration, and performance yield is logged with immutable transparency for client verification.',
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20 overflow-hidden border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 space-y-20">
        
        {/* Block 1 */}
        <FeatureBlock
          badge="OUR EDGE"
          title="WHY CHOOSE LINK FOREX"
          points={blockOnePoints}
          imageSrc="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000"
          imageAlt="Team analyzing trading charts"
        />

        {/* Block 2 */}
        <FeatureBlock
          badge="STRUCTURE & DISCIPLINE"
          title="SYSTEMATIC MARKET ARCHITECTURE"
          points={blockTwoPoints}
          imageSrc="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1000"
          imageAlt="Financial charts on screen"
          reverse={true}
        />

      </div>
    </section>
  );
}