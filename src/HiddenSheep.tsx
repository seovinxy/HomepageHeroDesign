import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import sheepImg from '@/imports/yul_sheep_character.png';

/* ── Sheep definitions ── */
export const SHEEP_LIST = [
  { id: 'hero',    name: '행운양', hint: '홈 히어로 · 떠다니는 별들 사이' },
  { id: 'footer',  name: '휴식양', hint: '푸터 맨 아래 · 구분선 위' },
  { id: 'shop',    name: '사랑양', hint: '쇼핑 페이지 · 상품 수 배지 위' },
  { id: 'fortune', name: '건강양', hint: '운세 페이지 · 입력 카드 위' },
  { id: 'product', name: '여행양', hint: '상품 상세 · 사진 모서리' },
  { id: 'cart',    name: '금전양', hint: '장바구니 · 주문 요약 카드 위' },
  { id: 'result',  name: '응원양', hint: '운세 결과 · 별점 옆' },
] as const;

export type SheepId = typeof SHEEP_LIST[number]['id'];

/* ── Context ── */
interface SheepCtx {
  found: Set<SheepId>;
  findSheep: (id: SheepId) => void;
}

const SheepContext = createContext<SheepCtx>({ found: new Set(), findSheep: () => {} });

export function useSheepHunt() {
  return useContext(SheepContext);
}

/* ── Toast state (module-level so provider and tracker share it) ── */
let _setToast: ((msg: string | null) => void) | null = null;

/* ── Provider ── */
export function SheepHuntProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Set<SheepId>>(() => {
    try {
      const s = localStorage.getItem('yul12_sheep_found');
      return s ? new Set(JSON.parse(s) as SheepId[]) : new Set();
    } catch { return new Set(); }
  });
  const [toast, setToast] = useState<string | null>(null);
  _setToast = setToast;

  const findSheep = useCallback((id: SheepId) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem('yul12_sheep_found', JSON.stringify([...next])); } catch {}
      const sheep = SHEEP_LIST.find((s) => s.id === id)!;
      const n = next.size;
      setToast(`${sheep.name}을 찾았어요! (${n}/7)`);
      setTimeout(() => setToast(null), 3000);
      return next;
    });
  }, []);

  return (
    <SheepContext.Provider value={{ found, findSheep }}>
      {children}
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999,
          backgroundColor: '#37291C',
          color: '#F3ECD5',
          fontFamily: 'Noto Sans KR',
          fontSize: 14, fontWeight: 700,
          letterSpacing: '-0.01em',
          padding: '12px 24px',
          borderRadius: 999,
          boxShadow: '0 6px 24px rgba(55,41,28,0.35)',
          whiteSpace: 'nowrap',
          animation: 'toast-in 0.3s cubic-bezier(0.34,1.4,0.64,1) forwards',
          pointerEvents: 'none',
        }}>
          🐑 {toast}
        </div>
      )}
    </SheepContext.Provider>
  );
}

/* ── HiddenSheep component ── */
const BOUNCE_KEYFRAMES = `
@keyframes sheep-bounce {
  0%   { transform: scale(1) rotate(0deg); }
  30%  { transform: scale(1.5) rotate(-8deg); }
  60%  { transform: scale(1.25) rotate(5deg); }
  100% { transform: scale(1.35) rotate(0deg); }
}
@keyframes toast-in {
  from { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.9); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}
@keyframes sheep-idle-wobble {
  0%, 100% { transform: scale(1) rotate(-6deg); }
  50%       { transform: scale(1.08) rotate(6deg); }
}
`;

let _styleInjected = false;

export function HiddenSheep({
  id,
  style,
}: {
  id: SheepId;
  style?: React.CSSProperties;
}) {
  const { found, findSheep } = useSheepHunt();
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const isFound = found.has(id);

  useEffect(() => {
    if (_styleInjected) return;
    _styleInjected = true;
    const el = document.createElement('style');
    el.textContent = BOUNCE_KEYFRAMES;
    document.head.appendChild(el);
  }, []);

  const handleClick = () => {
    if (isFound) return;
    setBouncing(true);
    setTimeout(() => setBouncing(false), 500);
    findSheep(id);
  };

  return (
    <span
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={isFound ? `${SHEEP_LIST.find(s => s.id === id)?.name} — 발견 완료!` : '???'}
      style={{
        display: 'inline-block',
        cursor: isFound ? 'default' : 'pointer',
        userSelect: 'none',
        transition: 'opacity 0.25s, filter 0.25s, transform 0.25s',
        opacity: hovered ? 1 : isFound ? 1 : 0.75,
        filter: isFound ? 'none' : hovered ? 'drop-shadow(0 0 6px rgba(182,168,71,0.8))' : 'drop-shadow(0 0 3px rgba(182,168,71,0.4))',
        transform: bouncing || hovered ? undefined : undefined,
        animation: bouncing
          ? 'sheep-bounce 0.5s ease forwards'
          : !isFound
          ? 'sheep-idle-wobble 2.8s ease-in-out infinite'
          : undefined,
        width: 28, height: 28,
        lineHeight: 0,
        ...style,
      }}
    >
      <img
        src={sheepImg}
        alt="숨겨진 양"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'inline-block' }}
        draggable={false}
      />
    </span>
  );
}
