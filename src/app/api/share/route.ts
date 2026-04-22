import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    
    if (!data) {
      return NextResponse.json({ error: 'Data is required' }, { status: 400 });
    }

    // 데이터의 해시값을 기반으로 중복 여부 확인 또는 슬러그 생성
    const hash = crypto.createHash('md5').update(data).digest('hex').substring(0, 8);
    const slug = hash; // 간단하게 해시의 앞 8자리를 슬러그로 사용

    // Supabase에 저장 (Upsert: 동일한 데이터면 기존 슬러그 재사용)
    const { error } = await supabase
      .from('shared_stacks')
      .upsert({ 
        slug: slug, 
        stack_data: data,
        created_at: new Date().toISOString()
      }, { onConflict: 'slug' });

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Failed to save stack' }, { status: 500 });
    }

    return NextResponse.json({ slug });
  } catch (error) {
    console.error('Share API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
