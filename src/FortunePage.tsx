import { useState, useEffect, useRef } from 'react';
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
  borderStrong: 'rgba(55,41,28,0.30)',
};

/* ── Obangsaek palette ── */
const OBANGSAEK = [
  { id: 'blue',   hex: '#2A5478', name: '청(靑)', english: 'Blue',   meaning: '동쪽 · 봄 · 희망' },
  { id: 'red',    hex: '#AB0A00', name: '적(赤)', english: 'Red',    meaning: '남쪽 · 여름 · 열정' },
  { id: 'yellow', hex: '#8B7322', name: '황(黃)', english: 'Yellow', meaning: '중앙 · 균형 · 신뢰' },
  { id: 'white',  hex: '#DDD5C0', name: '백(白)', english: 'White',  meaning: '서쪽 · 가을 · 순수' },
  { id: 'black',  hex: '#37291C', name: '흑(黑)', english: 'Black',  meaning: '북쪽 · 겨울 · 지혜' },
];

/* ── Tone-matched product catalog (mirrors ShopPage PRODUCTS) ── */
const TONE_PRODUCTS: Record<string, { name: string; sub: string; price: number; color: string; tag: string }> = {
  red:    { name: '액막이 인형',  sub: 'Lucky Talisman Doll',  price: 32000, color: '#C04040', tag: '인형' },
  blue:   { name: '벽걸이 캘린더', sub: 'Wall Calendar 2027',  price: 18000, color: '#2A5478', tag: '지류' },
  yellow: { name: '쿠키 세트',   sub: 'Lucky Cookie Set',     price: 16000, color: '#C8A847', tag: '식품' },
  white:  { name: '비누',        sub: 'Handcraft Soap',       price: 9000,  color: '#D6CDB8', tag: '리빙' },
  black:  { name: '캔들',        sub: 'Soy Wax Candle',       price: 22000, color: '#37291C', tag: '리빙' },
};

/* ── 12 Zodiac data ── */
const ZODIAC: Record<number, {
  name: string; hanja: string; english: string; emoji: string;
  fortune: string; luckyColor: typeof OBANGSAEK[0]; luckyItem: string;
  poems: string[];
}> = {
  0:  { name: '쥐', hanja: '子', english: 'Rat', emoji: '🐀',
    fortune: '오늘은 예상치 못한 기회가 당신을 찾아옵니다. 영리한 판단으로 새로운 시작을 열어보세요. 오후의 작은 대화가 큰 인연이 될 수 있습니다.',
    luckyColor: OBANGSAEK[0], luckyItem: '파란 노트',
    poems: ['"영리한 자는 기회를 만들고,\n현명한 자는 기회를 잡는다"'],
  },
  1:  { name: '소', hanja: '丑', english: 'Ox', emoji: '🐂',
    fortune: '성실한 노력이 드디어 결실을 맺는 날입니다. 서두르지 말고 차분하게 나아가세요. 오늘의 인내가 내일의 풍요로움을 만듭니다.',
    luckyColor: OBANGSAEK[3], luckyItem: '흰 손수건',
    poems: ['"천 리 길도 한 걸음부터,\n오늘의 한 걸음이 소중합니다"'],
  },
  2:  { name: '호랑이', hanja: '寅', english: 'Tiger', emoji: '🐯',
    fortune: '강한 에너지가 넘치는 하루입니다. 리더십을 발휘할 기회가 찾아옵니다. 두려움 없이 앞으로 나아가면 주변이 따라옵니다.',
    luckyColor: OBANGSAEK[1], luckyItem: '붉은 머플러',
    poems: ['"용기 있는 자만이\n새로운 세계를 열 수 있습니다"'],
  },
  3:  { name: '토끼', hanja: '卯', english: 'Rabbit', emoji: '🐇',
    fortune: '평화로운 하루가 기다립니다. 섬세한 감수성이 빛을 발하는 날, 좋아하는 사람과 함께하면 운이 더욱 좋아집니다.',
    luckyColor: OBANGSAEK[0], luckyItem: '파란 팔찌',
    poems: ['"봄날의 토끼처럼,\n가볍고 따뜻하게 오늘을 걸어가세요"'],
  },
  4:  { name: '용', hanja: '辰', english: 'Dragon', emoji: '🐉',
    fortune: '행운의 기운이 가득한 날입니다. 큰 꿈을 꾸고 당당하게 움직이세요. 오늘 시작한 일은 반드시 성공의 씨앗이 됩니다.',
    luckyColor: OBANGSAEK[2], luckyItem: '황금 메모지',
    poems: ['"하늘을 나는 용처럼,\n한계 없이 오늘을 펼쳐보세요"'],
  },
  5:  { name: '뱀', hanja: '巳', english: 'Snake', emoji: '🐍',
    fortune: '깊은 직관이 살아나는 날입니다. 겉으로 보이는 것 너머를 읽어내는 능력이 빛납니다. 조용히 생각하는 시간을 가져보세요.',
    luckyColor: OBANGSAEK[1], luckyItem: '붉은 다이어리',
    poems: ['"고요한 물이 깊듯,\n침묵 속에서 지혜가 자랍니다"'],
  },
  6:  { name: '말', hanja: '午', english: 'Horse', emoji: '🐎',
    fortune: '활력과 열정이 넘치는 하루입니다. 자유로운 발상이 좋은 결과를 가져옵니다. 움직일수록 운이 따라옵니다.',
    luckyColor: OBANGSAEK[1], luckyItem: '붉은 스카프',
    poems: ['"달리는 말처럼, 멈추지 말고\n오늘의 길을 힘차게 달려가세요"'],
  },
  7:  { name: '양', hanja: '未', english: 'Sheep', emoji: '🐑',
    fortune: '따뜻한 온기가 오늘 하루를 감쌉니다. 창의적인 아이디어가 넘쳐나는 날로, 예술적인 활동이 특히 길합니다. 소중한 사람에게 마음을 전해보세요.',
    luckyColor: OBANGSAEK[1], luckyItem: '붉은 복주머니',
    poems: ['"양은 무리와 함께 따뜻하고,\n홀로 서도 평화로운 존재입니다"'],
  },
  8:  { name: '원숭이', hanja: '申', english: 'Monkey', emoji: '🐒',
    fortune: '재치와 기지가 빛나는 하루입니다. 예상치 못한 해결책이 떠오르는 날, 유머를 잃지 않으면서도 핵심을 파악하세요.',
    luckyColor: OBANGSAEK[2], luckyItem: '황금 열쇠고리',
    poems: ['"영리한 손보다\n열린 마음이 더 많은 것을 잡습니다"'],
  },
  9:  { name: '닭', hanja: '酉', english: 'Rooster', emoji: '🐓',
    fortune: '새벽을 깨우는 닭처럼, 오늘은 먼저 시작하는 자가 기회를 잡습니다. 정직하고 당당한 태도가 주변의 신뢰를 얻습니다.',
    luckyColor: OBANGSAEK[2], luckyItem: '황금 펜',
    poems: ['"일찍 일어나는 새가\n아름다운 하루를 먼저 맞습니다"'],
  },
  10: { name: '개', hanja: '戌', english: 'Dog', emoji: '🐕',
    fortune: '충직한 마음이 보상받는 날입니다. 신뢰를 쌓아온 관계에서 좋은 소식이 올 수 있습니다. 진심 어린 말 한마디가 큰 힘이 됩니다.',
    luckyColor: OBANGSAEK[3], luckyItem: '흰 머그컵',
    poems: ['"믿음직한 마음은\n어떤 보석보다 귀합니다"'],
  },
  11: { name: '돼지', hanja: '亥', english: 'Pig', emoji: '🐖',
    fortune: '풍요와 복이 가득한 하루입니다. 좋은 일이 겹치는 날이니, 긍정적인 마음으로 하루를 시작하세요. 먹는 즐거움도 오늘의 행운 중 하나입니다.',
    luckyColor: OBANGSAEK[4], luckyItem: '검은 지갑',
    poems: ['"복은 부르는 자에게 오고,\n나누는 자에게 머뭅니다"'],
  },
};

/* ── Determine zodiac from birth year ── */
function getZodiac(year: number) {
  const idx = ((year - 4) % 12 + 12) % 12;
  return { sign: idx, data: ZODIAC[idx] };
}

/* ── Today's lucky color (zodiac + day-of-year so it varies by birth year and date) ── */
function getTodayLuckyColor(year: number = 0) {
  const idx = ((year - 4) % 12 + 12) % 12;
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  return OBANGSAEK[(idx + dayOfYear) % OBANGSAEK.length];
}

/* ── Fortune meter bar ── */
function FortuneMeter({ label, value, color }: { label: string; value: number; color: string }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 120); return () => clearTimeout(t); }, [value]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.65 }}>{label}</span>
        <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 500, color, letterSpacing: '0.04em' }}>{value}%</span>
      </div>
      <div style={{ height: 5, backgroundColor: C.creamSoft, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${w}%`, backgroundColor: color,
          borderRadius: 999, transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
        }} />
      </div>
    </div>
  );
}

/* ── Star rating display (fortune strength) ── */
function FortuneStars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i <= count ? C.mustard : C.border}>
          <path d="M8 1l1.76 3.57L14 5.24l-3 2.92.71 4.14L8 10.27l-3.71 2.03.71-4.14-3-2.92 4.24-.67L8 1z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Animated counter ── */
function AnimCounter({ target }: { target: number }) {
  const [n, setN] = useState(target - Math.floor(Math.random() * 40 + 10));
  useEffect(() => {
    const step = (target - n) / 30;
    let cur = n;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(id); }
      else setN(Math.floor(cur));
    }, 20);
    return () => clearInterval(id);
  }, []);
  return <>{n.toLocaleString('ko-KR')}</>;
}

/* ── Product recommendation mini-card ── */
function ProductMiniCard({ product }: {
  product: { name: string; sub: string; price: number; color: string; tag: string }
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', gap: 14, alignItems: 'center',
        padding: '16px 18px',
        backgroundColor: hov ? C.creamSoft : C.cardPaper,
        border: `1.5px solid ${hov ? C.borderStrong : C.border}`,
        borderRadius: 14,
        boxShadow: hov ? `3px 4px 0 rgba(55,41,28,0.1)` : `2px 3px 0 rgba(55,41,28,0.07)`,
        cursor: 'pointer',
        transition: 'all 0.22s ease',
      }}
    >
      {/* Thumb */}
      <div style={{
        width: 52, height: 52, borderRadius: 10, flexShrink: 0,
        backgroundColor: product.color, overflow: 'hidden', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.22) 0%, transparent 60%)' }} />
      </div>
      {/* Meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed, marginBottom: 3 }}>
          {product.tag}
        </div>
        <div style={{
          fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13, color: C.inkBrown,
          letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {product.name}
        </div>
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown, opacity: 0.4 }}>
          {product.sub}
        </div>
      </div>
      {/* Price + arrow */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Noto Sans KR', fontSize: 13, fontWeight: 700, color: C.inkBrown }}>
          ₩ {product.price.toLocaleString('ko-KR')}
        </div>
        <div style={{
          marginTop: 4, opacity: hov ? 1 : 0, transition: 'opacity 0.2s',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M5 2h7v7" stroke={C.inkBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Fortune result card ── */
function FortuneResult({
  year, todayColor, onReset,
}: {
  year: number; todayColor: typeof OBANGSAEK[0]; onReset: () => void;
}) {
  const { sign, data } = getZodiac(year);
  const recommendedProduct = TONE_PRODUCTS[todayColor.id] ?? TONE_PRODUCTS.red;
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /* Pseudo-random but deterministic meters from year + today */
  const seed = (year * 13 + new Date().getDate() * 7 + sign * 3);
  const meters = [
    { label: '전반적 운세', value: 60 + (seed % 35), color: todayColor.hex },
    { label: '재물운 💰', value: 50 + ((seed * 3) % 45), color: C.mustard },
    { label: '애정운 ❤️', value: 55 + ((seed * 7) % 40), color: C.berry },
    { label: '건강운 🌿', value: 65 + ((seed * 11) % 30), color: C.olive },
  ];
  const stars = 3 + (seed % 3); // 3–5 stars

  const isLight = todayColor.id === 'white' || todayColor.id === 'yellow';
  const headerText = isLight ? C.inkBrown : 'white';

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div style={{
        borderRadius: 22,
        overflow: 'hidden',
        border: `1.5px solid ${C.borderStrong}`,
        boxShadow: `5px 8px 0 rgba(55,41,28,0.12)`,
        backgroundColor: C.cardPaper,
      }}>

        {/* ── Top colour panel ── */}
        <div style={{
          backgroundColor: todayColor.hex,
          padding: '48px 40px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Bg decoration */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -30, left: '30%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

          {/* Today lucky color badge */}
          <div style={{
            position: 'absolute', top: 20, right: 20,
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 14px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            borderRadius: 999,
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: headerText === 'white' ? 'white' : C.inkBrown, opacity: 0.6 }} />
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', color: headerText, opacity: 0.75 }}>
              TODAY'S COLOR
            </span>
          </div>

          {/* Emoji + main info */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, position: 'relative', zIndex: 1 }}>
            <div>
              {/* Emoji */}
              <div style={{
                fontSize: 88, lineHeight: 1,
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
                marginBottom: 16,
                animation: 'fortune-bounce 3s ease-in-out infinite',
              }}>
                {data.emoji}
              </div>
              {/* Stars — a hidden sheep twinkles at the end of the row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FortuneStars count={stars} />
                <HiddenSheep id="result" style={{ width: 24, height: 24 }} />
              </div>
            </div>

            <div style={{ paddingBottom: 4, flex: 1 }}>
              {/* Hanja + name */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <span style={{
                  fontFamily: 'Noto Sans KR', fontSize: 64, fontWeight: 700,
                  color: headerText, opacity: 0.18, lineHeight: 1,
                  letterSpacing: '-0.015em', userSelect: 'none',
                }}>
                  {data.hanja}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 4px' }}>
                <h2 className="display-title" style={{
                  fontSize: 38,
                  color: headerText, margin: 0,
                }}>
                  {data.name}띠
                </h2>
              </div>
              <div style={{
                fontFamily: 'Noto Sans KR', fontSize: 14, 
                color: headerText, opacity: 0.65, letterSpacing: '0.04em',
              }}>
                Year of the {data.english} · {year}년생
              </div>

              {/* Lucky color + item chips */}
              <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px',
                  backgroundColor: todayColor.hex,
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  borderRadius: 999, backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'white', opacity: 0.7, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, fontWeight: 700, color: 'white' }}>
                    행운의 색 · {todayColor.name}
                  </span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 999, backdropFilter: 'blur(4px)',
                }}>
                  <span style={{ fontSize: 13 }}>✦</span>
                  <span style={{ fontFamily: 'Noto Sans KR', fontSize: 12, fontWeight: 700, color: headerText }}>
                    행운 아이템 {data.luckyItem}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Obangsaek color info strip */}
          <div style={{
            marginTop: 28, padding: '14px 18px',
            backgroundColor: 'rgba(255,255,255,0.13)',
            borderRadius: 12, backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', gap: 12,
            position: 'relative', zIndex: 1,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              backgroundColor: todayColor.hex,
              border: '2px solid rgba(255,255,255,0.5)',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }} />
            <div>
              <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 12, color: headerText }}>
                행운의 색 · {todayColor.name}
              </div>
              <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: headerText, opacity: 0.6, letterSpacing: '0.04em' }}>
                {todayColor.meaning}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom content panel ── */}
        <div style={{ padding: '36px 40px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Fortune text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 16, height: 2, backgroundColor: C.sealRed }} />
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>
                TODAY'S FORTUNE · 오늘의 운세
              </span>
            </div>
            <p style={{
              fontFamily: 'Noto Sans KR', fontSize: 16, lineHeight: 1.9,
              color: C.inkBrown, opacity: 0.82, margin: 0,
            }}>
              {data.fortune}
            </p>
          </div>

          {/* Poem / pull quote */}
          <div style={{
            borderLeft: `3px solid ${todayColor.hex}`,
            paddingLeft: 20, paddingTop: 2, paddingBottom: 2,
          }}>
            <p style={{
              fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 15,
              color: C.inkBrown, lineHeight: 1.7, margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {data.poems[0]}
            </p>
          </div>

          {/* Fortune meters */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 16, height: 2, backgroundColor: C.mustard }} />
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.5 }}>
                FORTUNE METERS
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {meters.map((m) => <FortuneMeter key={m.label} {...m} />)}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: C.border }} />

          {/* Lucky info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { icon: '🎨', label: '행운의 색', value: `${todayColor.name} ${todayColor.english}`, tinted: true },
              { icon: '✨', label: '행운 아이템', value: data.luckyItem, tinted: false },
              { icon: '🌙', label: '행운 방향', value: todayColor.meaning.split('·')[0].trim(), tinted: false },
              { icon: '⭐', label: '오늘의 별점', value: `${stars}/5 ★`, tinted: false },
            ].map((item) => {
              const isWhiteTone = todayColor.id === 'white';
              const tintedBg = item.tinted ? todayColor.hex : C.creamSoft;
              const tintedText = item.tinted ? (isWhiteTone ? C.inkBrown : 'white') : C.inkBrown;
              const tintedSub = item.tinted ? (isWhiteTone ? 'rgba(55,41,28,0.55)' : 'rgba(255,255,255,0.65)') : `rgba(55,41,28,0.5)`;
              return (
                <div key={item.label} style={{
                  padding: '14px 16px',
                  backgroundColor: tintedBg,
                  border: item.tinted ? `1px solid rgba(255,255,255,0.2)` : `1px solid ${C.border}`,
                  borderRadius: 12,
                  boxShadow: item.tinted ? `2px 3px 0 rgba(0,0,0,0.12)` : 'none',
                }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: tintedSub, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 13, color: tintedText }}>{item.value}</div>
                </div>
              );
            })}
          </div>

          {/* Recommended product */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 16, height: 2, backgroundColor: C.sealRed }} />
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: C.sealRed }}>
                LUCKY GIFT · 오늘의 추천 선물
              </span>
            </div>
            <p style={{ fontFamily: 'Noto Sans KR', fontSize: 13, color: C.inkBrown, opacity: 0.55, marginBottom: 12, lineHeight: 1.7 }}>
              행운의 색 <strong>{todayColor.name}</strong> 톤과 어울리는 율:12 제품을 선물해보세요.
            </p>
            <ProductMiniCard product={recommendedProduct} />
          </div>

          {/* Community count */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 0',
            borderTop: `1px solid ${C.border}`,
            opacity: 0.45,
          }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <circle cx="7" cy="6" r="3" stroke={C.inkBrown} strokeWidth="1.3" />
              <circle cx="13" cy="6" r="3" stroke={C.inkBrown} strokeWidth="1.3" />
              <path d="M1 16c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6" stroke={C.inkBrown} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, letterSpacing: '0.04em' }}>
              오늘 <AnimCounter target={3847} />명이 운세를 확인했습니다
            </span>
          </div>

          {/* Reset */}
          <button
            onClick={onReset}
            style={{
              width: '100%',
              backgroundColor: 'transparent', color: C.inkBrown,
              border: `1.5px solid ${C.border}`, borderRadius: 999,
              padding: '13px 0',
              fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', letterSpacing: '-0.01em',
              transition: 'border-color 0.18s, background 0.18s',
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
            다시 입력하기
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Floating star decoration ── */
function FloatStar({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: string }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      animation: `fortune-float 4s ease-in-out ${delay} infinite`,
      pointerEvents: 'none', opacity: 0.55,
    }}>
      <svg width={size} height={size} viewBox={`${-size/2} ${-size/2} ${size} ${size}`}>
        {(() => {
          const r1 = size * 0.46, r2 = size * 0.19;
          let d = '';
          for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? r1 : r2;
            const a = (Math.PI / 5) * i - Math.PI / 2;
            d += `${i === 0 ? 'M' : 'L'}${r * Math.cos(a)},${r * Math.sin(a)} `;
          }
          return <path d={d + 'Z'} fill={color} />;
        })()}
      </svg>
    </div>
  );
}

/* ── Main Fortune Page ── */
export default function FortunePage() {
  const [inputYear, setInputYear] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmedYear, setConfirmedYear] = useState(0);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const todayColor = getTodayLuckyColor(confirmedYear);

  const handleSubmit = () => {
    const y = parseInt(inputYear, 10);
    if (!inputYear || isNaN(y)) { setError('출생년도를 입력해주세요'); return; }
    if (y < 1900 || y > 2025) { setError('1900년부터 2025년 사이로 입력해주세요'); return; }
    setError('');
    setConfirmedYear(y);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setInputYear('');
    setConfirmedYear(0);
  };

  return (
    <>
      {/* CSS animations */}
      <style>{`
        @keyframes fortune-float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes fortune-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fortune-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '64px 32px 120px',
        position: 'relative',
      }}>

        {/* Floating stars in the background */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          <FloatStar x="6%"  y="15%" size={32} color={C.mustard} delay="0s" />
          <FloatStar x="88%" y="12%" size={22} color={C.sealRed} delay="0.7s" />
          <FloatStar x="3%"  y="65%" size={18} color={C.olive}   delay="1.4s" />
          <FloatStar x="92%" y="55%" size={28} color={C.mustard} delay="0.3s" />
          <FloatStar x="15%" y="88%" size={14} color={C.berry}   delay="1.9s" />
          <FloatStar x="80%" y="80%" size={20} color={C.olive}   delay="1.1s" />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Page header ── */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            {/* Today's color dot */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 16px',
                backgroundColor: todayColor.hex,
                borderRadius: 999,
                opacity: 0.85,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'white', opacity: 0.8 }} />
                <span style={{
                  fontFamily: 'Noto Sans KR', fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: todayColor.id === 'white' || todayColor.id === 'yellow' ? C.inkBrown : 'white',
                }}>
                  TODAY · {todayColor.name} · {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>

            <h1 className="display-title display-title--latin" style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              color: C.inkBrown, margin: '0 0 8px',
            }}>
              TODAY'S
              <br />
              FORTUNE
            </h1>
            <div style={{
              fontFamily: 'Noto Sans KR', fontSize: 13, 
              color: C.inkBrown, opacity: 0.38, letterSpacing: '0.04em', marginBottom: 18,
            }}>
              오늘의 운세
            </div>
            <p style={{
              fontFamily: 'Noto Sans KR', fontSize: 14, lineHeight: 1.9,
              color: C.inkBrown, opacity: 0.62, margin: 0, maxWidth: 400,
              marginInline: 'auto',
            }}>
              선물 받을 분의 출생년도를 입력하면,
              <br />
              띠와 오늘의 운세를 알려드려요.
            </p>
          </div>

          {/* ── Input card ── */}
          {!submitted && (
            <div style={{
              backgroundColor: C.cardPaper,
              border: `1.5px solid ${C.borderStrong}`,
              borderRadius: 20,
              padding: '36px 32px',
              boxShadow: `4px 6px 0 rgba(55,41,28,0.09)`,
              display: 'flex', flexDirection: 'column', gap: 22,
              marginBottom: 32,
              position: 'relative',
            }}>
              {/* Hidden sheep — perched on the input card's top edge */}
              <HiddenSheep id="fortune" style={{ position: 'absolute', top: -29, left: 36, width: 30, height: 30 }} />
              {/* Year input */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 14,
                  color: C.inkBrown, marginBottom: 10,
                }}>
                  출생년도 <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 400, opacity: 0.4 }}>Birth Year</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min="1900" max="2025"
                    value={inputYear}
                    onChange={(e) => { setInputYear(e.target.value); setError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="예: 1991"
                    style={{
                      width: '100%',
                      fontFamily: 'Noto Sans KR', fontSize: 28, fontWeight: 700,
                      letterSpacing: '0.18em', color: C.inkBrown,
                      backgroundColor: 'white',
                      border: `2px solid ${error ? C.sealRed : focused ? C.inkBrown : C.border}`,
                      borderRadius: 14,
                      padding: '16px 56px 16px 20px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                  />
                  {/* Zodiac preview emoji */}
                  {inputYear && !isNaN(parseInt(inputYear)) && parseInt(inputYear) >= 1900 && parseInt(inputYear) <= 2025 && (
                    <div style={{
                      position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                      fontSize: 24, lineHeight: 1,
                      animation: 'fortune-bounce 2s ease-in-out infinite',
                    }}>
                      {getZodiac(parseInt(inputYear)).data.emoji}
                    </div>
                  )}
                </div>
                {error && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Noto Sans KR', fontSize: 12, color: C.sealRed, marginTop: 8,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke={C.sealRed} strokeWidth="1.4" />
                      <line x1="8" y1="5" x2="8" y2="9" stroke={C.sealRed} strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="8" cy="11.5" r="0.8" fill={C.sealRed} />
                    </svg>
                    {error}
                  </div>
                )}
              </div>

              {/* Lunar note info box */}
              <div style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '14px 16px',
                backgroundColor: C.creamSoft,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
              }}>
                <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.3 }}>🌙</span>
                <div>
                  <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 12, color: C.inkBrown, marginBottom: 4 }}>
                    띠는 음력 설날을 기준으로 바뀌어요
                  </div>
                  <p style={{ fontFamily: 'Noto Sans KR', fontSize: 12, color: C.inkBrown, opacity: 0.6, lineHeight: 1.7, margin: 0 }}>
                    양력 1~2월 초에 태어나신 분은 음력 설날 이전이라면 전년도 띠일 수 있어요. 정확한 띠는 음력 생일을 기준으로 확인해 보세요.
                  </p>
                </div>
              </div>

              {/* All 12 zodiac strip */}
              <div>
                <div style={{ fontFamily: 'Noto Sans KR', fontSize: 10, letterSpacing: '0.18em', color: C.inkBrown, opacity: 0.38, marginBottom: 10 }}>
                  12 ZODIAC
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {Object.entries(ZODIAC).map(([idx, z]) => (
                    <button
                      key={idx}
                      onClick={() => setInputYear(String(2027 - (7 - parseInt(idx) + 12) % 12))}
                      title={`${z.name}띠`}
                      style={{
                        fontFamily: 'Noto Sans KR', fontSize: 13,
                        padding: '5px 10px', borderRadius: 999,
                        border: `1px solid ${C.border}`,
                        backgroundColor: 'transparent', cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.creamSoft;
                        (e.currentTarget as HTMLButtonElement).style.borderColor = C.inkBrown;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
                      }}
                    >
                      <span>{z.emoji}</span>
                      <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.inkBrown, opacity: 0.65 }}>{z.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  backgroundColor: C.sealRed, color: 'white',
                  border: 'none', borderRadius: 999,
                  padding: '18px 0',
                  fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 17,
                  cursor: 'pointer', letterSpacing: '-0.01em',
                  boxShadow: `3px 4px 0 rgba(55,41,28,0.22)`,
                  transition: 'transform 0.15s, box-shadow 0.15s',
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
                운세 보기 ✦
              </button>
            </div>
          )}

          {/* ── Result ── */}
          {submitted && (
            <FortuneResult
              year={confirmedYear}
              todayColor={todayColor}
              onReset={handleReset}
            />
          )}

          {/* ── Footer note ── */}
          <div style={{
            marginTop: 40, textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0.25 }}>
              <div style={{ flex: 1, height: 1, backgroundColor: C.inkBrown }} />
              <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, letterSpacing: '0.18em', color: C.inkBrown }}>
                ✶ YUL:12 · 2027
              </span>
              <div style={{ flex: 1, height: 1, backgroundColor: C.inkBrown }} />
            </div>
            <p style={{ fontFamily: 'Noto Sans KR', fontSize: 10, color: C.inkBrown, opacity: 0.28, margin: 0, letterSpacing: '0.04em' }}>
              운세는 즐거운 참고용입니다 · For entertainment purposes only
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
