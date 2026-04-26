# CORE LOGIC (핵심 비즈니스 로직 및 알고리즘)

본 문서는 LegoStack의 핵심 기능인 **상태 동기화, 데이터 공유 시스템, 검색 엔진 최적화** 등의 기술적 상세 구조를 설명합니다.

---

## 1. 상태 직렬화 및 압축 (Serialization & Compression)

### 설계 의도
사용자가 선택한 스택 정보(Selected Bricks, MAU 등)를 URL 쿼리 스트링에 포함시키기에는 길이가 너무 길어집니다. 이를 최적화하여 짧고 공유 가능한 URL을 생성하기 위해 압축 알고리즘을 사용합니다.

### 핵심 알고리즘
- **객체 축소**: 필드명을 최소화(selectedBrickIds -> i, mau -> m 등)하여 JSON 크기를 줄입니다.
- **LZ-String**: lz-string 라이브러리를 사용하여 JSON 문자열을 압축하고, compressToEncodedURIComponent를 통해 URL 안전 문자열로 변환합니다.

---

## 2. URL 기반 상태 동기화 (URL Sync Strategy)

### 로직 흐름
1. **Hydration (초기 로드)**: 페이지 로드 시 URLSearchParams에서 s 파라미터를 추출하여 Zustand 스토어를 초기화합니다.
2. **Persistence (상태 변경)**: 사용자가 UI에서 선택을 바꿀 때마다 Zustand 상태가 변경되며, useUrlSync 훅이 이를 감지하여 500ms 디바운스 후 URL을 업데이트합니다.
3. **History Management**: window.history.replaceState를 사용하여 뒤로가기 기록을 과도하게 쌓지 않으면서 실시간성을 유지합니다.

---

## 3. 영구 공유 시스템 (Persistent Sharing via Supabase)

### 데이터 흐름
1. 사용자가 공유 버튼을 클릭하면 압축된 상태 데이터가 /api/share로 전송됩니다.
2. 서버는 데이터를 Supabase DB에 저장하고 고유한 Slug를 생성합니다.
3. 사용자는 짧은 공유 URL(예: /ko/s/cool-stack-123)을 받게 됩니다.
4. 다른 사용자가 해당 링크로 접속 시 서버 컴포넌트가 DB에서 데이터를 조회하여 상태를 복원합니다.

---

## 4. 동적 OG 이미지 생성 (Dynamic OG Image)

### 작동 원리
1. 공유 페이지의 generateMetadata가 호출됩니다.
2. Supabase에서 데이터를 조회하여 현재 스택의 구성 개수와 MAU 등을 포함한 메타데이터를 생성합니다.
3. pi/og?slug=[slug] 경로로 OG 이미지 URL을 지정합니다.
4. pi/og 엔진(Next.js satori)이 데이터를 실시간으로 읽어 사용자 정의 이미지를 렌더링합니다.

---

## 5. 예외 처리 전략

- **환경 변수 부재**: src/lib/supabase.ts에서 환경 변수가 없을 경우 클라이언트를 생성하지 않고 
ull을 반환하여 빌드 시 오류를 방지합니다.
- **잘못된 슬러그**: 존재하지 않는 공유 링크 접속 시 
otFound()를 호출하여 404 페이지로 유도합니다.

---

## 6. 검색 및 필터링 로직 (Search & Filter Engine)

### 작동 원리
1. **Zustand 연동**: searchQuery 상태가 변경될 때마다 BrickGrid가 리렌더링됩니다.
2. **다국어 검색**: 	Bricks 훅을 통해 현재 로케일에 해당하는 번역된 이름과 특징을 대상으로 includes() 검사를 수행합니다.
3. **교차 필터링**: 카테고리가 지정된 경우 카테고리 일치 여부를 먼저 검사한 후 검색어 필터를 적용합니다.

---

## 7. 가성비 엔진 (Efficiency Score Engine)

### 알고리즘
- 입력값: enchmarkScore (성능 지표), monthlyCost (비용 지표).
- 공식: Score = (PerfIndex * 0.6) + (CostFactor * 0.4)
- 시각화: 90점 이상의 브릭에 'Best Value' 배지를 부여하여 가시성을 높입니다.

---

## 8. 상세 페이지 SEO 전략 (Detail Page SEO Strategy)

### 핵심 구현 로직
1. **데이터 스키마 확장**: 상세 분석 필드(description, pros/cons, useCases, estFor)를 추가하여 풍부한 콘텐츠를 제공합니다.
2. **구조화 데이터 (JSON-LD)**: SoftwareApplication 타입을 사용하여 가격, 별점, 카테고리를 명시적으로 기술합니다.
3. **내부 링크 (Internal Linking)**: 관련 비교 페이지 링크를 하단에 배치하여 크롤러의 탐색 범위를 넓힙니다.

---

## 9. IndexNow 실시간 동기화 (Streaming & Multi-Endpoint)

### 설계 의도
검색 엔진(Bing, Naver)에 사이트의 변경 사항을 즉시 반영하여 색인 신선도를 유지하고, 특히 AI 검색(Copilot)의 근거 자료로 활용될 확률을 높입니다.

### 핵심 구현 로직
1. **멀티 엔드포인트 지원**: src/lib/indexnow.ts에서 Bing과 네이버 엔드포인트를 병렬로 호출합니다.
2. **스트리밍(Streaming) 모드**: 특정 브릭 ID(ids)를 파라미터로 받아 해당 브릭과 관련된 URL만 선별적으로 통보하여 가이드라인을 준수합니다.
3. **자동화 트리거**: GitHub Actions 워크플로우 완료 시점에 API를 호출하여 데이터 업데이트와 색인 요청을 동기화합니다.

---

## 10. AI Grounding 및 Copilot 최적화

### 설계 의도
AI 모델이 웹을 검색하여 답변을 생성할 때, LegoStack의 정교한 비용 데이터를 정확하게 인용(Citation)하고 근거(Grounding)로 삼을 수 있도록 기계 판독이 용이한 구조를 제공합니다.

### 핵심 로직
1. **확장된 JSON-LD**: pros/cons (ItemList), offers (가격 상세) 등을 포함하여 모델의 가치를 정량화된 데이터로 제공합니다.
2. **이미지 멀티모달 최적화**: 로고 이미지에 구체적인 lt 텍스트를 부여하여 시각적 정보를 텍스트 정보와 일치시킵니다.
