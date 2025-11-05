'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface PanelState {
  isNavigationOpen: boolean;
  isEnquiryOpen: boolean;
  isScrollingDown: boolean;
}

interface PanelContextType {
  state: PanelState;
  setNavigationOpen: (isOpen: boolean) => void;
  setEnquiryOpen: (isOpen: boolean) => void;
  setScrollingDown: (isDown: boolean) => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PanelState>({
    isNavigationOpen: false,
    isEnquiryOpen: false,
    isScrollingDown: false,
  });

  const setNavigationOpen = useCallback((isOpen: boolean) => {
    setState(prev => ({ ...prev, isNavigationOpen: isOpen }));
  }, []);

  const setEnquiryOpen = useCallback((isOpen: boolean) => {
    setState(prev => ({ ...prev, isEnquiryOpen: isOpen }));
  }, []);

  const setScrollingDown = useCallback((isDown: boolean) => {
    setState(prev => ({ ...prev, isScrollingDown: isDown }));
  }, []);

  return (
    <PanelContext.Provider
      value={{
        state,
        setNavigationOpen,
        setEnquiryOpen,
        setScrollingDown,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
}
