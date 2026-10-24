import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function MaskedLineItem({
  line,
  idx,
  delay = 0,
  stagger = 0.12,
  isInView,
  className = '',
}: {
  line: React.ReactNode
  idx: number
  delay?: number
  stagger?: number
  isInView: boolean
  className?: string
}) {
  const [isRevealed, setIsRevealed] = React.useState(false)

  return (
    <span className={`reveal-line-mask ${isRevealed ? 'is-revealed' : ''} ${className}`.trim()}>
      <motion.span
        className="reveal-line-inner"
        initial={{ y: '120%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '120%', opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: delay + idx * stagger,
          ease: [0.16, 1, 0.3, 1],
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
  delay = 0,
  stagger = 0.12,
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
    margin: '80px 0px -30px 0px',
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
  delay = 0.15,
  stagger = 0.12,
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
    margin: '80px 0px -30px 0px',
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
  delay = 0,
  className = '',
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '80px 0px -30px 0px' })
  const [isRevealed, setIsRevealed] = React.useState(false)

  return (
    <span
      ref={ref}
      className={`reveal-line-mask ${isRevealed ? 'is-revealed' : ''} ${className}`.trim()}
      style={style}
    >
      <motion.span
        className="reveal-line-inner"
        initial={{ y: '120%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '120%', opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
  delay = 0,
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
  const isInView = useInView(ref, { once: true, margin: '80px 0px -30px 0px' })

  return (
    <div ref={ref} className={`reveal-eyebrow-container ${className}`.trim()} style={style}>
      <motion.div
        className="eyebrow reveal-eyebrow"
        initial={{ opacity: 0, y: 10, letterSpacing: '0.08em' }}
        animate={isInView ? { opacity: 1, y: 0, letterSpacing: '0.16em' } : { opacity: 0, y: 10, letterSpacing: '0.08em' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      {withLine && (
        <motion.span
          className="reveal-eyebrow-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.12, ease: [0.22, 1, 0.36, 1] }}
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
  const isInView = useInView(ref, { once: true, margin: '80px 0px -30px 0px' })

  return (
    <motion.span
      ref={ref}
      className={`scroll-spin-star ${className}`.trim()}
      initial={{ opacity: 0, scale: 0.5, rotate: -75 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -75 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'inline-block', ...style }}
    >
      ✳
    </motion.span>
  )
}

/**
 * ScrollFadeReveal: Smooth container fade/glide for cards, articles, and boxes.
 */
export function ScrollFadeReveal({
  children,
  className = '',
  delay = 0,
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
  const isInView = useInView(ref, { once: true, margin: '80px 0px -30px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
