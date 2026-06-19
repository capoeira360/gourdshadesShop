'use client';

import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  image: string;
}

interface AboutImageProps {
  section: AboutSection;
}

const AboutImage: React.FC<AboutImageProps> = ({ section }) => {
  return (
    <div className="h-[350px] sm:h-[500px] lg:h-[600px] bg-[#4f342e]/5 overflow-hidden flex items-center justify-center z-0 relative rounded-2xl">
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="w-full h-[calc(100%-16px)] mt-4 relative flex items-center justify-center rounded-t-2xl overflow-hidden">
          {section.id === 'story' ? (
            <Image
              src="/images/image-wm-about.jpg"
              alt="Portrait of Isaac Munis, founder of Gourd Shades, in Arusha Tanzania"
              className="object-cover object-top"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          ) : section.id === 'heritage' ? (
            <Image
              src="/images/about-image-card2.jpeg"
              alt="Handmade gourd craft process during the first lamp shade journey"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : section.id === 'values' ? (
            <Image
              src="/images/about-image-card3.jpeg"
              alt="Traditional calabash culture and heritage inspiration for Gourd Shades"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : section.id === 'mission' ? (
            <Image
              src="/images/the-mission.jpg"
              alt="Mission image representing handcrafted calabash lighting by Gourd Shades"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-[#4f342e]/10 flex items-center justify-center" />
          )}
        </div>

        <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
};

interface SectionRowProps {
  section: AboutSection;
  index: number;
}

const SectionRow: React.FC<SectionRowProps> = ({ section, index }) => {
  return (
    <div
      data-section-id={section.id}
      className="about-section-row relative z-10 w-full min-h-[600px] flex items-center p-6 sm:p-12 mb-16 rounded-3xl overflow-hidden bg-white/92 shadow-sm border border-primary/8"
    >
      <div className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-8 md:gap-16 w-full`}>
        {/* Text Side */}
        <div className="flex-1 w-full text-left order-2 md:order-1">
          <h2
            className="text-3xl md:text-5xl font-light mb-6 text-primary"
            style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <h3
              className="text-lg md:text-xl mb-6 font-medium text-[#4f342e]/70"
              style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
            >
              {section.subtitle}
            </h3>
          )}
          <div className="space-y-6">
            {section.content.map((paragraph, idx) => (
              <p
                key={idx} 
                className="text-base md:text-lg leading-relaxed text-[#4f342e]/80"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Image Side */}
        <div className="flex-1 w-full order-1 md:order-2">
          <AboutImage section={section} />
        </div>
      </div>
    </div>
  );
};

const AboutClient: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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
            className="page-heading-surface text-2xl md:text-3xl font-light text-primary"
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
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 px-2">
          <Link href="/products" className="inline-flex items-center border border-primary/20 bg-white/80 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
            Explore the collection
          </Link>
          <Link href="/contact" className="inline-flex items-center border border-primary/20 bg-white/80 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
            Contact the maker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutClient;
