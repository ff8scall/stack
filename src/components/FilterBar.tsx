"use client";

import { useStackStore } from '@/store/useStackStore';
import { useTranslations } from 'next-intl';

const categories = ['All', 'Language', 'Vision', 'Voice', 'Builder', 'Infra'];

export default function FilterBar({ isNavbar = false }: { isNavbar?: boolean }) {
  const { activeCategory, setActiveCategory } = useStackStore();
  const t = useTranslations('Categories');

  return (
    <div style={{
      display: 'inline-flex',
      gap: isNavbar ? '0.2rem' : '0.5rem',
      padding: isNavbar ? '0' : '0.5rem',
      borderRadius: '16px',
      marginBottom: isNavbar ? '0' : '2rem',
      border: isNavbar ? 'none' : '1px solid var(--border)',
      backgroundColor: isNavbar ? 'transparent' : 'transparent'
    }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '500',
            backgroundColor: activeCategory === category ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: activeCategory === category ? '#fff' : 'var(--foreground-secondary)',
            transition: 'all 0.2s ease'
          }}
        >
          {t(category)}
        </button>
      ))}
    </div>
  );
}
