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
  originalCurrency = 'USD',
  className = '',
  style
}) => {
  // Simply display the original price without any conversion


  return (
    <span 
      className={`text-2xl font-bold text-gray-900 ${className}`}
      style={style}
    >
      {price}
    </span>
  );
};

export default PriceDisplay;