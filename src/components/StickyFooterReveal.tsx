'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from './Footer';

interface StickyFooterRevealProps {
  children: React.ReactNode;
}

const StickyFooterReveal: React.FC<StickyFooterRevealProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  
  // Use window scroll for tracking
  const { scrollY } = useScroll();

  useEffect(() => {
    // Calculate footer height
    const updateFooterHeight = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const height = footerElement.offsetHeight;
        setFooterHeight(height);
      }
    };

    // Initial calculation
    const timer = setTimeout(updateFooterHeight, 100);
    
    window.addEventListener('resize', updateFooterHeight);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateFooterHeight);
    };
  }, []);

  useEffect(() => {
    // Add scroll space equal to footer height to allow reveal
    if (footerHeight > 0) {
      document.body.style.paddingBottom = `${footerHeight}px`;
      // Set CSS custom property for other components to use
      document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    }

    return () => {
      document.body.style.paddingBottom = '';
      document.documentElement.style.removeProperty('--footer-height');
    };
  }, [footerHeight]);

  // Calculate when footer should reveal based on scroll position
  const documentHeight = typeof window !== 'undefined' ? document.documentElement.scrollHeight : 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const maxScroll = documentHeight - windowHeight;
  
  // Footer reveals in the last scroll area (when we reach the added padding)
  const revealStart = maxScroll - footerHeight;
  const revealEnd = maxScroll;

  // Transform footer from hidden to visible
  const footerY = useTransform(
    scrollY,
    [revealStart, revealEnd],
    [footerHeight, 0]
  );

  return (
    <>
      {/* Main content container */}
      <div
        ref={containerRef}
        className="relative z-10 bg-white"
      >
        {children}
      </div>

      {/* Fixed footer that slides up from below */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-0"
        style={{ y: footerY }}
      >
        <Footer />
      </motion.div>
    </>
  );
};

export default StickyFooterReveal;