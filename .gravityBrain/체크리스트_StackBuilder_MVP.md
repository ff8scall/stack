# 체크리스트 (2026-04-21: Stack Builder MVP 구현)

## 📅 작업 정보
- **기능명**: MAU 기반 AI 비용 시뮬레이터 로직 및 UI 개발
- **담당**: Antigravity
- **상태**: 🏃 진행 중 (승인 대기)

## 📋 TODO 리스트

### 1. 데이터 표준화 로직 구현 (Normalization)
- [x] `src/lib/calculator.ts` 유틸리티 파일 생성 완료
- [x] 가격 타입별(Token-based, Request-based, Fixed-sub) 계산 함수 작성 완료
- [x] 무료 티어 차감 및 초과분 계산 로직 검증 완료

### 2. 전역 상태 관리 구축 (Selection Store)
- [x] `zustand` 라이브러리 설치 및 스토어 설정 완료
- [x] 선택된 브릭(Selected Bricks) 및 MAU 상태 관리 기능 구현 완료

### 3. 심미적 계산기 UI 개발 (Bottom Bar)
- [x] Raycast 스타일의 Glassmorphism 바텀 바 컴포넌트 제작 완료
- [x] MAU 조절 슬라이더 및 실시간 합계(Total Cost) UI 구현 완료

### 4. 최종 데이터 연동 및 테스트
- [x] 33종 데이터 중 주요 4종 샘플 연동 완료 (전체 데이터 순차 연동 예정)
- [x] 다국어 번역(KR/EN) 및 빌드 테스트 통과
- [x] 가격 데이터 마지막 업데이트 날짜 필드 추가 (JSON 스키마 반영)
- [x] Affiliate 링크 처리 유틸리티 및 Proxy Redirect 구현
- [x] 모바일 환경에서의 바텀 바 UX 고도화 (접기/펴기 및 요약 보기)
- [x] USD/KRW 화폐 환산 및 토글 시스템 구축
- [x] MAU 정밀 입력을 위한 숫자 필드 및 슬라이더 연동
- [x] 스택별 비용 상세 내역(Breakdown) 보기 기능 추가
- [x] 데이터 신뢰성을 위한 '오류 신고' 시스템(Report Issue) 도입
- [x] **사용자 맞춤형 '추천 스택' 번들(Presets) 기능 구현** (Phase 2)


---
## 🏁 검증 결과
- (작업 완료 후 기록)
