import { NextResponse } from 'next/server';
import { notifyIndexNow } from '@/lib/indexnow';
import { bricks } from '@/data/bricks';

/**
 * IndexNow Trigger API
 * GET /api/indexnow?secret=...
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // 보안 확인 (Vercel 환경 변수로 설정 권장)
  if (secret !== process.env.INDEXNOW_SECRET && secret !== '083642cc731a4b27909fef930cda8a90') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const baseUrl = 'https://stack.lego-sia.com';
  const locales = ['ko', 'en'];
  const routes = ['', '/blog', '/category/Language', '/category/Vision', '/category/Voice', '/category/Builder', '/category/Infra'];

  // 1. 기본 경로
  const allUrls = locales.flatMap((locale) =>
    routes.map((route) => `${baseUrl}/${locale}${route}`)
  );

  // 2. 브릭 상세 페이지
  locales.forEach((locale) => {
    bricks.forEach((brick) => {
      allUrls.push(`${baseUrl}/${locale}/brick/${brick.id}`);
    });
  });

  // 3. 비교 페이지 (Sitemap 로직 복제)
  const categories = Array.from(new Set(bricks.map(b => b.category)));
  locales.forEach((locale) => {
    categories.forEach((cat) => {
      const catBricks = bricks.filter(b => b.category === cat).slice(0, 5);
      if (catBricks.length >= 2) {
        for (let i = 0; i < catBricks.length; i++) {
          for (let j = i + 1; j < catBricks.length; j++) {
            allUrls.push(`${baseUrl}/${locale}/compare/${catBricks[i].id}-vs-${catBricks[j].id}`);
          }
        }
      }
    });
  });

  const success = await notifyIndexNow(allUrls);

  if (success) {
    return NextResponse.json({ 
      success: true, 
      message: `Notified ${allUrls.length} URLs to IndexNow.`,
      urls: allUrls.slice(0, 5) // 샘플만 반환
    });
  } else {
    return NextResponse.json({ success: false, error: 'Failed to notify IndexNow' }, { status: 500 });
  }
}
