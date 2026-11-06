import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import './CategoryShowcase.css'

export interface CategorySlide {
  id: string
  title: string
  titleEm: string
  tagline: string
  description: string
  image: string
  bgColor: string
  textColor: string
  accentColor: string
  specs: string[]
  craftNote: string
  filterKey: string
}

export const categorySlides: CategorySlide[] = [
  {
    id: 'table-lamps',
    title: 'Table',
    titleEm: 'Lamps',
    tagline: '01 / Ambient Desk & Accent Lighting',
    description:
      'Artisanal table pieces carved from mature calabash gourds. Ideal for desks, side consoles, and credenzas, projecting delicate geometric shadows and warm kaleidoscopic patterns across adjacent walls.',
    image: '/images/20240520_161231-featured-1.jpg',
    bgColor: '#1a1b17', // Obsidian Charcoal
    textColor: '#ffffff',
    accentColor: '#dc3331',
    specs: ['E27 Warm LED', 'Intricate Beadwork', 'Console & Desk Accent'],
    craftNote: 'Handcrafted in Arusha',
    filterKey: 'Table lamps',
  },
  {
    id: 'standing-bed-side',
    title: 'Standing',
    titleEm: 'Bed Side',
    tagline: '02 / Intimate Evening Sanctuary',
    description:
      'Crafted to accompany peaceful evenings and nighttime reading. Gentle downward-directed light filtration and amber crystal accents create a calming, glare-free haven beside your bed.',
    image: '/images/20240105_163859_IMG_1386-g1.jpg',
    bgColor: '#261a17', // Warm Amber Noir
    textColor: '#ffffff',
    accentColor: '#f5cdcc',
    specs: ['Soft Evening Glow', 'Natural Dried Calabash', 'Bedside Companion'],
    craftNote: 'Organic Calabash Silhouette',
    filterKey: 'Bed side',
  },
  {
    id: 'floor-standing',
    title: 'Floor',
    titleEm: 'Standing',
    tagline: '03 / Architectural Living Presence',
    description:
      'Statuesque statement pieces carved from large-scale Tanzanian gourds mounted on hand-forged pedestals. Fills spacious living rooms and studio corners with dramatic upward silhouettes and organic warmth.',
    image: '/images/20240612_135238-featured-2-.jpg',
    bgColor: '#171c20', // Midnight Indigo Slate
    textColor: '#ffffff',
    accentColor: '#dc3331',
    specs: ['Grand Scale Gourd', 'Custom Iron Stand', 'Corner Living Room'],
    craftNote: 'Sculptural Statement',
    filterKey: 'Floor standing',
  },
  {
    id: 'hanging-lamps',
    title: 'Hanging',
    titleEm: 'Lamps',
    tagline: '04 / Overhead Celestial Halos',
    description:
      'Pendant calabash lamps suspended by braided textiles with brass fittings. Perfect for dining areas, kitchen islands, and entryways seeking an eye-level focal point of warm artisan craftsmanship.',
    image: '/images/20240614_140014-featured-3-.jpg',
    bgColor: '#241a13', // Warm Raw Ochre
    textColor: '#ffffff',
    accentColor: '#e5c99e',
    specs: ['Braided Cord Pendant', 'Radial Ceiling Glow', 'Dining & Island'],
    craftNote: 'Suspended Illumination',
    filterKey: 'Hanging lamps',
  },
  {
    id: 'hanging-three-ways',
    title: 'Hanging',
    titleEm: 'Three Ways',
    tagline: '05 / Triple Pendant Chandelier',
    description:
      'A clustered triad of hand-carved calabashes suspended at staggered heights from a single canopy. Creates a layered symphony of light, depth, and organic geometry over larger dining tables and double-height foyers.',
    image: '/images/IMG-20250301-WA0010-nav-services.jpg',
    bgColor: '#19221c', // Deep Botanical Forest
    textColor: '#ffffff',
    accentColor: '#f5cdcc',
    specs: ['Tri-Pendant Cluster', 'Staggered Cord Heights', 'Chandelier Presence'],
    craftNote: 'Triple Gourd Cluster',
    filterKey: 'Hanging three ways',
  },
  {
    id: 'floor-three-ways',
    title: 'Floor',
    titleEm: 'Three Ways',
    tagline: '06 / Multi-Tier Sculptural Tree',
    description:
      'An architectural multi-arm floor lamp featuring three distinct calabash vessels branching from a central stand. Illuminates from multiple vantage points for a luxurious, immersive ambient experience.',
    image: '/images/20240804_155809-featured-4-.jpg',
    bgColor: '#241820', // Carved Plum Mahogany
    textColor: '#ffffff',
    accentColor: '#dc3331',
    specs: ['Three-Branch Tree', 'Triple Ambient Glow', 'Artisanal Centerpiece'],
    craftNote: 'Multi-Tier Branching',
    filterKey: 'Floor three ways',
  },
  {
    id: 'wall-lamps',
    title: 'Wall',
    titleEm: 'Lamps',
    tagline: '07 / Sconce & Radial Accent Play',
    description:
      'Wall-mounted sculptural calabash sconces tailored for hallways, staircases, and headboards. Throws mesmerizing radial shadow tapestries that turn plain architectural walls into dynamic works of illuminated art.',
    image: '/images/IMG-20250529-WA0007-nav-contacts.jpg',
    bgColor: '#211d17', // Smoked Calabash Bronze
    textColor: '#ffffff',
    accentColor: '#e5af64',
    specs: ['Flush Wall Mount', 'Radial Shadow Art', 'Corridor & Headboard'],
    craftNote: 'Shadow Tapestry',
    filterKey: 'Wall lamps',
  },
]

export function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isProgrammaticScrollRef = useRef(false)

  // Track window scroll through this pinned section
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        ticking = false
        if (isProgrammaticScrollRef.current) return
        const section = sectionRef.current
        if (!section) return

        const rect = section.getBoundingClientRect()
        const sectionHeight = section.offsetHeight
        const windowHeight = window.innerHeight
        const totalScrollable = sectionHeight - windowHeight

        if (totalScrollable <= 0) return

        // When the section is in view
        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          const scrolled = -rect.top
          const progress = Math.min(1, Math.max(0, scrolled / totalScrollable))
          const newIndex = Math.min(
            categorySlides.length - 1,
            Math.floor(progress * categorySlides.length)
          )
          setActiveIndex(newIndex)
        } else if (rect.top > 0) {
          setActiveIndex(0)
        } else if (rect.bottom < windowHeight) {
          setActiveIndex(categorySlides.length - 1)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSlide = (index: number) => {
    const targetIndex = Math.max(0, Math.min(categorySlides.length - 1, index))
    setActiveIndex(targetIndex)

    const section = sectionRef.current
    if (!section) return

    isProgrammaticScrollRef.current = true
    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const totalScrollable = section.offsetHeight - window.innerHeight
    const stepHeight = totalScrollable / categorySlides.length
    const targetY = sectionTop + stepHeight * targetIndex + stepHeight * 0.15

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })

    setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 650)
  }

  // Dynamic styles for smooth background and text transition
  const dynamicStyles = {
    backgroundColor: categorySlides[activeIndex].bgColor,
    color: categorySlides[activeIndex].textColor,
    transition:
      'background-color 0.75s cubic-bezier(0.16, 1, 0.3, 1), color 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  return (
    <section
      ref={sectionRef}
      className="category-showcase-section"
      data-logo-theme="dark"
      style={{ height: `${categorySlides.length * 85}vh` }}
      aria-label="Artisanal Lighting Categories Showcase"
    >
      <div
        className="category-showcase-sticky"
        style={dynamicStyles}
      >
        <div className="category-showcase-grid">
          {/* Left Column: Narrative, Pagination, and Category Details */}
          <div className="category-text-column">
            {/* Top Bar: Organized with Eyebrow, Live Counter, and Segmented Progress */}
            <div className="category-top-bar">
              <div className="category-eyebrow-row">
                <span className="category-eyebrow-badge">
                  <Sparkles size={13} style={{ display: 'inline', verticalAlign: '-1px' }} />
                  OUR LIGHTING CATEGORIES
                </span>
                <span className="category-counter-text">
                  <strong className="category-counter-current">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </strong>
                  <span className="category-counter-slash">/</span>
                  <span className="category-counter-total">
                    {String(categorySlides.length).padStart(2, '0')}
                  </span>
                </span>
              </div>

              <div className="category-pagination-row" role="tablist" aria-label="Category Slides">
                {categorySlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    onClick={() => scrollToSlide(index)}
                    className={`category-page-bar ${index === activeIndex ? 'is-active' : ''}`}
                    title={`${slide.title} ${slide.titleEm}`}
                    aria-label={`Category ${index + 1}: ${slide.title} ${slide.titleEm}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Holder: Animated Text Transitions */}
            <div className="category-content-holder">
              {categorySlides.map((slide, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={slide.id}
                    className={`category-slide-text ${isActive ? 'is-active' : ''}`}
                    aria-hidden={!isActive}
                  >
                    <span className="category-subhead">{slide.tagline}</span>
                    <h2 className="category-title">
                      {slide.title} <em>{slide.titleEm}</em>
                    </h2>
                    <p className="category-description">{slide.description}</p>

                    <div className="category-specs-chips">
                      {slide.specs.map((spec, i) => (
                        <span key={i} className="category-spec-chip">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Actions: View Category + Nav Arrows */}
            <div className="category-bottom-actions">
              <Link
                to={`/products?search=${encodeURIComponent(categorySlides[activeIndex].filterKey)}`}
                className="category-cta-button"
              >
                <span>Browse {categorySlides[activeIndex].title} {categorySlides[activeIndex].titleEm}</span>
                <ArrowUpRight size={17} strokeWidth={2} />
              </Link>

              <div className="category-nav-arrows">
                <button
                  type="button"
                  onClick={() => scrollToSlide(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="category-arrow-btn"
                  aria-label="Previous category"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(activeIndex + 1)}
                  disabled={activeIndex === categorySlides.length - 1}
                  className="category-arrow-btn"
                  aria-label="Next category"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Sliding Card Showcase */}
          <div className="category-visual-column">
            <div className="category-visual-frame">
              <div
                className="category-visual-slider"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {categorySlides.map((slide, index) => (
                  <div key={slide.id} className="category-visual-slide">
                    <img
                      src={slide.image}
                      alt={`${slide.title} ${slide.titleEm} - Handcrafted calabash lighting`}
                      className="category-visual-img"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="category-visual-gradient" />
                    <div className="category-visual-pill">
                      <span>{slide.title} {slide.titleEm}</span>
                      <span>{slide.craftNote}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

