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
  
  // Use container scroll to track progress through the content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Footer slides up from below as we approach the end
  const footerY = useTransform(scrollYProgress, [0.8, 1], [footerHeight, 0]);

  useEffect(() => {
    // Calculate footer height dynamically
    const updateFooterHeight = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        setFooterHeight(footerElement.offsetHeight);
      }
    };

    // Initial calculation with delay to ensure footer is rendered
    const timer = setTimeout(updateFooterHeight, 200);
    
    window.addEventListener('resize', updateFooterHeight);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateFooterHeight);
    };
  }, []);

  useEffect(() => {
    // Add full footer height as scroll space to allow complete reveal
    if (footerHeight > 0) {
      const originalHeight = document.documentElement.scrollHeight;
      document.body.style.minHeight = `${originalHeight + footerHeight}px`;
    }

    return () => {
      document.body.style.minHeight = '';
    };
  }, [footerHeight]);

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