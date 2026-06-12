'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { products } from '@/app/products/data';
import { motion } from 'framer-motion';

const ExpandableProductGallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const topSellingProducts = [
    ...products.slice(0, 3),
    products.find(p => p.name === 'Toto Tundu') || products[3],
  ];

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) {
      return 1;
    }
    return hoveredIndex === index ? 2 : 0.5;
  };

  return (
    <div>
      {/* Horizontal Expandable Gallery */}
      <div className="flex gap-2 h-96 w-full">
        {topSellingProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="relative cursor-pointer overflow-hidden rounded-md h-full"
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={`/products/${product.id}`} className="block w-full h-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index < 2}
              />
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 0 : 0.3 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{product.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function HomeClient() {
  return (
    <div className="font-sans text-primary">
      {/* BEGIN: HeroSection */}
      <section 
        className="relative h-screen overflow-hidden" 
        data-purpose="hero-section"
      >
        {/* Overlay removed for natural video color */}
        <div className="w-full relative z-10 h-full flex flex-col justify-end items-end pb-32 sm:pb-12 px-4 sm:px-6">
          <div className="bg-black/50 text-white p-6 sm:p-10 max-w-lg rounded-sm">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:text-7xl">Gourd Shades</h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg">We use dried shells of Calabash to create stunning lampshades by drilling perforated patterns on them to let the light escape. This allows the lampshade to display exceptionally beautiful patterns and shades of light to its surrounding.</p>
            <Link href="/about" className="inline-block bg-brand-orange text-white font-bold py-2 px-6 hover:bg-brand-orange-dark transition-colors text-sm sm:text-base">
              Discover the maker
            </Link>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: ArtisanJourneySection */}
      <section className="py-16 sm:py-24" data-purpose="artisan-journey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#4f342e] rounded-3xl p-6 sm:p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-widest text-white sm:text-4xl mb-4">The Mission</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8 md:mx-0">
                  Through thoughtful design and meticulous craftsmanship, I aim to bring warmth, beauty, and functionality to every space I illuminate.
                </p>

              </div>
              {/* Image */}
              <div className="flex justify-center w-full">
                <div className="relative rounded-lg overflow-hidden w-full max-w-[384px] mx-auto">
                  <Image 
                    alt="The Mission" 
                    className="w-full h-auto object-cover" 
                    src="/images/the-mission.jpg"
                    width={384}
                    height={384}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: ArtisanJourneySection */}

      {/* BEGIN: FeaturedCreationsSection */}
      <section className="py-16 sm:py-24" data-purpose="featured-creations">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-widest text-brand-dark sm:text-3xl mb-4 sm:mb-0">Top Selling</h2>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center bg-transparent border border-brand-orange text-brand-orange font-semibold py-2 px-6 hover:bg-brand-orange hover:text-white transition-colors text-sm"
              >
                View All Products
              </Link>
            </div>
            <ExpandableProductGallery />
          </div>
        </div>
      </section>
      {/* END: FeaturedCreationsSection */}

      {/* BEGIN: CategorySection */}
      <section className="py-16 sm:py-24" data-purpose="category-showcase">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Handcrafted Excellence Category */}
            <div 
              className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/20240405_131741-a1.jpg)' }}
            >
              <div className="relative z-10 bg-black/40 p-4 rounded-lg backdrop-blur-[2px]">
                <h3 className="text-3xl sm:text-4xl font-bold">Handcrafted Excellence</h3>
              </div>
            </div>
            {/* Personalized Creations Category */}
            <div 
              className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/20240508_141055-b1.jpg)' }}
            >
              <div className="relative z-10 bg-black/40 p-4 rounded-lg backdrop-blur-[2px]">
                <h3 className="text-3xl sm:text-4xl font-bold">Personalized Creations</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: CategorySection */}
    </div>
  );
}