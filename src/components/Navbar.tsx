'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useStackStore } from '@/store/useStackStore';
import FilterBar from './FilterBar';

export default function Navbar() {
  const t = useTranslations('Index');
  const locale = useLocale();

  const activeStyle = { fontSize: '0.8rem', fontWeight: '800' as const, color: '#fff', textDecoration: 'none' };
  const inactiveStyle = { fontSize: '0.8rem', fontWeight: '800' as const, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' };

  return (
    <>
      <style>{`
        .navbar-filter-desktop { display: flex; align-items: center; gap: 2rem; flex: 1; min-width: 0; }
        .navbar-filter-mobile { display: none; }
        @media (max-width: 850px) {
          .navbar-filter-desktop { display: none !important; }
          .navbar-filter-mobile { 
            display: block; 
            width: 100%; 
            max-width: 1200px; 
            margin: -1.5rem auto 1.5rem;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .navbar-filter-mobile::-webkit-scrollbar { display: none; }
        }
      `}</style>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, minWidth: 0 }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: '900', 
            letterSpacing: '-0.07em',
            color: '#fff',
            whiteSpace: 'nowrap',
            marginRight: '0.5rem',
          }}>
            LEGO<span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>stack</span>
          </div>
          <div className="navbar-filter-desktop">
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
            <div style={{ flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
              <FilterBar isNavbar />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', flexShrink: 0 }}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            padding: '0.5rem 1rem', 
            borderRadius: '12px', 
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <a href="/ko" style={locale === 'ko' ? activeStyle : inactiveStyle}>KO</a>
            <a href="/en" style={locale === 'en' ? activeStyle : inactiveStyle}>EN</a>
          </div>
        </div>
      </nav>
      {/* 모바일용 카테고리 필터 (Navbar 외부) */}
      <div className="navbar-filter-mobile">
        <FilterBar />
      </div>
    </>
  );
}
