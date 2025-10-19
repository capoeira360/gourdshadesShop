'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

interface AboutSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  image: string;
}

interface AboutImageProps {
  section: AboutSection | null;
}

const AboutImage: React.FC<AboutImageProps> = ({ section }) => {
  // Define gradient colors for each section
  const getGradientForSection = (sectionId: string) => {
    const gradients = {
      story: 'from-blue-400 via-purple-500 to-pink-500',
      heritage: 'from-emerald-400 via-teal-500 to-cyan-600',
      values: 'from-orange-400 via-red-500 to-pink-600',
      mission: 'from-indigo-400 via-blue-500 to-purple-600'
    };
    return gradients[sectionId as keyof typeof gradients] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="sticky top-0 h-[600px] bg-gray-50 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
      <AnimatePresence mode="wait">
        {section ? (
          <motion.div
            key={section.id}
            className="w-full h-full relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Animated gradient background */}
            <motion.div
              className={`w-full h-full bg-gradient-to-br ${getGradientForSection(section.id)} relative`}
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: '100% 50%' }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              {/* Floating geometric shapes */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/20 rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-3/4 right-1/4 w-12 h-12 bg-white/15 rounded-lg rotate-45"
                animate={{ 
                  rotate: [45, 90, 45],
                  y: [0, 15, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/25 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.25, 0.4, 0.25]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Content overlay with enhanced styling */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.h4 
                className="text-white text-2xl font-light mb-3 tracking-wide"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {section.title}
              </motion.h4>
              {section.subtitle && (
                <motion.p 
                  className="text-white/90 text-base font-medium"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {section.subtitle}
                </motion.p>
              )}
            </motion.div>

            {/* Subtle border glow effect */}
            <div className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
          </motion.div>
        ) : (
          <motion.div 
            key="placeholder"
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center text-gray-500">
              <motion.svg 
                className="w-20 h-20 mx-auto mb-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </motion.svg>
              <p className="text-xl font-light">Scroll to explore our story</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SectionRowProps {
  section: AboutSection;
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

const SectionRow: React.FC<SectionRowProps> = ({ section, index, isActive, onEnter, onLeave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    const newIsVisible = entry.isIntersecting && entry.intersectionRatio > 0.3;
    
    if (newIsVisible !== isVisible) {
      setIsVisible(newIsVisible);
      if (newIsVisible) {
        // Add a small delay to prevent rapid state changes
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          onEnter();
        }, 50);
      }
    }
  }, [isVisible, onEnter]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.3, 0.7],
      rootMargin: '-20% 0px -20% 0px'
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className={`h-[600px] flex items-center px-8 mb-8 transition-all duration-500 ${
        isActive ? 'bg-white/50 backdrop-blur-sm rounded-lg shadow-lg' : ''
      }`}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="max-w-2xl w-full">
        <motion.h2 
          className={`text-4xl md:text-5xl font-light mb-8 transition-all duration-500 ${
            isActive ? 'text-primary transform scale-105' : 'text-gray-900'
          }`}
          layout
        >
          {section.title}
        </motion.h2>
        {section.subtitle && (
          <motion.h3 
            className="text-xl text-gray-600 mb-8 font-medium"
            layout
          >
            {section.subtitle}
          </motion.h3>
        )}
        <motion.div 
          className="space-y-6"
          layout
        >
          {section.content.map((paragraph, idx) => (
            <motion.p 
              key={idx} 
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<AboutSection | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const sections: AboutSection[] = [
    {
      id: 'story',
      title: 'Our Story',
      subtitle: 'Founded in Milan, 1985',
      content: [
        'Founded by master craftsman Giovanni Rossi in Milan, LampCo began as a small workshop dedicated to creating bespoke lighting fixtures for luxury hotels and residences across Europe.',
        'Today, we continue that tradition of excellence, combining traditional craftsmanship with modern innovation to create lighting that stands the test of time.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNEQkI0MkMiIHJ4PSIyMCIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjQwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjE1MCIgeT0iMjIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIiByeD0iMTAiLz4KPHN2ZyB4PSIxNzAiIHk9IjI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KPHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMCAyMEw1MCAyMCIgc3Ryb2tlPSIjREJCNDJDIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4KPHN2Zz4KPHN2Zz4='
    },
    {
      id: 'heritage',
      title: 'Heritage & Innovation',
      subtitle: '40 Years of Excellence',
      content: [
        'Blending 40 years of traditional craftsmanship with cutting-edge LED technology and smart home integration.',
        'Our artisans combine time-honored techniques passed down through generations with the latest innovations in lighting technology.',
        'Every piece reflects our commitment to both preserving traditional craftsmanship and embracing the future of lighting design.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iNCIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjQwIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMjAiIGZpbGw9IiNGRkZGRkYiLz4KPHN2Zz4='
    },
    {
      id: 'values',
      title: 'Our Values',
      subtitle: 'Quality, Sustainability, Design',
      content: [
        'Quality First: Every piece is meticulously crafted using premium materials and time-honored techniques.',
        'Sustainability: We\'re committed to eco-friendly practices and energy-efficient LED technology.',
        'Timeless Design: Our designs transcend trends, creating pieces that remain beautiful for generations.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwTDI4MCAyMDBIMTIwTDIwMCAxMDBaIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI4MCIgcj0iNDAiIGZpbGw9IiNEQkI0MkMiLz4KPHJlY3QgeD0iMTcwIiB5PSIyNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjREJCNDJDIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4='
    },
    {
      id: 'mission',
      title: 'Our Mission',
      subtitle: 'Illuminating Lives',
      content: [
        'We believe that exceptional lighting transforms not just rooms, but lives. Our mission is to create lighting solutions that enhance the way people live, work, and connect.',
        'Through thoughtful design and meticulous craftsmanship, we aim to bring warmth, beauty, and functionality to every space we illuminate.',
        'Our commitment extends beyond creating beautiful products – we strive to build lasting relationships with our clients and contribute positively to our communities.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iMyIvPgo8cGF0aCBkPSJNMjAwIDEyMEwyMDAgMjgwTTE0MCAyMDBMMjYwIDIwME0xNTUgMTU1TDI0NSAyNDVNMjQ1IDE1NUwxNTUgMjQ1IiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjMwIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTUiIGZpbGw9IiNGRkZGRkYiLz4KPHN2Zz4='
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-very-light-gray pt-24">
      {/* Hero Section */}
      <motion.section
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-light text-primary mb-6"
          variants={fadeInUp}
        >
          About LampCo
        </motion.h1>
        <motion.p
          className="text-xl text-text-secondary max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          Illuminating spaces with premium lighting solutions since 1985. 
          We believe that exceptional lighting transforms not just rooms, but lives.
        </motion.p>
      </motion.section>

      {/* Split View Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Content Sections */}
          <div className="space-y-0">
            {sections.map((section, index) => (
              <SectionRow 
                key={section.id} 
                section={section} 
                index={index}
                isActive={activeSection?.id === section.id}
                onEnter={() => setActiveSection(section)}
                onLeave={() => setActiveSection(null)}
              />
            ))}
          </div>

          {/* Right Side - Sticky Image */}
          <div className="lg:block hidden">
            <AboutImage section={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;