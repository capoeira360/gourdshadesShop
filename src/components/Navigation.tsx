'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', href: '/', preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K' },
    { name: 'Products', href: '/products', preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iODAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K' },
    { name: 'About', href: '/about', preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNTAgNjBMMTgwIDEwMEgxMjBMMTUwIDYwWiIgZmlsbD0iI0RCQjQyQyIvPgo8L3N2Zz4K' },
    { name: 'Services', href: '/services', preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxMDAiIHJ4PSI2MCIgcnk9IjMwIiBmaWxsPSIjREJCNDJDIi8+Cjwvc3ZnPgo=' },
    { name: 'Contact', href: '/contact', preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjgwIiB5PSI4MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0RCQjQyQyIvPgo8L3N2Zz4K' },
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
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const characterVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
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
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            LampCo
          </Link>

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
                className="relative flex flex-col justify-center items-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
                aria-label="Close menu"
              >
                <motion.div
                  className="absolute w-5 h-0.5 bg-white"
                  animate={{
                    rotate: 45,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute w-5 h-0.5 bg-white"
                  animate={{
                    rotate: -45,
                  }}
                  transition={{ duration: 0.3 }}
                />
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
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>

                  {/* Services - Even more indented */}
                  <motion.div
                    variants={linkVariants}
                    onMouseEnter={() => setHoveredLink(menuItems[3].name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="mb-8 ml-24"
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
                        >
                          {char}
                        </motion.span>
                      ))}
                    </Link>
                  </motion.div>
                </motion.nav>
                </div>

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
                        className="w-[400px] h-[300px] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-2xl"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-accent/30 to-white/10 flex flex-col items-center justify-center p-8">
                          <div className="text-6xl mb-6 text-white/80">
                            {hoveredLink === 'Home' && '🏠'}
                            {hoveredLink === 'Products' && '💡'}
                            {hoveredLink === 'About' && '👥'}
                            {hoveredLink === 'Services' && '🔧'}
                            {hoveredLink === 'Contact' && '📞'}
                          </div>
                          <span className="text-white text-2xl font-light mb-2">
                            {hoveredLink}
                          </span>
                          <span className="text-white/60 text-lg text-center">
                            {hoveredLink === 'Home' && 'Discover our premium lighting collection'}
                            {hoveredLink === 'Products' && 'Explore our curated lighting solutions'}
                            {hoveredLink === 'About' && 'Learn about our lighting expertise'}
                            {hoveredLink === 'Services' && 'Professional lighting services'}
                            {hoveredLink === 'Contact' && 'Get in touch with our team'}
                          </span>
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
                  {/* Left Corner - Shop Address */}
                  <div className="text-white/60 text-sm">
                    <p>123 Lighting Street</p>
                    <p>Design District, NY 10001</p>
                  </div>

                  {/* Center - Social Links */}
                  <div className="flex space-x-8 text-white/60 text-sm">
                    <a href="#" className="hover:text-white transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </div>

                  {/* Right Corner - Website */}
                  <div className="text-white/60 text-sm">
                    <p>www.theshop.com</p>
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