'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

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
    <div className="sticky top-16 sm:top-24 h-[350px] sm:h-[500px] lg:h-[600px] bg-gray-50 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
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
            {/* Display actual images for story, craft, and heritage sections */}
            {section.id === 'story' ? (
              <motion.div
                className="w-full h-full relative bg-gray-100 flex items-center justify-center p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/IMG-20250921-WA0000-nav-about.jpg"
                  alt="Isaac Munis - About"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  width={800}
                  height={600}
                  priority
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/20 rounded-lg" />
              </motion.div>
            ) : section.id === 'heritage' ? (
              <motion.div
                className="w-full h-full relative bg-gray-100 flex items-center justify-center p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/about-image-card2.jpeg"
                  alt="Discovering Gourd Craft"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  width={800}
                  height={600}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/20 rounded-lg" />
              </motion.div>
            ) : section.id === 'values' ? (
              <motion.div
                className="w-full h-full relative bg-gray-100 flex items-center justify-center p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/about-image-card3.jpeg"
                  alt="Cultural Heritage"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  width={800}
                  height={600}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/20 rounded-lg" />
              </motion.div>
            ) : (
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
            )}

            {/* Content overlay with enhanced styling */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.h4 
                className="text-white text-xl sm:text-2xl font-light mb-3 tracking-wide"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}
              >
                {section.title}
              </motion.h4>
              {section.subtitle && (
                <motion.p 
                  className="text-white/90 text-sm sm:text-base font-medium"
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
  onScrollIntoView: () => void;
}

const SectionRow: React.FC<SectionRowProps> = ({ section, index, isActive, onEnter, onLeave, onScrollIntoView }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    const newIsVisible = entry.isIntersecting && entry.intersectionRatio > 0.45;
    
    // Trigger change when the section is mostly in view (delayed)
     if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
       // Clear any existing timeout
       if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
       }
       
       // Debounce to allow current card to pass before switching
       timeoutRef.current = setTimeout(() => {
         onScrollIntoView();
       }, 400);
     }
    
    if (newIsVisible !== isVisible) {
      setIsVisible(newIsVisible);
    }
  }, [isVisible, onScrollIntoView]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
      // Focus on the central 30% of viewport to delay switching
      rootMargin: '-35% 0px -35% 0px'
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
      data-section-id={section.id}
      className={`about-section-row h-auto min-h-[360px] md:h-[520px] lg:h-[600px] flex items-center px-4 sm:px-8 mb-8 transition-all duration-500 ${
        isActive ? 'bg-white/50 backdrop-blur-sm rounded-lg shadow-lg' : ''
      }`}
      variants={variants}
      initial="visible"
      animate="visible"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="max-w-2xl w-full">
        <motion.h2 
          className={`text-4xl md:text-5xl font-light mb-8 transition-all duration-500 ${
            isActive ? 'text-primary transform scale-105' : 'text-gray-900'
          }`}
          layout
          style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}
        >
          {section.title}
        </motion.h2>
        {section.subtitle && (
          <motion.h3 
            className="text-xl text-gray-600 mb-8 font-medium"
            layout
            style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}
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
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const activeChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sections: AboutSection[] = useMemo(() => [
    {
      id: 'story',
      title: 'My Story',
      subtitle: 'From Arusha, Tanzania',
      content: [
        'My name is Isaac Munis, I was born in Arusha, Tanzania. Since very young I have been passionate about hand craft work. I would build just random things from rubbish or anything I could find from the streets.',
        'I started making Gourd lamps in 2020 as a part time job but now 6 years later I\'m doing it full time. I cannot say I\'m a fully professional in this art, but it is my aim to be among the best out there.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNEQkI0MkMiIHJ4PSIyMCIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjQwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjE1MCIgeT0iMjIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIiByeD0iMTAiLz4KPHN2ZyB4PSIxNzAiIHk9IjI0MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIj4KPHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMCAyMEw1MCAyMCIgc3Ryb2tlPSIjREJCNDJDIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4KPHN2Zz4KPHN2Zz4='
    },
    {
      id: 'heritage',
      title: 'Discovering Gourd Craft',
      subtitle: 'The First Lamp Shade',
      content: [
        'I discovered gourd craft through trying many hand craft ideas. I did my first gourd art for a friend who wanted a lamp shade.',
        'I was so happy with the result of the work and even more happier with all the positive feedback from the friend and many more who saw the work.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iNCIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjQwIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMjAiIGZpbGw9IiNGRkZGRkYiLz4KPHN2Zz4='
    },
    {
      id: 'values',
      title: 'Cultural Heritage',
      subtitle: 'Traditional Uses of Calabashes',
      content: [
        'For many years in my country, calabashes / gourds have been used for storing water, seeds and most common milk.',
        'It\'s my main objective to make people of my country aware of this other use of calabashes.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwTDI4MCAyMDBIMTIwTDIwMCAxMDBaIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI4MCIgcj0iNDAiIGZpbGw9IiNEQkI0MkMiLz4KPHJlY3QgeD0iMTcwIiB5PSIyNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjREJCNDJDIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4='
    },
    {
      id: 'mission',
      title: 'My Mission',
      subtitle: 'Illuminating Lives',
      content: [
        'I believe that exceptional lighting transforms not just rooms, but lives. My mission is to create lighting solutions that enhance the way people live, work, and connect.',
        'Through thoughtful design and meticulous craftsmanship, I aim to bring warmth, beauty, and functionality to every space I illuminate.',
        'My commitment extends beyond creating beautiful products – I strive to build lasting relationships with my clients and contribute positively to my communities.'
      ],
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iMyIvPgo8cGF0aCBkPSJNMjAwIDEyMEwyMDAgMjgwTTE0MCAyMDBMMjYwIDIwME0xNTUgMTU1TDI0NSAyNDVNMjQ1IDE1NUwxNTUgMjQ1IiBzdHJva2U9IiNEQkI0MkMiIHN0cm9rZS13aWR0aD0iMiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjMwIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTUiIGZpbGw9IiNGRkZGRkYiLz4KPHN2Zz4='
    }
  ], []);

  // Set initial active section when page loads
  useEffect(() => {
    if (!activeSection && sections.length > 0) {
      setActiveSection(sections[0]);
    }
  }, [activeSection, sections]);

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

  // Global observer to pick the most visible section (works both directions)
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.about-section-row'));
    const ratios = new Map<string, number>();

    const globalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        const id = el.dataset.sectionId;
        if (!id) return;
        ratios.set(id, entry.intersectionRatio);
      });

      // Pick the section with highest intersection ratio
      let bestId: string | null = null;
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId && !isHovering) {
        if (activeChangeTimeoutRef.current) {
          clearTimeout(activeChangeTimeoutRef.current);
        }
        activeChangeTimeoutRef.current = setTimeout(() => {
          const next = sections.find((s) => s.id === bestId);
          if (next && next.id !== activeSection?.id) {
            setActiveSection(next);
          }
        }, 350);
      }
    }, { threshold: [0, 0.25, 0.5, 0.75, 0.85, 1], rootMargin: '-30% 0px -30% 0px' });

    elements.forEach((el) => globalObserver.observe(el));

    return () => {
      globalObserver.disconnect();
      if (activeChangeTimeoutRef.current) {
        clearTimeout(activeChangeTimeoutRef.current);
      }
    };
  }, [sections, isHovering, activeSection]);

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
        className="max-w-7xl mx-auto px-6 py-16"
        variants={staggerContainer}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <motion.h1
            className="text-2xl md:text-3xl font-light text-primary"
            variants={fadeInUp}
            style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}
          >
            About
          </motion.h1>
        </div>
      </motion.section>

      {/* Mobile/Tablet Layout: Sticky image above scrolling text */}
      <div className="max-w-7xl mx-auto px-6 pb-24 lg:hidden">
        <AboutImage section={activeSection} />
        <div className="space-y-0 mt-6">
          {sections.map((section, index) => (
            <SectionRow 
              key={section.id} 
              section={section} 
              index={index}
              isActive={activeSection?.id === section.id}
              onEnter={() => {
                setIsHovering(true);
                setActiveSection(section);
              }}
              onLeave={() => {
                setIsHovering(false);
              }}
              onScrollIntoView={() => {
                if (!isHovering) {
                  setActiveSection(section);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout: Split view with sticky image on right */}
      <div className="max-w-7xl mx-auto px-6 pb-24 hidden lg:block">
        <div className="grid grid-cols-2 gap-12">
          {/* Left Side - Content Sections */}
          <div className="space-y-0">
            {sections.map((section, index) => (
              <SectionRow 
                key={section.id} 
                section={section} 
                index={index}
                isActive={activeSection?.id === section.id}
                onEnter={() => {
                  setIsHovering(true);
                  setActiveSection(section);
                }}
                onLeave={() => {
                  setIsHovering(false);
                }}
                onScrollIntoView={() => {
                  if (!isHovering) {
                    setActiveSection(section);
                  }
                }}
              />
            ))}
          </div>

          {/* Right Side - Sticky Image */}
          <div>
            <AboutImage section={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;