'use client';

import { presets } from '@/data/presets';
import { useStackStore } from '@/store/useStackStore';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function PresetSelector() {
  const { applyPreset, selectedBrickIds } = useStackStore();
  const locale = useLocale() as 'ko' | 'en';

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '2rem 0 1rem 0',
      padding: '0 1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Sparkles size={18} color="#fbbf24" />
        <h2 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--foreground-secondary)', letterSpacing: '-0.02em' }}>
          {locale === 'ko' ? '추천 스택 번들' : 'Recommended Stacks'}
        </h2>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        overflowX: 'auto', 
        paddingBottom: '1rem',
        scrollbarWidth: 'none' // Firefox
      }}>
        {presets.map((preset) => {
          // 프리셋의 모든 브릭이 선택되어 있는지 확인
          const isActive = preset.brickIds.every(id => selectedBrickIds.includes(id));
          
          return (
            <motion.button
              key={preset.id}
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => applyPreset(preset.brickIds)}
              style={{
                flex: '0 0 auto',
                padding: '1rem 1.5rem',
                borderRadius: '20px',
                border: isActive ? `1.5px solid ${preset.color}` : '1px solid var(--border)',
                backgroundColor: isActive ? `${preset.color}11` : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.4rem',
                textAlign: 'left',
                minWidth: '240px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? `0 8px 24px ${preset.color}11` : 'none'
              }}
            >
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: '800', 
                color: isActive ? preset.color : '#fff',
                letterSpacing: '-0.01em'
              }}>
                {preset.name[locale]}
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--foreground-tertiary)', 
                lineHeight: '1.4',
                fontWeight: '500'
              }}>
                {preset.description[locale]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
