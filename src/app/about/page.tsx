'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const AboutPage: React.FC = () => {
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
        ref={heroRef}
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
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

      {/* Story Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-light text-primary mb-6">
                Our Story
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Founded by master craftsman Giovanni Rossi in Milan, LampCo began as a small 
                workshop dedicated to creating bespoke lighting fixtures for luxury hotels 
                and residences across Europe.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                Today, we continue that tradition of excellence, combining traditional 
                craftsmanship with modern innovation to create lighting that stands the 
                test of time.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 text-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-6">🏛️</div>
              <h3 className="text-2xl font-medium text-primary mb-4">
                Heritage & Innovation
              </h3>
              <p className="text-text-secondary">
                Blending 40 years of traditional craftsmanship with cutting-edge 
                LED technology and smart home integration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Quality First',
                description: 'Every piece is meticulously crafted using only the finest materials and time-tested techniques.',
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'We are committed to eco-friendly practices and energy-efficient LED technology.',
              },
              {
                icon: '🎨',
                title: 'Timeless Design',
                description: 'Our designs transcend trends, creating pieces that remain beautiful for generations.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-medium text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-very-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-primary text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Giovanni Rossi',
                role: 'Founder & Master Craftsman',
                icon: '👨‍🎨',
              },
              {
                name: 'Elena Martinez',
                role: 'Head of Design',
                icon: '👩‍💼',
              },
              {
                name: 'Marcus Chen',
                role: 'Innovation Director',
                icon: '👨‍💻',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center p-8 bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-6">{member.icon}</div>
                <h3 className="text-xl font-medium text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-text-secondary">
                  {member.role}
                </p>
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
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            className="text-xl text-primary/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let our lighting experts help you create the perfect ambiance for your home or business.
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
              Contact Us
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Products
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;