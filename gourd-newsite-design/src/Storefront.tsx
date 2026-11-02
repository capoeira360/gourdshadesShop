import { useEffect, useState, useMemo, useRef } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'
import { products, type Product } from './data/products'
import {
  MaskedHeading,
  MaskedParagraph,
  RevealLine,
  ScrollEyebrowReveal,
  ScrollSpinStar,
  ScrollFadeReveal,
  ScrollImageReveal,
  SlideMaskCard,
  ParallaxImage,
} from './components/ScrollReveal'
import { GourdLogo } from './components/GourdLogo'
import './storefront.css'

const STUDIO_EMAIL = 'gourdshadestz@gmail.com'
const STUDIO_EMAIL_ALT = 'info@gourdshades.com'
const STUDIO_PHONE = '+255 746 754 878'
const STUDIO_PHONE_RAW = '255746754878'
const STUDIO_LOCATION = 'Arusha, Tanzania'
const STUDIO_HOURS = 'Mon - Sat: 9:00 AM - 5:00 PM'
const INSTAGRAM_URL = 'https://www.instagram.com/gourdshadestz?igsh=MTZteGx1OXR5Zno1NQ=='
const FACEBOOK_URL = 'https://www.facebook.com/gourdshadestz'

function formatCategory(category: string): string {
  if (category === 'new design') return 'New Design'
  if (category === 'collection') return 'Collection'
  if (category === 'piece') return 'Artisan Piece'
  return category
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ProductCard({
  product,
  index = 0,
}: {
  product: Product
  index?: number
}) {
  const cardRef = useRef<HTMLElement>(null)
  const [scrollState, setScrollState] = useState<'in-view' | 'below' | 'above'>('below')
  const primaryImage = product.images?.[0] || '/images/hero-editorial.png'

  useEffect(() => {
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
    <article ref={cardRef} className="product-card" data-scroll-state={scrollState}>
      <div className="product-card-inner">
        <Link
          to={`/products/${product.id}`}
          className="product-card-image"
          aria-label={`View ${product.name} handcrafted lamp`}
        >
          <img
            src={primaryImage}
            alt={`${product.name} handmade calabash lamp`}
            loading="lazy"
          />
          <span className="round-arrow">
            <ArrowUpRight size={21} strokeWidth={1.5} />
          </span>
        </Link>
        <div className="product-card-info">
          <div>
            <span className="eyebrow muted">
              {formatCategory(product.category)} / 0{index + 1}
            </span>
            <h3>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p>{product.description}</p>
          </div>
          <span className="price">{product.price}</span>
        </div>
      </div>
    </article>
  )
}

function Header({ count, openCart }: { count: number; openCart: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
        setVisible(true)
      }

      // Scrolling down past threshold -> hide
      if (currentScrollY > 80 && currentScrollY > lastScrollY && currentScrollY - lastScrollY > 4) {
        setVisible(false)
      }
      // Scrolling up -> reveal
      else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 4) {
        setVisible(true)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="announcement">
        HANDCRAFTED IN ARUSHA, TANZANIA <span>✳</span> NATURAL CALABASH & GOURD ARTISAN LIGHTING{' '}
        <span>✳</span> WORLDWIDE INQUIRIES & CUSTOM COMMISSIONS
      </div>
      <header
        className={`header ${visible ? 'header-visible' : 'header-hidden'} ${
          scrolled ? 'header-scrolled' : ''
        }`}
      >
        <Link className="wordmark" to="/" aria-label="Gourd Shades Home">
          <GourdLogo iconSize={52} />
        </Link>
        <nav
          className={menuOpen ? 'navigation is-open' : 'navigation'}
          aria-label="Main navigation"
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Lamps Collection</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/about">Our Story</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="header-actions">
          <button
            className="bag-button"
            onClick={openCart}
            aria-label={`Open inquiry bag with ${count} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.6} />
            <span>Inquiry Bag ({count})</span>
          </button>
          <button
            className="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <ScrollEyebrowReveal withLine>ARTISANAL CALABASH LIGHTING • ARUSHA, TANZANIA</ScrollEyebrowReveal>
          <MaskedHeading
            as="h2"
            lines={[
              <>Good things</>,
              <>take <em>shape.</em></>,
            ]}
            stagger={0.12}
          />
        </div>
        <Link className="footer-contact" to="/contact">
          Let’s talk about your space <ArrowUpRight size={30} strokeWidth={1.3} />
        </Link>
      </div>
      <div className="footer-bottom">
        <div>
          <Link className="footer-logo" to="/" aria-label="Gourd Shades Home">
            <GourdLogo iconSize={64} />
          </Link>
          <p className="footer-logo-note">
            Crafting unique lighting experiences with artisanal gourd-inspired designs. Handcrafted excellence from raw calabashes.
          </p>
          <div className="social-icons-row">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://wa.me/${STUDIO_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/products">All Lamps</Link>
          <Link to="/community">Community & Outreach</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Studio & Contact</Link>
          <a href={`mailto:${STUDIO_EMAIL}`}>gourdshadestz@gmail.com</a>
          <a href={`tel:${STUDIO_PHONE}`}>{STUDIO_PHONE}</a>
          <span>{STUDIO_LOCATION}</span>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Gourd Shades Artisan Lighting</span>
          <span>Studio: {STUDIO_HOURS}</span>
          <span>Arusha, Tanzania</span>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    video.play().catch(() => {
      // Autoplay with muted is allowed in modern browsers
    })
  }, [])

  const featuredLamps = useMemo(() => {
    const special = products.find(p => p.id === 'aura-new-design-lamp')
    const wildlife = products.find(p => p.id === 'african-wild-life-lamps')
    const woman = products.find(p => p.id === 'african-woman-crystal-prismatic-lamp')
    return [special, wildlife, woman].filter(Boolean) as Product[]
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-copy-top">
            <span className="eyebrow">
              <span className="asterisk">✳</span> ARTISANAL CALABASH LIGHTING
            </span>
            <span className="hero-edition">
              INDEPENDENT STUDIO
              <br />
              ARUSHA, TANZANIA
            </span>
          </div>
          <div className="hero-title-wrap">
            <MaskedHeading
              as="h1"
              lines={[
                <>Light with</>,
                <><span>a little</span></>,
                <><em>soul.</em></>,
              ]}
              delay={0.15}
              stagger={0.12}
            />
            <MaskedParagraph
              delay={0.4}
              stagger={0.12}
              lines={[
                "Handcrafted lamps carved from natural calabashes.",
                "Distinctive light patterns that turn any room into an intimate sanctuary."
              ]}
            />
            <Link to="/products" className="button-dark" style={{ marginTop: '24px' }}>
              Explore the collection <ArrowUpRight size={19} strokeWidth={1.7} />
            </Link>
          </div>
          <div className="hero-bottom">
            <span>01 / 26 &nbsp;—&nbsp; THE HANDMADE COLLECTION</span>
            <a href="#featured" aria-label="Scroll to featured collection">
              <ArrowDown size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <video
            ref={heroVideoRef}
            className="hero-video"
            src="/Artisan glow studio showcase.mp4"
            poster="/images/hero-video-poster.jpg"
            width={960}
            height={960}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div className="hero-image-label">
            <span>AURA GOURD LAMP</span>
            <span>HANDMADE IN TANZANIA</span>
          </div>
        </div>
      </section>

      <section className="intro-band">
        <ScrollEyebrowReveal withLine>FORM FOLLOWS FEELING</ScrollEyebrowReveal>
        <MaskedHeading
          as="p"
          lines={[
            <>Not just something you switch on.</>,
            <>Something you <em>come home to.</em></>,
          ]}
          stagger={0.14}
        />
        <ScrollSpinStar className="intro-symbol" />
      </section>

      <section id="featured" className="section featured-section">
        <div className="section-heading">
          <div>
            <ScrollEyebrowReveal withLine>01 / FEATURED CREATIONS</ScrollEyebrowReveal>
            <MaskedHeading
              as="h2"
              lines={[
                <>Find your</>,
                <><em>kind of glow.</em></>,
              ]}
              stagger={0.12}
            />
          </div>
          <div className="section-heading-side">
            <MaskedParagraph
              delay={0.2}
              stagger={0.12}
              lines={[
                "One at a time, sculpted by hand from dried gourds with crystal beads and intricate perforations.",
                "Meet lighting with a story to tell."
              ]}
            />
            <Link to="/products" className="text-link" style={{ marginTop: '20px' }}>
              Shop all {products.length} lamps <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="product-grid">
          {featuredLamps.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="story-preview">
        <div className="story-image">
          <ParallaxImage
            src="/images/background-replace.jpg"
            alt="Master artisan carving calabash lamp in Gourd Shades workshop"
            loading="lazy"
            fixed
            offset={['start end', 'end start']}
            yRange={['-2%', '2%']}
            scale={1.04}
          />
          <span className="image-caption">INSIDE THE ARUSHA WORKSHOP</span>
        </div>
        <div className="story-copy">
          <ScrollEyebrowReveal withLine>02 / THE ARTISAN WAY</ScrollEyebrowReveal>
          <MaskedHeading
            as="h2"
            lines={[
              <>Made by</>,
              <>hand. Made</>,
              <><em>to last.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "We believe the objects you live with should have life and character.",
              "Each lamp starts with a sustainable calabash grown in Tanzanian soils and ends with an illuminated sculpture tailored for your space."
            ]}
          />
          <Link to="/about" className="button-outline" style={{ marginTop: '28px' }}>
            Get to know our story <ArrowUpRight size={19} strokeWidth={1.7} />
          </Link>
          <ScrollSpinStar className="story-star" />
        </div>
      </section>

      <section className="values-strip">
        <ScrollFadeReveal delay={0.1}>
          <span className="value-num">01</span>
          <strong>Thoughtful by design</strong>
          <MaskedParagraph
            className="values-copy"
            delay={0.15}
            stagger={0.13}
            lines={[
              "Intricate carving and crystal glass beadwork",
              "that casts kaleidoscopic ambient patterns."
            ]}
          />
        </ScrollFadeReveal>
        <ScrollFadeReveal delay={0.2}>
          <span className="value-num">02</span>
          <strong>Handcrafted in small batches</strong>
          <MaskedParagraph
            className="values-copy"
            delay={0.2}
            stagger={0.13}
            lines={[
              "Never mass-manufactured.",
              "Every single gourd carries its own organic silhouette."
            ]}
          />
        </ScrollFadeReveal>
        <ScrollFadeReveal delay={0.3}>
          <span className="value-num">03</span>
          <strong>For everyday living</strong>
          <MaskedParagraph
            className="values-copy"
            delay={0.25}
            stagger={0.13}
            lines={[
              "Fitted with standard E27 fixtures",
              "and low-energy warm LED bulbs for longevity."
            ]}
          />
        </ScrollFadeReveal>
      </section>
    </main>
  )
}

function ProductsPage() {
  const [filter, setFilter] = useState('All lamps')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesFilter =
        filter === 'All lamps'
          ? true
          : filter === 'Artisan Pieces'
          ? p.category === 'piece'
          : filter === 'New Designs'
          ? p.category === 'new design'
          : filter === 'Collections'
          ? p.category === 'collection'
          : true

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [filter, searchQuery])

  return (
    <main className="listing-page">
      <section className="page-intro products-hero-bg">
        <ScrollEyebrowReveal withLine>01 / THE COLLECTION</ScrollEyebrowReveal>
        <div className="page-intro-row">
          <MaskedHeading
            as="h1"
            lines={[
              <>Good light.</>,
              <><em>Good living.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "Natural calabash lamps crafted with intention.",
              `Browse our complete catalog of ${products.length} handcrafted lighting pieces.`
            ]}
          />
        </div>
      </section>

      <section className="catalog section">
        <div className="catalog-search-wrap">
          <input
            type="text"
            className="catalog-search-input"
            placeholder="Search lamps (e.g. Wildlife, Crystal, Aura, Tree)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="catalog-bar">
          <span>
            THE COLLECTION{' '}
            <span className="catalog-count">({String(filtered.length).padStart(2, '0')})</span>
          </span>
          <div className="filters" aria-label="Filter products">
            {['All lamps', 'Artisan Pieces', 'New Designs', 'Collections'].map(f => (
              <button
                key={f}
                className={filter === f ? 'filter-active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--color-earth)' }}>No lamps found matching your search.</p>
            <button className="button-dark" onClick={() => { setSearchQuery(''); setFilter('All lamps'); }}>
              Reset filters
            </button>
          </div>
        ) : (
          <div className="product-grid catalog-grid">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function ProductDetail({ addToCart }: { addToCart: (id: string) => void }) {
  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Reset active image when id changes
  useEffect(() => {
    setActiveImageIndex(0)
    setIsFullscreen(false)
  }, [id])

  if (!product) {
    return (
      <main className="not-found">
        <h1>We couldn't find that lamp.</h1>
        <Link className="button-dark" to="/products">
          Back to the collection <ArrowRight size={18} />
        </Link>
      </main>
    )
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : ['/images/hero-editorial.png']
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0]
  const related = products.filter(p => p.id !== id && p.category === product.category).slice(0, 2)
  const fallbackRelated = related.length >= 2 ? related : products.filter(p => p.id !== id).slice(0, 2)

  // Keyboard navigation & body lock for fullscreen lightbox
  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen, galleryImages.length])

  const whatsappMessage = encodeURIComponent(
    `Hello Gourd Shades,\nI am interested in inquiring about the "${product.name}" lamp (ID: ${product.id}).\nPrice: ${product.price}\nPlease let me know about availability and order steps.`
  )

  const titleLines = useMemo(() => {
    const parts = product.name.trim().split(/\s+/)
    if (parts.length === 1) {
      return [<>{parts[0]}<span>.</span></>]
    }
    if (parts.length === 2) {
      return [
        <>{parts[0]}</>,
        <>{parts[1]}<span>.</span></>,
      ]
    }
    const mid = Math.ceil(parts.length / 2)
    return [
      <>{parts.slice(0, mid).join(' ')}</>,
      <>{parts.slice(mid).join(' ')}<span>.</span></>,
    ]
  }, [product.name])

  return (
    <main className="detail-page">
      <div className="detail-breadcrumb">
        <Link to="/products">
          <ArrowLeft size={16} /> Back to all lamps
        </Link>
        <span>
          {formatCategory(product.category).toUpperCase()} / {product.name.toUpperCase()}
        </span>
      </div>

      <div className="detail-layout">
        <div className="detail-gallery">
          <SlideMaskCard direction="left" delay={0.1}>
            <div
              className="detail-image"
              role="button"
              tabIndex={0}
              onClick={() => setIsFullscreen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsFullscreen(true)
                }
              }}
              aria-label={`View ${product.name} image full screen`}
              title="Click to view full screen"
            >
              <img
                key={activeImage}
                src={activeImage}
                alt={`${product.name} view ${activeImageIndex + 1}`}
              />
              <span className="detail-expand-hint">
                <Maximize2 size={12} /> View Fullscreen
              </span>
              {galleryImages.length > 1 && (
                <span className="detail-image-badge">
                  VIEW {activeImageIndex + 1} OF {galleryImages.length}
                </span>
              )}
            </div>
          </SlideMaskCard>

          {galleryImages.length > 1 && (
            <div className="detail-thumbnails" aria-label="Product image thumbnails">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`detail-thumb ${activeImageIndex === idx ? 'thumb-active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-copy">
          <ScrollEyebrowReveal withLine>
            HANDMADE LIGHTING / {formatCategory(product.category).toUpperCase()}
          </ScrollEyebrowReveal>
          <MaskedHeading
            as="h1"
            lines={titleLines}
          />
          <p className="detail-subtitle">Artisanal calabash craftsmanship</p>
          <span className="detail-price">{product.price}</span>

          <div className="detail-divider" />

          <MaskedParagraph
            className="detail-description"
            delay={0.1}
            stagger={0.1}
            text={product.description}
          />

          <ScrollFadeReveal className="detail-story-box" delay={0.1}>
            <h4>The Story & Craftsmanship</h4>
            <MaskedParagraph
              delay={0.2}
              stagger={0.1}
              text={product.longDescription}
            />
          </ScrollFadeReveal>

          {product.specifications && product.specifications.length > 0 && (
            <div className="detail-list">
              <span className="eyebrow">SPECIFICATIONS & DIMENSIONS</span>
              {product.specifications.map((item, idx) => (
                <div key={idx}>
                  <span className="small-star">✳</span> {item}
                </div>
              ))}
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="detail-list">
              <span className="eyebrow">ARTISANAL FEATURES</span>
              {product.features.map((item, idx) => (
                <div key={idx}>
                  <span className="small-star">✳</span> {item}
                </div>
              ))}
            </div>
          )}

          <div className="detail-actions-wrap">
            <button
              className="button-dark add-button"
              onClick={() => {
                addToCart(product.id)
                setAdded(true)
                setTimeout(() => setAdded(false), 2000)
              }}
            >
              {added ? (
                <>
                  Added to inquiry bag <Check size={19} />
                </>
              ) : (
                <>
                  Add to inquiry bag &nbsp;—&nbsp; {product.price}{' '}
                  <ArrowUpRight size={19} />
                </>
              )}
            </button>

            <a
              className="button-whatsapp"
              href={`https://wa.me/${STUDIO_PHONE_RAW}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> Inquire Directly via WhatsApp
            </a>
          </div>

          <div className="detail-studio-meta">
            <div>
              <strong>Studio Contact</strong>
              <a href={`tel:${STUDIO_PHONE}`}>{STUDIO_PHONE}</a>
            </div>
            <div>
              <strong>Studio Location</strong>
              <span>{STUDIO_LOCATION}</span>
            </div>
          </div>

          <p className="detail-footnote">
            Every lamp is handcrafted to order. Need custom dimensions or bespoke patterns?{' '}
            <Link to="/contact">Contact the studio.</Link>
          </p>
        </div>
      </div>

      <section className="section related-section">
        <div className="section-heading">
          <div>
            <ScrollEyebrowReveal withLine>EXPLORE MORE CREATIONS</ScrollEyebrowReveal>
            <MaskedHeading
              as="h2"
              lines={[
                <>You might</>,
                <><em>also love.</em></>,
              ]}
              stagger={0.12}
            />
          </div>
        </div>
        <div className="product-grid">
          {fallbackRelated.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fullscreen-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 0.65, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} full screen view`}
            onClick={() => setIsFullscreen(false)}
          >
            {/* Top Bar */}
            <div className="fullscreen-lightbox-bar" onClick={e => e.stopPropagation()}>
              <div className="fullscreen-lightbox-title">
                <span className="eyebrow muted">{formatCategory(product.category)}</span>
                <strong>{product.name}</strong>
              </div>

              {galleryImages.length > 1 && (
                <span className="fullscreen-lightbox-counter">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
              )}

              <button
                type="button"
                className="fullscreen-lightbox-close"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close full screen view"
              >
                <X size={18} />
                <span>CLOSE [ESC]</span>
              </button>
            </div>

            {/* Main Stage */}
            <div className="fullscreen-lightbox-stage" onClick={e => e.stopPropagation()}>
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  className="fullscreen-lightbox-nav prev"
                  onClick={e => {
                    e.stopPropagation()
                    setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              <motion.div
                key={activeImage}
                className="fullscreen-lightbox-image-wrap"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 0.65, 0.3, 1] }}
                onClick={() => setIsFullscreen(false)}
              >
                <img
                  src={activeImage}
                  alt={`${product.name} large view ${activeImageIndex + 1}`}
                  className="fullscreen-lightbox-img"
                  onClick={e => e.stopPropagation()}
                />
              </motion.div>

              {galleryImages.length > 1 && (
                <button
                  type="button"
                  className="fullscreen-lightbox-nav next"
                  onClick={e => {
                    e.stopPropagation()
                    setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="fullscreen-lightbox-strip" onClick={e => e.stopPropagation()}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`fullscreen-lightbox-thumb ${activeImageIndex === idx ? 'thumb-active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function About() {
  return (
    <main className="about-page">
      <section className="page-intro about-intro">
        <ScrollEyebrowReveal withLine>02 / OUR STORY</ScrollEyebrowReveal>
        <div className="page-intro-row">
          <MaskedHeading
            as="h1"
            lines={[
              <>There’s a story</>,
              <>in <em>every shape.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "We are an artisanal lighting studio based in Arusha, Tanzania,",
              "transforming natural dried calabashes into functional illuminated art."
            ]}
          />
        </div>
      </section>

      <section className="about-hero-image">
        <ParallaxImage
          src="/images/image-wm-about.jpg"
          alt="Portrait of Isaac Munis, founder and artisan of Gourd Shades in Arusha, Tanzania"
          loading="lazy"
          fixed
          offset={['start end', 'end start']}
          yRange={['-2%', '2%']}
          scale={1.04}
        />
        <div className="about-image-overlay">
          <span>ISAAC MUNIS &nbsp;•&nbsp; FOUNDER & MASTER ARTISAN</span>
          <span>GOURD SHADES / ARUSHA, TANZANIA</span>
        </div>
      </section>

      <section className="about-content">
        <div>
          <ScrollEyebrowReveal withLine>A NOTE FROM THE ARTISAN</ScrollEyebrowReveal>
          <MaskedHeading
            as="h2"
            lines={[
              <>We make light</>,
              <>you can <em>feel.</em></>,
            ]}
            stagger={0.12}
          />
          <ScrollFadeReveal className="about-maker-meta" delay={0.2}>
            <strong>Isaac Munis</strong>
            <span>Founder &amp; Artisan &nbsp;•&nbsp; Arusha, Tanzania &nbsp;•&nbsp; Est. 2020</span>
          </ScrollFadeReveal>
        </div>
        <div className="about-paragraphs">
          <MaskedParagraph
            delay={0.1}
            stagger={0.12}
            lines={[
              "My name is Isaac Munis, born and raised in Arusha, Tanzania.",
              "From a very young age, I have been deeply passionate about handcraft — building and shaping new creations out of discarded materials and whatever I could gather from the streets around me."
            ]}
          />
          <MaskedParagraph
            delay={0.2}
            stagger={0.12}
            lines={[
              "I began carving gourd lamps in 2020 as a part-time pursuit, and six years later it has grown into my full-time studio and life’s work.",
              "While every calabash still teaches me something new, my ambition is unwavering: to refine this craft every day and stand among the finest gourd lighting artisans in the world."
            ]}
          />
          <MaskedParagraph
            delay={0.3}
            stagger={0.12}
            lines={[
              "I believe exceptional lighting transforms not just rooms, but the way people live, work, and connect.",
              "Through thoughtful design, intricate hand-perforations, and crystal glass beadwork, my mission is to bring warmth, beauty, and lasting character to every space we illuminate."
            ]}
          />
          <span className="signature">With warmth &amp; light, &nbsp; Isaac Munis — Gourd Shades Studio</span>
        </div>
      </section>

      <section className="about-origin-extension">
        <div className="about-origin-gallery">
          <SlideMaskCard direction="left" delay={0.1}>
            <figure className="about-origin-figure">
              <div className="about-origin-img-wrap">
                <img
                  src="/images/about-gourd-in a farm3.jpeg"
                  alt="Natural calabash gourd growing on a farm in Tanzania"
                  loading="lazy"
                />
              </div>
              <figcaption className="about-origin-caption">
                <span>01 / IN THE FIELD</span>
                <strong>Organic gourd growing on the farm</strong>
              </figcaption>
            </figure>
          </SlideMaskCard>

          <SlideMaskCard direction="right" delay={0.2}>
            <figure className="about-origin-figure">
              <div className="about-origin-img-wrap">
                <img
                  src="/images/about-first-lamp.jpeg"
                  alt="The very first handcrafted gourd lampshade created by Isaac Munis"
                  loading="lazy"
                />
              </div>
              <figcaption className="about-origin-caption">
                <span>02 / THE FIRST LAMP</span>
                <strong>The friend’s lampshade that started it all</strong>
              </figcaption>
            </figure>
          </SlideMaskCard>
        </div>

        <div className="about-origin-copy">
          <ScrollEyebrowReveal withLine>ROOTS &amp; THE FIRST SPARK</ScrollEyebrowReveal>
          <MaskedHeading
            as="h2"
            lines={[
              <>From the farm to</>,
              <>the <em>first glow.</em></>,
            ]}
            stagger={0.12}
          />
          <div className="about-origin-notes">
            <ScrollFadeReveal className="about-origin-note" delay={0.1}>
              <span className="eyebrow">01 / CULTURAL HERITAGE</span>
              <h3>Reimagining the traditional calabash.</h3>
              <MaskedParagraph
                delay={0.15}
                stagger={0.12}
                lines={[
                  "For generations across Tanzania, natural calabashes and gourds have been cherished in daily life as vessels for storing water, seeds, and fresh milk.",
                  "A core objective of my work is to awaken a new appreciation across my country and beyond for what this humble organic material can become when sculpted with light."
                ]}
              />
            </ScrollFadeReveal>

            <ScrollFadeReveal className="about-origin-note" delay={0.2}>
              <span className="eyebrow">02 / DISCOVERING GOURD CRAFT</span>
              <h3>The first lampshade for a friend.</h3>
              <MaskedParagraph
                delay={0.2}
                stagger={0.12}
                lines={[
                  "I discovered gourd artistry while experimenting with different handcraft ideas, carving my very first calabash lampshade as a commission for a friend.",
                  "Seeing the warm, perforated glow of that first piece — and the overwhelming joy and encouragement from everyone who saw it — sparked the journey that became Gourd Shades."
                ]}
              />
            </ScrollFadeReveal>
          </div>
        </div>
      </section>

      {/* Values Strip */}
      <section className="values-strip about-values-strip">
        <ScrollFadeReveal delay={0.1}>
          <span className="value-num">01 /</span>
          <strong>Natural materials.</strong>
          <MaskedParagraph
            className="values-copy"
            delay={0.15}
            stagger={0.13}
            lines={[
              "100% biodegradable organic calabashes harvested sustainably in Tanzania,",
              "paired with durable electrical fittings."
            ]}
          />
        </ScrollFadeReveal>
        <ScrollFadeReveal delay={0.2}>
          <span className="value-num">02 /</span>
          <strong>Artisanal patience.</strong>
          <MaskedParagraph
            className="values-copy"
            delay={0.2}
            stagger={0.13}
            lines={[
              "Each lamp takes days of careful hand-carving and crystal bead setting.",
              "We never rush the creative process."
            ]}
          />
        </ScrollFadeReveal>
        <ScrollFadeReveal delay={0.3}>
          <span className="value-num">03 /</span>
          <strong>Living ambient art.</strong>
          <MaskedParagraph
            className="values-copy"
            delay={0.25}
            stagger={0.13}
            lines={[
              "Our lamps do not just brighten a room — they create an atmosphere,",
              "casting delicate shadows across your living space."
            ]}
          />
        </ScrollFadeReveal>
      </section>


    </main>
  )
}

const outreachImages = [
  '/images/20241018_094717-reach-1-.jpg',
  '/images/20240913_145501-reach-2-.jpg',
  '/images/20240906_130827-reach-3-.jpg',
  '/images/20240828_101915-reach-4.jpg',
  '/images/20240913_142936-reach-5-.jpg',
]

const exhibitionImages = [
  '/images/IMG-20250601-WA0002-exhibition-1.jpg',
  '/images/20240525_105359-exhibition-2-.jpg',
  '/images/20240525_105410-exhibition-3-.jpg',
  '/images/IMG-20250601-WA0008-exhibition-4.jpg',
  '/images/IMG-20250601-WA0006-exhibition-5.jpg',
]

function Community() {
  const [outreachIndex, setOutreachIndex] = useState(0)
  const [exhibitionIndex, setExhibitionIndex] = useState(0)

  const nextOutreach = () => setOutreachIndex(prev => (prev + 1) % outreachImages.length)
  const prevOutreach = () => setOutreachIndex(prev => (prev - 1 + outreachImages.length) % outreachImages.length)

  const nextExhibition = () => setExhibitionIndex(prev => (prev + 1) % exhibitionImages.length)
  const prevExhibition = () => setExhibitionIndex(prev => (prev - 1 + exhibitionImages.length) % exhibitionImages.length)

  return (
    <main className="community-page">
      <section className="page-intro community-hero-bg">
        <ScrollEyebrowReveal withLine>03 / SOCIAL IMPACT & CULTURE</ScrollEyebrowReveal>
        <div className="page-intro-row">
          <MaskedHeading
            as="h1"
            lines={[
              <>Creativity with</>,
              <>a <em>purpose.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "Beyond illuminating living spaces, Gourd Shades is committed to empowering our local community,",
              "sharing artisan skills, and celebrating Tanzanian craftsmanship on national platforms."
            ]}
          />
        </div>
      </section>

      {/* Chapter 01: Outreach */}
      <section className="community-section">
        <div className="community-grid">
          <SlideMaskCard direction="left" delay={0.15} className="community-slide-card">
            <div className="community-visual">
              <img
                key={outreachImages[outreachIndex]}
                src={outreachImages[outreachIndex]}
                alt={`Gourd Shades community outreach workshop image ${outreachIndex + 1}`}
              />
              <div className="community-gallery-nav">
                <div className="community-nav-btns">
                  <button
                    type="button"
                    className="community-nav-btn"
                    onClick={prevOutreach}
                    aria-label="Previous outreach photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="community-nav-btn"
                    onClick={nextOutreach}
                    aria-label="Next outreach photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <span className="community-gallery-counter">
                  WORKSHOP {outreachIndex + 1} / {outreachImages.length}
                </span>
              </div>

              <div className="community-thumbnails">
                {outreachImages.map((src, i) => (
                  <button
                    key={i}
                    className={`community-thumb ${outreachIndex === i ? 'thumb-active' : ''}`}
                    onClick={() => setOutreachIndex(i)}
                    aria-label={`View outreach photo ${i + 1}`}
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </SlideMaskCard>

          <div className="community-copy">
            <span className="community-tag">COMMUNITY OUTREACH & INCLUSION</span>
            <ScrollEyebrowReveal withLine>01 / SKILL SHARING & EMPOWERMENT</ScrollEyebrowReveal>
            <MaskedHeading
              as="h2"
              lines={[
                <>Unlocking creative</>,
                <>potential <em>together.</em></>,
              ]}
              stagger={0.12}
            />
            <MaskedParagraph
              delay={0.15}
              stagger={0.12}
              lines={[
                "I am truly grateful for the creative talent I have been blessed with, and I am deeply passionate about sharing my knowledge with those eager to learn and grow.",
                "One of the most rewarding milestones in our journey has been our active collaboration with The Hidden Hope Foundation in Karatu — an organization dedicated to empowering people with disabilities."
              ]}
            />
            <MaskedParagraph
              delay={0.25}
              stagger={0.12}
              lines={[
                "Through hands-on creative development programs, we have had the privilege of teaching, mentoring, and inspiring this remarkable group —",
                "unlocking practical artistic capabilities, fostering confidence, and opening economic avenues through craft."
              ]}
            />
            <ScrollFadeReveal className="community-quote" delay={0.3}>
              <MaskedParagraph
                delay={0.35}
                stagger={0.12}
                lines={[
                  `"I firmly believe in the transformative power of creativity and education,`,
                  `especially when it reaches communities that face unique challenges."`
                ]}
              />
            </ScrollFadeReveal>
            <MaskedParagraph
              delay={0.35}
              stagger={0.1}
              lines={[
                "We are constantly seeking new partnerships with organizations, NGOs, and educational groups that value inclusivity, empowerment, and creative skill-building."
              ]}
            />
            <Link to="/contact" className="text-link" style={{ marginTop: '16px' }}>
              Partner on a workshop with us <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Chapter 02: Exhibitions */}
      <section className="community-section">
        <div className="community-grid reversed">
          <SlideMaskCard direction="right" delay={0.15} className="community-slide-card">
            <div className="community-visual">
              <img
                key={exhibitionImages[exhibitionIndex]}
                src={exhibitionImages[exhibitionIndex]}
                alt={`Gourd Shades exhibition showcase image ${exhibitionIndex + 1}`}
              />
              <div className="community-gallery-nav">
                <div className="community-nav-btns">
                  <button
                    type="button"
                    className="community-nav-btn"
                    onClick={prevExhibition}
                    aria-label="Previous exhibition photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="community-nav-btn"
                    onClick={nextExhibition}
                    aria-label="Next exhibition photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <span className="community-gallery-counter">
                  EXHIBITION {exhibitionIndex + 1} / {exhibitionImages.length}
                </span>
              </div>

              <div className="community-thumbnails">
                {exhibitionImages.map((src, i) => (
                  <button
                    key={i}
                    className={`community-thumb ${exhibitionIndex === i ? 'thumb-active' : ''}`}
                    onClick={() => setExhibitionIndex(i)}
                    aria-label={`View exhibition photo ${i + 1}`}
                  >
                    <img src={src} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </SlideMaskCard>

          <div className="community-copy">
            <span className="community-tag">CULTURAL SHOWCASE & HERITAGE</span>
            <ScrollEyebrowReveal withLine>02 / EXHIBITIONS ACROSS TANZANIA</ScrollEyebrowReveal>
            <MaskedHeading
              as="h2"
              lines={[
                <>Celebrating Tanzanian</>,
                <>craft on <em>every stage.</em></>,
              ]}
              stagger={0.12}
            />
            <MaskedParagraph
              delay={0.15}
              stagger={0.12}
              lines={[
                "Gourd Shades actively participates in major cultural and design exhibitions across Tanzania, with a dedicated presence in Dar es Salaam.",
                "For over three consecutive years, we have proudly exhibited at the renowned Artisan Market, taking part in both annual editions each year."
              ]}
            />
            <MaskedParagraph
              delay={0.25}
              stagger={0.12}
              lines={[
                "These vibrant platforms allow us to showcase handcrafted calabash illumination to thousands of international and local art enthusiasts,",
                "connect with fellow master craftsmen, and foster appreciation for sustainable African decorative arts."
              ]}
            />
            <ScrollFadeReveal className="community-quote" delay={0.3}>
              <MaskedParagraph
                delay={0.35}
                stagger={0.12}
                lines={[
                  `"Being part of these platforms enriches our artistic journey`,
                  `and deepens our reverence for the diverse craftsmanship and living heritage of Tanzania."`
                ]}
              />
            </ScrollFadeReveal>
            <Link to="/products" className="text-link" style={{ marginTop: '16px' }}>
              Explore our exhibited collections <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Strip */}
      <section className="values-strip">
        <ScrollFadeReveal delay={0.1}>
          <span>01</span>
          <strong>Inclusive Mentorship</strong>
          <MaskedParagraph
            delay={0.15}
            stagger={0.13}
            lines={[
              "Teaching sustainable craft techniques to marginalized groups",
              "and people with disabilities."
            ]}
          />
        </ScrollFadeReveal>
        <ScrollFadeReveal delay={0.2}>
          <span>02</span>
          <strong>Cultural Preservation</strong>
          <MaskedParagraph
            delay={0.2}
            stagger={0.13}
            lines={[
              "Preserving ancestral East African calabash traditions",
              "through contemporary functional lighting."
            ]}
          />
        </ScrollFadeReveal>
        <ScrollFadeReveal delay={0.3}>
          <span>03</span>
          <strong>Local Sourcing & Growth</strong>
          <MaskedParagraph
            delay={0.25}
            stagger={0.13}
            lines={[
              "Sourcing dried gourds directly from regional Tanzanian farmers,",
              "supporting local rural families."
            ]}
          />
        </ScrollFadeReveal>
      </section>


    </main>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  function send(e: React.FormEvent) {
    e.preventDefault()
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Website Visitor'
    const body = `Hello Gourd Shades,\n\n${message}\n\nFrom: ${fullName}\nEmail: ${email}\nPhone/WhatsApp: ${phone || 'Not provided'}\n\nSent via gourdshades.com`
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
      `Gourd Shades Inquiry from ${fullName}`
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <main className="contact-page">
      <section className="page-intro contact-intro contact-hero-bg">
        <ScrollEyebrowReveal withLine>03 / GET IN TOUCH</ScrollEyebrowReveal>
        <div className="page-intro-row">
          <MaskedHeading
            as="h1"
            lines={[
              <>Let's make</>,
              <><em>something glow.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "Have a question about a specific lamp? Want to commission a bespoke pattern or arrange worldwide shipping?",
              "We'd love to hear from you."
            ]}
          />
        </div>
      </section>

      {/* Redesigned Contact Form Section (Split Editorial Style) */}
      <section className="contact-editorial-section">
        <div className="contact-editorial-container">
          {/* Left Column: Artisan Craft Visual */}
          <div className="contact-editorial-visual-wrap">
            <SlideMaskCard direction="left" delay={0.15}>
              <div className="contact-editorial-visual">
                <img
                  src="/images/IMG-20250529-WA0007-nav-contacts.jpg"
                  alt="Artisan handcrafting calabash gourd lamp"
                />
              </div>
            </SlideMaskCard>
          </div>

          {/* Right Column: Form Area */}
          <div className="contact-editorial-form-wrap">
            <h2 className="contact-editorial-title">GET IN TOUCH</h2>
            <p className="contact-editorial-subtitle">
              For inquiries, bespoke commissions, or collaborations, feel free to reach out to discuss your lighting vision.
            </p>

            <form className="contact-editorial-form" onSubmit={send}>
              <div className="contact-name-row">
                <div className="contact-field-group">
                  <label htmlFor="contact-first-name">
                    First name <span>*</span>
                  </label>
                  <input
                    id="contact-first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="e.g. Sarah"
                  />
                </div>
                <div className="contact-field-group">
                  <label htmlFor="contact-last-name">Last name</label>
                  <input
                    id="contact-last-name"
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="e.g. Jenkins"
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-email">
                  Email <span>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-phone">Phone / WhatsApp (Optional)</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+255 754 570 491"
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message">
                  Write a message <span>*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about the lamp you're interested in or the space you're looking to illuminate..."
                />
              </div>

              <div className="contact-form-actions">
                <button type="submit" className="contact-pill-btn">
                  Submit
                </button>
              </div>

              {sent && (
                <p className="contact-form-success">
                  ✓ Your email client should open with your inquiry ready to send. If not, email us directly at {STUDIO_EMAIL}.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

function CartDrawer({
  open,
  close,
  items,
  add,
  remove,
}: {
  open: boolean
  close: () => void
  items: Record<string, number>
  add: (id: string) => void
  remove: (id: string) => void
}) {
  const entries = products.filter(p => items[p.id] > 0)
  const count = entries.reduce((sum, p) => sum + items[p.id], 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const orderText = `Hello Gourd Shades,\n\nI would like to inquire about ordering the following handcrafted lamps:\n\n${entries
    .map(p => `- ${p.name} (${productPriceDisplay(p.price)}) × ${items[p.id]} unit(s) [ID: ${p.id}]`)
    .join('\n')}\n\nTotal Items: ${count}\n\nPlease advise on current availability, shipping options to my location, and payment details.\n\nThank you!`

  function productPriceDisplay(p: string) {
    return p
  }

  const whatsappInquiryText = encodeURIComponent(
    `Hello Gourd Shades,\nI would like to inquire about ordering:\n${entries
      .map(p => `- ${p.name} × ${items[p.id]}`)
      .join('\n')}\nTotal Items: ${count}.\nPlease advise on availability and shipping.`
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Inquiry bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">YOUR INQUIRY SELECTION</span>
                <h2>
                  Your Bag <span>({count})</span>
                </h2>
              </div>
              <button onClick={close} aria-label="Close bag">
                <X size={25} strokeWidth={1.5} />
              </button>
            </div>

            {entries.length ? (
              <>
                <div className="cart-items">
                  {entries.map(p => (
                    <div className="cart-item" key={p.id}>
                      <img
                        src={p.images?.[0] || '/images/hero-editorial.png'}
                        alt={p.name}
                      />
                      <div className="cart-item-info">
                        <span className="eyebrow">{formatCategory(p.category)}</span>
                        <h3>{p.name}</h3>
                        <p>{p.price}</p>
                        <div className="quantity">
                          <button
                            onClick={() => remove(p.id)}
                            aria-label={`Remove one ${p.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{items[p.id]}</span>
                          <button
                            onClick={() => add(p.id)}
                            aria-label={`Add one ${p.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="drawer-bottom">
                  <div className="subtotal">
                    <span>Selected Lamps</span>
                    <strong>{count} {count === 1 ? 'piece' : 'pieces'}</strong>
                  </div>
                  <p>Shipping and custom specifications are confirmed when you place your inquiry request.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      className="button-dark"
                      href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
                        'Order Inquiry — Gourd Shades'
                      )}&body=${encodeURIComponent(orderText)}`}
                    >
                      Email Inquiry to Studio <ArrowUpRight size={19} />
                    </a>

                    <a
                      className="button-whatsapp"
                      href={`https://wa.me/${STUDIO_PHONE_RAW}?text=${whatsappInquiryText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={18} /> Send Inquiry via WhatsApp
                    </a>
                  </div>
                  <span className="checkout-note">
                    Direct studio response from Arusha, Tanzania within 24 hours.
                  </span>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span>✳</span>
                <h3>Nothing in here yet.</h3>
                <p>Explore our handcrafted calabash collection to find your piece.</p>
                <Link to="/products" className="button-dark" onClick={close}>
                  Explore the collection <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Storefront() {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('gourd-shades-bag') || '{}')
    } catch {
      return {}
    }
  })
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('gourd-shades-bag', JSON.stringify(cart))
  }, [cart])

  function add(id: string) {
    setCart(current => ({ ...current, [id]: (current[id] || 0) + 1 }))
    setCartOpen(true)
  }

  function remove(id: string) {
    setCart(current => ({ ...current, [id]: Math.max(0, (current[id] || 0) - 1) }))
  }

  const count = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header count={count} openCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={add} />} />
        <Route path="/community" element={<Community />} />
        <Route path="/services" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>Looks like you've taken a wrong turn.</h1>
              <Link to="/" className="button-dark">
                Back home <ArrowRight size={18} />
              </Link>
            </main>
          }
        />
      </Routes>
      <Footer />
      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        items={cart}
        add={add}
        remove={remove}
      />
    </BrowserRouter>
  )
}

export default Storefront
