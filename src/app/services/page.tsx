'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const ServicesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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

  const services = [
    {
      id: 'consultation',
      title: 'Lighting Consultation',
      description: 'Expert advice on lighting design tailored to your space and needs.',
      icon: '💡',
      features: ['Space Analysis', 'Design Recommendations', 'Energy Efficiency Planning', 'Budget Optimization'],
      price: 'From $150',
    },
    {
      id: 'installation',
      title: 'Professional Installation',
      description: 'Certified electricians ensure safe and proper installation of all fixtures.',
      icon: '🔧',
      features: ['Licensed Electricians', 'Safety Compliance', 'Warranty Coverage', 'Clean-up Service'],
      price: 'From $200',
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Repair',
      description: 'Keep your lighting systems running perfectly with our maintenance services.',
      icon: '⚙️',
      features: ['Regular Inspections', 'LED Upgrades', 'Emergency Repairs', 'Performance Optimization'],
      price: 'From $100',
    },
    {
      id: 'custom',
      title: 'Custom Design',
      description: 'Bespoke lighting solutions designed specifically for your unique requirements.',
      icon: '🎨',
      features: ['3D Visualization', 'Material Selection', 'Handcrafted Production', 'Exclusive Designs'],
      price: 'Quote on Request',
    },
  ];

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
                    <img
                      src="/images/IMG-20250301-WA0010-nav-services.jpg"
                      alt="Community Lighting Consultation"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="space-y-6" style={{ marginLeft: '-72px' }}>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '216px', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
                      Outreach
                    </h1>
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
                    <img
                      src="/images/20240405_131741-a1.jpg"
                      alt="Community Installation & Support"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="space-y-6" style={{ marginLeft: '-72px' }}>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '216px', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
                      Exhibition
                    </h1>
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