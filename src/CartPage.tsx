import { useState } from 'react';
import { HiddenSheep } from '@/HiddenSheep';

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

/* ── Cart item type ── */
interface CartItem {
  id: number;
  name: string;
  sub: string;
  price: number;
  qty: number;
  tag: string;
  badge: string | null;
  color: string;
  colorLabel: string;
  size: string;
}

const INITIAL_ITEMS: CartItem[] = [
  { id: 1, name: '양 복주머니 세트', sub: 'Sheep Lucky Pouch Set', price: 32000, qty: 1, tag: 'GIFT SET', badge: 'BEST', color: '#C04040', colorLabel: '적 · 赤', size: '기본 (12×16cm)' },
  { id: 2, name: '붉은 양 캔들', sub: 'Red Sheep Candle', price: 42000, qty: 2, tag: 'LIVING', badge: 'NEW', color: '#AB0A00', colorLabel: '적 · 赤', size: '단품' },
  { id: 3, name: '십이지 노트북', sub: 'Zodiac Notebook', price: 28000, qty: 1, tag: 'STATIONERY', badge: null, color: '#494B1C', colorLabel: '청 · 靑', size: '단품' },
];

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 50000;

const VALID_COUPONS: Record<string, { label: string; discount: number; type: 'flat' | 'pct' }> = {
  'YUL2027': { label: '신년 할인 쿠폰', discount: 5000, type: 'flat' },
  'SHEEP10': { label: '붉은양 10% 쿠폰', discount: 10, type: 'pct' },
  'LUCKY777': { label: '행운양 7마리 보상 쿠폰', discount: 7, type: 'pct' },
};

/* ── Thumbnail ── */
function ItemThumbnail({ item }: { item: CartItem }) {
  return (
    <div style={{
      width: 80, height: 80, borderRadius: 12, flexShrink: 0,
      backgroundColor: item.color, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" opacity="0.32">
          <circle cx="14" cy="14" r="11" stroke="white" strokeWidth="0.8" strokeDasharray="3 4" />
          <circle cx="14" cy="14" r="2" fill="white" />
        </svg>
        <span style={{ fontFamily: 'Noto Sans KR', fontSize: 7, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
          {item.colorLabel}
        </span>
      </div>
      {item.badge && (
        <div style={{
          position: 'absolute', bottom: 5, left: 5,
          backgroundColor: item.badge === 'BEST' ? C.sealRed : C.olive,
          color: 'white', fontFamily: 'Noto Sans KR', fontSize: 7,
          fontWeight: 700, letterSpacing: '0.18em', padding: '2px 6px', borderRadius: 999,
        }}>
          {item.badge}
        </div>
      )}
    </div>
  );
}

/* ── Quantity stepper ── */
function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const btn = (dir: 1 | -1) => (
    <button
      onClick={() => onChange(Math.max(1, value + dir))}
      style={{
        width: 30, height: 30, borderRadius: '50%',
        border: `1.5px solid ${C.border}`,
        backgroundColor: C.creamSoft,
        color: C.inkBrown, fontSize: 16, fontWeight: 700,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s, border-color 0.15s',
        lineHeight: 1,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.inkBrown;
        (e.currentTarget as HTMLButtonElement).style.color = 'white';
        (e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.creamSoft;
        (e.currentTarget as HTMLButtonElement).style.color = C.inkBrown;
        (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
      }}
    >
      {dir === 1 ? '+' : '−'}
    </button>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {btn(-1)}
      <span style={{
        fontFamily: 'Noto Sans KR', fontSize: 15, fontWeight: 700,
        color: C.inkBrown, minWidth: 20, textAlign: 'center',
      }}>
        {value}
      </span>
      {btn(1)}
    </div>
  );
}

/* ── Remove button ── */
function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="Remove item"
      style={{
        width: 28, height: 28, borderRadius: '50%',
        border: `1.5px solid ${C.border}`,
        backgroundColor: 'transparent', color: C.inkBrown,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s', flexShrink: 0,
        opacity: 0.45,
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.backgroundColor = C.sealRed;
        b.style.borderColor = C.sealRed;
        b.style.color = 'white';
        b.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.backgroundColor = 'transparent';
        b.style.borderColor = C.border;
        b.style.color = C.inkBrown;
        b.style.opacity = '0.45';
      }}
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/* ── Cart item row ── */
function CartItemRow({
  item,
  onQtyChange,
  onRemove,
}: {
  item: CartItem;
  onQtyChange: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 280);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: 20,
        alignItems: 'center',
        padding: '22px 0',
        borderBottom: `1px solid ${C.border}`,
        opacity: removing ? 0 : 1,
        transform: removing ? 'translateX(-12px)' : 'translateX(0)',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
      }}
    >
      {/* Thumbnail */}
      <ItemThumbnail item={item} />

      {/* Middle: name + options + stepper */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div>
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.18em', color: C.sealRed,
          }}>
            {item.tag}
          </span>
        </div>
        <div style={{
          fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 15,
          color: C.inkBrown, letterSpacing: '-0.015em', lineHeight: 1.3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.name}
        </div>
        <div style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, 
          color: C.inkBrown, opacity: 0.4, letterSpacing: '0.04em',
        }}>
          {item.sub}
        </div>
        {/* Options pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
          {[item.colorLabel, item.size].map((opt) => (
            <span key={opt} style={{
              fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown,
              backgroundColor: C.creamSoft, border: `1px solid ${C.border}`,
              borderRadius: 999, padding: '3px 10px', opacity: 0.75,
            }}>
              {opt}
            </span>
          ))}
        </div>
        {/* Stepper */}
        <div style={{ marginTop: 8 }}>
          <Stepper value={item.qty} onChange={(q) => onQtyChange(item.id, q)} />
        </div>
      </div>

      {/* Right: price + remove */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
        <RemoveBtn onClick={handleRemove} />
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Noto Sans KR', fontSize: 17, fontWeight: 700,
            color: C.inkBrown, letterSpacing: '0.01em',
          }}>
            ₩ {(item.price * item.qty).toLocaleString('ko-KR')}
          </div>
          {item.qty > 1 && (
            <div style={{
              fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown,
              opacity: 0.38, marginTop: 2,
            }}>
              ₩ {item.price.toLocaleString('ko-KR')} × {item.qty}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Divider row ── */
function SummaryRow({
  label, labelSub, value, bold, accent, large,
}: {
  label: string; labelSub?: string; value: string;
  bold?: boolean; accent?: boolean; large?: boolean;
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12,
    }}>
      <div>
        <span style={{
          fontFamily: 'Noto Sans KR', fontWeight: bold ? 800 : 400,
          fontSize: large ? 15 : 13, color: C.inkBrown,
          opacity: bold ? 1 : 0.65,
        }}>
          {label}
        </span>
        {labelSub && (
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 10, 
            color: C.inkBrown, opacity: 0.38, marginLeft: 6, letterSpacing: '0.04em',
          }}>
            {labelSub}
          </span>
        )}
      </div>
      <span style={{
        fontFamily: 'Noto Sans KR', fontWeight: bold ? 700 : 400,
        fontSize: large ? 22 : 14, color: accent ? C.sealRed : C.inkBrown,
        letterSpacing: '0.01em', flexShrink: 0,
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Coupon field ── */
function CouponField({
  onApply,
  applied,
  error,
}: {
  onApply: (code: string) => void;
  applied: string | null;
  error: string | null;
}) {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (applied) { onApply(''); setCode(''); return; }
    onApply(code.trim().toUpperCase());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13,
        color: C.inkBrown, marginBottom: 2,
      }}>
        쿠폰 코드 <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 400, opacity: 0.4 }}>Coupon Code</span>
      </div>
      <div style={{ display: 'flex', gap: 0 }}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={!!applied}
          placeholder={applied ? VALID_COUPONS[applied]?.label ?? applied : 'YUL2027'}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          style={{
            flex: 1, fontFamily: 'Noto Sans KR', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.18em', color: C.inkBrown,
            backgroundColor: applied ? C.creamSoft : 'white',
            border: `1.5px solid ${error ? C.sealRed : applied ? C.olive : C.border}`,
            borderRight: 'none',
            borderRadius: '999px 0 0 999px',
            padding: '11px 18px', outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
        <button
          onClick={handleApply}
          style={{
            backgroundColor: applied ? C.olive : C.inkBrown,
            color: 'white', border: 'none',
            borderRadius: '0 999px 999px 0',
            padding: '11px 20px',
            fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12,
            cursor: 'pointer', whiteSpace: 'nowrap' as const,
            letterSpacing: '-0.01em', transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.85')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        >
          {applied ? '취소' : '적용'}
        </button>
      </div>
      {error && (
        <div style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, color: C.sealRed,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke={C.sealRed} strokeWidth="1.4" />
            <line x1="8" y1="5" x2="8" y2="9" stroke={C.sealRed} strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.8" fill={C.sealRed} />
          </svg>
          {error}
        </div>
      )}
      {applied && !error && (
        <div style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, color: C.olive,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke={C.olive} strokeWidth="1.4" />
            <path d="M5 8l2 2 4-4" stroke={C.olive} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {VALID_COUPONS[applied]?.label ?? applied} 쿠폰이 적용되었습니다
        </div>
      )}
      {/* Hint */}
      {!applied && !error && (
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown, opacity: 0.35, letterSpacing: '0.18em' }}>
          Try: YUL2027 · SHEEP10
        </div>
      )}
    </div>
  );
}

/* ── Order summary card ── */
function OrderSummary({
  subtotal,
  couponCode,
  onCouponApply,
  couponError,
  onCheckout,
}: {
  subtotal: number;
  couponCode: string | null;
  onCouponApply: (code: string) => void;
  couponError: string | null;
  onCheckout: () => void;
}) {
  const coupon = couponCode ? VALID_COUPONS[couponCode] : null;
  const discount = coupon
    ? coupon.type === 'flat' ? coupon.discount : Math.round(subtotal * coupon.discount / 100)
    : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal - discount + shipping;
  const [checked, setChecked] = useState(false);

  return (
    <div style={{
      backgroundColor: C.cardPaper,
      border: `1.5px solid ${C.borderStrong}`,
      borderRadius: 20,
      padding: '32px 28px',
      boxShadow: `4px 6px 0 rgba(55,41,28,0.09)`,
      display: 'flex', flexDirection: 'column', gap: 24,
      position: 'sticky', top: 96,
    }}>
      {/* Hidden sheep — peeking over the card's top edge */}
      <HiddenSheep id="cart" style={{ position: 'absolute', top: -28, right: 32, width: 30, height: 30 }} />
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 16, height: 2, backgroundColor: C.sealRed }} />
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.18em', color: C.sealRed,
          }}>
            ORDER SUMMARY
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 20,
            letterSpacing: '-0.015em', color: C.inkBrown,
          }}>
            주문 요약
          </div>
        </div>
      </div>

      {/* Coupon */}
      <CouponField
        onApply={onCouponApply}
        applied={couponCode}
        error={couponError}
      />

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: C.border }} />

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SummaryRow
          label="상품 금액"
          labelSub="Subtotal"
          value={`₩ ${subtotal.toLocaleString('ko-KR')}`}
        />
        <SummaryRow
          label="배송비"
          labelSub="Shipping"
          value={shipping === 0 ? '무료' : `₩ ${shipping.toLocaleString('ko-KR')}`}
        />
        {discount > 0 && (
          <SummaryRow
            label={`할인 (${coupon?.label ?? ''})`}
            labelSub="Discount"
            value={`−₩ ${discount.toLocaleString('ko-KR')}`}
            accent
          />
        )}
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <div style={{
            fontSize: 11, fontFamily: 'Noto Sans KR', color: C.inkBrown,
            opacity: 0.5, paddingTop: 2,
          }}>
            ₩ {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('ko-KR')} 더 담으면 무료 배송
          </div>
        )}
      </div>


      {/* Free shipping progress bar */}
      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <div>
          <div style={{
            height: 4, backgroundColor: C.creamSoft, borderRadius: 999, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
              backgroundColor: C.mustard,
              borderRadius: 999,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}

      {/* Total */}
      <div style={{
        paddingTop: 18, borderTop: `1.5px solid ${C.borderStrong}`,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <SummaryRow
          label="최종 결제 금액"
          labelSub="Grand Total"
          value={`₩ ${total.toLocaleString('ko-KR')}`}
          bold large
        />
        {coupon?.type === 'pct' && (
          <div style={{
            textAlign: 'right', fontFamily: 'Noto Sans KR',
            fontSize: 10, color: C.sealRed, opacity: 0.7, letterSpacing: '0.18em',
          }}>
            {coupon.discount}% 할인 적용
          </div>
        )}
      </div>

      {/* Agreement checkbox */}
      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer',
      }}>
        <div
          onClick={() => setChecked(!checked)}
          style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: `1.5px solid ${checked ? C.sealRed : C.border}`,
            backgroundColor: checked ? C.sealRed : 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.18s',
          }}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
              <path d="M1 5l3 4 7-8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown,
          opacity: 0.6, lineHeight: 1.6,
        }}>
          주문 내용을 확인하였으며, 구매에 동의합니다
        </span>
      </label>

      {/* CTA */}
      <button
        onClick={onCheckout}
        style={{
          width: '100%', backgroundColor: C.sealRed, color: 'white',
          border: 'none', borderRadius: 999,
          padding: '18px 0',
          fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 17,
          cursor: 'pointer', letterSpacing: '-0.01em',
          boxShadow: `3px 4px 0 rgba(55,41,28,0.22)`,
          transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '4px 6px 0 rgba(55,41,28,0.22)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '3px 4px 0 rgba(55,41,28,0.22)';
        }}
      >
        결제하기
      </button>

      {/* Secure note */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        opacity: 0.38,
      }}>
        <svg width="12" height="14" viewBox="0 0 14 16" fill="none">
          <path d="M7 1L2 3v5c0 3.31 2.13 6.41 5 7.16C9.87 14.41 12 11.31 12 8V3L7 1z" stroke={C.inkBrown} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M5 8l1.5 1.5L9 6" stroke={C.inkBrown} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, letterSpacing: '0.18em', color: C.inkBrown }}>
          SSL SECURED CHECKOUT
        </span>
      </div>

      {/* Payment icons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, opacity: 0.35 }}>
        {['VISA', 'CARD', 'PAY', 'KAKAO'].map((p) => (
          <div key={p} style={{
            padding: '3px 8px',
            border: `1px solid ${C.border}`, borderRadius: 4,
            fontFamily: 'Noto Sans KR', fontSize: 8, fontWeight: 700,
            letterSpacing: '0.18em', color: C.inkBrown,
          }}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Empty cart ── */
function EmptyCart({ onShop }: { onShop?: () => void }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '100px 0', gap: 20, textAlign: 'center',
    }}>
      <span style={{ fontSize: 56 }}>🛒</span>
      <div>
        <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 22, color: C.inkBrown, letterSpacing: '-0.015em', marginBottom: 8 }}>
          장바구니가 비어있습니다
        </div>
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 13, color: C.inkBrown, opacity: 0.42 }}>
          Your cart is empty
        </div>
      </div>
      <button
        onClick={onShop}
        style={{
          backgroundColor: C.sealRed, color: 'white',
          border: 'none', borderRadius: 999,
          padding: '14px 32px',
          fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 14,
          cursor: 'pointer', marginTop: 8,
          boxShadow: `3px 4px 0 rgba(55,41,28,0.18)`,
        }}
      >
        쇼핑 계속하기 →
      </button>
    </div>
  );
}

/* ── Main CartPage ── */
export default function CartPage({ onShop }: { onShop?: () => void }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [checkedOut, setCheckedOut] = useState(false);

  const setQty = (id: number, qty: number) =>
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, qty } : it));

  const remove = (id: number) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const applyCode = (code: string) => {
    setCouponError(null);
    if (!code) { setCouponCode(null); return; }
    if (VALID_COUPONS[code]) { setCouponCode(code); }
    else { setCouponError('유효하지 않은 쿠폰 코드입니다'); }
  };

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const totalItems = items.reduce((sum, it) => sum + it.qty, 0);

  if (checkedOut) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '100px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 64 }}>🐑</div>
        <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 28, color: C.inkBrown, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          주문이 완료되었습니다!
        </div>
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 14, color: C.inkBrown, opacity: 0.5 }}>
          Your order has been placed — thank you!
        </div>
        <button onClick={() => { setCheckedOut(false); setItems(INITIAL_ITEMS); setCouponCode(null); onShop?.(); }}
          style={{ backgroundColor: C.sealRed, color: 'white', border: 'none', borderRadius: 999, padding: '14px 32px', fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '3px 4px 0 rgba(55,41,28,0.18)', marginTop: 8 }}>
          계속 쇼핑하기
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 120px' }}>

      {/* ── Page header ── */}
      <div style={{
        padding: '64px 0 44px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 20, height: 2, backgroundColor: C.sealRed }} />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>
              SHOPPING CART · 장바구니
            </span>
          </div>
          <h1 className="display-title" style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: C.inkBrown, margin: 0,
          }}>
            장바구니
            <br />
            <span style={{
              fontFamily: 'Noto Sans KR', fontWeight: 700,
              fontSize: '0.55em', letterSpacing: '0.01em', color: C.inkBrown, opacity: 0.35,
            }}>
              Cart
            </span>
          </h1>
        </div>
        {/* Item count badge */}
        {items.length > 0 && (
          <div style={{
            padding: '14px 22px',
            backgroundColor: C.cardPaper,
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            boxShadow: `3px 4px 0 ${C.border}`,
            textAlign: 'center', flexShrink: 0,
          }}>
            <div style={{ fontFamily: 'Noto Sans KR', fontSize: 10, letterSpacing: '0.18em', color: C.sealRed, fontWeight: 600 }}>ITEMS</div>
            <div style={{ fontFamily: 'Noto Sans KR', fontSize: 32, fontWeight: 500, color: C.inkBrown, lineHeight: 1 }}>{totalItems}</div>
            <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, opacity: 0.4, marginTop: 2 }}>개 상품</div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyCart onShop={onShop} />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 48,
          paddingTop: 48,
          alignItems: 'start',
        }}>

          {/* ── LEFT: Item list ── */}
          <div>
            {/* Column headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: 20,
              paddingBottom: 14,
              borderBottom: `1px solid ${C.border}`,
            }}>
              {['상품', '정보 / 옵션', '금액'].map((h) => (
                <span key={h} style={{
                  fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.4,
                  textAlign: h === '금액' ? 'right' : 'left',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Items */}
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQtyChange={setQty}
                onRemove={remove}
              />
            ))}

            {/* Footer row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 24, gap: 16, flexWrap: 'wrap',
            }}>
              <button
                onClick={onShop}
                style={{
                  backgroundColor: 'transparent', color: C.inkBrown,
                  border: `1.5px solid ${C.border}`, borderRadius: 999,
                  padding: '11px 24px',
                  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', letterSpacing: '-0.01em',
                  transition: 'border-color 0.18s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = C.border)}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                쇼핑 계속하기
              </button>
              <div style={{
                fontFamily: 'Noto Sans KR', fontSize: 13,
                color: C.inkBrown, opacity: 0.5, letterSpacing: '0.04em',
              }}>
                소계 <strong style={{ color: C.inkBrown, opacity: 1, fontWeight: 700 }}>
                  ₩ {subtotal.toLocaleString('ko-KR')}
                </strong>
              </div>
            </div>

            {/* "You may also like" strip */}
            <div style={{
              marginTop: 56, paddingTop: 40, borderTop: `1px solid ${C.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 16, height: 2, backgroundColor: C.sealRed }} />
                <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>
                  ALSO LOVED
                </span>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {[
                  { name: '오방색 담요', price: 124000, color: '#B6A847' },
                  { name: '행운 향주머니', price: 22000, color: '#C8A847' },
                  { name: '丁未年 달력', price: 36000, color: '#494B1C' },
                ].map((rec) => (
                  <div key={rec.name} style={{
                    flex: 1, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', gap: 10,
                  }}>
                    <div style={{
                      width: '100%', aspectRatio: '1/1', borderRadius: 12,
                      backgroundColor: rec.color, position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
                    </div>
                    <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12, color: C.inkBrown, letterSpacing: '-0.01em' }}>{rec.name}</div>
                    <div style={{ fontFamily: 'Noto Sans KR', fontSize: 12, fontWeight: 600, color: C.inkBrown }}>₩ {rec.price.toLocaleString('ko-KR')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <OrderSummary
            subtotal={subtotal}
            couponCode={couponCode}
            onCouponApply={applyCode}
            couponError={couponError}
            onCheckout={() => setCheckedOut(true)}
          />
        </div>
      )}
    </div>
  );
}
