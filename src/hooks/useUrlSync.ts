'use client';

import { useEffect, useRef } from 'react';
import { useStackStore } from '@/store/useStackStore';
import { serializeStack, deserializeStack } from '@/lib/serialize';
import { useSearchParams, usePathname } from 'next/navigation';

/**
 * Zustand 스토어와 URL 쿼리 스트링(?s=...) 간의 양방향 동기화를 담당하는 Hook
 */
export function useUrlSync() {
  const { selectedBrickIds, mau, avgUsagePerUser, currency, setFullState } = useStackStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isHydrated = useRef(false);

  // 1. 초기 로드 시 URL에서 상태 복원 (Hydration)
  useEffect(() => {
    if (isHydrated.current) return;

    const s = searchParams.get('s');
    if (s) {
      const data = deserializeStack(s);
      if (data) {
        setFullState({
          selectedBrickIds: data.i || [],
          mau: data.m || 1000,
          avgUsagePerUser: data.u || 50,
          currency: data.c || 'USD',
        });
        console.log('[UrlSync] State hydrated from URL');
      }
    }
    isHydrated.current = true;
  }, [searchParams, setFullState]);

  // 2. 상태 변경 시 URL 업데이트 (Sync) - Debounced
  useEffect(() => {
    // 하이드레이션이 완료되기 전에는 URL을 덮어쓰지 않음
    if (!isHydrated.current) return;

    const timeoutId = setTimeout(() => {
      const serialized = serializeStack({
        i: selectedBrickIds,
        m: mau,
        u: avgUsagePerUser,
        c: currency,
      });

      const currentParams = new URLSearchParams(window.location.search);
      const oldS = currentParams.get('s');

      if (selectedBrickIds.length > 0) {
        if (oldS !== serialized) {
          currentParams.set('s', serialized);
          const newUrl = `${pathname}?${currentParams.toString()}`;
          window.history.replaceState(null, '', newUrl);
        }
      } else {
        if (oldS) {
          currentParams.delete('s');
          const newUrl = pathname + (currentParams.toString() ? `?${currentParams.toString()}` : '');
          window.history.replaceState(null, '', newUrl);
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedBrickIds, mau, avgUsagePerUser, currency, pathname]);
}
