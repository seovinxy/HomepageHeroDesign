import { useState } from 'react';
import { HiddenSheep } from '@/HiddenSheep';
import prodImg1 from '@/assets/product-5.png';  // 액막이 인형
import prodImg2 from '@/assets/product-8.png';  // 벽걸이 캘린더
import prodImg3 from '@/assets/product-1.png';  // 탁상형 캘린더
import prodImg4 from '@/assets/product-6.png';  // 마스킹테이프
import prodImg5 from '@/assets/product-2.png';  // 봉투
import prodImg7 from '@/assets/product-4.png';  // 쿠키 세트
import prodImg8 from '@/assets/product-7.png';  // 캔들
import prodImg9 from '@/assets/product-3.png';  // 비누
import prodImg6 from '@/assets/product-6-card.png';  // 카드

const C = {
  creamBg: '#F3ECD5',
  creamSoft: '#EFE6C8',
  cardPaper: '#FBF7E9',
  inkBrown: '#37291C',
  sealRed: '#AB0A00',
  berry: '#A6403C',
  olive: '#494B1C',
  mustard: '#B6A847',
  border: 'rgba(55,41,28,0.18)',
  borderStrong: 'rgba(55,41,28,0.28)',
};

/* ── Product data ── */
export const PRODUCTS = [
  {
    id: 1,
    name: '액막이 인형',
    sub: 'Lucky Talisman Doll',
    price: 32000,
    category: '인형',
    badge: 'BEST' as const,
    color: '#C04040',
    colorName: '적 · 赤',
    image: prodImg1,
  },
  {
    id: 2,
    name: '벽걸이 캘린더',
    sub: 'Wall Calendar 2027',
    price: 18000,
    category: '지류',
    badge: 'NEW' as const,
    color: '#2B5BA1',
    colorName: '청 · 靑',
    image: prodImg2,
  },
  {
    id: 3,
    name: '탁상형 캘린더',
    sub: 'Desk Calendar 2027',
    price: 14000,
    category: '지류',
    badge: null,
    color: '#B6A847',
    colorName: '황 · 黃',
    image: prodImg3,
  },
  {
    id: 4,
    name: '마스킹테이프',
    sub: 'Masking Tape',
    price: 6000,
    category: '지류',
    badge: null,
    color: '#AB0A00',
    colorName: '적 · 赤',
    image: prodImg4,
  },
  {
    id: 5,
    name: '봉투',
    sub: 'Envelope Set',
    price: 4500,
    category: '지류',
    badge: null,
    color: '#D6CDB8',
    colorName: '백 · 白',
    image: prodImg5,
  },
  {
    id: 6,
    name: '카드',
    sub: 'Greeting Card',
    price: 5500,
    category: '지류',
    badge: 'NEW' as const,
    color: '#2B5BA1',
    colorName: '청 · 靑',
    image: prodImg6,
  },
  {
    id: 7,
    name: '쿠키 세트',
    sub: 'Lucky Cookie Set',
    price: 16000,
    category: '식품',
    badge: 'BEST' as const,
    color: '#C8A847',
    colorName: '황 · 黃',
    image: prodImg7,
  },
  {
    id: 8,
    name: '캔들',
    sub: 'Soy Wax Candle',
    price: 22000,
    category: '리빙',
    badge: null,
    color: '#37291C',
    colorName: '흑 · 黑',
    image: prodImg8,
  },
  {
    id: 9,
    name: '비누',
    sub: 'Handcraft Soap',
    price: 9000,
    category: '리빙',
    badge: null,
    color: '#D6CDB8',
    colorName: '백 · 白',
    image: prodImg9,
  },
];

type Badge = 'BEST' | 'NEW' | null;
type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name';

const CATEGORIES = ['ALL', '인형', '지류', '식품', '리빙'];
const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: '기본순', value: 'default' },
  { label: '가격 낮은순', value: 'price-asc' },
  { label: '가격 높은순', value: 'price-desc' },
  { label: '이름순', value: 'name' },
];

function formatKRW(n: number) {
  return '₩ ' + n.toLocaleString('ko-KR');
}

/* ── Badge pill ── */
function BadgePill({ badge }: { badge: Badge }) {
  if (!badge) return null;
  const isBest = badge === 'BEST';
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: isBest ? C.sealRed : C.olive,
        color: 'white',
        fontFamily: 'Noto Sans KR',
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: '0.18em',
        padding: '4px 10px',
        borderRadius: 999,
        boxShadow: '1px 2px 0 rgba(55,41,28,0.2)',
        zIndex: 2,
      }}
    >
      {badge}
    </div>
  );
}

/* ── Wishlist heart ── */
function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? C.sealRed : 'none'} stroke={filled ? C.sealRed : C.inkBrown} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ── Thumbnail square ── */
function Thumbnail({
  product,
  hovered,
}: {
  product: (typeof PRODUCTS)[0];
  hovered: boolean;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: product.color,
        flexShrink: 0,
        transition: 'transform 0.35s ease',
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
      }}
    >
      {/* Inner texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom, transparent 55%, rgba(55,41,28,0.28) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Product image or color placeholder */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          draggable={false}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" opacity="0.35">
            <circle cx="28" cy="28" r="24" stroke="white" strokeWidth="1" strokeDasharray="4 5" />
            <circle cx="28" cy="28" r="3" fill="white" />
            <line x1="28" y1="4" x2="28" y2="52" stroke="white" strokeWidth="0.6" opacity="0.5" />
            <line x1="4" y1="28" x2="52" y2="28" stroke="white" strokeWidth="0.6" opacity="0.5" />
          </svg>
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
            {product.colorName}
          </span>
        </div>
      )}

      {/* Badge */}
      <BadgePill badge={product.badge} />

      {/* Quick add on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        <button
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: C.inkBrown,
            border: 'none',
            borderRadius: 999,
            padding: '9px 0',
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
            letterSpacing: '-0.01em',
            boxShadow: '0 2px 8px rgba(55,41,28,0.15)',
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product, onClick }: { product: (typeof PRODUCTS)[0]; onClick?: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick?.(product.id)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        backgroundColor: C.cardPaper,
        border: `1px solid ${hovered ? C.borderStrong : C.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(55,41,28,0.14), 0 2px 8px rgba(55,41,28,0.08)'
          : '0 2px 8px rgba(55,41,28,0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s',
      }}
    >
      {/* Thumbnail wrapper */}
      <div style={{ position: 'relative' }}>
        <Thumbnail product={product} hovered={hovered} />

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(55,41,28,0.14)',
            opacity: hovered || wishlisted ? 1 : 0,
            transform: hovered || wishlisted ? 'scale(1)' : 'scale(0.75)',
            transition: 'opacity 0.2s, transform 0.2s',
            zIndex: 3,
          }}
        >
          <Heart filled={wishlisted} />
        </button>
      </div>

      {/* Meta body */}
      <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 5, flexGrow: 1 }}>
        {/* Category label */}
        <span
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: C.sealRed,
            textTransform: 'uppercase' as const,
          }}
        >
          {product.category}
        </span>

        {/* Name */}
        <div
          style={{
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            fontSize: 15,
            color: C.inkBrown,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </div>

        {/* Sub name */}
        <div
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 11,
            color: C.inkBrown,
            opacity: 0.42,
            letterSpacing: '0.04em',
          }}
        >
          {product.sub}
        </div>

        {/* Price row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 16,
              fontWeight: 700,
              color: C.sealRed,
              letterSpacing: '-0.01em',
            }}
          >
            {formatKRW(product.price)}
          </span>

          {/* Arrow */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: `1.5px solid ${C.borderStrong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
              transition: 'opacity 0.2s, transform 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M2 12 L12 2 M5 2 H12 V9" stroke={C.inkBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Category filter tabs ── */
function CategoryTabs({ active, onSelect }: { active: string; onSelect: (c: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: isActive ? 'white' : C.inkBrown,
              backgroundColor: isActive ? C.inkBrown : 'transparent',
              border: `1.5px solid ${isActive ? C.inkBrown : C.border}`,
              borderRadius: 999,
              padding: '8px 18px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap' as const,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown;
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.creamSoft;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

/* ── Sort select ── */
function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          fontFamily: 'Noto Sans KR',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.18em',
          color: C.inkBrown,
          backgroundColor: C.cardPaper,
          border: `1.5px solid ${C.border}`,
          borderRadius: 999,
          padding: '8px 36px 8px 16px',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {/* chevron */}
      <div
        style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke={C.inkBrown} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ── Badge filter pills ── */
function BadgeFilters({
  active,
  onToggle,
}: {
  active: Set<string>;
  onToggle: (b: string) => void;
}) {
  const badges = ['BEST', 'NEW'];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {badges.map((b) => {
        const on = active.has(b);
        const col = b === 'BEST' ? C.sealRed : C.olive;
        return (
          <button
            key={b}
            onClick={() => onToggle(b)}
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: on ? 'white' : col,
              backgroundColor: on ? col : 'transparent',
              border: `1.5px solid ${col}`,
              borderRadius: 999,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            {b}
          </button>
        );
      })}
    </div>
  );
}

/* ── Results summary ── */
function ResultsSummary({ count, total }: { count: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 13,
          fontWeight: 700,
          color: C.inkBrown,
        }}
      >
        {count}
      </span>
      <span
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 12,
          color: C.inkBrown,
          opacity: 0.4,
          letterSpacing: '0.04em',
        }}
      >
        / {total} pieces
      </span>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div
      style={{
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 0',
        gap: 16,
        opacity: 0.45,
      }}
    >
      <span style={{ fontSize: 40 }}>🐑</span>
      <p style={{ fontFamily: 'Noto Sans KR', fontSize: 14, letterSpacing: '0.18em', color: C.inkBrown, margin: 0 }}>
        No products found
      </p>
    </div>
  );
}

/* ── View toggle ── */
function ViewToggle({ grid, onToggle }: { grid: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={grid ? 'Switch to list view' : 'Switch to grid view'}
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        border: `1.5px solid ${C.border}`,
        backgroundColor: C.cardPaper,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: C.inkBrown,
        flexShrink: 0,
        transition: 'border-color 0.18s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = C.border)}
    >
      {grid ? (
        /* list icon */
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <line x1="1" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        /* grid icon */
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </button>
  );
}

/* ── List row product ── */
function ProductRow({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr auto',
        alignItems: 'center',
        gap: 20,
        padding: '18px 20px',
        backgroundColor: hovered ? C.cardPaper : 'transparent',
        borderRadius: 14,
        border: `1px solid ${hovered ? C.borderStrong : C.border}`,
        cursor: 'pointer',
        transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? `3px 4px 0 ${C.border}` : 'none',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          backgroundColor: product.color,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {product.image && (
          <img src={product.image} alt={product.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
        )}
        {!product.image && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: 4,
              backgroundColor: product.badge === 'BEST' ? C.sealRed : C.olive,
              color: 'white',
              fontFamily: 'Noto Sans KR',
              fontSize: 7,
              fontWeight: 700,
              letterSpacing: '0.18em',
              padding: '2px 6px',
              borderRadius: 999,
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Meta */}
      <div>
        <span style={{ fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>{product.category}</span>
        <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 15, color: C.inkBrown, letterSpacing: '-0.015em', marginTop: 2 }}>{product.name}</div>
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, opacity: 0.4 }}>{product.sub}</div>
      </div>

      {/* Right: price + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <span style={{ fontFamily: 'Noto Sans KR', fontSize: 15, fontWeight: 700, color: C.inkBrown }}>{formatKRW(product.price)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
        >
          <Heart filled={wishlisted} />
        </button>
        <button
          style={{
            backgroundColor: C.sealRed,
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '8px 18px',
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
            whiteSpace: 'nowrap' as const,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          담기
        </button>
      </div>
    </article>
  );
}

/* ── Main Shop Page ── */
export default function ShopPage({ onProductClick }: { onProductClick?: (id: number) => void }) {
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState<SortKey>('default');
  const [badgeFilter, setBadgeFilter] = useState<Set<string>>(new Set());
  const [gridView, setGridView] = useState(true);

  const toggleBadge = (b: string) => {
    setBadgeFilter((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b); else next.add(b);
      return next;
    });
  };

  /* filter */
  let shown = PRODUCTS.filter((p) => {
    if (category !== 'ALL' && p.category !== category) return false;
    if (badgeFilter.size > 0 && !badgeFilter.has(p.badge ?? '')) return false;
    return true;
  });

  /* sort */
  shown = [...shown].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'name') return a.name.localeCompare(b.name, 'ko');
    return a.id - b.id;
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>

      {/* ── Page header ── */}
      <div
        style={{
          padding: '72px 0 48px',
          borderBottom: `1px solid ${C.border}`,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'end',
          gap: 32,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 20, height: 2, backgroundColor: C.sealRed }} />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>
              YUL:12 · 2027 RED SHEEP EDITION
            </span>
          </div>
          <h1 className="display-title display-title--latin"
            style={{
              fontSize: 'clamp(36px, 5vw, 68px)',
              color: C.inkBrown,
              margin: 0,
            }}
          >
            SHOP
            <br />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: '0.58em', opacity: 0.35, letterSpacing: '0.01em' }}>
              컬렉션 전체
            </span>
          </h1>
        </div>

        {/* Stat pills */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          {/* Hidden sheep — perched on top of the first pill */}
          <HiddenSheep id="shop" style={{ position: 'absolute', top: -27, right: 18, width: 28, height: 28 }} />
          {[
            { label: '총 상품', value: `${PRODUCTS.length}` },
            { label: 'BEST', value: String(PRODUCTS.filter((p) => p.badge === 'BEST').length) },
            { label: 'NEW', value: String(PRODUCTS.filter((p) => p.badge === 'NEW').length) },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 16px',
                backgroundColor: C.cardPaper,
                border: `1px solid ${C.border}`,
                borderRadius: 999,
              }}
            >
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>{s.label}</span>
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 14, fontWeight: 500, color: C.inkBrown }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div
        style={{
          padding: '24px 0',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: categories + badge pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <CategoryTabs active={category} onSelect={setCategory} />
          <div style={{ width: 1, height: 24, backgroundColor: C.border, flexShrink: 0 }} />
          <BadgeFilters active={badgeFilter} onToggle={toggleBadge} />
        </div>

        {/* Right: sort + view toggle + count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ResultsSummary count={shown.length} total={PRODUCTS.length} />
          <SortSelect value={sort} onChange={setSort} />
          <ViewToggle grid={gridView} onToggle={() => setGridView(!gridView)} />
        </div>
      </div>

      {/* ── Product grid / list ── */}
      {gridView ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '40px 28px',
            paddingTop: 48,
          }}
        >
          {shown.length === 0 ? <EmptyState /> : shown.map((p) => <ProductCard key={p.id} product={p} onClick={(id) => onProductClick?.(id)} />)}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingTop: 24,
          }}
        >
          {shown.length === 0 ? <EmptyState /> : shown.map((p) => <ProductRow key={p.id} product={p} />)}
        </div>
      )}

      {/* ── Bottom CTA ── */}
      {shown.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            paddingTop: 72,
            borderTop: `1px solid ${C.border}`,
            marginTop: 72,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ height: 1, flex: 1, backgroundColor: C.border }} />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.35 }}>
              ✶ YUL:12 · 2027 丁未年
            </span>
            <div style={{ height: 1, flex: 1, backgroundColor: C.border }} />
          </div>
        </div>
      )}
    </div>
  );
}
