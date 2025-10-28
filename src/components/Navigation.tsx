'use client';

import { useState, useEffect } from 'react';
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
  const { setNavigationOpen } = usePanel();

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
      <nav className={`fixed top-0 left-0 right-0 z-50 p-6 ${className}`}>
        <div className="flex justify-between items-center">
          {/* Empty space for logo positioning */}
          <div className="flex items-center">
            {/* Logo removed from navigation */}
          </div>

          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative z-50 flex flex-col justify-center items-center w-12 h-12 bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-0.5 bg-primary mb-1"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-primary mb-1"
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>

          {/* Menu/Close Text */}
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
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
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Sliding Background */}
            <motion.div
              className="absolute inset-0 bg-primary"
              variants={backgroundVariants}
            />

            {/* Close Button and Text - Positioned in top right */}
            <div className="absolute top-6 right-6 z-50 flex items-center space-x-4">
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
                className="relative flex flex-col justify-center items-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg"
                aria-label="Close menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
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
              <div className="flex-1 flex">
                {/* Left Side - Navigation Links Following Diagonal Flow */}
                <div className="flex-1 flex flex-col justify-center items-start pl-16 pr-8 pt-24">
                  <motion.nav className="relative">
                  {/* Home - Top Left */}
                  <motion.div
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[0].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-8"
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
                      className="block text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[0].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
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
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[1].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-8 ml-8"
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
                      className="block text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[1].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
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
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[2].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-8 ml-16"
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
                      className="block text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[2].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
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
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[3].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-8 ml-24"
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
                      className="block text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[3].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
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
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[4].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-16 ml-32"
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
                      className="block text-8xl font-light text-white hover:text-accent transition-colors duration-300"
                    >
                      {menuItems[4].name.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          custom={charIndex}
                          variants={characterVariants}
                          className="inline-block"
                          style={{ transformOrigin: 'center bottom' }}
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
                </div>

                {/* Vertical Divider Line */}
                <motion.div
                  className="w-px bg-white/20 mx-8 my-24"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: 'top' }}
                />

                {/* Right Side - Image Preview Box */}
                <div className="flex-1 flex justify-center items-center pr-16">
                  <AnimatePresence mode="wait">
                    {hoveredLink && (
                      <motion.div
                        key={hoveredLink}
                        variants={previewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="w-[544px] h-[444px] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-2xl"
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

              {/* Footer Section - Reorganized Layout */}
              <div className="absolute bottom-0 left-0 right-0 pb-12 px-16">
                <motion.div
                  className="flex justify-between items-end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  {/* Left Corner - Contact Info */}
                  <div className="text-white/60 text-sm">
                    <p>gourdshadestz@gmail.com</p>
                    <p>+255 746 754 876</p>
                  </div>

                  {/* Center - Social Links */}
                  <div className="flex space-x-8 text-white/60 text-sm">
                    <a href="https://www.instagram.com/gourdshadestz?igsh=MTZteGx1OXR5Zno1NQ==" className="hover:text-white transition-colors">
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/gourdshadestz" className="hover:text-white transition-colors">
                      Facebook
                    </a>
                  </div>

                  {/* Right Corner - Business Info */}
                  <div className="text-white/60 text-sm">
                    <p>Gourd Shades</p>
                    <p>Handcrafted Lighting</p>
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