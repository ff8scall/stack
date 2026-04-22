'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStackStore } from '@/store/useStackStore';
import LZString from 'lz-string';

interface ShareHydratorProps {
  compressedData: string;
  locale: string;
}

export default function ShareHydrator({ compressedData, locale }: ShareHydratorProps) {
  const setFullState = useStackStore((state) => state.setFullState);
  const router = useRouter();

  useEffect(() => {
    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(compressedData);
      if (decompressed) {
        const data = JSON.parse(decompressed);
        setFullState(data);
        console.log('[Share] Stack hydrated successfully');
      }
    } catch (e) {
      console.error('[Share] Failed to decompress/hydrate stack data:', e);
    } finally {
      // 메인 페이지로 이동 (로케일 유지)
      router.replace(`/${locale}`);
    }
  }, [compressedData, locale, setFullState, router]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      color: '#fff',
      gap: '1rem'
    }}>
      <div className="spinner" style={{ 
        width: '40px', 
        height: '40px', 
        border: '4px solid rgba(255,255,255,0.1)', 
        borderTopColor: '#fff', 
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <p style={{ fontSize: '0.9rem', fontWeight: '500', opacity: 0.6 }}>
        Importing Shared AI Stack...
      </p>
    </div>
  );
}
