'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

const Footer: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);
  const navigationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Ensure animations only run on client side to prevent hydration errors
  useEffect(() => {
    setIsClient(true);

    // Throttled mouse tracking for better performance
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Calculate distance between mouse and element
  const calculateDistance = useCallback((element: HTMLElement | null) => {
    if (!element) return Infinity;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = mousePosition.x - centerX;
    const dy = mousePosition.y - centerY;
    
    return Math.sqrt(dx * dx + dy * dy);
  }, [mousePosition]);

  // Calculate scale based on proximity (closer = larger)
  const calculateProximityScale = useCallback((distance: number) => {
    const maxDistance = 200; // Maximum distance for effect
    const minScale = 1; // Minimum scale
    const maxScale = 1.3; // Maximum scale when very close
    
    if (distance > maxDistance) return minScale;
    
    const normalizedDistance = 1 - (distance / maxDistance);
    return minScale + (maxScale - minScale) * normalizedDistance;
  }, []);

  // Character animation variants from Navigation component
  const characterHoverVariants = {
    rest: {
      rotateY: 0,
      scale: 1,
      color: "#ffffffd9", // white/85 equivalent - brighter
    },
    hover: (i: number) => ({
      rotateY: Math.sin(i * 0.5) * 10,
      scale: 1.1,
      color: "#DBB42C", // accent color
      transition: {
        delay: i * 0.02,
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  } as const;

  // Render a navigation link with character animations and proximity expansion
  const renderAnimatedLink = (text: string, href: string) => {
    if (!isClient) {
      // Server-side rendering: render static link
      return (
        <Link href={href} className="block text-white/85 hover:text-accent transition-colors text-lg">
          {text}
        </Link>
      );
    }

    // Calculate proximity scale for this link
    const linkElement = navigationRefs.current[text];
    const distance = calculateDistance(linkElement);
    const proximityScale = calculateProximityScale(distance);

    // Client-side rendering: render animated link with proximity expansion
    return (
      <motion.div
        ref={(el) => { navigationRefs.current[text] = el; }}
        onMouseEnter={() => setHoveredLink(text)}
        onMouseLeave={() => setHoveredLink(null)}
        style={{ perspective: 1000 }}
        animate={{
          scale: proximityScale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <Link href={href} className="block text-white/85 hover:text-accent transition-colors text-lg">
          {Array.from(text).map((char, i) => (
            <motion.span
              key={`${text}-${i}`}
              custom={i}
              variants={characterHoverVariants}
              initial="rest"
              animate={hoveredLink === text ? "hover" : "rest"}
              style={{ 
                display: 'inline-block',
                transformOrigin: 'center',
                minWidth: char === ' ' ? '0.25em' : 'auto'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      <footer ref={footerRef} className="text-white pt-24 pb-48" style={{ minHeight: '616px', backgroundColor: '#786861' }}>
        <div className="max-w-7xl mx-auto px-6 h-full">
          {/* Main Content Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          {/* Logo & Description Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <span className="text-4xl font-medium" style={{ color: '#D2CAB3', fontFamily: 'Regen, Arial, Helvetica, sans-serif', fontWeight: 'normal' }}>Gourd Shades</span>
            </div>
            <p className="text-white/85 leading-relaxed mb-6">
              Crafting unique lighting experiences with artisanal gourd-inspired designs. 
              We blend natural aesthetics with modern functionality to create distinctive lighting solutions.
            </p>
            <div className="text-white/80 text-sm">
              <p>Artisanal Lighting Design</p>
              <p>Handcrafted Excellence</p>
            </div>
          </motion.div>

          {/* Sitemap Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <h3 className="text-xl font-medium mb-8" style={{ color: '#D2CAB3', fontFamily: 'Regen, Arial, Helvetica, sans-serif', fontWeight: 'normal' }}>SITEMAP</h3>
            <nav className="space-y-4">
              {renderAnimatedLink('Home', '/')}
              {renderAnimatedLink('About', '/about')}
              {renderAnimatedLink('Community', '/services')}
              {renderAnimatedLink('Products', '/products')}
              {renderAnimatedLink('Contact', '/contact')}
            </nav>
            
            {/* Legal Pages Section */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <h4 className="text-sm font-medium mb-4" style={{ color: '#D2CAB3', fontFamily: 'Regen, Arial, Helvetica, sans-serif', fontWeight: 'normal' }}>LEGAL</h4>
              <nav className="space-y-3">
                {renderAnimatedLink('Privacy Policy', '/privacy')}
                {renderAnimatedLink('Disclaimer', '/disclaimer')}
              </nav>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <h3 className="text-xl font-medium mb-8" style={{ color: '#D2CAB3', fontFamily: 'Regen, Arial, Helvetica, sans-serif', fontWeight: 'normal' }}>CONTACT</h3>
            <div className="space-y-4 text-white/85">
              <div>
                <p className="text-lg" suppressHydrationWarning>gourdshadestz@gmail.com</p>
                <p className="text-lg">+255 746 754 878</p>
              </div>
              <div className="mt-6">
                <p className="text-base">Arusha, Tanzania</p>
              </div>
              <div className="mt-6">
                <p className="text-base">Studio Hours:</p>
                <p className="text-base">Mon-Sat: 9am-5pm</p>
              </div>
            </div>
          </motion.div>

          {/* Lighting Gallery Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <h3 className="text-xl font-medium mb-8" style={{ color: '#D2CAB3', fontFamily: 'Regen, Arial, Helvetica, sans-serif', fontWeight: 'normal' }}>OUR CREATIONS</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Top Image - Animal-Inspired Designs */}
              <div className="col-span-2 bg-accent/20 rounded-lg overflow-hidden h-28 border border-accent/30">
                <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                  <span className="text-white/90 text-sm font-medium">Animal-Inspired Designs</span>
                </div>
              </div>
              
              {/* Bottom Left - Nature & Botanical */}
              <div className="bg-accent/20 rounded-lg overflow-hidden h-24 border border-accent/30">
                <div className="w-full h-full bg-gradient-to-br from-accent/40 to-accent/20 flex items-center justify-center">
                  <span className="text-white/90 text-xs font-medium">Nature & Botanical</span>
                </div>
              </div>
              
              {/* Bottom Right - Stand & Floor Lamps */}
              <div className="bg-accent/20 rounded-lg overflow-hidden h-24 border border-accent/30">
                <div className="w-full h-full bg-gradient-to-br from-accent/50 to-accent/30 flex items-center justify-center">
                  <span className="text-white/90 text-xs font-medium">Stand & Floor Lamps</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-8 mb-6 md:mb-0">
            {/* Social Icons */}
            <a href="#" className="text-white/80 hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-white/80 hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-white/80">
            <span>Site by Balky Studio</span>
            <span>©2024 - Gourd Shades Artisan Lighting</span>
          </div>
        </motion.div>
      </div>
      </footer>
    </>
  );
};

export default Footer;