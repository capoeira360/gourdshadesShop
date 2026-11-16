import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useProductStore } from '../context/ProductContext'
import './AnnouncementBar.css'

const COLOR_PRESETS = [
  { id: 'cream', name: 'Alabaster Cream', bg: '#f7f5ef', text: '#22231f' },
  { id: 'terracotta', name: 'Studio Terracotta', bg: '#dc3331', text: '#ffffff' },
  { id: 'dark', name: 'Obsidian Slate', bg: '#1e1f1c', text: '#f7f5ef' },
  { id: 'sage', name: 'Botanical Olive', bg: '#394234', text: '#f5f4ee' },
  { id: 'clay', name: 'Warm Clay / Bronze', bg: '#8c4b26', text: '#fffef9' },
  { id: 'amber', name: 'Savanna Twilight Glow', bg: '#f3ece2', text: '#684520' },
]

export const AnnouncementBar: React.FC = () => {
  const { announcementSettings } = useProductStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const activeNotes = announcementSettings?.notes?.filter(n => n.isActive) || []

  // Scroll direction detection: hide on scroll down, reveal on scroll up
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const maxScrollY = document.documentElement.scrollHeight - window.innerHeight

          // Avoid rubber-band overscroll glitching on macOS / iOS
          if (currentScrollY > maxScrollY - 20) {
            ticking = false
            return
          }

          // Always keep visible when near the top or if any header menu is active
          const isMenuOpen = document.querySelector('.the-frankie-header.menu-active') !== null
          if (currentScrollY <= 25 || isMenuOpen) {
            setIsVisible(true)
          } else {
            const delta = currentScrollY - lastScrollY
            if (delta > 6) {
              setIsVisible(false) // Scrolling down
            } else if (delta < -6) {
              setIsVisible(true) // Scrolling up
            }
          }

          lastScrollY = Math.max(0, currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ensure index is within range
  useEffect(() => {
    if (currentIndex >= activeNotes.length && activeNotes.length > 0) {
      setCurrentIndex(0)
    }
  }, [activeNotes.length, currentIndex])

  // Automatic rotation if more than 1 active note
  useEffect(() => {
    if (activeNotes.length <= 1 || isPaused || !announcementSettings?.enabled) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeNotes.length)
    }, Math.max(3, announcementSettings.rotationSpeedSeconds || 5) * 1000)

    return () => clearInterval(interval)
  }, [activeNotes.length, isPaused, announcementSettings?.rotationSpeedSeconds, announcementSettings?.enabled])

  if (!announcementSettings?.enabled || activeNotes.length === 0) {
    return null
  }

  const currentNote = activeNotes[currentIndex] || activeNotes[0]

  // Resolve background and text colors
  const defaultPreset = COLOR_PRESETS.find(p => p.id === announcementSettings.theme) || COLOR_PRESETS[0]
  const activeBgColor = currentNote?.bgColor || announcementSettings.bgColor || defaultPreset.bg
  const activeTextColor = currentNote?.textColor || announcementSettings.textColor || defaultPreset.text

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(prev => (prev - 1 + activeNotes.length) % activeNotes.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(prev => (prev + 1) % activeNotes.length)
  }

  return (
    <div
      className={`the-announcement-bar ${!isVisible ? 'is-hidden' : ''}`}
      role="region"
      aria-label="Studio Announcement"
      style={{
        backgroundColor: activeBgColor,
        color: activeTextColor,
        borderColor: `color-mix(in srgb, ${activeTextColor} 12%, transparent)`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="announcement-inner">
        {/* Navigation arrow (left) */}
        {activeNotes.length > 1 && (
          <button
            type="button"
            className="announcement-nav-btn prev"
            onClick={handlePrev}
            style={{ color: `color-mix(in srgb, ${activeTextColor} 70%, transparent)` }}
            aria-label="Previous announcement"
          >
            <ChevronLeft size={13} />
          </button>
        )}

        {/* Pure Note Content (No badge label, no links) */}
        <div className="announcement-content-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNote.id || currentIndex}
              className="announcement-content"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <span className="announcement-text-main">{currentNote.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrow (right) */}
        {activeNotes.length > 1 && (
          <button
            type="button"
            className="announcement-nav-btn next"
            onClick={handleNext}
            style={{ color: `color-mix(in srgb, ${activeTextColor} 70%, transparent)` }}
            aria-label="Next announcement"
          >
            <ChevronRight size={13} />
          </button>
        )}

        {/* Multiple notes dots indicator */}
        {activeNotes.length > 1 && (
          <div className="announcement-dots" aria-hidden="true">
            {activeNotes.map((_, i) => (
              <span
                key={i}
                className={`announcement-dot ${i === currentIndex ? 'active' : ''}`}
                style={{
                  backgroundColor:
                    i === currentIndex
                      ? activeTextColor
                      : `color-mix(in srgb, ${activeTextColor} 25%, transparent)`,
                }}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
