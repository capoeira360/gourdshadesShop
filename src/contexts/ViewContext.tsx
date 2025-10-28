'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ViewMode = 'list' | 'grid';

interface ViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

interface ViewProviderProps {
  children: ReactNode;
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('list');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load view mode from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('viewMode') as ViewMode;
    if (savedViewMode && (savedViewMode === 'list' || savedViewMode === 'grid')) {
      setViewModeState(savedViewMode);
    }
    setIsInitialized(true);
  }, []);

  // Save view mode to localStorage whenever it changes
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (isInitialized) {
      localStorage.setItem('viewMode', mode);
    }
  };

  // Toggle between list and grid modes
  const toggleViewMode = () => {
    const newMode = viewMode === 'list' ? 'grid' : 'list';
    setViewMode(newMode);
  };

  const value: ViewContextType = {
    viewMode,
    setViewMode,
    toggleViewMode,
  };

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};