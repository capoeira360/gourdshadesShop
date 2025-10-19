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
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-light text-primary mb-6">
          Our Services
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          From consultation to installation, we provide comprehensive lighting solutions 
          to illuminate your world with precision and style.
        </p>
      </motion.section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-medium text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="text-xl font-semibold text-accent">
                    {service.price}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-primary mb-4">What&apos;s Included:</h4>
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-text-secondary">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="w-full mt-8 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="bg-accent py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2
            className="text-4xl font-light text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-xl text-primary/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact us today for a free consultation and discover how we can illuminate your space.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Consultation
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call (555) 123-4567
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;