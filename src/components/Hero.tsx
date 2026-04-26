'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useStackStore } from '@/store/useStackStore';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('Index');
  const locale = useLocale();
  const [isMounted, setIsMounted] = useState(false);
  const { currency } = useStackStore();

  // 시뮬레이션용 숫자 애니메이션
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const val = Math.round(latest);
    return val.toLocaleString();
  });

  useEffect(() => {
    setIsMounted(true);
    // USD 기준 약 920달러, KRW 기준 약 124만원
    const targetValue = currency === 'KRW' ? 1240500 : 920; 
    const controls = animate(count, targetValue, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, currency]);

  if (!isMounted) return null;

  return (
    <section style={{
      padding: '6rem 1rem 4rem',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {t('hero_title')}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: 1.6
        }}
      >
        {t('hero_subtitle')}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}
      >
        <button 
          onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
          className="glass"
          style={{
            padding: '1rem 2rem',
            borderRadius: '16px',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease'
          }}
        >
          {t('hero_cta')}
          <ArrowRight size={20} />
        </button>

        <div style={{
          padding: '1.25rem 2rem',
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
            {t('hero_counter_prefix')}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>{currency === 'KRW' ? '₩' : '$'}</span>
            <motion.span 
              className="mono"
              style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                color: '#fff',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {rounded}
            </motion.span>
            <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
              {currency === 'KRW' ? t('hero_counter_suffix') : '/mo'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Category Silo Links (Advanced SEO) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          marginTop: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {t('browse_categories')}
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {['Language', 'Vision', 'Voice', 'Builder', 'Infra'].map((cat) => (
            <Link
              key={cat}
              href={`/${locale}/category/${cat}`}
              className="glass hover-scale"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
