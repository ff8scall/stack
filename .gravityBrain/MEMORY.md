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
- **Phase 3 완료**: Hybrid Short Slug 및 실시간 URL Sync 시스템 구축 완료 (2026-04-22).
- **Phase 3 완료**: Framer Motion 기반 프리미엄 공유 모달 및 동적 OG 이미지 엔진(/api/og) 구현 완료.
- **i18n 완료**: ko/en 다국어 데이터 정합성 검토 및 현지화(Localization) 보완 완료.
- **시스템 동기화**: `/system-map` 실행 및 Next.js 16 기반의 `proxy.ts` 마이그레이션(기존 middleware 대체) 완료 (2026-04-22).

- **Phase 2 완료**: 2026 AI 에코시스템 20종 도구 데이터 통합 및 11종 핵심 도구 실시간 스크래퍼 구축 완료 (2026-04-22).
- **자동화 완성**: GitHub Actions 기반의 일일 가격 업데이트 파이프라인 가동.
- **SEO 최적화 완료**: Next.js 16 Metadata API 고도화, 시맨틱 H1 구조 개선 및 네이버/빙 소유권 확인 태그 추가 완료.

## 🔜 다음 단계 (Next Phase)
- **Phase 4**: AWS/Azure/GCP 주요 AI 인프라 가격 자동 업데이트 추가 확장.
- **Phase 4**: AI 모델 성능 대비 가격(Price-to-Performance) 분석 데이터 추가.
- **Phase 4**: 사용자별 'Best Stack' 랭킹 시스템 및 커뮤니티 피드 구축.

## 💡 최근 결정 사항
- **100% 무료화**: 유료 리포트 및 기업용 모델을 전면 폐기하고 '순수 무료 유틸리티'로 피벗 (2026-04-22).

## 🚩 단기 목표 (Next Steps)
1. AWS Lambda/S3 등 핵심 클라우드 가격 데이터셋 구축 (bricks.ts 확장)
2. 'Best Stack' 랭킹 시스템을 위한 Supabase DB 분석 쿼리 설계
3. 사용자 피드백 수집을 위한 간단한 설문/평가 UI 추가


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
