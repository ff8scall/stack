# 🧱 LegoStack: AI Resource Hub 통합 기획안

## 1. 프로젝트 개요 (Project Overview)
- **프로젝트명**: LegoStack (AI Edition)
- **슬로건**: "Build your dream with the most aesthetic AI bricks."
- **목표**: 1인 개발자 및 인디 해커들이 미학적으로 뛰어나고 실용적인 AI 도구를 한눈에 비교하고 선택할 수 있는 큐레이션 플랫폼 구축.
- **차별점**: 
    - **Aesthetic First**: 미학적 기준이 엄격히 적용된 프리미엄 큐레이션.
    - **Stack Simulator**: MAU 기반 API 예상 비용 시뮬레이션 (Phase 1 포함).
    - **Live Specs**: 자동화 파이프라인을 통한 실시간 요금 및 스펙 업데이트.

## 2. 핵심 타겟 (Target Audience)
- **Indie Hackers**: 최소 비용으로 고효율 AI 서비스를 구축하려는 개발자.
- **UI/UX Enthusiasts**: 도구의 디자인 퀄리티를 중요하게 생각하는 미학적 개발자.
- **Global Builders**: 한국어와 영어권 시장을 동시에 타겟팅하는 서비스 기획자.

## 3. 서비스 카테고리 (AI Bricks)
AI 생태계를 5가지 핵심 브릭으로 분류하여 제공합니다.
1. **Language (Text)**: LLM API, 텍스트 생성 및 논리 추론 (e.g. OpenAI, Anthropic)
2. **Vision (Image/Video)**: 이미지/비디오 생성 및 편집 (e.g. Midjourney, Runway)
3. **Voice (Audio)**: TTS, STT, 음악 생성 및 음성 복제 (e.g. ElevenLabs, Suno)
4. **Builder (Dev)**: AI IDE, 에이전트 구축 프레임워크 (e.g. Cursor, v0)
5. **Infra (Brain)**: 벡터 DB, AI 모니터링 및 인프라 (e.g. Pinecone, Helicone)

## 4. 데이터 거버넌스 (Data Structure)
각 AI 도구는 다음의 메타데이터를 기반으로 엄격하게 큐레이션됩니다.

| 분류 | 속성명 | 상세 내용 |
| :--- | :--- | :--- |
| **기본** | Name / Category | 서비스 명칭 및 5대 분류 |
| **비용** | Pricing Type | Free Tier 유무, 구독료, API 단가 (1M Tokens) |
| **성능** | API Grade | API 제공 여부, 문서화 수준, 응답 속도(Latency) |
| **전략** | Alternative To | 기존 유명 도구와의 대조 (SEO 핵심 키워드) |
| **특징** | Killer Feature | 해당 도구만이 가진 독보적인 한 가지 강점 |
| **미학** | Aesthetic Score | 5대 기준(Typography, DarkMode, Interaction, Console UI, Identity) 기반 객관적 점수 |
| **시뮬레이션** | Cost Simulation | MAU당 예상 비용 (Calculator MVP 연동 데이터) |

## 5. 기술 및 SEO 전략 (Technical Strategy)
### 5.1 기술 스택
- **Framework**: Next.js 14+ (App Router) - SEO 최적화 및 SSG 활용.
- **i18n**: Next-Intl을 통한 `/ko`, `/en` 다국어 라우팅 시스템.
- **Design**: Vanilla CSS + Framer Motion (Raycast 스타일의 딥 다크 모드 구현).
- **Performance**: Edge Network 배포 및 이미지 최적화를 통한 LCP 극대화.

### 5.2 SEO 최적화 계획
- **Global Targeting**: 모든 컨텐츠를 영문/국문으로 병행 제공하여 검색 엔진 노출 극대화.
- **Structural Data**: JSON-LD 스키마를 적용하여 구글 검색 결과에 가격, 별점 등이 표시되도록 설계.
- **Comparison Pages**: "Tool A vs Tool B" 또는 "Best Alternatives to X" 스타일의 상세 페이지 자동 생성.

## 6. 로드맵 (Roadmap)
- **Phase 1**: 핵심 AI 도구 20종 큐레이션 + **Stack Builder MVP (API 비용 계산기)** + 다국어 지원 런칭.
- **Phase 2**: 데이터 수집 자동화 파이프라인 완성 및 커뮤니티 Upvote/Downvote 시스템 도입.
- **Phase 3**: 실시간 AI 성능 벤치마크 데이터 연동 및 Share Card (이미지 내보내기) 기능.

---
**작성일**: 2026-04-21
**작성자**: Antigravity (AI Coding Assistant)
