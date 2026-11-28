import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Search,
  User,
  Bell,
  Bookmark,
  X,
  Menu,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProductStore, type Product } from '../context/ProductContext'
import { GourdLogo } from './GourdLogo'
import { AnnouncementBar } from './AnnouncementBar'
import './KineticNav.css'

interface KineticNavProps {
  cartCount?: number
  onOpenCart?: () => void
}

type ActiveMega = 'shop' | 'explore' | 'search' | null
type NavTheme = 'white' | 'red' | 'dark'

const getInitialTheme = (pathname: string): NavTheme => {
  if (pathname === '/') return 'red' // Hero banner is red on the left
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

export function KineticNav({ cartCount = 0, onOpenCart }: KineticNavProps) {
  const { products, wishlistCount, openWishlist } = useProductStore()
  const [activeMega, setActiveMega] = useState<ActiveMega>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<'shop' | 'explore' | null>('shop')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotificationPopover, setShowNotificationPopover] = useState(false)
  const [showRegionPopover, setShowRegionPopover] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [navTheme, setNavTheme] = useState<NavTheme>(() => getInitialTheme(location.pathname))
  const [isScrolled, setIsScrolled] = useState(false)

  // Dynamically detect background under the logo & transparent navbar during scroll
  useEffect(() => {
    setNavTheme(getInitialTheme(location.pathname))

    let rafId: number | null = null

    const updateNavTheme = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      const navEl = navRef.current
      const navRect = navEl?.getBoundingClientRect()
      // Center vertical probe line of the fixed topbar (typically y ≈ 32-36px)
      const probeY = navRect ? Math.round(navRect.top + navRect.height / 2) : 34

      const brandSlot = document.getElementById('brand-slot')
      const slotRect = brandSlot?.getBoundingClientRect()
      const probeX = slotRect && slotRect.width > 0
        ? Math.round(slotRect.left + slotRect.width / 2)
        : Math.round(Math.min(window.innerWidth * 0.12, 140))

      // 1. Primary Strategy: Check explicit section bounding boxes at probeY
      // This is the most deterministic approach across scroll positions and layout hierarchies
      const candidateSections = Array.from(
        document.querySelectorAll<HTMLElement>(
          'main > section, main > div, main > article, section, [data-logo-theme], [data-nav-theme], .catalog, .footer, .hero-copy, .hero-visual, .detail-layout, .detail-page, .story-preview, .intro-band'
        )
      )

      // Find the deepest or most specific section intersecting probeY
      for (const section of candidateSections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom >= probeY) {
          // If on desktop hero and probing the left vs right column
          if (section.classList.contains('hero')) {
            const heroCopy = section.querySelector<HTMLElement>('.hero-copy')
            const heroVisual = section.querySelector<HTMLElement>('.hero-visual')
            if (heroCopy && heroVisual) {
              const copyRect = heroCopy.getBoundingClientRect()
              // Logo is on the left; check if probe is inside hero-copy
              if (copyRect.top <= probeY && copyRect.bottom >= probeY) {
                setNavTheme('red')
                return
              }
            }
          }

          // If on story preview (split columns: image on left, copy on right)
          if (section.classList.contains('story-preview')) {
            const storyImg = section.querySelector<HTMLElement>('.story-image')
            const storyCopy = section.querySelector<HTMLElement>('.story-copy')
            if (storyImg && storyCopy) {
              const imgRect = storyImg.getBoundingClientRect()
              const copyRect = storyCopy.getBoundingClientRect()
              if (imgRect.top <= probeY && imgRect.bottom >= probeY && imgRect.left <= probeX && imgRect.right >= probeX) {
                setNavTheme('dark')
                return
              }
              if (copyRect.top <= probeY && copyRect.bottom >= probeY) {
                setNavTheme('white')
                return
              }
            }
          }

          // Check explicit data-logo-theme / data-nav-theme
          const explicitTheme =
            section.getAttribute('data-logo-theme') ||
            section.getAttribute('data-nav-theme')
          if (
            explicitTheme === 'white' ||
            explicitTheme === 'red' ||
            explicitTheme === 'dark'
          ) {
            setNavTheme(explicitTheme as NavTheme)
            return
          }

          // Class-based classification of known sections
          if (
            section.matches(
              '.products-hero-bg, .contact-hero-bg, .community-hero-bg, .about-hero-image, .story-image, .bg-dark, .dark-section, .fullscreen-lightbox'
            )
          ) {
            setNavTheme('dark')
            return
          }

          if (section.matches('.hero-copy, .contact-bottom, .bg-red, .footer')) {
            setNavTheme('red')
            return
          }

          if (
            section.matches(
              '.intro-band, .catalog, #catalog-section, .featured-section, .new-designs-section, .editorial-gallery-section, .values-strip, .legal-page, .about-intro, .about-content, .about-origin-extension, .community-section, .contact-editorial-section, .editorial-categories-section, .detail-layout, .detail-page'
            )
          ) {
            setNavTheme('white')
            return
          }
        }
      }

      // 2. Secondary Strategy: Point-based inspection at logo position and center
      const elements = document.elementsFromPoint(probeX, probeY)

      for (const el of elements) {
        if (
          el.closest('.the-frankie-header') ||
          el.closest('.frankie-mobile-drawer') ||
          el.closest('.cookie-banner') ||
          el.closest('.intro-overlay') ||
          el.tagName === 'HTML' ||
          el.tagName === 'BODY'
        ) {
          continue
        }

        // Explicit data-logo-theme on ancestor
        const themedAncestor = el.closest('[data-logo-theme]') as HTMLElement | null
        if (themedAncestor) {
          const explicit = themedAncestor.getAttribute('data-logo-theme')
          if (explicit === 'white' || explicit === 'red' || explicit === 'dark') {
            setNavTheme(explicit as NavTheme)
            return
          }
        }

        // Class matching
        if (
          el.closest(
            '.products-hero-bg, .contact-hero-bg, .community-hero-bg, .detail-image, .detail-gallery, .hero-visual, .story-image, .about-hero-image, .bg-dark, .dark-section, .fullscreen-lightbox'
          )
        ) {
          setNavTheme('dark')
          return
        }

        if (el.closest('.hero-copy, .contact-bottom, .bg-red, .footer')) {
          setNavTheme('red')
          return
        }

        if (
          el.closest(
            '.intro-band, .featured-section, .new-designs-section, .editorial-gallery-section, .values-strip, .legal-page, .catalog, .about-intro, .about-content, .contact-editorial-section, .editorial-categories-section, .detail-layout'
          ) ||
          (el.closest('.page-intro') && !el.closest('.products-hero-bg, .contact-hero-bg, .community-hero-bg'))
        ) {
          setNavTheme('white')
          return
        }

        // Computed style luminance check
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
                // Vibrant red background detection
                if (r > 165 && g < 110 && b < 110) {
                  setNavTheme('red')
                  return
                }
                const lum = 0.299 * r + 0.587 * g + 0.114 * b
                if (lum < 85) {
                  setNavTheme('dark')
                  return
                }
                // Light/cream/white/pink backgrounds
                if (lum >= 85) {
                  setNavTheme('white')
                  return
                }
              }
            }
          }
          current = current.parentElement
        }
      }

      // Fallback: at top of page, use initial route theme; when scrolled, default to high-contrast white
      if (scrollY < 80) {
        setNavTheme(getInitialTheme(location.pathname))
      } else {
        setNavTheme('white')
      }
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateNavTheme)
    }

    updateNavTheme()
    const timer1 = setTimeout(updateNavTheme, 60)
    const timer2 = setTimeout(updateNavTheme, 200)
    const timer3 = setTimeout(updateNavTheme, 450)

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

  // Close menus on page route changes
  useEffect(() => {
    setActiveMega(null)
    setIsMobileMenuOpen(false)
    setShowNotificationPopover(false)
    setShowRegionPopover(false)
  }, [location.pathname, location.search])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Focus search input when search mega is active
  useEffect(() => {
    if (activeMega === 'search') {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 80)
    } else {
      setSearchQuery('')
    }
  }, [activeMega])

  // Handle ESC key and outside clicks to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega(null)
        setIsMobileMenuOpen(false)
        setShowNotificationPopover(false)
        setShowRegionPopover(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null)
        setShowNotificationPopover(false)
        setShowRegionPopover(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Mouse hover handlers with fast, agile responsiveness
  const handleMouseEnter = (menu: 'shop' | 'explore') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveMega(prev => (prev === menu ? prev : menu))
    setShowNotificationPopover(false)
    setShowRegionPopover(false)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMega(prev => (prev === 'search' ? prev : null))
    }, 110)
  }

  // Filtered lamps for live search
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase().trim()
    return products
      .filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [searchQuery, products])

  // Navigate to lamp detail and close menus
  const handleSelectProduct = (id: string) => {
    setActiveMega(null)
    setIsMobileMenuOpen(false)
    navigate(`/products/${id}`)
  }

  // Navigate to category filter
  const handleSelectFilter = (filterName: string) => {
    setActiveMega(null)
    setIsMobileMenuOpen(false)
    navigate(`/products?filter=${encodeURIComponent(filterName)}`)
  }

  const isAnyMenuOpen = activeMega !== null || isMobileMenuOpen
  const effectiveTheme = isAnyMenuOpen ? 'white' : navTheme

  return (
    <header
      ref={navRef}
      className={`the-frankie-header ${isAnyMenuOpen ? 'menu-active' : ''} theme-${effectiveTheme} ${
        isScrolled ? 'is-scrolled' : ''
      }`}
      onMouseLeave={handleMouseLeave}
    >
      {/* 0. EDITABLE TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 1. TOP UTILITY & NAVIGATION BAR */}
      <div className="frankie-topbar">
        {/* Left: Brand Slot (Invisible guide that measures where the intro logo docks) */}
        <div className="frankie-topbar-left">
          <div
            id="brand-slot"
            className="frankie-brand-slot"
            aria-hidden="true"
          >
            <GourdLogo />
          </div>
        </div>

        {/* Center / Left-Center: Nav Items */}
        <nav className="frankie-topbar-nav" aria-label="Main Navigation">
          <button
            type="button"
            className={`frankie-nav-link ${activeMega === 'shop' ? 'is-active' : ''}`}
            onMouseEnter={() => handleMouseEnter('shop')}
            onClick={() => setActiveMega(prev => (prev === 'shop' ? null : 'shop'))}
            aria-expanded={activeMega === 'shop'}
          >
            SHOP
          </button>

          <button
            type="button"
            className={`frankie-nav-link ${activeMega === 'explore' ? 'is-active' : ''}`}
            onMouseEnter={() => handleMouseEnter('explore')}
            onClick={() => setActiveMega(prev => (prev === 'explore' ? null : 'explore'))}
            aria-expanded={activeMega === 'explore'}
          >
            EXPLORE
          </button>

          <button
            type="button"
            className={`frankie-nav-link frankie-search-trigger ${
              activeMega === 'search' ? 'is-active' : ''
            }`}
            onClick={() => setActiveMega(prev => (prev === 'search' ? null : 'search'))}
            aria-label="Open search"
          >
            <span>SEARCH</span>
            <span className="search-cursor-bar">_</span>
          </button>
        </nav>

        {/* Right: Region, Account, Updates, Wishlist, Inquiry Bag */}
        <div className="frankie-topbar-right">
          {/* Region / Currency */}
          <div className="frankie-util-item region-wrap">
            <button
              type="button"
              className="frankie-util-btn region-btn"
              onClick={() => {
                setShowRegionPopover(prev => !prev)
                setShowNotificationPopover(false)
              }}
              title="Studio Location & Currency"
            >
              TZ / EN
            </button>
            {showRegionPopover && (
              <div className="frankie-popover region-popover">
                <strong>Arusha Studio, Tanzania</strong>
                <p>Handcrafted to order. Worldwide shipping &amp; USD / TZS bank &amp; card checkout available.</p>
              </div>
            )}
          </div>

          {/* User / Studio Profile Icon */}
          <Link
            to="/contact"
            className="frankie-util-btn frankie-user-link"
            title="Studio Inquiries & Profile"
            aria-label="Studio contact"
          >
            <User size={15} strokeWidth={1.8} />
          </Link>

          {/* Updates Bell Icon [1] */}
          <div className="frankie-util-item">
            <button
              type="button"
              className="frankie-util-btn"
              onClick={() => {
                setShowNotificationPopover(prev => !prev)
                setShowRegionPopover(false)
              }}
              title="Studio Updates"
              aria-label="Studio updates"
            >
              <Bell size={15} strokeWidth={1.8} />
              <span className="frankie-counter">[1]</span>
            </button>
            {showNotificationPopover && (
              <div className="frankie-popover notif-popover">
                <span className="popover-tag">NEW RELEASE</span>
                <strong>6 New Entries Live</strong>
                <p>Explore the latest one-of-a-kind hand-carved calabashes in our online gallery.</p>
                <Link
                  to="/products?filter=New+Entries"
                  className="popover-link"
                  onClick={() => setShowNotificationPopover(false)}
                >
                  View New Entries <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>

          {/* Wishlist / Bookmark Icon [wishlistCount] */}
          <button
            type="button"
            className="frankie-util-btn wishlist-btn wishlist-button"
            onClick={openWishlist}
            title="Saved Wishlamps"
            aria-label={`Wishlist with ${wishlistCount} saved lamps`}
          >
            <Bookmark size={15} strokeWidth={1.8} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
            <span className="frankie-counter">[{wishlistCount}]</span>
          </button>

          {/* Shopping Bag Icon [cartCount] */}
          {onOpenCart && (
            <button
              type="button"
              className="frankie-util-btn bag-btn bag-button"
              onClick={onOpenCart}
              title="Open Inquiry Bag"
              aria-label={`Open inquiry bag with ${cartCount} items`}
            >
              <ShoppingBag size={15} strokeWidth={1.8} />
              <span className="frankie-counter">[{cartCount}]</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="frankie-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 2 & 3. MEGA MENUS: SHOP + EXPLORE
          Outer wrapper opens/closes as one unit.
          Inner panels crossfade in-place — the container never collapses between tabs. */}
      <AnimatePresence>
        {(activeMega === 'shop' || activeMega === 'explore') && (
          <motion.div
            className="frankie-megamenu-outer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* SHOP content */}
            <motion.div
              className="frankie-megamenu shop-mega mega-panel-layer"
              initial={false}
              animate={{ opacity: activeMega === 'shop' ? 1 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{ pointerEvents: activeMega === 'shop' ? 'auto' : 'none' }}
              onMouseEnter={() => handleMouseEnter('shop')}
              aria-hidden={activeMega !== 'shop'}
            >
              <div className="shop-mega-grid">
                {/* Column 1: Primary Category Hierarchy */}
                <div className="mega-col category-col">
                  <span className="mega-col-heading">Categories</span>
                  <ul className="mega-link-list">
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn is-highlight"
                        onClick={() => handleSelectFilter('All lamps')}
                      >
                        All Lamps
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('Artisan Pieces')}
                      >
                        Artisan Pieces
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('New Designs')}
                      >
                        New Designs
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('Custom Design')}
                      >
                        Custom Studio
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Collections & Subcategories */}
                <div className="mega-col subcategories-col">
                  <span className="mega-col-heading">Collections</span>
                  <ul className="mega-link-list">
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn is-strong"
                        onClick={() => handleSelectFilter('Wildlife Sculptures')}
                      >
                        Wildlife Sculptures
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('Botanical & Trees')}
                      >
                        Botanical &amp; Trees
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('Abstract & Contemporary')}
                      >
                        Abstract &amp; Contemporary
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn with-badge"
                        onClick={() => handleSelectFilter('Savanna Twilight Edit')}
                      >
                        <span>Savanna Twilight Edit</span>
                        <span className="mega-badge">NEW</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Curated Edits & Lighting Placements */}
                <div className="mega-col edits-col">
                  <span className="mega-col-heading">Curated Edits</span>
                  <ul className="mega-link-list">
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn is-strong"
                        onClick={() => handleSelectFilter('Floor Lamps')}
                      >
                        Floor Lamps
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('Hanging Lamps')}
                      >
                        Hanging Lamps
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('Bedside & Table')}
                      >
                        Bedside &amp; Table
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="mega-text-btn"
                        onClick={() => handleSelectFilter('The Arusha Capsule')}
                      >
                        The Arusha Capsule
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Large Fashion-House Editorial Image Showcase */}
                <div className="mega-col editorial-showcase-col">
                  <Link
                    to="/products?filter=New+Entries"
                    className="editorial-showcase-card"
                    onClick={() => setActiveMega(null)}
                  >
                    <div className="editorial-showcase-img-wrap">
                      <img
                        src="/images/standing-bedside-2.jpeg"
                        alt="Handcrafted standing bedside gourd luminaire"
                        className="editorial-showcase-img"
                      />
                    </div>
                    <div className="editorial-showcase-label">
                      <span className="editorial-arrow">↳</span>
                      <span>NEW IN</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* EXPLORE content — overlaid, crossfades in when activeMega === 'explore' */}
            <motion.div
              className="frankie-megamenu explore-mega mega-panel-layer mega-panel-overlay"
              initial={false}
              animate={{ opacity: activeMega === 'explore' ? 1 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              style={{ pointerEvents: activeMega === 'explore' ? 'auto' : 'none' }}
              onMouseEnter={() => handleMouseEnter('explore')}
              aria-hidden={activeMega !== 'explore'}
            >
              <div className="explore-mega-grid">
                {/* Column 1: Links */}
                <div className="mega-col explore-links-col">
                  <ul className="mega-link-list large-links">
                    <li>
                      <Link
                        to="/about"
                        className="mega-large-link"
                        onClick={() => setActiveMega(null)}
                      >
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="mega-large-link"
                        onClick={() => setActiveMega(null)}
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/community"
                        className="mega-large-link"
                        onClick={() => setActiveMega(null)}
                      >
                        Community &amp; Outreach
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about#craft"
                        className="mega-large-link"
                        onClick={() => setActiveMega(null)}
                      >
                        The Craftsmanship
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Editorial Card 1 (Contact / Artisan) */}
                <div className="mega-col explore-card-col">
                  <Link
                    to="/contact"
                    className="explore-editorial-card"
                    onClick={() => setActiveMega(null)}
                  >
                    <div className="explore-card-img-wrap">
                      <img
                        src="/images/IMG-20250529-WA0007-nav-contacts.jpg"
                        alt="Artisan studio craftsmanship in Arusha"
                        className="explore-card-img"
                      />
                    </div>
                    <div className="editorial-showcase-label">
                      <span className="editorial-arrow">↳</span>
                      <span>CONTACT</span>
                    </div>
                  </Link>
                </div>

                {/* Column 3: Editorial Card 2 (Once Upon a Time in Arusha) */}
                <div className="mega-col explore-card-col wide">
                  <Link
                    to="/about"
                    className="explore-editorial-card"
                    onClick={() => setActiveMega(null)}
                  >
                    <div className="explore-card-img-wrap">
                      <img
                        src="/images/image-wm-about.jpg"
                        alt="Isaac Munis crafting in Arusha, Tanzania"
                        className="explore-card-img"
                      />
                    </div>
                    <div className="editorial-showcase-label">
                      <span className="editorial-arrow">↳</span>
                      <span>ONCE UPON A TIME IN ARUSHA</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SEARCH PANEL: SEARCH _ */}
      <AnimatePresence>
        {activeMega === 'search' && (
          <motion.div
            className="frankie-search-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="search-bar-row">
              <Search size={16} className="search-input-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search any of our 39 lamps (e.g. Ndovu, Butterfly, Zebra, Tree, Coral)..."
                className="search-field"
              />
              <button
                type="button"
                className="search-close-btn"
                onClick={() => setActiveMega(null)}
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            {/* Live Search Results */}
            {searchQuery.trim() && (
              <div className="search-results-tray">
                {searchResults.length > 0 ? (
                  <div className="search-results-grid">
                    {searchResults.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        className="search-result-card"
                        onClick={() => handleSelectProduct(p.id)}
                      >
                        <div className="search-result-thumb">
                          <img
                            src={p.images?.[0] || '/images/hero-editorial.png'}
                            alt={p.name}
                          />
                        </div>
                        <div className="search-result-info">
                          <span className="search-result-cat">
                            {p.subCategory || p.category}
                          </span>
                          <strong className="search-result-name">{p.name}</strong>
                          <span className="search-result-price">{p.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="search-no-results">
                    No lamps found matching "{searchQuery}". Try "Wildlife", "Crystal", "Floor", or "Hanging".
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MOBILE ACCORDION DRAWER (< 900px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="frankie-mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-inner">
              {/* Mobile Search Field */}
              <div className="mobile-search-box">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search 39 lamps..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Live Search Results if typing */}
              {searchQuery.trim() && searchResults.length > 0 && (
                <div className="mobile-search-results">
                  {searchResults.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      className="mobile-search-item"
                      onClick={() => handleSelectProduct(p.id)}
                    >
                      <img src={p.images?.[0] || '/images/hero-editorial.png'} alt={p.name} />
                      <div>
                        <strong>{p.name}</strong>
                        <span>{p.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Accordion 1: SHOP */}
              <div className="mobile-nav-block">
                <button
                  type="button"
                  className="mobile-accordion-trigger"
                  onClick={() =>
                    setMobileAccordion(prev => (prev === 'shop' ? null : 'shop'))
                  }
                >
                  <span>SHOP</span>
                  <ChevronDown
                    size={16}
                    className={`mobile-chevron ${
                      mobileAccordion === 'shop' ? 'is-open' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'shop' && (
                  <ul className="mobile-submenu">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('All lamps')}
                      >
                        All Lamps
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Artisan Pieces')}
                      >
                        Artisan Pieces
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('New Designs')}
                      >
                        New Designs
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Custom Design')}
                      >
                        Custom Studio
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Wildlife Sculptures')}
                      >
                        Wildlife Sculptures
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Botanical & Trees')}
                      >
                        Botanical &amp; Trees
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Abstract & Contemporary')}
                      >
                        Abstract &amp; Contemporary
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Savanna Twilight Edit')}
                      >
                        Savanna Twilight Edit
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Floor Lamps')}
                      >
                        Floor Lamps
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Hanging Lamps')}
                      >
                        Hanging Lamps
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('Bedside & Table')}
                      >
                        Bedside &amp; Table
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelectFilter('The Arusha Capsule')}
                      >
                        The Arusha Capsule
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Accordion 2: EXPLORE */}
              <div className="mobile-nav-block">
                <button
                  type="button"
                  className="mobile-accordion-trigger"
                  onClick={() =>
                    setMobileAccordion(prev => (prev === 'explore' ? null : 'explore'))
                  }
                >
                  <span>EXPLORE</span>
                  <ChevronDown
                    size={16}
                    className={`mobile-chevron ${
                      mobileAccordion === 'explore' ? 'is-open' : ''
                    }`}
                  />
                </button>
                {mobileAccordion === 'explore' && (
                  <ul className="mobile-submenu">
                    <li>
                      <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        Contact &amp; Studio
                      </Link>
                    </li>
                    <li>
                      <Link to="/community" onClick={() => setIsMobileMenuOpen(false)}>
                        Community &amp; Outreach
                      </Link>
                    </li>
                    <li>
                      <Link to="/about#craft" onClick={() => setIsMobileMenuOpen(false)}>
                        Artisanal Craftsmanship
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Direct Wishlist Trigger */}
              <div className="mobile-nav-block">
                <button
                  type="button"
                  className="mobile-accordion-trigger"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openWishlist()
                  }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
                    <Bookmark size={16} strokeWidth={1.8} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
                    <span>SAVED WISHLAMPS</span>
                  </span>
                  <span className="frankie-counter">[{wishlistCount}]</span>
                </button>
              </div>

              {/* Mobile Footer Meta */}
              <div className="mobile-drawer-footer">
                <div className="mobile-region-pill">TZ / EN • ARUSHA, TANZANIA</div>
                <p>Authentic natural calabash lighting handcrafted to order.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default KineticNav
