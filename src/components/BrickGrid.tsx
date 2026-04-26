'use client';

import { useStackStore } from '@/store/useStackStore';
import { bricks } from '@/data/bricks';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Check, MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code, AlertCircle, Clock, Globe, Shield, Activity, BarChart, Info, TrendingUp } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateEfficiencyScore, formatCurrency, getCurrencyByLocale } from '@/lib/calculator';
import Link from 'next/link';

const IconMap: Record<string, any> = {
  MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code, Globe, Shield, Activity, BarChart
};

export default function BrickGrid() {
  const { selectedBrickIds, toggleBrick, activeCategory, searchQuery, currency } = useStackStore();
  const tBricks = useTranslations('Bricks');
  const tCats = useTranslations('Categories');
  const tIndex = useTranslations('Index');
  const locale = useLocale();

  const filteredBricks = bricks.filter(brick => {
    // 1. 카테고리 필터링
    const categoryMatch = activeCategory === 'All' || brick.category === activeCategory;
    
    // 2. 검색어 필터링
    const q = searchQuery.toLowerCase().trim();
    if (!q) return categoryMatch;

    const name = tBricks(`${brick.id}.name`).toLowerCase();
    const feature = tBricks(`${brick.id}.feature`).toLowerCase();
    const searchMatch = name.includes(q) || feature.includes(q) || brick.id.toLowerCase().includes(q);

    return categoryMatch && searchMatch;
  });

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))', 
      gap: '1.5rem',
      width: '100%',
      maxWidth: '1200px',
      marginTop: '1rem'
    }}>
      <AnimatePresence mode="popLayout">
        {filteredBricks.map((brick) => {
          const isSelected = selectedBrickIds.includes(brick.id);
          const Icon = IconMap[brick.iconName] || Box;
          const logoUrl = brick.logoSlug 
            ? `https://cdn.simpleicons.org/${brick.logoSlug}/${brick.color.replace('#', '')}`
            : null;
          
          return (
            <motion.div 
              layout
              key={brick.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                ease: [0.23, 1, 0.32, 1],
                layout: { duration: 0.3 }
              }}
              exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                onClick={() => toggleBrick(brick.id)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #fff' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                  boxShadow: isSelected ? '0 0 30px rgba(255,255,255,0.05)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
              {/* Card Header: Icon + Name + Star */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    backgroundColor: brick.color === '#ffffff' ? '#000' : 'rgba(255,255,255,0.03)',
                    border: brick.color === '#ffffff' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${brick.color}11`
                  }}>
                    {logoUrl ? (
                        <img 
                          src={logoUrl} 
                          alt={`${brick.name} AI model logo`} 
                          loading="lazy"
                          style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                        onError={(e) => {
                          // 로고 로드 실패 시 아이콘으로 대체
                          (e.target as any).style.display = 'none';
                          const fallback = (e.target as any).parentElement.querySelector('.fallback-icon');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="fallback-icon" style={{ display: logoUrl ? 'none' : 'flex' }}>
                      <Icon size={20} color={brick.color} />
                    </div>
                  </div>
                  <div>
                    <Link 
                      href={`/${locale}/brick/${brick.id}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', textDecoration: 'none' }}
                    >
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                        {tBricks(`${brick.id}.name`)}
                      </h3>
                      <Info size={14} style={{ opacity: 0.3 }} />
                    </Link>
                    <div style={{ fontSize: '0.65rem', color: 'var(--foreground-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>
                      {tCats(brick.category)}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {/* Efficiency Score Badge */}
                  {(() => {
                    const effScore = calculateEfficiencyScore(brick.performance, brick.pricing);
                    const isBestValue = effScore >= 90;
                    return (
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {isBestValue && (
                          <div style={{ 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', 
                            color: '#000', 
                            fontSize: '0.6rem', 
                            fontWeight: '900',
                            letterSpacing: '0.02em',
                            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
                          }}>
                            BEST VALUE
                          </div>
                        )}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.2rem', 
                          padding: '2px 8px', 
                          borderRadius: '6px', 
                          background: isBestValue ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isBestValue ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255,255,255,0.1)'}`,
                          fontSize: '0.7rem',
                          fontWeight: '800',
                          color: isBestValue ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                          letterSpacing: '0.01em'
                        }}>
                          <TrendingUp size={10} />
                          {effScore}
                        </div>
                      </div>
                    );
                  })()}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24' }}>
                    <Star size={12} fill="#fbbf24" />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>{brick.dxScore}</span>
                  </div>
                </div>
              </div>
              
              {/* Killer Feature */}
              <div style={{ 
                fontSize: '0.85rem', 
                color: 'var(--foreground-secondary)', 
                lineHeight: '1.5',
                minHeight: '2.8rem',
                borderLeft: '2px solid rgba(255,255,255,0.1)',
                paddingLeft: '0.75rem'
              }}>
                <span style={{ color: '#fff', fontWeight: '600', marginRight: '4px' }}>{tIndex('killer_label')}</span>
                {tBricks(`${brick.id}.feature`)}
              </div>


              {/* Meta Info */}
              <div style={{ 
                fontSize: '0.65rem', 
                color: 'var(--foreground-tertiary)', 
                marginTop: '-0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Clock size={10} />
                <span>{tIndex('last_updated_label')}: {brick.lastUpdated}</span>
              </div>

              {/* Bottom Info: Price + Action Group */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="mono" style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '700', 
                  color: '#fff',
                  opacity: 0.9
                }}>
                  {brick.pricing.type === 'token' ? `${formatCurrency(brick.pricing.inputPrice || 0, currency)}/1M` : 
                   brick.pricing.type === 'subscription' ? `${formatCurrency(brick.pricing.monthlyPrice || 0, currency)}/mo` : 
                   brick.pricing.type === 'infra' ? `${formatCurrency(brick.pricing.unitPrice || 0, currency)}/${brick.pricing.unitName}` : 
                   brick.pricing.type === 'request' ? `${formatCurrency(brick.pricing.unitPrice || 0, currency)}/req` : 'Free Tier'}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Link 
                    href={`/${locale}/brick/${brick.id}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      fontSize: '0.7rem', 
                      color: 'rgba(255,255,255,0.6)', 
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    {tIndex('view_details')}
                  </Link>
                  
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBrick(brick.id);
                    }}
                    style={{ 
                      padding: '0.4rem 0.9rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#fff' : 'rgba(255,255,255,0.1)',
                      color: isSelected ? '#000' : '#fff',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease',
                      border: isSelected ? '1px solid #fff' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {isSelected ? <Check size={12} /> : <Plus size={12} />}
                    {isSelected ? tIndex('selected') : tIndex('add_to_stack')}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
