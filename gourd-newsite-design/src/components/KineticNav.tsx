import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { GourdLogo } from './GourdLogo'
import './KineticNav.css'

// Register GSAP Plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
}

interface KineticNavProps {
  cartCount?: number
  onOpenCart?: () => void
}

interface MenuItem {
  name: string
  href: string
  shape: string
  subtitle: string
}

const MENU_ITEMS: MenuItem[] = [
  { name: 'Home', href: '/', shape: '1', subtitle: 'Artisanal Calabash Lighting' },
  { name: 'Lamps Collection', href: '/products', shape: '2', subtitle: 'Handcrafted Organic Sculptures' },
  { name: 'Our Story', href: '/about', shape: '3', subtitle: 'Rooted in Arusha, Tanzania' },
  { name: 'Community & Craft', href: '/community', shape: '4', subtitle: 'Preserving Ancient Botanicals' },
  { name: 'Contact Us', href: '/contact', shape: '5', subtitle: 'Custom Orders & Inquiries' },
]

export function KineticNav({ cartCount = 0, onOpenCart }: KineticNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu automatically on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return

    // Create custom easing
    try {
      if (!gsap.parseEase('main')) {
        CustomEase.create('main', '0.65, 0.01, 0.05, 0.99')
        gsap.defaults({ ease: 'main', duration: 0.7 })
      }
    } catch {
      gsap.defaults({ ease: 'power2.out', duration: 0.7 })
    }

    const ctx = gsap.context(() => {
      // Shape Hover logic
      const menuItems = containerRef.current!.querySelectorAll('.menu-list-item[data-shape]')
      const shapesContainer = containerRef.current!.querySelector('.ambient-background-shapes')

      menuItems.forEach(item => {
        const shapeIndex = item.getAttribute('data-shape')
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null

        if (!shape) return

        const shapeEls = shape.querySelectorAll('.shape-element')

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll('.bg-shape').forEach(s => s.classList.remove('active'))
          }
          shape.classList.add('active')

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'back.out(1.7)',
              overwrite: 'auto',
            }
          )
        }

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto',
          })
        }

        item.addEventListener('mouseenter', onEnter)
        item.addEventListener('mouseleave', onLeave)

        // Store cleanup on node
        ;(item as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
          item.removeEventListener('mouseenter', onEnter)
          item.removeEventListener('mouseleave', onLeave)
        }
      })
    }, containerRef)

    return () => {
      ctx.revert()
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.menu-list-item[data-shape]')
        items.forEach((item: Element) => {
          const el = item as HTMLElement & { _cleanup?: () => void }
          if (el._cleanup) el._cleanup()
        })
      }
    }
  }, [])

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector('.nav-overlay-wrapper')
      const menu = containerRef.current!.querySelector('.menu-content')
      const overlay = containerRef.current!.querySelector('.overlay')
      const bgPanels = containerRef.current!.querySelectorAll('.backdrop-layer')
      const menuLinks = containerRef.current!.querySelectorAll('.nav-link')
      const fadeTargets = containerRef.current!.querySelectorAll('[data-menu-fade]')

      const menuButton = containerRef.current!.querySelector('.nav-close-btn')
      const menuButtonTexts = menuButton?.querySelectorAll('p')
      const menuButtonIcon = menuButton?.querySelector('.menu-button-icon')

      const tl = gsap.timeline()

      if (isMenuOpen) {
        // Prevent body scroll when menu is active
        document.body.style.overflow = 'hidden'

        if (navWrap) tl.set(navWrap, { display: 'block' })
        if (menu) tl.set(menu, { xPercent: 0 }, '<')
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 }, '<')
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, '<')
        }
        if (overlay) tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
        if (bgPanels.length > 0) {
          tl.fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
        }
        if (menuLinks.length > 0) {
          tl.fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35')
        }

        if (fadeTargets.length > 0) {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: 'all' },
            '<+=0.2'
          )
        }
      } else {
        // Restore body scroll
        document.body.style.overflow = ''

        if (navWrap) navWrap.setAttribute('data-nav', 'closed')

        if (overlay) tl.to(overlay, { autoAlpha: 0 })
        if (menu) tl.to(menu, { xPercent: 120 }, '<')
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0 }, '<')
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0 }, '<')
        }
        if (navWrap) tl.set(navWrap, { display: 'none' })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isMenuOpen])

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div ref={containerRef}>
      {/* 1. FLOATING UNATTACHED LOGO (Completely independent of header bar) */}
      <Link to="/" className="floating-site-logo" aria-label="Gourd Shades Home">
        <GourdLogo iconSize={46} showText={true} />
      </Link>

      {/* 2. TOP RIGHT CONTROLS (Cart + Kinetic Menu Button) */}
      <div className="site-header-wrapper">
        <header className="header">
          <nav className="nav-row">
            <div className="nav-row__right">
              {/* Inquiry Bag Button */}
              {onOpenCart && (
                <button
                  className="header-bag-pill"
                  onClick={onOpenCart}
                  aria-label={`Open inquiry bag with ${cartCount} items`}
                >
                  <ShoppingBag size={15} strokeWidth={1.8} />
                  <span>Bag ({cartCount})</span>
                </button>
              )}

              {/* Kinetic Click Indicator */}
              <div
                className="nav-toggle-label"
                onClick={toggleMenu}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                <span className="toggle-text">explore</span>
              </div>

              {/* Restored Kinetic Menu Button */}
              <button
                type="button"
                className="nav-close-btn"
                onClick={toggleMenu}
                style={{ pointerEvents: 'auto' }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="menu-button-text">
                  <p className="p-large">Menu</p>
                  <p className="p-large">Close</p>
                </div>
                <div className="icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="menu-button-icon"
                  >
                    <path
                      d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* 3. FULLSCREEN KINETIC DRAWER */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu} />
          <nav className="menu-content" aria-label="Kinetic Navigation Menu">
            {/* 3-Tier Layered Kinetic Backdrops */}
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              {/* Abstract shapes container (Calabash & Light Themed) */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating Celestial Calabashes */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="90" cy="110" r="46" fill="rgba(220,51,49,0.2)" />
                  <circle className="shape-element" cx="310" cy="90" r="68" fill="rgba(229,169,90,0.18)" />
                  <circle className="shape-element" cx="210" cy="290" r="88" fill="rgba(245,158,68,0.15)" />
                  <circle className="shape-element" cx="350" cy="270" r="32" fill="rgba(220,51,49,0.18)" />
                </svg>

                {/* Shape 2: Flowing Light Wave Ripple */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(229,169,90,0.25)"
                    strokeWidth="50"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(220,51,49,0.2)"
                    strokeWidth="35"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Intricate Perforation Starlight Grid (Handmade Holes) */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="60" cy="60" r="7" fill="rgba(229,169,90,0.4)" />
                  <circle className="shape-element" cx="160" cy="60" r="9" fill="rgba(220,51,49,0.35)" />
                  <circle className="shape-element" cx="260" cy="60" r="7" fill="rgba(255,254,246,0.3)" />
                  <circle className="shape-element" cx="340" cy="60" r="8" fill="rgba(229,169,90,0.35)" />
                  <circle className="shape-element" cx="110" cy="160" r="14" fill="rgba(245,158,68,0.35)" />
                  <circle className="shape-element" cx="210" cy="160" r="16" fill="rgba(220,51,49,0.35)" />
                  <circle className="shape-element" cx="310" cy="160" r="12" fill="rgba(229,169,90,0.3)" />
                  <circle className="shape-element" cx="60" cy="260" r="10" fill="rgba(229,169,90,0.35)" />
                  <circle className="shape-element" cx="160" cy="260" r="12" fill="rgba(220,51,49,0.3)" />
                  <circle className="shape-element" cx="260" cy="260" r="14" fill="rgba(255,254,246,0.3)" />
                  <circle className="shape-element" cx="340" cy="260" r="9" fill="rgba(229,169,90,0.35)" />
                  <circle className="shape-element" cx="110" cy="340" r="8" fill="rgba(245,158,68,0.3)" />
                  <circle className="shape-element" cx="210" cy="340" r="10" fill="rgba(220,51,49,0.3)" />
                  <circle className="shape-element" cx="310" cy="340" r="8" fill="rgba(229,169,90,0.3)" />
                </svg>

                {/* Shape 4: Organic Botanical Calabash Contours */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(229,169,90,0.16)"
                  />
                  <path
                    className="shape-element"
                    d="M240 190 Q300 140, 360 190 Q400 240, 350 290 Q300 340, 250 290 Q200 240, 240 190"
                    fill="rgba(220,51,49,0.14)"
                  />
                </svg>

                {/* Shape 5: Radiating Filament Rays */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(229,169,90,0.2)" strokeWidth="28" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(220,51,49,0.18)" strokeWidth="22" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(255,254,246,0.12)" strokeWidth="18" />
                </svg>
              </div>
            </div>

            {/* Menu Inner Content */}
            <div className="menu-content-wrapper">
              <div className="menu-drawer-top" data-menu-fade>
                <span className="menu-drawer-eyebrow">Artisanal Directory • 2025</span>
              </div>

              <ul className="menu-list">
                {MENU_ITEMS.map((item, idx) => (
                  <li key={item.href} className="menu-list-item" data-shape={item.shape}>
                    <Link
                      to={item.href}
                      className="nav-link w-inline-block"
                      onClick={closeMenu}
                    >
                      <span className="nav-link-text">{item.name}</span>
                      <span className="nav-link-sub">{item.subtitle}</span>
                      <div className="nav-link-hover-bg" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Drawer Studio Footer Metadata */}
              <div className="menu-drawer-footer" data-menu-fade>
                <div className="menu-drawer-meta">
                  <div>
                    <span>Handmade in <b>Arusha, Tanzania</b></span>
                    <br />
                    <span>Air-cured natural dried calabashes</span>
                  </div>
                  <div className="menu-drawer-links">
                    <a
                      href="https://www.instagram.com/gourdshadestz?igsh=MTZteGx1OXR5Zno1NQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://wa.me/255746754878"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  )
}

export default KineticNav
