/**
 * LegoStack Calculator Logic
 * 서로 다른 AI 가격 모델을 '월간 예상 비용'으로 통합 계산하는 엔진
 */

export type PricingType = 'token' | 'request' | 'subscription' | 'infra' | 'free';

export interface PricingData {
  type: PricingType;
  inputPrice?: number;  // 1M 토큰당 가격 (USD)
  outputPrice?: number; // 1M 토큰당 가격 (USD)
  monthlyPrice?: number; // 고정 월 구독료 (USD)
  unitPrice?: number;   // 요청 1회당 또는 인프라 단위당 가격 (USD)
  unitName?: string;    // 'GB', '1k Requests' 등
  freeQuota: number;    // 월간 무료 제공량
}

export interface UserUsage {
  mau: number;          // 월간 활성 사용자 수
  avgUsagePerUser: number; // 유저 1인당 평균 사용량 (토큰 또는 요청 횟수)
}

/**
 * 특정 브릭(도구)의 월간 비용을 계산합니다.
 */
export function calculateMonthlyCost(pricing: PricingData, usage: UserUsage, baseUsage: number = 1): number {
  const { mau, avgUsagePerUser } = usage;
  const totalRawUsage = mau * avgUsagePerUser * baseUsage;

  switch (pricing.type) {
    case 'token': {
      // 토큰 기반 (입력/출력 평균가 사용)
      const avgTokenPrice = ((pricing.inputPrice || 0) + (pricing.outputPrice || 0)) / 2;
      const taxableUsage = Math.max(0, totalRawUsage - pricing.freeQuota);
      return (taxableUsage / 1_000_000) * avgTokenPrice;
    }

    case 'request': {
      // 요청 기반 (Deepgram, Upstash 등)
      const taxableRequests = Math.max(0, totalRawUsage - pricing.freeQuota);
      return taxableRequests * (pricing.unitPrice || 0);
    }

    case 'subscription': {
      // 구독 기반 (Midjourney, Cursor 등)
      return pricing.monthlyPrice || 0;
    }

    case 'infra': {
      // 인프라 기반 (DB, Storage, Bandwidth)
      const taxableUnits = Math.max(0, totalRawUsage - pricing.freeQuota);
      return taxableUnits * (pricing.unitPrice || 0);
    }

    case 'free':
    default:
      return 0;
  }
}

/**
 * 전체 선택된 스택의 합계 비용을 계산합니다.
 */
export function calculateTotalCost(bricks: { pricing: PricingData, baseUsage?: number }[], usage: UserUsage): number {
  return bricks.reduce((total, brick) => total + calculateMonthlyCost(brick.pricing, usage, brick.baseUsage), 0);
}

/**
 * USD 금액을 KRW로 변환합니다. (현재 고정 환율 1,350원 적용)
 */
export function formatCurrency(amount: number, currency: 'USD' | 'KRW'): string {
  if (currency === 'KRW') {
    const krwAmount = amount * 1350;
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(krwAmount);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
