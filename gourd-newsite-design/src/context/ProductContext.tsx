import React, { createContext, useContext, useState, useEffect } from 'react'
import { products as initialProducts, type Product as BaseProduct } from '../data/products'

export interface Product extends BaseProduct {
  availabilityStatus?: 'available' | 'sold' | 'rare';
  availabilityNote?: string;
}

export interface AnnouncementNote {
  id: string;
  text: string;
  bgColor?: string;
  textColor?: string;
  link?: string;
  linkText?: string;
  isActive: boolean;
}

export interface AnnouncementSettings {
  enabled: boolean;
  theme: string;
  bgColor?: string;
  textColor?: string;
  rotationSpeedSeconds: number;
  notes: AnnouncementNote[];
}

export const DEFAULT_ANNOUNCEMENT_SETTINGS: AnnouncementSettings = {
  enabled: true,
  theme: 'cream',
  bgColor: '#f7f5ef',
  textColor: '#242521',
  rotationSpeedSeconds: 5,
  notes: [
    {
      id: 'note-1',
      text: 'Free, tracked shipping over $49',
      bgColor: '#f7f5ef',
      textColor: '#242521',
      isActive: true,
    },
    {
      id: 'note-2',
      text: 'New In: Savanna Twilight Capsule now live • Inaugural collector run',
      bgColor: '#dc3331',
      textColor: '#ffffff',
      isActive: true,
    },
    {
      id: 'note-3',
      text: 'Upcoming Studio Event: Live artisan gourd carving sessions in Arusha',
      bgColor: '#394234',
      textColor: '#f5f4ee',
      isActive: true,
    },
  ],
}

export interface StudioSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  announcement: string;
  guaranteeNote: string;
}

const DEFAULT_SETTINGS: StudioSettings = {
  phone: '+255 768 000 000',
  whatsapp: '+255 768 000 000',
  email: 'isaacmunis@gourdshades.com',
  address: 'Arusha Studio, Tanzania',
  announcement: 'Handcrafted one-of-a-kind calabash luminaires. Worldwide shipping available.',
  guaranteeNote: '3-Month Electrical Studio Guarantee on all custom wiring & fittings.'
}

interface ProductContextType {
  products: Product[];
  studioSettings: StudioSettings;
  announcementSettings: AnnouncementSettings;
  isAuthenticated: boolean;
  adminEmail: string;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
  updateStudioSettings: (updates: Partial<StudioSettings>) => void;
  updateAnnouncementSettings: (updates: Partial<AnnouncementSettings>) => void;
  addAnnouncementNote: (note: Omit<AnnouncementNote, 'id'>) => void;
  updateAnnouncementNote: (id: string, updates: Partial<AnnouncementNote>) => void;
  deleteAnnouncementNote: (id: string) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  changePassword: (newPass: string) => boolean;
  exportProductsJson: () => string;
  importProductsJson: (jsonStr: string) => boolean;
}

const STORAGE_KEY_PRODUCTS = 'gourd_shades_products_v1'
const STORAGE_KEY_SETTINGS = 'gourd_shades_settings_v1'
const STORAGE_KEY_ANNOUNCEMENTS = 'gourd_shades_announcements_v1'
const STORAGE_KEY_AUTH = 'gourd_shades_admin_session_v1'
const STORAGE_KEY_CREDS = 'gourd_shades_admin_creds_v1'

const DEFAULT_CREDS = {
  email: 'admin@gourdshades.com',
  password: 'arusha-studio-2026'
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Failed to load products from localStorage:', e)
    }
    return initialProducts as Product[]
  })

  const [studioSettings, setStudioSettings] = useState<StudioSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS)
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
    } catch (e) {
      console.warn('Failed to load settings from localStorage:', e)
    }
    return DEFAULT_SETTINGS
  })

  const [announcementSettings, setAnnouncementSettings] = useState<AnnouncementSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && Array.isArray(parsed.notes)) {
          parsed.notes = parsed.notes.map((n: any) => {
            const { link, linkText, badge, ...rest } = n
            return rest
          })
        }
        return { ...DEFAULT_ANNOUNCEMENT_SETTINGS, ...parsed }
      }
    } catch (e) {
      console.warn('Failed to load announcements from localStorage:', e)
    }
    return DEFAULT_ANNOUNCEMENT_SETTINGS
  })

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true'
    } catch {
      return false
    }
  })

  const [adminEmail, setAdminEmail] = useState<string>(DEFAULT_CREDS.email)

  // Save products on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products))
    } catch (e) {
      console.warn('Failed to save products to localStorage:', e)
    }
  }, [products])

  // Save settings on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(studioSettings))
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e)
    }
  }, [studioSettings])

  // Save announcements on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(announcementSettings))
    } catch (e) {
      console.warn('Failed to save announcements to localStorage:', e)
    }
  }, [announcementSettings])

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev])
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const resetToDefaults = () => {
    setProducts(initialProducts as Product[])
    setStudioSettings(DEFAULT_SETTINGS)
    setAnnouncementSettings(DEFAULT_ANNOUNCEMENT_SETTINGS)
    localStorage.removeItem(STORAGE_KEY_PRODUCTS)
    localStorage.removeItem(STORAGE_KEY_SETTINGS)
    localStorage.removeItem(STORAGE_KEY_ANNOUNCEMENTS)
  }

  const updateStudioSettings = (updates: Partial<StudioSettings>) => {
    setStudioSettings(prev => ({ ...prev, ...updates }))
  }

  const updateAnnouncementSettings = (updates: Partial<AnnouncementSettings>) => {
    setAnnouncementSettings(prev => ({ ...prev, ...updates }))
  }

  const addAnnouncementNote = (note: Omit<AnnouncementNote, 'id'>) => {
    const newNote: AnnouncementNote = {
      ...note,
      id: `note-${Date.now()}`
    }
    setAnnouncementSettings(prev => ({
      ...prev,
      notes: [...prev.notes, newNote]
    }))
  }

  const updateAnnouncementNote = (id: string, updates: Partial<AnnouncementNote>) => {
    setAnnouncementSettings(prev => ({
      ...prev,
      notes: prev.notes.map(n => (n.id === id ? { ...n, ...updates } : n))
    }))
  }

  const deleteAnnouncementNote = (id: string) => {
    setAnnouncementSettings(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== id)
    }))
  }

  const getStoredCreds = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CREDS)
      if (saved) return JSON.parse(saved)
    } catch {}
    return DEFAULT_CREDS
  }

  const login = (email: string, pass: string): boolean => {
    const creds = getStoredCreds()
    const cleanEmail = email.trim().toLowerCase()
    const targetEmail = creds.email.trim().toLowerCase()

    if (cleanEmail === targetEmail && pass.trim() === creds.password.trim()) {
      setIsAuthenticated(true)
      setAdminEmail(creds.email)
      try {
        sessionStorage.setItem(STORAGE_KEY_AUTH, 'true')
      } catch {}
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY_AUTH)
    } catch {}
  }

  const changePassword = (newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 6) return false
    const creds = getStoredCreds()
    creds.password = newPass.trim()
    try {
      localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(creds))
      return true
    } catch {
      return false
    }
  }

  const exportProductsJson = (): string => {
    return JSON.stringify(products, null, 2)
  }

  const importProductsJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr)
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].name) {
        setProducts(parsed)
        return true
      }
    } catch (e) {
      console.error('Import products error:', e)
    }
    return false
  }

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductStore = (): ProductContextType => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductStore must be used within a ProductProvider')
  }
  return context
}
