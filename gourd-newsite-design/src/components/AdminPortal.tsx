import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Search,
  Download,
  Upload,
  RefreshCw,
  Eye,
  ArrowLeft,
  X,
  Sliders,
  DollarSign,
  Tag,
  Shield,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Megaphone,
  Bell,
  Calendar
} from 'lucide-react'
import { useProductStore, type Product } from '../context/ProductContext'
import GourdLogo from './GourdLogo'
import './AdminPortal.css'

export const AdminPortal: React.FC = () => {
  const {
    products,
    studioSettings,
    announcementSettings,
    isAuthenticated,
    adminEmail,
    updateProduct,
    addProduct,
    deleteProduct,
    resetToDefaults,
    updateStudioSettings,
    updateAnnouncementSettings,
    addAnnouncementNote,
    updateAnnouncementNote,
    deleteAnnouncementNote,
    login,
    logout,
    changePassword,
    exportProductsJson,
    importProductsJson
  } = useProductStore()

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'products' | 'announcements' | 'settings' | 'backup' | 'security'>('products')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Security tab state
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const success = login(loginEmail, loginPassword)
    if (!success) {
      setLoginError('Invalid studio credentials. Please check your email and password.')
    }
  }

  // Handle Password Change
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setPasswordStatus('Password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus('Passwords do not match.')
      return
    }
    const ok = changePassword(newPassword)
    if (ok) {
      setPasswordStatus('Password updated successfully!')
      setNewPassword('')
      setConfirmPassword('')
      showToast('Admin password updated.')
    } else {
      setPasswordStatus('Failed to update password.')
    }
  }

  // Handle Image Upload (Local file to DataURL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetProduct: Product) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      if (result) {
        const updatedImages = [result, ...(targetProduct.images || [])]
        setEditingProduct({ ...targetProduct, images: updatedImages })
      }
    }
    reader.readAsDataURL(file)
  }

  // Save Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    if (isAddingNew) {
      addProduct(editingProduct)
      showToast(`Added "${editingProduct.name}" to catalog!`)
    } else {
      updateProduct(editingProduct.id, editingProduct)
      showToast(`Updated "${editingProduct.name}" successfully!`)
    }

    setEditingProduct(null)
    setIsAddingNew(false)
  }

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' ||
      p.category === selectedCategory ||
      (p.subCategory && p.subCategory.toLowerCase() === selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  // Export JSON backup file
  const handleDownloadBackup = () => {
    const jsonStr = exportProductsJson()
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gourd-shades-products-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Catalog backup downloaded.')
  }

  // Import JSON backup file
  const handleFileUploadImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      const success = importProductsJson(content)
      if (success) {
        showToast('Backup restored successfully!')
      } else {
        alert('Invalid JSON file format. Make sure it contains valid Gourd Shades product data.')
      }
    }
    reader.readAsText(file)
  }

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <GourdLogo iconSize={42} showText={true} />
            <span className="admin-portal-badge">STUDIO CMS PORTAL</span>
          </div>

          <p className="admin-login-desc">
            Direct studio administration. Edit prices, adjust gourd shape availability notes, update photography, and manage your luminaire catalog.
          </p>

          {loginError && (
            <div className="admin-alert error">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label>Studio Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="admin@gourdshades.com"
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Studio Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="admin-input"
              />
            </div>

            <button type="submit" className="admin-btn primary full-width">
              <Lock size={16} /> Sign In to Studio Admin
            </button>
          </form>

          <div className="admin-login-help">
            <small>Default credentials: <code>admin@gourdshades.com</code> / <code>arusha-studio-2026</code></small>
            <div className="admin-return-link">
              <Link to="/">
                <ArrowLeft size={14} /> Return to Storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated Admin Dashboard
  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <GourdLogo iconSize={36} showText={true} />
          <span className="admin-mode-pill">STUDIO ADMIN</span>
        </div>

        <div className="admin-topbar-actions">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="admin-topbar-link">
            <Eye size={15} /> View Live Storefront
          </Link>
          <button type="button" onClick={logout} className="admin-btn outline small">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="admin-layout">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <nav className="admin-nav-list">
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Tag size={16} />
              <span>Lamps &amp; Prices</span>
              <span className="admin-count-tag">{products.length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveTab('announcements')}
            >
              <Megaphone size={16} />
              <span>Announcements &amp; Notes</span>
              <span className="admin-count-tag">
                {announcementSettings?.notes?.filter(n => n.isActive).length || 0}
              </span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Sliders size={16} />
              <span>Studio Information</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'backup' ? 'active' : ''}`}
              onClick={() => setActiveTab('backup')}
            >
              <Download size={16} />
              <span>Export &amp; Backups</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={16} />
              <span>Credentials</span>
            </button>
          </nav>

          <div className="admin-sidebar-footer">
            <p>Signed in as:</p>
            <strong>{adminEmail}</strong>
          </div>
        </aside>

        {/* Workspace Area */}
        <main className="admin-main">
          {/* TAB 1: PRODUCTS / LAMPS & PRICES */}
          {activeTab === 'products' && (
            <div className="admin-tab-content">
              {/* Header and Controls */}
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-title">Luminaires Catalog &amp; Pricing</h1>
                  <p className="admin-subtitle">
                    Update prices, availability notes, and photography across all 39 hand-carved calabashes.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn primary"
                  onClick={() => {
                    setIsAddingNew(true)
                    setEditingProduct({
                      id: `custom-lamp-${Date.now()}`,
                      name: 'New Calabash Luminaire',
                      category: 'piece',
                      subCategory: 'Artisan Pieces',
                      price: '$120 - $160',
                      images: ['/images/standing-bedside-2.jpeg'],
                      description: 'Hand-carved one-of-a-kind calabash lamp crafted in our Arusha studio.',
                      longDescription: 'Hand-carved one-of-a-kind calabash lamp crafted in our Arusha studio.',
                      specifications: [
                        'Dimensions: Standard size (20"-30" diameter / 25"-35cm height)',
                        'Materials: Organic natural calabash (gourd)',
                        'Bulb Type: E27 standard base',
                        'Warranty: 3-month studio guarantee'
                      ],
                      features: ['Handcrafted in Tanzania', 'Unique natural pattern', 'Standard E27 fitting'],
                      availabilityStatus: 'available',
                      availabilityNote: 'Rare gourd shape. Handcrafted to order.'
                    })
                  }}
                >
                  <Plus size={16} /> Add New Luminaire
                </button>
              </div>

              {/* Filters Bar */}
              <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                  <Search size={16} className="admin-search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search lamp by title, category, or note..."
                    className="admin-input search-input"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="admin-clear-btn">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="admin-select-wrap">
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Categories ({products.length})</option>
                    <option value="piece">Artisan Pieces</option>
                    <option value="floor">Floor Lamps</option>
                    <option value="hanging">Hanging Pendants</option>
                    <option value="wall">Wall Lamps</option>
                    <option value="bedside">Bedside &amp; Table</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Table */}
              <div className="admin-products-table">
                <div className="admin-table-head">
                  <div className="col-img">Lamp</div>
                  <div className="col-details">Details &amp; Category</div>
                  <div className="col-price">Current Price</div>
                  <div className="col-status">Availability Status</div>
                  <div className="col-actions">Actions</div>
                </div>

                <div className="admin-table-body">
                  {filteredProducts.length === 0 ? (
                    <div className="admin-empty-state">
                      <p>No luminaires match your search criteria.</p>
                      <button type="button" onClick={() => { setSearchQuery(''); setSelectedCategory('all') }} className="admin-btn outline small">
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    filteredProducts.map(product => (
                      <div key={product.id} className="admin-table-row">
                        <div className="col-img">
                          <img
                            src={product.images[0] || '/images/standing-bedside-2.jpeg'}
                            alt={product.name}
                            className="admin-thumb"
                          />
                        </div>

                        <div className="col-details">
                          <strong className="product-row-name">{product.name}</strong>
                          <span className="product-row-cat">
                            {product.subCategory || product.category}
                          </span>
                          <p className="product-row-desc">{product.description}</p>
                        </div>

                        <div className="col-price">
                          <span className="price-tag">{product.price}</span>
                        </div>

                        <div className="col-status">
                          <span className={`status-pill ${product.availabilityStatus || 'available'}`}>
                            {product.availabilityStatus === 'sold'
                              ? 'Sold Out'
                              : product.availabilityStatus === 'rare'
                              ? 'Rare Shape'
                              : 'Available'}
                          </span>
                          {product.availabilityNote && (
                            <small className="availability-note-hint">{product.availabilityNote}</small>
                          )}
                        </div>

                        <div className="col-actions">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingNew(false)
                              setEditingProduct(JSON.parse(JSON.stringify(product)))
                            }}
                            className="admin-icon-btn"
                            title="Edit Luminaire"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                                deleteProduct(product.id)
                                showToast(`Deleted "${product.name}"`)
                              }
                            }}
                            className="admin-icon-btn danger"
                            title="Delete Luminaire"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANNOUNCEMENT RIBBON & NOTES */}
          {activeTab === 'announcements' && (
            <div className="admin-tab-content">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-title">Storefront Announcement Ribbon</h1>
                  <p className="admin-subtitle">
                    Publish clean announcement notes at the top of the storefront for shipping perks, new lamp sales, and upcoming studio events with custom color styles.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn primary"
                  onClick={() => {
                    addAnnouncementNote({
                      text: 'New studio collection available for viewing',
                      bgColor: '#f7f5ef',
                      textColor: '#242521',
                      isActive: true,
                    })
                    showToast('Added new announcement note!')
                  }}
                >
                  <Plus size={16} /> Add Announcement Note
                </button>
              </div>

              {/* 1. Live Visual Preview */}
              {(() => {
                const activeNote = announcementSettings.notes.find(n => n.isActive) || announcementSettings.notes[0]
                const previewBg = activeNote?.bgColor || announcementSettings.bgColor || '#f7f5ef'
                const previewText = activeNote?.textColor || announcementSettings.textColor || '#242521'

                return (
                  <div className="announcement-preview-card">
                    <div className="announcement-preview-label">
                      <span>Live Storefront Preview (Pure Note Text)</span>
                      <span>
                        Status: {announcementSettings.enabled ? '🟢 Live on Storefront' : '⚪ Disabled (Hidden)'}
                      </span>
                    </div>
                    <div className="announcement-preview-container">
                      <div
                        className="the-announcement-bar"
                        style={{
                          backgroundColor: previewBg,
                          color: previewText,
                          borderColor: `color-mix(in srgb, ${previewText} 14%, transparent)`,
                          position: 'relative',
                        }}
                      >
                        <div className="announcement-inner">
                          <div className="announcement-content">
                            <span className="announcement-text-main">
                              {activeNote?.text || 'No active announcement note.'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* 2. Master Ribbon Controls Card */}
              <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: '#1a1a18' }}>Ribbon Display Settings</h3>
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Ribbon Visibility</label>
                    <select
                      className="admin-input"
                      value={announcementSettings.enabled ? 'true' : 'false'}
                      onChange={e => {
                        updateAnnouncementSettings({ enabled: e.target.value === 'true' })
                        showToast(`Announcement bar ${e.target.value === 'true' ? 'enabled' : 'disabled'}`)
                      }}
                    >
                      <option value="true">🟢 Enabled — Show on top of storefront</option>
                      <option value="false">⚪ Disabled — Hide announcement bar</option>
                    </select>
                    <small>Turn the top banner on or off across the entire site.</small>
                  </div>

                  <div className="admin-grid-2" style={{ gap: '12px' }}>
                    <div className="admin-form-group">
                      <label>Default Color Palette</label>
                      <select
                        className="admin-input"
                        value={announcementSettings.theme}
                        onChange={e => {
                          const val = e.target.value
                          const colorMap: Record<string, { bg: string; text: string }> = {
                            cream: { bg: '#f7f5ef', text: '#22231f' },
                            terracotta: { bg: '#dc3331', text: '#ffffff' },
                            dark: { bg: '#1e1f1c', text: '#f7f5ef' },
                            sage: { bg: '#394234', text: '#f5f4ee' },
                            clay: { bg: '#8c4b26', text: '#fffef9' },
                            amber: { bg: '#f3ece2', text: '#684520' },
                          }
                          const chosen = colorMap[val] || colorMap.cream
                          updateAnnouncementSettings({
                            theme: val,
                            bgColor: chosen.bg,
                            textColor: chosen.text,
                          })
                          showToast('Updated default color theme!')
                        }}
                      >
                        <option value="cream">Alabaster Cream (#f7f5ef)</option>
                        <option value="terracotta">Studio Terracotta (#dc3331)</option>
                        <option value="dark">Obsidian Slate (#1e1f1c)</option>
                        <option value="sage">Botanical Olive (#394234)</option>
                        <option value="clay">Warm Clay / Bronze (#8c4b26)</option>
                        <option value="amber">Savanna Twilight Glow (#f3ece2)</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label>Rotation Interval</label>
                      <select
                        className="admin-input"
                        value={announcementSettings.rotationSpeedSeconds}
                        onChange={e => {
                          updateAnnouncementSettings({ rotationSpeedSeconds: Number(e.target.value) })
                          showToast('Updated rotation speed!')
                        }}
                      >
                        <option value={3}>3 seconds</option>
                        <option value={5}>5 seconds (Default)</option>
                        <option value={8}>8 seconds</option>
                        <option value={10}>10 seconds</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Notes Manager List */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: '#1a1a18' }}>
                    Announcement Notes ({announcementSettings.notes.length})
                  </h3>
                  <small style={{ color: '#7a776e' }}>
                    Notes display purely as text without badges or links. Each note can have its own distinct color.
                  </small>
                </div>

                {announcementSettings.notes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7b786f' }}>
                    <p>No announcement notes yet. Add one or pick a quick preset below!</p>
                  </div>
                ) : (
                  announcementSettings.notes.map((note, idx) => (
                    <div key={note.id} className={`announcement-note-card ${!note.isActive ? 'is-inactive' : ''}`}>
                      <div className="announcement-note-header">
                        <div className="announcement-note-title">
                          <span>Note #{idx + 1}</span>
                          <span className={`announcement-status-pill ${note.isActive ? 'active' : 'inactive'}`}>
                            {note.isActive ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <div className="announcement-note-actions">
                          <button
                            type="button"
                            className="admin-btn secondary"
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                            onClick={() => {
                              updateAnnouncementNote(note.id, { isActive: !note.isActive })
                              showToast(`Note #${idx + 1} ${!note.isActive ? 'activated' : 'paused'}`)
                            }}
                          >
                            {note.isActive ? 'Pause Note' : 'Activate Note'}
                          </button>
                          <button
                            type="button"
                            className="admin-icon-btn danger"
                            title="Delete Note"
                            onClick={() => {
                              if (confirm('Delete this announcement note?')) {
                                deleteAnnouncementNote(note.id)
                                showToast('Deleted announcement note')
                              }
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Announcement Note Message</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={note.text}
                          placeholder="e.g. Free, tracked shipping over $49"
                          onChange={e => updateAnnouncementNote(note.id, { text: e.target.value })}
                        />
                      </div>

                      {/* Color Palette for this specific note */}
                      <div className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label>Note Color &amp; Background</label>
                        <div className="color-swatch-row">
                          {[
                            { name: 'Alabaster Cream', bg: '#f7f5ef', text: '#22231f' },
                            { name: 'Terracotta', bg: '#dc3331', text: '#ffffff' },
                            { name: 'Obsidian Dark', bg: '#1e1f1c', text: '#f7f5ef' },
                            { name: 'Botanical Olive', bg: '#394234', text: '#f5f4ee' },
                            { name: 'Warm Clay', bg: '#8c4b26', text: '#fffef9' },
                            { name: 'Savanna Glow', bg: '#f3ece2', text: '#684520' },
                          ].map(swatch => {
                            const isCurrent = note.bgColor === swatch.bg
                            return (
                              <button
                                key={swatch.name}
                                type="button"
                                className={`color-swatch-btn ${isCurrent ? 'is-active' : ''}`}
                                style={{ backgroundColor: swatch.bg, color: swatch.text }}
                                onClick={() => {
                                  updateAnnouncementNote(note.id, {
                                    bgColor: swatch.bg,
                                    textColor: swatch.text,
                                  })
                                  showToast(`Set color to ${swatch.name}!`)
                                }}
                              >
                                {isCurrent && <Check size={11} />}
                                <span>{swatch.name}</span>
                              </button>
                            )
                          })}

                          {/* Custom Color Inputs */}
                          <div className="color-picker-inline" style={{ marginLeft: '6px' }}>
                            <label style={{ fontSize: '11px', margin: 0, fontWeight: 500 }}>Custom BG:</label>
                            <input
                              type="color"
                              value={note.bgColor || '#f7f5ef'}
                              onChange={e => updateAnnouncementNote(note.id, { bgColor: e.target.value })}
                              title="Pick custom background color"
                            />
                            <label style={{ fontSize: '11px', margin: 0, fontWeight: 500 }}>Text:</label>
                            <input
                              type="color"
                              value={note.textColor || '#22231f'}
                              onChange={e => updateAnnouncementNote(note.id, { textColor: e.target.value })}
                              title="Pick custom text color"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Quick Presets */}
                <div className="announcement-presets-box">
                  <h4>Quick One-Click Announcement Presets (Pure Notes with Distinct Colors)</h4>
                  <div className="announcement-presets-row">
                    <button
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => {
                        addAnnouncementNote({
                          text: 'Free, tracked shipping over $49',
                          bgColor: '#f7f5ef',
                          textColor: '#242521',
                          isActive: true,
                        })
                        showToast('Added Free Tracked Shipping note in Cream!')
                      }}
                    >
                      <Plus size={13} /> Free Tracked Shipping (Cream)
                    </button>

                    <button
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => {
                        addAnnouncementNote({
                          text: 'New In: Savanna Twilight Capsule now live • Inaugural collector run',
                          bgColor: '#dc3331',
                          textColor: '#ffffff',
                          isActive: true,
                        })
                        showToast('Added New Lamp Capsule note in Terracotta!')
                      }}
                    >
                      <Plus size={13} /> New Lamps On Sale / Drop (Terracotta)
                    </button>

                    <button
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => {
                        addAnnouncementNote({
                          text: 'Upcoming Studio Event: Live artisan gourd carving sessions in Arusha',
                          bgColor: '#394234',
                          textColor: '#f5f4ee',
                          isActive: true,
                        })
                        showToast('Added Upcoming Event note in Botanical Olive!')
                      }}
                    >
                      <Plus size={13} /> Upcoming Studio Event (Olive)
                    </button>

                    <button
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => {
                        addAnnouncementNote({
                          text: 'Bespoke Studio Commissions Open: Order your custom designed luminaire',
                          bgColor: '#8c4b26',
                          textColor: '#fffef9',
                          isActive: true,
                        })
                        showToast('Added Bespoke Commissions note in Warm Clay!')
                      }}
                    >
                      <Plus size={13} /> Bespoke Commissions (Warm Clay)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDIO SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-tab-content">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-title">Studio Information &amp; Contacts</h1>
                  <p className="admin-subtitle">
                    Configure your Arusha studio contact numbers, checkout details, and live announcements.
                  </p>
                </div>
              </div>

              <div className="admin-card settings-card">
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    showToast('Studio details updated!')
                  }}
                  className="admin-form"
                >
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label><Phone size={14} /> Phone / WhatsApp Hotline</label>
                      <input
                        type="text"
                        value={studioSettings.whatsapp}
                        onChange={e => updateStudioSettings({ whatsapp: e.target.value })}
                        className="admin-input"
                      />
                      <small>Used for direct WhatsApp inquiries from customer buttons.</small>
                    </div>

                    <div className="admin-form-group">
                      <label><Mail size={14} /> Studio Contact Email</label>
                      <input
                        type="email"
                        value={studioSettings.email}
                        onChange={e => updateStudioSettings({ email: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label><MapPin size={14} /> Studio Workshop Address</label>
                    <input
                      type="text"
                      value={studioSettings.address}
                      onChange={e => updateStudioSettings({ address: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label><Sparkles size={14} /> Top Navigation Announcement / Status</label>
                    <input
                      type="text"
                      value={studioSettings.announcement}
                      onChange={e => updateStudioSettings({ announcement: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label><Shield size={14} /> Electrical Guarantee Note</label>
                    <textarea
                      rows={3}
                      value={studioSettings.guaranteeNote}
                      onChange={e => updateStudioSettings({ guaranteeNote: e.target.value })}
                      className="admin-textarea"
                    />
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="admin-btn primary">
                      <Check size={16} /> Save Studio Information
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT & BACKUPS */}
          {activeTab === 'backup' && (
            <div className="admin-tab-content">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-title">Catalog Export &amp; Backup</h1>
                  <p className="admin-subtitle">
                    Safely export your product catalog data to JSON or restore from a previously exported backup file.
                  </p>
                </div>
              </div>

              <div className="admin-backup-grid">
                <div className="admin-card backup-box">
                  <h3>Download Data Backup</h3>
                  <p>Download the full catalog of {products.length} lamps including your latest prices, descriptions, and uploaded images as a JSON file.</p>
                  <button type="button" onClick={handleDownloadBackup} className="admin-btn primary">
                    <Download size={16} /> Export products.json
                  </button>
                </div>

                <div className="admin-card backup-box">
                  <h3>Restore from Backup</h3>
                  <p>Upload a previously exported <code>products.json</code> file to overwrite or restore your catalog.</p>
                  <label className="admin-btn outline file-btn">
                    <Upload size={16} /> Select Backup File
                    <input type="file" accept=".json" onChange={handleFileUploadImport} style={{ display: 'none' }} />
                  </label>
                </div>

                <div className="admin-card backup-box danger">
                  <h3>Reset to Factory Catalog</h3>
                  <p>Revert all edits back to the initial 39 studio lamps data. This clears any local edits.</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all products back to original factory defaults? All local edits will be cleared.')) {
                        resetToDefaults()
                        showToast('Reset to factory defaults.')
                      }
                    }}
                    className="admin-btn danger"
                  >
                    <RefreshCw size={16} /> Reset Everything
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & CREDENTIALS */}
          {activeTab === 'security' && (
            <div className="admin-tab-content">
              <div className="admin-section-header">
                <div>
                  <h1 className="admin-title">Admin Credentials</h1>
                  <p className="admin-subtitle">
                    Update your studio access password to keep your dashboard secure.
                  </p>
                </div>
              </div>

              <div className="admin-card settings-card">
                <form onSubmit={handlePasswordChangeSubmit} className="admin-form">
                  {passwordStatus && (
                    <div className={`admin-alert ${passwordStatus.includes('success') ? 'success' : 'error'}`}>
                      <AlertCircle size={16} />
                      <span>{passwordStatus}</span>
                    </div>
                  )}

                  <div className="admin-form-group">
                    <label>Current Admin Email</label>
                    <input type="text" disabled value={adminEmail} className="admin-input disabled" />
                  </div>

                  <div className="admin-form-group">
                    <label>New Password (min. 6 characters)</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="admin-btn primary">
                      <Check size={16} /> Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* EDIT / CREATE PRODUCT MODAL */}
      {editingProduct && (
        <div className="admin-modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2>{isAddingNew ? 'Add New Luminaire' : `Edit: ${editingProduct.name}`}</h2>
              <button type="button" onClick={() => setEditingProduct(null)} className="admin-close-modal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-modal-body">
              {/* Row 1: Name and Price */}
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>Luminaire Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label><DollarSign size={14} /> Price / Price Range *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    placeholder="$100 - $150 or $120"
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Row 2: Category and Availability Status */}
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label>SubCategory / Collection</label>
                  <input
                    type="text"
                    value={editingProduct.subCategory || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                    placeholder="e.g. Wildlife Sculptures, Bedside & Table, Floor Lamps"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Stock / Availability Status</label>
                  <select
                    value={editingProduct.availabilityStatus || 'available'}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        availabilityStatus: e.target.value as 'available' | 'sold' | 'rare'
                      })
                    }
                    className="admin-select"
                  >
                    <option value="available">In Stock / Available</option>
                    <option value="rare">Rare Gourd Shape (Check Availability)</option>
                    <option value="sold">Sold Out (Bespoke Remake on Request)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Availability Special Note */}
              <div className="admin-form-group">
                <label>Gourd Shape / Availability Note</label>
                <input
                  type="text"
                  value={editingProduct.availabilityNote || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, availabilityNote: e.target.value })}
                  placeholder="e.g. Please check availability of this gourd shape since each calabash is rare and one-of-a-kind."
                  className="admin-input"
                />
                <small>Displayed prominently on product pages to inform customers about rare shapes.</small>
              </div>

              {/* Row 4: Short Human Description (Max 3 lines) */}
              <div className="admin-form-group">
                <label>Human Short Description (Max 3 lines)</label>
                <textarea
                  rows={3}
                  required
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Warm human description of the carved piece..."
                  className="admin-textarea"
                />
              </div>

              {/* Row 5: Images Manager */}
              <div className="admin-form-group">
                <label><ImageIcon size={14} /> Luminaire Photos ({editingProduct.images.length})</label>
                <div className="admin-images-manager">
                  {editingProduct.images.map((img, idx) => (
                    <div key={idx} className="admin-img-thumb-box">
                      <img src={img} alt={`Preview ${idx + 1}`} />
                      {idx === 0 && <span className="primary-tag">Primary</span>}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProduct.images.filter((_, i) => i !== idx)
                          setEditingProduct({ ...editingProduct, images: updated })
                        }}
                        className="admin-img-del"
                        title="Remove photo"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  <label className="admin-add-img-btn">
                    <Plus size={20} />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageFileUpload(e, editingProduct)}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Add Photo via URL */}
                <div className="admin-add-url-row">
                  <input
                    type="text"
                    id="newImageUrlInput"
                    placeholder="Or paste an image URL (/images/photo.jpg or https://...)"
                    className="admin-input small"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        if (input.value.trim()) {
                          setEditingProduct({
                            ...editingProduct,
                            images: [...editingProduct.images, input.value.trim()]
                          })
                          input.value = ''
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('newImageUrlInput') as HTMLInputElement | null
                      if (input && input.value.trim()) {
                        setEditingProduct({
                          ...editingProduct,
                          images: [...editingProduct.images, input.value.trim()]
                        })
                        input.value = ''
                      }
                    }}
                    className="admin-btn outline small"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="admin-modal-footer">
                <button type="button" onClick={() => setEditingProduct(null)} className="admin-btn outline">
                  Cancel
                </button>
                <button type="submit" className="admin-btn primary">
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPortal
