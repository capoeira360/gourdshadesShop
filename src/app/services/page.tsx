'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ServicesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  // State for image galleries
  const [outreachImageIndex, setOutreachImageIndex] = useState(0);
  const [exhibitionImageIndex, setExhibitionImageIndex] = useState(0);

  // Image arrays for galleries
  const outreachImages = [
    '/images/20241018_094717-reach-1.jpg',
    '/images/20240913_145501-reach-2.jpg',
    '/images/20240906_130827-reach-3.jpg',
    '/images/20240828_101915-reach-4.jpg',
    '/images/20240913_142936-reach-5.jpg'
  ];

  const exhibitionImages = [
    '/images/IMG-20250601-WA0002-exhibition-1.jpg',
    '/images/20240525_105359-exhibition-2.jpg',
    '/images/20240525_105410-exhibition-3.jpg',
    '/images/IMG-20250601-WA0008-exhibition-4.jpg',
    '/images/IMG-20250601-WA0006-exhibition-5.jpg'
  ];

  // Navigation functions
  const nextOutreachImage = () => {
    setOutreachImageIndex((prev) => (prev + 1) % outreachImages.length);
  };

  const prevOutreachImage = () => {
    setOutreachImageIndex((prev) => (prev - 1 + outreachImages.length) % outreachImages.length);
  };

  const nextExhibitionImage = () => {
    setExhibitionImageIndex((prev) => (prev + 1) % exhibitionImages.length);
  };

  const prevExhibitionImage = () => {
    setExhibitionImageIndex((prev) => (prev - 1 + exhibitionImages.length) % exhibitionImages.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);



  return (
    <div className="min-h-screen bg-very-light-gray pt-24">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="max-w-7xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h1 className="text-2xl md:text-3xl font-light text-primary" style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
            Community
          </h1>
        </div>
      </motion.section>

      {/* Community Services */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4" style={{ paddingLeft: '0rem', paddingRight: '0rem' }}>
          <div className="space-y-8">
            {/* First Service Card */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              style={{ width: 'calc(100% + 72px)', height: 'calc(644px + 72px + 64px)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ width: '680px', height: '716px', padding: '20px' }}>
                    <Image
                      src={outreachImages[outreachImageIndex]}
                      alt="Community Lighting Consultation"
                      width={640}
                      height={676}
                      className="w-full h-full object-contain transition-opacity duration-300"
                    />
                    
                    {/* Navigation Buttons */}
                    <button
                      onClick={prevOutreachImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextOutreachImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {outreachImageIndex + 1} / {outreachImages.length}
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="space-y-6" style={{ marginLeft: '-72px' }}>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '216px', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
                      Outreach
                    </h1>
                    <div className="text-gray-700 leading-relaxed space-y-4" style={{ marginLeft: '216px', maxWidth: '500px' }}>
                      <p>
                        I am truly grateful for the talent I have been blessed with, and I am passionate about sharing my knowledge with those eager to learn and grow. One of the most rewarding experiences in my journey has been my involvement with <span className="font-semibold text-accent bg-accent/10 px-2 py-1 rounded">The Hidden Hope Foundation</span> in Karatu, an organization dedicated to empowering people with disabilities. As part of a creative development program, I had the privilege of teaching and inspiring this incredible group, unlocking their creative potential and fostering growth.
                      </p>
                      <p>
                        I firmly believe in the transformative power of creativity and education, especially when it reaches communities that face unique challenges. My work with <span className="font-semibold text-accent bg-accent/10 px-2 py-1 rounded">The Hidden Hope Foundation</span> has deepened my commitment to making a positive impact through knowledge sharing and skill-building.
                      </p>
                      <p>
                        I am always excited to embark on new adventures and collaborate with organizations that value inclusivity, empowerment, and creativity. It would be an honor to contribute my skills and passion to initiatives that uplift and inspire others, and I look forward to connecting with like-minded groups eager to make a difference.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second Service Card */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              style={{ width: 'calc(100% + 72px)', height: 'calc(644px + 72px + 64px)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ width: '680px', height: '716px', padding: '20px' }}>
                    <Image
                      src={exhibitionImages[exhibitionImageIndex]}
                      alt="Community Installation & Support"
                      width={640}
                      height={676}
                      className="w-full h-full object-contain transition-opacity duration-300"
                    />
                    
                    {/* Navigation Buttons */}
                    <button
                      onClick={prevExhibitionImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextExhibitionImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {exhibitionImageIndex + 1} / {exhibitionImages.length}
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="space-y-6" style={{ marginLeft: '-72px' }}>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '216px', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
                      Exhibition
                    </h1>
                    <div className="text-gray-700 leading-relaxed space-y-4" style={{ marginLeft: '216px', maxWidth: '500px' }}>
                      <p>
                        I have also been fortunate to participate in various exhibitions across Tanzania, with a special focus on Dar es Salaam. For the past three years, I have proudly taken part in the <span className="font-semibold text-accent bg-accent/10 px-2 py-1 rounded">Artisan Market</span>, attending both of their annual events each year. This experience has allowed me to showcase my work to a diverse audience, connect with fellow artisans, and gain valuable exposure in the creative community.
                      </p>
                      <p>
                        Being part of these exhibitions has not only enriched my artistic journey but has also deepened my appreciation for the rich cultural heritage and craftsmanship of Tanzania. I am passionate about contributing to and growing within such vibrant platforms that celebrate creativity, innovation, and local talent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;