import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, SlidersHorizontal, Lock, Check } from 'lucide-react'
import './CookieConsent.css'

const STORAGE_KEY = 'gourd-shades-cookie-consent'

export interface CookiePreferences {
  necessary: boolean
  preferences: boolean
  analytics: boolean
  timestamp: string
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    preferences: true,
    analytics: false,
    timestamp: '',
  })

  // Load existing consent on mount or schedule gentle entrance
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPreferences(JSON.parse(stored))
      } else {
        // Respectful delay so it doesn't collide with initial hero entrance
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 1400)
        return () => clearTimeout(timer)
      }
    } catch {
      setIsVisible(true)
    }
  }, [])

  // Listen for custom event to re-open preferences (e.g. from footer)
  useEffect(() => {
    const handleOpenPreferences = () => {
      setIsModalOpen(true)
    }
    window.addEventListener('open-cookie-preferences', handleOpenPreferences)
    return () => window.removeEventListener('open-cookie-preferences', handleOpenPreferences)
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    const payload = {
      ...prefs,
      necessary: true,
      timestamp: new Date().toISOString(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // Storage unavailable fallback
    }
    setPreferences(payload)
    setIsVisible(false)
    setIsModalOpen(false)
  }

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      timestamp: '',
    })
  }

  const handleEssentialOnly = () => {
    saveConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      timestamp: '',
    })
  }

  const handleSaveCustom = () => {
    saveConsent(preferences)
  }

  return (
    <>
      {/* 1. FLOATING CORNER BANNER */}
      <AnimatePresence>
        {isVisible && !isModalOpen && (
          <motion.aside
            className="cookie-banner"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Cookie consent banner"
          >
            <div className="cookie-banner-header">
              <div className="cookie-banner-badge">
                <Cookie size={16} strokeWidth={2} />
                <span>Studio Cookies</span>
              </div>
              <button
                type="button"
                className="cookie-close-btn"
                onClick={handleEssentialOnly}
                aria-label="Dismiss cookie notice with essential cookies"
              >
                <X size={15} />
              </button>
            </div>

            <p className="cookie-banner-text">
              We use essential cookies to keep your inquiry bag active and provide a smooth
              browsing experience. We never sell your data or deploy third-party advertising trackers.
            </p>

            <div className="cookie-banner-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-outline"
                onClick={handleEssentialOnly}
              >
                Essential Only
              </button>
              <button
                type="button"
                className="cookie-btn-text"
                onClick={() => setIsModalOpen(true)}
              >
                <SlidersHorizontal size={13} /> Customize
              </button>
            </div>

            <div className="cookie-banner-footer">
              <Link to="/privacy" className="cookie-privacy-link">
                Read our Privacy Policy →
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. CUSTOMIZE PREFERENCES MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="cookie-modal-overlay">
            <motion.div
              className="cookie-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="cookie-modal-card"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-modal-title"
            >
              <div className="cookie-modal-header">
                <div>
                  <h3 id="cookie-modal-title">Cookie Preferences</h3>
                  <p>Customize which cookies you wish to allow during your visit.</p>
                </div>
                <button
                  type="button"
                  className="cookie-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close preferences"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="cookie-categories-list">
                {/* 1. Necessary */}
                <div className="cookie-category-item locked">
                  <div className="cookie-category-info">
                    <div className="cookie-category-title-row">
                      <Lock size={14} className="category-icon" />
                      <strong>Strictly Necessary</strong>
                      <span className="cookie-status-pill locked">Always Active</span>
                    </div>
                    <p>
                      Required for basic storefront functionality—such as saving handcrafted lamps
                      in your inquiry bag and securing communication with our studio.
                    </p>
                  </div>
                  <div className="cookie-toggle locked">
                    <Check size={13} strokeWidth={2.5} />
                  </div>
                </div>

                {/* 2. Experience & Preferences */}
                <div className="cookie-category-item">
                  <div className="cookie-category-info">
                    <div className="cookie-category-title-row">
                      <SlidersHorizontal size={14} className="category-icon" />
                      <strong>Experience &amp; Motion</strong>
                    </div>
                    <p>
                      Remembers your personal preferences, including reduced motion settings,
                      volume choices, and smoother layout animations.
                    </p>
                  </div>
                  <label className="cookie-switch" aria-label="Toggle Experience & Motion cookies">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={e =>
                        setPreferences(prev => ({ ...prev, preferences: e.target.checked }))
                      }
                    />
                    <span className="cookie-slider" />
                  </label>
                </div>

                {/* 3. Anonymous Analytics */}
                <div className="cookie-category-item">
                  <div className="cookie-category-info">
                    <div className="cookie-category-title-row">
                      <Cookie size={14} className="category-icon" />
                      <strong>Anonymous Analytics</strong>
                    </div>
                    <p>
                      Helps our artisans anonymously understand which calabash shapes and crystal
                      carvings inspire visitors most, assisting future collection planning.
                    </p>
                  </div>
                  <label className="cookie-switch" aria-label="Toggle Anonymous Analytics cookies">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={e =>
                        setPreferences(prev => ({ ...prev, analytics: e.target.checked }))
                      }
                    />
                    <span className="cookie-slider" />
                  </label>
                </div>
              </div>

              <div className="cookie-modal-footer">
                <div className="cookie-modal-footer-left">
                  <Link to="/privacy" onClick={() => setIsModalOpen(false)}>
                    Learn more in our Privacy Policy
                  </Link>
                </div>
                <div className="cookie-modal-footer-actions">
                  <button
                    type="button"
                    className="cookie-btn cookie-btn-outline"
                    onClick={handleAcceptAll}
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    className="cookie-btn cookie-btn-primary"
                    onClick={handleSaveCustom}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
export default CookieConsent

