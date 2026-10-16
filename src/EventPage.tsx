import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useSheepHunt, SHEEP_LIST } from '@/HiddenSheep';
import sheepStampImg from '@/assets/sheep-hero.png';
import hiddenSheepImg from '@/imports/yul_sheep_character.png';

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
  hairline: 'rgba(55,41,28,0.12)',
};

const SANS = "'Noto Sans KR', sans-serif";

/* Shared text styles — kept in one place so spacing stays consistent */
const eyebrow = (color: string = C.inkBrown): CSSProperties => ({
  fontFamily: SANS, fontSize: 11, fontWeight: 600,
  letterSpacing: '0.14em', color, margin: 0,
});
const label: CSSProperties = {
  fontFamily: SANS, fontSize: 13, fontWeight: 600,
  color: C.inkBrown, letterSpacing: '-0.005em', margin: 0,
};
const caption: CSSProperties = {
  fontFamily: SANS, fontSize: 12, lineHeight: 1.65,
  color: C.inkBrown, opacity: 0.58, margin: 0,
};

/* ── Scroll reveal ── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
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

/* ── 3D Sheep Stamp image ── */
function SheepStamp({ size = 64 }: { size?: number }) {
  return (
    <img
      src={sheepStampImg}
      alt=""
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', userSelect: 'none', pointerEvents: 'none' }}
    />
  );
}

const stampKeyframes = `
@keyframes stamp-in {
  0%   { transform: scale(1.8) rotate(-8deg); opacity: 0; }
  40%  { transform: scale(0.88) rotate(3deg); opacity: 1; }
  60%  { transform: scale(1.06) rotate(-1deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes hint-fade {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes seg-pending {
  0%,100% { opacity: 0.35; }
  50%     { opacity: 0.8; }
}
`;

/* ─────────────────────────────────────────────
   Progress gauge — segmented, with a visible label,
   value and start / end markers so it can't be read as a scrollbar.
   ───────────────────────────────────────────── */
function ProgressGauge({
  title, value, total, unit, accent, startLabel, endLabel, note, pending = false,
}: {
  title: string;
  value: number;
  total: number;
  unit: string;
  accent: string;
  startLabel: string;
  endLabel: string;
  note?: ReactNode;
  /** Highlights the next segment as "in progress" (e.g. today's wish not yet sealed) */
  pending?: boolean;
}) {
  return (
    <div
      role="progressbar"
      aria-label={title}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={value}
      aria-valuetext={`${total}${unit} 중 ${value}${unit}`}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <p style={label}>{title}</p>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 12, color: C.inkBrown }}>
          <span className="display-title" style={{ fontSize: 22, color: accent, lineHeight: 1 }}>{value}</span>
          <span style={{ opacity: 0.45, marginLeft: 3 }}>/ {total}{unit}</span>
        </p>
      </div>

      <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
        {Array.from({ length: total }, (_, i) => {
          const filled = i < value;
          const isNext = pending && i === value;
          return (
            <div
              key={i}
              style={{
                flex: 1, height: 10, borderRadius: 2,
                backgroundColor: filled ? accent : 'rgba(55,41,28,0.08)',
                boxShadow: isNext ? `inset 0 0 0 1.5px ${accent}` : 'none',
                animation: isNext ? 'seg-pending 1.8s ease-in-out infinite' : 'none',
                transition: 'background-color 0.4s ease',
              }}
            />
          );
        })}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: 8,
        fontFamily: SANS, fontSize: 11, color: C.inkBrown, opacity: 0.5,
      }}>
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>

      {note && <p style={{ ...caption, marginTop: 12 }}>{note}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section shell — numbered editorial header + card
   ───────────────────────────────────────────── */
function EventSection({
  id, no, accent, kicker, title, summary, meta, children,
}: {
  id: string;
  no: string;
  accent: string;
  kicker: string;
  title: string;
  summary: string;
  meta: { term: string; desc: string }[];
  children: ReactNode;
}) {
  const { ref, visible } = useReveal(0.06);
  return (
    <section
      id={id}
      ref={ref}
      style={{
        scrollMarginTop: 112,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <header style={{
        display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)',
        columnGap: 28, alignItems: 'start', marginBottom: 28,
      }}>
        <span
          className="display-title display-title--latin"
          aria-hidden
          style={{ fontSize: 64, color: accent, lineHeight: 0.9 }}
        >{no}</span>
        <div>
          <p style={eyebrow(accent)}>{kicker}</p>
          <h2 className="display-title" style={{ fontSize: 'clamp(26px, 3vw, 34px)', color: C.inkBrown, margin: '8px 0 10px' }}>
            {title}
          </h2>
          <p style={{ ...caption, fontSize: 14, opacity: 0.66, maxWidth: 520 }}>{summary}</p>

          <dl style={{ display: 'flex', flexWrap: 'wrap', margin: '18px 0 0', padding: 0 }}>
            {meta.map((m, i) => (
              <div
                key={m.term}
                style={{
                  display: 'flex', gap: 8, alignItems: 'baseline',
                  paddingRight: 16, marginRight: 16,
                  borderRight: i < meta.length - 1 ? `1px solid ${C.hairline}` : 'none',
                  fontFamily: SANS, fontSize: 12, color: C.inkBrown,
                }}
              >
                <dt style={{ opacity: 0.45 }}>{m.term}</dt>
                <dd style={{ margin: 0, fontWeight: 500 }}>{m.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div style={{
        backgroundColor: C.cardPaper,
        border: `1px solid ${C.border}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 16,
        boxShadow: `3px 4px 0 rgba(55,41,28,0.07)`,
      }}>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EVENT 01 — 일곱 마리 행운양 찾기
   ───────────────────────────────────────────── */
// Ordered to match SHEEP_LIST: hero, footer, shop, fortune, product, cart, result
const HINTS = [
  '홈 화면 오른쪽 위, 반짝이며 떠다니는 별들 사이에 별이 아닌 친구가 섞여 있어요.',
  '페이지 맨 아래 푸터, 저작권 문구 위 구분선에 누군가 걸터앉아 쉬고 있어요.',
  'SHOP 페이지 상단 오른쪽, "총 상품" 개수 배지 위에 살포시 올라앉아 있어요.',
  '운세 페이지의 출생년도 입력 카드, 왼쪽 위 모서리에서 고개를 내밀고 있어요.',
  '상품 상세 페이지의 큰 상품 사진, 왼쪽 아래 모서리를 잘 살펴보세요.',
  '장바구니 페이지의 "주문 요약" 카드, 오른쪽 위 테두리 너머로 빼꼼 보여요.',
  '운세 결과 카드에서 별점 다섯 개가 끝나는 자리에 무언가 반짝이고 있어요.',
];

const HUNT_STEPS = [
  '사이트 곳곳에 작은 양이 숨어 있어요.',
  '찾은 양을 클릭하면 이 보드에 도장이 찍혀요.',
  '일곱 마리를 모두 모으면 쿠폰을 드려요.',
];

function SheepHuntEvent() {
  const { found: globalFound } = useSheepHunt();
  const found = SHEEP_LIST.map((s) => globalFound.has(s.id));
  const totalFound = found.filter(Boolean).length;
  const allFound = totalFound === 7;

  // Default to the first sheep that hasn't been found yet
  const [hintIdx, setHintIdx] = useState(() => {
    const i = SHEEP_LIST.findIndex((s) => !globalFound.has(s.id));
    return i === -1 ? 0 : i;
  });
  const [hintOpen, setHintOpen] = useState(false);

  const toggleHint = () => setHintOpen((o) => !o);
  // Picking a number (or an empty slot) reveals that sheep's hint right away
  const selectHint = (i: number) => { setHintIdx(i); setHintOpen(true); };

  const rows = [[0, 1, 2, 3], [4, 5, 6]];

  return (
    <EventSection
      id="event-sheep"
      no="01"
      accent={C.sealRed}
      kicker="LUCKY SHEEP HUNT"
      title="일곱 마리 행운양 찾기"
      summary="율:12 곳곳에 일곱 마리의 양이 숨어 있어요. 모두 찾아 도장을 채우면 정미년 행운 쿠폰을 드립니다."
      meta={[
        { term: '참여', desc: '양 클릭' },
        { term: '보상', desc: '쿠폰 LUCKY777' },
        { term: '기간', desc: '설날 연휴까지' },
      ]}
    >
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 40, padding: '32px 32px 28px',
      }}>
        {/* Stamp board */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <p style={label}>스탬프 보드</p>
            <p style={{ ...caption, fontSize: 11 }}>빈 칸을 누르면 힌트가 열려요</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rows.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 12, justifyContent: ri === 1 ? 'center' : 'flex-start' }}>
                {row.map((i) => {
                  const isFound = found[i];
                  const isActive = hintOpen && hintIdx === i && !isFound;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => !isFound && selectHint(i)}
                      disabled={isFound}
                      aria-label={isFound ? `${SHEEP_LIST[i].name} 발견 완료` : `${i + 1}번 양 힌트 보기`}
                      style={{
                        width: 76, height: 76, flexShrink: 0, padding: 0,
                        borderRadius: '50%',
                        border: isFound
                          ? `1.5px solid ${C.sealRed}`
                          : `1.5px ${isActive ? 'solid' : 'dashed'} ${isActive ? C.sealRed : C.borderStrong}`,
                        backgroundColor: isFound ? 'rgba(171,10,0,0.05)' : 'transparent',
                        cursor: isFound ? 'default' : 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        transition: 'border-color 0.2s, background-color 0.2s',
                      }}
                    >
                      {isFound ? (
                        <div style={{ animation: 'stamp-in 0.35s cubic-bezier(0.2,0.8,0.4,1.1) forwards', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <SheepStamp size={44} />
                          <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, color: C.sealRed, marginTop: 1 }}>
                            {SHEEP_LIST[i].name}
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="display-title display-title--latin" style={{ fontSize: 20, color: C.inkBrown, opacity: 0.32, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span style={{ fontFamily: SANS, fontSize: 10, color: C.inkBrown, opacity: 0.45, marginTop: 4 }}>
                            {SHEEP_LIST[i].name}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <ProgressGauge
              title="수집 게이지"
              value={totalFound}
              total={7}
              unit="마리"
              accent={C.sealRed}
              startLabel="시작"
              endLabel="7마리 · 쿠폰 지급"
            />
          </div>
        </div>

        {/* Guide */}
        <aside style={{ borderLeft: `1px solid ${C.hairline}`, paddingLeft: 32 }}>
          <p style={label}>이렇게 생긴 양이에요</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            marginTop: 14, padding: '14px 16px',
            backgroundColor: C.creamSoft, borderRadius: 12,
          }}>
            <img src={hiddenSheepImg} alt="숨은 양 예시" width={44} height={44} style={{ objectFit: 'contain', flexShrink: 0 }} />
            <p style={{ ...caption, fontSize: 12 }}>실제 크기 그대로예요.<br />별이나 카드 가장자리를 살펴보세요.</p>
          </div>

          <p style={{ ...label, marginTop: 28 }}>참여 방법</p>
          <ol style={{ listStyle: 'none', margin: '12px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HUNT_STEPS.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span className="display-title display-title--latin" style={{ fontSize: 14, color: C.sealRed, minWidth: 18 }}>
                  {i + 1}
                </span>
                <span style={{ ...caption, fontSize: 13, opacity: 0.75 }}>{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {/* Hint */}
      <div style={{ borderTop: `1px solid ${C.hairline}`, padding: '22px 32px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={label}>힌트</p>
            <p style={{ ...caption, marginTop: 2 }}>
              {hintOpen ? '다른 번호를 누르면 바로 바뀌어요.' : '막히면 번호를 골라 보세요.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }} role="group" aria-label="힌트 번호 선택">
              {SHEEP_LIST.map((s, i) => {
                const active = hintOpen && i === hintIdx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectHint(i)}
                    aria-pressed={active}
                    title={found[i] ? `${s.name} (발견 완료)` : `${i + 1}번 양 힌트`}
                    style={{
                      width: 28, height: 28, borderRadius: '50%', padding: 0,
                      border: `1px solid ${active ? C.sealRed : found[i] ? 'transparent' : C.border}`,
                      backgroundColor: active ? C.sealRed : found[i] ? 'rgba(73,75,28,0.12)' : 'transparent',
                      color: active ? 'white' : C.inkBrown,
                      opacity: found[i] && !active ? 0.55 : 1,
                      fontFamily: SANS, fontSize: 11, fontWeight: 500,
                      cursor: 'pointer', transition: 'background-color 0.15s, border-color 0.15s',
                    }}
                  >{i + 1}</button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={toggleHint}
              aria-expanded={hintOpen}
              style={{
                fontFamily: SANS, fontWeight: 600, fontSize: 12,
                backgroundColor: hintOpen ? 'transparent' : C.inkBrown,
                color: hintOpen ? C.inkBrown : C.cardPaper,
                border: `1px solid ${C.inkBrown}`, borderRadius: 999,
                padding: '7px 16px', cursor: 'pointer',
                transition: 'background-color 0.15s, color 0.15s',
              }}
            >
              {hintOpen ? '닫기' : '힌트 열기'}
            </button>
          </div>
        </div>

        {hintOpen && (
          <div key={hintIdx} style={{
            animation: 'hint-fade 0.25s ease',
            marginTop: 18, paddingLeft: 14,
            borderLeft: `2px solid ${C.sealRed}`,
          }}>
            <p style={{ ...eyebrow(C.sealRed), fontSize: 10 }}>
              NO.{String(hintIdx + 1).padStart(2, '0')} · {SHEEP_LIST[hintIdx].name}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: C.inkBrown, margin: '6px 0 0' }}>
              {HINTS[hintIdx]}
            </p>
          </div>
        )}
      </div>

      {allFound && (
        <div style={{
          margin: '0 32px 28px', padding: '20px 24px',
          backgroundColor: C.olive, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          animation: 'hint-fade 0.4s ease forwards',
        }}>
          <div>
            <p className="display-title" style={{ fontSize: 20, color: 'white', margin: 0 }}>일곱 마리를 모두 찾았어요</p>
            <p style={{ ...caption, color: 'white', opacity: 0.7, marginTop: 4 }}>
              장바구니에서 쿠폰 코드 <strong style={{ fontWeight: 600, opacity: 1 }}>LUCKY777</strong>을 입력하세요.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText('LUCKY777').catch(() => {})}
            style={{
              fontFamily: SANS, fontWeight: 600, fontSize: 13,
              backgroundColor: C.mustard, color: C.inkBrown,
              border: 'none', borderRadius: 999, padding: '10px 20px', cursor: 'pointer',
            }}
          >
            코드 복사
          </button>
        </div>
      )}
    </EventSection>
  );
}

/* ─────────────────────────────────────────────
   EVENT 02 — 정미년 하루 한 번 소원 상자
   ───────────────────────────────────────────── */
const WISH_PROMPTS = [
  '오늘 가장 바라는 것은 무엇인가요?',
  '올해 꼭 이루고 싶은 것이 있나요?',
  '지금 이 순간 떠오르는 소원은?',
  '요즘 나에게 가장 필요한 행운은?',
];

type StampState = 'empty' | 'filled' | 'today';

function WishBoxEvent() {
  const totalSlots = 10;
  const [stamps, setStamps] = useState<StampState[]>(() => {
    const arr: StampState[] = Array(totalSlots).fill('empty');
    // Pre-fill some as if days have passed
    arr[0] = 'filled';
    arr[1] = 'filled';
    arr[2] = 'filled';
    arr[3] = 'today';
    return arr;
  });
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sealedDay, setSealedDay] = useState<number | null>(null);
  const [promptIdx] = useState(() => Math.floor(Math.random() * WISH_PROMPTS.length));

  const todayIdx = stamps.findIndex((s) => s === 'today');
  // stamps already include today's wish once it's sealed, so no extra +1
  const filledCount = stamps.filter((s) => s === 'filled').length;
  const remaining = totalSlots - filledCount;
  const canSubmit = todayIdx >= 0 && !submitted && wish.trim().length >= 2;

  const submitWish = () => {
    if (!canSubmit) return;
    const next = [...stamps];
    next[todayIdx] = 'filled';
    if (todayIdx + 1 < totalSlots) next[todayIdx + 1] = 'today';
    setStamps(next);
    setSealedDay(todayIdx + 1);
    setSubmitted(true);
  };

  const handleWishChange = (v: string) => {
    if (v.length <= 80) setWish(v);
  };

  return (
    <EventSection
      id="event-wish"
      no="02"
      accent={C.olive}
      kicker="DAILY WISH BOX"
      title="하루 한 번 소원 상자"
      summary="매일 한 가지 소원을 적어 봉인하세요. 열 번을 채우면 나만의 정미년 행운 부적이 완성됩니다."
      meta={[
        { term: '참여', desc: '하루 1회' },
        { term: '보상', desc: '행운 부적' },
        { term: '공개', desc: '나만 보기' },
      ]}
    >
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 40, padding: '32px 32px 28px',
      }}>
        {/* Calendar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <p style={label}>소원 달력</p>
            <p style={{ ...caption, fontSize: 11 }}>
              {submitted ? `${sealedDay}일째 봉인 완료` : todayIdx >= 0 ? `오늘은 ${todayIdx + 1}일째` : '모두 채웠어요'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {stamps.map((state, i) => {
              const isToday = state === 'today' && !submitted;
              const isFilled = state === 'filled';
              return (
                <div
                  key={i}
                  aria-label={`${i + 1}일째 ${isFilled ? '봉인됨' : isToday ? '오늘' : '비어 있음'}`}
                  style={{
                    aspectRatio: '1 / 1', borderRadius: 10, position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: isFilled
                      ? `1px solid rgba(73,75,28,0.3)`
                      : isToday ? `1.5px solid ${C.sealRed}` : `1px dashed ${C.border}`,
                    backgroundColor: isFilled ? 'rgba(73,75,28,0.07)' : isToday ? 'rgba(171,10,0,0.04)' : 'transparent',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: 5, left: 7,
                    fontFamily: SANS, fontSize: 10, fontWeight: 500,
                    color: isToday ? C.sealRed : C.inkBrown,
                    opacity: isToday ? 1 : 0.4,
                  }}>{i + 1}</span>

                  {isFilled && (
                    <div style={{ animation: 'stamp-in 0.35s ease forwards' }}>
                      <SheepStamp size={36} />
                    </div>
                  )}
                  {isToday && (
                    <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: C.sealRed }}>오늘</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wish form */}
        <div>
          {submitted ? (
            <div style={{
              height: '100%', minHeight: 220,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '24px 4px', animation: 'hint-fade 0.4s ease forwards',
            }}>
              <p style={eyebrow(C.olive)}>SEALED · {sealedDay}일째</p>
              <p className="display-title" style={{ fontSize: 22, color: C.inkBrown, margin: '12px 0 14px' }}>
                “{wish.trim()}”
              </p>
              <p style={caption}>소원이 상자에 담겼어요. 내일 다시 와서 다음 칸을 채워 주세요.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="wish-input" style={label}>오늘의 질문</label>
              <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: C.inkBrown, margin: '6px 0 14px', letterSpacing: '-0.01em' }}>
                {WISH_PROMPTS[promptIdx]}
              </p>

              <textarea
                id="wish-input"
                value={wish}
                onChange={(e) => handleWishChange(e.target.value)}
                placeholder="두 글자 이상 적어 주세요"
                rows={4}
                style={{
                  width: '100%',
                  fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: C.inkBrown,
                  border: `1px solid ${wish.length > 0 ? C.olive : C.border}`,
                  borderRadius: 10, padding: '12px 14px',
                  outline: 'none', resize: 'none', backgroundColor: 'white',
                  transition: 'border-color 0.2s',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <p style={{ ...caption, fontSize: 11 }}>하루 한 번만 담을 수 있고, 나만 볼 수 있어요.</p>
                <p style={{ ...caption, fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>{wish.length}/80</p>
              </div>

              <button
                type="button"
                onClick={submitWish}
                disabled={!canSubmit}
                style={{
                  marginTop: 16,
                  fontFamily: SANS, fontWeight: 600, fontSize: 14,
                  backgroundColor: canSubmit ? C.olive : 'transparent',
                  color: canSubmit ? 'white' : C.inkBrown,
                  border: `1px solid ${canSubmit ? C.olive : C.border}`,
                  borderRadius: 999, padding: '13px 24px',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  opacity: canSubmit ? 1 : 0.55,
                  transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
                }}
              >
                소원 봉인하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gauge — full width, clearly labelled */}
      <div style={{ borderTop: `1px solid ${C.hairline}`, padding: '22px 32px 26px' }}>
        <ProgressGauge
          title="부적 완성 게이지"
          value={filledCount}
          total={totalSlots}
          unit="일"
          accent={C.olive}
          startLabel="1일째"
          endLabel="10일째 · 행운 부적 완성"
          pending={!submitted && todayIdx >= 0}
          note={
            remaining > 0
              ? <>소원을 <strong style={{ fontWeight: 600, color: C.inkBrown }}>{remaining}번</strong> 더 담으면 행운 부적이 완성돼요.{!submitted && ' 깜빡이는 칸이 오늘 채울 자리예요.'}</>
              : '행운 부적이 완성됐어요. 마이페이지에서 확인하세요.'
          }
        />
      </div>
    </EventSection>
  );
}

/* ═══════════════════════════════════
   EVENT PAGE ROOT
   ═══════════════════════════════════ */
export default function EventPage() {
  const { found } = useSheepHunt();

  const index = [
    { id: 'event-sheep', no: '01', title: '일곱 마리 행운양 찾기', status: `${found.size}/7 발견`, accent: C.sealRed },
    { id: 'event-wish', no: '02', title: '하루 한 번 소원 상자', status: '매일 참여', accent: C.olive },
  ];

  return (
    <>
      <style>{stampKeyframes}</style>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 40px 120px' }}>

        {/* ── Page header ── */}
        <header style={{
          padding: '72px 0 44px',
          borderBottom: `1px solid ${C.border}`,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48, alignItems: 'end',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ width: 20, height: 1.5, backgroundColor: C.sealRed }} />
              <span style={eyebrow(C.sealRed)}>2027 丁未年 — SPECIAL EVENT</span>
            </div>
            <h1 className="display-title display-title--latin" style={{
              fontSize: 'clamp(40px, 6vw, 72px)', color: C.inkBrown, margin: '0 0 20px',
            }}>
              YUL:12<br />
              <span style={{ color: C.sealRed }}>EVENT</span>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.8, color: C.inkBrown, opacity: 0.62, margin: 0, maxWidth: 420 }}>
              정미년을 함께 맞이하는 율:12의 두 가지 이벤트.
              숨은 양을 찾고, 매일 소원을 담아 보세요.
            </p>
          </div>

          {/* Event index */}
          <nav aria-label="이벤트 목차">
            <p style={{ ...eyebrow(), opacity: 0.45, marginBottom: 10 }}>IN THIS PAGE</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `1px solid ${C.border}` }}>
              {index.map((e) => (
                <li key={e.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <a
                    href={`#${e.id}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(e.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    style={{
                      display: 'grid', gridTemplateColumns: '32px 1fr auto', alignItems: 'baseline',
                      gap: 8, padding: '14px 2px', textDecoration: 'none', color: C.inkBrown,
                      transition: 'padding-left 0.2s ease',
                    }}
                    onMouseEnter={(ev) => { ev.currentTarget.style.paddingLeft = '8px'; }}
                    onMouseLeave={(ev) => { ev.currentTarget.style.paddingLeft = '2px'; }}
                  >
                    <span className="display-title display-title--latin" style={{ fontSize: 16, color: e.accent }}>{e.no}</span>
                    <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500 }}>{e.title}</span>
                    <span style={{ fontFamily: SANS, fontSize: 11, opacity: 0.5, fontVariantNumeric: 'tabular-nums' }}>{e.status}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* ── Events ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 88, marginTop: 64 }}>
          <SheepHuntEvent />
          <WishBoxEvent />
        </div>

        {/* ── Footer note ── */}
        <div style={{
          marginTop: 88, paddingTop: 24, borderTop: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        }}>
          <p style={{ ...caption, fontSize: 12, opacity: 0.5 }}>
            이벤트는 2027년 丁未年 설날 연휴 동안 진행됩니다.
          </p>
          <p style={{ ...caption, fontSize: 12, opacity: 0.5 }}>
            문의 hello@yul12.kr
          </p>
        </div>
      </div>
    </>
  );
}
