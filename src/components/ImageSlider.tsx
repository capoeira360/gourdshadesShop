'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SliderImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample images for the slider
  const images: SliderImage[] = [
    {
      id: 1,
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDgwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI1MCIgcj0iMTAwIiBmaWxsPSIjREJCNDJDIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjI0Ij5QcmVtaXVtIExpZ2h0aW5nPC90ZXh0Pgo8L3N2Zz4=',
      alt: 'Premium Lighting Collection',
      title: 'Premium Lighting Collection',
      description: 'Discover our curated selection of luxury lighting fixtures'
    },
    {
      id: 2,
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDgwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjBGMEYwIi8+CjxyZWN0IHg9IjMwMCIgeT0iMTAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSI0MDAiIGN5PSIxNTAiIHI9IjUwIiBmaWxsPSIjREJCNDJDIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjI0Ij5Nb2Rlcm4gRGVzaWduPC90ZXh0Pgo8L3N2Zz4=',
      alt: 'Modern Design Fixtures',
      title: 'Modern Design Fixtures',
      description: 'Contemporary lighting solutions for modern spaces'
    },
    {
      id: 3,
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDgwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRkFGQUZBIi8+CjxwYXRoIGQ9Ik0yMDAgMjAwTDYwMCAyMDBMNTAwIDQwMEwzMDAgNDAwWiIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzMDAiIHI9IjMwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjI0Ij5IYW5kY3JhZnRlZCBRdWFsaXR5PC90ZXh0Pgo8L3N2Zz4=',
      alt: 'Handcrafted Quality',
      title: 'Handcrafted Quality',
      description: 'Artisan-made fixtures with attention to every detail'
    },
    {
      id: 4,
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDgwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDY1MCAzNTBMMzUwIDQ1MEwxNTAgMjUwWiIgZmlsbD0iI0RCQjQyQyIvPgo8cGF0aCBkPSJNMjAwIDIwMEw2MDAgMzAwTDQwMCA0MDBMMjAwIDMwMFoiIGZpbGw9IiMzMzMzMzMiLz4KPHRleHQgeD0iNDAwIiB5PSI0NTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMjQiPkN1c3RvbSBTb2x1dGlvbnM8L3RleHQ+Cjwvc3ZnPg==',
      alt: 'Custom Solutions',
      title: 'Custom Solutions',
      description: 'Bespoke lighting designed specifically for your space'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isVisible, images.length]);

  // Intersection Observer for auto-play control
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section 
      ref={sliderRef}
      className="relative w-full bg-white py-24"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6">
            Our Collections
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore our carefully curated lighting collections, each piece selected for its 
            exceptional design and quality craftsmanship.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  goToNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  goToPrevious();
                }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/30 flex items-end">
                  <div className="p-8 md:p-12 text-white">
                    <motion.h3
                      className="text-3xl md:text-4xl font-light mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {images[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      className="text-lg md:text-xl text-white/90 max-w-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {images[currentIndex].description}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              key={currentIndex}
            />
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-8">
            Each collection represents years of design expertise and craftsmanship
          </p>
          <motion.button
            className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageSlider;