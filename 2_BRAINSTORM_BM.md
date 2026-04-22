# 2. BRAINSTORM & UI DESIGN (Toools.design + Raycast 스타일 설계)

## 2.1 UI/UX 컨셉 (Design System)
- **Base Style**: Toools.design의 그리드 시스템 (명확한 구획, 직관적인 탐색).
- **Theme**: Raycast 스타일의 **Deep Dark Mode**.
    - Background: `#000000` (Pure Black) or `#050505`.
    - Border: 아주 가늘고 세련된 그레이 혹은 미세한 그라데이션 글로우.
    - Typography: Inter 또는 Outfit (Modern Tech Sans-serif).
- **Icons**: 고퀄리티 모노크롬 혹은 브랜딩 포인트 컬러 아이콘.

## 2.2 주요 핵심 기능
1. **Daily Tech Feed**: 
   - 메인 상단에 "What's New Today" 섹션 배치.
   - 새로운 기술 브릭이나 가격 변경 사항을 피드 형태로 업데이트.
2. **Visual Resource Card**:
   - 한 장의 카드가 그 자체로 완벽한 디자인 오브제처럼 보이도록 설계.
   - 호버 시 Raycast 특유의 은은한 하이라이트 효과 적용.
3. **Smart Filter & Search**:
   - Toools.design처럼 좌측 혹은 상단에 고정된 카테고리 필터링.

## 2.3 기술적 특징 (Simple & Fast)
- **SSG (Static Site Generation)**: 모든 데이터는 JSON으로 관리하고 빌드 타임에 생성하여 초고속 로딩 구현.
- **Client-side Filter**: 사용자가 카테고리를 바꿀 때 로딩 없이 즉각적으로 카드가 전환되는 쾌적한 경험.
