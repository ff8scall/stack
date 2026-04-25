import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { bricks } from '@/data/bricks';
import { notFound } from 'next/navigation';
import { Star, ArrowLeft, Zap, Box, DollarSign, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { calculateEfficiencyScore } from '@/lib/calculator';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  const params = [];
  const categories = Array.from(new Set(bricks.map(b => b.category)));
  
  for (const locale of locales) {
    for (const cat of categories) {
      const catBricks = bricks.filter(b => b.category === cat).slice(0, 5); // 상위 5개로 제한
      if (catBricks.length < 2) continue;
      
      // 모든 가능한 쌍 생성 (Combination nCr)
      for (let i = 0; i < catBricks.length; i++) {
        for (let j = i + 1; j < catBricks.length; j++) {
          params.push({ 
            locale, 
            slug: `${catBricks[i].id}-vs-${catBricks[j].id}` 
          });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const ids = slug.split('-vs-');
  if (ids.length !== 2) return {};
  const b1 = bricks.find(b => b.id === ids[0]);
  const b2 = bricks.find(b => b.id === ids[1]);
  if (!b1 || !b2) return {};
  const t = await getTranslations({ locale, namespace: 'Compare' });
  return {
    title: t('title', { name1: b1.name, name2: b2.name }),
    description: t('description', { name1: b1.name, name2: b2.name }),
    alternates: {
      canonical: `/${locale}/compare/${slug}`,
    },
    openGraph: {
      images: [
        {
          url: `/api/og?brick=${b1.id}&vs=${b2.id}`, // API에서 vs 파라미터 처리 가능하도록 구성
          width: 1200,
          height: 630,
          alt: `${b1.name} vs ${b2.name}`,
        }
      ]
    }
  };
}

export default async function ComparePage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Compare' });
  const tBricks = await getTranslations({ locale, namespace: 'Bricks' });
  
  const ids = slug.split('-vs-');
  if (ids.length !== 2) notFound();
  const b1 = bricks.find(b => b.id === ids[0]);
  const b2 = bricks.find(b => b.id === ids[1]);
  if (!b1 || !b2) notFound();

  // Determine winner based on DX score
  const winnerId = b1.dxScore >= b2.dxScore ? b1.id : b2.id;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <Link 
          href={`/${locale}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '3rem', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} /> {t('back_to_list')}
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '4px 12px', 
            borderRadius: '100px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            AI Infrastructure Comparison
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            {b1.name} <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1.5rem', verticalAlign: 'middle', margin: '0 1rem' }}>{t('versus')}</span> {b2.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('description', { name1: b1.name, name2: b2.name })}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', position: 'relative' }}>
          {/* Decorative VS circle in the middle */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: '#111', 
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: '900',
            color: 'rgba(255,255,255,0.2)'
          }}>VS</div>

          {[b1, b2].map((brick) => (
            <div key={brick.id} className="glass" style={{ padding: '3rem 2.5rem', borderRadius: '32px', position: 'relative', border: winnerId === brick.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.05)', background: winnerId === brick.id ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
              {winnerId === brick.id && (
                <div style={{ position: 'absolute', top: '-14px', left: '32px', background: '#fff', color: '#000', padding: '4px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 20px rgba(255,255,255,0.2)' }}>
                  <ShieldCheck size={14} /> {t('winner_badge')}
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Box size={28} color={brick.color} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff' }}>{brick.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24' }}>
                    <Star size={14} fill="#fbbf24" />
                    <span style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>{brick.dxScore} <span style={{ opacity: 0.4, fontWeight: '400', fontSize: '0.8rem' }}>DX SCORE</span></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={14} /> {t('features')}
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>
                    {tBricks(`${brick.id}.feature`)}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DollarSign size={14} /> {t('pricing')}
                  </h4>
                  <div className="mono" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
                    {brick.pricing.type === 'token' ? (
                      <>${brick.pricing.inputPrice}<span style={{ fontSize: '0.9rem', opacity: 0.4 }}> /1M tokens</span></>
                    ) : brick.pricing.type === 'request' ? (
                      <>${brick.pricing.unitPrice}<span style={{ fontSize: '0.9rem', opacity: 0.4 }}> /request</span></>
                    ) : (
                      <>${brick.pricing.monthlyPrice}<span style={{ fontSize: '0.9rem', opacity: 0.4 }}> /mo</span></>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', borderRadius: '18px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ opacity: 0.4 }}>{locale === 'ko' ? '컨텍스트' : 'Context'}</span>
                    <span style={{ fontWeight: '700' }}>{brick.performance.contextWindow > 0 ? `${brick.performance.contextWindow}k` : 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ opacity: 0.4 }}>{locale === 'ko' ? '최대 출력' : 'Max Output'}</span>
                    <span style={{ fontWeight: '700' }}>{brick.performance.maxOutput > 0 ? `${brick.performance.maxOutput}k` : 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ opacity: 0.4 }}>{locale === 'ko' ? '지원 리전' : 'Regions'}</span>
                    <span style={{ fontWeight: '700', fontSize: '0.7rem' }}>{brick.regions[0]}{brick.regions.length > 1 ? ` +${brick.regions.length - 1}` : ''}</span>
                  </div>
                </div>

                <div style={{ paddingTop: '1rem' }}>
                  <Link 
                    href={`/${locale}?s=${brick.id}`} 
                    className={winnerId === brick.id ? "glass" : ""}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.6rem', 
                      padding: '1.25rem', 
                      background: winnerId === brick.id ? '#fff' : 'rgba(255,255,255,0.05)', 
                      color: winnerId === brick.id ? '#000' : '#fff', 
                      borderRadius: '18px', 
                      textDecoration: 'none', 
                      fontWeight: '800', 
                      fontSize: '1rem',
                      transition: 'all 0.2s ease',
                      border: winnerId === brick.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {t('simulate_this')} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Deep Analysis & Efficiency Section */}
        <div style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrendingUp size={28} color="#10b981" /> {t('dx_analysis')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {[b1, b2].map((brick) => {
              const effScore = calculateEfficiencyScore(brick.performance, brick.pricing);
              return (
                <div key={brick.id} className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', opacity: 0.4 }}>{brick.name}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>{brick.performance.benchmarkName}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', lineHeight: 1 }}>{brick.performance.benchmarkScore}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', opacity: 0.4, marginBottom: '0.4rem' }}>SCORE</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ opacity: 0.6 }}>{locale === 'ko' ? '가성비 지수' : 'Efficiency Index'}</span>
                      <span style={{ fontWeight: '800', color: effScore >= 90 ? '#fbbf24' : '#fff' }}>{effScore}</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${effScore}%`, 
                        height: '100%', 
                        background: effScore >= 90 ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'rgba(255,255,255,0.2)',
                        borderRadius: '100px'
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: '3rem', borderRadius: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
            {t('comparison_insight', { 
              name1: b1.name, 
              score1: b1.dxScore,
              name2: b2.name,
              score2: b2.dxScore,
              feature1: tBricks(`${b1.id}.feature`),
              feature2: tBricks(`${b2.id}.feature`)
            })}
          </div>
        </div>

        {/* More Comparisons Section (Internal Linking) */}
        <div style={{ marginTop: '6rem', paddingBottom: '4rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>
            {locale === 'ko' ? '다른 연관 비교' : 'More Comparisons'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {bricks
              .filter(b => b.category === b1.category && b.id !== b1.id && b.id !== b2.id)
              .slice(0, 4)
              .map(other => (
                <Link 
                  key={other.id}
                  href={`/${locale}/compare/${b1.id}-vs-${other.id}`}
                  className="glass hover-scale"
                  style={{ 
                    padding: '1.5rem', 
                    borderRadius: '20px', 
                    textDecoration: 'none', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: '700', color: '#fff' }}>{b1.name} vs {other.name}</span>
                  <ArrowRight size={16} color="rgba(255,255,255,0.3)" />
                </Link>
              ))
            }
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
