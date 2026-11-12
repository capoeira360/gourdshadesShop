import React, { useRef, useEffect } from 'react'
import './GalleryShowcase.css'

export interface GalleryItem {
  id: string
  title: string
  image: string
  subtitle?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-night-glow',
    title: 'Midnight Solitude',
    subtitle: 'Ambient Illumination',
    image: '/images/20240913_211304-hero.jpg',
  },
  {
    id: 'gallery-artisan-carving',
    title: 'Artisan Carving',
    subtitle: 'Studio Process',
    image: '/images/20240520_161231-featured-1.jpg',
  },
  {
    id: 'gallery-exhibition-space',
    title: 'Exhibition Space',
    subtitle: 'Arusha Showcase',
    image: '/images/IMG-20250601-WA0002-exhibition-1.jpg',
  },
  {
    id: 'gallery-celestial-radiance',
    title: 'Celestial Radiance',
    subtitle: 'Pendant Form',
    image: '/images/20240614_140014-featured-3-.jpg',
  },
  {
    id: 'gallery-installation',
    title: 'Gallery Installation',
    subtitle: 'Curated Collection',
    image: '/images/20240525_105359-exhibition-2-.jpg',
  },
  {
    id: 'gallery-workbench',
    title: 'The Workbench',
    subtitle: 'Handcraft Tools',
    image: '/images/20241018_094717-reach-1-.jpg',
  },
  {
    id: 'gallery-botanical-sculpting',
    title: 'Botanical Sculpting',
    subtitle: 'Organic Contours',
    image: '/images/20240804_155809-featured-4-.jpg',
  },
  {
    id: 'gallery-curated-showcase',
    title: 'Curated Showcase',
    subtitle: 'Exhibition View',
    image: '/images/20240525_105410-exhibition-3-.jpg',
  },
  {
    id: 'gallery-crystal-refraction',
    title: 'Crystal Refraction',
    subtitle: 'Beadwork Detail',
    image: '/images/IMG-20250401-WA0006-feature-replace1.jpg',
  },
  {
    id: 'gallery-perforation',
    title: 'Hand Perforation',
    subtitle: 'Precision Pattern',
    image: '/images/20240913_145501-reach-2-.jpg',
  },
  {
    id: 'gallery-savanna-terrain-1',
    title: 'Savanna Expedition',
    subtitle: 'Natural Landscape',
    image: '/images/terrain-1.jpeg',
  },
  {
    id: 'gallery-savanna-terrain-2',
    title: 'Arusha Terrain',
    subtitle: 'Studio Inspiration',
    image: '/images/terrain-2.jpeg',
  },
  {
    id: 'gallery-savanna-terrain-3',
    title: 'Artisan Heritage',
    subtitle: 'Field Exploration',
    image: '/images/terrain-3.jpeg',
  },
  {
    id: 'gallery-savanna-terrain-4',
    title: 'Organic Elements',
    subtitle: 'Natural Flora',
    image: '/images/terrain-4.jpeg',
  },
  {
    id: 'gallery-coral-reef',
    title: 'Coral Luminescence',
    subtitle: 'Organic Reef Form',
    image: '/images/coral-1.jpg',
  },
  {
    id: 'gallery-hanging-three-family',
    title: 'Cascading Triplets',
    subtitle: 'Suspended Cluster',
    image: '/images/3-way-hanging-familiy-1.jpg',
  },
]

// Duplicate 4 sets for seamless infinite loop wrapping
const infiniteGallery = [
  ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set0-${item.id}-${idx}` })),
  ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set1-${item.id}-${idx}` })),
  ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set2-${item.id}-${idx}` })),
  ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set3-${item.id}-${idx}` })),
]

export function GalleryShowcase() {
  const trackWrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const isHoveredRef = useRef(false)

  // Measure dynamic width of one set of items
  const getSingleSetWidth = () => {
    const track = trackRef.current
    if (!track || !track.children || track.children.length < galleryItems.length * 2) {
      return 0
    }
    const firstChild = track.children[0] as HTMLElement
    const nextSetChild = track.children[galleryItems.length] as HTMLElement
    if (!firstChild || !nextSetChild) return 0
    return nextSetChild.offsetLeft - firstChild.offsetLeft
  }

  // Handle infinite scroll boundary wrapping
  const checkInfiniteBounds = () => {
    const wrapper = trackWrapperRef.current
    if (!wrapper) return
    const setWidth = getSingleSetWidth()
    if (setWidth <= 0) return

    // Scrolled forward into set 3 -> wrap back by 1 set
    if (wrapper.scrollLeft >= setWidth * 2.5) {
      wrapper.scrollLeft -= setWidth
    }
    // Scrolled backward into set 0 -> wrap forward by 1 set
    else if (wrapper.scrollLeft <= setWidth * 0.5) {
      wrapper.scrollLeft += setWidth
    }
  }

  // Mount effect: initialize position and continuous ambient drift
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

    // Gentle ambient drift (pauses on hover or touch)
    let animationFrameId: number
    const glide = () => {
      if (isMounted) {
        if (!isHoveredRef.current && !isDraggingRef.current && wrapper) {
          wrapper.scrollLeft += 0.52
          checkInfiniteBounds()
        }
        animationFrameId = requestAnimationFrame(glide)
      }
    }

    animationFrameId = requestAnimationFrame(glide)

    return () => {
      isMounted = false
      clearTimeout(initTimer)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Native onScroll listener for trackpad & touch gestures
  const handleScroll = () => {
    checkInfiniteBounds()
  }

  // Mouse drag-to-scroll support
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    lastXRef.current = e.pageX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const wrapper = trackWrapperRef.current
    if (!wrapper) return
    e.preventDefault()
    const deltaX = e.pageX - lastXRef.current
    lastXRef.current = e.pageX
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
    isHoveredRef.current = true
  }

  const handleTouchEnd = () => {
    isHoveredRef.current = false
  }

  return (
    <section
      id="gallery"
      className="editorial-gallery-section"
      data-logo-theme="white"
      aria-label="Handcrafted Calabash Gallery Showcase"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleSectionMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Simplified Clean Header Row */}
      <div className="gallery-header-container">
        <div className="collection-header-row">
          <h2 className="collection-header-title">
            The <em>Gallery.</em>
          </h2>
          <span className="collection-header-link" style={{ cursor: 'default', borderBottom: 'none' }}>
            Studio &amp; Exhibition Moments
          </span>
        </div>
      </div>

      {/* Connected Full-Bleed Infinite Track (0px Gap) */}
      <div
        ref={trackWrapperRef}
        className="editorial-gallery-track-wrapper"
        tabIndex={0}
        role="region"
        aria-label="Horizontal scrollable gallery showcase"
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
      >
        <div ref={trackRef} className="editorial-gallery-track">
          {infiniteGallery.map((item) => (
            <article key={item.loopKey} className="editorial-gallery-card">
              <div className="editorial-gallery-frame">
                <img
                  src={item.image}
                  alt={item.title || "Calabash artisan studio gallery"}
                  className="editorial-gallery-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

