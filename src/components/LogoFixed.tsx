'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePanel } from '@/contexts/PanelContext';

const LogoFixed: React.FC = () => {
  const { state } = usePanel();
  const hidden = state.isScrollingDown || state.isUiAutoHidden;

  return (
    <motion.div
      className="fixed top-2 left-3 sm:top-1 sm:left-6 z-40"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: hidden ? 'none' : 'auto', willChange: 'transform, opacity' }}
    >
      <Image 
        src="/logo-gourd-shades-square.svg" 
        alt="Gourd Shades" 
        width={96}
        height={96}
        className="sm:w-[130px] sm:h-[130px]"
      />
    </motion.div>
  );
};

export default LogoFixed;