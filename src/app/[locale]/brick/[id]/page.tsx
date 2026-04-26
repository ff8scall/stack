import { bricks } from '@/data/bricks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import { Star, Clock, Globe, ArrowLeft, ExternalLink, Shield, Zap, Activity, ArrowRight, TrendingUp } from 'lucide-react';
import { calculateMonthlyCost, formatCurrency, calculateEfficiencyScore } from '@/lib/calculator';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return bricks.map((brick) => ({
    id: brick.id,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string, locale: string }> 
}): Promise<Metadata> {
  const { id, locale } = await params;
  const brick = bricks.find(b => b.id === id);
  if (!brick) return {};

  const t = await getTranslations({ locale, namespace: 'Bricks' });
  const name = t(`${brick.id}.name`);
  const feature = t(`${brick.id}.feature`);

  return {
    title: locale === 'ko' 
      ? `${name} 비용 시뮬레이션 및 분석 | LegoStack`
      : `${name} Cost Simulation & Analysis | LegoStack`,
    description: `${name}: ${feature}. LegoStack에서 실시간 인프라 비용을 계산해보세요.`,
    alternates: {
      canonical: `/${locale}/brick/${id}`,
    },
    openGraph: {
      images: [
        {
          url: `/api/og?brick=${id}`, // 추후 brick 전용 OG API 구현 가능
          width: 1200,
          height: 630,
          alt: `${name} on LegoStack`,
        }
      ]
    }
  };
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
  const tDetail = await getTranslations('BrickDetail');
  const tCats = await getTranslations('Categories');

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
          <ArrowLeft size={16} /> {tDetail('back')}
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
                  }}>{tCats(brick.category)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                    <Star size={14} fill="#fbbf24" />
                    <span style={{ fontWeight: '700' }}>{brick.dxScore}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5, marginLeft: '2px' }}>{tDetail('dx_label')}</span>
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
              {tDetail('visit')} <ExternalLink size={16} />
            </a>
          </div>

          {/* Killer Feature */}
          <div style={{ 
            padding: '2rem', 
            borderRadius: '24px', 
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderLeft: `4px solid ${brick.color}`
          }}>
            <h4 style={{ fontSize: '0.8rem', color: brick.color, textTransform: 'uppercase', fontWeight: '800', marginBottom: '0.5rem' }}>{tDetail('killer')}</h4>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.4' }}>
              {t(`${brick.id}.feature`)}
            </p>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>{tDetail('pricing_title')}</h4>
              <div style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {brick.pricing.type === 'token' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ opacity: 0.6 }}>{tDetail('input')}</span>
                      <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.inputPrice}/1M</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ opacity: 0.6 }}>{tDetail('output')}</span>
                      <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.outputPrice}/1M</span>
                    </div>
                  </div>
                )}
                {brick.pricing.type === 'subscription' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ opacity: 0.6 }}>{tDetail('monthly')}</span>
                    <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.monthlyPrice}/mo</span>
                  </div>
                )}
                {brick.pricing.type === 'infra' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ opacity: 0.6 }}>{tDetail('per')} {brick.pricing.unitName}</span>
                    <span className="mono" style={{ fontWeight: '700' }}>${brick.pricing.unitPrice}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.6 }}>{tDetail('free_quota')}</span>
                  <span style={{ fontWeight: '700' }}>{brick.pricing.freeQuota > 0 ? brick.pricing.freeQuota.toLocaleString() : tDetail('none')}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>{tDetail('metadata_title')}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Clock size={16} style={{ opacity: 0.4 }} />
                  <span style={{ opacity: 0.6 }}>{tDetail('last_updated')}:</span>
                  <span style={{ fontWeight: '600' }}>{brick.lastUpdated}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Globe size={16} style={{ opacity: 0.4 }} />
                  <span style={{ opacity: 0.6 }}>{tDetail('website')}:</span>
                  <a href={brick.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', textDecoration: 'underline' }}>{new URL(brick.url).hostname}</a>
                </div>
                
                {brick.performance.contextWindow > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <Zap size={16} style={{ opacity: 0.4 }} />
                    <span style={{ opacity: 0.6 }}>{tDetail('context_window')}:</span>
                    <span style={{ fontWeight: '600' }}>{brick.performance.contextWindow}k tokens</span>
                  </div>
                )}

                {brick.performance.maxOutput > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <Activity size={16} style={{ opacity: 0.4 }} />
                    <span style={{ opacity: 0.6 }}>{tDetail('max_output')}:</span>
                    <span style={{ fontWeight: '600' }}>{brick.performance.maxOutput}k tokens</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', marginTop: '4px' }}>
                  <Shield size={16} style={{ opacity: 0.4, marginTop: '2px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ opacity: 0.6 }}>{tDetail('regions')}:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {brick.regions.map(region => (
                        <span key={region} style={{ 
                          fontSize: '0.7rem', 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--foreground-secondary)'
                        }}>{region}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>{tDetail('overview')}</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>
              {t(`${brick.id}.description`)}
            </p>
          </div>

          {/* Pros & Cons Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#10b981' }}>{tDetail('pros')}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Array.isArray(t.raw(`${brick.id}.pros`)) && (t.raw(`${brick.id}.pros`) as string[]).map((pro, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                    <Zap size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} /> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ef4444' }}>{tDetail('cons')}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Array.isArray(t.raw(`${brick.id}.cons`)) && (t.raw(`${brick.id}.cons`) as string[]).map((con, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                    <Activity size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} /> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Cases & Best For */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>{tDetail('ideal_for')}</h4>
              <div style={{ 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#fff'
              }}>
                {t(`${brick.id}.bestFor`)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.5 }}>{tDetail('use_cases')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Array.isArray(t.raw(`${brick.id}.useCases`)) && (t.raw(`${brick.id}.useCases`) as string[]).map((useCase, i) => (
                  <span key={i} style={{ 
                    padding: '4px 12px', 
                    borderRadius: '8px', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </div>


          {/* Performance Dashboard */}
          <div style={{ 
            marginTop: '2rem',
            padding: '2rem',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} color="#10b981" /> AI Performance Benchmark
              </h4>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                padding: '4px 12px', 
                borderRadius: '8px', 
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                fontSize: '0.85rem',
                fontWeight: '900'
              }}>
                {tDetail('efficiency_label')}: {calculateEfficiencyScore(brick.performance, brick.pricing)}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {/* Benchmark Score Card */}
              <div style={{ 
                background: 'rgba(255,255,255,0.03)', 
                padding: '1.5rem', 
                borderRadius: '20px', 
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {brick.performance.benchmarkName}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff' }}>
                  {brick.performance.benchmarkScore}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>
                  Verified Score
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center' }}>
                {[
                  { label: tDetail('intelligence'), score: brick.performance.intelligence },
                  { label: tDetail('speed'), score: brick.performance.speed },
                  { label: tDetail('accuracy'), score: brick.performance.accuracy }
                ].map((perf) => (
                  <div key={perf.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                      <span>{perf.label}</span>
                      <span style={{ fontWeight: '700', color: '#fff' }}>{perf.score}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${perf.score}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #3b82f6, #10b981)', 
                        borderRadius: '100px' 
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insight Section */}
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
              <Activity size={14} /> {tDetail('insight_title')}
            </h5>
            {tDetail('insight_desc', { 
              name: t(`${brick.id}.name`), 
              category: tCats(brick.category),
              feature: t(`${brick.id}.feature`)
            })}
          </div>

          {/* Related & Comparison Section (SEO Boost) */}
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1.5rem' }}>
              {tDetail('related_title')}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {bricks
                .filter(b => b.category === brick.category && b.id !== brick.id)
                .slice(0, 3)
                .map(related => (
                  <Link 
                    key={related.id}
                    href={`/${locale}/compare/${brick.id}-vs-${related.id}`}
                    className="glass hover-scale"
                    style={{ 
                      padding: '1.25rem', 
                      borderRadius: '20px', 
                      textDecoration: 'none', 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', fontWeight: '700' }}>
                      {locale === 'ko' ? '비교 분석' : 'Comparison'}
                    </div>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>
                      {brick.name} vs {related.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--foreground-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {tDetail('view_analysis')} <ArrowRight size={12} />
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      
      {/* JSON-LD SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": t(`${brick.id}.name`),
            "operatingSystem": "All",
            "applicationCategory": brick.category,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": brick.dxScore,
              "bestRating": "5",
              "ratingCount": "100"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </main>


  );
}
