import { useEffect, useRef, useState, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import './SiteIntro.css'

const TARGET_WORDS = ['GOURD', 'SHADES']
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*0123456789§✦✧✺✹◈'

interface LetterState {
  target: string
  current: string
  locked: boolean
  wordIndex: number
}

const STAGES = [
  { threshold: 0, text: 'Air-curing botanical calabash' },
  { threshold: 25, text: 'Carving mandala perforations' },
  { threshold: 60, text: 'Installing warm brass core' },
  { threshold: 85, text: 'Harmonizing shadow projection' },
  { threshold: 100, text: 'Sanctuary Illumination Complete' },
]

export function SiteIntro() {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [isFading, setIsFading] = useState<boolean>(false)
  const [showReplay, setShowReplay] = useState<boolean>(false)

  // Progress 0 - 100
  const [progress, setProgress] = useState<number>(0)
  const [stepText, setStepText] = useState<string>(STAGES[0].text)

  // Letters State
  const [letters, setLetters] = useState<LetterState[]>(() => {
    const list: LetterState[] = []
    TARGET_WORDS.forEach((word, wordIdx) => {
      for (let i = 0; i < word.length; i++) {
        list.push({
          target: word[i],
          current: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          locked: false,
          wordIndex: wordIdx,
        })
      }
    })
    return list
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafProgressRef = useRef<number | null>(null)
  const rafParticlesRef = useRef<number | null>(null)
  const isCompletedRef = useRef<boolean>(false)

  // Particle background simulation (embers rising)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Floating luminous embers
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.55 - 0.2,
      alpha: Math.random() * 0.6 + 0.25,
      flicker: Math.random() * 0.03 + 0.01,
    }))

    let animId = 0
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.alpha += Math.sin(Date.now() * p.flicker) * 0.015

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        const a = Math.max(0.1, Math.min(0.85, p.alpha))
        ctx.fillStyle = `rgba(245, 179, 96, ${a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(renderParticles)
    }
    renderParticles()
    rafParticlesRef.current = animId

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Enter the site smoothly
  const enterSite = useCallback(() => {
    setIsFading(true)
    document.body.style.overflow = ''
    window.scrollTo(0, 0)

    setTimeout(() => {
      setIsActive(false)
      setShowReplay(true)
    }, 850)
  }, [])

  // Main loader loop
  const startLoader = useCallback(() => {
    isCompletedRef.current = false
    setIsFading(false)
    setIsActive(true)
    document.body.style.overflow = 'hidden'

    let currentVal = 0
    let lastScrambleTick = 0

    // Reset letters
    setLetters(prev =>
      prev.map(l => ({
        ...l,
        locked: false,
        current: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      }))
    )

    const tick = (now: number) => {
      if (isCompletedRef.current) return

      // Smooth pacing
      let increment = 0.38
      if (currentVal > 28 && currentVal < 68) increment = 0.48
      if (currentVal >= 68 && currentVal < 90) increment = 0.32
      if (currentVal >= 90) increment = 0.42

      currentVal = Math.min(100, currentVal + increment)
      const intVal = Math.floor(currentVal)
      setProgress(intVal)

      // Step text updates
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (intVal >= STAGES[i].threshold) {
          setStepText(STAGES[i].text)
          break
        }
      }

      // Scramble letters lock sequence
      const totalLetters = TARGET_WORDS.join('').length
      const lockThreshold = Math.floor((currentVal / 100) * (totalLetters + 1))

      if (now - lastScrambleTick > 48) {
        lastScrambleTick = now
        setLetters(prev =>
          prev.map((item, idx) => {
            if (idx < lockThreshold) {
              return { ...item, locked: true, current: item.target }
            }
            return { ...item, current: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] }
          })
        )
      }

      if (currentVal < 100) {
        rafProgressRef.current = requestAnimationFrame(tick)
      } else {
        // Complete
        isCompletedRef.current = true
        setProgress(100)
        setStepText('Sanctuary Illumination Complete')
        setLetters(prev => prev.map(item => ({ ...item, locked: true, current: item.target })))

        // Auto enter site after a brief breath
        setTimeout(enterSite, 600)
      }
    }

    rafProgressRef.current = requestAnimationFrame(tick)
  }, [enterSite])

  // Mount effect
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      startLoader()
    }, 300)

    return () => {
      clearTimeout(timer)
      if (rafProgressRef.current) cancelAnimationFrame(rafProgressRef.current)
      document.body.style.overflow = ''
    }
  }, [startLoader])

  // Replay handler
  const handleReplay = () => {
    startLoader()
  }

  return (
    <>
      {/* INTRO CONTAINER */}
      <div
        id="intro-container"
        className={!isActive || isFading ? 'hidden' : ''}
        aria-label="Loading Gourd Shades Experience"
      >
        {/* Background Image & Ambient Atmosphere */}
        <div className="intro-bg-image" />
        <div className="intro-bg-scrim" />
        <div className="intro-ambient-glow" />
        <div className="intro-grain" />
        <canvas ref={canvasRef} className="intro-canvas" />

        {/* Central Stage: Only Image Card, Words Animation, and Loading Bar */}
        <div className="intro-stage">
          {/* 1. THE IMAGE CARD (Single Image, No Text Overlay) */}
          <div className="intro-image-card-wrap">
            <div className="intro-image-card-glow" />
            <div className="intro-image-card">
              <img
                src="/images/Cinematic%20nature-inspired%20community%20spotlight.jpeg"
                alt="Cinematic nature-inspired community spotlight"
                className="intro-card-image"
                loading="eager"
              />

              {/* Organic Mandala Silhouette Watermark */}
              <div className="intro-card-watermark">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="#E5A95A"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <circle cx="50" cy="50" r="32" stroke="#E5A95A" strokeWidth="0.5" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="18"
                    stroke="#E5A95A"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="2 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. THE LOADING WORDS ANIMATION */}
          <h1 className="intro-brand-title" aria-label="Gourd Shades">
            {TARGET_WORDS.map((word, wIdx) => {
              const wordLetters = letters.filter(l => l.wordIndex === wIdx)
              return (
                <span key={wIdx} className="intro-word-group">
                  {wordLetters.map((l, lIdx) => (
                    <span
                      key={lIdx}
                      className={`intro-scramble-letter ${l.locked ? 'locked' : 'scrambling'}`}
                    >
                      {l.current}
                    </span>
                  ))}
                </span>
              )
            })}
          </h1>

          <div className="intro-step-text">{stepText}</div>

          {/* 3. THE LOADING BAR */}
          <div className="intro-bar-section">
            <div className="intro-counter-display">
              <span>{progress.toString().padStart(2, '0')}</span>
              <small>%</small>
            </div>

            <div className="intro-bar-track">
              <div className="intro-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Replay Intro Pill (When browsing main site) */}
      {showReplay && !isActive && (
        <button
          className="intro-replay-pill"
          onClick={handleReplay}
          title="Replay intro animation"
          aria-label="Replay intro"
        >
          <RotateCcw size={13} /> Replay intro
        </button>
      )}
    </>
  )
}

export default SiteIntro
