'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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
  | { type: 'SET_CART_OPEN'; payload: boolean };

const initialState: EnquiryState = {
  items: [],
  isCartOpen: false,
  totalItems: 0,
  totalValue: 0,
};

function enquiryReducer(state: EnquiryState, action: EnquiryAction): EnquiryState {
  console.log('EnquiryReducer: Action received:', action.type, 'payload' in action ? action.payload : 'no payload'); // Debug log
  
  switch (action.type) {
    case 'ADD_ITEM': {
      console.log('EnquiryReducer: Processing ADD_ITEM'); // Debug log
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: EnquiryItem[];
      if (existingItem) {
        console.log('EnquiryReducer: Item exists, updating quantity'); // Debug log
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log('EnquiryReducer: New item, adding to cart'); // Debug log
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      console.log('EnquiryReducer: New state:', { items: newItems, totalItems, totalValue }); // Debug log

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

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'CLEAR_CART':
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

  const addItem = (item: Omit<EnquiryItem, 'quantity'>) => {
    console.log('EnquiryContext: addItem called with:', item); // Debug log
    dispatch({ type: 'ADD_ITEM', payload: item });
    console.log('EnquiryContext: ADD_ITEM action dispatched'); // Debug log
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