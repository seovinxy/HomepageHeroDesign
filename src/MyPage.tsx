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
  borderStrong: 'rgba(55,41,28,0.28)',
};

/* ── Scroll reveal ── */
function useReveal(threshold = 0.1) {
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

/* ── Section wrapper ── */
function Section({
  label, title, children, action,
}: {
  label: string; title: string; children: React.ReactNode; action?: React.ReactNode;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 12, marginBottom: 20,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 14, height: 2, backgroundColor: C.sealRed }} />
            <span style={{
              fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.18em', color: C.sealRed,
            }}>{label}</span>
          </div>
          <h2 style={{
            fontFamily: 'Noto Sans KR', fontWeight: 700,
            fontSize: 22, letterSpacing: '-0.01em',
            color: C.inkBrown, margin: 0,
          }}>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ── Card shell ── */
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      backgroundColor: C.cardPaper,
      border: `1.5px solid ${C.border}`,
      borderRadius: 18,
      boxShadow: `3px 5px 0 rgba(55,41,28,0.07)`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════
   1. PROFILE CARD
   ══════════════════════════════════ */
const ZODIAC_MAP: Record<number, { name: string; emoji: string; color: string }> = {
  0: { name: '쥐', emoji: '🐀', color: '#2B5BA1' },
  1: { name: '소', emoji: '🐂', color: '#C8A870' },
  2: { name: '호랑이', emoji: '🐯', color: '#C04040' },
  3: { name: '토끼', emoji: '🐇', color: '#5A7A6A' },
  4: { name: '용', emoji: '🐉', color: '#B6A847' },
  5: { name: '뱀', emoji: '🐍', color: '#494B1C' },
  6: { name: '말', emoji: '🐎', color: '#A6403C' },
  7: { name: '양', emoji: '🐑', color: '#AB0A00' },
  8: { name: '원숭이', emoji: '🐒', color: '#D4A017' },
  9: { name: '닭', emoji: '🐓', color: '#C8A847' },
  10: { name: '개', emoji: '🐕', color: '#8B6050' },
  11: { name: '돼지', emoji: '🐖', color: '#5A7A6A' },
};

function getZodiacIdx(year: number) { return ((year - 4) % 12 + 12) % 12; }

function ProfileCard() {
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState('복주머니 수집가');
  const [birthYear, setBirthYear] = useState(1991);
  const [draftNick, setDraftNick] = useState(nickname);
  const [draftYear, setDraftYear] = useState(String(birthYear));

  const zodiacIdx = getZodiacIdx(birthYear);
  const zodiac = ZODIAC_MAP[zodiacIdx];

  const save = () => {
    const y = parseInt(draftYear);
    if (!isNaN(y) && y >= 1900 && y <= 2025) setBirthYear(y);
    setNickname(draftNick || nickname);
    setEditing(false);
  };
  const cancel = () => {
    setDraftNick(nickname);
    setDraftYear(String(birthYear));
    setEditing(false);
  };

  return (
    <Card>
      <div style={{ padding: '32px 32px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              backgroundColor: zodiac.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, boxShadow: `3px 4px 0 rgba(55,41,28,0.14)`,
              border: `3px solid white`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.22) 0%, transparent 60%)' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{zodiac.emoji}</span>
            </div>
            {/* Edit photo button */}
            {editing && (
              <button style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 24, height: 24, borderRadius: '50%',
                backgroundColor: C.inkBrown, color: 'white',
                border: '2px solid white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
              }}>✎</button>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {editing ? (
              <input
                value={draftNick}
                onChange={(e) => setDraftNick(e.target.value)}
                style={{
                  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 20,
                  letterSpacing: '-0.015em', color: C.inkBrown,
                  border: `1.5px solid ${C.inkBrown}`, borderRadius: 8,
                  padding: '4px 10px', outline: 'none',
                  backgroundColor: 'white', width: '100%', marginBottom: 8,
                }}
              />
            ) : (
              <div style={{
                fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 22,
                letterSpacing: '-0.01em', color: C.inkBrown, marginBottom: 6,
              }}>{nickname}</div>
            )}

            {/* Zodiac guardian badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 12px',
                backgroundColor: zodiac.color,
                borderRadius: 999,
                boxShadow: '1px 2px 0 rgba(55,41,28,0.15)',
              }}>
                <span style={{ fontSize: 14 }}>{zodiac.emoji}</span>
                <span style={{
                  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12,
                  color: 'white', letterSpacing: '-0.01em',
                }}>
                  {zodiac.name}띠 수호자
                </span>
              </div>
              {editing ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6 }}>출생년도</span>
                  <input
                    type="number"
                    value={draftYear}
                    onChange={(e) => setDraftYear(e.target.value)}
                    style={{
                      fontFamily: 'Noto Sans KR', fontSize: 13, fontWeight: 700,
                      color: C.inkBrown, border: `1.5px solid ${C.border}`,
                      borderRadius: 8, padding: '4px 8px', outline: 'none',
                      backgroundColor: 'white', width: 80,
                    }}
                  />
                </div>
              ) : (
                <span style={{
                  fontFamily: 'Noto Sans KR', fontSize: 11, 
                  color: C.inkBrown, opacity: 0.4,
                }}>{birthYear}년생</span>
              )}
            </div>
          </div>

          {/* Edit toggle */}
          <div style={{ flexShrink: 0 }}>
            {editing ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={cancel} style={outlineBtn}>취소</button>
                <button onClick={save} style={solidBtn}>저장</button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                style={{
                  ...outlineBtn,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                편집
              </button>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, marginTop: 28,
          paddingTop: 22, borderTop: `1px solid ${C.border}`,
        }}>
          {[
            { n: '12', label: '관심 상품' },
            { n: '3', label: '주문 내역' },
            { n: '2', label: '보유 쿠폰' },
            { n: '5', label: '행운 부적' },
          ].map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center',
              borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
              padding: '0 8px',
            }}>
              <div style={{
                fontFamily: 'Noto Sans KR', fontSize: 24, fontWeight: 500,
                color: C.inkBrown, lineHeight: 1, marginBottom: 4,
              }}>{s.n}</div>
              <div style={{
                fontFamily: 'Noto Sans KR', fontSize: 11,
                color: C.inkBrown, opacity: 0.45,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

const outlineBtn: React.CSSProperties = {
  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12,
  color: C.inkBrown, backgroundColor: 'transparent',
  border: `1.5px solid ${C.border}`, borderRadius: 999,
  padding: '7px 16px', cursor: 'pointer', letterSpacing: '-0.01em',
  transition: 'border-color 0.15s',
};
const solidBtn: React.CSSProperties = {
  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12,
  color: 'white', backgroundColor: C.sealRed,
  border: 'none', borderRadius: 999,
  padding: '7px 16px', cursor: 'pointer', letterSpacing: '-0.01em',
  boxShadow: '1px 2px 0 rgba(55,41,28,0.15)',
};

/* ══════════════════════════════════
   2. WISH SCROLL ARCHIVE
   ══════════════════════════════════ */
const WISHES = [
  { id: 1, date: '2027. 01. 01', text: '새해에는 건강하고 하고 싶은 일 다 이루게 해주세요 🐑', color: C.sealRed, emoji: '🌸' },
  { id: 2, date: '2027. 01. 05', text: '소중한 사람들 모두 행복했으면 좋겠어요', color: C.mustard, emoji: '✨' },
  { id: 3, date: '2027. 01. 12', text: '올해는 꼭 원하는 곳에 합격하고 싶어요', color: C.olive, emoji: '🌿' },
];

function WishScroll() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState('');

  const addWish = () => {
    if (!draft.trim()) return;
    setDraft('');
    setComposing(false);
  };

  return (
    <Section label="WISH SCROLL · 소원 두루마리" title="나의 소원 보관함">
      <Card style={{ overflow: 'hidden' }}>
        {/* Scroll header */}
        <div style={{
          padding: '16px 24px',
          backgroundColor: C.creamSoft,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>📜</span>
            <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13, color: C.inkBrown }}>
              {WISHES.length}개의 소원이 담겨있습니다
            </span>
          </div>
          <button
            onClick={() => setComposing(!composing)}
            style={{ ...solidBtn, fontSize: 11, padding: '6px 14px' }}
          >
            + 소원 추가
          </button>
        </div>

        {/* Compose box */}
        {composing && (
          <div style={{
            padding: '18px 24px',
            borderBottom: `1px solid ${C.border}`,
            backgroundColor: 'rgba(171,10,0,0.03)',
          }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="새해 소원을 적어보세요…"
              rows={2}
              style={{
                width: '100%', fontFamily: 'Noto Sans KR', fontSize: 14,
                color: C.inkBrown, border: `1.5px solid ${C.border}`,
                borderRadius: 10, padding: '10px 14px', outline: 'none',
                backgroundColor: 'white', resize: 'none', boxSizing: 'border-box',
                lineHeight: 1.7,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
              <button onClick={() => setComposing(false)} style={outlineBtn}>취소</button>
              <button onClick={addWish} style={solidBtn}>소원 봉인 ✦</button>
            </div>
          </div>
        )}

        {/* Wish list */}
        {WISHES.map((w, i) => (
          <div
            key={w.id}
            onClick={() => setExpanded(expanded === w.id ? null : w.id)}
            style={{
              padding: '18px 24px',
              borderBottom: i < WISHES.length - 1 ? `1px solid ${C.border}` : 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              backgroundColor: expanded === w.id ? C.creamSoft : 'transparent',
            }}
            onMouseEnter={(e) => { if (expanded !== w.id) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(55,41,28,0.02)'; }}
            onMouseLeave={(e) => { if (expanded !== w.id) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              {/* Color dot + emoji */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                backgroundColor: w.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, boxShadow: '1px 2px 0 rgba(55,41,28,0.12)',
              }}>{w.emoji}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown,
                  opacity: 0.38, letterSpacing: '0.18em', marginBottom: 4,
                }}>{w.date}</div>
                <p style={{
                  fontFamily: 'Noto Sans KR', fontSize: 14, color: C.inkBrown,
                  lineHeight: 1.7, margin: 0,
                  display: expanded === w.id ? 'block' : '-webkit-box',
                  WebkitLineClamp: expanded === w.id ? 'unset' : 1,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: expanded === w.id ? 'visible' : 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {w.text}
                </p>
              </div>

              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                style={{
                  flexShrink: 0, marginTop: 4, transition: 'transform 0.2s',
                  transform: expanded === w.id ? 'rotate(180deg)' : 'rotate(0)',
                }}
              >
                <path d="M2 4l4 4 4-4" stroke={C.inkBrown} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              </svg>
            </div>

            {/* Expanded actions */}
            {expanded === w.id && (
              <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingLeft: 50 }}>
                <button style={{ ...outlineBtn, fontSize: 11, padding: '5px 12px' }}>✎ 수정</button>
                <button style={{
                  ...outlineBtn, fontSize: 11, padding: '5px 12px',
                  color: C.sealRed, borderColor: 'rgba(171,10,0,0.25)',
                }}>삭제</button>
              </div>
            )}
          </div>
        ))}
      </Card>
    </Section>
  );
}

/* ══════════════════════════════════
   3. ORDER HISTORY
   ══════════════════════════════════ */
const ORDERS = [
  {
    id: 'YUL-20270101-001', date: '2027. 01. 01', status: '배송완료',
    statusColor: C.olive,
    items: [
      { name: '양 복주머니 세트', qty: 1, price: 32000, color: '#C04040' },
      { name: '붉은 양 캔들', qty: 2, price: 42000, color: '#AB0A00' },
    ],
    total: 116000,
  },
  {
    id: 'YUL-20261225-007', date: '2026. 12. 25', status: '주문확인',
    statusColor: C.mustard,
    items: [{ name: '정미년 한지 엽서 세트', qty: 3, price: 24000, color: '#C8A454' }],
    total: 72000,
  },
  {
    id: 'YUL-20261210-003', date: '2026. 12. 10', status: '배송완료',
    statusColor: C.olive,
    items: [{ name: '율:12 티 세트', qty: 1, price: 96000, color: '#5A7A6A' }],
    total: 96000,
  },
];

function OrderHistory() {
  const [open, setOpen] = useState<string | null>(ORDERS[0].id);

  return (
    <Section
      label="ORDER HISTORY · 주문 내역"
      title="나의 주문"
      action={
        <button style={{ ...outlineBtn, fontSize: 11 }}>전체 보기</button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ORDERS.map((order) => {
          const isOpen = open === order.id;
          return (
            <Card key={order.id} style={{ overflow: 'hidden' }}>
              {/* Order header row */}
              <button
                onClick={() => setOpen(isOpen ? null : order.id)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '18px 22px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto auto',
                  gap: 16, alignItems: 'center',
                  textAlign: 'left',
                }}
              >
                {/* Order ID + date */}
                <div>
                  <div style={{
                    fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown,
                    opacity: 0.38, letterSpacing: '0.18em', marginBottom: 3,
                  }}>{order.date}</div>
                  <div style={{
                    fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13,
                    color: C.inkBrown, letterSpacing: '-0.01em',
                  }}>
                    {order.items.map((it) => it.name).join(', ')}
                    {order.items.length > 1 && ` 외 ${order.items.length - 1}건`}
                  </div>
                  <div style={{
                    fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown,
                    opacity: 0.3, letterSpacing: '0.04em', marginTop: 2,
                  }}>{order.id}</div>
                </div>

                {/* Status */}
                <div style={{
                  padding: '5px 12px', borderRadius: 999,
                  backgroundColor: order.statusColor,
                  fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 11,
                  color: 'white', whiteSpace: 'nowrap',
                }}>
                  {order.status}
                </div>

                {/* Total */}
                <div style={{
                  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 15,
                  color: C.inkBrown, whiteSpace: 'nowrap',
                }}>
                  ₩ {order.total.toLocaleString('ko-KR')}
                </div>

                {/* Chevron */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <path d="M2 4l4 4 4-4" stroke={C.inkBrown} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </svg>
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{
                  borderTop: `1px solid ${C.border}`,
                  padding: '16px 22px',
                  backgroundColor: C.creamSoft,
                }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: i > 0 ? '12px 0 0' : '0',
                      borderTop: i > 0 ? `1px solid ${C.border}` : 'none',
                      marginTop: i > 0 ? 12 : 0,
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        backgroundColor: item.color, overflow: 'hidden', position: 'relative',
                      }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13, color: C.inkBrown, letterSpacing: '-0.01em' }}>{item.name}</div>
                        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, opacity: 0.4, marginTop: 2 }}>
                          × {item.qty}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Noto Sans KR', fontSize: 13, fontWeight: 500, color: C.inkBrown }}>
                        ₩ {(item.price * item.qty).toLocaleString('ko-KR')}
                      </div>
                    </div>
                  ))}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                    <button style={{ ...outlineBtn, fontSize: 11, padding: '6px 14px' }}>배송 조회</button>
                    <button style={{ ...outlineBtn, fontSize: 11, padding: '6px 14px' }}>교환 / 반품</button>
                    <button style={{ ...outlineBtn, fontSize: 11, padding: '6px 14px' }}>리뷰 작성</button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════
   4. COUPON WALLET
   ══════════════════════════════════ */
const COUPONS = [
  {
    id: 'YUL2027', label: '신년 할인 쿠폰', desc: '₩ 5,000 할인',
    discount: '₩5,000', type: 'FLAT' as const,
    expiry: '2027. 03. 31', color: C.sealRed, usable: true,
  },
  {
    id: 'SHEEP10', label: '붉은 양 10% 쿠폰', desc: '10% 할인',
    discount: '10%', type: 'PCT' as const,
    expiry: '2027. 02. 28', color: C.berry, usable: true,
  },
  {
    id: 'WINTER5', label: '겨울맞이 쿠폰', desc: '₩ 3,000 할인',
    discount: '₩3,000', type: 'FLAT' as const,
    expiry: '2026. 12. 31', color: C.inkBrown, usable: false,
  },
];

function CouponWallet() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    setCopied(code);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <Section label="COUPON WALLET · 쿠폰 지갑" title="보유 쿠폰">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {COUPONS.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              display: 'flex',
              opacity: coupon.usable ? 1 : 0.5,
              position: 'relative',
            }}
          >
            <Card style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              border: coupon.usable ? `1.5px solid ${C.border}` : `1.5px dashed ${C.border}`,
              boxShadow: coupon.usable ? `3px 5px 0 rgba(55,41,28,0.07)` : 'none',
            }}>
              {/* Left color strip */}
              <div style={{
                width: 6, backgroundColor: coupon.color, flexShrink: 0,
              }} />

              {/* Discount badge */}
              <div style={{
                width: 90, flexShrink: 0,
                backgroundColor: coupon.color,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '20px 12px',
                position: 'relative',
              }}>
                {/* Punch holes */}
                <div style={{
                  position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)',
                  width: 20, height: 20, borderRadius: '50%',
                  backgroundColor: C.creamBg, zIndex: 2,
                  boxShadow: 'inset 0 0 0 1px rgba(55,41,28,0.1)',
                }} />
                <div style={{
                  fontFamily: 'Noto Sans KR', fontSize: 24, fontWeight: 700,
                  color: 'white', lineHeight: 1, letterSpacing: '-0.01em',
                  textAlign: 'center',
                }}>{coupon.discount}</div>
                <div style={{
                  fontFamily: 'Noto Sans KR', fontSize: 9, color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.18em', marginTop: 4,
                }}>{coupon.type === 'FLAT' ? 'OFF' : 'DISCOUNT'}</div>
              </div>

              {/* Dashed separator */}
              <div style={{
                width: 1, borderLeft: `2px dashed ${C.border}`,
                margin: '16px 0', flexShrink: 0, marginLeft: 10,
              }} />

              {/* Info */}
              <div style={{ flex: 1, padding: '18px 18px 18px 14px' }}>
                <div style={{
                  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 15,
                  color: C.inkBrown, letterSpacing: '-0.015em', marginBottom: 4,
                }}>{coupon.label}</div>
                <div style={{
                  fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown,
                  opacity: 0.55, marginBottom: 10,
                }}>{coupon.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke={C.inkBrown} strokeWidth="1.2" opacity="0.35" />
                      <path d="M7 4v3l2 2" stroke={C.inkBrown} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
                    </svg>
                    <span style={{
                      fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown,
                      opacity: 0.38, letterSpacing: '0.04em',
                    }}>
                      {coupon.usable ? `~${coupon.expiry}` : '기간 만료'}
                    </span>
                  </div>
                  {/* Code chip */}
                  <button
                    onClick={() => copy(coupon.id)}
                    disabled={!coupon.usable}
                    style={{
                      fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 500,
                      letterSpacing: '0.18em', color: coupon.usable ? coupon.color : C.inkBrown,
                      backgroundColor: coupon.usable ? `rgba(${coupon.color === C.sealRed ? '171,10,0' : '166,64,60'},0.08)` : C.creamSoft,
                      border: `1px solid ${coupon.usable ? coupon.color : C.border}`,
                      borderRadius: 999, padding: '4px 10px', cursor: coupon.usable ? 'pointer' : 'default',
                      transition: 'all 0.18s',
                    }}
                  >
                    {copied === coupon.id ? '복사됨 ✓' : coupon.id}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ))}

        {/* Add coupon */}
        <div style={{
          display: 'flex', gap: 0,
          border: `1.5px dashed ${C.border}`,
          borderRadius: 14, overflow: 'hidden',
        }}>
          <input
            type="text"
            placeholder="쿠폰 코드 입력"
            style={{
              flex: 1, fontFamily: 'Noto Sans KR', fontSize: 12,
              letterSpacing: '0.18em', color: C.inkBrown,
              backgroundColor: 'white', border: 'none',
              padding: '13px 18px', outline: 'none',
            }}
          />
          <button style={{
            backgroundColor: C.inkBrown, color: 'white',
            border: 'none', padding: '13px 22px',
            fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12,
            cursor: 'pointer', whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}>
            등록
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════
   5. LUCKY CHARM ARCHIVE
   ══════════════════════════════════ */
const CHARMS = [
  { id: 1, name: '새해 복 부적', date: '2027. 01. 01', zodiac: '양', emoji: '🐑', bg: C.sealRed, desc: '건강과 행복을 기원합니다', lucky: '적(赤)' },
  { id: 2, name: '재물운 부적', date: '2027. 01. 05', zodiac: '양', emoji: '💰', bg: C.mustard, desc: '풍요로운 한 해가 되길', lucky: '황(黃)' },
  { id: 3, name: '합격 기원 부적', date: '2027. 01. 12', zodiac: '용', emoji: '🐉', bg: C.olive, desc: '원하는 목표를 이루세요', lucky: '청(靑)' },
  { id: 4, name: '건강 수호 부적', date: '2026. 12. 25', zodiac: '쥐', emoji: '🌿', bg: '#5A7A6A', desc: '몸과 마음이 건강하길', lucky: '백(白)' },
  { id: 5, name: '인연 성취 부적', date: '2026. 12. 01', zodiac: '토끼', emoji: '🌸', bg: C.berry, desc: '좋은 인연을 만나세요', lucky: '적(赤)' },
  { id: 6, name: '여행 안녕 부적', date: '2026. 11. 11', zodiac: '말', emoji: '✈️', bg: '#2B5BA1', desc: '어디서든 평안하길', lucky: '청(靑)' },
];

function CharmThumbnail({ charm, onClick }: {
  charm: typeof CHARMS[0];
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left',
      }}
    >
      {/* Thumbnail square */}
      <div style={{
        width: '100%', aspectRatio: '1/1',
        backgroundColor: charm.bg,
        borderRadius: 16,
        border: `1.5px solid ${hov ? C.borderStrong : C.border}`,
        boxShadow: hov ? `4px 6px 0 rgba(55,41,28,0.14)` : `2px 4px 0 rgba(55,41,28,0.08)`,
        transition: 'all 0.25s ease',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {/* Texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        {/* Dashed border inner */}
        <div style={{
          position: 'absolute', inset: 8,
          border: '1px dashed rgba(255,255,255,0.25)', borderRadius: 10,
          pointerEvents: 'none',
        }} />

        {/* Emoji */}
        <span style={{
          fontSize: 32, lineHeight: 1,
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))',
          transition: 'transform 0.25s',
          transform: hov ? 'scale(1.12)' : 'scale(1)',
          position: 'relative', zIndex: 1,
        }}>{charm.emoji}</span>

        {/* Lucky color dot */}
        <span style={{
          fontFamily: 'Noto Sans KR', fontSize: 9, color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.18em', fontWeight: 600, position: 'relative', zIndex: 1,
        }}>{charm.lucky}</span>

        {/* Hover overlay */}
        {hov && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(55,41,28,0.55) 0%, transparent 100%)',
            padding: '10px 10px 8px',
            display: 'flex', justifyContent: 'flex-end',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              backgroundColor: 'white', opacity: 0.9,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M5 2h7v7" stroke={C.inkBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ paddingLeft: 2 }}>
        <div style={{
          fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 13,
          color: C.inkBrown, letterSpacing: '-0.01em', marginBottom: 2,
          transition: 'color 0.2s', ...(hov ? { color: charm.bg } : {}),
        }}>{charm.name}</div>
        <div style={{
          fontFamily: 'Noto Sans KR', fontSize: 10, 
          color: C.inkBrown, opacity: 0.38, letterSpacing: '0.04em',
        }}>{charm.date}</div>
      </div>
    </button>
  );
}

/* Charm detail modal */
function CharmModal({ charm, onClose }: { charm: typeof CHARMS[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(55,41,28,0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: C.cardPaper,
          border: `1.5px solid ${C.borderStrong}`,
          borderRadius: 22,
          boxShadow: `6px 10px 0 rgba(55,41,28,0.15)`,
          maxWidth: 360, width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Color top */}
        <div style={{
          backgroundColor: charm.bg,
          padding: '36px 28px 28px',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
          }} />
          <span style={{ fontSize: 64, filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.15))' }}>{charm.emoji}</span>
          <div style={{
            fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 22,
            letterSpacing: '-0.01em', color: 'white',
          }}>{charm.name}</div>
          <div style={{
            fontFamily: 'Noto Sans KR', fontSize: 12, 
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em',
          }}>{charm.zodiac}띠 · {charm.lucky}</div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px 28px' }}>
          <p style={{
            fontFamily: 'Noto Sans KR', fontSize: 15, lineHeight: 1.7,
            color: C.inkBrown, opacity: 0.75, margin: '0 0 20px', textAlign: 'center',
          }}>{charm.desc}</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            justifyContent: 'center', marginBottom: 24, opacity: 0.38,
          }}>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={C.inkBrown} strokeWidth="1.2" />
              <path d="M7 4v3l2 2" stroke={C.inkBrown} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, letterSpacing: '0.04em' }}>
              {charm.date}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ ...outlineBtn, flex: 1, textAlign: 'center' }}>공유하기</button>
            <button onClick={onClose} style={{ ...solidBtn, flex: 1, textAlign: 'center' }}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharmArchive() {
  const [selected, setSelected] = useState<typeof CHARMS[0] | null>(null);

  return (
    <Section
      label="LUCKY CHARM · 행운 부적"
      title="나의 행운 부적"
      action={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.4 }}>
            {CHARMS.length}개
          </span>
          <button style={{ ...outlineBtn, fontSize: 11 }}>+ 새 부적</button>
        </div>
      }
    >
      {/* Intro */}
      <p style={{
        fontFamily: 'Noto Sans KR', fontSize: 13, lineHeight: 1.8,
        color: C.inkBrown, opacity: 0.58, marginBottom: 22,
      }}>
        율:12에서 생성한 나만의 행운 부적 컬렉션입니다. 각 부적을 클릭하면 상세 정보를 확인할 수 있습니다.
      </p>

      {/* 3-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px 18px',
      }}>
        {CHARMS.map((charm) => (
          <CharmThumbnail key={charm.id} charm={charm} onClick={() => setSelected(charm)} />
        ))}
        {/* Add placeholder */}
        <button style={{
          background: 'none', border: `1.5px dashed ${C.border}`,
          borderRadius: 16, aspectRatio: '1/1', cursor: 'pointer',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'border-color 0.2s, background 0.2s',
          color: C.inkBrown,
        }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown;
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.creamSoft;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          <span style={{ fontSize: 24, opacity: 0.3 }}>+</span>
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, opacity: 0.35, letterSpacing: '-0.01em' }}>
            부적 만들기
          </span>
        </button>
      </div>

      {/* Modal */}
      {selected && <CharmModal charm={selected} onClose={() => setSelected(null)} />}
    </Section>
  );
}

/* ══════════════════════════════════
   MY PAGE ROOT
   ══════════════════════════════════ */
export default function MyPage() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 40px 120px' }}>

      {/* ── Page header ── */}
      <div style={{
        padding: '64px 0 48px',
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 48,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 20, height: 2, backgroundColor: C.sealRed }} />
          <span style={{
            fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.18em', color: C.sealRed,
          }}>MY PAGE · 마이페이지</span>
        </div>
        <h1 className="display-title" style={{
          fontSize: 'clamp(36px, 5vw, 60px)',
          color: C.inkBrown, margin: 0,
        }}>
          안녕하세요
          <br />
          <span style={{
            fontFamily: 'Noto Sans KR', 
            fontWeight: 700, fontSize: '0.55em', opacity: 0.32,
          }}>My Account</span>
        </h1>
      </div>

      {/* ── Sections ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        <ProfileCard />
        <WishScroll />
        <OrderHistory />
        <CouponWallet />
        <CharmArchive />
      </div>

      {/* ── Bottom sign out ── */}
      <div style={{
        marginTop: 72, paddingTop: 32, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{
          fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.18em',
          color: C.inkBrown, opacity: 0.3,
        }}>YUL:12 · 2027 丁未年</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ ...outlineBtn, fontSize: 11 }}>설정</button>
          <button style={{
            ...outlineBtn, fontSize: 11,
            color: C.sealRed, borderColor: 'rgba(171,10,0,0.25)',
          }}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}
