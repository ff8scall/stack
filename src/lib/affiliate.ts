/**
 * LegoStack Affiliate & Redirect Utility
 */

const AFFILIATE_CONFIG: Record<string, { tag: string; param: string }> = {
  "openai-gpt4o": { tag: "legostack", param: "ref" },
  "supabase-db": { tag: "legostack_dev", param: "utm_source" },
  // 추후 제휴 파트너십 체결 시 여기에 설정 추가
};

/**
 * 특정 브릭의 최종 목적지 URL을 생성합니다.
 * 제휴 태그가 있으면 붙여주고, 없으면 원본 URL을 반환합니다.
 */
export function getAffiliateUrl(brickId: string, originalUrl: string): string {
  const config = AFFILIATE_CONFIG[brickId];
  if (!config) return originalUrl;

  const url = new URL(originalUrl);
  url.searchParams.set(config.param, config.tag);
  return url.toString();
}

/**
 * 보안 및 트래킹을 위한 내부 Redirect 경로를 반환합니다.
 */
export function getInternalRedirectPath(brickId: string): string {
  return `/api/redirect?id=${brickId}`;
}
