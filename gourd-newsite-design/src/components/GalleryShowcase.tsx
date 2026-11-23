import React, { useRef, useEffect } from 'react'
import './GalleryShowcase.css'
import { useProductStore } from '../context/ProductContext'

export type { GalleryItem } from '../context/ProductContext'

export function GalleryShowcase() {
  const { galleryItems } = useProductStore()

  // Duplicate 4 sets for seamless infinite loop wrapping (driven by live context data)
  const infiniteGallery = [
    ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set0-${item.id}-${idx}` })),
    ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set1-${item.id}-${idx}` })),
    ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set2-${item.id}-${idx}` })),
    ...galleryItems.map((item, idx) => ({ ...item, loopKey: `set3-${item.id}-${idx}` })),
  ]

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
  }, [galleryItems.length])

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
            <article
              key={item.loopKey}
              className={`editorial-gallery-card${item.type === 'video' ? ' editorial-gallery-card--video' : ''}`}
            >
              <div className="editorial-gallery-frame">
                {item.type === 'video' ? (
                  <video
                    className="editorial-gallery-video"
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    draggable={false}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title || 'Calabash artisan studio gallery'}
                    className="editorial-gallery-img"
                    loading="lazy"
                    draggable={false}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
