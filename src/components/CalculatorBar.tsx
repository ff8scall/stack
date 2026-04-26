'use client';

import { useStackStore } from '@/store/useStackStore';
import { bricks } from '@/data/bricks';
import { calculateMonthlyCost, calculateTotalCost, formatCurrency, getCurrencyByLocale } from '@/lib/calculator';
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Box, Share2, Copy, Check, Image } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import LZString from 'lz-string';

import { toPng } from 'html-to-image';
import ShareModal from './ShareModal';

export default function CalculatorBar() {
  const { selectedBrickIds, mau, setMau, avgUsagePerUser, setAvgUsage, currency, setCurrency } = useStackStore();
  const [total, setTotal] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const t = useTranslations('Index');
  const tContext = useTranslations('Context');
  const tShare = useTranslations('Share');
  const locale = useLocale();

  const selectedBricks = bricks.filter(b => selectedBrickIds.includes(b.id));

  useEffect(() => {
    const cost = calculateTotalCost(selectedBricks, { mau, avgUsagePerUser });
    setTotal(cost);
  }, [selectedBrickIds, mau, avgUsagePerUser]);

  // 로케일 기반 초기 통화 설정
  useEffect(() => {
    const expectedCurrency = getCurrencyByLocale(locale);
    if (currency !== expectedCurrency) {
      setCurrency(expectedCurrency);
    }
  }, [locale]);

  const getMauContext = (val: number) => {
    if (val <= 1000) return tContext('mau_low');
    if (val <= 20000) return tContext('mau_mid');
    if (val <= 100000) return tContext('mau_high');
    return tContext('mau_vhigh');
  };

  const getUsageContext = (val: number) => {
    if (val <= 20) return tContext('usage_low');
    if (val <= 100) return tContext('usage_mid');
    return tContext('usage_high');
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert(tShare('share_alert'));
    } catch (e) {
      console.error('Share error:', e);
      alert(tShare('share_error'));
    } finally {
      setIsSharing(false);
    }
  };

  const handleCapture = async () => {
    const target = document.getElementById('capture-target');
    if (!target) return;
    
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(target, { 
        cacheBust: true,
        backgroundColor: '#0a0a0a',
        style: { transform: 'scale(1)', opacity: '1', display: 'flex' }
      });
      const link = document.createElement('a');
      link.download = `LegoStack-FinOps-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Capture error:', e);
    } finally {
      setIsCapturing(false);
    }
  };

  if (selectedBrickIds.length === 0) return null;

  return (
    <>
      {/* Hidden Capture Template */}
      <div id="capture-target" style={{
        position: 'absolute',
        left: '-9999px',
        width: '600px',
        padding: '40px',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        borderRadius: '0',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>LEGO<span style={{ opacity: 0.4 }}>stack</span></div>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '-16px' }}>AI FinOps Simulation Report</div>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>Est. Monthly Total</div>
          <div style={{ fontSize: '48px', fontWeight: '800', color: '#fff' }}>{formatCurrency(total, currency)}<span style={{ fontSize: '20px', opacity: 0.5 }}>/mo</span></div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#fbbf24' }}>MAU: {mau.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#60a5fa' }}>Usage/User: {avgUsagePerUser} units</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedBricks.slice(0, 5).map(brick => (
            <div key={brick.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: brick.color }} />
                <span style={{ color: '#fff', fontWeight: '600' }}>{brick.name}</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{formatCurrency(calculateMonthlyCost(brick.pricing, { mau, avgUsagePerUser }, brick.baseUsage), currency)}</span>
            </div>
          ))}
          {selectedBricks.length > 5 && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>+ {selectedBricks.length - 5} more bricks...</div>}
        </div>

        <div style={{ marginTop: '20px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          Generated at stack.lego-sia.com - Build your AI Stack with Calculated Truth
        </div>
      </div>

      <div className={`glass ${isExpanded ? 'expanded' : ''}`} style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1.5rem 2.25rem',
        borderRadius: '28px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        width: 'calc(100% - 3rem)',
        maxWidth: '1000px',
        animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'max-height, transform',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}>
        <style jsx>{`
          @keyframes slideUp {
            from { transform: translate(-50%, 140px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
          .glass {
            max-height: 145px;
            overflow: hidden;
            background: rgba(10, 10, 10, 0.88);
            backdrop-filter: blur(40px) saturate(200%);
          }
          .glass.expanded {
            max-height: 680px;
          }
          .context-badge {
            font-size: 0.6rem;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: 5px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }
          @media (max-width: 850px) {
            .glass {
              padding: 1.25rem 1.5rem !important;
              max-height: 110px;
            }
            .glass.expanded {
              max-height: 85vh;
              overflow-y: auto;
            }
            .main-grid {
              display: flex !important;
              flex-direction: column;
              gap: 1.5rem !important;
            }
            .total-section {
              border-left: none !important;
              padding-left: 0 !important;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              padding-top: 1.25rem;
              text-align: left !important;
              justify-content: space-between !important;
              display: flex !important;
              align-items: center !important;
            }
          }
          .mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
          .currency-toggle {
            display: flex;
            background: rgba(255,255,255,0.05);
            padding: 2px;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .currency-toggle button {
            padding: 4px 8px;
            font-size: 0.65rem;
            font-weight: 800;
            color: rgba(255,255,255,0.3);
            background: transparent;
            border: none;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
          }
          .currency-toggle button.active {
            background: rgba(255,255,255,0.1);
            color: #fff;
          }
        `}</style>
        
        {/* Main Content Grid */}
        <div className="main-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(250px, 1.2fr) minmax(200px, 1fr) minmax(180px, 0.8fr)', 
          gap: '2.5rem', 
          alignItems: 'center' 
        }}>
          
          {/* MAU Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{t('user_scale')}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="mono" style={{ fontSize: '1.25rem', fontWeight: '700' }}>{mau.toLocaleString()}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>MAU</span>
                </div>
              </div>
              <div className="currency-toggle">
                <button className={currency === 'USD' ? 'active' : ''} onClick={() => setCurrency('USD')}>USD</button>
                <button className={currency === 'KRW' ? 'active' : ''} onClick={() => setCurrency('KRW')}>KRW</button>
              </div>
            </div>
            <input type="range" min="0" max="1000000" step="1000" value={mau} onChange={(e) => setMau(Number(e.target.value))} />
            <div style={{ fontSize: '0.65rem', color: '#fbbf24', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="context-badge" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>Context</span>
              {getMauContext(mau)}
            </div>
          </div>

          {/* Usage Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{t('daily_intensity')}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="mono" style={{ fontSize: '1.25rem', fontWeight: '700' }}>{avgUsagePerUser}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>req/user</span>
              </div>
            </div>
            <input type="range" min="1" max="500" step="1" value={avgUsagePerUser} onChange={(e) => setAvgUsage(Number(e.target.value))} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#60a5fa', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="context-badge" style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa' }}>Scope</span>
                {getUsageContext(avgUsagePerUser)}
              </div>

              {/* NEW: Stack Dock (Selected Bricks Visualization) */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                overflowX: 'auto',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }} className="stack-dock">
                {selectedBricks.map(brick => (
                  <div 
                    key={brick.id} 
                    title={brick.name}
                    style={{ 
                      width: '18px', 
                      height: '18px', 
                      borderRadius: '4px', 
                      backgroundColor: brick.color, 
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      color: brick.color === '#ffffff' ? '#000' : '#fff',
                      fontWeight: '900',
                      boxShadow: `0 0 6px ${brick.color}33`,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {brick.name[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Total Cost Section */}
          <div className="total-section" style={{ 
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingLeft: '2rem', 
            textAlign: 'right', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ 
              fontSize: '0.7rem', 
              color: 'rgba(255, 255, 255, 0.4)', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              marginBottom: '0.25rem'
            }}>
              {t('bill')}
            </div>
            <div className="mono" style={{ 
              fontSize: '1.8rem', 
              fontWeight: '800', 
              letterSpacing: '-0.04em', 
              display: 'flex', 
              alignItems: 'baseline', 
              justifyContent: 'flex-end', 
              gap: '2px',
              color: '#fff'
            }}>
              {formatCurrency(total, currency)}
              <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.3)', fontWeight: '400' }}>/mo</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                onClick={handleShare}
                disabled={isSharing}
                style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px 8px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '600' }}
              >
                <Share2 size={12} /> {t('share')}
              </button>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 8px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '600' }}
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                {isExpanded ? t('hide') : t('breakdown')}
              </button>
            </div>
          </div>
        </div>

      {/* Expanded Breakdown Section */}
      {isExpanded && (
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Box size={16} /> {t('stack_breakdown')}
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="share-btn" 
                onClick={handleCapture} 
                disabled={isCapturing}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Image size={16} />
                {isCapturing ? t('capturing') : t('download_report')}
              </button>
              <button className="share-btn" onClick={handleShare} disabled={isSharing}>
                <Share2 size={16} />
                {tShare('button')}
              </button>
            </div>
          </div>
          <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {selectedBricks.map(brick => {
              const brickCost = calculateMonthlyCost(brick.pricing, { mau, avgUsagePerUser }, brick.baseUsage);
              return (
                <div key={brick.id} className="breakdown-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: brick.color }} />
                    <span style={{ fontWeight: '500' }}>{brick.name}</span>
                  </div>
                  <span style={{ fontWeight: '700', color: brickCost > 0 ? '#fff' : 'rgba(255, 255, 255, 0.3)' }}>
                    {formatCurrency(brickCost, currency)}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.5' }}>
            {t('tip_prefix')} {getUsageContext(avgUsagePerUser)} {t('tip_message')}
          </div>
        </div>
      )}
    </div>
    <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} shareUrl={shareUrl} />
    </>
  );
}
