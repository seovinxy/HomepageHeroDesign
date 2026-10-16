import { useState } from 'react';
import { HiddenSheep } from '@/HiddenSheep';
import img1 from '@/assets/product-5.png';  // 액막이 인형
import img2 from '@/assets/product-8.png';  // 벽걸이 캘린더
import img3 from '@/assets/product-1.png';  // 탁상형 캘린더
import img4 from '@/assets/product-6.png';  // 마스킹테이프
import img5 from '@/assets/product-2.png';  // 봉투
import img6 from '@/assets/product-6-card.png';  // 카드
import img7 from '@/assets/product-4.png';  // 쿠키 세트
import img8 from '@/assets/product-7.png';  // 캔들
import img9 from '@/assets/product-3.png';  // 비누

const C = {
  creamBg: '#F3ECD5',
  creamSoft: '#EFE6C8',
  cardPaper: '#FBF7E9',
  inkBrown: '#37291C',
  sealRed: '#AB0A00',
  olive: '#494B1C',
  mustard: '#B6A847',
  border: 'rgba(55,41,28,0.18)',
  borderStrong: 'rgba(55,41,28,0.28)',
};

type Spec = { label: string; en: string; value: string };
type ProductDetail = {
  id: number;
  name: string;
  sub: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  badge: 'BEST' | 'NEW' | null;
  image: string;
  description: string;
  specs: Spec[];
  rating: number;
  reviewCount: number;
  options?: { label: string; values: string[] }[];
};

const CATALOG: ProductDetail[] = [
  {
    id: 1,
    name: '액막이 인형',
    sub: 'Lucky Talisman Doll',
    price: 32000,
    originalPrice: 38000,
    category: '인형',
    categorySlug: 'DOLL',
    badge: 'BEST',
    image: img1,
    description:
      '2027 정미년을 맞아 나쁜 기운을 막아줄 붉은 양 액막이 인형입니다. 오방색을 담아 수작업으로 제작한 귀여운 인형으로, 소중한 분께 드리는 행운의 선물로 안성맞춤입니다.',
    specs: [
      { label: '소재', en: 'Material', value: '면사 · 한지 원단 · 황동 고리' },
      { label: '크기', en: 'Size', value: '약 12cm (높이 기준)' },
      { label: '구성품', en: 'Includes', value: '액막이 인형 × 1, 별지 행운 카드' },
      { label: '색상', en: 'Colour', value: '오방색 혼합 — 율:12 2027 에디션' },
      { label: '원산지', en: 'Origin', value: '대한민국 수제 제작' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: 2,
    name: '벽걸이 캘린더',
    sub: 'Wall Calendar 2027',
    price: 18000,
    category: '지류',
    categorySlug: 'PAPER',
    badge: 'NEW',
    image: img2,
    description:
      '2027 정미년 붉은 양띠 일년을 함께할 벽걸이 캘린더입니다. 오방색과 열두 띠의 이야기를 담은 일러스트가 매월 새롭게 펼쳐집니다. 선물용으로도 인기 있는 율:12의 시그니처 아이템.',
    specs: [
      { label: '소재', en: 'Material', value: '고급 무광 아트지 180g' },
      { label: '크기', en: 'Size', value: 'A2 (420 × 594mm)' },
      { label: '구성품', en: 'Includes', value: '월별 캘린더 12장 + 금속 고리' },
      { label: '인쇄', en: 'Print', value: '4도 인쇄 + UV 부분 코팅' },
      { label: '원산지', en: 'Origin', value: '대한민국 제작' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.8,
    reviewCount: 84,
  },
  {
    id: 3,
    name: '탁상형 캘린더',
    sub: 'Desk Calendar 2027',
    price: 14000,
    category: '지류',
    categorySlug: 'PAPER',
    badge: null,
    image: img3,
    description:
      '책상 위에 올려두는 소형 탁상 캘린더입니다. 2027 정미년의 매월 운세와 절기 정보가 함께 담겨 있어 일상을 더 풍요롭게 만들어드립니다.',
    specs: [
      { label: '소재', en: 'Material', value: '고급 무광 아트지 170g' },
      { label: '크기', en: 'Size', value: 'A5 (148 × 210mm)' },
      { label: '구성품', en: 'Includes', value: '월별 캘린더 12장 + 탁상 거치대' },
      { label: '인쇄', en: 'Print', value: '4도 인쇄' },
      { label: '원산지', en: 'Origin', value: '대한민국 제작' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.7,
    reviewCount: 52,
  },
  {
    id: 4,
    name: '마스킹테이프',
    sub: 'Masking Tape',
    price: 6000,
    category: '지류',
    categorySlug: 'PAPER',
    badge: null,
    image: img4,
    description:
      '율:12 오방색 패턴이 담긴 마스킹테이프 세트입니다. 다이어리, 편지, 선물 포장 등 다양하게 활용할 수 있으며 재접착이 가능해 실용적입니다.',
    specs: [
      { label: '소재', en: 'Material', value: '화지(和紙) 기반 마스킹 테이프' },
      { label: '규격', en: 'Size', value: '폭 15mm × 길이 10m' },
      { label: '구성품', en: 'Includes', value: '3가지 패턴 각 1롤 세트' },
      { label: '특징', en: 'Feature', value: '재접착 가능 · 찢기 용이' },
      { label: '원산지', en: 'Origin', value: '대한민국 제작' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.6,
    reviewCount: 39,
  },
  {
    id: 5,
    name: '봉투',
    sub: 'Envelope Set',
    price: 4500,
    category: '지류',
    categorySlug: 'PAPER',
    badge: null,
    image: img5,
    description:
      '세뱃돈, 용돈, 소원지를 담는 특별한 율:12 봉투입니다. 오방색 디자인 5종으로 구성되어 소중한 마음을 색깔로 전할 수 있습니다.',
    specs: [
      { label: '소재', en: 'Material', value: '고급 한지 원단' },
      { label: '크기', en: 'Size', value: '장형 22 × 10.5cm' },
      { label: '구성품', en: 'Includes', value: '오방색 봉투 5장 세트 (각 색상 1장)' },
      { label: '특징', en: 'Feature', value: '접착 없음 · 전통 봉투 형태' },
      { label: '원산지', en: 'Origin', value: '대한민국 제작' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: 6,
    name: '카드',
    sub: 'Greeting Card',
    price: 5500,
    category: '지류',
    categorySlug: 'PAPER',
    badge: 'NEW',
    image: img6,
    description:
      '정미년 새해 인사를 전하는 율:12 그리팅 카드입니다. 붉은 양띠의 기운을 담은 일러스트와 함께 마음을 전해보세요. 봉투가 함께 포함됩니다.',
    specs: [
      { label: '소재', en: 'Material', value: '고급 매트 코팅지 350g' },
      { label: '크기', en: 'Size', value: '엽서형 148 × 105mm (A6)' },
      { label: '구성품', en: 'Includes', value: '그리팅 카드 × 1 + 봉투 포함' },
      { label: '인쇄', en: 'Print', value: '4도 인쇄 + 금박 포인트' },
      { label: '원산지', en: 'Origin', value: '대한민국 제작' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.8,
    reviewCount: 61,
  },
  {
    id: 7,
    name: '쿠키 세트',
    sub: 'Lucky Cookie Set',
    price: 16000,
    originalPrice: 20000,
    category: '식품',
    categorySlug: 'FOOD',
    badge: 'BEST',
    image: img7,
    description:
      '오방색으로 빚은 새해 행운 쿠키 세트입니다. 버터향 가득한 수제 쿠키 12개가 오방색 디자인 박스에 담겨, 먹는 것만으로도 새해 운이 피어납니다.',
    specs: [
      { label: '원재료', en: 'Ingredients', value: '버터, 밀가루, 설탕, 계란, 소금' },
      { label: '용량', en: 'Net Weight', value: '12개입 · 약 300g' },
      { label: '구성품', en: 'Includes', value: '오방색 쿠키 12개 + 선물 박스' },
      { label: '유통기한', en: 'Best Before', value: '제조일로부터 3개월' },
      { label: '알레르기', en: 'Allergens', value: '밀, 계란, 유제품 포함' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송 (상온 보관)' },
    ],
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 8,
    name: '캔들',
    sub: 'Soy Wax Candle',
    price: 22000,
    category: '리빙',
    categorySlug: 'LIVING',
    badge: null,
    image: img8,
    description:
      '100% 소이 왁스로 만든 율:12 향초입니다. 새해의 고요한 새벽 숲 향기를 담아, 공간에 행운과 평온함을 더합니다. 면 심지로 그을음 없이 은은하게 타오릅니다.',
    specs: [
      { label: '소재', en: 'Material', value: '100% 소이 왁스 · 면 심지' },
      { label: '용량', en: 'Volume', value: '200g / 연소 시간 약 40시간' },
      { label: '구성품', en: 'Includes', value: '캔들 × 1 + 성냥 + 한지 포장' },
      { label: '원산지', en: 'Origin', value: '대한민국 수제 제작' },
      { label: '주의사항', en: 'Note', value: '직사광선 피해 서늘한 곳 보관' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.8,
    reviewCount: 76,
    options: [{ label: '향', values: ['청(靑) 새벽 숲', '백(白) 백단향', '황(黃) 감귤꽃'] }],
  },
  {
    id: 9,
    name: '비누',
    sub: 'Handcraft Soap',
    price: 9000,
    category: '리빙',
    categorySlug: 'LIVING',
    badge: null,
    image: img9,
    description:
      '식물성 글리세린 베이스로 만든 율:12 수제 비누입니다. 새해의 청정함을 담은 쑥과 국화 향으로 매일의 세안을 특별하게 만들어드립니다.',
    specs: [
      { label: '소재', en: 'Material', value: '식물성 글리세린 베이스 · 천연 향료' },
      { label: '용량', en: 'Net Weight', value: '90g' },
      { label: '구성품', en: 'Includes', value: '수제 비누 × 1 + 한지 포장' },
      { label: '원산지', en: 'Origin', value: '대한민국 수제 제작' },
      { label: '주의사항', en: 'Note', value: '사용 후 건조한 곳에 보관' },
      { label: '배송', en: 'Shipping', value: '2–3 영업일 내 발송' },
    ],
    rating: 4.7,
    reviewCount: 44,
    options: [{ label: '향', values: ['쑥 · 청(靑)', '국화 · 황(黃)'] }],
  },
];

/* ── Stars ── */
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i <= Math.round(rating) ? C.mustard : C.border}>
          <path d="M7 1l1.55 3.14L12 4.74l-2.5 2.43.59 3.43L7 9.06l-3.09 1.54.59-3.43L2 4.74l3.45-.6L7 1z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Quantity selector ── */
function QuantitySelector({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        style={{
          width: 38, height: 38,
          borderRadius: '999px 0 0 999px',
          border: `1.5px solid ${C.border}`, borderRight: 'none',
          backgroundColor: C.cardPaper, color: C.inkBrown,
          fontSize: 18, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = C.creamSoft)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = C.cardPaper)}
      >−</button>
      <div style={{
        width: 52, height: 38,
        border: `1.5px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Noto Sans KR', fontSize: 15, fontWeight: 700, color: C.inkBrown,
        backgroundColor: 'white',
      }}>{value}</div>
      <button
        onClick={() => onChange(value + 1)}
        style={{
          width: 38, height: 38,
          borderRadius: '0 999px 999px 0',
          border: `1.5px solid ${C.border}`, borderLeft: 'none',
          backgroundColor: C.cardPaper, color: C.inkBrown,
          fontSize: 18, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = C.creamSoft)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = C.cardPaper)}
      >+</button>
    </div>
  );
}

/* ── Pill option ── */
function PillOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'Noto Sans KR', fontWeight: active ? 700 : 400, fontSize: 13,
        color: active ? 'white' : C.inkBrown,
        backgroundColor: active ? C.inkBrown : 'transparent',
        border: `1.5px solid ${active ? C.inkBrown : C.border}`,
        borderRadius: 999, padding: '8px 20px', cursor: 'pointer', transition: 'all 0.18s',
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; }}
    >{label}</button>
  );
}

/* ── Spec table ── */
function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {specs.map((s, i) => (
        <div key={s.label} style={{
          display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16,
          padding: '12px 0',
          borderTop: i === 0 ? `1px solid ${C.border}` : undefined,
          borderBottom: `1px solid ${C.border}`,
          alignItems: 'baseline',
        }}>
          <div>
            <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 12, color: C.inkBrown }}>{s.label}</span>
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown, opacity: 0.38, marginLeft: 6, letterSpacing: '0.04em' }}>{s.en}</span>
          </div>
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 13, color: C.inkBrown, opacity: 0.72, lineHeight: 1.6 }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Product image viewer ── */
function ProductImageViewer({ image, name, color }: { image: string; name: string; color?: string }) {
  const [hovered, setHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Main image */}
      <div style={{ position: 'relative' }}>
      {/* Hidden sheep — sitting in the corner of the product photo */}
      <HiddenSheep id="product" style={{ position: 'absolute', left: 16, bottom: 16, width: 30, height: 30, zIndex: 3 }} />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setZoomed(false); }}
        onClick={() => setZoomed(!zoomed)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          backgroundColor: color ?? C.creamSoft,
          borderRadius: 20,
          border: `1.5px solid ${C.border}`,
          overflow: 'hidden',
          cursor: zoomed ? 'zoom-out' : 'zoom-in',
          boxShadow: `4px 6px 0 rgba(55,41,28,0.10)`,
        }}
      >
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.14) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <img
          src={image}
          alt={name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: zoomed ? 'scale(1.35)' : hovered ? 'scale(1.05)' : 'scale(1)',
            userSelect: 'none',
          }}
          draggable={false}
        />
        {/* Zoom hint */}
        {!zoomed && hovered && (
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            backgroundColor: 'rgba(55,41,28,0.65)',
            borderRadius: 999, padding: '5px 14px',
            display: 'flex', alignItems: 'center', gap: 6,
            pointerEvents: 'none',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, color: 'white', letterSpacing: '0.08em' }}>클릭해 확대</span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

/* ── Main Product Detail Page ── */
export default function ProductDetailPage({
  productId = 1,
  onBack,
}: {
  productId?: number;
  onBack?: () => void;
}) {
  const product = CATALOG.find((p) => p.id === productId) ?? CATALOG[0];

  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product.options?.forEach((opt) => { init[opt.label] = opt.values[0]; });
    return init;
  });

  // Reset option state when product changes
  const [lastProductId, setLastProductId] = useState(productId);
  if (lastProductId !== productId) {
    setLastProductId(productId);
    setQty(1);
    setAddedToCart(false);
    setWishlist(false);
    const init: Record<string, string> = {};
    product.options?.forEach((opt) => { init[opt.label] = opt.values[0]; });
    setSelectedOptions(init);
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 40, paddingBottom: 28 }}>
        {['SHOP', product.category, product.name].map((p, i, arr) => (
          <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: C.inkBrown, opacity: 0.3, fontSize: 12 }}>/</span>}
            <button
              onClick={i === 0 ? onBack : undefined}
              style={{
                fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.18em',
                color: i === arr.length - 1 ? C.inkBrown : C.sealRed,
                opacity: i === arr.length - 1 ? 0.55 : 1,
                fontWeight: i === arr.length - 1 ? 700 : 400,
                background: 'none', border: 'none',
                cursor: i < arr.length - 1 ? 'pointer' : 'default',
                padding: 0,
                textDecoration: i === 0 ? 'underline' : 'none',
                textDecorationColor: 'rgba(171,10,0,0.35)',
              }}
            >{p}</button>
          </span>
        ))}
      </nav>

      {/* ── Main 2-col layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start', marginBottom: 80 }}>

        {/* LEFT: image viewer */}
        <div style={{ position: 'sticky', top: 96 }}>
          <ProductImageViewer image={product.image} name={product.name} />
        </div>

        {/* RIGHT: product info */}
        <div style={{ paddingTop: 4 }}>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {product.badge && (
              <span style={{
                backgroundColor: product.badge === 'BEST' ? C.sealRed : C.olive,
                color: 'white', fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 500,
                letterSpacing: '0.18em', padding: '4px 12px', borderRadius: 999,
              }}>{product.badge}</span>
            )}
            <span style={{
              backgroundColor: 'transparent', color: C.sealRed,
              fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em',
              padding: '4px 12px', borderRadius: 999, border: `1.5px solid ${C.sealRed}`,
            }}>2027 LIMITED</span>
          </div>

          {/* Category */}
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed, marginBottom: 10 }}>
            {product.categorySlug}
          </div>

          {/* Name + hidden sheep */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 6px' }}>
            <h1 className="display-title" style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: C.inkBrown, margin: 0,
            }}>{product.name}</h1>
          </div>
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 14, color: C.inkBrown, opacity: 0.42, letterSpacing: '0.04em', marginBottom: 16 }}>
            {product.sub} · 丁未年 Edition
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'Noto Sans KR', fontSize: 14, lineHeight: 1.85,
            color: C.inkBrown, opacity: 0.68, margin: '0 0 16px',
          }}>{product.description}</p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <Stars rating={product.rating} />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.5 }}>
              {product.rating} ({product.reviewCount.toLocaleString('ko-KR')}개 리뷰)
            </span>
          </div>

          {/* Price */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 12,
            padding: '20px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
            marginBottom: 28,
          }}>
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 34, fontWeight: 700, color: C.inkBrown, letterSpacing: '-0.01em' }}>
              ₩ {product.price.toLocaleString('ko-KR')}
            </span>
            {product.originalPrice && (
              <>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 16, color: C.inkBrown, opacity: 0.35, textDecoration: 'line-through', letterSpacing: '0.02em' }}>
                  ₩ {product.originalPrice.toLocaleString('ko-KR')}
                </span>
                <span style={{ backgroundColor: C.sealRed, color: 'white', fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.18em' }}>
                  −{discountPct}%
                </span>
              </>
            )}
          </div>

          {/* Dynamic options (캔들, 비누 등) */}
          {product.options && product.options.map((opt) => (
            <div key={opt.label} style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13, color: C.inkBrown, marginBottom: 12 }}>
                {opt.label} <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, opacity: 0.42, fontWeight: 400 }}>
                  {selectedOptions[opt.label]}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {opt.values.map((v) => (
                  <PillOption
                    key={v} label={v}
                    active={selectedOptions[opt.label] === v}
                    onClick={() => setSelectedOptions((prev) => ({ ...prev, [opt.label]: v }))}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Spec table */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13, color: C.inkBrown, marginBottom: 14 }}>
              상품 정보 <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, opacity: 0.42, fontWeight: 400 }}>Specifications</span>
            </div>
            <SpecTable specs={product.specs} />
          </div>

          {/* Quantity + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13, color: C.inkBrown, flexShrink: 0 }}>수량</span>
              <QuantitySelector value={qty} onChange={setQty} />
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 13, color: C.inkBrown, opacity: 0.38, marginLeft: 4 }}>
                × {(product.price * qty).toLocaleString('ko-KR')}원
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%', backgroundColor: addedToCart ? C.olive : C.sealRed, color: 'white',
                border: 'none', borderRadius: 999, padding: '18px 0',
                fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 16, cursor: 'pointer',
                letterSpacing: '-0.01em', boxShadow: `3px 4px 0 rgba(55,41,28,0.22)`,
                transition: 'background-color 0.3s, transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!addedToCart) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `4px 6px 0 rgba(55,41,28,0.22)`;
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `3px 4px 0 rgba(55,41,28,0.22)`;
              }}
            >
              {addedToCart ? '✓ 담겼습니다!' : '🛒 장바구니 담기'}
            </button>

            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{
                flex: 1, backgroundColor: C.inkBrown, color: 'white',
                border: 'none', borderRadius: 999, padding: '14px 0',
                fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                letterSpacing: '-0.01em', boxShadow: `2px 3px 0 rgba(55,41,28,0.2)`,
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.8')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
              >바로 구매하기</button>
              <button
                onClick={() => setWishlist(!wishlist)}
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: `1.5px solid ${wishlist ? C.sealRed : C.border}`,
                  backgroundColor: wishlist ? 'rgba(171,10,0,0.06)' : C.cardPaper,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill={wishlist ? C.sealRed : 'none'}
                  stroke={wishlist ? C.sealRed : C.inkBrown}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Shipping note */}
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            padding: '16px 18px', backgroundColor: C.creamSoft,
            borderRadius: 12, border: `1px solid ${C.border}`, marginTop: 20,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.65 }}>
              오늘 주문 시 <strong style={{ opacity: 1 }}>2–3 영업일</strong> 내 도착 · 50,000원 이상 무료 배송
            </span>
          </div>
        </div>
      </div>

      {/* ── Related products strip ── */}
      <section style={{ paddingTop: 64, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 24, height: 2, backgroundColor: C.sealRed }} />
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>
            RELATED ITEMS
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {CATALOG.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
            <div key={p.id} style={{
              backgroundColor: C.cardPaper, border: `1px solid ${C.border}`,
              borderRadius: 14, overflow: 'hidden', cursor: 'default',
            }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: C.creamSoft, overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontFamily: 'Noto Sans KR', fontSize: 13, fontWeight: 700, color: C.inkBrown, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: 'Noto Sans KR', fontSize: 13, fontWeight: 700, color: C.sealRed }}>₩ {p.price.toLocaleString('ko-KR')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
