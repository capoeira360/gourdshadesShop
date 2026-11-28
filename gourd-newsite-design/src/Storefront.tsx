import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
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
  Trash2,
  X,
} from 'lucide-react'
import { ProductProvider, useProductStore, type Product } from './context/ProductContext'
import { AdminPortal } from './components/AdminPortal'
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
import { KineticNav } from './components/KineticNav'
import { PrivacyPolicy, Disclaimer } from './components/LegalPages'
import { CookieConsent } from './components/CookieConsent'
import { CategoryShowcase } from './components/CategoryShowcase'
import { GalleryShowcase } from './components/GalleryShowcase'
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
  const secondaryImage =
    product.images && product.images.length > 1
      ? product.images[1]
      : null

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

  const isSold = product.availabilityStatus === 'sold'

  return (
    <article ref={cardRef} className="product-card" data-scroll-state={scrollState}>
      <div className="product-card-inner">
        <div className="product-card-image-wrap">
          <Link
            to={`/products/${product.id}`}
            className="product-card-image"
            aria-label={`View ${product.name} handcrafted lamp`}
          >
            <img
              src={primaryImage}
              alt={`${product.name} handmade calabash lamp`}
              className="product-card-img product-card-img-primary"
              loading="lazy"
            />
            {secondaryImage && secondaryImage !== primaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                className="product-card-img product-card-img-secondary"
                loading="lazy"
                aria-hidden="true"
              />
            )}
            <span className="round-arrow">
              <ArrowUpRight size={21} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
        <div className="product-card-info">
          <div>
            <span className="eyebrow muted">
              {product.subCategory || formatCategory(product.category)}
            </span>
            <h3>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p>{product.description}</p>
          </div>
          {isSold ? (
            <span className="price price-sold">Sold • Inquire Shape</span>
          ) : (
            <span className="price">{product.price}</span>
          )}
        </div>
      </div>
    </article>
  )
}

function Header({ count, openCart }: { count: number; openCart: () => void }) {
  return <KineticNav cartCount={count} onOpenCart={openCart} />
}

function Footer() {
  return (
    <footer className="footer" data-logo-theme="red">
      <div className="footer-top">
        <div>
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
            <GourdLogo />
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
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <button
            type="button"
            className="footer-cookie-trigger"
            onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-preferences'))}
          >
            Cookie Preferences
          </button>
          <a href={`mailto:${STUDIO_EMAIL}`}>gourdshadestz@gmail.com</a>
          <a href={`tel:${STUDIO_PHONE}`}>{STUDIO_PHONE}</a>
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
  const { products } = useProductStore()
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    video.play().catch(() => {
      // Autoplay with muted is allowed in modern browsers
    })
  }, [])

  const popularLamps = useMemo(() => {
    const wildlife = products.find(p => p.id === 'african-wild-life-lamps')
    const woman = products.find(p => p.id === 'african-woman-crystal-prismatic-lamp')
    const familyTree = products.find(p => p.id === 'family-tree-stand-lamp')
    return [wildlife, woman, familyTree].filter(Boolean) as Product[]
  }, [products])

  const newEntryLamps = useMemo(() => {
    const priorityIds = [
      'ndovu-calabash-lamp',
      'butterfly-dreams-lamp',
      'coral-calabash-lamp',
      'hanging-draw-lamp',
      'sculptured-tri-lamp',
      '3-way-hanging-family-lamp',
      'aura-new-design-lamp',
      'comfort-new-design-lamp',
      'luster-new-design-lamp',
      'pembe-tatu-new-design-lamp',
    ]
    return priorityIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean) as Product[]
  }, [products])

  const newEntriesScrollRef = useRef<HTMLDivElement>(null)

  const scrollNewEntries = (direction: 'left' | 'right') => {
    const el = newEntriesScrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.product-card')
    const cardWidth = card ? card.offsetWidth : 300
    const scrollAmount = (cardWidth + 24) * 1.5
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-copy" data-logo-theme="red">
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
          {/* Featured studio image in custom hero frame */}
          <div className="hero-feature-frame" aria-label="Handcrafted calabash lamp">
            <img
              src="/images/hero-og.jpeg"
              alt="Handcrafted calabash lamp"
              className="hero-feature-img"
              width={1920}
              height={2560}
              loading="eager"
            />
          </div>
          <div className="hero-bottom">
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
        </div>
      </section>

      <section className="intro-band" data-logo-theme="white">
        <MaskedHeading
          as="p"
          className="intro-band-note"
          lines={[
            <>Not just something you switch on.</>,
            <>Something you <em>come home to.</em></>,
          ]}
          stagger={0.14}
        />
      </section>

      {/* Editorial Lookbook Category Strip (Interactive Hover Expansion) */}
      <CategoryShowcase />

      {/* Most Popular Designs */}
      <section id="featured" className="section featured-section popular-section" data-logo-theme="white">
        <div className="collection-header-row">
          <h2 className="collection-header-title">
            Most Popular <em>Designs.</em>
          </h2>
          <Link to="/products" className="collection-header-link">
            Shop all lamps <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="product-grid">
          {popularLamps.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* New Entries Horizontal Scroll Track */}
      <section id="new-designs" className="section new-designs-section" data-logo-theme="white">
        <div className="collection-header-row">
          <h2 className="collection-header-title">
            New <em>Entries.</em>
          </h2>
          <div className="carousel-nav-arrows" aria-label="Scroll new entries">
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={() => scrollNewEntries('left')}
              aria-label="Previous entries"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={() => scrollNewEntries('right')}
              aria-label="Next entries"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
        <div
          ref={newEntriesScrollRef}
          className="new-entries-scroll-wrapper"
          tabIndex={0}
          role="region"
          aria-label="Horizontal scrollable new entries"
        >
          <div className="new-entries-track">
            {newEntryLamps.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="story-preview">
        <div className="story-image" data-logo-theme="dark">
          <ParallaxImage
            src="/images/background-replace.jpg"
            alt="Master artisan carving calabash lamp in Gourd Shades workshop"
            loading="lazy"
            fixed
            offset={['start end', 'end start']}
            yRange={['-2%', '2%']}
            scale={1.04}
          />
        </div>
        <div className="story-copy" data-logo-theme="white">
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

      {/* Craft & Exhibition Gallery Section (Infinite Scrolling Lookbook) */}
      <GalleryShowcase />

      <section className="values-strip" data-logo-theme="white">
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

function checkLampFilterMatch(p: Product, activeFilter: string): boolean {
  if (!activeFilter || activeFilter === 'All lamps' || activeFilter === 'All Lamps' || activeFilter === 'all') {
    return true
  }

  const f = activeFilter.trim().toLowerCase()

  if (f === 'new entries' || f === 'new in') {
    return (
      [
        'ndovu-calabash-lamp',
        'butterfly-dreams-lamp',
        'coral-calabash-lamp',
        'hanging-draw-lamp',
        'sculptured-tri-lamp',
        '3-way-hanging-family-lamp',
        'aura-new-design-lamp',
        'comfort-new-design-lamp',
        'luster-new-design-lamp',
        'pembe-tatu-new-design-lamp',
      ].includes(p.id) || p.category === 'new design'
    )
  }

  if (f === 'artisan pieces') {
    return p.category === 'piece'
  }

  if (f === 'new designs') {
    return p.category === 'new design' || Boolean(p.subCategory && p.subCategory.toLowerCase() === 'new designs')
  }

  if (f === 'custom studio' || f === 'custom design' || f === 'bespoke commissions') {
    return (
      p.id === 'bespoke-custom-design-lamp' ||
      Boolean(p.subCategory && p.subCategory.toLowerCase() === 'custom design') ||
      p.name.toLowerCase().includes('custom')
    )
  }

  if (f === 'wildlife sculptures' || f === 'wildlife & nature' || f === 'wildlife') {
    const sub = (p.subCategory || '').toLowerCase()
    return sub.includes('wildlife')
  }

  if (f === 'botanical & trees' || f === 'botanical') {
    const sub = (p.subCategory || '').toLowerCase()
    return sub.includes('botanical') || sub.includes('tree')
  }

  if (f === 'abstract & contemporary' || f === 'abstract') {
    const sub = (p.subCategory || '').toLowerCase()
    return sub.includes('abstract')
  }

  if (f === 'floor lamps' || f === 'floor') {
    const sub = (p.subCategory || '').toLowerCase()
    return sub.includes('floor')
  }

  if (f === 'hanging lamps' || f === 'architectural pendants' || f === 'hanging') {
    const sub = (p.subCategory || '').toLowerCase()
    return sub.includes('hanging')
  }

  if (
    f === 'bedside & table' ||
    f === 'bedside & table lamps' ||
    f === 'bedside' ||
    f === 'table lamps' ||
    f === 'standing bed side'
  ) {
    const sub = (p.subCategory || '').toLowerCase()
    return (
      sub.includes('bedside') ||
      sub.includes('table') ||
      p.id === 'standing-bedside-lamp' ||
      p.id === 'harmonious-balanced-serene-lighting'
    )
  }

  if (f === 'wall lamps' || f === 'wall') {
    const sub = (p.subCategory || '').toLowerCase()
    return sub.includes('wall')
  }

  if (f === 'savanna twilight edit' || f === 'savanna twilight') {
    return [
      'african-wild-life-lamps',
      'savanna-sunset-ecosystem-lamp',
      'lion-king-majestic-artisanal-lamp',
      'baobab-tree-of-life-earth-design',
      'cheetah-speed-modern-artistry-lamp',
      'ndovu-calabash-lamp',
      'african-rhino-heritage-carving-lamp',
      'young-lion-roar-duality-lamp',
      'big-five-animal-faces-lamp',
      'posing-zebra-gourd-lamp',
      'buffalo-metropolitan-modern-lamp',
    ].includes(p.id)
  }

  if (f === 'the arusha capsule' || f === 'arusha capsule') {
    return [
      'african-woman-crystal-prismatic-lamp',
      'sophisticated-abstract-crystal-lighting',
      'trees-for-life-lamp',
      'baobab-tree-of-life-earth-design',
      'aura-new-design-lamp',
      'comfort-new-design-lamp',
      'luster-new-design-lamp',
      'pembe-tatu-new-design-lamp',
      'ndovu-calabash-lamp',
    ].includes(p.id)
  }

  if (f === 'collections') {
    return p.category === 'collection'
  }

  const sub = (p.subCategory || '').toLowerCase()
  const cat = (p.category || '').toLowerCase()
  return sub === f || cat === f || sub.includes(f)
}

const CATALOG_PILL_FILTERS = [
  'All lamps',
  'Artisan Pieces',
  'New Designs',
  'Wildlife Sculptures',
  'Botanical & Trees',
  'Abstract & Contemporary',
  'Floor Lamps',
  'Hanging Lamps',
  'Bedside & Table',
]

function ProductsPage() {
  const { products } = useProductStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [filter, setFilter] = useState(() => {
    return new URLSearchParams(location.search).get('filter') || 'All lamps'
  })
  const [searchQuery, setSearchQuery] = useState(() => {
    return new URLSearchParams(location.search).get('search') || ''
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('search')
    if (q !== null) {
      setSearchQuery(q)
    }
    const f = params.get('filter')
    if (f !== null) {
      setFilter(f)
      setTimeout(() => {
        const el = document.getElementById('catalog-section')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 120)
    }
  }, [location.search])

  const handleFilterClick = (f: string) => {
    setFilter(f)
    navigate(`/products?filter=${encodeURIComponent(f)}`, { replace: true })
  }

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesFilter = checkLampFilterMatch(p, filter)

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesFilter && matchesSearch
    })
  }, [filter, searchQuery, products])

  const normalizedCurrentFilter = filter === 'New Entries' ? 'New In' : filter
  const displayFilters = CATALOG_PILL_FILTERS.includes(normalizedCurrentFilter)
    ? CATALOG_PILL_FILTERS
    : [normalizedCurrentFilter, ...CATALOG_PILL_FILTERS]

  return (
    <main className="listing-page">
      <section className="page-intro products-hero-bg" data-logo-theme="dark">
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

      <section id="catalog-section" className="catalog section" data-logo-theme="white">
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
          <div className="catalog-bar-meta">
            <span>
              THE COLLECTION{' '}
              <span className="catalog-count">({String(filtered.length).padStart(2, '0')})</span>
            </span>
            {filter !== 'All lamps' && (
              <span className="catalog-active-filter-badge">
                Selected: <strong>{filter === 'New Entries' ? 'New In' : filter}</strong>
                <button
                  type="button"
                  className="catalog-clear-pill"
                  onClick={() => handleFilterClick('All lamps')}
                  title="Clear filter and show all lamps"
                >
                  ✕ View All
                </button>
              </span>
            )}
          </div>

          <div className="filters" aria-label="Filter products">
            {displayFilters.map(f => {
              const isSelected =
                filter === f ||
                (f === 'New In' && (filter === 'New In' || filter === 'New Entries'))
              return (
                <button
                  key={f}
                  className={isSelected ? 'filter-active' : ''}
                  onClick={() => handleFilterClick(f === 'New In' ? 'New Entries' : f)}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--color-earth)' }}>No lamps found matching your selection.</p>
            <button className="button-dark" onClick={() => { setSearchQuery(''); handleFilterClick('All lamps'); }}>
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
  const { products, studioSettings, isInWishlist, toggleWishlist } = useProductStore()
  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === id)
  const isSaved = product ? isInWishlist(product.id) : false
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [added, setAdded] = useState(false)
  const [activeDrawerTab, setActiveDrawerTab] = useState<'specifications' | 'guarantee' | null>(null)

  // Prevent background scroll while info drawer is open and handle ESC key
  useEffect(() => {
    if (activeDrawerTab) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveDrawerTab(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [activeDrawerTab])

  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now() + Math.random())

  // Reset active image and automatically reshuffle related lamps whenever product changes
  useEffect(() => {
    setActiveImageIndex(0)
    setShuffleSeed(Date.now() + Math.random())
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

  // Display 3 related lamps from similar categories, dynamically shuffled
  const relatedLamps = useMemo(() => {
    // Fisher-Yates array shuffler
    const shuffle = <T,>(arr: T[]): T[] => {
      const copy = [...arr]
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
      }
      return copy
    }

    // Thematic relationships between categories
    const thematicRelated: Record<string, string[]> = {
      'Wildlife Sculptures': ['Wildlife & Nature', 'Botanical & Trees'],
      'Wildlife & Nature': ['Wildlife Sculptures', 'Botanical & Trees'],
      'Botanical & Trees': ['Abstract & Contemporary', 'Wildlife & Nature'],
      'Abstract & Contemporary': ['Botanical & Trees', 'New Designs'],
      'Floor Lamps': ['Hanging Lamps', 'Bedside & Table Lamps'],
      'Hanging Lamps': ['Floor Lamps', 'Wall Lamps'],
      'Bedside & Table Lamps': ['Floor Lamps', 'Hanging Lamps'],
      'Wall Lamps': ['Hanging Lamps', 'Floor Lamps'],
      'New Designs': ['Abstract & Contemporary', 'Floor Lamps'],
      'Custom Design': ['Wildlife Sculptures', 'Floor Lamps', 'Hanging Lamps'],
      'Cultural & Prismatic': ['Abstract & Contemporary', 'Wildlife Sculptures'],
    }

    const currentSub = product.subCategory || ''
    const relatedSubs = thematicRelated[currentSub] || []

    // 1. Primary pool: exact same subCategory
    const exactSubPool = currentSub
      ? products.filter(p => p.id !== product.id && p.subCategory === currentSub)
      : []

    // 2. Secondary pool: thematic/related subcategories or same main category
    const thematicPool = products.filter(
      p =>
        p.id !== product.id &&
        !exactSubPool.some(s => s.id === p.id) &&
        ((p.subCategory && relatedSubs.includes(p.subCategory)) || p.category === product.category)
    )

    // 3. Fallback pool: other catalog lamps
    const otherPool = products.filter(
      p =>
        p.id !== product.id &&
        !exactSubPool.some(s => s.id === p.id) &&
        !thematicPool.some(t => t.id === p.id)
    )

    const shuffledExact = shuffle(exactSubPool)
    const shuffledThematic = shuffle(thematicPool)
    const shuffledOther = shuffle(otherPool)

    return [...shuffledExact, ...shuffledThematic, ...shuffledOther].slice(0, 3)
  }, [product.id, product.category, product.subCategory, shuffleSeed, products])

  const whatsappMessage = encodeURIComponent(
    `Hello Gourd Shades,\nI am interested in inquiring about the "${product.name}" lamp (ID: ${product.id}).\nPrice: ${product.price}\nPlease let me know about availability and order steps.`
  )

  const deliveryItems = useMemo(() => {
    if (product?.deliveryGuarantee && product.deliveryGuarantee.filter(Boolean).length > 0) {
      return product.deliveryGuarantee.filter(Boolean)
    }
    if (studioSettings?.defaultDeliveryGuarantee && studioSettings.defaultDeliveryGuarantee.filter(Boolean).length > 0) {
      return studioSettings.defaultDeliveryGuarantee.filter(Boolean)
    }
    return [
      '3-month comprehensive warranty on all electrical fixtures and wiring',
      'Handcrafted to order from cured organic Tanzanian calabash',
      'Secure export-grade packaging with shock absorption',
      `Studio location: ${studioSettings?.address || STUDIO_LOCATION}`,
      'Shape availability confirmed directly before crafting begins',
    ]
  }, [product?.deliveryGuarantee, studioSettings?.defaultDeliveryGuarantee, studioSettings?.address])

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
    <main className="detail-page" data-logo-theme="white">
      <div className="detail-breadcrumb" data-logo-theme="white">
        <Link to="/products" className="detail-back-link">
          <ArrowLeft size={16} /> Back to all lamps
        </Link>
        <span>
          {formatCategory(product.category).toUpperCase()} / {product.name.toUpperCase()}
        </span>
      </div>

      <div className="detail-layout" data-logo-theme="white">
        <div className="detail-gallery">
          <SlideMaskCard direction="left" delay={0.1}>
            <div
              className="detail-image"
              data-logo-theme="dark"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (galleryImages.length > 1) {
                  setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (galleryImages.length > 1) {
                    setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                  }
                }
              }}
              aria-label={`View next image for ${product.name}`}
              title={galleryImages.length > 1 ? "Click to view next image" : undefined}
            >
              <img
                key={activeImage}
                src={activeImage}
                alt={`${product.name} view ${activeImageIndex + 1}`}
              />
              {galleryImages.length > 1 && (
                <div className="detail-image-dots" aria-hidden="true">
                  {galleryImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`detail-dot ${activeImageIndex === idx ? 'dot-active' : ''}`}
                    />
                  ))}
                </div>
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

        <div className="detail-copy" data-logo-theme="white">
          {(() => {
            const isSold = product.availabilityStatus === 'sold'
            const isNewEntry = Boolean(
              product.isNewEntry ||
              product.category === 'new design' ||
              [
                'ndovu-calabash-lamp',
                'butterfly-dreams-lamp',
                'coral-calabash-lamp',
                'hanging-draw-lamp',
                'sculptured-tri-lamp',
                '3-way-hanging-family-lamp',
                'aura-new-design-lamp',
                'comfort-new-design-lamp',
                'luster-new-design-lamp',
                'pembe-tatu-new-design-lamp',
              ].includes(product.id)
            )

            const whatsappSoldMessage = encodeURIComponent(
              `Hello Gourd Shades,\nI am inquiring about the "${product.name}" lamp (ID: ${product.id}).\nI saw that this original piece is sold, and I would love to ask about design and shape availability to commission a piece on an available harvested calabash shape.`
            )

            return (
              <>
                <div className="detail-header-block">
                  <div className="detail-meta-pill-row">
                    <span className="detail-category-eyebrow">
                      {product.subCategory || formatCategory(product.category)}
                    </span>
                    {isNewEntry && (
                      <span className="detail-pill-badge new-entry">
                        {product.category === 'new design' ? 'NEW DESIGN' : 'NEW ENTRY'}
                      </span>
                    )}
                    {isSold && (
                      <span className="detail-pill-badge sold">
                        SOLD PIECE
                      </span>
                    )}
                  </div>
                  <MaskedHeading
                    as="h1"
                    lines={titleLines}
                  />
                </div>

                {/* Action Buttons: Add to Inquiry Bag & Save to Wishlist */}
                <div className="detail-cta-block">
                  {isSold ? (
                    <div className="detail-sold-cta-container">
                      <a
                        href={`https://wa.me/${STUDIO_PHONE_RAW}?text=${whatsappSoldMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-add-cart-btn detail-ask-shape-btn"
                      >
                        <MessageCircle size={18} /> ASK FOR DESIGN SHAPE AVAILABILITY
                      </a>
                      <a
                        href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
                          `Inquiry: Design & Shape Availability — ${product.name}`
                        )}&body=${encodeURIComponent(
                          `Hello Gourd Shades,\n\nI am inquiring about the "${product.name}" design (ID: ${product.id}).\n\nSince this original piece is marked sold, I would love to inquire about available harvested gourd shapes to craft this design upon.\n\nPlease let me know what shapes you currently have ready in your Arusha studio.\n\nThank you!`
                        )}`}
                        className="detail-email-shape-btn"
                      >
                        <Mail size={16} /> Inquire via Email
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="detail-add-cart-btn"
                      onClick={() => {
                        addToCart(product.id)
                        setAdded(true)
                        setTimeout(() => setAdded(false), 2000)
                      }}
                    >
                      {added ? (
                        <>ADDED TO INQUIRY BAG <Check size={18} /></>
                      ) : (
                        <>ADD TO INQUIRY BAG — {product.price}</>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    className={`detail-wishlist-btn ${isSaved ? 'is-saved' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    title={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                    aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                  >
                    <Bookmark size={17} strokeWidth={1.8} fill={isSaved ? 'currentColor' : 'none'} />
                    <span>{isSaved ? 'SAVED IN WISHLIST' : 'SAVE TO WISHLIST'}</span>
                  </button>
                </div>

                {/* Narrative lead description (human, heartfelt, 3 lines max) */}
                <div className="detail-narrative">
                  <p className="detail-narrative-lead">{product.description}</p>
                </div>

                {/* Gourd shape rarity & availability note */}
                <div className={`detail-availability-note ${isSold ? 'is-sold-note-box' : ''}`}>
                  <span className="availability-dot" aria-hidden="true" />
                  <div className="availability-text">
                    <strong>Shape &amp; Availability Note:</strong>{' '}
                    {product.availabilityNote || (isSold
                      ? 'Original piece sold. Because natural calabashes grow into unique organic silhouettes, our Arusha studio crafts this carving pattern on similar harvested gourds upon request. Ask our artisans to confirm current shape availability.'
                      : 'Most lamps displayed in our gallery are sold original pieces, and natural gourd shapes are naturally rare. Please check with our studio to confirm current shape availability or have a piece crafted on a similar harvested gourd.')}
                  </div>
                </div>
              </>
            )
          })()}

          {/* Information Drawers: Specifications & Studio Delivery (Slide-out panel without extending page height) */}
          <div className="detail-accordions">
            {/* Specifications & Dimensions */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => setActiveDrawerTab('specifications')}
                aria-label="Open Specifications & Dimensions drawer"
              >
                <span className="accordion-title">Specifications &amp; Dimensions</span>
                <ChevronRight size={18} className="accordion-chevron" />
              </button>
            </div>

            {/* Studio Delivery & Guarantee */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => setActiveDrawerTab('guarantee')}
                aria-label="Open Studio Delivery & Guarantee drawer"
              >
                <span className="accordion-title">Studio Delivery &amp; Guarantee</span>
                <ChevronRight size={18} className="accordion-chevron" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="section related-section" data-logo-theme="white">
        <div className="section-heading">
          <MaskedHeading
            as="h2"
            lines={[
              <>You might</>,
              <><em>also like.</em></>,
            ]}
            stagger={0.12}
          />
        </div>

        <div className="product-grid">
          {relatedLamps.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Slide-out Editorial Information Drawer (Opens without extending page height) */}
      <AnimatePresence>
        {activeDrawerTab && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDrawerTab(null)}
            />
            <motion.aside
              className="cart-drawer info-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={activeDrawerTab === 'specifications' ? 'Product Specifications' : 'Studio Delivery & Guarantee'}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="drawer-header">
                <div>
                  <span className="eyebrow">{formatCategory(product.category).toUpperCase()}</span>
                  <h2>{product.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDrawerTab(null)}
                  aria-label="Close drawer"
                  className="drawer-close-btn"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Segmented Tab Switcher inside the drawer */}
              <div className="info-drawer-tabs">
                <button
                  type="button"
                  className={`info-drawer-tab ${activeDrawerTab === 'specifications' ? 'active' : ''}`}
                  onClick={() => setActiveDrawerTab('specifications')}
                >
                  Specifications &amp; Dimensions
                </button>
                <button
                  type="button"
                  className={`info-drawer-tab ${activeDrawerTab === 'guarantee' ? 'active' : ''}`}
                  onClick={() => setActiveDrawerTab('guarantee')}
                >
                  Delivery &amp; Guarantee
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="info-drawer-body">
                {activeDrawerTab === 'specifications' && (
                  <div className="info-drawer-section">
                    <div className="info-drawer-card">
                      <span className="info-card-label">Handcrafted Details</span>
                      {product.specifications && product.specifications.filter(Boolean).length > 0 ? (
                        <ul className="info-drawer-list">
                          {product.specifications.filter(Boolean).map((spec, idx) => (
                            <li key={idx}>
                              <span className="info-list-bullet" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="info-drawer-text">
                          Handcrafted natural organic Tanzanian calabash with standard electrical fixture.
                        </p>
                      )}
                    </div>

                    <div className="info-drawer-card info-card-highlight">
                      <span className="info-card-label">Natural Gourd Dimensions</span>
                      <p className="info-drawer-text">
                        Because natural calabash fruits grow organically on the vine, every harvested lamp retains its authentic individual proportions and carved perforation silhouette.
                      </p>
                    </div>
                  </div>
                )}

                {activeDrawerTab === 'guarantee' && (
                  <div className="info-drawer-section">
                    <div className="info-drawer-card">
                      <span className="info-card-label">Arusha Studio Promise</span>
                      <ul className="info-drawer-list">
                        {deliveryItems.map((item, idx) => (
                          <li key={idx}>
                            <span className="info-list-bullet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="info-drawer-cta">
                      <a
                        className="info-whatsapp-cta"
                        href={`https://wa.me/${(studioSettings?.whatsapp || STUDIO_PHONE_RAW).replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={18} /> Inquire Directly via WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="info-drawer-footer">
                <button
                  type="button"
                  className="button-dark info-drawer-done-btn"
                  onClick={() => setActiveDrawerTab(null)}
                >
                  Done
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

function About() {
  return (
    <main className="about-page">
      <section className="page-intro about-intro" data-logo-theme="white">
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

      <section className="about-hero-image" data-logo-theme="dark">
        <ParallaxImage
          src="/images/image-wm-about.jpg"
          alt="Portrait of Isaac Munis, founder and artisan of Gourd Shades in Arusha, Tanzania"
          loading="lazy"
          fixed
          offset={['start end', 'end start']}
          yRange={['-2%', '2%']}
          scale={1.04}
        />
      </section>

      <section className="about-content" data-logo-theme="white">
        <div>
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

      <section className="about-origin-extension" data-logo-theme="white">
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
                <strong>The friend’s lampshade that started it all</strong>
              </figcaption>
            </figure>
          </SlideMaskCard>
        </div>

        <div className="about-origin-copy">
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
      <section className="values-strip about-values-strip" data-logo-theme="white">
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
      <section className="page-intro community-hero-bg" data-logo-theme="dark">
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
      <section className="community-section" data-logo-theme="white">
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
      <section className="community-section" data-logo-theme="white">
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
      <section className="values-strip" data-logo-theme="white">
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
      <section className="page-intro contact-intro contact-hero-bg" data-logo-theme="dark">
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
      <section className="contact-editorial-section" data-logo-theme="white">
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

function WishlistDrawer({
  open,
  close,
  onAddToCart,
}: {
  open: boolean
  close: () => void
  onAddToCart: (id: string) => void
}) {
  const { products, wishlist, removeFromWishlist, clearWishlist } = useProductStore()
  const entries = products.filter(p => wishlist.includes(p.id))
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, close])

  const handleMoveToBag = (id: string) => {
    onAddToCart(id)
    setAddedMap(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [id]: false }))
    }, 2000)
  }

  const handleAddAllToBag = () => {
    entries.forEach(p => onAddToCart(p.id))
  }

  const whatsappWishlistText = encodeURIComponent(
    `Hello Gourd Shades,\nI would like to inquire about availability and pricing for my saved wishlamps:\n${entries
      .map((p, idx) => `${idx + 1}. ${p.name} (${p.price}) [ID: ${p.id}]`)
      .join('\n')}\n\nTotal: ${entries.length} wishlamp(s).\nPlease advise on shape availability and shipping options.`
  )

  const emailWishlistText = `Hello Gourd Shades,\n\nI would like to inquire about the following wishlamps from my saved collection:\n\n${entries
    .map(p => `- ${p.name} (${p.price}) [ID: ${p.id}]`)
    .join('\n')}\n\nTotal Items: ${entries.length}\n\nPlease advise on current availability and shipping details.\n\nThank you!`

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
            className="cart-drawer wishlist-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Saved Wishlamps"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">CURATED COLLECTION</span>
                <h2>
                  Wishlamps <span>({entries.length})</span>
                </h2>
              </div>
              <button onClick={close} aria-label="Close wishlist">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {entries.length ? (
              <>
                <div className="cart-items wishlist-items">
                  {entries.map(p => (
                    <div className="cart-item wishlist-item" key={p.id}>
                      <Link to={`/products/${p.id}`} onClick={close} className="wishlist-thumb-link">
                        <img
                          src={p.images?.[0] || '/images/hero-editorial.png'}
                          alt={p.name}
                        />
                      </Link>
                      <div className="cart-item-info wishlist-item-info">
                        <span className="eyebrow">{formatCategory(p.category)}</span>
                        <h3>
                          <Link to={`/products/${p.id}`} onClick={close}>
                            {p.name}
                          </Link>
                        </h3>
                        <p className="wishlist-item-price">{p.price}</p>
                        {p.availabilityNote && (
                          <span className="wishlist-item-note">{p.availabilityNote}</span>
                        )}

                        <div className="wishlist-item-actions">
                          <button
                            type="button"
                            className="wishlist-btn-add-bag"
                            onClick={() => handleMoveToBag(p.id)}
                          >
                            {addedMap[p.id] ? (
                              <>IN BAG <Check size={13} strokeWidth={2.2} /></>
                            ) : (
                              <>ADD TO BAG <Plus size={13} strokeWidth={2.2} /></>
                            )}
                          </button>
                          <button
                            type="button"
                            className="wishlist-btn-remove"
                            onClick={() => removeFromWishlist(p.id)}
                            title={`Remove ${p.name} from wishlist`}
                            aria-label={`Remove ${p.name} from wishlist`}
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="drawer-bottom">
                  <div className="subtotal">
                    <span>Selected Wishlamps</span>
                    <strong>{entries.length} {entries.length === 1 ? 'piece' : 'pieces'}</strong>
                  </div>
                  <p>Inquire directly about these shapes or move them to your inquiry bag.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      type="button"
                      className="button-dark"
                      onClick={handleAddAllToBag}
                    >
                      Add All to Inquiry Bag <Plus size={16} />
                    </button>

                    <a
                      className="button-whatsapp"
                      href={`https://wa.me/${STUDIO_PHONE_RAW}?text=${whatsappWishlistText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={18} /> Inquire Wishlist via WhatsApp
                    </a>

                    <a
                      className="button-outline"
                      href={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
                        'Wishlist Inquiry — Gourd Shades'
                      )}&body=${encodeURIComponent(emailWishlistText)}`}
                    >
                      Email Wishlist to Studio <ArrowUpRight size={17} />
                    </a>
                  </div>

                  <div style={{ marginTop: '14px', textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Clear all items from your wishlist?')) {
                          clearWishlist()
                        }
                      }}
                      className="wishlist-clear-all-btn"
                    >
                      Clear All Wishlamps
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-cart empty-wishlist">
                <Bookmark size={42} strokeWidth={1.2} style={{ color: 'var(--color-earth)' }} />
                <h3>Your wishlist is empty.</h3>
                <p>Save your favorite calabash luminaires to compare shapes or order bespoke pieces.</p>
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
  const { products } = useProductStore()
  const entries = products.filter(p => items[p.id] > 0)
  const count = entries.reduce((sum, p) => sum + items[p.id], 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, close])

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

function StorefrontContent() {
  const { isWishlistOpen, closeWishlist } = useProductStore()
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('gourd-shades-bag') || '{}')
    } catch {
      return {}
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  useEffect(() => {
    try {
      localStorage.setItem('gourd-shades-bag', JSON.stringify(cart))
    } catch {}
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
    <>
      <ScrollToTop />
      {!isAdmin && <Header count={count} openCart={() => setCartOpen(true)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={add} />} />
        <Route path="/community" element={<Community />} />
        <Route path="/services" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/admin" element={<AdminPortal />} />
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
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <>
          <CartDrawer
            open={cartOpen}
            close={() => setCartOpen(false)}
            items={cart}
            add={add}
            remove={remove}
          />
          <WishlistDrawer
            open={isWishlistOpen}
            close={closeWishlist}
            onAddToCart={add}
          />
        </>
      )}
      {!isAdmin && <CookieConsent />}
    </>
  )
}

export function Storefront() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <StorefrontContent />
      </BrowserRouter>
    </ProductProvider>
  )
}

export default Storefront
