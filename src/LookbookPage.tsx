import { useState, useRef, useEffect } from 'react';

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
  borderStrong: 'rgba(55,41,28,0.32)',
};

/* ── Products ── */
const PRODUCTS = [
  {
    id: 1,
    name: '양 복주머니 세트',
    sub: 'Sheep Lucky Pouch Set',
    price: '₩ 68,000',
    tag: 'GIFT SET',
    quote: '새해의 복이\n손 안에 가득',
    quoteEn: 'Fortune fills your palms at the new year',
    color: C.berry,
    aspect: 'tall',   // tall portrait
  },
  {
    id: 2,
    name: '오방색 담요',
    sub: 'Obangsaek Blanket',
    price: '₩ 124,000',
    tag: 'HOME',
    quote: '다섯 빛깔의\n온기를 담아',
    quoteEn: 'Wrapped in the warmth of five sacred hues',
    color: C.mustard,
    aspect: 'wide',
  },
  {
    id: 3,
    name: '붉은 양 캔들',
    sub: 'Red Sheep Candle',
    price: '₩ 42,000',
    tag: 'LIVING',
    quote: '불꽃 하나에\n소원을 담다',
    quoteEn: 'One flame holds a thousand wishes',
    color: C.sealRed,
    aspect: 'square',
  },
  {
    id: 4,
    name: '십이지 노트북',
    sub: 'Zodiac Notebook',
    price: '₩ 28,000',
    tag: 'STATIONERY',
    quote: '당신의 이야기가\n새해를 채운다',
    quoteEn: 'Your story fills the new year',
    color: C.olive,
    aspect: 'square',
  },
  {
    id: 5,
    name: '율:12 티 세트',
    sub: 'YUL:12 Tea Set',
    price: '₩ 96,000',
    tag: 'GIFT SET',
    quote: '한 모금에\n행운이 깃들다',
    quoteEn: 'Luck seeps in with every sip',
    color: '#5A7A6A',
    aspect: 'tall',
  },
  {
    id: 6,
    name: '전통 보자기',
    sub: 'Traditional Bojagi Wrap',
    price: '₩ 54,000',
    tag: 'WRAPPING',
    quote: '마음을 감싸는\n전통의 결',
    quoteEn: 'Traditional fabric that wraps the heart',
    color: C.berry,
    aspect: 'wide',
  },
  {
    id: 7,
    name: '행운 향주머니',
    sub: 'Lucky Sachet',
    price: '₩ 22,000',
    tag: 'LIVING',
    quote: '향기에 실어\n보내는 마음',
    quoteEn: 'Sending hearts on the wings of fragrance',
    color: C.mustard,
    aspect: 'square',
  },
  {
    id: 8,
    name: '丁未年 달력',
    sub: '2027 Calendar',
    price: '₩ 36,000',
    tag: 'STATIONERY',
    quote: '열두 달의\n약속을 나누다',
    quoteEn: 'Sharing the promise of twelve months',
    color: C.olive,
    aspect: 'wide',
  },
];

/* ── Image placeholder ── */
function ImagePlaceholder({
  color,
  tag,
  children,
  hovered,
}: {
  color: string;
  tag: string;
  children?: React.ReactNode;
  hovered: boolean;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: C.cardPaper,
        border: `1.5px dashed ${C.borderStrong}`,
        borderRadius: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Tinted overlay on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color,
          opacity: hovered ? 0.08 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Corner marks */}
      {[
        { top: 10, left: 10 },
        { top: 10, right: 10 },
        { bottom: 10, left: 10 },
        { bottom: 10, right: 10 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: 12,
            height: 12,
            borderTop: i < 2 ? `1.5px solid ${C.borderStrong}` : undefined,
            borderBottom: i >= 2 ? `1.5px solid ${C.borderStrong}` : undefined,
            borderLeft: i % 2 === 0 ? `1.5px solid ${C.borderStrong}` : undefined,
            borderRight: i % 2 === 1 ? `1.5px solid ${C.borderStrong}` : undefined,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Tag pill */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          backgroundColor: color,
          color: 'white',
          fontFamily: 'Noto Sans KR',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.18em',
          padding: '4px 10px',
          borderRadius: 999,
        }}
      >
        {tag}
      </div>

      {/* Center IMAGE text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: 0.28,
        }}
      >
        {/* Cross-hair icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke={C.inkBrown} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="16" y1="4" x2="16" y2="28" stroke={C.inkBrown} strokeWidth="0.75" />
          <line x1="4" y1="16" x2="28" y2="16" stroke={C.inkBrown} strokeWidth="0.75" />
          <circle cx="16" cy="16" r="2.5" fill={C.inkBrown} />
        </svg>
        <span
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: C.inkBrown,
            fontWeight: 600,
          }}
        >
          IMAGE
        </span>
      </div>

      {children}
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({
  product,
  quotePosition = 'bottom',
  showQuoteOverlay = false,
  style: cardStyle,
}: {
  product: (typeof PRODUCTS)[0];
  quotePosition?: 'bottom' | 'top' | 'side';
  showQuoteOverlay?: boolean;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
        cursor: 'pointer',
        ...cardStyle,
      }}
    >
      {/* Image frame */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: hovered
            ? `5px 8px 0 rgba(55,41,28,0.14)`
            : `3px 5px 0 rgba(55,41,28,0.1)`,
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        }}
      >
        <ImagePlaceholder color={product.color} tag={product.tag} hovered={hovered}>
          {/* Overlaid quote on hover */}
          {showQuoteOverlay && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 20px',
                background: 'linear-gradient(to top, rgba(55,41,28,0.55) 0%, transparent 100%)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 700,
                  fontSize: 13,
                  color: 'white',
                  margin: 0,
                  lineHeight: 1.7,
                  whiteSpace: 'pre-line',
                }}
              >
                {product.quote}
              </p>
            </div>
          )}
        </ImagePlaceholder>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div
            style={{
              fontFamily: 'Noto Sans KR',
              fontWeight: 700,
              fontSize: 15,
              color: C.inkBrown,
              letterSpacing: '-0.015em',
              lineHeight: 1.3,
              marginBottom: 3,
              transition: 'color 0.2s',
              ...(hovered ? { color: product.color } : {}),
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 11,
              color: C.inkBrown,
              opacity: 0.45,
              letterSpacing: '0.04em',
            }}
          >
            {product.sub}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 13,
            fontWeight: 600,
            color: C.inkBrown,
            letterSpacing: '0.04em',
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {product.price}
        </div>
      </div>
    </div>
  );
}

/* ── Editorial quote strip ── */
function QuoteStrip({ text, textEn }: { text: string; textEn: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: '52px 0',
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 48,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          width: 3,
          alignSelf: 'stretch',
          backgroundColor: C.sealRed,
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <p className="display-title"
          style={{
            fontSize: 'clamp(22px, 3.2vw, 40px)',
            color: C.inkBrown,
            margin: '0 0 10px',
          }}
        >
          {text}
        </p>
        <p
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 14,
            color: C.inkBrown,
            opacity: 0.45,
            margin: 0,
            letterSpacing: '0.04em',
          }}
        >
          {textEn}
        </p>
      </div>
      <div
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 80,
          color: C.sealRed,
          opacity: 0.12,
          lineHeight: 1,
          flexShrink: 0,
          userSelect: 'none',
          alignSelf: 'flex-start',
        }}
      >
        ✶
      </div>
    </div>
  );
}

/* ── Inline poetic text block ── */
function PoeticBlock({ quote, quoteEn, align = 'left' }: { quote: string; quoteEn: string; align?: 'left' | 'right' | 'center' }) {
  return (
    <div style={{ textAlign: align, padding: '24px 0' }}>
      <p
        style={{
          fontFamily: 'Noto Sans KR',
          fontWeight: 700,
          fontSize: 16,
          color: C.inkBrown,
          lineHeight: 1.7,
          margin: '0 0 6px',
          whiteSpace: 'pre-line',
          opacity: 0.8,
        }}
      >
        {quote}
      </p>
      <p
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 12,
          color: C.inkBrown,
          opacity: 0.4,
          margin: 0,
          letterSpacing: '0.04em',
        }}
      >
        {quoteEn}
      </p>
    </div>
  );
}

/* ── Section eyebrow ── */
function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 20, height: 2, backgroundColor: C.sealRed }} />
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
        {label}
      </span>
    </div>
  );
}

/* ── Filter bar ── */
const FILTERS = ['ALL', 'GIFT SET', 'HOME', 'LIVING', 'STATIONERY', 'WRAPPING'];

function FilterBar({ active, onSelect }: { active: string; onSelect: (f: string) => void }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            onClick={() => onSelect(f)}
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: isActive ? 'white' : C.inkBrown,
              backgroundColor: isActive ? C.inkBrown : 'transparent',
              border: `1.5px solid ${isActive ? C.inkBrown : C.border}`,
              borderRadius: 999,
              padding: '7px 16px',
              cursor: 'pointer',
              transition: 'all 0.2s',
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
            {f}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main Lookbook Page ── */
export default function LookbookPage() {
  const [filter, setFilter] = useState('ALL');

  const visible = filter === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.tag === filter);

  const [p1, p2, p3, p4, p5, p6, p7, p8] = PRODUCTS;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>

      {/* ── Page header ── */}
      <div
        style={{
          padding: '72px 0 56px',
          borderBottom: `1px solid ${C.border}`,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'end',
          gap: 32,
        }}
      >
        <div>
          <Eyebrow label="2027 COLLECTION · 붉은 양의 해" />
          <h1 className="display-title"
            style={{
              fontSize: 'clamp(38px, 5.5vw, 76px)',
              color: C.inkBrown,
              margin: '14px 0 0',
            }}
          >
            룩북
            <br />
            <span
              style={{
                fontFamily: 'Noto Sans KR',
                fontWeight: 700,
                fontSize: '0.62em',
                letterSpacing: '0.01em',
                color: C.inkBrown,
                opacity: 0.4,
              }}
            >
              Lookbook
            </span>
          </h1>
        </div>

        {/* Issue badge */}
        <div
          style={{
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            padding: '18px 24px',
            backgroundColor: C.cardPaper,
            boxShadow: `3px 4px 0 ${C.border}`,
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 10, letterSpacing: '0.18em', color: C.sealRed, fontWeight: 600 }}>ISSUE</div>
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 36, fontWeight: 500, color: C.inkBrown, lineHeight: 1 }}>No.7</div>
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, opacity: 0.45, marginTop: 2 }}>2027 丁未年</div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div
        style={{
          padding: '28px 0',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <FilterBar active={filter} onSelect={setFilter} />
        <span
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 12,
            color: C.inkBrown,
            opacity: 0.4,
            letterSpacing: '0.18em',
            flexShrink: 0,
          }}
        >
          {visible.length} pieces
        </span>
      </div>

      {/* ══════════════════════════════════════════════
          EDITORIAL GRID — fixed asymmetric layout
          shown when filter = ALL
         ══════════════════════════════════════════════ */}
      {filter === 'ALL' ? (
        /* ══ MAGAZINE ASYMMETRIC GRID — 6 columns, gap 20px ══ */
        <div style={{ paddingTop: 56 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 20,
            }}
          >

            {/* ── LOOK 01 — RED SHEEP · spans 4 cols, tall ── */}
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 460, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 22, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMAGE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>LOOK 01 — RED SHEEP</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>액막이 양이, 한지 위에서</span>
              </div>
            </div>

            {/* ── LOOK 02 — spans 2 cols, tall ── */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 460, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 22, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMAGE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>LOOK 02</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>책상 위의 작은 수호신</span>
              </div>
            </div>

            {/* ── LOOK 03 — CHARM · spans 3 cols ── */}
            <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 340, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 22, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMAGE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>LOOK 03 — CHARM</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>가방에 매단 행운</span>
              </div>
            </div>

            {/* ── LOOK 04 — spans 3 cols ── */}
            <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 340, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 22, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMAGE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>LOOK 04</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>복주머니 참, 손끝의 오방색</span>
              </div>
            </div>

            {/* ── CENTER QUOTE — full 6 cols ── */}
            <div
              style={{
                gridColumn: 'span 6',
                padding: '52px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                margin: '8px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                  fontWeight: 700,
                  color: C.inkBrown,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.55,
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                "행운은 거창하지 않아요.{' '}
                <span style={{ color: C.sealRed }}>주고받는 손끝</span>에서 시작됩니다."
              </p>
              <span
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: C.inkBrown,
                  opacity: 0.38,
                  fontWeight: 600,
                }}
              >
                YUL:12 — 2027 RED SHEEP COLLECTION
              </span>
            </div>

            {/* ── LOOK 05 — spans 3 cols (landscape) ── */}
            <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 300, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 22, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMAGE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>LOOK 05</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>오방색 캔들, 다섯 빛깔의 온기</span>
              </div>
            </div>

            {/* ── LOOK 06 — spans 2 cols ── */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 300, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 22, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMAGE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>LOOK 06</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>새해 식탁의 행운 소반</span>
              </div>
            </div>

            {/* ── LOOK 07 — spans 1 col (narrow accent) ── */}
            <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 300, borderRadius: 12, border: `1.5px dashed ${C.borderStrong}`, backgroundColor: C.cardPaper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 16, opacity: 0.18 }}>✶</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 9, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.28, fontWeight: 600 }}>IMG</span>
              </div>
              <div style={{ padding: '0 2px' }}>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', color: C.inkBrown, opacity: 0.5, display: 'block' }}>LOOK 07</span>
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown, opacity: 0.55 }}>손 안의 부적</span>
              </div>
            </div>

          </div>

          {/* ── End mark ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '64px 0 0' }}>
            <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.22em', color: C.inkBrown, opacity: 0.32, fontWeight: 600 }}>✶ END OF COLLECTION ✶</span>
            <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
          </div>
        </div>
      ) : (
        /* ── Filtered grid — uniform 3-col ── */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 28,
            paddingTop: 52,
          }}
        >
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              style={{ height: 480 }}
            />
          ))}
          {visible.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', opacity: 0.4 }}>
              <div style={{ fontFamily: 'Noto Sans KR', fontSize: 14, letterSpacing: '0.18em' }}>No items found.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Hero Card (large, with bottom gradient + text) ── */
function HeroCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.98)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <ImagePlaceholder color={product.color} tag={product.tag} hovered={hovered} />

      {/* Bottom overlay panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 28px 28px',
          background: `linear-gradient(to top, rgba(55,41,28,0.72) 0%, rgba(55,41,28,0.18) 60%, transparent 100%)`,
          transition: 'opacity 0.3s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            fontSize: 20,
            color: 'white',
            margin: '0 0 4px',
            whiteSpace: 'pre-line',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
          }}
        >
          {product.quote}
        </p>
        <p
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 20px',
            letterSpacing: '0.04em',
          }}
        >
          {product.quoteEn}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 16, color: 'white', letterSpacing: '-0.015em' }}>
              {product.name}
            </div>
            <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
              {product.sub}
            </div>
          </div>
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 14, fontWeight: 600, color: 'white' }}>
            {product.price}
          </div>
        </div>
      </div>

      {/* Hover arrow */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.7)',
          transition: 'opacity 0.25s, transform 0.25s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12 L12 2 M5 2 H12 V9" stroke={C.inkBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ── Hover card (standard, with optional poetic overlay) ── */
function HoverCard({ product, showPoetic = false }: { product: (typeof PRODUCTS)[0]; showPoetic?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      <ImagePlaceholder color={product.color} tag={product.tag} hovered={hovered} />

      {/* Poetic text on hover */}
      {showPoetic && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 20px 20px',
            background: `linear-gradient(to top, rgba(55,41,28,0.6) 0%, transparent 100%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <p
            style={{
              fontFamily: 'Noto Sans KR',
              fontWeight: 700,
              fontSize: 14,
              color: 'white',
              margin: '0 0 3px',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {product.quote}
          </p>
          <p
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 11,
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
              letterSpacing: '0.03em',
            }}
          >
            {product.quoteEn}
          </p>
        </div>
      )}

      {/* Arrow */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.6)',
          transition: 'opacity 0.2s, transform 0.2s',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M2 12 L12 2 M5 2 H12 V9" stroke={C.inkBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
