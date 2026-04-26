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
 * 로케일에 따른 기본 통화를 반환합니다.
 */
export function getCurrencyByLocale(locale: string): 'USD' | 'KRW' {
  return locale === 'ko' ? 'KRW' : 'USD';
}

/**
 * USD 금액을 특정 통화 포맷으로 변환합니다.
 */
export function formatCurrency(amount: number, currency: 'USD' | 'KRW'): string {
  if (currency === 'KRW') {
    // 1,350원 고정 환율 적용 (추후 API 연동 가능)
    const krwAmount = Math.round(amount * 1350);
    return new Intl.NumberFormat('ko-KR', { 
      style: 'currency', 
      currency: 'KRW',
      maximumFractionDigits: 0 
    }).format(krwAmount);
  }
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount);
}

/**
 * 가성비 점수 (Value for Money) 계산 로직
 * 벤치마크 점수와 비용을 결합하여 0~100 사이의 점수를 산출합니다.
 */
export function calculateEfficiencyScore(
  performance: { intelligence: number; speed: number; accuracy: number; benchmarkScore: number },
  pricing: PricingData
): number {
  // 1. 성능 지수 (Performance Index)
  // 공인 벤치마크 점수에 높은 가중치(60%)를 부여하고, 나머지 지표를 결합
  const perfIndex = 
    (performance.benchmarkScore * 0.6) + 
    (performance.intelligence * 0.2) + 
    (performance.speed * 0.1) + 
    (performance.accuracy * 0.1);
  
  // 2. 비용 지수 (Cost Factor Index) - 낮을수록 가성비에 유리
  let costFactor = 1;
  const LOG_BASE = 1.5; // 비용 차이를 완만하게 반영하기 위한 로그 밑

  switch (pricing.type) {
    case 'token':
      // 토큰 단가가 낮을수록 가성비 급상승 (예: DeepSeek)
      costFactor = ((pricing.inputPrice || 0) + (pricing.outputPrice || 0)) / 2;
      if (costFactor < 0.5) costFactor = 0.5; // 극단적 저가 모델 보정
      break;
    case 'request':
      costFactor = (pricing.unitPrice || 0.01) * 100; // 100회 요청 기준 비용화
      break;
    case 'subscription':
      costFactor = (pricing.monthlyPrice || 20) / 10; // 월 구독료를 토큰 비용 규모로 정규화
      break;
    case 'infra':
      costFactor = (pricing.unitPrice || 1) * 2;
      break;
    case 'free':
      costFactor = 0.3; // 무료 도구는 최상의 가성비 부여
      break;
  }

  // 무료 티어가 크면 가성비 보너스 (최대 20% 할인 효과)
  const freeBonus = pricing.freeQuota > 0 ? Math.min(0.2, Math.log10(pricing.freeQuota) / 10) : 0;
  const effectiveCostFactor = costFactor * (1 - freeBonus);

  // 3. 최종 가성비 점수 산출
  // Formula: Performance / Log(Cost + Offset)
  const efficiency = perfIndex / (1 + Math.log(effectiveCostFactor + 1) / Math.log(LOG_BASE));
  
  // 4. 결과값 보정 (80~100 사이가 'Best Value' 영역이 되도록 스케일링)
  const scaledScore = (efficiency * 0.8) + 15;
  
  return Math.min(100, Math.round(scaledScore));
}
