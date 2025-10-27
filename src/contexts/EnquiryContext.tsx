'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface EnquiryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface EnquiryState {
  items: EnquiryItem[];
  isCartOpen: boolean;
  totalItems: number;
  totalValue: number;
}

type EnquiryAction =
  | { type: 'ADD_ITEM'; payload: Omit<EnquiryItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'LOAD_FROM_STORAGE'; payload: { items: EnquiryItem[]; totalItems: number; totalValue: number } };

const initialState: EnquiryState = {
  items: [],
  isCartOpen: false,
  totalItems: 0,
  totalValue: 0,
};

// Helper functions for localStorage
const STORAGE_KEY = 'enquiry-cart';

const loadFromStorage = (): EnquiryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading enquiry cart from localStorage:', error);
    return [];
  }
};

const saveToStorage = (items: EnquiryItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving enquiry cart to localStorage:', error);
  }
};

function enquiryReducer(state: EnquiryState, action: EnquiryAction): EnquiryState {

  
  switch (action.type) {
    case 'ADD_ITEM': {

      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: EnquiryItem[];
      if (existingItem) {
        
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Save to localStorage
      saveToStorage(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Save to localStorage
      saveToStorage(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Save to localStorage
      saveToStorage(newItems);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'CLEAR_CART':
      // Clear localStorage
      saveToStorage([]);
      
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalValue: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case 'SET_CART_OPEN':
      return {
        ...state,
        isCartOpen: action.payload,
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        totalValue: action.payload.totalValue,
      };

    default:
      return state;
  }
}

interface EnquiryContextType {
  state: EnquiryState;
  addItem: (item: Omit<EnquiryItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(enquiryReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const storedItems = loadFromStorage();
    if (storedItems.length > 0) {
      const totalItems = storedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = storedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Initialize state with stored items
      dispatch({ 
        type: 'LOAD_FROM_STORAGE', 
        payload: { items: storedItems, totalItems, totalValue } 
      });
    }
  }, []);

  const addItem = (item: Omit<EnquiryItem, 'quantity'>) => {

    dispatch({ type: 'ADD_ITEM', payload: item });

  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setCartOpen = (open: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: open });
  };

  return (
    <EnquiryContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (context === undefined) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}