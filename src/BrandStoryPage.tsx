import { useState, useRef, useEffect } from 'react';

/* ── colour constants ── */
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
  brandOlive: '#B3A756',
};

/* ── Obangsaek ── */
const OBANGSAEK = [
  { name: '청 (Blue)', korean: '청', hanja: '靑', hex: '#2B5BA1', meaning: '동쪽 · 봄 · 목 · 인(仁)', english: 'East · Spring · Wood · Benevolence', desc: '생명과 희망의 색. 새벽 하늘처럼 신선하고 청명한 기운으로, 새로운 시작을 알리는 오방색의 중심입니다.' },
  { name: '적 (Red)', korean: '적', hanja: '赤', hex: '#C0392B', meaning: '남쪽 · 여름 · 화 · 예(禮)', english: 'South · Summer · Fire · Propriety', desc: '열정과 행운의 색. 잡귀를 쫓고 복을 부르는 붉은 기운은 율:12의 핵심 상징이며, 2027년 붉은 양을 대표합니다.' },
  { name: '황 (Yellow)', korean: '황', hanja: '黃', hex: '#D4A017', meaning: '중앙 · 토 · 신(信)', english: 'Center · Earth · Faithfulness', desc: '중심과 균형의 색. 하늘과 땅 사이의 중심에 위치하며, 황금처럼 귀하고 믿음직한 가치를 상징합니다.' },
  { name: '백 (White)', korean: '백', hanja: '白', hex: '#E8DFD0', meaning: '서쪽 · 가을 · 금 · 의(義)', english: 'West · Autumn · Metal · Righteousness', desc: '순수와 결백의 색. 가을 서리처럼 맑고 깨끗한 정신을 뜻하며, 올바름과 의로움의 가치를 담습니다.' },
  { name: '흑 (Black)', korean: '흑', hanja: '黑', hex: '#2C2416', meaning: '북쪽 · 겨울 · 수 · 지(智)', english: 'North · Winter · Water · Wisdom', desc: '지혜와 깊이의 색. 밤하늘처럼 깊고 고요한 지혜를 담으며, 모든 색을 아우르는 근원적인 힘을 가집니다.' },
];

/* ── 12 Zodiac animals ── */
const ZODIAC = [
  { id: 'sheep', name: '양', english: 'Sheep', year: 2027, emoji: '🐑', element: '火', color: C.sealRed, highlight: true },
  { id: 'monkey', name: '원숭이', english: 'Monkey', year: 2028, emoji: '🐒', element: '火', color: C.mustard, highlight: false },
  { id: 'rooster', name: '닭', english: 'Rooster', year: 2029, emoji: '🐓', element: '金', color: C.mustard, highlight: false },
  { id: 'dog', name: '개', english: 'Dog', year: 2030, emoji: '🐕', element: '土', color: C.olive, highlight: false },
  { id: 'pig', name: '돼지', english: 'Pig', year: 2031, emoji: '🐖', element: '水', color: '#5A7A6A', highlight: false },
  { id: 'rat', name: '쥐', english: 'Rat', year: 2032, emoji: '🐀', element: '水', color: '#5A7A6A', highlight: false },
  { id: 'ox', name: '소', english: 'Ox', year: 2033, emoji: '🐂', element: '土', color: C.olive, highlight: false },
  { id: 'tiger', name: '호랑이', english: 'Tiger', year: 2034, emoji: '🐯', element: '木', color: '#3D6B4A', highlight: false },
  { id: 'rabbit', name: '토끼', english: 'Rabbit', year: 2035, emoji: '🐇', element: '木', color: '#3D6B4A', highlight: false },
  { id: 'dragon', name: '용', english: 'Dragon', year: 2036, emoji: '🐉', element: '土', color: C.olive, highlight: false },
  { id: 'snake', name: '뱀', english: 'Snake', year: 2037, emoji: '🐍', element: '火', color: C.sealRed, highlight: false },
  { id: 'horse', name: '말', english: 'Horse', year: 2038, emoji: '🐎', element: '火', color: C.berry, highlight: false },
];

/* ── Chapter data ── */
const CHAPTERS = [
  {
    num: '01',
    label: 'ORIGIN',
    title: '율(律)이라는 이름',
    subtitle: 'The Name YUL',
    body: `'율(律)'은 음악의 리듬이자, 자연의 질서이며, 우주가 움직이는 법칙입니다. 열두 달, 열두 띠, 열두 음계 — 모든 것은 열둘이라는 숫자로 순환하고 완성됩니다.\n\nYUL:12는 이 순환의 아름다움에서 출발했습니다. 해마다 새로운 동물이 새로운 기운을 이끌고 오듯, 율:12는 매해 새로운 이야기로 당신의 새해를 맞이합니다. 전통의 지혜를 현대의 감각으로 재해석하여, 일상 속에서 행운을 만나게 합니다.`,
    aside: '열둘이라는 숫자는\n완전한 순환을 뜻합니다.',
    pull: '"율(律)은 자연의 질서이자\n우주가 움직이는 법칙"',
  },
  {
    num: '02',
    label: 'PHILOSOPHY',
    title: '행운을 일상 속에',
    subtitle: 'Fortune in Everyday Life',
    body: `전통 한국에서 새해 선물은 단순한 물건이 아니었습니다. 그것은 한 해 동안의 평안과 복을 비는 마음이었고, 보내는 이와 받는 이 사이를 잇는 따뜻한 언어였습니다.\n\n율:12는 이 오래된 마음을 현대의 선물 문화로 되살립니다. 십이지(十二支)의 동물 하나하나에 담긴 이야기, 오방색이 품은 우주의 질서 — 이 모든 것이 선물 속에 녹아들어, 받는 이에게 진심 어린 행운을 전합니다.`,
    aside: '선물은 마음을\n담는 그릇입니다.',
    pull: '"전통의 지혜를 현대의\n언어로 전합니다"',
  },
  {
    num: '03',
    label: '2027',
    title: '붉은 양의 해',
    subtitle: 'Year of the Red Sheep',
    body: `丁未年(정미년), 2027년은 붉은 양의 해입니다. 양(羊)은 온화함과 창의성, 깊은 공감 능력을 상징합니다. 무리 속에서 조화를 이루며, 조용하지만 확고한 자신만의 길을 걷는 동물입니다.\n\n'정(丁)'의 붉은 불기운은 양의 온화한 기질에 열정과 생동감을 더합니다. 2027년은 따뜻한 관계 속에서 창의적인 성취를 이루는 한 해가 될 것입니다. 율:12의 붉은 양 에디션은 이 특별한 해의 기운을 담아, 당신의 새해를 더욱 풍요롭게 만들어드립니다.`,
    aside: '양은 온화함과\n창의성을 상징합니다.',
    pull: '"丁未年, 붉은 양의 해 —\n온화한 열정으로 나아가는 해"',
  },
];

/* ── Zodiac Wheel ── */
function ZodiacWheel() {
  const [active, setActive] = useState<string>('sheep');
  const [hovered, setHovered] = useState<string | null>(null);
  const R = 180; // wheel radius
  const cx = 240;
  const cy = 240;
  const size = 480;

  const activeAnimal = ZODIAC.find((z) => z.id === (hovered ?? active))!;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 64,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* SVG Wheel */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: 'visible' }}
        >
          {/* Outer decorative ring */}
          <circle cx={cx} cy={cy} r={R + 30} stroke={C.border} strokeWidth="1" fill="none" strokeDasharray="4 6" />
          {/* Middle ring */}
          <circle cx={cx} cy={cy} r={R - 2} stroke={C.border} strokeWidth="0.75" fill="none" />
          {/* Center fill */}
          <circle cx={cx} cy={cy} r={60} fill={C.cardPaper} stroke={C.border} strokeWidth="1" />

          {/* Year text in center */}
          <text x={cx} y={cy - 14} textAnchor="middle" fontFamily="Noto Sans KR" fontSize="13" fontWeight="600" fill={C.sealRed} letterSpacing="2">
            2027
          </text>
          <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="Noto Sans KR" fontSize="18" fontWeight="800" fill={C.inkBrown}>
            丁未年
          </text>
          <text x={cx} y={cy + 24} textAnchor="middle" fontFamily="Noto Sans KR" fontSize="10" fill={C.inkBrown} opacity="0.5">
            붉은 양의 해
          </text>

          {/* Spoke lines */}
          {ZODIAC.map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x2 = cx + (R - 26) * Math.cos(angle);
            const y2 = cy + (R - 26) * Math.sin(angle);
            return (
              <line
                key={i}
                x1={cx + 62 * Math.cos(angle)}
                y1={cy + 62 * Math.sin(angle)}
                x2={x2}
                y2={y2}
                stroke={C.border}
                strokeWidth="0.75"
              />
            );
          })}

          {/* Animal nodes */}
          {ZODIAC.map((animal, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const ax = cx + R * Math.cos(angle);
            const ay = cy + R * Math.sin(angle);
            const isSheep = animal.highlight;
            const isActive = active === animal.id;
            const isHovered = hovered === animal.id;
            const nodeR = isSheep ? 38 : isActive ? 34 : 28;

            return (
              <g
                key={animal.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setActive(animal.id)}
                onMouseEnter={() => setHovered(animal.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow ring for sheep */}
                {isSheep && (
                  <circle
                    cx={ax}
                    cy={ay}
                    r={nodeR + 8}
                    fill="none"
                    stroke={C.sealRed}
                    strokeWidth="1.5"
                    opacity="0.4"
                    strokeDasharray="3 4"
                  />
                )}
                {/* Node circle */}
                <circle
                  cx={ax}
                  cy={ay}
                  r={nodeR}
                  fill={isSheep ? C.sealRed : isActive || isHovered ? C.cardPaper : C.creamSoft}
                  stroke={isSheep ? C.sealRed : isActive || isHovered ? animal.color : C.border}
                  strokeWidth={isSheep ? 0 : isActive ? 2 : 1}
                  style={{ transition: 'all 0.25s ease' }}
                />
                {/* Emoji */}
                <text
                  x={ax}
                  y={ay - (isSheep ? 6 : 4)}
                  textAnchor="middle"
                  fontSize={isSheep ? 20 : 16}
                  dominantBaseline="middle"
                >
                  {animal.emoji}
                </text>
                {/* Korean name */}
                <text
                  x={ax}
                  y={ay + (isSheep ? 16 : 13)}
                  textAnchor="middle"
                  fontFamily="Noto Sans KR"
                  fontSize={isSheep ? 10 : 8}
                  fontWeight={isSheep ? '800' : '400'}
                  fill={isSheep ? 'white' : C.inkBrown}
                  opacity={isSheep ? 1 : 0.7}
                >
                  {animal.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <div
        style={{
          width: 280,
          padding: '32px',
          backgroundColor: C.cardPaper,
          borderRadius: 18,
          boxShadow: `3px 5px 0 ${C.border}`,
          border: `1px solid ${C.border}`,
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 16, height: 2, backgroundColor: C.sealRed }} />
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: C.sealRed,
              textTransform: 'uppercase',
            }}
          >
            {activeAnimal.element} ELEMENT
          </span>
        </div>

        {/* Big emoji */}
        <div style={{ fontSize: 56, lineHeight: 1.1, marginBottom: 4 }}>{activeAnimal.emoji}</div>

        {/* Names */}
        <div>
          <div className="display-title"
            style={{
              fontSize: 36,
              color: C.inkBrown,
              lineHeight: 1.1,
            }}
          >
            {activeAnimal.name}
          </div>
          <div
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 14,
              color: C.inkBrown,
              opacity: 0.5,
              marginTop: 4,
              letterSpacing: '0.04em',
            }}
          >
            {activeAnimal.english}
          </div>
        </div>

        {/* Year */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            backgroundColor: activeAnimal.highlight ? C.sealRed : C.creamSoft,
            borderRadius: 999,
            alignSelf: 'flex-start',
            marginTop: 4,
          }}
        >
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 12,
              fontWeight: 600,
              color: activeAnimal.highlight ? 'white' : C.inkBrown,
              letterSpacing: '0.18em',
            }}
          >
            {activeAnimal.year}년
          </span>
          {activeAnimal.highlight && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: 'Noto Sans KR' }}>
              ← 올해
            </span>
          )}
        </div>

        {/* Trait pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {getAnimalTraits(activeAnimal.id).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'Noto Sans KR',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: C.inkBrown,
                border: `1px solid ${C.border}`,
                borderRadius: 999,
                padding: '4px 10px',
                opacity: 0.75,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function getAnimalTraits(id: string): string[] {
  const map: Record<string, string[]> = {
    sheep: ['온화함', '창의성', '공감', '예술적'],
    monkey: ['영리함', '기민함', '호기심', '재치'],
    rooster: ['성실함', '정직함', '용기', '자신감'],
    dog: ['충성심', '정직함', '신뢰', '보호'],
    pig: ['풍요', '선량함', '인내', '성실'],
    rat: ['지혜', '적응력', '기민함', '번영'],
    ox: ['성실함', '인내', '강인함', '안정'],
    tiger: ['용맹함', '패기', '리더십', '카리스마'],
    rabbit: ['온유함', '영리함', '행운', '평화'],
    dragon: ['강인함', '행운', '권위', '성공'],
    snake: ['지혜', '우아함', '직관', '신비'],
    horse: ['자유', '열정', '충성', '활력'],
  };
  return map[id] ?? [];
}

/* ── Pull quote ── */
function PullQuote({ text }: { text: string }) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '56px 0 0 21px',
        borderLeft: `4px solid ${C.sealRed}`,
        margin: '48px 0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 16,
          fontFamily: 'Noto Sans KR',
          fontSize: 80,
          color: C.sealRed,
          opacity: 0.15,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        "
      </div>
      <p
        style={{
          fontFamily: 'Noto Sans KR',
          fontWeight: 700,
          fontSize: 'clamp(18px, 2.5vw, 26px)',
          lineHeight: 1.55,
          color: C.inkBrown,
          margin: 0,
          position: 'relative',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ── Chapter section ── */
function ChapterSection({
  chapter,
  reversed = false,
}: {
  chapter: (typeof CHAPTERS)[0];
  reversed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: reversed ? '1fr 340px' : '340px 1fr',
        gap: 72,
        alignItems: 'start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        padding: '80px 0',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* Aside column */}
      <div style={{ order: reversed ? 2 : 1 }}>
        {/* Chapter number */}
        <div
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 96,
            fontWeight: 700,
            color: C.inkBrown,
            opacity: 0.06,
            lineHeight: 1,
            marginBottom: -20,
            letterSpacing: '-0.01em',
          }}
        >
          {chapter.num}
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 20, height: 2, backgroundColor: C.sealRed }} />
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: C.sealRed,
              textTransform: 'uppercase',
            }}
          >
            {chapter.label}
          </span>
        </div>
        {/* Aside box */}
        <div
          style={{
            backgroundColor: C.cardPaper,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: '24px 28px',
            boxShadow: `3px 4px 0 ${C.border}`,
          }}
        >
          <p
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 13,
              lineHeight: 1.9,
              color: C.inkBrown,
              opacity: 0.7,
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {chapter.aside}
          </p>
        </div>

        {/* Decorative seal stamp */}
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: C.sealRed,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `2px 2px 0 rgba(55,41,28,0.2)`,
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 700, fontSize: 16, color: 'white' }}>
              {chapter.num}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 11,
              color: C.inkBrown,
              opacity: 0.45,
              letterSpacing: '0.18em',
            }}
          >
            CHAPTER {chapter.num}
          </span>
        </div>
      </div>

      {/* Main text column */}
      <div style={{ order: reversed ? 1 : 2 }}>
        <h3 className="display-title"
          style={{
            fontSize: 'clamp(26px, 3vw, 42px)',
            color: C.inkBrown,
            margin: '0 0 6px',
          }}
        >
          {chapter.title}
        </h3>
        <div
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 14,
            color: C.inkBrown,
            opacity: 0.5,
            letterSpacing: '0.04em',
            marginBottom: 28,
          }}
        >
          {chapter.subtitle}
        </div>
        <p
          style={{
            fontFamily: 'Noto Sans KR',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.9,
            color: C.inkBrown,
            opacity: 0.78,
            margin: '0 0 0',
            whiteSpace: 'pre-line',
          }}
        >
          {chapter.body}
        </p>
        <PullQuote text={chapter.pull} />
      </div>
    </div>
  );
}

/* ── Obangsaek Section ── */
function ObangsaekSection() {
  const [active, setActive] = useState(1); // red default

  const col = OBANGSAEK[active];
  const isLight = active === 3; // white card — use dark text

  return (
    <section
      style={{
        padding: '100px 0',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 28, height: 2, backgroundColor: C.sealRed }} />
        <span
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: C.sealRed,
            textTransform: 'uppercase',
          }}
        >
          OBANGSAEK · 오방색
        </span>
      </div>

      <h2 className="display-title"
        style={{
          fontSize: 'clamp(28px, 3.5vw, 52px)',
          color: C.inkBrown,
          margin: '0 0 16px',
        }}
      >
        다섯 빛깔의 우주
      </h2>
      <p
        style={{
          fontFamily: 'Noto Sans KR',
          fontWeight: 400,
          fontSize: 16,
          color: C.inkBrown,
          opacity: 0.6,
          marginBottom: 56,
          lineHeight: 1.8,
          maxWidth: 560,
        }}
      >
        오방색은 동서남북과 중앙, 다섯 방향을 오행(五行)에 따라 다섯 색으로 표현한 전통 색채 체계입니다.
        율:12의 모든 디자인은 이 다섯 색의 철학을 바탕으로 합니다.
      </p>

      {/* Color swatches */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
        {OBANGSAEK.map((ob, i) => (
          <button
            key={ob.name}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? 80 : 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: ob.hex,
              border: active === i ? `3px solid ${C.inkBrown}` : `2px solid ${C.border}`,
              cursor: 'pointer',
              transition: 'width 0.3s ease, border 0.2s',
              position: 'relative',
              boxShadow: active === i ? `3px 4px 0 rgba(55,41,28,0.2)` : 'none',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {active === i && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Noto Sans KR',
                  fontWeight: 700,
                  fontSize: 18,
                  color: i === 3 ? C.inkBrown : 'white',
                }}
              >
                {ob.korean}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active color detail */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: 48,
          alignItems: 'start',
          backgroundColor: col.hex,
          borderRadius: 18,
          padding: '48px',
          boxShadow: `4px 6px 0 rgba(55,41,28,0.14)`,
          border: `1px solid rgba(0,0,0,0.05)`,
          transition: 'background-color 0.4s ease',
        }}
      >
        {/* Left: big hanja */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 96,
              fontWeight: 700,
              color: isLight ? C.inkBrown : 'white',
              opacity: 0.25,
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            {col.hanja}
          </span>
          <span className="display-title"
            style={{
              fontSize: 48,
              color: isLight ? C.inkBrown : 'white',
              lineHeight: 1.1,
            }}
          >
            {col.korean}
          </span>
          <div
            style={{
              width: 40,
              height: 3,
              backgroundColor: isLight ? C.inkBrown : 'white',
              opacity: 0.4,
              borderRadius: 2,
              marginTop: 8,
            }}
          />
          <span
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: isLight ? C.inkBrown : 'white',
              opacity: 0.6,
            }}
          >
            {col.hex}
          </span>
        </div>

        {/* Right: details */}
        <div>
          <div
            style={{
              fontFamily: 'Noto Sans KR',
              fontWeight: 700,
              fontSize: 18,
              color: isLight ? C.inkBrown : 'white',
              marginBottom: 6,
              opacity: 0.9,
            }}
          >
            {col.meaning}
          </div>
          <div
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 13,
              color: isLight ? C.inkBrown : 'white',
              opacity: 0.6,
              marginBottom: 24,
              letterSpacing: '0.04em',
            }}
          >
            {col.english}
          </div>
          <p
            style={{
              fontFamily: 'Noto Sans KR',
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.9,
              color: isLight ? C.inkBrown : 'white',
              opacity: 0.82,
              margin: 0,
              maxWidth: 480,
            }}
          >
            {col.desc}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Heritage Banner ── */
function HeritageBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const STATS = [
    { num: '12', label: '띠 동물', sub: 'Zodiac Animals' },
    { num: '5', label: '오방색', sub: 'Traditional Colors' },
    { num: '60', label: '년 주기', sub: 'Year Cycle' },
    { num: '∞', label: '행운', sub: 'Fortune & Luck' },
  ];

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: C.olive,
        borderRadius: 20,
        padding: '72px 64px',
        margin: '80px 0',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* BG decoration */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(182,168,71,0.12)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 24, height: 2, backgroundColor: C.mustard }} />
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: C.mustard, textTransform: 'uppercase' as const }}>
            KOREAN HERITAGE
          </span>
        </div>
        <h2 className="display-title"
          style={{
            fontSize: 'clamp(24px, 3vw, 44px)',
            color: 'white',
            margin: '0 0 48px',
          }}
        >
          수천 년의 지혜가<br />선물이 되다
        </h2>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {STATS.map((s) => (
            <div key={s.num} style={{ borderLeft: `2px solid rgba(182,168,71,0.4)`, paddingLeft: 20 }}>
              <div
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: 52,
                  fontWeight: 700,
                  color: C.mustard,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  marginBottom: 6,
                }}
              >
                {s.num}
              </div>
              <div style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 14, color: 'white', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: 'white', opacity: 0.45, letterSpacing: '0.18em' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page Hero ── */
function PageHero() {
  return (
    <div
      style={{
        padding: '80px 0 60px',
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 0,
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 24, height: 2, backgroundColor: C.sealRed }} />
        <span
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: C.sealRed,
            textTransform: 'uppercase',
          }}
        >
          YUL:12 BRAND STORY
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end' }}>
        <div>
          <h1 className="display-title"
            style={{
              fontSize: 30,
              fontWeight: 200,
              color: C.inkBrown,
              margin: '0 0 24px',
            }}
          >
            새해의 행운을{" "}
            <br style={{ display: 'none' }} />
            일상 속에 담다
          </h1>
          <p
            style={{
              fontFamily: 'Noto Sans KR',
              fontSize: 16,
              lineHeight: 1.7,
              color: C.inkBrown,
              opacity: 0.65,
              maxWidth: 540,
              margin: 0,
            }}
          >
            한국의 십이지(十二支)와 오방색(五方色)에서 영감을 받아, 율:12는 전통의 지혜를
            현대적인 선물 언어로 재해석합니다. 2027년 붉은 양의 해를 맞아, 그 이야기를 시작합니다.
          </p>
        </div>

        {/* Year badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '24px 32px',
            backgroundColor: C.cardPaper,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            boxShadow: `3px 4px 0 ${C.border}`,
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 11, color: C.sealRed, letterSpacing: '0.18em', fontWeight: 600 }}>
            YEAR OF
          </span>
          <span style={{ fontSize: 40 }}>🐑</span>
          <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 500, fontSize: 28, color: C.inkBrown, letterSpacing: '-0.01em' }}>
            2027
          </span>
          <span style={{ fontFamily: 'Noto Sans KR', fontSize: 13, color: C.inkBrown, opacity: 0.5, letterSpacing: '0.04em' }}>
            丁未年
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Zodiac Wheel Section ── */
function ZodiacSection() {
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
    <section
      ref={ref}
      style={{
        padding: '100px 0',
        borderBottom: `1px solid ${C.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 28, height: 2, backgroundColor: C.sealRed }} />
        <span
          style={{
            fontFamily: 'Noto Sans KR',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: C.sealRed,
            textTransform: 'uppercase',
          }}
        >
          THE TWELVE ZODIAC · 십이지
        </span>
      </div>
      <h2 className="display-title"
        style={{
          fontSize: 'clamp(28px, 3.5vw, 52px)',
          color: C.inkBrown,
          margin: '0 0 12px',
        }}
      >
        열두 띠가 이끄는 운명
      </h2>
      <p
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 15,
          color: C.inkBrown,
          opacity: 0.58,
          marginBottom: 64,
          lineHeight: 1.8,
          maxWidth: 520,
        }}
      >
        십이지(十二支)는 60년을 주기로 순환하는 동양의 시간 체계입니다. 각 동물은 고유한 기질과 운세를 품고,
        해마다 새로운 기운을 세상에 불어넣습니다. 동물을 클릭해 더 자세히 알아보세요.
      </p>
      <ZodiacWheel />
    </section>
  );
}

/* ── Closing CTA ── */
function ClosingCTA() {
  return (
    <section
      style={{
        padding: '100px 0 120px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          display: 'block',
          fontSize: 48,
          marginBottom: 24,
        }}
      >
        🐑
      </span>
      <h2 className="display-title"
        style={{
          fontSize: 'clamp(28px, 4vw, 56px)',
          color: C.inkBrown,
          margin: '0 0 20px',
        }}
      >
        당신의 2027년을
        <br />
        율:12와 함께
      </h2>
      <p
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 16,
          color: C.inkBrown,
          opacity: 0.6,
          marginBottom: 48,
          lineHeight: 1.8,
        }}
      >
        붉은 양의 기운을 담은 특별한 선물을 만나보세요.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          style={{
            backgroundColor: C.sealRed,
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '18px 40px',
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: `3px 4px 0 rgba(55,41,28,0.22)`,
            letterSpacing: '-0.01em',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `4px 6px 0 rgba(55,41,28,0.22)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `3px 4px 0 rgba(55,41,28,0.22)`;
          }}
        >
          2027 컬렉션 보기 →
        </button>
        <button
          style={{
            backgroundColor: 'transparent',
            color: C.inkBrown,
            border: `2px solid ${C.inkBrown}`,
            borderRadius: 999,
            padding: '16px 36px',
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s, transform 0.15s',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.inkBrown;
            (e.currentTarget as HTMLButtonElement).style.color = C.creamBg;
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = C.inkBrown;
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </section>
  );
}

/* ── Root Brand Story Page ── */
export default function BrandStoryPage() {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 48px',
      }}
    >
      <PageHero />
      <ZodiacSection />
      {CHAPTERS.map((ch, i) => (
        <ChapterSection key={ch.num} chapter={ch} reversed={i % 2 === 1} />
      ))}
      <ObangsaekSection />
      <HeritageBanner />
      <ClosingCTA />
    </div>
  );
}
