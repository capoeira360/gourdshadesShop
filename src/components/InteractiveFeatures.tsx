'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const backgroundVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const chipVariants = {
  inactive: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
  active: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const InteractiveFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleFeatureHover = useCallback((index: number) => {
    setActiveFeature(index);
  }, []);

  const features = [
    {
      id: 'quality',
      title: 'Premium Quality',
      description: 'Handcrafted with the finest materials and attention to detail.',
      icon: '✨',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'design',
      title: 'Timeless Design',
      description: 'Classic aesthetics that complement any interior style.',
      icon: '🎨',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 'efficiency',
      title: 'Energy Efficient',
      description: 'LED technology for sustainable and cost-effective lighting.',
      icon: '💡',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      id: 'warranty',
      title: 'Lifetime Warranty',
      description: 'Confidence in our products backed by comprehensive coverage.',
      icon: '🛡️',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Videos/Images */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={activeFeature}
            className="absolute inset-0"
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              background: features[activeFeature].background,
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Feature Chips */}
          <div className="space-y-6">
            <motion.h2
              className="text-5xl md:text-7xl font-light text-white mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.h2>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeFeature === index
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30'
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
                  }`}
                  variants={chipVariants}
                  initial="inactive"
                  animate={activeFeature === index ? "active" : "inactive"}
                  onHoverStart={() => handleFeatureHover(index)}
                  whileHover={{ scale: 1.02 }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feature Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={contentVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            key={activeFeature}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-6xl mb-6 text-center">
                {features[activeFeature].icon}
              </div>
              <h3 className="text-3xl font-light text-white mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                {features[activeFeature].description}
              </p>
              <motion.button
                className="px-8 py-4 bg-accent text-primary rounded-full font-medium hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;