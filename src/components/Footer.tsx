'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Code, Mail, Info, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer style={{
      padding: '6rem 2rem 4rem',
      marginTop: '4rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '4rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: '900', 
            letterSpacing: '-0.07em',
            color: '#fff'
          }}>
            LEGO<span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>stack</span>
          </div>
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'rgba(255,255,255,0.4)', 
            lineHeight: '1.6',
            maxWidth: '300px'
          }}>
            {t('description')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Platform</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href={`/${locale}/blog`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              <Zap size={16} /> {t('links.blog') || 'Blog'}
            </Link>
            <a href="https://github.com/ff8scall/stack" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              <Code size={16} /> {t('links.github')}
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              <Info size={16} /> {t('links.about')}
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Legal & Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              <Shield size={16} /> {t('links.privacy')}
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              <Mail size={16} /> {t('links.contact')}
            </a>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '4rem auto 0',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.3)'
      }}>
        {t('rights')}
      </div>
    </footer>
  );
}
