import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { bricks } from '@/data/bricks';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, Box, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  const categories = Array.from(new Set(bricks.map(b => b.category)));
  
  const params = [];
  for (const locale of locales) {
    for (const slug of categories) {
      params.push({ locale, slug: slug.toLowerCase() });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Categories' });
  const categoryName = t(slug.charAt(0).toUpperCase() + slug.slice(1));

  return {
    title: locale === 'ko' 
      ? `최고의 ${categoryName} AI 도구 추천 및 비용 비교 | LegoStack`
      : `Best ${categoryName} AI Tools & Cost Comparison | LegoStack`,
    description: locale === 'ko'
      ? `${categoryName} 분야의 주요 AI 도구들의 성능과 API 비용을 한눈에 비교하세요.`
      : `Compare performance and API costs of top ${categoryName} AI tools in 2026.`,
    alternates: {
      canonical: `/${locale}/category/${slug}`,
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Categories' });
  const tIndex = await getTranslations({ locale, namespace: 'Index' });
  const tBricks = await getTranslations({ locale, namespace: 'Bricks' });
  
  const categoryId = slug.charAt(0).toUpperCase() + slug.slice(1);
  const filteredBricks = bricks.filter(b => b.category === categoryId);

  if (filteredBricks.length === 0) notFound();

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <Link 
          href={`/${locale}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} /> {tIndex('title')}
        </Link>

        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.04em', marginBottom: '1rem' }}>
            {locale === 'ko' ? (
              <>최고의 <span style={{ color: 'rgba(255,255,255,0.3)' }}>{t(categoryId)}</span> 도구</>
            ) : (
              <>Best <span style={{ color: 'rgba(255,255,255,0.3)' }}>{t(categoryId)}</span> Bricks</>
            )}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: '1.6' }}>
            {locale === 'ko' 
              ? `2026년 현재 가장 뛰어난 ${t(categoryId)} 관련 AI 인프라 도구들을 모았습니다.`
              : `A curated collection of the finest AI infrastructure tools for ${t(categoryId)} in 2026.`}
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {filteredBricks.map((brick) => (
            <Link 
              key={brick.id}
              href={`/${locale}/brick/${brick.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="glass hover-scale" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box size={20} color={brick.color} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24' }}>
                    <Star size={14} fill="#fbbf24" />
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{brick.dxScore}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>{tBricks(`${brick.id}.name`)}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                  {tBricks(`${brick.id}.feature`)}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="mono" style={{ fontSize: '1rem', color: '#fff' }}>
                    {brick.pricing.type === 'token' 
                      ? `$${brick.pricing.inputPrice}/1M` 
                      : brick.pricing.type === 'request'
                        ? `$${brick.pricing.unitPrice}/req`
                        : `$${brick.pricing.monthlyPrice}/mo`}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {locale === 'ko' ? '자세히 보기' : 'VIEW'} <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
