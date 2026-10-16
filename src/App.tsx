import { useState, useRef, useEffect } from "react"
import sheepImg from "@/assets/sheep-hero.png"
import heroDollImg from "@/assets/sheep-doll-hero.png"
import starGoldBig from "@/assets/yul_star_gold_big.png"
import starGoldMid from "@/assets/yul_star_gold_mid.png"
import starGoldSmall from "@/assets/yul_star_gold_small.png"
import starOliveDiamond from "@/assets/yul_star_olive_diamond.png"
import starRedDiamond from "@/assets/yul_star_red_diamond.png"
import luckyGiftIcon from "@/assets/lucky-category-gift.png"
import luckyCareerIcon from "@/assets/lucky-category-career.png"
import luckySuccessIcon from "@/assets/lucky-category-success.png"
import luckyBusinessIcon from "@/assets/lucky-category-business.png"
import luckyHealthIcon from "@/assets/lucky-category-health.png"
import luckyMovingIcon from "@/assets/lucky-category-moving.png"
import luckyLoveIcon from "@/assets/lucky-category-love.png"
import luckyOtherIcon from "@/assets/lucky-category-other.png"
import yulLogoSrc from "@/imports/yul_logo_full.png"
import sheepBaaMp3 from "@/imports/minecraft-sheep2.mp3"
import {
  SheepHuntProvider,
  HiddenSheep,
  useSheepHunt,
  SHEEP_LIST,
} from "@/HiddenSheep"
import BrandStoryPage from "./BrandStoryPage"
import LookbookPage from "./LookbookPage"
import ShopPage from "./ShopPage"
import ProductDetailPage from "./ProductDetailPage"
import NewArrivalsPage from "./NewArrivalsPage"
import CartPage from "./CartPage"
import FortunePage from "./FortunePage"
import MyPage from "./MyPage"
import EventPage from "./EventPage"
import ProductScrollMarquee from "./ProductScrollMarquee"

/* ── colour constants ── */
const C = {
  creamBg: "#F3ECD5",
  creamSoft: "#EFE6C8",
  cardPaper: "#FBF7E9",
  inkBrown: "#37291C",
  sealRed: "#AB0A00",
  berry: "#A6403C",
  olive: "#494B1C",
  mustard: "#B6A847",
  border: "rgba(55,41,28,0.18)",
  brandOlive: "#B3A756",
  borderStrong: "rgba(55,41,28,0.28)",
}

/* ── SVG sheep (3D-ish, stylised) ── */
function SheepIllustration({
  size = 320,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shadow */}
      <ellipse cx="160" cy="295" rx="70" ry="12" fill="rgba(55,41,28,0.12)" />

      {/* Body wool — layered fluffy circles */}
      <circle cx="160" cy="185" r="78" fill="#C04040" />
      <circle cx="120" cy="170" r="52" fill="#C84848" />
      <circle cx="200" cy="170" r="52" fill="#C84848" />
      <circle cx="160" cy="150" r="58" fill="#D05050" />
      <circle cx="138" cy="158" r="36" fill="#D86060" />
      <circle cx="182" cy="158" r="36" fill="#D86060" />
      <circle cx="160" cy="142" r="42" fill="#E07070" />
      <circle cx="128" cy="148" r="28" fill="#D86060" />
      <circle cx="192" cy="148" r="28" fill="#D86060" />
      {/* Wool highlight */}
      <circle cx="140" cy="138" r="16" fill="#E88080" opacity="0.6" />
      <circle cx="172" cy="132" r="12" fill="#EE9090" opacity="0.5" />

      {/* Head */}
      <ellipse cx="160" cy="118" rx="34" ry="30" fill="#FBEADE" />
      <ellipse cx="160" cy="122" rx="22" ry="20" fill="#F5D9C8" />

      {/* Ears */}
      <ellipse
        cx="126"
        cy="112"
        rx="14"
        ry="10"
        fill="#F5D9C8"
        transform="rotate(-20 126 112)"
      />
      <ellipse
        cx="194"
        cy="112"
        rx="14"
        ry="10"
        fill="#F5D9C8"
        transform="rotate(20 194 112)"
      />
      <ellipse
        cx="126"
        cy="113"
        rx="8"
        ry="6"
        fill="#E8B8A8"
        transform="rotate(-20 126 113)"
      />
      <ellipse
        cx="194"
        cy="113"
        rx="8"
        ry="6"
        fill="#E8B8A8"
        transform="rotate(20 194 113)"
      />

      {/* Eyes */}
      <circle cx="148" cy="112" r="6" fill="#37291C" />
      <circle cx="172" cy="112" r="6" fill="#37291C" />
      <circle cx="150" cy="110" r="2" fill="white" />
      <circle cx="174" cy="110" r="2" fill="white" />

      {/* Horns */}
      <path d="M136 96 Q122 72 130 60 Q134 68 136 78 Z" fill="#C8A870" />
      <path d="M184 96 Q198 72 190 60 Q186 68 184 78 Z" fill="#C8A870" />
      <path
        d="M136 96 Q118 74 128 62"
        stroke="#B89460"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M184 96 Q202 74 192 62"
        stroke="#B89460"
        strokeWidth="2"
        fill="none"
      />

      {/* Nose */}
      <ellipse cx="160" cy="128" rx="10" ry="7" fill="#E0A090" />
      <ellipse cx="156" cy="129" rx="3" ry="2" fill="#C07060" />
      <ellipse cx="164" cy="129" rx="3" ry="2" fill="#C07060" />

      {/* Blush */}
      <ellipse cx="140" cy="122" rx="8" ry="5" fill="#F0A090" opacity="0.45" />
      <ellipse cx="180" cy="122" rx="8" ry="5" fill="#F0A090" opacity="0.45" />

      {/* Smile */}
      <path
        d="M152 134 Q160 140 168 134"
        stroke="#C07060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Legs */}
      <rect x="132" y="250" width="14" height="38" rx="7" fill="#F5D9C8" />
      <rect x="150" y="252" width="14" height="36" rx="7" fill="#F5D9C8" />
      <rect x="156" y="252" width="14" height="36" rx="7" fill="#F0D0C0" />
      <rect x="174" y="250" width="14" height="38" rx="7" fill="#F5D9C8" />
      {/* Hooves */}
      <rect x="131" y="282" width="16" height="10" rx="5" fill="#8B6050" />
      <rect x="149" y="282" width="16" height="10" rx="5" fill="#8B6050" />
      <rect x="155" y="282" width="16" height="10" rx="5" fill="#8B6050" />
      <rect x="173" y="282" width="16" height="10" rx="5" fill="#8B6050" />

      {/* Tail */}
      <circle cx="238" cy="192" r="18" fill="#C84848" />
      <circle cx="238" cy="192" r="12" fill="#D85858" />
    </svg>
  )
}

/* ── 3D Star shapes ── */
let starIdCounter = 0

function Star3D({
  size = 40,
  color = C.mustard,
  rotate = 0,
}: {
  size?: number
  color?: string
  rotate?: number
}) {
  const [uid] = useState(() => `sc-${starIdCounter++}`)
  const pts = (n: number, r1: number, r2: number) => {
    let d = ""
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? r1 : r2
      const a = (Math.PI / n) * i - Math.PI / 2
      d += `${i === 0 ? "M" : "L"}${r * Math.cos(a)},${r * Math.sin(a)} `
    }
    return d + "Z"
  }
  const half = size / 2
  const dark =
    color === C.mustard
      ? "#8A7A20"
      : color === C.sealRed
        ? "#6A0400"
        : "#1A2000"
  const light =
    color === C.mustard
      ? "#E8D060"
      : color === C.sealRed
        ? "#D04040"
        : "#607020"

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-half} ${-half} ${size} ${size}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <clipPath id={uid}>
          <rect x={-half} y={-half} width={size} height={half * 0.6} />
        </clipPath>
      </defs>
      <path
        d={pts(5, half * 0.95, half * 0.42)}
        fill={dark}
        transform="translate(2,3)"
        opacity="0.4"
      />
      <path d={pts(5, half * 0.92, half * 0.38)} fill={color} />
      <path
        d={pts(5, half * 0.92, half * 0.38)}
        fill={light}
        clipPath={`url(#${uid})`}
        opacity="0.45"
      />
      <circle
        cx={-half * 0.15}
        cy={-half * 0.28}
        r={half * 0.1}
        fill="white"
        opacity="0.7"
      />
    </svg>
  )
}

/* ── Icons ── */
function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      viewBox="0 0 24 24"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

/* ── Shared Header ── */
const NAV_ITEMS = ["ABOUT YUL", "COLLECTION", "SHOP", "NEW", "EVENT"]

/* ── Header icon button with filled-circle hover + tooltip ── */
function HeaderIconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        style={{
          background: hovered ? C.inkBrown : "none",
          border: "none",
          cursor: "pointer",
          color: hovered ? C.creamBg : C.inkBrown,
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s, color 0.2s",
          flexShrink: 0,
        }}
      >
        {children}
      </button>
      {hovered && (
        <span
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: C.inkBrown,
            color: C.creamBg,
            fontFamily: "Noto Sans KR",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
            padding: "4px 10px",
            borderRadius: 999,
            pointerEvents: "none",
            zIndex: 200,
            animation: "tooltip-in 0.18s ease forwards",
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

function Header({
  active = "COLLECTION",
  onNavClick,
  onCartClick,
  onUserClick,
  onHomeClick,
  onSearchClick,
  onDrawerOpen,
}: {
  active?: string
  onNavClick?: (item: string) => void
  onCartClick?: () => void
  onUserClick?: () => void
  onHomeClick?: () => void
  onSearchClick?: () => void
  onDrawerOpen?: () => void
}) {
  return (
    <header
      style={{
        backgroundColor: C.creamBg,
        borderBottom: `1px solid ${C.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        background: "rgba(243,236,213,0.92)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "16px 32px 0 16px",
          height: 88,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo */}
        <button
          onClick={onHomeClick}
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "transform 0.18s ease",
            transformOrigin: "left center",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = "scale(1.07)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
          }}
          aria-label="홈으로 이동"
        >
          <img
            src={yulLogoSrc}
            alt="율:12 로고"
            style={{
              height: 42,
              width: "auto",
              display: "block",
              userSelect: "none",
            }}
          />
        </button>

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item === active
            return (
              <a
                key={item}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavClick?.(item)
                }}
                style={{
                  fontFamily:
                    '"LOTTE SEOLLEIM cool OTF", "SiwonhanSeolreim", sans-serif',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: 13,
                  color: isActive ? C.sealRed : C.inkBrown,
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                  paddingBottom: 4,
                  borderBottom: isActive
                    ? `2px solid ${C.sealRed}`
                    : "2px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.color = C.sealRed
                    ;(e.currentTarget as HTMLElement).style.borderBottomColor =
                      C.sealRed
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.color = C.inkBrown
                    ;(e.currentTarget as HTMLElement).style.borderBottomColor =
                      "transparent"
                  }
                }}
              >
                {item}
              </a>
            )
          })}
        </nav>

        {/* Right icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          {([
            { icon: <SearchIcon />, label: "Search", onClick: onSearchClick },
            { icon: <UserIcon />, label: "My Page", onClick: onUserClick },
            { icon: <CartIcon />, label: "Cart", onClick: onCartClick },
            { icon: <MenuIcon />, label: "Other", onClick: onDrawerOpen },
          ] as {
            icon: React.ReactNode
            label: string
            onClick?: () => void
          }[]).map(({ icon, label, onClick: handler }) => (
            <HeaderIconButton key={label} label={label} onClick={handler}>
              {icon}
            </HeaderIconButton>
          ))}
        </div>
      </div>
    </header>
  )
}

/* ── Marquee Band ── */
function MarqueeBand() {
  // Single segment — repeated twice inside the track so translateX(-50%) loops perfectly
  const seg =
    "YUL:12 ✶ 2027 RED SHEEP ✶ 丁未年 ✶ LUCKY CHARM ✶ TWELVE ZODIAC ✶ YUL:12 ✶ 丁未年 행운 ✶ 붉은 양의 해 ✶ OBANGSAEK ✶ GIFT OF LUCK ✶ "

  const spanStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.18em",
    color: C.mustard,
    whiteSpace: "nowrap",
    display: "inline-block",
  }

  return (
    <div
      style={{
        backgroundColor: C.olive,
        overflow: "hidden",
        padding: "14px 0",
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <div className="marquee-track">
        <span style={spanStyle}>{seg}</span>
        <span style={spanStyle}>{seg}</span>
      </div>
    </div>
  )
}

/* ── Speech Bubble ── */
/* ── Sheep baa mp3 player ── */
function playBaa() {
  try {
    const audio = new Audio(sheepBaaMp3)
    audio.volume = 0.7
    audio.play().catch(() => {})
  } catch {}
}

/* ── Sheep Doll with mouse-tracking pupils ── */
function SheepDoll({ dollHeight = "65vh" }: { dollHeight?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [renderH, setRenderH] = useState(0)

  // Eye centers as % of the image (sheep-doll-hero.png, 1278×1230, transparent)
  const eyes = [
    { xPct: 37.9, yPct: 45.3 },
    { xPct: 61.6, yPct: 45.5 },
  ]
  // Button-eye diameter ≈ 5% of image height
  const eyePx = renderH * 0.05
  const maxShift = eyePx * 0.16

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setRenderH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width * 0.5
      const cy = r.top + r.height * 0.454
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const k = Math.min(dist / 400, 1)
      setOffset({ x: (dx / dist) * k, y: (dy / dist) * k })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <img
        src={heroDollImg}
        alt="율:12 붉은 양 인형"
        draggable={false}
        style={{
          height: dollHeight,
          width: "auto",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
          filter: "drop-shadow(0 24px 32px rgba(55,41,28,0.16))",
        }}
      />
      {renderH > 0 &&
        eyes.map((eye, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(${eye.xPct}% - ${eyePx * 0.55}px)`,
              top: `calc(${eye.yPct}% - ${eyePx * 0.55}px)`,
              width: eyePx * 1.1,
              height: eyePx * 1.1,
              borderRadius: "50%",
              background: "radial-gradient(circle at 50% 45%, #1c1210 0%, #0b0605 70%)",
              pointerEvents: "none",
              transform: `translate(${offset.x * maxShift * 0.35}px, ${offset.y * maxShift * 0.35}px)`,
            }}
          >
            {/* Glossy highlight — follows the cursor */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: eyePx * 0.3,
                height: eyePx * 0.3,
                marginLeft: -eyePx * 0.15,
                marginTop: -eyePx * 0.15,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                transform: `translate(${offset.x * maxShift * 1.6}px, ${offset.y * maxShift * 1.6 - eyePx * 0.12}px)`,
              }}
            />
          </div>
        ))}
    </div>
  )
}

function InteractiveSheep() {
  const [state, setState] = useState<"idle" | "baa">("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = () => {
    // Cancel any running reset timer
    if (timerRef.current) clearTimeout(timerRef.current)
    setState("baa")
    playBaa()
    timerRef.current = setTimeout(() => setState("idle"), 2000)
  }

  const isBaa = state === "baa"

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {/* Speech bubble */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: -72,
          backgroundColor: isBaa ? C.sealRed : "white",
          color: isBaa ? "white" : C.inkBrown,
          borderRadius: 14,
          padding: "7px 14px",
          boxShadow: isBaa
            ? `2px 3px 10px rgba(171,10,0,0.3)`
            : "2px 3px 8px rgba(55,41,28,0.15)",
          fontSize: isBaa ? 15 : 14,
          fontFamily: "Noto Sans KR",
          fontWeight: 700,
          whiteSpace: "nowrap",
          zIndex: 2,
          opacity: isBaa ? 1 : 0.72,
          transition:
            "background-color 0.15s, color 0.15s, box-shadow 0.15s, opacity 0.2s",
          animation: isBaa
            ? "baa-pop 0.28s cubic-bezier(0.2,0.8,0.4,1.2) forwards"
            : "none",
          transformOrigin: "bottom right",
          pointerEvents: "none",
        }}
        className="speech-bubble"
      >
        {isBaa ? "메에-" : "(…)"}
      </div>

      {/* The sheep */}
      <div
        className="float-sheep"
        style={{ filter: "drop-shadow(8px 16px 32px rgba(55,41,28,0.25))" }}
      >
        <img
          src={sheepImg}
          alt="율:12 양 캐릭터"
          width={240}
          style={{
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  )
}

/* ── Hero Section ── */
/* Star data for scattered background decoration */
const HERO_STARS = [
  { src: "gold_big",  size: 52,  top: "8%",  left: "7%",   rotate: 12,  delay: "0s" },
  { src: "gold_mid",  size: 38,  top: "22%", left: "18%",  rotate: -8,  delay: "0.6s" },
  { src: "gold_small",size: 26,  top: "55%", left: "5%",   rotate: 30,  delay: "1.1s" },
  { src: "red_dia",   size: 32,  top: "72%", left: "14%",  rotate: -20, delay: "0.3s" },
  { src: "olive_dia", size: 40,  top: "38%", left: "28%",  rotate: 5,   delay: "1.4s" },
  { src: "gold_mid",  size: 44,  top: "14%", right: "9%",  rotate: -15, delay: "0.9s" },
  { src: "gold_big",  size: 58,  top: "5%",  right: "22%", rotate: 22,  delay: "0.2s" },
  { src: "red_dia",   size: 30,  top: "48%", right: "7%",  rotate: 18,  delay: "1.7s" },
  { src: "gold_small",size: 22,  top: "68%", right: "19%", rotate: -35, delay: "0.5s" },
  { src: "olive_dia", size: 36,  top: "82%", right: "32%", rotate: 8,   delay: "1.2s" },
  { src: "gold_mid",  size: 34,  top: "30%", right: "38%", rotate: -6,  delay: "2.0s" },
  { src: "gold_small",size: 24,  top: "18%", left: "43%",  rotate: 45,  delay: "0.8s" },
] as const

function HeroSection({
  onBrandClick,
  onFortuneClick,
  onEventClick,
}: {
  onBrandClick?: () => void
  onFortuneClick?: () => void
  onEventClick?: () => void
}) {
  const starSrcMap: Record<string, string> = {
    gold_big: starGoldBig,
    gold_mid: starGoldMid,
    gold_small: starGoldSmall,
    red_dia: starRedDiamond,
    olive_dia: starOliveDiamond,
  }

  return (
    <section
      style={{
        backgroundColor: C.creamBg,
        minHeight: "calc(100vh - 88px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow — behind the sheep, bottom-center */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 80%, rgba(171,10,0,0.13) 0%, rgba(182,168,71,0.07) 38%, transparent 68%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Scattered stars — full-hero spread, behind text */}
      {HERO_STARS.map((s, i) => (
        <div
          key={i}
          className="float-star"
          style={{
            position: "absolute",
            top: "top" in s ? s.top : undefined,
            left: "left" in s ? s.left : undefined,
            right: "right" in s ? s.right : undefined,
            animationDelay: s.delay,
            zIndex: 2,
            filter: "drop-shadow(1px 3px 6px rgba(55,41,28,0.14))",
            pointerEvents: "none",
          }}
        >
          <img
            src={starSrcMap[s.src]}
            alt=""
            width={s.size}
            style={{
              display: "block",
              transform: `rotate(${s.rotate}deg)`,
              userSelect: "none",
              opacity: 0.82,
            }}
          />
        </div>
      ))}

      {/* Hidden sheep — drifting among the stars */}
      <div
        className="float-star"
        style={{
          position: "absolute",
          top: "27%",
          right: "15%",
          animationDelay: "1.3s",
          animationDuration: "3.6s",
          zIndex: 11,
        }}
      >
        <HiddenSheep id="hero" style={{ width: 34, height: 34 }} />
      </div>

      {/* ── 3-column overlay grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "44px 64px 0",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Left column — brand text */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: 8,
            maxWidth: 340,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fontWeight: 500,
              color: C.sealRed,
              letterSpacing: "0.12em",
              marginBottom: 18,
            }}
          >
            2027 丁未年
          </div>

          <h1 className="display-title"
            style={{
              fontSize: "clamp(30px, 3.6vw, 58px)",
              color: C.inkBrown,
              margin: "0 0 20px",
              textAlign: "left",
            }}
          >
            당신과 함께할
            <br />
            행운은?
          </h1>

          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 300,
              fontSize: 13,
              color: C.inkBrown,
              opacity: 0.56,
              lineHeight: 1.78,
              margin: 0,
              letterSpacing: "0",
            }}
          >
            십이지의 지혜가 담긴 특별한 아이템으로
            <br />
            일상에 행운을 더하세요.
          </p>
        </div>

        {/* Center column — logo */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            justifyContent: "center",
            paddingTop: 0,
          }}
        >
          <img
            src={yulLogoSrc}
            alt="율:12 로고"
            style={{ height: 52, width: "auto", userSelect: "none" }}
          />
        </div>

        {/* Right column — CTA links */}
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 10,
              fontWeight: 500,
              color: C.mustard,
              letterSpacing: "0.22em",
              marginBottom: 20,
            }}
          >
            LET'S PLAY
          </div>

          <button
            onClick={onEventClick}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "Noto Sans KR",
              fontSize: 15,
              fontWeight: 600,
              color: C.inkBrown,
              letterSpacing: "-0.01em",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.18s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = C.sealRed
              ;(e.currentTarget as HTMLElement).style.transform = "translateX(-4px)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = C.inkBrown
              ;(e.currentTarget as HTMLElement).style.transform = "translateX(0)"
            }}
          >
            <span style={{ opacity: 0.7, fontSize: 13 }}>→</span>
            🐑 숨은 양 찾기 미션
          </button>

          <button
            onClick={onFortuneClick}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "Noto Sans KR",
              fontSize: 15,
              fontWeight: 600,
              color: C.inkBrown,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.18s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = C.sealRed
              ;(e.currentTarget as HTMLElement).style.transform = "translateX(-4px)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = C.inkBrown
              ;(e.currentTarget as HTMLElement).style.transform = "translateX(0)"
            }}
          >
            <span style={{ opacity: 0.7, fontSize: 13 }}>→</span>
            오늘의 운세 보기
          </button>
        </div>
      </div>

      {/* ── Sheep doll — bottom-anchored, full-bleed ── */}
      {/* No transform: flex centering avoids isolated compositing group so blend mode works */}
      <div
        style={{
          position: "absolute",
          bottom: "-4vh",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 6,
          pointerEvents: "none",
        }}
      >
        <SheepDoll dollHeight="67vh" />
      </div>

    </section>
  )
}


/* ── Brand Intro Section ── */
const TAG_PILLS = ["LUCKY", "ZODIAC", "NEW YEAR", "STORY", "FORTUNE"]

function BrandIntroSection({ onBrandClick }: { onBrandClick?: () => void }) {
  return (
    <section
      style={{
        backgroundColor: "#B3A756",
        position: "relative",
        overflow: "hidden",
        padding: "96px 48px",
      }}
    >
      {/* Background texture circles */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(55,41,28,0.06)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 64,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: text content */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <div style={{ width: 24, height: 2, backgroundColor: C.sealRed }} />
            <span
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: C.sealRed,
                textTransform: "uppercase",
              }}
            >
              YUL:12 BRAND STORY
            </span>
          </div>

          {/* Headline */}
          <h2 className="display-title"
            style={{
              fontSize: "clamp(28px, 3.8vw, 52px)",
              color: C.inkBrown,
              margin: "0 0 24px",
            }}
          >
            새해의 행운을
            <br />
            일상 속에 담다
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.7,
              color: C.inkBrown,
              opacity: 0.8,
              maxWidth: 520,
              marginBottom: 36,
            }}
          >
            YUL:12는 한국의 오방색과 열두 띠 동물에서 영감을 받아, 매해 새로운
            이야기로 당신의 새해를 맞이합니다. 2027년 붉은 양띠를 맞아, 평화와
            온기를 담은 특별한 선물 컬렉션을 선보입니다. 전통의 미감과 현대적
            감각이 만나는 곳, 율:12와 함께 행운을 나눠보세요.
          </p>

          {/* Tag pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 40,
            }}
          >
            {TAG_PILLS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: C.inkBrown,
                  border: `1.5px solid rgba(55,41,28,0.35)`,
                  borderRadius: 999,
                  padding: "6px 16px",
                  backgroundColor: "rgba(255,255,255,0.25)",
                  cursor: "default",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.45)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.25)")
                }
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onBrandClick}
            style={{
              backgroundColor: C.sealRed,
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "16px 36px",
              fontFamily: "Noto Sans KR",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: `3px 4px 0 rgba(55,41,28,0.3)`,
              transition: "transform 0.15s, box-shadow 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)"
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = `4px 6px 0 rgba(55,41,28,0.3)`
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)"
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = `3px 4px 0 rgba(55,41,28,0.3)`
            }}
          >
            브랜드 스토리 보기 →
          </button>
        </div>

        {/* Right: floating sheep */}
        <div
          className="float-sheep"
          style={{
            flexShrink: 0,
            filter: "drop-shadow(6px 12px 24px rgba(55,41,28,0.22))",
          }}
        >
          <img
            src={sheepImg}
            alt="율:12 양 캐릭터"
            width={300}
            style={{ display: "block", userSelect: "none" }}
          />
        </div>
      </div>
    </section>
  )
}

/* ── Lucky Stories Review Section ── */
const SEED_REVIEWS: {
  id: number
  name: string
  tag: string
  stars: number
  story: string
  bg: string
}[] = [
  {
    id: 1,
    name: "김O현 님",
    tag: "취업",
    stars: 5,
    story:
      "액막이 인형을 받고 나서 한 달 만에 원하던 회사에 최종 합격했어요. 정말로 행운이 따라온 것 같아서 소름이 돋았습니다.",
    bg: "#494B1C",
  },
  {
    id: 2,
    name: "박O연 님",
    tag: "합격",
    stars: 5,
    story:
      "율:12 캘린더를 책상에 두고 공부했더니 수능 당일 너무 침착했어요. 합격 발표 날 이 후기를 꼭 남기고 싶었어요!",
    bg: "#AB0A00",
  },
  {
    id: 3,
    name: "이O수 님",
    tag: "선물",
    stars: 5,
    story:
      "부모님께 쿠키 세트를 드렸더니 너무 좋아하셨어요. 포장이 예쁘고 쿠키도 정말 맛있어서 새해 선물로 강력 추천합니다.",
    bg: "#B6A847",
  },
  {
    id: 4,
    name: "최O진 님",
    tag: "사업",
    stars: 5,
    story:
      "봉투 세트에 세뱃돈 담아 드렸는데 그 해 사업이 정말 잘 풀렸다고 연락이 왔어요. 인연이 닿아 기쁩니다.",
    bg: "#37291C",
  },
]

const REVIEW_CATEGORIES = [
  { label: "취업", icon: luckyCareerIcon },
  { label: "합격", icon: luckySuccessIcon },
  { label: "선물", icon: luckyGiftIcon },
  { label: "사업", icon: luckyBusinessIcon },
  { label: "건강", icon: luckyHealthIcon },
  { label: "이사", icon: luckyMovingIcon },
  { label: "연애", icon: luckyLoveIcon },
  { label: "기타", icon: luckyOtherIcon },
]

const REVIEW_TAGS = REVIEW_CATEGORIES.map(({ label }) => label)

function getReviewCategory(value: string) {
  return (
    REVIEW_CATEGORIES.find(({ label }) => value.includes(label)) ??
    REVIEW_CATEGORIES[REVIEW_CATEGORIES.length - 1]
  )
}

function LuckyStoriesSection() {
  const [reviews, setReviews] = useState<typeof SEED_REVIEWS>(() => {
    try {
      const saved = localStorage.getItem("yul12_reviews")
      return saved ? JSON.parse(saved) : SEED_REVIEWS
    } catch {
      return SEED_REVIEWS
    }
  })
  const [nickname, setNickname] = useState("")
  const [tag, setTag] = useState(REVIEW_TAGS[0])
  const [stars, setStars] = useState(5)
  const [story, setStory] = useState("")
  const [hoverStar, setHoverStar] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const selectedCategory = getReviewCategory(tag)

  const BG_CYCLE = [
    "#494B1C",
    "#AB0A00",
    "#B6A847",
    "#37291C",
    "#A6403C",
    "#494B1C",
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleSubmit() {
    if (!nickname.trim() || !story.trim()) return
    const newReview = {
      id: Date.now(),
      name: nickname.trim() + " 님",
      tag,
      stars,
      story: story.trim(),
      bg: BG_CYCLE[reviews.length % BG_CYCLE.length],
    }
    const updated = [newReview, ...reviews]
    setReviews(updated)
    try {
      localStorage.setItem("yul12_reviews", JSON.stringify(updated))
    } catch {
      /* quota */
    }
    setNickname("")
    setStory("")
    setStars(5)
    setTag(REVIEW_TAGS[0])
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2800)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: C.creamSoft,
        padding: "96px 48px",
        borderTop: `1px solid ${C.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              color: C.sealRed,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            LUCKY STORIES
          </p>
          <h2 className="display-title"
            style={{
              fontSize: 36,
              color: C.inkBrown,
              marginBottom: 16,
            }}
          >
            Real Luck, Real Stories
          </h2>
          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.7,
              color: C.inkBrown,
              opacity: 0.65,
            }}
          >
            율:12를 선물받은 사람들에게, 진짜로 좋은 일이 생겼어요
          </p>
        </div>

        {/* Review cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 72,
          }}
        >
          {reviews.map((r, i) => {
            const textColor = r.bg === "#B6A847" ? C.inkBrown : "#FBF7E9"
            const subColor =
              r.bg === "#B6A847"
                ? "rgba(55,41,28,0.65)"
                : "rgba(251,247,233,0.65)"
            const category = getReviewCategory(r.tag)
            return (
              <div
                key={r.id}
                style={{
                  backgroundColor: r.bg,
                  borderRadius: 12,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span
                      key={si}
                      style={{
                        fontSize: 14,
                        color:
                          si < r.stars ? "#F5C518" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {/* Story */}
                <p
                  style={{
                    fontFamily: "Noto Sans KR",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: textColor,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {r.story}
                </p>
                {/* Name + tag row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Noto Sans KR",
                      fontSize: 12,
                      fontWeight: 700,
                      color: textColor,
                    }}
                  >
                    {r.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "Noto Sans KR",
                      fontSize: 11,
                      fontWeight: 400,
                      color: textColor,
                      background: "rgba(255,255,255,0.14)",
                      padding: "3px 10px",
                      borderRadius: 20,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <img
                      src={category.icon}
                      alt=""
                      aria-hidden="true"
                      style={{
                        width: 18,
                        height: 18,
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />
                    {category.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Write form */}
        <div
          style={{
            backgroundColor: C.cardPaper,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "48px",
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: C.inkBrown,
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            나의 행운 후기 남기기 ✍️
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Nickname */}
            <div>
              <label
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: C.sealRed,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                닉네임 (최대 10자)
              </label>
              <input
                type="text"
                maxLength={10}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 행운이"
                style={{
                  width: "100%",
                  fontFamily: "Noto Sans KR",
                  fontSize: 14,
                  fontWeight: 400,
                  color: C.inkBrown,
                  backgroundColor: C.creamBg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            {/* Tag */}
            <div>
              <label
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: C.sealRed,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                행운 태그
              </label>
              <div style={{ position: "relative" }}>
                <img
                  src={selectedCategory.icon}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    width: 24,
                    height: 24,
                    objectFit: "contain",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  style={{
                    width: "100%",
                    fontFamily: "Noto Sans KR",
                    fontSize: 14,
                    fontWeight: 400,
                    color: C.inkBrown,
                    backgroundColor: C.creamBg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "10px 14px 10px 42px",
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  {REVIEW_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Star rating */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: C.sealRed,
                display: "block",
                marginBottom: 8,
              }}
            >
              별점
            </label>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setStars(n)}
                  onMouseEnter={() => setHoverStar(n)}
                  onMouseLeave={() => setHoverStar(0)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 2,
                    fontSize: 28,
                    color: n <= (hoverStar || stars) ? "#F5C518" : C.border,
                    transition: "color 0.15s",
                    lineHeight: 1,
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: C.sealRed,
                display: "block",
                marginBottom: 8,
              }}
            >
              행운 이야기
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="율:12와 함께한 행운 이야기를 나눠주세요 :)"
              rows={4}
              style={{
                width: "100%",
                fontFamily: "Noto Sans KR",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.7,
                color: C.inkBrown,
                backgroundColor: C.creamBg,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "12px 14px",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              fontFamily: "Noto Sans KR",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#FBF7E9",
              backgroundColor: submitted ? "#494B1C" : C.sealRed,
              border: "none",
              borderRadius: 8,
              padding: "14px 0",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {submitted ? "✓ 후기가 등록되었습니다!" : "후기 등록하기"}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ── Guide Drawer ── */
const QA_ITEMS = [
  {
    q: "정말 행운이 오나요?",
    a: "과학적으로 보장하진 못하지만, 주고받는 마음이 용기와 위안이 됩니다. 율:12는 그 마음을 담는 그릇이에요.",
  },
  {
    q: "선물 포장이 되나요?",
    a: "모든 상품은 한지 포장으로 출고되며, 요청 시 손글씨 메시지 카드도 무료로 넣어드려요.",
  },
  {
    q: "선물 세트 구성도 있나요?",
    a: "부적 카드+키링+복 봉투 선물 세트를 준비 중. 단체 선물(10세트 이상)은 메일 문의.",
  },
]

function GuideDrawer({ onClose }: { onClose: () => void }) {
  const [openQ, setOpenQ] = useState<number | null>(null)
  const [anon, setAnon] = useState<"anon" | "named">("anon")
  const [askerName, setAskerName] = useState("")
  const [question, setQuestion] = useState("")
  const [submitted, setSubmitted] = useState<{ name: string; text: string }[]>(
    [],
  )

  function handleAsk() {
    const text = question.trim()
    if (!text) return
    const name =
      anon === "named" && askerName.trim() ? askerName.trim() : "익명"
    setSubmitted((prev) => [{ name, text }, ...prev])
    setQuestion("")
    setAskerName("")
  }

  const sectionHead = (label: string) => (
    <p
      style={{
        fontFamily: "Noto Sans KR",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.22em",
        color: C.sealRed,
        textTransform: "uppercase",
        margin: "0 0 14px",
      }}
    >
      {label}
    </p>
  )

  const divider = (
    <div style={{ borderTop: `1px solid ${C.border}`, margin: "28px 0" }} />
  )

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9200,
          backgroundColor: "rgba(30,20,10,0.55)",
          animation: "overlay-in 0.3s ease forwards",
        }}
      />
      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9201,
          width: "100%",
          maxWidth: 420,
          backgroundColor: C.cardPaper,
          boxShadow: "-8px 0 40px rgba(30,20,10,0.18)",
          display: "flex",
          flexDirection: "column",
          animation: "drawer-in 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
          overflowY: "auto",
        }}
      >
        {/* Sticky header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: C.cardPaper,
            borderBottom: `1px solid ${C.border}`,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: C.sealRed,
                margin: "0 0 4px",
              }}
            >
              YUL:12
            </p>
            <h2
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: C.inkBrown,
                margin: 0,
              }}
            >
              GUIDE
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              fontSize: 22,
              color: C.inkBrown,
              opacity: 0.4,
              lineHeight: 1,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.9")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.4")
            }
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 28px 48px", flexGrow: 1 }}>
          {/* (A) Q&A accordion */}
          {sectionHead("Q & A")}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {QA_ITEMS.map((item, i) => {
              const isOpen = openQ === i
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <button
                    onClick={() => setOpenQ(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: isOpen ? C.creamSoft : "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "14px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      transition: "background-color 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Noto Sans KR",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.inkBrown,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      style={{
                        fontFamily: "Noto Sans KR",
                        fontSize: 16,
                        color: C.sealRed,
                        flexShrink: 0,
                        transition: "transform 0.2s",
                        display: "inline-block",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 16px 14px",
                        fontFamily: "Noto Sans KR",
                        fontSize: 13,
                        fontWeight: 400,
                        lineHeight: 1.8,
                        color: C.inkBrown,
                        opacity: 0.75,
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {divider}

          {/* (B) Ask a question */}
          {sectionHead("질문 남기기")}
          <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
            {(["anon", "named"] as const).map((v) => (
              <label
                key={v}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  fontFamily: "Noto Sans KR",
                  fontSize: 13,
                  color: C.inkBrown,
                }}
              >
                <input
                  type="radio"
                  name="anon"
                  value={v}
                  checked={anon === v}
                  onChange={() => setAnon(v)}
                  style={{ accentColor: C.sealRed, cursor: "pointer" }}
                />
                {v === "anon" ? "익명으로 남기기" : "이름 남기기"}
              </label>
            ))}
          </div>
          {anon === "named" && (
            <input
              type="text"
              value={askerName}
              onChange={(e) => setAskerName(e.target.value)}
              placeholder="이름을 입력하세요"
              maxLength={20}
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginBottom: 10,
                fontFamily: "Noto Sans KR",
                fontSize: 13,
                color: C.inkBrown,
                backgroundColor: C.creamBg,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "9px 12px",
                outline: "none",
              }}
            />
          )}
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="궁금한 점을 자유롭게 남겨주세요 :)"
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginBottom: 10,
              fontFamily: "Noto Sans KR",
              fontSize: 13,
              color: C.inkBrown,
              backgroundColor: C.creamBg,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "10px 12px",
              outline: "none",
              resize: "vertical",
              lineHeight: 1.7,
            }}
          />
          <button
            onClick={handleAsk}
            style={{
              width: "100%",
              fontFamily: "Noto Sans KR",
              fontSize: 13,
              fontWeight: 700,
              color: "#FBF7E9",
              backgroundColor: C.sealRed,
              border: "none",
              borderRadius: 8,
              padding: "11px 0",
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            질문 남기기
          </button>
          {submitted.length > 0 && (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {submitted.map((s, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: C.creamSoft,
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontFamily: "Noto Sans KR",
                    fontSize: 12,
                    color: C.inkBrown,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: C.sealRed,
                      marginRight: 8,
                    }}
                  >
                    {s.name}
                  </span>
                  {s.text}
                </div>
              ))}
            </div>
          )}

          {divider}

          {/* (C) Shipping */}
          {sectionHead("배송 안내")}
          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 13,
              lineHeight: 1.8,
              color: C.inkBrown,
              opacity: 0.75,
              margin: "0 0 8px",
            }}
          >
            명절·공휴일 연휴에는 배송이 1–3일 지연될 수 있습니다.
            <br />
            주문 후 평균 1–2 영업일 내 출고됩니다.
          </p>

          {divider}

          {/* (D) Exchange / Return */}
          {sectionHead("교환 / 반품")}
          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 13,
              lineHeight: 1.8,
              color: C.inkBrown,
              opacity: 0.75,
              margin: "0 0 8px",
            }}
          >
            상품 수령 후 7일 이내 교환·반품 신청 가능합니다.
            <br />
            단, 개봉 또는 사용된 식품·위생 용품은 반품이 불가합니다.
            <br />
            교환 배송비는 고객 부담이며, 불량품은 무상 교환됩니다.
          </p>

          {divider}

          {/* (E) Contact */}
          {sectionHead("CONTACT")}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "서울 성수", detail: "서울특별시 성동구 연무장길 11" },
              {
                label: "부산 전포",
                detail: "부산광역시 부산진구 전포대로 182",
              },
              { label: "이메일", detail: "hello@yul12.kr" },
            ].map((c) => (
              <div
                key={c.label}
                style={{ display: "flex", gap: 12, alignItems: "baseline" }}
              >
                <span
                  style={{
                    fontFamily: "Noto Sans KR",
                    fontSize: 11,
                    fontWeight: 500,
                    color: C.sealRed,
                    minWidth: 60,
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontFamily: "Noto Sans KR",
                    fontSize: 13,
                    color: C.inkBrown,
                    opacity: 0.75,
                    lineHeight: 1.6,
                  }}
                >
                  {c.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Search Modal ── */
const SEARCH_CATALOG = [
  {
    id: 1,
    name: "액막이 인형",
    sub: "Lucky Talisman Doll",
    category: "인형",
    badge: "BEST",
  },
  {
    id: 2,
    name: "벽걸이 캘린더",
    sub: "Wall Calendar 2027",
    category: "지류",
    badge: "NEW",
  },
  {
    id: 3,
    name: "탁상형 캘린더",
    sub: "Desk Calendar 2027",
    category: "지류",
    badge: null,
  },
  {
    id: 4,
    name: "마스킹테이프",
    sub: "Masking Tape",
    category: "지류",
    badge: null,
  },
  { id: 5, name: "봉투", sub: "Envelope Set", category: "지류", badge: null },
  { id: 6, name: "카드", sub: "Greeting Card", category: "지류", badge: "NEW" },
  {
    id: 7,
    name: "쿠키 세트",
    sub: "Lucky Cookie Set",
    category: "식품",
    badge: "BEST",
  },
  { id: 8, name: "캔들", sub: "Soy Wax Candle", category: "리빙", badge: null },
  { id: 9, name: "비누", sub: "Handcraft Soap", category: "리빙", badge: null },
]

function SearchModal({
  onClose,
  onProductClick,
}: {
  onClose: () => void
  onProductClick: () => void
}) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [])

  const results = query.trim()
    ? SEARCH_CATALOG.filter((p) => {
        const q = query.trim().toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.sub.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      })
    : []

  const hasQuery = query.trim().length > 0

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9100,
        backgroundColor: "rgba(30,20,10,0.62)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 120,
        padding: "120px 24px 24px",
        animation: "overlay-in 0.25s ease forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: C.cardPaper,
          borderRadius: 18,
          padding: "36px 36px 28px",
          width: "100%",
          maxWidth: 560,
          boxShadow: "0 24px 64px rgba(30,20,10,0.28)",
          animation: "modal-in 0.32s cubic-bezier(0.34,1.4,0.64,1) forwards",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 18,
              fontWeight: 700,
              color: C.inkBrown,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            상품 검색 🔍
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Noto Sans KR",
              fontSize: 13,
              fontWeight: 600,
              color: C.inkBrown,
              opacity: 0.45,
              padding: "4px 8px",
              borderRadius: 6,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.45")
            }
          >
            닫기 ✕
          </button>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상품 이름을 입력하세요 (예: 양이, 키링)"
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontFamily: "Noto Sans KR",
            fontSize: 15,
            fontWeight: 400,
            color: C.inkBrown,
            backgroundColor: C.creamBg,
            border: `1.5px solid ${C.border}`,
            borderRadius: 10,
            padding: "13px 16px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = C.sealRed)
          }
          onBlur={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = C.border)
          }
        />

        {/* Results */}
        <div style={{ marginTop: 16, minHeight: 48 }}>
          {!hasQuery ? null : results.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 0",
                fontFamily: "Noto Sans KR",
                fontSize: 14,
                color: C.inkBrown,
                opacity: 0.45,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>🐑</div>
              검색 결과가 없어요
            </div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      onClose()
                      onProductClick()
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "11px 14px",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor =
                        C.creamSoft)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor =
                        "transparent")
                    }
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "Noto Sans KR",
                          fontSize: 15,
                          fontWeight: 700,
                          color: C.inkBrown,
                        }}
                      >
                        {p.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "Noto Sans KR",
                          fontSize: 12,
                          color: C.inkBrown,
                          opacity: 0.5,
                          marginLeft: 8,
                        }}
                      >
                        {p.sub}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontFamily: "Noto Sans KR",
                          fontSize: 10,
                          fontWeight: 600,
                          color: C.inkBrown,
                          opacity: 0.4,
                          border: `1px solid ${C.border}`,
                          borderRadius: 4,
                          padding: "2px 7px",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {p.category}
                      </span>
                      {p.badge && (
                        <span
                          style={{
                            fontFamily: "Noto Sans KR",
                            fontSize: 10,
                            fontWeight: 500,
                            color: C.sealRed,
                            letterSpacing: "0.1em",
                          }}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Welcome Modal ── */
function shouldShowModal(): boolean {
  try {
    const suppressed = localStorage.getItem("yul12_modal_hide_until")
    if (!suppressed) return true
    return new Date().toDateString() !== suppressed
  } catch {
    return true
  }
}

function WelcomeModal({
  onFortune,
  onClose,
}: {
  onFortune: () => void
  onClose: () => void
}) {
  const [noShowToday, setNoShowToday] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  function close() {
    if (noShowToday) {
      try {
        localStorage.setItem(
          "yul12_modal_hide_until",
          new Date().toDateString(),
        )
      } catch {
        /* quota */
      }
    }
    onClose()
  }

  function goFortune() {
    if (noShowToday) {
      try {
        localStorage.setItem(
          "yul12_modal_hide_until",
          new Date().toDateString(),
        )
      } catch {
        /* quota */
      }
    }
    onFortune()
  }

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "rgba(30,20,10,0.62)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "overlay-in 0.35s ease forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: C.cardPaper,
          borderRadius: 20,
          padding: "48px 40px 40px",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(30,20,10,0.28)",
          animation: visible
            ? "modal-in 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards"
            : "none",
          opacity: visible ? undefined : 0,
          position: "relative",
        }}
      >
        {/* Close × */}
        <button
          onClick={close}
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: C.inkBrown,
            opacity: 0.35,
            lineHeight: 1,
            padding: 4,
          }}
          aria-label="닫기"
        >
          ×
        </button>

        {/* Year label */}
        <p
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: C.sealRed,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          2027 丁未年
        </p>

        {/* Sheep illustration */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <div style={{ animation: "float 4s ease-in-out infinite" }}>
            <img
              src={sheepImg}
              alt="율:12 양 캐릭터"
              width={180}
              style={{ display: "block", userSelect: "none" }}
            />
          </div>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            color: C.inkBrown,
            marginBottom: 14,
          }}
        >
          오늘의 행운이 도착했어요
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.8,
            color: C.inkBrown,
            opacity: 0.65,
            marginBottom: 32,
            wordBreak: "keep-all",
          }}
        >
          태어난 해만 알려주시면, 당신의 띠와 오늘의 운세를
          <br />
          율:12가 점쳐드릴게요.
        </p>

        {/* Primary button */}
        <button
          onClick={goFortune}
          style={{
            width: "100%",
            fontFamily: "Noto Sans KR",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#FBF7E9",
            backgroundColor: C.sealRed,
            border: "none",
            borderRadius: 10,
            padding: "14px 0",
            cursor: "pointer",
            marginBottom: 10,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.88")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          🔮 오늘의 운세 보러가기
        </button>

        {/* Ghost button */}
        <button
          onClick={close}
          style={{
            width: "100%",
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: C.inkBrown,
            backgroundColor: "transparent",
            border: `1.5px solid ${C.border}`,
            borderRadius: 10,
            padding: "12px 0",
            cursor: "pointer",
            marginBottom: 24,
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              C.borderStrong)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = C.border)
          }
        >
          먼저 둘러볼게요
        </button>

        {/* No-show checkbox */}
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fontWeight: 400,
            color: C.inkBrown,
            opacity: 0.5,
          }}
        >
          <input
            type="checkbox"
            checked={noShowToday}
            onChange={(e) => setNoShowToday(e.target.checked)}
            style={{
              accentColor: C.sealRed,
              width: 14,
              height: 14,
              cursor: "pointer",
            }}
          />
          오늘 하루 보지 않기
        </label>
      </div>
    </div>
  )
}

/* ── Shared Footer ── */
const FOOTER_COLS: { heading: string; links: string[] }[] = [
  {
    heading: "BRAND",
    links: [
      "Brand Story",
      "YUL:12 Philosophy",
      "Obangsaek Colors",
      "12 Zodiac Animals",
      "Press & Media",
    ],
  },
  {
    heading: "MENU",
    links: [
      "Collection 2027",
      "New Arrivals",
      "Gift Sets",
      "Collaboration",
      "Limited Edition",
    ],
  },
  {
    heading: "HELP",
    links: [
      "FAQ",
      "Order & Shipping",
      "Returns & Exchange",
      "Gift Wrapping",
      "Contact Us",
    ],
  },
  {
    heading: "INFO",
    links: [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Policy",
      "Sitemap",
      "Newsletter",
    ],
  },
]

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: C.creamSoft,
        borderTop: `1px solid ${C.border}`,
        padding: "64px 48px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* 4-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 40,
            marginBottom: 56,
          }}
        >
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: C.sealRed,
                  textTransform: "uppercase",
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {col.heading}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "Noto Sans KR",
                        fontSize: 13,
                        fontWeight: 400,
                        color: C.inkBrown,
                        opacity: 0.65,
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.opacity =
                          "0.65")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `1px solid ${C.border}`,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: C.sealRed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              🐑
            </div>
            <span
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 13,
                fontWeight: 600,
                color: C.inkBrown,
                letterSpacing: "0.04em",
              }}
            >
              YUL:12
            </span>
          </div>
          <div
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              color: C.inkBrown,
              opacity: 0.45,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span>
              © 2027 YUL:12. All rights reserved. 율:12 — 오방색과 열두 띠의
              이야기
            </span>
          </div>
          {/* Hidden sheep — resting on the footer's bottom rule */}
          <HiddenSheep
            id="footer"
            style={{ position: "absolute", top: -27, right: "12%", width: 28, height: 28 }}
          />
        </div>
      </div>
    </footer>
  )
}

/* ── Floating sheep tracker ── */
/* ── Hint Popup ── */
function HintPopup() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("yul12_hint_shown")) return
    const showTimer = setTimeout(() => setVisible(true), 3000)
    const fadeTimer = setTimeout(() => {
      setFading(true)
      setTimeout(() => setVisible(false), 400)
    }, 10000)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem("yul12_hint_shown", "1")
    setFading(true)
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9500,
        backgroundColor: "rgba(61,74,30,0.92)",
        borderRadius: 16,
        padding: "16px 20px",
        maxWidth: 280,
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        animation: fading
          ? "fadeOut 0.4s ease forwards"
          : "slideUp 0.4s ease-out forwards",
      }}
    >
      {/* Close button */}
      <button
        onClick={dismiss}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          background: "none",
          border: "none",
          color: "#C8BFA0",
          fontSize: 16,
          cursor: "pointer",
          lineHeight: 1,
          opacity: 0.7,
          padding: 0,
        }}
      >
        ×
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          paddingRight: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>🐑</span>
          <span
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 700,
              fontSize: 14,
              color: "#C8BFA0",
              letterSpacing: "-0.01em",
            }}
          >
            숨은 양을 찾아보세요!
          </span>
        </div>
        <p
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            color: "#C8BFA0",
            opacity: 0.78,
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          사이트 곳곳에 행운의 양이 숨어 있어요. 찾을 때마다 특별한 운세가
          열립니다.
        </p>
      </div>
    </div>
  )
}

function SheepTracker({ onEventClick }: { onEventClick: () => void }) {
  const { found } = useSheepHunt()
  const n = found.size
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onEventClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="숨겨진 양 찾기 이벤트"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 8000,
        background: n === 7 ? C.sealRed : C.inkBrown,
        border: "none",
        borderRadius: 999,
        padding: "10px 18px 10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(55,41,28,0.3)",
        transform: hovered ? "scale(1.07) translateY(-2px)" : "scale(1)",
        transition: "transform 0.2s, background-color 0.3s, box-shadow 0.2s",
      }}
    >
      <img
        src={sheepImg}
        alt=""
        style={{
          width: 22,
          height: 22,
          objectFit: "contain",
          filter: "brightness(10)",
        }}
      />
      <span
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 13,
          fontWeight: 700,
          color: "#F3ECD5",
          letterSpacing: "-0.01em",
        }}
      >
        {n}/7
      </span>
    </button>
  )
}

/* ── Root App ── */
function AppInner() {
  const [page, setPage] =
    useState<"home" | "brand" | "collection" | "shop" | "product" | "new" | "cart" | "fortune" | "mypage" | "event">(
      "home",
    )
  const [selectedProductId, setSelectedProductId] = useState<number>(1)
  const [showModal, setShowModal] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    if (!shouldShowModal()) return
    const t = setTimeout(() => setShowModal(true), 800)
    return () => clearTimeout(t)
  }, [])

  const handleNavClick = (item: string) => {
    if (item === "ABOUT YUL") setPage("brand")
    else if (item === "COLLECTION") setPage("collection")
    else if (item === "SHOP") setPage("shop")
    else if (item === "NEW") setPage("new")
    else if (item === "EVENT") setPage("event")
    else setPage("home")
  }

  const activeNav =
    page === "brand"
      ? "ABOUT YUL"
      : page === "collection"
        ? "COLLECTION"
        : page === "shop" || page === "product"
          ? "SHOP"
          : page === "new"
            ? "NEW"
            : page === "fortune" || page === "event"
              ? "EVENT"
              : page === "mypage"
                ? ""
                : "COLLECTION"

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.creamBg }}>
      {showDrawer && <GuideDrawer onClose={() => setShowDrawer(false)} />}
      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onProductClick={() => setPage("product")}
        />
      )}
      {showModal && (
        <WelcomeModal
          onFortune={() => {
            setShowModal(false)
            setPage("fortune")
          }}
          onClose={() => setShowModal(false)}
        />
      )}
      <Header
        active={activeNav}
        onNavClick={handleNavClick}
        onCartClick={() => setPage("cart")}
        onUserClick={() => setPage("mypage")}
        onHomeClick={() => setPage("home")}
        onSearchClick={() => setShowSearch(true)}
        onDrawerOpen={() => setShowDrawer(true)}
      />
      <main>
        {page === "home" ? (
          <>
            <HeroSection
              onBrandClick={() => setPage("brand")}
              onFortuneClick={() => setPage("fortune")}
              onEventClick={() => setPage("event")}
            />
            <MarqueeBand />
            <BrandIntroSection onBrandClick={() => setPage("brand")} />
            <ProductScrollMarquee
              onProductClick={(id) => {
                setSelectedProductId(id)
                setPage("product")
              }}
            />
            <LuckyStoriesSection />
          </>
        ) : page === "brand" ? (
          <BrandStoryPage />
        ) : page === "collection" ? (
          <LookbookPage />
        ) : page === "new" ? (
          <NewArrivalsPage
            onShop={() => setPage("shop")}
            onProduct={() => setPage("product")}
          />
        ) : page === "fortune" ? (
          <FortunePage />
        ) : page === "event" ? (
          <EventPage />
        ) : page === "mypage" ? (
          <MyPage />
        ) : page === "cart" ? (
          <CartPage onShop={() => setPage("shop")} />
        ) : page === "shop" ? (
          <ShopPage
            onProductClick={(id) => {
              setSelectedProductId(id)
              setPage("product")
            }}
          />
        ) : (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => setPage("shop")}
          />
        )}
      </main>
      <Footer />
      <SheepTracker onEventClick={() => setPage("event")} />
      <HintPopup />
    </div>
  )
}

export default function App() {
  return (
    <SheepHuntProvider>
      <AppInner />
    </SheepHuntProvider>
  )
}
