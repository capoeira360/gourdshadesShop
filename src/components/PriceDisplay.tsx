'use client';

import React from 'react';

interface PriceDisplayProps {
  price: string;
  originalCurrency?: string;
  className?: string;
  style?: React.CSSProperties;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  className = '',
  style
}) => {
  // Simply display the original price without any conversion


  return (
    <span 
      className={`text-2xl font-bold ${className}`}
      style={{ 
        fontFamily: 'Timeburner, Arial, Helvetica, sans-serif',
        fontWeight: '700',
        color: '#91631D',
        ...style 
      }}
    >
      {price}
    </span>
  );
};

export default PriceDisplay;