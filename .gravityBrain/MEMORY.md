# MEMORY (LegoStack 프로젝트 기억 저장소)

## 🎯 현재 상황 (Context)
- **프로젝트**: LegoStack (AI FinOps Playground)
- **IndexNow 검색 엔진 연동 고도화 (2026-04-26)**
  - **멀티 엔드포인트**: Bing(IndexNow.org) 및 Naver 서치어드바이저 동시 연동 완료.
  - **동일 키 재사용**: 단일 API Key(`083642cc731a4b27909fef930cda8a90`)로 여러 검색 엔진 통합 관리.
  - **자동화 연동**: GitHub Actions를 통한 가격 업데이트 시 자동 색인 요청 트리거 구축.
- **전방위 데이터 품질 감사 및 안정화 완료 (2026-04-26)**
  - **데이터 심화**: 22개 전체 브릭에 Context Window, Max Output, Regions 정보 보강.
  - **통화 엔진 완결**: 로케일별 자동 통화 전환 및 전역 상태(KRW/USD) 동기화 구현.
  - **인프라 정상화**: GitHub Actions 권한 복구 및 Vercel 배포 캐시 이슈(force-dynamic) 해결.
  - **견고성 확보**: 상세 페이지 Empty State 및 런타임 오류 방어 로직 강화.
- **유입 최적화 및 비교 조합 전수 확장 완료 (2026-04-26)**
  - **비교 엔진 확장**: 카테고리 내 모든 유의미한 도구 쌍(Combination) 자동 생성 로직 적용.
  - **콘텐츠 확장**: 3종의 고품질 기술 블로그 포스트 추가 및 RSS 피드 구축.
  - **SEO 강화**: Sitemap 동적 확장 및 비교 페이지 하단 연관 비교 내부 링크 추가.
- **벤치마크 기반 가성비(Efficiency) 엔진 고도화 완료 (2026-04-26)**
  - **데이터 스키마 확장**: MMLU, HumanEval 등 공인 벤치마크 점수(`benchmarkScore`) 필드 추가.
  - **가성비 로직 리팩토링**: 성능 지표와 비용(무료 티어 반영)을 결합한 새로운 `Efficiency Score` 산출.
  - **UI/UX 시각화**: BrickGrid 'Best Value' 배지, 상세 페이지 벤치마크 카드, 비교 페이지 효율성 차트 추가.
- **사이트 전체 정밀 감사 및 UI/UX 보강 완료 (2026-04-25)**
  - **카테고리 페이지 고도화**: 플레이스홀더 제거, Navbar/Footer 추가, 상세 페이지 링크 연결.
  - **비교 페이지 고도화**: 동적 Winner 배지 로직, 상세 분석 리포트 섹션 추가, Versus UI 개선.
  - **i18n 완결**: 사이트 전반의 하드코딩 영문/국문 텍스트를 번역 키로 전환 완료.
  - **데이터 정합성**: SharedStackView 및 가격 표시 로직의 런타임 오류 방어 완료.

## 🔜 다음 단계 (Future Roadmap)
- **Phase 5 (데이터 심화 - 완료)**: 
  - AI 모델별 '토큰 당 성능(Benchmark Score)' 지표를 통한 가성비 추천 알고리즘 고도화.
  - (보류) 클라우드 인프라(AWS/Azure/GCP) 비용 모델 통합.
- **Phase 6 (유입 최적화 - 완료)**: 
  - 비교 조합 전수 생성을 통한 검색 엔진 노출 범위 극대화 및 RSS 피드 구축.
- **Phase 7 (유저 경험 완성)**:
  - 사용자가 직접 자신의 데이터를 업로드하여 비용을 시뮬레이션하는 '커스텀 분석' 기능.
  - AI 추천 스택 프리셋(Presets) 기능 강화 및 커뮤니티 공유 기능 고도화.

## 💡 주요 결정 사항
- **전문성 집중**: 커뮤니티나 AI 챗봇 같은 부가 기능보다는, 1인 개발자와 기업이 실제로 참고할 수 있는 **'가장 정확하고 깊이 있는 AI 비용 데이터'**를 제공하는 것에 집중함.
- **SEO 전략**: 비교 페이지와 상세 페이지의 콘텐츠 풍부도를 높여, 도구명 검색 시 LegoStack이 상위에 노출되도록 인프라를 구축함.

## 🚩 최근 작업 결과
1. IndexNow 검색 엔진 연동 고도화 (Bing/Naver 멀티 엔드포인트 & 스트리밍 지원) ✅
2. 상세 페이지 AI Grounding 최적화 (JSON-LD & Alt Tags) ✅
3. 유입 최적화 및 비교 조합 전수 확장 ✅
4. 벤치마크 기반 가성비 엔진 고도화 ✅

## 🛠️ 기술 스택 (현행화)
- **Framework**: Next.js 16.2.4 (App Router)
- **i18n**: Next-Intl (Prefix-based)
- **Content**: Dynamic Analysis Engine (Compare/Detail)
- **Design**: Vanilla CSS + Framer Motion (Raycast-inspired)
- **Database**: Supabase (Persistent Sharing)
