import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { GourdLogo } from './GourdLogo'
import './KineticNav.css'

interface KineticNavProps {
  cartCount?: number
  onOpenCart?: () => void
}

interface MenuItem {
  name: string
  href: string
}

const MENU_ITEMS: MenuItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Lamps Collection', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Community & Craft', href: '/community' },
  { name: 'Contact Us', href: '/contact' },
]

/** Consistent luxury editorial transition curve */
const LUXURY_EASE = [0.16, 0.65, 0.3, 1] as const

export function KineticNav({ cartCount = 0, onOpenCart }: KineticNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const pendingNavRef = useRef<string | null>(null)

  // Prevent background scrolling while drawer is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Escape key listener to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  // Graceful sequential navigation: drawer closes smoothly first, then page transitions
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()

    // If already on the requested page, smoothly close drawer without reloading
    if (location.pathname === href) {
      setIsMenuOpen(false)
      return
    }

    // Stage destination & trigger smooth close
    pendingNavRef.current = href
    setIsMenuOpen(false)

    // Safety fallback ensures navigation triggers even if exit event is missed
    setTimeout(() => {
      if (pendingNavRef.current) {
        const destination = pendingNavRef.current
        pendingNavRef.current = null
        navigate(destination)
      }
    }, 420)
  }

  // Triggered automatically as soon as the drawer's exit animation completes
  const handleExitComplete = () => {
    if (pendingNavRef.current) {
      const destination = pendingNavRef.current
      pendingNavRef.current = null
      navigate(destination)
    }
  }

  const logoLinkRef = useRef<HTMLAnchorElement>(null)

  // Initialize theme based on pathname
  const getInitialTheme = (pathname: string): 'white' | 'red' | 'dark' => {
    if (pathname === '/') return 'red' // Home top hero is red
    if (
      pathname === '/products' ||
      pathname === '/contact' ||
      pathname === '/community' ||
      pathname === '/services'
    ) {
      return 'dark' // Photography hero banners with dark ambiance
    }
    return 'white' // Light editorial pages (/privacy, /disclaimer, /about)
  }

  const [logoTheme, setLogoTheme] = useState<'white' | 'red' | 'dark'>(() =>
    getInitialTheme(location.pathname)
  )

  // Dynamically detect section background under the logo during scroll & navigation
  useEffect(() => {
    // Immediately set appropriate theme on route change to prevent color flash
    setLogoTheme(getInitialTheme(location.pathname))

    let rafId: number | null = null

    const updateLogoTheme = () => {
      const logoEl = logoLinkRef.current
      if (!logoEl) return

      const rect = logoEl.getBoundingClientRect()
      const probeX = Math.round(rect.left + rect.width / 2)
      const probeY = Math.round(rect.top + rect.height / 2)

      const elements = document.elementsFromPoint(probeX, probeY)

      for (const el of elements) {
        // Skip navigation and fixed overlays
        if (
          el.closest('.floating-site-logo') ||
          el.closest('.site-header-wrapper') ||
          el.closest('.nav-drawer-portal') ||
          el.closest('.cookie-banner') ||
          el.closest('.cookie-modal-overlay') ||
          el.tagName === 'HTML' ||
          el.tagName === 'BODY'
        ) {
          continue
        }

        // 1. Explicit data-logo-theme attribute
        const themedAncestor = el.closest('[data-logo-theme]') as HTMLElement | null
        if (themedAncestor) {
          const explicit = themedAncestor.getAttribute('data-logo-theme')
          if (explicit === 'white' || explicit === 'red' || explicit === 'dark') {
            setLogoTheme(explicit)
            return
          }
        }

        // 2. Class-based detection (Dark image/photo containers checked first!)
        if (
          el.closest(
            '.products-hero-bg, .contact-hero-bg, .community-hero-bg, .detail-image, .detail-gallery, .hero-visual, .story-image, .about-hero-image, .bg-dark, .dark-section, .fullscreen-lightbox'
          )
        ) {
          setLogoTheme('dark')
          return
        }
        if (el.closest('.intro-band, .hero-copy, .contact-bottom, .bg-red')) {
          setLogoTheme('red')
          return
        }
        if (
          el.closest(
            '.featured-section, .values-strip, .legal-page, .catalog, .about-intro, .about-content, .contact-editorial-section, .editorial-categories-section'
          ) ||
          (el.closest('.page-intro') && !el.closest('.products-hero-bg, .contact-hero-bg, .community-hero-bg'))
        ) {
          setLogoTheme('white')
          return
        }

        // 3. Computed style luminance & chromatic analysis
        let current: HTMLElement | null = el as HTMLElement
        while (current && current !== document.body) {
          const style = window.getComputedStyle(current)
          const bg = style.backgroundColor
          if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
            const rgbMatch = bg.match(/\d+/g)
            if (rgbMatch && rgbMatch.length >= 3) {
              const r = parseInt(rgbMatch[0], 10)
              const g = parseInt(rgbMatch[1], 10)
              const b = parseInt(rgbMatch[2], 10)
              const a = rgbMatch[3] !== undefined ? parseFloat(rgbMatch[3]) : 1

              if (a > 0.4) {
                // Red tone detection (e.g. #dc3331)
                if (r > 165 && g < 110 && b < 110) {
                  setLogoTheme('red')
                  return
                }
                // Dark/Black detection (luminance < 75)
                const lum = 0.299 * r + 0.587 * g + 0.114 * b
                if (lum < 75) {
                  setLogoTheme('dark')
                  return
                }
                // Light/White detection (luminance > 160)
                if (lum > 160) {
                  setLogoTheme('white')
                  return
                }
              }
            }
          }
          current = current.parentElement
        }
      }

      // Fallback based on scroll position & route
      if (window.scrollY < 80) {
        setLogoTheme(getInitialTheme(location.pathname))
      } else {
        setLogoTheme('white')
      }
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateLogoTheme)
    }

    updateLogoTheme()
    const timer1 = setTimeout(updateLogoTheme, 60)
    const timer2 = setTimeout(updateLogoTheme, 200)
    const timer3 = setTimeout(updateLogoTheme, 450)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  return (
    <>
      {/* 1. FLOATING DETACHED LOGO (Adapts to White, Red, and Dark sections) */}
      <Link
        ref={logoLinkRef}
        to="/"
        className={`floating-site-logo theme-${logoTheme}`}
        aria-label="Gourd Shades Home"
      >
        <GourdLogo iconSize={46} showText={true} />
      </Link>

      {/* 2. TOP RIGHT CONTROLS (Inquiry Bag + Menu Button) */}
      <div className="site-header-wrapper">
        <div className="nav-row__right">
          {onOpenCart && (
            <button
              type="button"
              className="header-bag-pill"
              onClick={onOpenCart}
              aria-label={`Open inquiry bag with ${cartCount} items`}
            >
              <ShoppingBag size={15} strokeWidth={1.8} />
              <span>Bag ({cartCount})</span>
            </button>
          )}

          <button
            type="button"
            className={`nav-toggle-btn ${isMenuOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="nav-toggle-text">{isMenuOpen ? 'Close' : 'Menu'}</span>
            <span className={`nav-toggle-icon ${isMenuOpen ? 'is-open' : ''}`}>
              <Plus size={16} strokeWidth={2.2} />
            </span>
          </button>
        </div>
      </div>

      {/* 3. LUXURY EDITORIAL DRAWER (Framer Motion with subtle closing prior to route change) */}
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {isMenuOpen && (
          <div className="nav-drawer-portal">
            {/* Translucent Backdrop */}
            <motion.div
              className="nav-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Signature Terracotta Red Drawer */}
            <motion.aside
              className="nav-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: LUXURY_EASE }}
              aria-label="Site Navigation"
            >
              <nav className="nav-drawer-content">
                <ul className="nav-links-list">
                  {MENU_ITEMS.map((item, idx) => (
                    <li key={item.href} className="nav-item">
                      <Link
                        to={item.href}
                        className="nav-item-link"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <span className="nav-item-mask">
                          <motion.span
                            className="nav-item-text"
                            initial={{ y: '115%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{
                              y: {
                                duration: isMenuOpen ? 0.65 : 0.25,
                                delay: isMenuOpen ? 0.12 + idx * 0.05 : (4 - idx) * 0.02,
                                ease: isMenuOpen ? LUXURY_EASE : 'easeIn',
                              },
                              opacity: {
                                duration: isMenuOpen ? 0.5 : 0.22,
                                delay: isMenuOpen ? 0.12 + idx * 0.05 : (4 - idx) * 0.02,
                                ease: 'easeOut',
                              },
                            }}
                          >
                            {item.name}
                          </motion.span>
                        </span>
                        <span className="nav-item-line" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default KineticNav
