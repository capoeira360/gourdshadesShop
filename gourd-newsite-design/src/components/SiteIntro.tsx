import { useEffect, useRef, useState, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import './SiteIntro.css'

const BRAND_NAME = 'GOURD SHADES'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=?/\\<>0123456789'
const INTRO_DURATION = 5200 // ms total duration

interface Firefly {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  ph: number
  sp: number
}

interface LetterItem {
  target: string
  space: boolean
  lockAt: number
}

const STATUS_MESSAGES: [number, string, string][] = [
  [0, 'Kindling the light', 'Carving the first pattern'],
  [0.25, 'Drying in the sun', 'Seasoning the natural gourd'],
  [0.5, 'Hand-piercing', 'One tiny hole at a time'],
  [0.75, 'Warming the glow', 'Finding the right ambient amber'],
  [0.97, 'Lit.', 'Welcome to Gourd Shades'],
]

export function SiteIntro() {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isFloodGo, setIsFloodGo] = useState<boolean>(false)
  const [isFloodFade, setIsFloodFade] = useState<boolean>(false)
  const [floodCoords, setFloodCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [showReplay, setShowReplay] = useState<boolean>(false)

  // Scramble letters state
  const [letterDisplay, setLetterDisplay] = useState<{ char: string; locked: boolean; active: boolean }[]>(() =>
    BRAND_NAME.split('').map(c => ({
      char: c === ' ' ? '\u00A0' : c,
      locked: false,
      active: false,
    }))
  )

  // Status and counter states
  const [counterText, setCounterText] = useState<string>('000')
  const [progressWidth, setProgressWidth] = useState<number>(0)
  const [statusLine, setStatusLine] = useState<string>('Kindling the light')
  const [statusSub, setStatusSub] = useState<string>('Carving the first pattern')
  const [showTagline, setShowTagline] = useState<boolean>(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsGroupRef = useRef<SVGGElement>(null)
  const gourdPathRef = useRef<SVGPathElement>(null)
  const lampWrapRef = useRef<HTMLDivElement>(null)

  const dotsRef = useRef<{ el: SVGCircleElement; thr: number; on: boolean }[]>([])
  const lettersRef = useRef<LetterItem[]>([])
  const rafLoopRef = useRef<number | null>(null)
  const rafFlyRef = useRef<number | null>(null)
  const autoEnterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const finishedRef = useRef<boolean>(false)
  const enteredRef = useRef<boolean>(false)

  // Setup letters structure
  useEffect(() => {
    const n = BRAND_NAME.length
    lettersRef.current = BRAND_NAME.split('').map((c, i) => ({
      target: c,
      space: c === ' ',
      lockAt: 0.14 + (i / (n - 1)) * 0.68 + Math.random() * 0.02,
    }))
  }, [])

  // Curve progress function
  const easeProgress = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const curve = (t: number) => {
    const e = easeProgress(t)
    return Math.min(1, e + Math.sin(t * 18) * 0.006 * (1 - t))
  }

  // Build dots inside the gourd shape
  const buildDots = useCallback(() => {
    const dotsGroup = dotsGroupRef.current
    const gourdPath = gourdPathRef.current
    if (!dotsGroup) return

    dotsGroup.innerHTML = ''
    dotsRef.current = []
    const step = 9

    for (let y = 74; y < 250; y += step) {
      const rowOffset = (Math.round((y - 74) / step) % 2) * (step / 2)
      for (let x = 62 + rowOffset; x < 140; x += step) {
        if (gourdPath && typeof DOMPoint !== 'undefined') {
          try {
            const pt = new DOMPoint(x, y)
            if (!gourdPath.isPointInFill(pt)) continue
          } catch {
            // fallback bounds check
            const dx = Math.abs(x - 100)
            if (y < 135 && dx > 24) continue
            if (y >= 135 && dx > 38) continue
          }
        }

        const r = y > 135 ? 2.1 + Math.random() * 0.9 : 1.4 + Math.random() * 0.5
        if (Math.random() < 0.18) continue

        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        c.setAttribute('cx', String(x))
        c.setAttribute('cy', String(y))
        c.setAttribute('r', r.toFixed(2))
        c.setAttribute('fill', '#fff6d6')
        c.setAttribute('class', 'intro-dot')
        c.style.filter = 'drop-shadow(0 0 3px #ffb84d)'
        dotsGroup.appendChild(c)

        const thr = 0.08 + (1 - (y - 74) / 176) * 0.55 + Math.random() * 0.3
        dotsRef.current.push({ el: c, thr, on: false })
      }
    }
  }, [])

  // Enter the site: expand flood light and reveal
  const enterSite = useCallback(() => {
    if (enteredRef.current) return
    enteredRef.current = true

    if (rafLoopRef.current) cancelAnimationFrame(rafLoopRef.current)
    if (autoEnterTimerRef.current) clearTimeout(autoEnterTimerRef.current)

    // Position light flood at lamp bulb
    if (lampWrapRef.current) {
      const rect = lampWrapRef.current.getBoundingClientRect()
      setFloodCoords({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.76,
      })
    }

    setIsFloodFade(false)
    setIsFloodGo(true)

    // Fade overlay and unlock scroll
    setTimeout(() => {
      setIsActive(false)
      document.body.style.overflow = ''
      setIsFloodFade(true)
      setShowReplay(true)
      window.scrollTo(0, 0)
    }, 1350)

    // Stop canvas animation
    setTimeout(() => {
      if (rafFlyRef.current) cancelAnimationFrame(rafFlyRef.current)
    }, 2400)
  }, [])

  // Finish intro sequence
  const finishIntro = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true

    // Light up all dots
    dotsRef.current.forEach(d => {
      d.on = true
      d.el.classList.add('on')
    })

    // Lock all letters to brand name
    setLetterDisplay(
      BRAND_NAME.split('').map(c => ({
        char: c === ' ' ? '\u00A0' : c,
        locked: true,
        active: false,
      }))
    )

    overlayRef.current?.style.setProperty('--intro-glow', '1')
    setCounterText('100')
    setProgressWidth(100)
    setShowTagline(true)

    autoEnterTimerRef.current = setTimeout(enterSite, 1400)
  }, [enterSite])

  // Main animation tick
  const startAnimation = useCallback(() => {
    let startTime: number | null = null
    let frame = 0
    let lastMsgIdx = -1
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    finishedRef.current = false
    enteredRef.current = false
    setShowTagline(false)
    setCounterText('000')
    setProgressWidth(0)
    overlayRef.current?.style.setProperty('--intro-glow', '0')

    // Reset letters
    setLetterDisplay(
      BRAND_NAME.split('').map(c => ({
        char: c === ' ' ? '\u00A0' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        locked: false,
        active: false,
      }))
    )

    buildDots()

    function tick(ts: number) {
      if (startTime === null) startTime = ts
      const elapsed = ts - startTime
      const t = Math.min(1, elapsed / INTRO_DURATION)
      const p = curve(t)
      frame++

      // Counter & bar
      const pct = Math.round(p * 100)
      setCounterText(String(pct).padStart(3, '0'))
      setProgressWidth(p * 100)

      // Glow & flicker
      const flick = p < 0.85 ? 0.9 + Math.random() * 0.1 : 1
      overlayRef.current?.style.setProperty('--intro-glow', (p * flick).toFixed(3))

      // Dots
      dotsRef.current.forEach(d => {
        if (!d.on && p >= d.thr) {
          d.on = true
          d.el.classList.add('on')
        }
      })

      // Letters scramble & lock
      setLetterDisplay(prev =>
        prev.map((item, idx) => {
          if (item.locked) return item
          const meta = lettersRef.current[idx]
          if (!meta) return item

          if (p >= meta.lockAt || reduceMotion) {
            return {
              char: meta.space ? '\u00A0' : meta.target,
              locked: true,
              active: false,
            }
          } else if (!meta.space && frame % 3 === 0) {
            return {
              char: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
              locked: false,
              active: true,
            }
          }
          return item
        })
      )

      // Tagline
      if (p > 0.78) {
        setShowTagline(true)
      }

      // Status messages
      for (let i = STATUS_MESSAGES.length - 1; i >= 0; i--) {
        if (p >= STATUS_MESSAGES[i][0]) {
          if (i !== lastMsgIdx) {
            lastMsgIdx = i
            setStatusLine(STATUS_MESSAGES[i][1])
            setStatusSub(STATUS_MESSAGES[i][2])
          }
          break
        }
      }

      if (t < 1) {
        rafLoopRef.current = requestAnimationFrame(tick)
      } else {
        finishIntro()
      }
    }

    rafLoopRef.current = requestAnimationFrame(tick)
  }, [buildDots, finishIntro])

  // Fireflies simulation
  useEffect(() => {
    if (!isActive) return
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      cv.width = W * dpr
      cv.height = H * dpr
      cv.style.width = W + 'px'
      cv.style.height = H + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const flies: Firefly[] = []
    for (let i = 0; i < 48; i++) {
      flies.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.05,
        ph: Math.random() * 6.28,
        sp: Math.random() * 0.02 + 0.01,
      })
    }

    function drawFlies() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      flies.forEach(f => {
        f.x += f.vx + Math.sin(f.ph) * 0.2
        f.y += f.vy
        f.ph += f.sp
        if (f.y < -10) {
          f.y = H + 10
          f.x = Math.random() * W
        }
        if (f.x < -10) f.x = W + 10
        if (f.x > W + 10) f.x = -10

        const a = (0.25 + Math.sin(f.ph * 3) * 0.25 + 0.25) * 0.75
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 7)
        g.addColorStop(0, `rgba(255, 208, 138, ${a})`)
        g.addColorStop(1, 'rgba(255, 208, 138, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r * 7, 0, 6.283)
        ctx.fill()
      })
      rafFlyRef.current = requestAnimationFrame(drawFlies)
    }

    drawFlies()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafFlyRef.current) cancelAnimationFrame(rafFlyRef.current)
    }
  }, [isActive])

  // Start intro on mount & lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      startAnimation()
    }, 400)

    return () => {
      clearTimeout(timer)
      if (rafLoopRef.current) cancelAnimationFrame(rafLoopRef.current)
      if (autoEnterTimerRef.current) clearTimeout(autoEnterTimerRef.current)
      document.body.style.overflow = ''
    }
  }, [startAnimation])

  // Skip handler
  const handleSkip = () => {
    if (rafLoopRef.current) cancelAnimationFrame(rafLoopRef.current)
    finishedRef.current = false
    finishIntro()
    if (autoEnterTimerRef.current) clearTimeout(autoEnterTimerRef.current)
    setTimeout(enterSite, 300)
  }

  // Replay handler
  const handleReplay = () => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    setIsFloodGo(false)
    setIsFloodFade(false)
    setIsActive(true)
    setTimeout(() => {
      startAnimation()
    }, 150)
  }

  return (
    <>
      {/* Light Flood Transition Sphere */}
      <div
        className={`intro-flood ${isFloodGo ? 'go' : ''} ${isFloodFade ? 'fade' : ''}`}
        style={
          floodCoords.x > 0
            ? { left: `${floodCoords.x}px`, top: `${floodCoords.y}px` }
            : undefined
        }
      />

      {/* Main Intro Overlay */}
      <section
        id="intro-overlay"
        ref={overlayRef}
        className={isActive ? '' : 'hidden'}
        aria-label="Loading Gourd Shades"
      >
        <div className="intro-halo" />
        <canvas id="intro-fireflies" ref={canvasRef} />
        <div className="intro-grain" />
        <div className="intro-vignette" />

        {/* Top Bar */}
        <div className="intro-top-bar">
          <span>Arusha, Tanzania • Artisanal Calabash Lighting</span>
          <button className="intro-skip-btn" onClick={handleSkip}>
            Skip Intro
          </button>
        </div>

        {/* Central Stage */}
        <div className="intro-stage">
          <div className="intro-lamp-wrap" ref={lampWrapRef}>
            <svg viewBox="0 0 200 270" aria-hidden="true">
              <defs>
                <linearGradient id="barkGrad" x1="0" x2="1">
                  <stop offset="0" stop-color="#2a1709" />
                  <stop offset=".5" stop-color="#4a2c15" />
                  <stop offset="1" stop-color="#25140a" />
                </linearGradient>
                <radialGradient id="innerLight" cx="50%" cy="68%" r="60%">
                  <stop offset="0" stop-color="#fffef6" />
                  <stop offset=".35" stop-color="#f5a84b" />
                  <stop offset="1" stop-color="#dc3331" />
                </radialGradient>
                <clipPath id="gourdClip">
                  <path
                    ref={gourdPathRef}
                    id="gourdShape"
                    d="M88 70 C80 70 74 85 76 100 C78 115 90 120 92 135 C94 145 70 160 66 190 C62 225 85 250 100 250 C115 250 138 225 134 190 C130 160 106 145 108 135 C110 120 122 115 124 100 C126 85 120 70 112 70 Z"
                  />
                </clipPath>
              </defs>

              {/* Cord & stem */}
              <line x1="100" y1="-400" x2="100" y2="50" stroke="#8c5836" strokeWidth="1.5" />
              <path
                d="M96 70 C96 58 98 52 100 50 C102 52 104 58 104 70 Z"
                fill="#2a1709"
                stroke="#8c5836"
                strokeWidth="1"
              />
              <circle cx="100" cy="49" r="3" fill="#8c5836" />

              {/* Body (unlit natural gourd shell) */}
              <path
                d="M88 70 C80 70 74 85 76 100 C78 115 90 120 92 135 C94 145 70 160 66 190 C62 225 85 250 100 250 C115 250 138 225 134 190 C130 160 106 145 108 135 C110 120 122 115 124 100 C126 85 120 70 112 70 Z"
                fill="url(#barkGrad)"
                stroke="#8c5836"
                strokeWidth="1"
              />

              {/* Inner ambient light */}
              <g className="intro-lamp-glow">
                <path
                  d="M88 70 C80 70 74 85 76 100 C78 115 90 120 92 135 C94 145 70 160 66 190 C62 225 85 250 100 250 C115 250 138 225 134 190 C130 160 106 145 108 135 C110 120 122 115 124 100 C126 85 120 70 112 70 Z"
                  fill="url(#innerLight)"
                  opacity=".55"
                />
              </g>

              {/* Perforations lighting up */}
              <g clipPath="url(#gourdClip)" ref={dotsGroupRef} />

              {/* Surface highlight */}
              <path
                d="M82 92 C80 105 90 118 92 135"
                stroke="rgba(255,255,255,.18)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M78 190 C76 215 88 236 98 242"
                stroke="rgba(255,255,255,.12)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Brand Scramble Title */}
          <h1 className="intro-brand" aria-label="Gourd Shades">
            {letterDisplay.map((item, i) => (
              <span
                key={i}
                className={`ch ${item.char === '\u00A0' ? 'sp' : ''} ${item.active ? 'active' : ''} ${
                  item.locked ? 'locked' : ''
                }`}
              >
                {item.char}
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <div className={`intro-tagline ${showTagline ? 'show' : ''}`}>
            Handcrafted lamps · Grown by nature · Finished by hand
          </div>
        </div>

        {/* HUD bottom status */}
        <div className="intro-hud">
          <div className="intro-counter">
            <span>{counterText}</span>
            <small>%</small>
          </div>
          <div className="intro-status">
            <div>{statusLine}</div>
            <div>
              <b>{statusSub}</b>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="intro-bar">
          <i className="intro-bar-fill" style={{ width: `${progressWidth}%` }} />
        </div>
      </section>

      {/* Floating Replay button once site is revealed */}
      {showReplay && !isActive && (
        <button
          className="intro-replay-btn"
          onClick={handleReplay}
          aria-label="Replay intro animation"
          title="Replay intro animation"
        >
          <RotateCcw size={14} /> Replay intro
        </button>
      )}
    </>
  )
}
export default SiteIntro
