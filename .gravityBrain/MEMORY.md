# MEMORY (LegoStack 프로젝트 기억 저장소)

## 🎯 현재 상황 (Context)
- **프로젝트**: LegoStack
- Phase 1 완료: 33종 AI 브릭 큐레이션 및 가로형 컴팩트 카드 UI 구현.
- Spec Audit (v3) 완료: 서비스/기술/비즈니스 관점의 2차 검증 및 보완 완료 (2026-04-21).
- 인프라 가격 모델, DX Score, Affiliate Redirect 시스템 구현 완료.
- 모바일 최적화 (접이식 계산기) 완료.
- **Phase 2 진행 중**: 인프라 카테고리 크롤러 확장(Supabase, Upstash, Pinecone) 및 데이터 검증 시스템 구축 완료 (2026-04-22).
- **Phase 2 진행 중**: 계산기 가중치(BaseUsage) 로직 도입으로 비용 산출 정확도 개선.
- **Phase 2 신규 데이터**: 2026 글로벌 AI 인프라 분석 데이터 수신 (20개 핵심 도구 메타데이터 확보).

## 🔜 다음 단계 (Next Phase)
- Phase 2: 2026 AI 에코시스템 20종 도구 데이터 통합 및 큐레이션 업데이트.
- Phase 2: AWS(Lambda/S3), Vercel 가격 자동화 추가.
- Phase 3: 사용자 정의 스택 공유 기능 (URL Query 기반).


고퀄리티 다크 테마 UI
    - SEO 최적화 (Global 대상: 한국어 기본 + `/en` 영어 지원)
    - AI 도구 특화 큐레이션 (가격, 성능, 미학 점수 포함)

## 🚩 단기 목표 (Next Steps)
1. AWS(Lambda, S3) 가격 스크래퍼 추가 시도
2. /en 라우트의 영문 번역 데이터 완성 (messages/en.json)
3. 'Share Stack' 기능을 위한 URL 쿼리 스트링 직렬화 로직 설계

## 💡 최근 결정 사항
- **Next.js 16 (App Router)**: 고성능 Turbopack 기반 프레임워크
- **Zustand**: 선택된 AI 브릭 및 MAU 상태 관리 (Local Persist)
- **Next-Intl**: 다국어 라우팅 및 메시지 관리 (/ko, /en)
- **Framer Motion**: 레이아웃 전환 및 인터랙션 애니메이션
- **Vanilla CSS (Variables)**: Raycast 스타일 디자인 시스템
- **AI Strategy**: AI 도구 우선 런칭 (Language, Vision, Voice, Builder, Infra 분류)
- **SEO Strategy**: 다국어 지원 (/en), 개별 리소스별 상세 페이지, JSON-LD 스키마
- **Monetization**: Affiliate Tag 기반 Proxy Redirect 시스템 도입
- **Rendering**: ISR (Incremental Static Regeneration) 적용으로 가격 실시간성 확보

## ⚠️ 주의 사항 및 이슈
- 디자인 퀄리티가 프로젝트의 핵심이므로, 대충 만든 컴포넌트는 지양할 것.
- SSG를 적극 활용하여 런타임 성능을 극한으로 끌어올릴 것.
