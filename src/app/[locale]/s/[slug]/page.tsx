import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import SharedStackView from '@/components/SharedStackView';
import { deserializeStack } from '@/lib/serialize';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;

  const { data } = await supabase
    .from('shared_stacks')
    .select('stack_data')
    .eq('slug', slug)
    .single();

  if (!data) return {};

  const state = deserializeStack(data.stack_data);
  const brickCount = state?.i.length || 0;

  return {
    title: locale === 'ko' 
      ? `나의 AI 스택 (${brickCount}개 도구) | LegoStack`
      : `My AI Stack (${brickCount} tools) | LegoStack`,
    description: locale === 'ko'
      ? `LegoStack에서 시뮬레이션된 AI 인프라 견적을 확인해보세요. 예상 규모: ${state?.m.toLocaleString()} MAU.`
      : `Check out this AI FinOps simulation on LegoStack. Estimated Monthly Total: ${state?.m.toLocaleString()} MAU.`,
    openGraph: {
      images: [
        {
          url: `/api/og?slug=${slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?slug=${slug}`],
    },
  };
}

export default async function SharedStackPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Supabase에서 슬러그로 데이터 조회
  const { data, error } = await supabase
    .from('shared_stacks')
    .select('stack_data')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Fetch Shared Stack Error:', error);
    notFound();
  }

  return <SharedStackView compressedData={data.stack_data} locale={locale} />;
}
