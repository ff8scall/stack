import { NextRequest, NextResponse } from 'next/server';
import { bricks } from '@/data/bricks';
import { getAffiliateUrl } from '@/lib/affiliate';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const brick = bricks.find((b) => b.id === id);

  if (!brick) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // TODO: 여기서 클릭 로그 기록 (Vercel Analytics 또는 DB)
  console.log(`[Redirect] User clicking on: ${id}`);

  const finalUrl = getAffiliateUrl(brick.id, brick.url);

  return NextResponse.redirect(finalUrl);
}
