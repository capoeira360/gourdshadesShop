import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import './CategoryShowcase.css'

export interface EditorialCategory {
  id: string
  title: string
  image: string
  filterKey: string
  productId: string
}

const editorialCategories: EditorialCategory[] = [
  {
    id: 'table-lamps',
    title: 'Table Lamps',
    image: '/images/20240405_131741-a1.jpg',
    filterKey: 'Table lamps',
    productId: 'african-wild-life-lamps',
  },
  {
    id: 'standing-bed-side',
    title: 'Standing Bed Side',
    image: '/images/standing-bedside-1.jpg',
    filterKey: 'Standing Bed Side',
    productId: 'standing-bedside-lamp',
  },
  {
    id: 'hanging-lamps',
    title: 'Hanging Lamps',
    image: '/images/hanging-single-1.jpg',
    filterKey: 'Hanging Lamps',
    productId: 'hanging-single-pendant-lamp',
  },
  {
    id: 'hanging-three-ways',
    title: 'Hanging Three Ways',
    image: '/images/hanging-threeways-1.jpg',
    filterKey: 'Hanging Three Ways',
    productId: 'hanging-three-ways-cluster-lamp',
  },
  {
    id: 'floor-sculptured-stand',
    title: 'Floor-Sculptured Stand',
    image: '/images/floor-sculptured-stand-1.jpg',
    filterKey: 'Floor-Sculptured Stand',
    productId: 'floor-sculptured-stand-lamp',
  },
  {
    id: 'floor-flexible-threeways',
    title: 'Floor-Flexible Threeways',
    image: '/images/floor-flexible-threeways-1.jpg',
    filterKey: 'Floor-Flexible Threeways',
    productId: 'floor-flexible-threeways-lamp',
  },
  {
    id: 'wall-lamps',
    title: 'Wall Lamps',
    image: '/images/wall-lamp-1.jpg',
    filterKey: 'Wall Lamps',
    productId: 'wall-mounted-sculptural-lamp',
  },
  {
    id: 'custom-design',
    title: 'Custom Design',
    image: '/images/IMG-20250529-WA0007-nav-contacts.jpg',
    filterKey: 'Custom Design',
    productId: 'bespoke-custom-design-lamp',
  },
]

// Duplicate 4 sets of the 7 editorial categories for seamless infinite looping
const infiniteCategories = [
  ...editorialCategories.map((cat, idx) => ({ ...cat, loopKey: `set0-${cat.id}-${idx}` })),
  ...editorialCategories.map((cat, idx) => ({ ...cat, loopKey: `set1-${cat.id}-${idx}` })),
  ...editorialCategories.map((cat, idx) => ({ ...cat, loopKey: `set2-${cat.id}-${idx}` })),
  ...editorialCategories.map((cat, idx) => ({ ...cat, loopKey: `set3-${cat.id}-${idx}` })),
]

export function CategoryShowcase() {
  const trackWrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const hasMovedRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isTouchingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // Detect touch device or mobile screen to prevent conflicting interactions
  const isTouchOrMobileDevice = () => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.innerWidth <= 900 ||
      navigator.maxTouchPoints > 0
    )
  }

  // Measure single set width dynamically
  const getSingleSetWidth = () => {
    const track = trackRef.current
    if (!track || !track.children || track.children.length < editorialCategories.length * 2) {
      return 0
    }
    const firstChild = track.children[0] as HTMLElement
    const nextSetChild = track.children[editorialCategories.length] as HTMLElement
    if (!firstChild || !nextSetChild) return 0
    return nextSetChild.offsetLeft - firstChild.offsetLeft
  }

  // Handle infinite scroll boundary wrapping
  const checkInfiniteBounds = () => {
    const wrapper = trackWrapperRef.current
    if (!wrapper) return
    const setWidth = getSingleSetWidth()
    if (setWidth <= 0) return

    // User scrolled forward into set 3 -> wrap back by 1 set
    if (wrapper.scrollLeft >= setWidth * 2.5) {
      wrapper.scrollLeft -= setWidth
    }
    // User scrolled backwards into set 0 -> wrap forward by 1 set
    else if (wrapper.scrollLeft <= setWidth * 0.5) {
      wrapper.scrollLeft += setWidth
    }
  }

  // Mount effect: initialize scrollLeft in the middle (Set 1.5) and run gentle ambient drift on desktop
  useEffect(() => {
    const wrapper = trackWrapperRef.current
    if (!wrapper) return

    let isMounted = true

    const initPosition = () => {
      if (!isMounted) return
      const setWidth = getSingleSetWidth()
      if (setWidth > 0) {
        wrapper.scrollLeft = setWidth * 1.5
      } else {
        setTimeout(initPosition, 60)
      }
    }

    const initTimer = setTimeout(initPosition, 80)

    // Gentle editorial auto-glide when idle:
    // ONLY run on desktop fine pointers to avoid fighting touch momentum and CSS scroll-snap
    let animationFrameId: number | null = null
    const isTouch = isTouchOrMobileDevice()

    if (!isTouch) {
      const glide = () => {
        if (isMounted) {
          if (!isHoveredRef.current && !isDraggingRef.current && wrapper) {
            wrapper.scrollLeft += 0.55
            checkInfiniteBounds()
          }
          animationFrameId = requestAnimationFrame(glide)
        }
      }
      animationFrameId = requestAnimationFrame(glide)
    }

    return () => {
      isMounted = false
      clearTimeout(initTimer)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Native onScroll listener for trackpad, mouse wheel, and touch gestures
  const handleScroll = () => {
    // If user is actively touching or dragging, debounce the infinite boundary check
    // so it doesn't cause sudden jump/stutter mid-swipe or during momentum deceleration
    if (isTouchingRef.current || isDraggingRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        if (!isTouchingRef.current && !isDraggingRef.current) {
          checkInfiniteBounds()
        }
      }, 160)
      return
    }

    // For mouse wheel or settled scroll, debounce boundary check slightly
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      checkInfiniteBounds()
    }, 120)
  }

  // Fluid mouse drag-to-scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    hasMovedRef.current = false
    lastXRef.current = e.pageX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const wrapper = trackWrapperRef.current
    if (!wrapper) return
    e.preventDefault()
    const deltaX = e.pageX - lastXRef.current
    lastXRef.current = e.pageX
    if (Math.abs(deltaX) > 1) {
      hasMovedRef.current = true
    }
    wrapper.scrollLeft -= deltaX * 1.35
    checkInfiniteBounds()
  }

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false
  }

  const handleMouseEnter = () => {
    isHoveredRef.current = true
  }

  const handleSectionMouseLeave = () => {
    isDraggingRef.current = false
    isHoveredRef.current = false
  }

  const handleTouchStart = () => {
    isTouchingRef.current = true
    isHoveredRef.current = true
  }

  const handleTouchEnd = () => {
    isTouchingRef.current = false
    isHoveredRef.current = false
    // After touch ends, wait for momentum scroll to settle, then verify boundary
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      checkInfiniteBounds()
    }, 200)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // If user was actively dragging to pan sideways, cancel navigation
    if (hasMovedRef.current) {
      e.preventDefault()
    }
  }

  return (
    <section
      className="editorial-categories-section"
      data-logo-theme="white"
      aria-label="Handcrafted Calabash Lighting Categories"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleSectionMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Connected Full-Bleed Lookbook Strip (0px Gap, Wider Horizontal Cards) */}
      <div
        ref={trackWrapperRef}
        className="editorial-category-track-wrapper"
        tabIndex={0}
        role="region"
        aria-label="Horizontal scrollable categories showcase"
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
      >
        <div ref={trackRef} className="editorial-category-track">
          {infiniteCategories.map((category) => (
            <article key={category.loopKey} className="editorial-category-card">
              {/* Connected Full Portrait Photographic Frame */}
              <div className="editorial-image-frame">
                <Link
                  to={`/products/${category.productId}`}
                  className="editorial-image-link"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={handleCardClick}
                >
                  <img
                    src={category.image}
                    alt={`${category.title} handcrafted calabash lamp`}
                    className="editorial-img"
                    loading="lazy"
                    draggable={false}
                  />
                </Link>

                {/* Quick View Button: direct user to product detail page */}
                <Link
                  to={`/products/${category.productId}`}
                  className="editorial-quick-view-btn"
                  title={`Quick view ${category.title} details`}
                  onClick={handleCardClick}
                >
                  <span>Quick View</span>
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </Link>
              </div>

              {/* Only Category Name Centered (Matching Reference Screenshot) */}
              <div className="editorial-label-wrap">
                <Link
                  to={`/products/${category.productId}`}
                  className="editorial-title-link"
                  onClick={handleCardClick}
                >
                  <h3 className="editorial-category-title">{category.title}</h3>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
