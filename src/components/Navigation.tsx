'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePanel } from '@/contexts/PanelContext';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { state: panelState, setNavigationOpen } = usePanel();

  // Refs for each nav link wrapper to support touch sliding detection
  const linkRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Touch/pointer move handler: map finger Y to the link under it
  const handleMoveAtClientY = (clientY: number) => {
    for (let i = 0; i < menuItems.length; i++) {
      const el = linkRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientY >= rect.top && clientY <= rect.bottom) {
        const name = menuItems[i].name;
        if (hoveredLink !== name) setHoveredLink(name);
        break;
      }
    }
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === 'touch') {
      handleMoveAtClientY(e.clientY);
    }
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.touches[0];
    if (t) handleMoveAtClientY(t.clientY);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Update global panel state separately
  useEffect(() => {
    setNavigationOpen(isOpen);
  }, [isOpen, setNavigationOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', href: '/', preview: '/images/20240913_211304-hero.jpg' },
    { name: 'Products', href: '/products', preview: '/images/20240520_161231-featured-1.jpg' },
    { name: 'About', href: '/about', preview: '/images/IMG-20250921-WA0000-nav-about.jpg' },
    { name: 'Community', href: '/services', preview: '/images/20240525_152521-community-nav.jpg' },
    { name: 'Contact', href: '/contact', preview: '/images/IMG-20250307-WA0009-nav-contacts.jpg' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const characterVariants = {
    closed: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  const backgroundVariants = {
    closed: {
      scaleX: 0,
      originX: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      scaleX: 1,
      originX: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const previewVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <>
      {/* Navigation Header */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 ${className}`}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: panelState.isScrollingDown ? -80 : 0, opacity: panelState.isScrollingDown ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: panelState.isScrollingDown ? 'none' : 'auto', willChange: 'transform, opacity' }}
      >
        <div className="flex justify-between items-center">
          {/* Empty space for logo positioning */}
          <div className="flex items-center">
            {/* Logo removed from navigation */}
          </div>

          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative z-50 flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-5 sm:w-6 h-0.5 bg-primary mb-1"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-5 sm:w-6 h-0.5 bg-primary mb-1"
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-5 sm:w-6 h-0.5 bg-primary"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>

          {/* Menu/Close Text */}
          <div className="absolute right-16 sm:right-20 top-1/2 transform -translate-y-1/2 hidden sm:block">
            <AnimatePresence mode="wait">
              {!isOpen && (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-primary"
                >
                  Menu
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingRight: 'env(safe-area-inset-right)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)'
            }}
          >
            {/* Sliding Background */}
            <motion.div
              className="absolute inset-0 bg-primary"
              variants={backgroundVariants}
            />

            {/* Close Button and Text - Positioned in top right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center space-x-3 sm:space-x-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-white"
              >
                Close
              </motion.span>
              <button
                onClick={toggleMenu}
                className="relative flex flex-col justify-center items-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg"
                aria-label="Close menu"
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <motion.div
                    className="absolute w-4 h-0.5 bg-white shadow-sm"
                    style={{ transformOrigin: 'center' }}
                    animate={{
                      rotate: 45,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute w-4 h-0.5 bg-white shadow-sm"
                    style={{ transformOrigin: 'center' }}
                    animate={{
                      rotate: -45,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col">
              {/* Main Navigation Area */}
              <div className="flex-1 flex mt-4 md:mt-0">
                {/* Left Side - Navigation Links Following Diagonal Flow */}
                <div
                  className="flex-1 flex flex-col justify-start items-start pl-2 pr-2 pt-2 sm:pl-6 sm:pr-5 sm:pt-5 lg:pl-14"
                  onPointerMove={handlePointerMove}
                  onTouchMove={handleTouchMove}
                >
                  <motion.nav className="relative">
                  {/* Home - Top Left */}
                  <motion.div
                    ref={(el) => { linkRefs.current[0] = el; }}
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[0].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-1 sm:mb-4 md:mb-6"
                    style={{ perspective: 1000 }}
                    whileHover={{ 
                      rotateY: 5, 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <Link
                      href={menuItems[0].href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-5xl md:text-4xl lg:text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[0].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
                          animate={
                            hoveredLink === menuItems[0].name
                              ? {
                                  rotateY: Math.sin(charIndex * 0.5) * 10,
                                  scale: 1.1,
                                  color: '#DBB42C',
                                }
                              : { rotateY: 0, scale: 1 }
                          }
                          transition={{
                            delay: charIndex * 0.02,
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          whileHover={{
                            rotateY: Math.sin(charIndex * 0.5) * 10,
                            scale: 1.1,
                            color: "#DBB42C",
                            transition: {
                              delay: charIndex * 0.02,
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>

                  {/* Products - Slightly indented */}
                  <motion.div
                    ref={(el) => { linkRefs.current[1] = el; }}
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[1].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-1 sm:mb-4 md:mb-6"
                    style={{ perspective: 1000 }}
                    whileHover={{ 
                      rotateY: -5, 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <Link
                      href={menuItems[1].href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-5xl md:text-4xl lg:text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[1].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
                          animate={
                            hoveredLink === menuItems[1].name
                              ? {
                                  rotateY: Math.sin(charIndex * 0.5) * -10,
                                  scale: 1.1,
                                  color: '#DBB42C',
                                }
                              : { rotateY: 0, scale: 1 }
                          }
                          transition={{
                            delay: charIndex * 0.02,
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          whileHover={{ 
                            rotateY: Math.sin(charIndex * 0.5) * -10, 
                            scale: 1.1,
                            color: "#DBB42C",
                            transition: {
                              delay: charIndex * 0.02,
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>

                  {/* About - More indented */}
                  <motion.div
                    ref={(el) => { linkRefs.current[2] = el; }}
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[2].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-1 sm:mb-4 md:mb-6"
                    style={{ perspective: 1000 }}
                    whileHover={{ 
                      rotateY: 5, 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <Link
                      href={menuItems[2].href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-5xl md:text-4xl lg:text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[2].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
                          animate={
                            hoveredLink === menuItems[2].name
                              ? {
                                  rotateY: Math.sin(charIndex * 0.5) * 10,
                                  scale: 1.1,
                                  color: '#DBB42C',
                                }
                              : { rotateY: 0, scale: 1 }
                          }
                          transition={{
                            delay: charIndex * 0.02,
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          whileHover={{ 
                            rotateY: Math.sin(charIndex * 0.5) * 10, 
                            scale: 1.1,
                            color: "#DBB42C",
                            transition: {
                              delay: charIndex * 0.02,
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>

                  {/* Community - Even more indented */}
                  <motion.div
                    ref={(el) => { linkRefs.current[3] = el; }}
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[3].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-1 sm:mb-4 md:mb-6"
                    style={{ perspective: 1000 }}
                    whileHover={{ 
                      rotateY: -5, 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <Link
                      href={menuItems[3].href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-5xl md:text-4xl lg:text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[3].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
                          animate={
                            hoveredLink === menuItems[3].name
                              ? {
                                  rotateY: Math.sin(charIndex * 0.5) * -10,
                                  scale: 1.1,
                                  color: '#DBB42C',
                                }
                              : { rotateY: 0, scale: 1 }
                          }
                          transition={{
                            delay: charIndex * 0.02,
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          whileHover={{ 
                            rotateY: Math.sin(charIndex * 0.5) * -10, 
                            scale: 1.1,
                            color: "#DBB42C",
                            transition: {
                              delay: charIndex * 0.02,
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>

                  {/* Contact - Most indented */}
                  <motion.div
                    ref={(el) => { linkRefs.current[4] = el; }}
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[4].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-2 sm:mb-6 md:mb-10"
                    style={{ perspective: 1000 }}
                    whileHover={{ 
                      rotateY: 5, 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <Link
                      href={menuItems[4].href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-5xl md:text-4xl lg:text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[4].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
                          animate={
                            hoveredLink === menuItems[4].name
                              ? {
                                  rotateY: Math.sin(charIndex * 0.5) * 10,
                                  scale: 1.1,
                                  color: '#DBB42C',
                                }
                              : { rotateY: 0, scale: 1 }
                          }
                          transition={{
                            delay: charIndex * 0.02,
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          whileHover={{ 
                            rotateY: Math.sin(charIndex * 0.5) * 10, 
                            scale: 1.1,
                            color: "#DBB42C",
                            transition: {
                              delay: charIndex * 0.02,
                              duration: 0.3,
                              ease: "easeOut",
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>
                </motion.nav>
                {/* Horizontal divider for small devices, after last navigation item */}
                <div className="block md:hidden w-full h-px bg-white/20 mt-6 mb-4" />
                {/* Small devices: image preview after the divider, reduced size */}
                <div className="block md:hidden w-full flex justify-center mt-2 mb-6">
                  <div className="w-[280px] h-[238px] bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src={(menuItems.find(item => item.name === hoveredLink)?.preview) || menuItems[0].preview}
                        alt={`${hoveredLink || menuItems[0].name} preview`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                </div>

                {/* Vertical Divider Line */}
                <motion.div
                  className="hidden md:block w-px bg-white/20 mx-8 my-24"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: 'top' }}
                />

                {/* Right Side - Image Preview Box */}
                <div className="hidden md:flex flex-1 justify-center items-center md:pr-16">
                  <AnimatePresence mode="wait">
                    {hoveredLink && (
                      <motion.div
                        key={hoveredLink}
                        variants={previewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
        className="md:w-[380px] md:h-[330px] lg:w-[480px] lg:h-[438px] xl:w-[544px] xl:h-[502px] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-2xl"
                      >
                        {/* Display the actual preview image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={menuItems.find(item => item.name === hoveredLink)?.preview || ''}
                            alt={`${hoveredLink} preview`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer Section - Mobile Left/Right Layout */}
              <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 px-6 sm:px-16">
                <motion.div
                  className="flex justify-between items-end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  {/* Lower Left - Contact Info */}
                  <div className="text-white/60 text-sm">
                    <a href="mailto:gourdshadestz@gmail.com" className="hover:text-white transition-colors cursor-pointer block">gourdshadestz@gmail.com</a>
                    <p>+255 746 754 876</p>
                  </div>

                  {/* Lower Right - Social + Business Info */}
                  <div className="flex flex-col items-end text-white/60 text-sm">
                    <div className="flex flex-wrap justify-end gap-x-6 sm:gap-x-8">
                      <a href="https://www.instagram.com/gourdshadestz?igsh=MTZteGx1OXR5Zno1NQ==" className="hover:text-white transition-colors">
                        Instagram
                      </a>
                      <a href="https://www.facebook.com/gourdshadestz" className="hover:text-white transition-colors">
                        Facebook
                      </a>
                    </div>
                    <div className="mt-2 text-right">
                      <p>Gourd Shades</p>
                      <p>Handcrafted Lighting</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;