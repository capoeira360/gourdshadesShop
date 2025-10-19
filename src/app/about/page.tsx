'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

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
    <div className="sticky top-32 h-[600px] bg-gray-50 rounded-lg overflow-hidden">
      {section ? (
        <motion.div
          key={section.id}
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <img
            src={section.image}
            alt={section.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h4 className="text-white text-xl font-light mb-2">
              {section.title}
            </h4>
            {section.subtitle && (
              <p className="text-white/80 text-sm">
                {section.subtitle}
              </p>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg 
              className="w-16 h-16 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">Scroll to explore our story</p>
          </div>
        </div>
      )}
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onEnter();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onEnter]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className={`py-16 px-8 transition-all duration-300 ${
        isActive ? 'bg-white/50 backdrop-blur-sm rounded-lg' : ''
      }`}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="max-w-2xl">
        <h2 className={`text-4xl md:text-5xl font-light mb-6 transition-colors duration-300 ${
          isActive ? 'text-primary' : 'text-gray-900'
        }`}>
          {section.title}
        </h2>
        {section.subtitle && (
          <h3 className="text-xl text-gray-600 mb-6 font-medium">
            {section.subtitle}
          </h3>
        )}
        <div className="space-y-4">
          {section.content.map((paragraph, idx) => (
            <p key={idx} className="text-lg text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
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