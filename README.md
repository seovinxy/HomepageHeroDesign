# 율:12 — 2027 붉은 양띠 에디션

십이지의 지혜와 오방색으로 빚은 새해 행운 선물 브랜드 웹사이트.

## 기술 스택

| 항목 | 버전 |
|------|------|
| React | 19 |
| TypeScript | 5.7 |
| Vite | 8 |
| Tailwind CSS | v4 (`@tailwindcss/vite`) |
| 런타임 환경 | Figma Make |

## 로컬 개발

Figma Make 환경에서는 개발 서버가 자동 실행됩니다 (`$PORT`, 기본 8443).  
직접 실행할 경우:

```bash
pnpm install
pnpm dev
```

## 프로젝트 구조

```
src/
├── main.tsx              # React 엔트리포인트, index.css 로드, #root 마운트
├── App.tsx               # 앱 루트 — 라우팅, 헤더/푸터, 히어로, 마퀴, 드로어, 검색
├── index.css             # 전역 CSS + Tailwind v4 + 커스텀 키프레임
├── HiddenSheep.tsx       # 숨은 양 게임 — Context, Provider, HiddenSheep 컴포넌트
├── EventPage.tsx         # 이벤트 페이지 (스탬프 보드, 숨은 양 현황)
├── FortunePage.tsx       # 오늘의 운세 (입력 → 결과)
├── LookbookPage.tsx      # 컬렉션 룩북 (6컬럼 비대칭 매거진 그리드)
├── ShopPage.tsx          # 쇼핑 목록 (그리드/리스트 뷰)
├── ProductDetailPage.tsx # 상품 상세
├── CartPage.tsx          # 장바구니
├── NewArrivalsPage.tsx   # 신상품
├── MyPage.tsx            # 마이페이지
└── BrandStoryPage.tsx    # 브랜드 스토리
```

### 에셋 구조

```
src/assets/               # 빌드 시 import하는 주요 에셋
├── sheep-hero.png            # 메인 3D 붉은 양 캐릭터 (히어로, 브랜드 소개, 이벤트)
├── yul_star_gold_big.png     # 골드 별 — 대
├── yul_star_gold_mid.png     # 골드 별 — 중
├── yul_star_gold_small.png   # 골드 별 — 소
├── yul_star_olive_diamond.png # 올리브 다이아몬드 별
├── yul_star_red_diamond.png  # 레드 다이아몬드 별
├── product-1.png             # 액막이 인형
├── product-2.png             # 벽걸이 캘린더
├── product-3.png             # 탁상 캘린더
├── product-4.png             # 마스킹테이프
├── product-5.png             # 봉투 세트
├── product-6.png             # 양 복주머니 세트
├── product-6-card.png        # 그리팅 카드
├── product-7.png             # 쿠키 세트
└── product-8.png             # 캔들 + 비누

src/imports/              # 기존 로고·아이콘 에셋
├── yul_logo_full.png         # 브랜드 헤더 로고
├── yul_sheep_character.png   # 숨은 양 아이콘 (HiddenSheep 컴포넌트)
└── ...                       # 기타 원본 에셋
```

## 주요 기능

### 숨은 양 찾기 (🐑×7)

사이트 전 페이지에 7마리의 양이 숨어 있습니다. 클릭하면 발견 처리되고 토스트 알림이 표시됩니다.  
발견 현황은 `localStorage('yul12_sheep_found')`에 저장됩니다.

| 양 이름 | 위치 | 페이지 |
|--------|------|--------|
| 행운양 | "2027 丁未年" 연도 레이블 바로 오른쪽 인라인 | 홈 히어로 |
| 휴식양 | 푸터 하단 "YUL:12" 로고 텍스트 오른쪽 | 홈 푸터 |
| 사랑양 | "YUL:12 · 2027 RED SHEEP EDITION" 아이브로우 옆 | SHOP |
| 건강양 | 운세 소개 문단 아래 우측 정렬 영역 | 운세 입력 |
| 응원양 | 운세 결과 카드 "OO띠" H2 제목 바로 옆 인라인 | 운세 결과 |
| 금전양 | "주문 요약" 섹션 타이틀 바로 옆 인라인 | 장바구니 |
| 여행양 | "양 복주머니 세트" H1 제목 바로 옆 인라인 | 상품 상세 |

**힌트 팝업:** 첫 방문 3초 후 우측 하단에 힌트 팝업이 나타납니다 (7초 후 자동 사라짐, 재방문 시 localStorage로 숨김).  
**아이들 애니메이션:** 미발견 양은 `sheep-idle-wobble` 키프레임으로 좌우로 살살 흔들립니다.

### 오늘의 행운 색

출생년도를 입력하면 십이지(띠)와 오늘 날짜(연중 일수)를 조합해 오방색 중 행운 색을 계산합니다.

```ts
// FortunePage.tsx
function getTodayLuckyColor(year: number) {
  const idx = ((year - 4) % 12 + 12) % 12;       // 띠 인덱스 (0~11)
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor(
    (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  return OBANGSAEK[(idx + dayOfYear) % OBANGSAEK.length]; // 오방색 5가지 순환
}
```

결과 UI에서는 "오방색" 대신 **"행운의 색"** 표기를 사용합니다.

### 매거진 룩북 그리드

`LookbookPage.tsx` — 6컬럼 비대칭 CSS 그리드. 필터 선택 시 균등 3컬럼으로 전환.

| 아이템 | 그리드 스팬 | 높이 |
|--------|------------|------|
| LOOK 01 | span 4 | 460px |
| LOOK 02 | span 2 | 460px |
| LOOK 03 | span 3 | 340px |
| LOOK 04 | span 3 | 340px |
| 중앙 인용구 | span 6 | — |
| LOOK 05 | span 3 | 320px |
| LOOK 06 | span 2 | 320px |
| LOOK 07 | span 1 | 320px |

### 히어로 레이아웃

수직 중앙 정렬 스택 구조:

1. 연도 레이블 (`2027 丁未年` + 행운양)
2. 메인 헤드라인 (`당신과 함께할 행운은?`)
3. 서브타이틀
4. CTA 버튼 (숨은 양 찾기 / 오늘의 운세 보기)
5. 양 + 7개 별 비주얼 (1100px 너비 컨테이너, `position: relative` 기반 절대 배치)

## 컬러 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `creamBg` | `#F3ECD5` | 전체 배경 |
| `creamSoft` | `#EFE6C8` | 카드·호버 배경 |
| `cardPaper` | `#FBF7E9` | 흰 카드 배경 |
| `inkBrown` | `#37291C` | 기본 텍스트 |
| `sealRed` | `#AB0A00` | 포인트 레드 (CTA, 강조) |
| `mustard` | `#B6A847` | 머스타드 골드 (마퀴, 아이콘) |
| `olive` | `#494B1C` | 올리브 그린 (마퀴 배경) |
| `brandOlive` | `#B3A756` | 브랜드 소개 섹션 배경 |

## 애니메이션 키프레임 (index.css)

| 이름 | 용도 |
|------|------|
| `marquee` | 마퀴 밴드 좌→우 무한 스크롤 |
| `float` | 양·브랜드 소개 등의 부유 효과 |
| `floatStar` | 히어로 별 부유 효과 |
| `baa-pop` | 말풍선 팝업 애니메이션 |
| `sheep-idle-wobble` | 숨은 양 미발견 상태 흔들림 |
| `sheep-bounce` | 숨은 양 클릭 시 튕기기 |
| `toast-in` | 발견 토스트 슬라이드업 |
| `slideUp` / `fadeOut` | 힌트 팝업 등장·사라짐 |
| `tooltip-in` | 헤더 아이콘 툴팁 |
| `drawer-in` | 사이드 드로어 슬라이드인 |
| `overlay-in` | 모달·드로어 오버레이 페이드인 |
| `modal-in` | 검색 모달 스프링 팝인 |
| `stamp-in` | 이벤트 스탬프 등장 |

## localStorage 사용

| 키 | 내용 |
|----|------|
| `yul12_sheep_found` | 발견한 숨은 양 ID 배열 `SheepId[]` |
| `yul12_sheep_hint_seen` | 힌트 팝업 표시 여부 `"1"` |
| `yul12_reviews` | Lucky Stories 후기 배열 |

## 폰트

`Noto Sans KR` (Google Fonts) — `src/index.css` 상단 `@import`로 로드.  
모든 텍스트 컴포넌트에서 `fontFamily: 'Noto Sans KR'` 인라인 스타일로 적용.
