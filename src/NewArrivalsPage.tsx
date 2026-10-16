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
  borderStrong: 'rgba(55,41,28,0.30)',
};

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Felt mini-sheep illustration ── */
function FeltSheepIllustration({ size = 260 }: { size?: number }) {
  const s = size;
  const cx = s / 2, cy = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Soft felt texture bg circle */}
      <circle cx={cx} cy={cy} r={s * 0.44} fill="rgba(255,255,255,0.18)" />

      {/* Shadow */}
      <ellipse cx={cx} cy={cy + s * 0.36} rx={s * 0.26} ry={s * 0.05} fill="rgba(55,41,28,0.10)" />

      {/* Body — felt wool balls */}
      <circle cx={cx} cy={cy + s * 0.05} r={s * 0.25} fill="#E8E0D4" />
      <circle cx={cx - s * 0.1} cy={cy} r={s * 0.18} fill="#EDE6DC" />
      <circle cx={cx + s * 0.1} cy={cy} r={s * 0.18} fill="#EDE6DC" />
      <circle cx={cx} cy={cy - s * 0.1} r={s * 0.2} fill="#F2ECE2" />
      <circle cx={cx - s * 0.06} cy={cy + s * 0.12} r={s * 0.12} fill="#EAE2D8" />
      <circle cx={cx + s * 0.06} cy={cy + s * 0.12} r={s * 0.12} fill="#EAE2D8" />
      {/* Felt stitching lines */}
      <circle cx={cx} cy={cy + s * 0.05} r={s * 0.25} stroke="rgba(166,64,60,0.15)" strokeWidth="0.8" strokeDasharray="3 4" fill="none" />

      {/* Head */}
      <ellipse cx={cx} cy={cy - s * 0.22} rx={s * 0.12} ry={s * 0.11} fill="#F5D9C8" />
      {/* Ears */}
      <ellipse cx={cx - s * 0.11} cy={cy - s * 0.24} rx={s * 0.05} ry={s * 0.035} fill="#F0CDB8" transform={`rotate(-25 ${cx - s * 0.11} ${cy - s * 0.24})`} />
      <ellipse cx={cx + s * 0.11} cy={cy - s * 0.24} rx={s * 0.05} ry={s * 0.035} fill="#F0CDB8" transform={`rotate(25 ${cx + s * 0.11} ${cy - s * 0.24})`} />
      {/* Eyes */}
      <circle cx={cx - s * 0.04} cy={cy - s * 0.23} r={s * 0.018} fill={C.inkBrown} />
      <circle cx={cx + s * 0.04} cy={cy - s * 0.23} r={s * 0.018} fill={C.inkBrown} />
      <circle cx={cx - s * 0.035} cy={cy - s * 0.235} r={s * 0.006} fill="white" />
      <circle cx={cx + s * 0.045} cy={cy - s * 0.235} r={s * 0.006} fill="white" />
      {/* Nose */}
      <ellipse cx={cx} cy={cy - s * 0.17} rx={s * 0.034} ry={s * 0.022} fill="#E0A090" />
      {/* Blush */}
      <ellipse cx={cx - s * 0.07} cy={cy - s * 0.2} rx={s * 0.028} ry={s * 0.018} fill="#F0A090" opacity="0.4" />
      <ellipse cx={cx + s * 0.07} cy={cy - s * 0.2} rx={s * 0.028} ry={s * 0.018} fill="#F0A090" opacity="0.4" />
      {/* Smile */}
      <path d={`M${cx - s*0.03} ${cy - s*0.155} Q${cx} ${cy - s*0.13} ${cx + s*0.03} ${cy - s*0.155}`} stroke="#C07060" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Legs — felt rods */}
      {[-s * 0.09, -s * 0.03, s * 0.03, s * 0.09].map((dx, i) => (
        <rect key={i} x={cx + dx - s * 0.025} y={cy + s * 0.27} width={s * 0.05} height={s * 0.1} rx={s * 0.025} fill="#F0D0C0" />
      ))}
      {/* Hooves */}
      {[-s * 0.09, -s * 0.03, s * 0.03, s * 0.09].map((dx, i) => (
        <rect key={i} x={cx + dx - s * 0.026} y={cy + s * 0.355} width={s * 0.052} height={s * 0.038} rx={s * 0.019} fill="#8B6050" />
      ))}

      {/* Felt tag */}
      <rect x={cx + s * 0.18} y={cy - s * 0.12} width={s * 0.14} height={s * 0.1} rx={3} fill={C.sealRed} opacity="0.85" />
      <line x1={cx + s * 0.25} y1={cy - s * 0.12} x2={cx + s * 0.25} y2={cy - s * 0.16} stroke={C.sealRed} strokeWidth="1" opacity="0.7" />
      <text x={cx + s * 0.25} y={cy - s * 0.075} textAnchor="middle" fontFamily="serif" fontSize={s * 0.046} fill="white" fontWeight="bold">율</text>
    </svg>
  );
}

/* ── Hanji postcard illustration ── */
function HanjiPostcardIllustration({ size = 260 }: { size?: number }) {
  const s = size;
  const cx = s / 2, cy = s / 2;
  const cw = s * 0.7, ch = s * 0.48;
  const cl = cx - cw / 2, ct = cy - ch / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Stack of cards */}
      {[8, 4, 0].map((off, i) => (
        <rect
          key={i}
          x={cl + off * 0.6}
          y={ct + off}
          width={cw}
          height={ch}
          rx={6}
          fill={i === 0 ? '#FBF7E9' : i === 1 ? '#F3ECD5' : '#EFE6C8'}
          stroke={C.borderStrong}
          strokeWidth="0.8"
        />
      ))}
      {/* Top card detail */}
      {/* Hanji texture lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={cl + 12} y1={ct + 14 + i * 7} x2={cl + cw - 12} y2={ct + 14 + i * 7}
          stroke="rgba(55,41,28,0.07)" strokeWidth="0.7" />
      ))}
      {/* Stamp area (top right of card) */}
      <rect x={cl + cw - 38} y={ct + 10} width={26} height={34} rx={3} fill={C.creamSoft} stroke={C.border} strokeWidth="0.8" />
      <rect x={cl + cw - 35} y={ct + 13} width={20} height={28} rx={2} fill={C.sealRed} opacity="0.85" />
      <text x={cl + cw - 25} y={ct + 31} textAnchor="middle" fontFamily="serif" fontSize={s * 0.07} fill="white" fontWeight="bold">율</text>
      {/* Address lines */}
      <line x1={cl + 12} y1={ct + ch - 28} x2={cl + cw * 0.5} y2={ct + ch - 28} stroke="rgba(55,41,28,0.14)" strokeWidth="0.8" />
      <line x1={cl + 12} y1={ct + ch - 20} x2={cl + cw * 0.5} y2={ct + ch - 20} stroke="rgba(55,41,28,0.14)" strokeWidth="0.8" />
      <line x1={cl + 12} y1={ct + ch - 12} x2={cl + cw * 0.35} y2={ct + ch - 12} stroke="rgba(55,41,28,0.14)" strokeWidth="0.8" />
      {/* Divider line (middle vertical) */}
      <line x1={cl + cw * 0.52} y1={ct + ch - 38} x2={cl + cw * 0.52} y2={ct + ch - 8} stroke="rgba(55,41,28,0.10)" strokeWidth="0.8" />
      {/* Central sheep motif */}
      <circle cx={cx - s * 0.04} cy={ct + ch * 0.38} r={s * 0.07} fill="rgba(166,64,60,0.08)" />
      <text x={cx - s * 0.04} y={ct + ch * 0.42} textAnchor="middle" fontSize={s * 0.1} fill={C.berry} opacity="0.55">🐑</text>
      {/* 2027 text */}
      <text x={cx - s * 0.04} y={ct + ch * 0.62} textAnchor="middle" fontFamily="serif" fontSize={s * 0.065} fill={C.inkBrown} opacity="0.3" letterSpacing="2">2027</text>
      {/* Postmark circle */}
      <circle cx={cl + cw - 24} cy={ct + ch - 22} r={14} stroke={C.inkBrown} strokeWidth="0.7" fill="none" opacity="0.15" strokeDasharray="2 3" />
    </svg>
  );
}

/* ── Large product card ── */
function LargeProductCard({
  product,
  reversed = false,
  onDetail,
}: {
  product: {
    name: string; sub: string; price: number; desc: string;
    tag: string; badge: string; color: string; accent: string;
    Illustration: React.ComponentType<{ size?: number }>;
    details: string[];
  };
  reversed?: boolean;
  onDetail?: () => void;
}) {
  const { ref, visible } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: reversed ? '1fr 1fr' : '1fr 1fr',
        gap: 0,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1.5px solid ${C.borderStrong}`,
        boxShadow: hovered
          ? `6px 9px 0 rgba(55,41,28,0.13)`
          : `4px 6px 0 rgba(55,41,28,0.09)`,
        transition: 'box-shadow 0.3s, transform 0.3s, opacity 0.7s, translateY 0.7s',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : 'translateY(28px)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onDetail}
    >
      {/* Image pane */}
      <div
        style={{
          order: reversed ? 2 : 1,
          backgroundColor: product.color,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 420,
          overflow: 'hidden',
        }}
      >
        {/* Radial highlight */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.16) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Scattered dots texture */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} opacity="0.08">
          {Array.from({ length: 28 }).map((_, i) => (
            <circle key={i} cx={`${(i * 37 + 11) % 100}%`} cy={`${(i * 53 + 7) % 100}%`} r="2" fill="white" />
          ))}
        </svg>

        {/* Illustration — scale up on hover */}
        <div style={{
          transition: 'transform 0.4s ease',
          transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
        }}>
          <product.Illustration size={240} />
        </div>

        {/* NEW badge */}
        <div style={{
          position: 'absolute', top: 18, left: 18,
          backgroundColor: 'white',
          color: product.accent,
          fontFamily: 'Noto Sans KR',
          fontSize: 9, fontWeight: 500, letterSpacing: '0.18em',
          padding: '5px 13px', borderRadius: 999,
          boxShadow: '1px 2px 4px rgba(55,41,28,0.12)',
        }}>
          {product.badge}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 34, height: 34, borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(55,41,28,0.14)',
            opacity: hovered || wishlisted ? 1 : 0,
            transform: hovered || wishlisted ? 'scale(1)' : 'scale(0.7)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={wishlisted ? C.sealRed : 'none'}
            stroke={wishlisted ? C.sealRed : C.inkBrown}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info pane */}
      <div
        style={{
          order: reversed ? 1 : 2,
          backgroundColor: C.cardPaper,
          padding: '48px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* Category */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18,
        }}>
          <div style={{ width: 16, height: 2, backgroundColor: C.sealRed }} />
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.18em', color: C.sealRed,
          }}>
            {product.tag}
          </span>
        </div>

        {/* Name */}
        <h2 className="display-title" style={{
          fontSize: 'clamp(22px, 2.6vw, 36px)',
          color: C.inkBrown, margin: '0 0 8px',
          transition: 'color 0.2s',
          ...(hovered ? { color: product.accent } : {}),
        }}>
          {product.name}
        </h2>
        <div style={{
          fontFamily: 'Noto Sans KR', fontSize: 13, 
          color: C.inkBrown, opacity: 0.42, letterSpacing: '0.04em', marginBottom: 22,
        }}>
          {product.sub}
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Noto Sans KR', fontSize: 14, lineHeight: 1.95,
          color: C.inkBrown, opacity: 0.68, margin: '0 0 28px',
        }}>
          {product.desc}
        </p>

        {/* Detail pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {product.details.map((d) => (
            <span key={d} style={{
              fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.18em', color: C.inkBrown,
              border: `1.5px solid ${C.border}`, borderRadius: 999,
              padding: '5px 13px',
              backgroundColor: 'rgba(55,41,28,0.04)',
            }}>
              {d}
            </span>
          ))}
        </div>

        {/* Price */}
        <div style={{
          paddingTop: 24, borderTop: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
        }}>
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 28, fontWeight: 700,
            color: C.inkBrown, letterSpacing: '-0.01em',
          }}>
            ₩ {product.price.toLocaleString('ko-KR')}
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              style={{
                backgroundColor: product.accent,
                color: 'white', border: 'none', borderRadius: 999,
                padding: '12px 24px',
                fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', letterSpacing: '-0.01em',
                boxShadow: `2px 3px 0 rgba(55,41,28,0.2)`,
                transition: 'transform 0.15s, box-shadow 0.15s',
                whiteSpace: 'nowrap' as const,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '3px 5px 0 rgba(55,41,28,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '2px 3px 0 rgba(55,41,28,0.2)';
              }}
            >
              장바구니 담기
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDetail?.(); }}
              style={{
                backgroundColor: 'transparent',
                color: C.inkBrown, border: `1.5px solid ${C.border}`, borderRadius: 999,
                padding: '11px 20px',
                fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', letterSpacing: '-0.01em',
                transition: 'border-color 0.18s',
                whiteSpace: 'nowrap' as const,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = C.border)}
            >
              상세 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Brand promise card ── */
function PromiseCard({
  icon, title, sub, body, index,
}: {
  icon: React.ReactNode; title: string; sub: string; body: string; index: number;
}) {
  const { ref, visible } = useReveal(0.15);
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: C.cardPaper,
        border: `1.5px solid ${C.border}`,
        borderRadius: 18,
        padding: '36px 32px',
        boxShadow: `3px 5px 0 rgba(55,41,28,0.08)`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ${index * 0.12}s ease, transform 0.65s ${index * 0.12}s ease`,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}
    >
      {/* Icon area */}
      <div style={{
        width: 52, height: 52,
        borderRadius: 14,
        backgroundColor: C.creamSoft,
        border: `1.5px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>
        {icon}
      </div>

      {/* Number badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 500,
          color: C.sealRed, letterSpacing: '0.18em',
        }}>
          0{index + 1}
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
      </div>

      <div>
        <h3 style={{
          fontFamily: 'Noto Sans KR', fontWeight: 700,
          fontSize: 17, letterSpacing: '-0.015em',
          color: C.inkBrown, margin: '0 0 4px', lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <div style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, 
          color: C.inkBrown, opacity: 0.4, marginBottom: 14, letterSpacing: '0.04em',
        }}>
          {sub}
        </div>
        <p style={{
          fontFamily: 'Noto Sans KR', fontSize: 13, lineHeight: 1.7,
          color: C.inkBrown, opacity: 0.65, margin: 0,
        }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ── Shop all banner ── */
function ShopAllBanner({ onShop }: { onShop?: () => void }) {
  const { ref, visible } = useReveal(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: C.olive,
        borderRadius: 20,
        padding: '64px 72px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 48,
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        cursor: 'pointer',
      }}
      onClick={onShop}
    >
      {/* bg decoration */}
      <div style={{
        position: 'absolute', top: -60, right: 200,
        width: 280, height: 280, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: '35%',
        width: 180, height: 180, borderRadius: '50%',
        background: 'rgba(182,168,71,0.12)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 20, height: 2, backgroundColor: C.mustard }} />
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.18em', color: C.mustard,
          }}>
            YUL:12 · 2027 COLLECTION
          </span>
        </div>
        <h2 className="display-title" style={{
          fontSize: 'clamp(26px, 3.2vw, 46px)',
          color: 'white', margin: '0 0 10px',
        }}>
          더 많은 율:12를<br />만나보세요
        </h2>
        <p style={{
          fontFamily: 'Noto Sans KR', fontSize: 14, 
          color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '0.04em',
        }}>
          열두 띠 동물과 오방색의 이야기, 컬렉션 전체에서
        </p>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
        <button
          style={{
            backgroundColor: 'white',
            color: C.olive,
            border: 'none', borderRadius: 999,
            padding: '16px 36px',
            fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 15,
            cursor: 'pointer', whiteSpace: 'nowrap' as const,
            letterSpacing: '-0.01em',
            boxShadow: hovered ? '4px 6px 0 rgba(55,41,28,0.18)' : '3px 4px 0 rgba(55,41,28,0.15)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          SHOP 전체 보기 →
        </button>
        <span style={{
          fontFamily: 'Noto Sans KR', fontSize: 11,
          color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em',
        }}>
          8 products · 5 categories
        </span>
      </div>
    </div>
  );
}

/* ── Running number ticker ── */
function Ticker({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const { ref, visible } = useReveal(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / 40;
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [visible, end]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Noto Sans KR', fontSize: 48, fontWeight: 700,
        color: C.inkBrown, letterSpacing: '-0.01em', lineHeight: 1,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown,
        opacity: 0.45, marginTop: 6, letterSpacing: '0.02em',
      }}>
        {label}
      </div>
    </div>
  );
}

/* ── Products data ── */
/* ── Wall Calendar illustration ── */
function WallCalendarIllustration({ size = 260 }: { size?: number }) {
  const s = size;
  const cx = s / 2, cy = s / 2;
  const cw = s * 0.65, ch = s * 0.72;
  const cl = cx - cw / 2, ct = cy - ch / 2 + s * 0.04;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Shadow */}
      <rect x={cl + 6} y={ct + 6} width={cw} height={ch} rx={8} fill="rgba(55,41,28,0.10)" />
      {/* Body */}
      <rect x={cl} y={ct} width={cw} height={ch} rx={8} fill="#FBF7E9" stroke={C.borderStrong} strokeWidth="1" />
      {/* Header band */}
      <rect x={cl} y={ct} width={cw} height={ch * 0.22} rx={8} fill={C.sealRed} />
      <rect x={cl} y={ct + ch * 0.16} width={cw} height={ch * 0.06} fill={C.sealRed} />
      {/* Binding holes */}
      {[-0.22, -0.07, 0.08, 0.23].map((dx, i) => (
        <circle key={i} cx={cx + dx * cw} cy={ct} r={s * 0.022}
          fill={C.creamBg} stroke={C.borderStrong} strokeWidth="0.8" />
      ))}
      {/* Header text */}
      <text x={cx} y={ct + ch * 0.1} textAnchor="middle"
        fontFamily="Noto Sans KR" fontSize={s * 0.075} fontWeight="800"
        fill="white" letterSpacing="-1">2027</text>
      <text x={cx} y={ct + ch * 0.185} textAnchor="middle"
        fontFamily="Noto Sans KR" fontSize={s * 0.048} fontWeight="700"
        fill="rgba(255,255,255,0.75)">丁未年 · 정미년</text>
      {/* Calendar grid */}
      {['일','월','화','수','목','금','토'].map((d, i) => (
        <text key={d} x={cl + s * 0.05 + i * (cw / 7.2)} y={ct + ch * 0.32}
          fontFamily="Noto Sans KR" fontSize={s * 0.038} fontWeight="700"
          fill={i === 0 ? C.sealRed : i === 6 ? '#2B5BA1' : C.inkBrown} opacity="0.7">{d}</text>
      ))}
      <line x1={cl + 10} y1={ct + ch * 0.34} x2={cl + cw - 10} y2={ct + ch * 0.34}
        stroke={C.border} strokeWidth="0.6" />
      {/* Date numbers */}
      {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
        const row = Math.floor((d - 1) / 7);
        const col = (d - 1) % 7;
        const x = cl + s * 0.05 + col * (cw / 7.2);
        const y = ct + ch * 0.42 + row * (ch * 0.135);
        const isRed = col === 0;
        const isToday = d === 1;
        return (
          <g key={d}>
            {isToday && <circle cx={x + s * 0.018} cy={y - s * 0.015} r={s * 0.026} fill={C.sealRed} opacity="0.85" />}
            <text x={x + s * 0.018} y={y}
              textAnchor="middle"
              fontFamily="Noto Sans KR" fontSize={s * 0.04} fontWeight={isToday ? '800' : '400'}
              fill={isToday ? 'white' : isRed ? C.sealRed : C.inkBrown}
              opacity={isToday ? 1 : 0.65}>{d}</text>
          </g>
        );
      })}
      {/* Sheep doodle bottom right */}
      <text x={cl + cw - s * 0.06} y={ct + ch - s * 0.03} textAnchor="middle" fontSize={s * 0.1}>🐑</text>
    </svg>
  );
}

/* ── Greeting Card illustration ── */
function GreetingCardIllustration({ size = 260 }: { size?: number }) {
  const s = size;
  const cx = s / 2, cy = s / 2;
  const cw = s * 0.72, ch = s * 0.52;
  const cl = cx - cw / 2, ct = cy - ch / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Shadow stack */}
      {[6, 3].map((off, i) => (
        <rect key={i} x={cl + off} y={ct + off} width={cw} height={ch} rx={6}
          fill={i === 0 ? '#EFE6C8' : '#F3ECD5'} stroke={C.border} strokeWidth="0.7" />
      ))}
      {/* Top card */}
      <rect x={cl} y={ct} width={cw} height={ch} rx={6} fill="#FBF7E9" stroke={C.borderStrong} strokeWidth="1" />

      {/* Left color stripe */}
      <rect x={cl} y={ct} width={cw * 0.08} height={ch} rx={6} fill={C.sealRed} />
      <rect x={cl + cw * 0.06} y={ct} width={cw * 0.02} height={ch} fill={C.sealRed} />

      {/* Right content area */}
      {/* Large year */}
      <text x={cl + cw * 0.55} y={ct + ch * 0.38}
        textAnchor="middle" fontFamily="Noto Sans KR" fontSize={s * 0.13}
        fontWeight="800" fill={C.inkBrown} opacity="0.06" letterSpacing="-2">2027</text>
      {/* Sheep emoji centred */}
      <text x={cl + cw * 0.38} y={ct + ch * 0.52} textAnchor="middle" fontSize={s * 0.17}>🐑</text>
      {/* YUL:12 label */}
      <text x={cl + cw * 0.55} y={ct + ch * 0.28}
        textAnchor="middle" fontFamily="Noto Sans KR" fontSize={s * 0.052}
        fontWeight="800" fill={C.inkBrown} opacity="0.55" letterSpacing="1">YUL:12</text>
      {/* Subtitle */}
      <text x={cl + cw * 0.55} y={ct + ch * 0.45}
        textAnchor="middle" fontFamily="Noto Sans KR" fontSize={s * 0.038}
        fill={C.inkBrown} opacity="0.35">새해 복 많이 받으세요</text>
      {/* Horizontal rule */}
      <line x1={cl + cw * 0.14} y1={ct + ch * 0.72} x2={cl + cw - 10} y2={ct + ch * 0.72}
        stroke={C.border} strokeWidth="0.7" />
      <text x={cl + cw * 0.55} y={ct + ch * 0.87}
        textAnchor="middle" fontFamily="Noto Sans KR" fontSize={s * 0.032}
        fill={C.inkBrown} opacity="0.3">丁未年 · 율:12</text>

      {/* Gold foil dot cluster */}
      {[[0.82, 0.15], [0.88, 0.22], [0.79, 0.26]].map(([dx, dy], i) => (
        <circle key={i} cx={cl + cw * dx} cy={ct + ch * dy} r={s * 0.012}
          fill={C.mustard} opacity="0.7" />
      ))}

      {/* Envelope flap below */}
      <rect x={cl - 2} y={ct + ch + 14} width={cw + 4} height={s * 0.12} rx={5}
        fill={C.creamSoft} stroke={C.border} strokeWidth="0.8" />
      <path d={`M${cl - 2} ${ct + ch + 14} L${cx} ${ct + ch + 14 + s * 0.065} L${cl + cw + 2} ${ct + ch + 14}`}
        fill={C.sealRed} opacity="0.15" />
    </svg>
  );
}

const NEW_PRODUCTS = [
  {
    name: '벽걸이 캘린더',
    sub: 'Wall Calendar 2027 · 丁未年',
    price: 18000,
    desc: '정미년 붉은 양의 해를 함께할 2027 율:12 벽걸이 달력입니다. 매달 오방색을 모티프로 한 띠 디자인과 열두 띠 동물 일러스트가 함께 담겼습니다. 한지 질감의 고급 무광 종이에 인쇄되어 인테리어 소품으로도 손색이 없습니다.',
    tag: 'STATIONERY · 지류',
    badge: 'NEW',
    color: '#E8EFF8',
    accent: '#2B5BA1',
    Illustration: WallCalendarIllustration,
    details: ['A3 사이즈', '12개월 구성', '한지 질감 무광지', '2027 한정판'],
  },
  {
    name: '카드',
    sub: 'Greeting Card Set · YUL:12',
    price: 5500,
    desc: '율:12의 새해 인사가 담긴 그리팅 카드입니다. 청(靑) 오방색을 바탕으로 한 금박 엠보싱 디자인으로 정미년의 기운을 담았습니다. 봉투가 함께 포함되어 소중한 분께 마음을 전하기에 더없이 좋습니다.',
    tag: 'STATIONERY · 지류',
    badge: 'NEW',
    color: '#E8EFF8',
    accent: '#2B5BA1',
    Illustration: GreetingCardIllustration,
    details: ['카드 + 봉투 세트', '금박 엠보싱', '두꺼운 카드지', '새해 한정'],
  },
];

const PROMISES = [
  {
    icon: '🐑',
    title: '매년 새로워지는 컬렉션',
    sub: 'A Collection That Renews Each Year',
    body: '십이지의 순환처럼, 율:12의 컬렉션도 매년 새로운 동물과 이야기로 다시 태어납니다. 2027년은 붉은 양의 해, 그 온기를 담은 특별한 제품들이 준비되어 있습니다.',
  },
  {
    icon: '✦',
    title: '한정 수량 제작',
    sub: 'Limited Quantities, Crafted with Care',
    body: '율:12의 모든 제품은 소량 한정으로 제작됩니다. 대량 생산이 아닌, 한 분 한 분을 위한 정성 가득한 제작 방식으로 선물의 가치를 높입니다.',
  },
  {
    icon: '🎁',
    title: '가장 먼저 받는 행운',
    sub: 'Be the First to Receive Fortune',
    body: '뉴 어라이벌을 가장 먼저 만나보세요. 뉴스레터를 구독하시면 신상품 출시 소식과 한정 선공개 혜택을 누구보다 먼저 받아보실 수 있습니다.',
  },
];

/* ── Main Page ── */
export default function NewArrivalsPage({ onShop, onProduct }: { onShop?: () => void; onProduct?: () => void }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>

      {/* ── Editorial hero header ── */}
      <div style={{
        paddingTop: 72,
        paddingBottom: 64,
        borderBottom: `1px solid ${C.border}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ghost "NEW" watermark */}
        <div style={{
          position: 'absolute', right: -20, top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Noto Sans KR', fontSize: 'clamp(100px, 18vw, 220px)',
          fontWeight: 700, color: C.inkBrown, opacity: 0.04,
          letterSpacing: '-0.01em', lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          NEW
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 2, backgroundColor: C.sealRed }} />
            <span style={{
              fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.18em', color: C.sealRed,
            }}>
              JUST ARRIVED
            </span>
            <div style={{ width: 28, height: 2, backgroundColor: C.sealRed }} />
          </div>

          {/* Main title */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 32 }}>
            <div>
              <h1 className="display-title display-title--latin" style={{
                fontSize: 'clamp(44px, 7vw, 96px)',
                color: C.inkBrown, margin: '0 0 18px',
              }}>
                NEW
                <br />
                <span style={{
                  fontFamily: "'SiwonhanSeolreim', sans-serif",
                  fontWeight: 'normal', fontSize: '0.6em',
                  letterSpacing: '-0.01em', color: C.inkBrown,
                }}>
                  ARRIVALS
                </span>
              </h1>
              <p style={{
                fontFamily: 'Noto Sans KR', fontSize: 15, lineHeight: 1.7,
                color: C.inkBrown, opacity: 0.6, maxWidth: 480, margin: 0,
              }}>
                2027년 丁未年을 맞이하여 새롭게 선보이는 율:12의 신상품입니다.
                붉은 양의 온기와 전통의 아름다움을 담아, 가장 먼저 당신에게 전합니다.
              </p>
            </div>

            {/* Right: date + stats */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end',
              flexShrink: 0,
            }}>
              <div style={{
                padding: '14px 22px',
                backgroundColor: C.cardPaper,
                border: `1.5px solid ${C.border}`,
                borderRadius: 14,
                boxShadow: `3px 4px 0 ${C.border}`,
                textAlign: 'right',
              }}>
                <div style={{ fontFamily: 'Noto Sans KR', fontSize: 10, letterSpacing: '0.18em', color: C.sealRed, fontWeight: 600, marginBottom: 4 }}>
                  ARRIVAL DATE
                </div>
                <div style={{ fontFamily: 'Noto Sans KR', fontSize: 20, fontWeight: 500, color: C.inkBrown, letterSpacing: '-0.01em' }}>
                  DEC 2026
                </div>
                <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, opacity: 0.4, marginTop: 2 }}>
                  2가지 신상품
                </div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 16px',
                backgroundColor: C.sealRed, borderRadius: 999,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'white', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: 'white' }}>
                  JUST IN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ticker row ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0, padding: '40px 0',
        borderBottom: `1px solid ${C.border}`,
      }}>
        {[
          { end: 2, suffix: '', label: '신상품' },
          { end: 127, suffix: '+', label: '사전 찜하기' },
          { end: 48, suffix: 'h', label: '한정 선공개' },
          { end: 2027, suffix: '', label: '丁未年 에디션' },
        ].map((t, i) => (
          <div key={t.label} style={{
            borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
            padding: '0 40px',
          }}>
            <Ticker end={t.end} suffix={t.suffix} label={t.label} />
          </div>
        ))}
      </div>

      {/* ── Product cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '64px 0' }}>
        {NEW_PRODUCTS.map((p, i) => (
          <LargeProductCard
            key={p.name}
            product={p}
            reversed={i % 2 === 1}
            onDetail={onProduct}
          />
        ))}
      </div>

      {/* ── Brand promise row ── */}
      <section style={{ paddingBottom: 72 }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 24, height: 2, backgroundColor: C.sealRed }} />
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.18em', color: C.sealRed,
          }}>
            YUL:12 PROMISE
          </span>
        </div>
        <h2 className="display-title" style={{
          fontSize: 'clamp(24px, 3vw, 42px)',
          color: C.inkBrown, margin: '0 0 40px',
        }}>
          율:12가 약속하는 것
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PROMISES.map((p, i) => (
            <PromiseCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* ── Newsletter strip ── */}
      <div style={{
        backgroundColor: C.creamSoft,
        border: `1.5px solid ${C.border}`,
        borderRadius: 16,
        padding: '32px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        marginBottom: 40,
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 16, color: C.inkBrown, letterSpacing: '-0.01em', marginBottom: 4 }}>
            새 상품을 가장 먼저 받아보세요
          </div>
          <div style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.45, letterSpacing: '0.04em' }}>
            Subscribe for early access to new arrivals
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
          <input
            type="email"
            placeholder="이메일 주소 입력"
            style={{
              fontFamily: 'Noto Sans KR', fontSize: 13, color: C.inkBrown,
              backgroundColor: 'white',
              border: `1.5px solid ${C.border}`,
              borderRight: 'none',
              borderRadius: '999px 0 0 999px',
              padding: '12px 20px',
              outline: 'none',
              width: 220,
            }}
          />
          <button style={{
            backgroundColor: C.sealRed, color: 'white',
            border: 'none', borderRadius: '0 999px 999px 0',
            padding: '12px 22px',
            fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', whiteSpace: 'nowrap' as const,
            letterSpacing: '-0.01em',
          }}>
            구독하기
          </button>
        </div>
      </div>

      {/* ── Shop all banner ── */}
      <ShopAllBanner onShop={onShop} />
    </div>
  );
}
