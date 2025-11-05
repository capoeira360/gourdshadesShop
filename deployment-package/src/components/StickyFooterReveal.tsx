'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from './Footer';

interface StickyFooterRevealProps {
  children: React.ReactNode;
}

const StickyFooterReveal: React.FC<StickyFooterRevealProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  
  // Use scroll progress from the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate footer height on mount and resize
  useEffect(() => {
    const calculateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
        // Set body padding to prevent content jump
        document.body.style.paddingBottom = `${height}px`;
      }
    };

    // Calculate height after a short delay to ensure footer is rendered
    const timer = setTimeout(calculateFooterHeight, 100);
    
    // Recalculate on window resize
    const handleResize = () => {
      calculateFooterHeight();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      document.body.style.paddingBottom = '';
    };
  }, []);

  // Transform footer position based on scroll progress
  // Footer starts hidden (translated down by its height) and slides up as user scrolls
  const footerY = useTransform(
    scrollYProgress,
    [0.7, 1], // Start revealing when 70% scrolled, fully revealed at 100%
    [footerHeight, 0] // From hidden (footerHeight) to visible (0)
  );

  return (
    <>
      {/* Main content container */}
      <div
        ref={containerRef}
        className="relative z-10 bg-white min-h-screen"
      >
        {children}
      </div>

      {/* Sticky footer that reveals on scroll */}
      <motion.div 
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0"
        style={{ 
          y: footerY,
          willChange: 'transform'
        }}
        initial={{ y: footerHeight }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <Footer />
      </motion.div>
    </>
  );
};

export default StickyFooterReveal;