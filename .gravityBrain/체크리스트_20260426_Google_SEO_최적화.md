# 체크리스트: 구글 검색 엔진 최적화 (Google SEO) (2026-04-26)

## 🎯 목표
- 구글 검색 엔진 가이드라인(/seo-google) 준수 및 가시성 극대화.
- 기술적 요구사항(robots.txt, 검증 태그) 보완.
- 콘텐츠 품질(E-E-A-T) 및 사용자 경험(Core Web Vitals) 강화.

---

## 🛠️ 작업 단계

### 1. 기술적 최적화 (Technical SEO)
- [x] `public/robots.txt` 파일 생성 (크롤러 접근 제어 및 사이트맵 경로 명시) -> **완료**
- [x] `src/app/[locale]/layout.tsx`에 Google Site Verification 태그 추가 -> **Placeholder 추가 완료**
- [x] 캐노니컬 URL(`alternates.canonical`) 설정이 각 페이지별로 정확한지 점검 -> **검증 완료**
- [x] `favicon.ico` 외에 고해상도 Apple Touch Icon 및 웹앱 매니페스트 검토

### 2. 콘텐츠 품질 및 구조화 (E-E-A-T & JSON-LD)
- [ ] 메인 페이지(`Index`)의 JSON-LD를 더 구체적으로 확장 (`aggregateRating` 등 추가 가능 여부 검토)
- [ ] 블로그 포스트 및 상세 페이지의 제작자 정보(Author) 명시로 신뢰성 확보
- [ ] 'Helpful Content' 관점에서 사용자가 가장 궁금해할 '실시간 가격'과 '가성비 비교' 강조 확인

### 3. 사용자 경험 및 성능 (Core Web Vitals)
- [x] 모든 이미지에 `loading="lazy"` 및 명확한 `width/height` 부여 확인 (CLS 방지) -> **적용 완료**
- [x] 폰트 로딩 시 `display: swap` 적용 확인 -> **확인 완료**
- [x] 브릭 그리드의 인터랙션 시 FID(상호작용 지연) 최소화 여부 확인

---

## ⚠️ 주의사항
- **키워드 남용 금지**: 검색 순위만을 위한 무의미한 키워드 반복 지양.
- **모바일 우선**: 구글은 모바일 버전을 기준으로 색인하므로 모바일 레이아웃 무결성 유지.
