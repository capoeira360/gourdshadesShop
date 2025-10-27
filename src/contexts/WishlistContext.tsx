'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_FROM_STORAGE'; payload: { items: WishlistItem[]; totalItems: number } };

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

// Helper functions for localStorage
const STORAGE_KEY = 'wishlist-items';

const loadFromStorage = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('📥 Loading from localStorage:', stored);
    const result = stored ? JSON.parse(stored) : [];
    console.log('📥 Parsed result:', result);
    return result;
  } catch (error) {
    console.error('❌ Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveToStorage = (items: WishlistItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    console.log('💾 Saving to localStorage:', items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log('✅ Successfully saved to localStorage');
  } catch (error) {
    console.error('❌ Error saving wishlist to localStorage:', error);
  }
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  console.log('🔄 Wishlist Reducer - Action:', action.type, 'Current State:', state);
  
  switch (action.type) {
    case 'ADD_ITEM': {
      console.log('➕ Adding item to wishlist:', action.payload);
      // Check if item already exists
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        console.log('⚠️ Item already in wishlist, not adding duplicate');
        // Item already in wishlist, don't add duplicate
        return state;
      }

      const newItems = [...state.items, action.payload];
      const totalItems = newItems.length;

      // Save to localStorage
      saveToStorage(newItems);
      console.log('✅ Item added successfully. New state:', { items: newItems, totalItems });

      return {
        ...state,
        items: newItems,
        totalItems,
      };
    }

    case 'REMOVE_ITEM': {
      console.log('➖ Removing item from wishlist:', action.payload);
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.length;

      // Save to localStorage
      saveToStorage(newItems);
      console.log('✅ Item removed successfully. New state:', { items: newItems, totalItems });

      return {
        ...state,
        items: newItems,
        totalItems,
      };
    }

    case 'CLEAR_WISHLIST':
      console.log('🗑️ Clearing entire wishlist');
      // Clear localStorage
      saveToStorage([]);
      console.log('✅ Wishlist cleared successfully');
      
      return {
        ...state,
        items: [],
        totalItems: 0,
      };

    case 'LOAD_FROM_STORAGE':
      console.log('📥 Loading wishlist from storage:', action.payload);
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
      };

    default:
      return state;
  }
}

interface WishlistContextType {
  state: WishlistState;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    console.log('🚀 WishlistProvider useEffect - Loading from storage on mount');
    console.log('🌐 Window object exists:', typeof window !== 'undefined');
    console.log('🌐 localStorage available:', typeof window !== 'undefined' && window.localStorage);
    
    const storedItems = loadFromStorage();
    console.log('📦 Stored items found:', storedItems);
    
    if (storedItems.length > 0) {
      const totalItems = storedItems.length;
      console.log('📊 Dispatching LOAD_FROM_STORAGE with:', { items: storedItems, totalItems });
      
      // Initialize state with stored items
      dispatch({ 
        type: 'LOAD_FROM_STORAGE', 
        payload: { items: storedItems, totalItems } 
      });
    } else {
      console.log('📭 No stored items found, keeping empty state');
    }
  }, []);

  const addItem = (item: WishlistItem) => {
    console.log('🎯 addItem called with:', item);
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    console.log('🎯 removeItem called with id:', id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearWishlist = () => {
    console.log('🎯 clearWishlist called');
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: string) => {
    const result = state.items.some(item => item.id === id);
    console.log('🔍 isInWishlist called for id:', id, 'result:', result);
    return result;
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}