import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  const params = [];
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title[locale]} | LegoStack Blog`,
    description: post.excerpt[locale],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) notFound();

  return (
    <main style={{ maxWidth: '750px', margin: '0 auto', padding: '6rem 1.5rem 10rem' }}>
      <Link 
        href={`/${locale}/blog`}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '4rem', fontSize: '0.9rem' }}
      >
        <ArrowLeft size={16} /> {t('back_to_blog')}
      </Link>

      <header style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} /> {post.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={14} /> {post.author}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} /> {post.readTime} {t('minutes_read')}
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
          {post.title[locale]}
        </h1>
        
        <p style={{ fontSize: '1.25rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)', fontWeight: '500', paddingLeft: '1.5rem', borderLeft: '4px solid rgba(255,255,255,0.1)' }}>
          {post.excerpt[locale]}
        </p>
      </header>

      <div className="blog-content" style={{ 
        color: 'rgba(255,255,255,0.85)', 
        lineHeight: '1.9', 
        fontSize: '1.15rem'
      }}>
        {/* 간단한 마크다운 수동 파싱 (줄바꿈 및 헤더) */}
        {post.content[locale].split('\n').map((line, i) => {
          if (line.startsWith('##')) {
            return <h2 key={i} style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>{line.replace('##', '').trim()}</h2>;
          }
          if (line.trim() === '') return <br key={i} />;
          return <p key={i} style={{ marginBottom: '1.5rem' }}>{line}</p>;
        })}
      </div>

      <footer style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2rem' }}>
          LegoStack은 AI 인프라 최적화를 위한 오픈소스 커뮤니티입니다.
        </p>
        <Link 
          href={`/${locale}`}
          style={{ padding: '1rem 2rem', borderRadius: '14px', background: '#fff', color: '#000', textDecoration: 'none', fontWeight: '800' }}
        >
          시뮬레이터로 돌아가기
        </Link>
      </footer>
    </main>
  );
}
