import React, { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/** Consistent luxury editorial transition curve & viewport trigger */
const LUXURY_EASE = [0.16, 0.65, 0.3, 1] as const
const VIEWPORT_MARGIN = '0px 0px -150px 0px' as const

function MaskedLineItem({
  line,
  idx,
  delay = 0.1,
  stagger = 0.2,
  duration = 1.75,
  isInView,
  className = '',
}: {
  line: React.ReactNode
  idx: number
  delay?: number
  stagger?: number
  duration?: number
  isInView: boolean
  className?: string
}) {
  const [isRevealed, setIsRevealed] = React.useState(false)

  return (
    <span className={`reveal-line-mask ${isRevealed ? 'is-revealed' : ''} ${className}`.trim()}>
      <motion.span
        className="reveal-line-inner"
        initial={{ y: '115%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
        transition={{
          y: {
            duration,
            delay: delay + idx * stagger,
            ease: LUXURY_EASE,
          },
          opacity: {
            duration: duration * 0.85,
            delay: delay + idx * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
        onAnimationComplete={() => {
          if (isInView) {
            setIsRevealed(true)
          }
        }}
      >
        {line}
      </motion.span>
    </span>
  )
}

/**
 * MaskedHeading: Splits an array of lines and reveals each line sequentially from behind an overflow:hidden mask.
 * Uses useInView on the unclipped parent element to guarantee 100% reliable triggering across all browsers.
 */
export function MaskedHeading({
  lines,
  as: Component = 'h2',
  className = '',
  delay = 0.1,
  stagger = 0.2,
  style,
}: {
  lines: React.ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p'
  className?: string
  delay?: number
  stagger?: number
  style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, {
    once: true,
    margin: VIEWPORT_MARGIN,
  })

  return (
    <Component
      ref={containerRef as any}
      className={`masked-heading ${className}`.trim()}
      style={style}
    >
      {lines.map((line, idx) => (
        <MaskedLineItem
          key={idx}
          line={line}
          idx={idx}
          delay={delay}
          stagger={stagger}
          duration={1.75}
          isInView={isInView}
        />
      ))}
    </Component>
  )
}

/**
 * MaskedParagraph: Reveals paragraph text one line/sentence at a time instead of fading in as a whole block.
 * Can take an array of lines, a text string (auto-split on sentences), or children.
 */
export function MaskedParagraph({
  children,
  lines,
  text,
  className = '',
  delay = 0.25,
  stagger = 0.2,
  style,
  as: Component = 'p',
}: {
  children?: React.ReactNode
  lines?: React.ReactNode[]
  text?: string
  className?: string
  delay?: number
  stagger?: number
  style?: React.CSSProperties
  as?: 'p' | 'div' | 'span'
}) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, {
    once: true,
    margin: VIEWPORT_MARGIN,
  })

  // Resolve lines: explicit lines -> text split by sentence -> string children split -> raw children
  let resolvedLines: React.ReactNode[] = []
  if (lines && lines.length > 0) {
    resolvedLines = lines
  } else if (text) {
    resolvedLines = text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean)
  } else if (typeof children === 'string') {
    resolvedLines = children
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean)
  } else if (Array.isArray(children)) {
    resolvedLines = children
  } else if (children) {
    resolvedLines = [children]
  }

  return (
    <Component
      ref={containerRef as any}
      className={`masked-paragraph ${className}`.trim()}
      style={style}
    >
      {resolvedLines.map((line, idx) => (
        <MaskedLineItem
          key={idx}
          line={line}
          idx={idx}
          delay={delay}
          stagger={stagger}
          duration={2.0}
          isInView={isInView}
          className="paragraph-line-mask"
        />
      ))}
    </Component>
  )
}

/**
 * RevealLine: Wraps a single line of text with an overflow:hidden mask.
 */
export function RevealLine({
  children,
  delay = 0.1,
  className = '',
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })
  const [isRevealed, setIsRevealed] = React.useState(false)

  return (
    <span
      ref={ref}
      className={`reveal-line-mask ${isRevealed ? 'is-revealed' : ''} ${className}`.trim()}
      style={style}
    >
      <motion.span
        className="reveal-line-inner"
        initial={{ y: '115%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
        transition={{
          y: { duration: 1.75, delay, ease: LUXURY_EASE },
          opacity: { duration: 1.45, delay, ease: [0.25, 0.1, 0.25, 1] },
        }}
        onAnimationComplete={() => {
          if (isInView) setIsRevealed(true)
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/**
 * ScrollEyebrowReveal: Reveals category tags & chapter indicators with character tracking expansion and gold hairline.
 */
export function ScrollEyebrowReveal({
  children,
  className = '',
  delay = 0.08,
  withLine = false,
  style,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  withLine?: boolean
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })

  return (
    <div ref={ref} className={`reveal-eyebrow-container ${className}`.trim()} style={style}>
      <motion.div
        className="eyebrow reveal-eyebrow"
        initial={{ opacity: 0, y: 12, letterSpacing: '0.08em' }}
        animate={isInView ? { opacity: 1, y: 0, letterSpacing: '0.16em' } : { opacity: 0, y: 12, letterSpacing: '0.08em' }}
        transition={{ duration: 1.6, delay, ease: LUXURY_EASE }}
      >
        {children}
      </motion.div>
      {withLine && (
        <motion.span
          className="reveal-eyebrow-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.7, delay: delay + 0.2, ease: LUXURY_EASE }}
        />
      )}
    </div>
  )
}

/**
 * ScrollSpinStar: Decorative artisan asterisk (✳) that spins and blooms into view.
 */
export function ScrollSpinStar({
  className = '',
  delay = 0.1,
  style,
}: {
  className?: string
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })

  return (
    <motion.span
      ref={ref}
      className={`scroll-spin-star ${className}`.trim()}
      initial={{ opacity: 0, scale: 0.6, rotate: -60 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.6, rotate: -60 }}
      transition={{ duration: 1.75, delay, ease: LUXURY_EASE }}
      style={{ display: 'inline-block', ...style }}
    >
      ✳
    </motion.span>
  )
}

/**
 * ScrollFadeReveal: Smooth container fade/glide for text blocks, articles, and values.
 */
export function ScrollFadeReveal({
  children,
  className = '',
  delay = 0.1,
  yOffset = 24,
  style,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: 1.6, delay, ease: LUXURY_EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollImageReveal: Gracefully unveils imagery with a very slow scale-down and opacity glide on scroll.
 */
export function ScrollImageReveal({
  children,
  className = '',
  delay = 0.15,
  duration = 1.75,
  style,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN })

  return (
    <div
      ref={ref}
      className={`scroll-image-reveal-wrap ${className}`.trim()}
      style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <motion.div
        className="scroll-image-reveal-inner"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={{
          opacity: { duration: duration * 0.9, delay, ease: [0.16, 0.65, 0.3, 1] },
          scale: { duration, delay, ease: LUXURY_EASE },
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * ParallaxImage: Smooth scroll-driven parallax for editorial imagery.
 * Reveals slowly with a gentle scale-down & fade on scroll into view,
 * then glides vertically with depth as the user scrolls through the page.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  offset = ['start end', 'end start'],
  yRange = ['-8%', '8%'],
  scale = 1.15,
  fixed = false,
  style,
  imgStyle,
  loading = 'lazy',
  ...props
}: {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  offset?: any
  yRange?: [string, string]
  scale?: number
  fixed?: boolean
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
  loading?: 'lazy' | 'eager'
  [key: string]: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: VIEWPORT_MARGIN })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
    restDelta: 0.0005,
  })

  // Map 0 -> 1 smoothed scroll progress to vertical offset
  const y = useTransform(smoothProgress, [0, 1], yRange)

  return (
    <div
      ref={containerRef}
      className={`parallax-container ${fixed ? 'parallax-fixed-clip' : ''} ${containerClassName}`.trim()}
      style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <div className={fixed ? 'parallax-fixed-viewport' : 'parallax-inner-fill'}>
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          className={`parallax-img ${className}`.trim()}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : scale * 1.08 }}
          animate={isInView ? { opacity: 1, scale: shouldReduceMotion ? 1 : scale } : { opacity: 0, scale: shouldReduceMotion ? 1 : scale * 1.08 }}
          transition={{
            opacity: { duration: 1.75, ease: [0.16, 0.65, 0.3, 1], delay: 0.1 },
            scale: { duration: 1.85, ease: [0.16, 0.65, 0.3, 1], delay: 0.1 },
          }}
          style={{
            y: shouldReduceMotion || fixed ? undefined : y,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            willChange: fixed ? undefined : 'transform',
            ...imgStyle,
          }}
          {...props}
        />
      </div>
    </div>
  )
}

/**
 * SlideMaskCard: Side-mask reveal scroll animation for editorial image cards,
 * matching the product card sliding entrance (1.75s luxury ease, -150px late viewport trigger).
 * Slides horizontally into view behind an overflow:hidden mask.
 */
export function SlideMaskCard({
  children,
  direction = 'left',
  delay = 0,
  duration = 1.75,
  className = '',
  innerClassName = '',
  style,
}: {
  children: React.ReactNode
  direction?: 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
  innerClassName?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = React.useState<'below' | 'above' | 'in-view'>('below')

  React.useEffect(() => {
    const el = cardRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setScrollState('in-view')
      return
    }

    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.92) {
      setScrollState('in-view')
      return
    }

    setScrollState('below')

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setScrollState('in-view')
            observer.unobserve(el)
          }
        }
      },
      {
        threshold: [0, 0.08, 0.2],
        rootMargin: '0px 0px -150px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`slide-mask-card ${className}`.trim()}
      data-scroll-state={scrollState}
      data-direction={direction}
      style={{
        ...style,
        ...(delay ? { ['--slide-delay' as any]: `${delay}s` } : {}),
        ...(duration ? { ['--slide-duration' as any]: `${duration}s` } : {}),
      }}
    >
      <div className={`slide-mask-card-inner ${innerClassName}`.trim()}>
        {children}
      </div>
    </div>
  )
}

