'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

interface CurrencyContextType {
  selectedCurrency: Currency;
  currencies: Currency[];
  setSelectedCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency?: string) => number;
}

const defaultCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.85 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.73 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 110 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.25 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.35 },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrencies[0]);
  const [currencies] = useState<Currency[]>(defaultCurrencies);

  const convertPrice = (price: number, fromCurrency: string = 'USD'): number => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = selectedCurrency.rate;
    return (price / fromRate) * toRate;
  };

  const value: CurrencyContextType = {
    selectedCurrency,
    currencies,
    setSelectedCurrency,
    convertPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;