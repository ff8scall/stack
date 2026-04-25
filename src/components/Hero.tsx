'use client';

import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('Index');
  const [isMounted, setIsMounted] = useState(false);

  // 시뮬레이션용 숫자 애니메이션
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    setIsMounted(true);
    const controls = animate(count, 1240500, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count]);

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
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>₩</span>
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
              {t('hero_counter_suffix')}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
