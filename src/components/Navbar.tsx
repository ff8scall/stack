'use client';

import { useTranslations } from 'next-intl';
import { useStackStore } from '@/store/useStackStore';
import FilterBar from './FilterBar';

export default function Navbar() {
  const t = useTranslations('Index');

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: '1.5rem',
      margin: '0 auto',
      width: '100%',
      maxWidth: '1200px',
      height: '70px',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 2000,
      marginBottom: '3rem',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: '900', 
          letterSpacing: '-0.07em',
          color: '#fff',
          whiteSpace: 'nowrap',
          marginRight: '0.5rem'
        }}>
          LEGO<span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>stack</span>
        </div>
        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <div style={{ flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
          <FilterBar isNavbar />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          padding: '0.5rem 1rem', 
          borderRadius: '12px', 
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <a href="/ko" style={{ fontSize: '0.8rem', fontWeight: '800', color: '#fff', textDecoration: 'none' }}>KO</a>
          <a href="/en" style={{ fontSize: '0.8rem', fontWeight: '800', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>EN</a>
        </div>
      </div>
    </nav>
  );
}
