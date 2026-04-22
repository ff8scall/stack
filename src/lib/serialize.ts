import LZString from 'lz-string';

/**
 * 스택 상태를 URL 공유용으로 압축 및 직렬화하는 유틸리티
 */

export interface SerializedStack {
  i: string[]; // selectedBrickIds
  m: number;   // mau
  u: number;   // avgUsagePerUser
  c?: 'USD' | 'KRW'; // currency
}

/**
 * 상태 객체를 압축된 문자열로 변환
 */
export const serializeStack = (data: SerializedStack): string => {
  try {
    const jsonString = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(jsonString);
  } catch (error) {
    console.error('[Serialize] Failed to serialize stack:', error);
    return '';
  }
};

/**
 * 압축된 문자열을 상태 객체로 복원
 */
export const deserializeStack = (compressed: string): SerializedStack | null => {
  if (!compressed) return null;
  
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    if (!decompressed) return null;
    
    return JSON.parse(decompressed) as SerializedStack;
  } catch (error) {
    console.error('[Serialize] Failed to deserialize stack:', error);
    return null;
  }
};
