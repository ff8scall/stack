import { bricks } from '@/data/bricks';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import { Star, Clock, Globe, ArrowLeft, ExternalLink, Shield, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return bricks.map((brick) => ({
    id: brick.id,
  }));
}

export default async function BrickDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string, locale: string }> 
}) {
  const { id, locale } = await params;
  const brick = bricks.find(b => b.id === id);
  if (!brick) notFound();

  const t = await getTranslations('Bricks');
  const tIndex = await getTranslations('Index');

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '0 2rem 8rem 2rem'
    }}>
      <Navbar />
      
      <div style={{ width: '100%', maxWidth: '800px', marginTop: '4rem' }}>
        <Link href={`/${locale}`} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--foreground-secondary)', 
          fontSize: '0.9rem',
          marginBottom: '2rem',
          transition: 'color 0.2s'
        }} className="hover-white">
          <ArrowLeft size={16} /> Back to Stack
        </Link>

        <div className="glass" style={{
          padding: '3rem',
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                backgroundColor: brick.color === '#ffffff' ? '#000' : 'rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Zap size={32} color={brick.color} />
              </div>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.04em' }}>{t(`${brick.id}.name`)}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    padding: '4px 10px', 
                    borderRadius: '8px', 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'var(--foreground-secondary)',
                    textTransform: 'uppercase'
                  }}>{brick.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                    <Star size={14} fill="#fbbf24" />
                    <span style={{ fontWeight: '700' }}>{brick.dxScore}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5, marginLeft: '2px' }}>DX Score</span>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href={`/api/redirect?id=${brick.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '14px',
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: '700',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
              className="hover-scale"
            >
              Visit Site <ExternalLink size={16} />
            </a>
          </div>

          {/* Killer Feature */}
          <div style={{ 
            padding: '2rem', 
            borderRadius: '24px', 
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderLeft: `4px solid ${brick.color}`
          }}>
            <h4 style={{ fontSize: '0.8rem', color: brick.color, textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.5rem' }}>Killer Feature</h4>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.4' }}>
              {t(`${brick.id}.feature`)}
            </p>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>Pricing Structure</h4>
              <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {brick.pricing.type === 'token' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ opacity: 0.6 }}>Input</span>
                      <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.inputPrice}/1M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ opacity: 0.6 }}>Output</span>
                      <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.outputPrice}/1M</span>
                    </div>
                  </div>
                )}
                {brick.pricing.type === 'subscription' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ opacity: 0.6 }}>Monthly</span>
                    <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.monthlyPrice}/mo</span>
                  </div>
                )}
                {brick.pricing.type === 'infra' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ opacity: 0.6 }}>Per {brick.pricing.unitName}</span>
                    <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.unitPrice}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.6 }}>Free Quota</span>
                  <span style={{ fontWeight: '700' }}>{brick.pricing.freeQuota > 0 ? brick.pricing.freeQuota.toLocaleString() : 'None'}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>Metadata</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Clock size={16} style={{ opacity: 0.4 }} />
                  <span style={{ opacity: 0.6 }}>Last Updated:</span>
                  <span style={{ fontWeight: '600' }}>{brick.lastUpdated}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Globe size={16} style={{ opacity: 0.4 }} />
                  <span style={{ opacity: 0.6 }}>Official Website:</span>
                  <a href={brick.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', textDecoration: 'underline' }}>{new URL(brick.url).hostname}</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Shield size={16} style={{ opacity: 0.4 }} />
                  <span style={{ opacity: 0.6 }}>Reliability:</span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>Verified by LegoStack</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: '1rem', 
            fontSize: '0.85rem', 
            color: 'var(--foreground-tertiary)', 
            lineHeight: '1.6',
            padding: '1.5rem',
            borderRadius: '20px',
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)'
          }}>
            <h5 style={{ color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={14} /> AI FinOps Insight
            </h5>
            {t(`${brick.id}.name`)} 은(는) 현재 시장에서 {brick.category} 분야의 독보적인 위치를 차지하고 있습니다. 
            특히 {t(`${brick.id}.feature`)} 기능은 개발 생산성을 획기적으로 높여줍니다. 
            LegoStack 계산기를 통해 귀하의 서비스 규모에 맞는 예상 비용을 정밀하게 산출해보세요.
          </div>
        </div>
      </div>
    </main>
  );
}
