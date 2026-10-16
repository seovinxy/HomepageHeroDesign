import {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { PRODUCTS } from "@/ShopPage"

type Product = (typeof PRODUCTS)[number]

const ROW_ONE = PRODUCTS
const ROW_TWO = [...PRODUCTS.slice(4), ...PRODUCTS.slice(0, 4)].reverse()

const ProductItem = memo(function ProductItem({
  product,
  onProductClick,
}: {
  product: Product
  onProductClick: (id: number) => void
}) {
  return (
    <motion.button
      type="button"
      className="product-marquee__item"
      aria-label={`${product.name} 상세 보기`}
      onClick={() => onProductClick(product.id)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="product-marquee__media">
        <img
          className="product-marquee__image"
          src={product.image}
          alt={product.name}
          draggable={false}
        />
      </span>
      <span className="product-marquee__name">{product.name}</span>
    </motion.button>
  )
})

function ProductRow({
  products,
  x,
  segmentRef,
  onProductClick,
}: {
  products: Product[]
  x: MotionValue<number>
  segmentRef?: RefObject<HTMLDivElement | null>
  onProductClick: (id: number) => void
}) {
  return (
    <motion.div className="product-marquee__track" style={{ x }}>
      {[0, 1, 2].map((copy) => (
        <div
          className="product-marquee__segment"
          key={copy}
          ref={copy === 0 ? segmentRef : undefined}
        >
          {products.map((product) => (
            <ProductItem
              key={`${copy}-${product.id}`}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      ))}
    </motion.div>
  )
}

export default function ProductScrollMarquee({
  onProductClick,
}: {
  onProductClick: (id: number) => void
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const segmentRef = useRef<HTMLDivElement>(null)
  const [segmentWidth, setSegmentWidth] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  useLayoutEffect(() => {
    const segment = segmentRef.current
    if (!segment) return

    const updateWidth = () => setSegmentWidth(segment.getBoundingClientRect().width)
    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(segment)
    return () => observer.disconnect()
  }, [])

  const topTarget = useTransform(
    scrollYProgress,
    [0, 1],
    [-segmentWidth, 0],
  )
  const bottomTarget = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -segmentWidth],
  )
  const springConfig = { stiffness: 110, damping: 24, mass: 0.45 }
  const topX = useSpring(topTarget, springConfig)
  const bottomX = useSpring(bottomTarget, springConfig)

  return (
    <section
      ref={sectionRef}
      className="product-marquee"
      aria-label="스크롤로 둘러보는 YUL:12 제품"
    >
      <div className="product-marquee__viewport">
        <ProductRow
          products={ROW_ONE}
          x={topX}
          segmentRef={segmentRef}
          onProductClick={onProductClick}
        />
        <ProductRow
          products={ROW_TWO}
          x={bottomX}
          onProductClick={onProductClick}
        />
      </div>
    </section>
  )
}
