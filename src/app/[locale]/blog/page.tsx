import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { blogPosts } from '@/data/posts';
import { ArrowLeft, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return {
    title: `${t('title')} | LegoStack`,
    description: t('subtitle'),
  };
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const tIndex = await getTranslations({ locale, namespace: 'Index' });

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '1.5rem', background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
          {t('subtitle')}
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {blogPosts.map((post) => (
          <article key={post.id} style={{ position: 'relative' }}>
            <Link 
              href={`/${locale}/blog/${post.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: '700' }}>{post.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={14} /> {post.readTime} {t('minutes_read')}
                  </div>
                </div>
                
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', marginBottom: '1rem', lineHeight: '1.3' }}>
                  {post.title[locale]}
                </h2>
                
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '2rem' }}>
                  {post.excerpt[locale]}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>
                  {t('read_more')} <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      <div style={{ marginTop: '6rem', textAlign: 'center' }}>
        <Link href={`/${locale}`} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> {tIndex('title')}
        </Link>
      </div>
    </main>
  );
}
