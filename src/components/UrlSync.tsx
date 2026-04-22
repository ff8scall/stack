'use client';

import { useUrlSync } from '@/hooks/useUrlSync';
import { Suspense } from 'react';

/**
 * useUrlSync 훅을 안전하게 호출하기 위한 래퍼 컴포넌트
 * Next.js의 useSearchParams 사용을 위해 Suspense 경계가 필요함
 */
function UrlSyncInner() {
  useUrlSync();
  return null;
}

export default function UrlSync() {
  return (
    <Suspense fallback={null}>
      <UrlSyncInner />
    </Suspense>
  );
}
