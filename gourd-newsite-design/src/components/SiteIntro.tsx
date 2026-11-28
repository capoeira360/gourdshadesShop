import React, { useEffect, useRef, useState, useCallback } from 'react'
import './SiteIntro.css'

// Calabash lamp SVG paths from authentic Gourd Shades icon
const GOURD_BODY_PATH =
  'M2519 5721 c-123 -40 -233 -115 -290 -197 -50 -73 -61 -117 -70 -284 -10 -189 -31 -279 -98 -415 -115 -232 -393 -538 -770 -847 -290 -238 -371 -325 -545 -588 -267 -403 -366 -700 -366 -1096 1 -796 436 -1483 1168 -1848 888 -443 2229 -380 3012 141 543 361 899 935 926 1497 12 225 -96 782 -212 1093 -187 506 -453 793 -999 1080 -654 345 -868 531 -1100 959 -157 288 -276 440 -390 495 -66 32 -185 36 -266 10z m229 -87 c66 -33 148 -122 233 -253 l67 -103 -25 -37 c-74 -108 47 -315 174 -297 24 3 43 2 43 -2 0 -5 25 -39 57 -77 33 -40 48 -65 37 -61 -84 34 -114 29 -114 -18 0 -47 64 -116 142 -155 84 -42 118 -40 129 10 3 12 23 1 79 -44 48 -39 66 -58 50 -54 -623 167 -1312 17 -1780 -386 l-76 -65 4 34 c6 45 -29 63 -91 47 -55 -15 -55 -15 6 45 l53 52 34 -16 c64 -32 187 13 294 107 133 117 135 251 5 236 -37 -5 -48 -3 -42 6 4 7 27 44 52 82 108 167 150 308 161 530 10 225 52 305 202 381 138 70 221 80 306 38z m511 -1084 c271 -21 466 -77 645 -185 67 -40 163 -93 214 -119 50 -26 92 -51 92 -55 0 -4 -21 -27 -46 -51 -25 -25 -75 -82 -111 -127 -37 -46 -68 -83 -70 -83 -2 0 -31 19 -65 41 -405 275 -1025 277 -1443 5 -457 -298 -575 -827 -282 -1261 202 -299 610 -505 999 -505 l111 0 -7 -42 c-39 -273 -66 -550 -66 -690 l0 -78 -37 0 c-241 0 -569 74 -799 180 l-91 42 -48 146 c-164 510 -443 1079 -724 1477 -82 116 -80 102 -41 218 202 600 778 1030 1460 1086 140 12 162 12 309 1z m193 -431 c157 -31 324 -99 454 -186 64 -43 63 -29 10 -105 -234 -336 -467 -911 -566 -1395 l-23 -113 -91 0 c-507 0 -968 316 -1083 740 -24 90 -24 300 0 390 135 489 711 786 1299 669z m1008 -126 c212 -232 338 -473 401 -768 27 -129 25 -155 -12 -191 -254 -240 -653 -865 -860 -1344 l-58 -135 -68 -28 c-77 -32 -256 -81 -353 -97 -36 -6 -76 -13 -89 -16 l-24 -5 7 138 c8 172 29 369 57 544 l21 134 109 27 c315 77 599 296 724 559 139 294 92 653 -120 912 -53 65 -55 70 -41 91 20 32 226 246 236 246 5 0 36 -30 70 -67z m-2988 -3 c-9 -61 55 -78 138 -36 18 9 35 16 37 16 1 0 -28 -40 -65 -89 -75 -99 -157 -243 -193 -338 -13 -35 -27 -63 -30 -63 -3 0 -33 33 -67 73 -33 39 -83 97 -111 128 l-51 57 57 48 c37 31 54 42 49 29 -58 -144 15 -184 125 -68 70 73 94 149 57 185 l-23 23 35 32 c43 40 48 40 42 3z m3132 -22 c133 -103 163 -135 169 -184 15 -134 208 -394 293 -394 17 0 29 -10 43 -39 l20 -39 -70 -68 c-71 -68 -88 -72 -89 -22 -1 130 -217 550 -370 721 -58 64 -57 72 4 25z m-436 -297 c338 -512 63 -1127 -586 -1307 -74 -21 -76 -20 -61 42 118 492 286 901 506 1232 41 61 78 112 82 112 4 0 30 -36 59 -79z m-3046 -158 c53 -60 116 -133 141 -163 l45 -55 -16 -75 c-29 -137 -23 -458 12 -605 108 -463 424 -891 824 -1116 31 -18 58 -33 60 -35 6 -4 62 -253 86 -384 37 -203 56 -383 63 -603 l6 -198 -24 5 c-37 9 -213 46 -216 46 -1 0 -47 89 -102 198 -362 713 -867 1353 -1417 1794 l-121 97 9 68 c39 329 188 657 467 1030 42 57 78 103 82 103 3 0 48 -48 101 -107z m438 -586 c109 -176 283 -513 365 -704 69 -162 185 -466 179 -472 -8 -8 -124 88 -214 178 -308 309 -471 689 -470 1094 l1 112 22 -28 c13 -15 65 -96 117 -180z m3676 107 c60 -197 148 -645 167 -846 l4 -47 -61 -48 c-527 -413 -1057 -1058 -1327 -1616 l-39 -80 -87 -28 c-48 -16 -89 -27 -90 -25 -7 7 29 249 58 391 33 163 96 387 156 560 l38 110 90 48 c521 281 865 832 865 1385 l0 97 92 92 c51 51 96 93 100 93 4 0 19 -39 34 -86z m-371 -357 c-58 -289 -199 -549 -415 -767 -95 -96 -267 -236 -277 -226 -11 11 193 388 310 576 139 221 389 548 395 517 2 -10 -4 -55 -13 -100z m-4260 -573 c406 -338 818 -848 1128 -1395 73 -129 170 -319 162 -319 -15 0 -220 87 -306 131 -632 316 -1025 862 -1114 1542 -8 65 -15 127 -15 139 0 24 -10 31 145 -98z m4750 -320 c-152 -526 -513 -960 -1029 -1240 -48 -25 -90 -44 -93 -41 -6 7 87 171 175 307 154 240 353 488 572 713 169 174 392 376 397 361 2 -6 -8 -50 -22 -100z m-2886 -448 c181 -73 457 -126 652 -126 l106 0 7 -127 c13 -251 56 -554 105 -743 10 -41 17 -77 16 -79 -20 -20 -756 -26 -821 -6 -20 6 -21 15 -27 188 -9 280 -70 694 -133 910 -7 23 -5 22 95 -17z m1336 -131 c-77 -231 -141 -519 -169 -764 -17 -143 -20 -151 -73 -151 l-31 0 -26 107 c-51 217 -87 466 -102 708 l-6 111 128 21 c71 12 170 35 219 51 50 16 91 28 93 27 2 -2 -13 -51 -33 -110z'

const GOURD_PERFORATION_PATHS = [
  'M2428 5380 c-111 -59 -123 -236 -21 -332 115 -109 289 -26 288 136 -2 156 -144 260 -267 196z',
  'M2792 5090 c-147 -90 3 -345 156 -266 93 48 67 217 -41 267 -54 24 -74 24 -115 -1z',
  'M2340 4908 c-74 -28 -166 -119 -176 -173 -30 -163 256 -150 377 17 91 126 -31 221 -201 156z',
  'M3253 4041 c-82 -51 3 -139 107 -111 66 18 79 71 26 105 -41 27 -96 29 -133 6z',
  'M2979 4035 c-75 -42 -26 -115 76 -115 45 0 95 31 95 59 0 52 -114 89 -171 56z',
  'M2725 3996 c-46 -20 -60 -42 -47 -71 36 -79 192 -66 192 16 0 47 -89 80 -145 55z',
  'M3553 3929 c-113 -23 -68 -136 50 -126 50 4 87 29 87 57 0 48 -71 84 -137 69z',
  'M3160 3897 c-49 -17 -62 -57 -31 -91 52 -55 176 -35 176 28 0 53 -78 86 -145 63z',
  'M2885 3870 c-82 -33 -38 -120 60 -120 90 0 129 69 63 110 -34 20 -87 25 -123 10z',
  'M2509 3856 c-68 -39 -21 -116 71 -116 50 0 100 29 100 59 0 52 -114 89 -171 57z',
  'M3423 3776 c-92 -42 -6 -146 96 -116 46 13 61 28 61 61 0 52 -91 85 -157 55z',
  'M2703 3751 c-41 -26 -44 -61 -7 -90 56 -44 180 -14 172 42 -8 53 -110 83 -165 48z',
  'M3173 3716 c-96 -44 -2 -149 102 -114 46 16 60 36 51 71 -11 46 -94 69 -153 43z',
  'M2386 3659 c-33 -26 -33 -49 -1 -79 36 -34 111 -39 148 -10 58 46 15 110 -73 110 -33 0 -55 -6 -74 -21z',
  'M2913 3660 c-31 -13 -46 -45 -33 -69 26 -49 101 -66 159 -36 97 50 -20 148 -126 105z',
  'M2602 3598 c-45 -22 -40 -80 9 -105 79 -41 192 19 146 78 -29 38 -105 51 -155 27z',
  'M3376 3559 c-52 -41 -13 -98 71 -106 95 -9 143 75 66 116 -36 18 -107 14 -137 -10z',
  'M3154 3540 c-30 -12 -53 -47 -47 -71 16 -60 162 -67 193 -9 29 54 -73 110 -146 80z',
  'M2308 3474 c-54 -29 -64 -90 -22 -123 87 -68 225 38 149 114 -28 29 -84 33 -127 9z',
  'M2848 3474 c-111 -60 0 -187 112 -129 32 17 46 51 36 90 -12 48 -93 69 -148 39z',
  'M2543 3429 c-96 -28 -73 -149 29 -149 97 0 145 82 78 131 -33 24 -68 30 -107 18z',
  'M3325 3368 c-50 -27 -60 -80 -21 -117 68 -64 193 -11 172 73 -11 46 -100 72 -151 44z',
  'M3071 3344 c-51 -42 -34 -101 34 -124 62 -21 135 18 135 72 0 73 -105 106 -169 52z',
  'M2813 3264 c-99 -50 -23 -184 80 -140 59 24 76 85 34 124 -31 30 -75 36 -114 16z',
  'M2344 3228 c-69 -18 -91 -91 -40 -135 39 -33 89 -31 127 6 65 66 6 154 -87 129z',
  'M2569 3201 c-66 -67 12 -157 105 -121 34 13 60 54 52 85 -17 68 -104 88 -157 36z',
  'M3234 3146 c-70 -32 -57 -133 21 -155 68 -19 125 17 125 79 0 67 -77 107 -146 76z',
  'M2985 3128 c-79 -43 -49 -158 40 -158 79 0 125 57 99 125 -15 37 -96 57 -139 33z',
  'M2720 3063 c-78 -31 -90 -142 -19 -178 105 -55 208 60 132 145 -28 31 -81 46 -113 33z',
  'M2408 3001 c-28 -24 -33 -36 -32 -71 4 -133 204 -131 204 3 0 88 -104 129 -172 68z',
  'M2914 2915 c-121 -51 -54 -217 74 -183 34 9 72 57 72 91 0 70 -80 121 -146 92z',
  'M3173 2906 c-86 -39 -66 -167 29 -190 35 -8 93 15 108 44 47 88 -46 187 -137 146z',
  'M2573 2795 c-44 -44 -42 -94 7 -137 80 -73 199 14 160 116 -23 62 -114 74 -167 21z',
  'M2804 2691 c-88 -54 -50 -181 54 -181 114 0 143 150 35 191 -36 13 -54 11 -89 -10z',
  'M3049 2601 c-80 -81 19 -209 120 -156 39 20 66 73 57 110 -19 76 -121 102 -177 46z',
  'M4111 2444 c-60 -76 41 -171 107 -101 29 31 29 77 -1 105 -33 31 -80 29 -106 -4z',
  'M3980 2307 c-87 -44 -39 -166 56 -143 32 8 58 64 45 98 -17 45 -62 65 -101 45z',
  'M3785 2198 c-51 -27 -60 -84 -20 -123 59 -60 150 9 119 90 -13 33 -67 51 -99 33z',
  'M3561 2084 c-59 -75 38 -168 107 -104 28 27 29 79 2 108 -30 32 -82 30 -109 -4z',
  'M3950 2073 c-56 -21 -70 -96 -24 -132 45 -36 93 -22 113 32 22 58 -34 120 -89 100z',
  'M3765 1958 c-51 -30 -60 -84 -20 -123 66 -67 168 32 108 103 -23 27 -62 35 -88 20z',
  'M3540 1870 c-47 -47 -13 -130 53 -130 43 0 71 30 71 75 0 67 -77 102 -124 55z',
  'M3711 1744 c-41 -52 -10 -124 54 -124 65 0 99 84 52 128 -33 31 -80 29 -106 -4z',
  'M3510 1668 c-41 -45 -9 -128 51 -128 37 0 79 39 79 73 0 67 -85 103 -130 55z',
  'M3965 3463 c-76 -76 -9 -260 86 -236 71 19 79 161 12 227 -30 30 -73 34 -98 9z',
  'M3960 3187 c-56 -28 -89 -116 -70 -187 28 -105 125 -108 171 -6 49 109 -17 235 -101 193z',
  'M3820 2891 c-72 -38 -127 -158 -99 -216 22 -46 84 -48 134 -4 124 109 95 290 -35 220z',
  'M918 1419 c-110 -110 104 -468 280 -469 136 -1 119 227 -27 392 -93 103 -196 135 -253 77z',
  'M2562 1100 c-57 -35 -64 -96 -15 -142 33 -31 109 -32 150 -2 107 80 -19 214 -135 144z',
  'M2858 1020 c-82 -45 -78 -138 8 -170 136 -52 285 67 194 155 -41 39 -144 47 -202 15z',
  'M2581 814 c-41 -34 -41 -71 -1 -109 65 -62 220 -35 220 39 0 83 -148 130 -219 70z',
  'M2903 761 c-140 -64 -35 -217 124 -181 93 20 132 98 77 154 -48 47 -131 58 -201 27z',
  'M2660 612 c-68 -11 -91 -83 -42 -132 76 -76 212 -55 212 32 0 62 -88 114 -170 100z',
  'M2945 497 c-98 -45 -55 -132 65 -132 147 0 159 130 13 142 -27 2 -61 -3 -78 -10z',
]

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export function SiteIntro() {
  const [showOverlay, setShowOverlay] = useState<boolean>(true)
  const [count, setCount] = useState<string>('000')

  const logoRef = useRef<HTMLAnchorElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLElement>(null)
  const isRunningRef = useRef<boolean>(false)
  const isDockedRef = useRef<boolean>(false)
  const rafCountRef = useRef<number | null>(null)

  // Metrics cache for transform calculation
  const metricsRef = useRef<{ w: number; h: number; lc: { x: number; y: number } }>({
    w: 0,
    h: 0,
    lc: { x: 0, y: 0 },
  })

  // Measures the logo element
  const measure = useCallback(() => {
    const logo = logoRef.current
    if (!logo) return
    const lens = logo.querySelector('.intro-lens') as HTMLElement
    if (!lens) return

    metricsRef.current = {
      w: logo.offsetWidth || 900,
      h: logo.offsetHeight || 140,
      lc: {
        x: lens.offsetLeft + lens.offsetWidth / 2,
        y: lens.offsetTop + lens.offsetHeight / 2,
      },
    }
  }, [])

  const place = useCallback((tx: number, ty: number, s: number, dur: number) => {
    const logo = logoRef.current
    if (!logo) return
    logo.style.transition = dur ? `transform ${dur}ms var(--intro-ease)` : 'none'
    if (!dur) void logo.offsetWidth
    logo.style.transform = `translate(${tx}px,${ty}px) scale(${s})`
  }, [])

  // Calculates destination coordinates of the navbar brand slot
  const dockTarget = useCallback(() => {
    const slot = document.getElementById('brand-slot') as HTMLElement
    const logo = logoRef.current
    const M = metricsRef.current

    if (!slot || !logo) {
      return { tx: 20, ty: 14, s: 0.28 }
    }

    const r = slot.getBoundingClientRect()
    const s = r.width / (M.w || 900)
    const ty = Math.round(r.top + (r.height - M.h * s) / 2)
    const tx = Math.round(r.left)

    return { tx, ty, s }
  }, [])

  const fitScale = useCallback(() => {
    const M = metricsRef.current
    const targetW = Math.min(window.innerWidth * 0.85, 960)
    return targetW / (M.w || 900)
  }, [])

  // Sync theme classes between the fixed header and the intro logo during docking
  const syncHeaderTheme = useCallback(() => {
    const logo = logoRef.current
    const header = document.querySelector('.the-frankie-header') as HTMLElement
    if (!logo || !header) return

    const classes = Array.from(header.classList)
    const isMenuOpen = classes.includes('menu-active')
    const isRed = classes.includes('theme-red')
    const isDark = classes.includes('theme-dark')
    const isWhite = classes.includes('theme-white')
    const isScrolled = classes.includes('is-scrolled')
    const effectiveWhite = isWhite || isMenuOpen || (isScrolled && !isRed && !isDark) || (!isRed && !isDark)

    logo.classList.toggle('theme-red', isRed && !isMenuOpen)
    logo.classList.toggle('theme-dark', isDark && !isMenuOpen)
    logo.classList.toggle('theme-white', effectiveWhite)
    logo.classList.toggle('menu-active', isMenuOpen)
  }, [])

  // Linear progress counter ticker
  const runCounter = useCallback((durationMs: number) => {
    const bar = barRef.current
    if (bar) {
      bar.style.transition = `transform ${durationMs}ms linear`
      requestAnimationFrame(() => {
        if (bar) bar.style.transform = 'scaleX(1)'
      })
    }

    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs)
      setCount(String(Math.round(p * 100)).padStart(3, '0'))
      if (p < 1 && !isDockedRef.current) {
        rafCountRef.current = requestAnimationFrame(tick)
      }
    }
    rafCountRef.current = requestAnimationFrame(tick)
  }, [])

  // Fast forward / skip intro instantly into docked position
  const skipIntro = useCallback(() => {
    if (isDockedRef.current) return
    isDockedRef.current = true
    isRunningRef.current = false

    if (rafCountRef.current) cancelAnimationFrame(rafCountRef.current)

    const logo = logoRef.current
    if (logo) {
      measure()
      const d = dockTarget()
      logo.className = 'intro-logo visible draw fill show docked'
      place(d.tx, d.ty, d.s, 0)
      syncHeaderTheme()
    }

    document.body.classList.remove('intro-lock')
    document.body.classList.add('ready')
    setShowOverlay(false)
  }, [measure, dockTarget, place, syncHeaderTheme])

  // Main intro sequence (Phase 1, 2, and 3)
  const playIntro = useCallback(async () => {
    if (isRunningRef.current) return
    isRunningRef.current = true
    isDockedRef.current = false

    document.body.classList.add('intro-lock')
    document.body.classList.remove('ready')
    window.scrollTo(0, 0)

    const logo = logoRef.current
    const intro = introRef.current
    const bar = barRef.current

    if (!logo || !intro) {
      document.body.classList.remove('intro-lock')
      document.body.classList.add('ready')
      isRunningRef.current = false
      return
    }

    try {
      // Reset styles
      logo.className = 'intro-logo'
      intro.classList.remove('out', 'go')
      if (bar) {
        bar.style.transition = 'none'
        bar.style.transform = 'scaleX(0)'
      }
      setCount('000')
      void intro.offsetWidth

      // Wait for fonts to measure accurately
      if (document.fonts) {
        try {
          await document.fonts.ready
        } catch { }
      }
      await sleep(40)
      measure()

      const s1 = fitScale()
      const M = metricsRef.current

      // Phase 1 — Calabash emblem alone, large, at true center
      const big = s1 * 1.6
      place(window.innerWidth / 2 - big * M.lc.x, window.innerHeight / 2 - big * M.lc.y, big, 0)
      logo.classList.add('visible')

      await sleep(80)
      if (isDockedRef.current) return
      intro.classList.add('go')
      runCounter(4200)

      // The Gourd SVG outline contour draws itself directly (no circle!)
      logo.classList.add('draw')
      await sleep(1100)
      if (isDockedRef.current) return

      // Gourd body floods with glowing sunset gradient & illuminated perforations
      logo.classList.add('fill')
      await sleep(600)
      if (isDockedRef.current) return

      // Light glint sweeps across the calabash perforations
      logo.classList.add('shine')
      await sleep(500)
      if (isDockedRef.current) return

      // Phase 2 — Letters rise out smoothly showing the full name "Gourd Shades"
      place(
        (window.innerWidth - s1 * M.w) / 2,
        (window.innerHeight - s1 * M.h) / 2,
        s1,
        1200
      )
      logo.classList.add('show')

      // Hold the full name for visitor to appreciate
      await sleep(1800)
      if (isDockedRef.current) return

      // Phase 3 — Slide to navbar brand slot (Matches footer logo format G[svg]urd Shades.)
      const d = dockTarget()
      intro.classList.add('out')
      logo.classList.add('docking')
      syncHeaderTheme()
      place(d.tx, d.ty, d.s, 1200)

      await sleep(1000)
      if (isDockedRef.current) return
      document.body.classList.add('ready')
      document.body.classList.remove('intro-lock')

      await sleep(250)
      isDockedRef.current = true
      isRunningRef.current = false
      logo.classList.remove('docking')
      logo.classList.add('docked')
      setShowOverlay(false)
    } finally {
      // Always guarantee scroll lock is lifted
      document.body.classList.remove('intro-lock')
      document.body.classList.add('ready')
    }
  }, [measure, place, fitScale, dockTarget, runCounter, syncHeaderTheme])

  // Sync docked logo coordinates on resize and scroll
  useEffect(() => {
    let rafId: number | null = null

    const handleResizeOrScroll = () => {
      if (isRunningRef.current) {
        measure()
      } else if (isDockedRef.current) {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          const d = dockTarget()
          const logo = logoRef.current
          if (logo) {
            logo.style.transition = 'none'
            logo.style.transform = `translate(${d.tx}px,${d.ty}px) scale(${d.s})`
          }
        })
      }
    }

    window.addEventListener('resize', handleResizeOrScroll)
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true })

    const header = document.querySelector('.the-frankie-header') as HTMLElement | null
    const logo = logoRef.current

    const handleEnter = () => {
      if (!isDockedRef.current) return
      if (header) header.classList.add('is-hovered')
      if (logo) logo.classList.add('header-hovered')
    }
    const handleLeave = () => {
      if (!isDockedRef.current) return
      if (header) header.classList.remove('is-hovered')
      if (logo) logo.classList.remove('header-hovered')
    }

    if (header) {
      header.addEventListener('mouseenter', handleEnter)
      header.addEventListener('mouseleave', handleLeave)
    }
    if (logo) {
      logo.addEventListener('mouseenter', handleEnter)
      logo.addEventListener('mouseleave', handleLeave)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResizeOrScroll)
      window.removeEventListener('scroll', handleResizeOrScroll)
      if (header) {
        header.removeEventListener('mouseenter', handleEnter)
        header.removeEventListener('mouseleave', handleLeave)
      }
      if (logo) {
        logo.removeEventListener('mouseenter', handleEnter)
        logo.removeEventListener('mouseleave', handleLeave)
      }
    }
  }, [measure, dockTarget])

  // Keyboard & mouse wheel / touch to unlock scroll if user wants to scroll right away
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (!isDockedRef.current) skipIntro()
      }
    }
    const handleScrollAttempt = () => {
      if (!isDockedRef.current) skipIntro()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleScrollAttempt, { passive: true })
    window.addEventListener('touchmove', handleScrollAttempt, { passive: true })

    // Safety fallback: guaranteed scroll unlock after 6 seconds max
    const safetyTimer = setTimeout(() => {
      if (!isDockedRef.current) skipIntro()
    }, 6000)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleScrollAttempt)
      window.removeEventListener('touchmove', handleScrollAttempt)
      clearTimeout(safetyTimer)
    }
  }, [skipIntro])

  // Header theme mutation observer (syncs colors dynamically with navbar)
  useEffect(() => {
    const header = document.querySelector('.the-frankie-header')
    if (!header) return

    const observer = new MutationObserver(() => {
      if (isDockedRef.current) syncHeaderTheme()
    })

    observer.observe(header, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [syncHeaderTheme])

  // Mount effect
  useEffect(() => {
    const checkRoute = () => {
      const isAdminRoute = window.location.pathname.startsWith('/admin')
      document.body.classList.toggle('admin-route', isAdminRoute)
      if (isAdminRoute) {
        skipIntro()
      }
    }
    checkRoute()

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!window.location.pathname.startsWith('/admin')) {
      if (isReduced) {
        skipIntro()
      } else {
        playIntro()
      }
    }

    window.addEventListener('popstate', checkRoute)
    const interval = setInterval(checkRoute, 400)

    return () => {
      window.removeEventListener('popstate', checkRoute)
      clearInterval(interval)
      document.body.classList.remove('intro-lock')
      document.body.classList.remove('admin-route')
      if (rafCountRef.current) cancelAnimationFrame(rafCountRef.current)
    }
  }, [playIntro, skipIntro])

  // Expose replay intro globally for testing or buttons
  useEffect(() => {
    ; (window as unknown as { replayGourdIntro: () => void }).replayGourdIntro = () => {
      setShowOverlay(true)
      playIntro()
    }
  }, [playIntro])

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isDockedRef.current) {
      skipIntro()
      return
    }
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.location.href = '/'
    }
  }

  return (
    <>
      {/* 1. Shared SVG Gradients and Clip Paths */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="gourd-intro-tint" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#dc3331" />
          </linearGradient>

          <clipPath id="gourd-silhouette-clip">
            <g transform="translate(0.000000,575.000000) scale(0.100000,-0.100000)">
              <path d={GOURD_BODY_PATH} />
            </g>
          </clipPath>
        </defs>
      </svg>

      {/* 2. Intro Dark Scrim Overlay (Removed once intro completes) */}
      {showOverlay && (
        <div
          ref={introRef}
          className="intro-overlay"
          aria-label="Gourd Shades Intro"
        >
          <div className="intro-glow" />

          {/* Bottom Meta Progress Bar */}
          <div className="intro-meta">
            <span>Gourd Shades</span>
            <div className="intro-bar">
              <b ref={barRef} />
            </div>
            <span className="hide-sm">Artisanal Calabash Lighting · Arusha</span>
            <span className="intro-count">{count}</span>
          </div>
        </div>
      )}

      {/* 3. The Intro Logo Element (Animates during intro, glides and docks permanently in nav) */}
      <a
        ref={logoRef}
        id="gourd-main-logo"
        className="intro-logo"
        href="/"
        aria-label="Gourd Shades Home"
        onClick={handleLogoClick}
      >
        {/* Letter 'G' */}
        <span className="intro-ch intro-g-letter">
          <i style={{ '--d': '0.00s' } as React.CSSProperties}>G</i>
        </span>

        {/* Bespoke Calabash SVG Emblem (Draws itself directly - NO CIRCLE) */}
        <svg
          className="intro-lens gourdbob"
          viewBox="0 0 600 575"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Calabash SVG outline contour drawing itself */}
          <g transform="translate(0.000000,575.000000) scale(0.100000,-0.100000)">
            <path
              className="gourd-contour-draw"
              d={GOURD_BODY_PATH}
              fill="none"
              stroke="url(#gourd-intro-tint)"
              strokeWidth="110"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          </g>

          {/* Gourd Body & Perforations group */}
          <g className="fillg">
            {/* Silhouette */}
            <g
              transform="translate(0.000000,575.000000) scale(0.100000,-0.100000)"
              className="gourd-silhouette-group"
              stroke="none"
            >
              <path className="gourd-silhouette" d={GOURD_BODY_PATH} fill="url(#gourd-intro-tint)" />
            </g>

            {/* Glowing Light Perforations */}
            <g
              transform="translate(0.000000,575.000000) scale(0.100000,-0.100000)"
              className="gourd-perforations"
              fill="#ffffff"
              fillOpacity={0.96}
              stroke="none"
            >
              {GOURD_PERFORATION_PATHS.map((d, idx) => (
                <path key={idx} d={d} />
              ))}
            </g>

            {/* Sweeping Light Glint Beam across the gourd perforations */}
            <g clipPath="url(#gourd-silhouette-clip)">
              <rect
                className="glint"
                x="80"
                y="-150"
                width="95"
                height="900"
                fill="#ffffff"
                fillOpacity={0.88}
                transform="rotate(26 300 287)"
              />
            </g>
          </g>
        </svg>

        {/* Letters 'u', 'r', 'd' */}
        <span className="intro-ch intro-urd-letters">
          <i style={{ '--d': '0.14s' } as React.CSSProperties}>u</i>
        </span>
        <span className="intro-ch intro-urd-letters">
          <i style={{ '--d': '0.21s' } as React.CSSProperties}>r</i>
        </span>
        <span className="intro-ch intro-urd-letters">
          <i style={{ '--d': '0.28s' } as React.CSSProperties}>d</i>
        </span>

        {/* Space */}
        <span className="intro-sp">&nbsp;</span>

        {/* Word 'Shades.' */}
        <span className="intro-shades-word">
          <span className="intro-ch">
            <i style={{ '--d': '0.42s' } as React.CSSProperties}>S</i>
          </span>
          <span className="intro-ch">
            <i style={{ '--d': '0.49s' } as React.CSSProperties}>h</i>
          </span>
          <span className="intro-ch">
            <i style={{ '--d': '0.56s' } as React.CSSProperties}>a</i>
          </span>
          <span className="intro-ch">
            <i style={{ '--d': '0.63s' } as React.CSSProperties}>d</i>
          </span>
          <span className="intro-ch">
            <i style={{ '--d': '0.70s' } as React.CSSProperties}>e</i>
          </span>
          <span className="intro-ch">
            <i style={{ '--d': '0.77s' } as React.CSSProperties}>s</i>
          </span>
          <span className="intro-dot">.</span>
        </span>
      </a>
    </>
  )
}

export default SiteIntro
