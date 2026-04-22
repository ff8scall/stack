'use client';

import { useStackStore } from '@/store/useStackStore';
import { bricks } from '@/data/bricks';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Check, MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code, AlertCircle, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

const IconMap: Record<string, any> = {
  MessageSquare, Zap, Mic, Image, Layout, Box, Database, Search, Workflow, Cpu, Code
};

export default function BrickGrid() {
  const { selectedBrickIds, toggleBrick, activeCategory } = useStackStore();
  const tBricks = useTranslations('Bricks');
  const tCats = useTranslations('Categories');

  const filteredBricks = activeCategory === 'All' 
    ? bricks 
    : bricks.filter(b => b.category === activeCategory);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.3)' }}
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
                        alt={brick.name} 
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
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                      {tBricks(`${brick.id}.name`)}
                    </h3>
                    <div style={{ fontSize: '0.65rem', color: 'var(--foreground-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>
                      {tCats(brick.category)}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24' }}>
                  <Star size={12} fill="#fbbf24" />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>{brick.dxScore}</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--foreground-secondary)', marginLeft: '4px' }}>DX</span>
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
                <span style={{ color: '#fff', fontWeight: '600', marginRight: '4px' }}>Killa:</span>
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
                <span>Last Updated: {brick.lastUpdated}</span>
              </div>

              {/* Bottom Info: Price + Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <div style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: '600', 
                  color: '#fff',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.05)'
                }}>
                  {brick.pricing.type === 'token' ? `$${brick.pricing.inputPrice}/1M` : 
                   brick.pricing.type === 'subscription' ? `$${brick.pricing.monthlyPrice}/mo` : 
                   brick.pricing.type === 'infra' ? `$${brick.pricing.unitPrice}/${brick.pricing.unitName}` : 'Free Tier'}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <a 
                    href={`/api/redirect?id=${brick.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: '0.75rem', color: 'var(--foreground-secondary)', textDecoration: 'underline' }}
                  >
                    Visit Site
                  </a>
                  <a 
                    href={`mailto:report@lego-sia.com?subject=Price Error: ${tBricks(`${brick.id}.name`)}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.7rem', 
                      color: 'rgba(255,255,255,0.2)', 
                      transition: 'color 0.2s' 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#f87171'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                    title="Report pricing error"
                  >
                    <AlertCircle size={12} />
                    Report
                  </a>
                </div>

                
                <div style={{ 
                  padding: '0.4rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: isSelected ? '#fff' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#000' : '#fff',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}>
                  {isSelected ? (
                    <>
                      <Check size={14} /> Selected
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Add to Stack
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
