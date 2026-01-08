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


  return (
    <div className="h-[350px] sm:h-[500px] lg:h-[600px] bg-[#4f342e]/5 overflow-hidden flex items-center justify-center z-0 relative rounded-2xl">
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
            {/* Display actual images for all sections */}
            <motion.div
              className="w-full h-[calc(100%-16px)] mt-4 relative flex items-center justify-center rounded-t-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {section.id === 'story' ? (
                <Image
                  src="/images/image-wm-about.jpg"
                  alt="Isaac Munis - About"
                  className="object-cover object-top"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              ) : section.id === 'heritage' ? (
                <Image
                  src="/images/about-image-card2.jpeg"
                  alt="Discovering Gourd Craft"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : section.id === 'values' ? (
                <Image
                  src="/images/about-image-card3.jpeg"
                  alt="Cultural Heritage"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : section.id === 'mission' ? (
                <Image
                  src="/images/the-mission.jpg"
                  alt="My Mission"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-[#4f342e]/10 flex items-center justify-center">
                   {/* Fallback for unknown sections */}
                </div>
              )}
            </motion.div>

            {/* Subtle border glow effect */}
            <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div 
            key="placeholder"
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4f342e]/5 to-[#4f342e]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center text-[#4f342e]/60">
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

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    const newIsVisible = entry.isIntersecting && entry.intersectionRatio > 0.45;
    if (newIsVisible !== isVisible) {
      setIsVisible(newIsVisible);
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
      rootMargin: '-35% 0px -35% 0px'
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
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
      className={`about-section-row relative z-10 w-full min-h-[600px] flex items-center p-6 sm:p-12 mb-16 transition-all duration-500 rounded-3xl overflow-hidden ${
        isActive ? 'bg-white/95 backdrop-blur-md shadow-xl scale-[1.01] border border-primary/10' : 'bg-white/40 backdrop-blur-sm scale-[0.98] opacity-80 grayscale-[0.2]'
      }`}
      variants={variants}
      initial="visible"
      animate="visible"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-8 md:gap-16 w-full`}>
        {/* Text Side */}
        <div className="flex-1 w-full text-left order-2 md:order-1">
          <motion.h2 
            className={`text-3xl md:text-5xl font-light mb-6 transition-all duration-500 ${
              isActive ? 'text-primary transform translate-x-2' : 'text-[#4f342e]'
            }`}
            layout
            style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
          >
            {section.title}
          </motion.h2>
          {section.subtitle && (
            <motion.h3 
              className={`text-lg md:text-xl mb-6 font-medium transition-all duration-500 ${
                isActive ? 'text-[#4f342e] translate-x-2' : 'text-[#4f342e]/60'
              }`}
              layout
              style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
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
                className={`text-base md:text-lg leading-relaxed transition-all duration-500 ${
                  isActive ? 'text-black/90' : 'text-[#4f342e]/70'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Image Side */}
        <div className="flex-1 w-full order-1 md:order-2">
          <AboutImage section={section} />
        </div>
      </div>
    </motion.div>
  );
};

const AboutClient: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<AboutSection | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const directionRef = useRef<'up' | 'down'>('down');

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
    // Track scroll direction to apply direction-aware delays
    const onScroll = () => {
      const y = window.scrollY || 0;
      directionRef.current = y < scrollYRef.current ? 'up' : 'down';
      scrollYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

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

      // Immediate switch logic: As soon as another card becomes more visible, switch to it.
      if (bestId && bestId !== activeSection?.id) {
        const currentRatio = activeSection ? (ratios.get(activeSection.id) || 0) : 0;
        
        // Switch if the new best is strictly more visible than the current one
        if (bestRatio > currentRatio) {
          const next = sections.find((s) => s.id === bestId);
          if (next) {
            setActiveSection(next);
          }
        }
      }
    }, { 
      // More granular thresholds for smoother updates
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), 
      // Wider active zone to catch transitions earlier
      rootMargin: '-10% 0px -10% 0px' 
    });

    elements.forEach((el) => globalObserver.observe(el));

    return () => {
      globalObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
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
    <div className="min-h-screen pt-24 font-sans text-primary">
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
            style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
          >
            About
          </motion.h1>
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 relative pb-16">
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
              onLeave={() => setIsHovering(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutClient;
