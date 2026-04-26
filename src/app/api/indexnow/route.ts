import { NextResponse } from 'next/server';
import { notifyIndexNow } from '@/lib/indexnow';
import { bricks } from '@/data/bricks';

/**
 * IndexNow Trigger API
 * GET /api/indexnow?secret=...&ids=openai-gpt41,anthropic-claude46
 * POST /api/indexnow (JSON body: { secret: "...", urls: ["..."] })
 */
export async function GET(request: Request) {
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}

async function handleRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  let secret = searchParams.get('secret');
  let targetIds = searchParams.get('ids')?.split(',').filter(Boolean);
  let manualUrls: string[] = [];

  // POST 요청인 경우 body에서 데이터 추출
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      secret = secret || body.secret;
      if (body.urls && Array.isArray(body.urls)) {
        manualUrls = body.urls;
      }
      if (body.ids && Array.isArray(body.ids)) {
        targetIds = body.ids;
      }
    } catch (e) {
      // Body가 없거나 형식이 잘못된 경우 무시
    }
  }

  // 보안 확인
  if (secret !== process.env.INDEXNOW_SECRET && secret !== '083642cc731a4b27909fef930cda8a90') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const baseUrl = 'https://stack.lego-sia.com';
  const locales = ['ko', 'en'];
  let finalUrls: string[] = [];

  if (manualUrls.length > 0) {
    // 1. 수동 URL 리스트가 있는 경우
    finalUrls = manualUrls;
  } else if (targetIds && targetIds.length > 0) {
    // 2. 특정 ID가 지정된 경우 (Streaming 모드)
    const validIds = bricks.filter(b => targetIds?.includes(b.id)).map(b => b.id);
    
    locales.forEach((locale) => {
      validIds.forEach((id) => {
        // 상세 페이지
        finalUrls.push(`${baseUrl}/${locale}/brick/${id}`);
        
        // 해당 브릭이 포함된 비교 페이지 (카테고리 내 상위 5개 조합)
        const brick = bricks.find(b => b.id === id);
        if (brick) {
          const catBricks = bricks.filter(b => b.category === brick.category).slice(0, 5);
          catBricks.forEach(other => {
            if (other.id !== id) {
              const pair = [id, other.id].sort(); // 정렬하여 중복 방지 (실제 URL 생성 로직 확인 필요)
              finalUrls.push(`${baseUrl}/${locale}/compare/${pair[0]}-vs-${pair[1]}`);
            }
          });
        }
      });
    });
    
    // 카테고리 페이지도 포함 (옵션)
    const affectedCats = new Set(bricks.filter(b => validIds.includes(b.id)).map(b => b.category));
    locales.forEach(locale => {
      affectedCats.forEach(cat => {
        finalUrls.push(`${baseUrl}/${locale}/category/${cat}`);
      });
    });
  } else {
    // 3. 전체 URL (Full Batch 모드)
    const routes = ['', '/blog', '/category/Language', '/category/Vision', '/category/Voice', '/category/Builder', '/category/Infra'];
    
    // 기본 경로
    finalUrls = locales.flatMap((locale) =>
      routes.map((route) => `${baseUrl}/${locale}${route}`)
    );

    // 모든 브릭 상세
    locales.forEach((locale) => {
      bricks.forEach((brick) => {
        finalUrls.push(`${baseUrl}/${locale}/brick/${brick.id}`);
      });
    });

    // 모든 주요 비교 조합
    const categories = Array.from(new Set(bricks.map(b => b.category)));
    locales.forEach((locale) => {
      categories.forEach((cat) => {
        const catBricks = bricks.filter(b => b.category === cat).slice(0, 5);
        if (catBricks.length >= 2) {
          for (let i = 0; i < catBricks.length; i++) {
            for (let j = i + 1; j < catBricks.length; j++) {
              finalUrls.push(`${baseUrl}/${locale}/compare/${catBricks[i].id}-vs-${catBricks[j].id}`);
            }
          }
        }
      });
    });
  }

  // 중복 제거
  finalUrls = Array.from(new Set(finalUrls));

  const success = await notifyIndexNow(finalUrls);

  if (success) {
    return NextResponse.json({ 
      success: true, 
      mode: targetIds ? 'streaming' : 'full-batch',
      count: finalUrls.length,
      message: `Notified ${finalUrls.length} URLs to IndexNow.`,
      urls: finalUrls.slice(0, 10) 
    });
  } else {
    return NextResponse.json({ success: false, error: 'Failed to notify IndexNow' }, { status: 500 });
  }
}
