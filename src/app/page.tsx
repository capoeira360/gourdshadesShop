'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { products } from '@/app/products/data';

export default function Home() {
  return (
    <div className="font-sans text-primary">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-[-1] w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/20240612_135238-featured-2-min.jpg)' }}
      />

      {/* BEGIN: HeroSection */}
      <section 
        className="relative h-screen overflow-hidden" 
        data-purpose="hero-section"
      >
        {/* Overlay removed for natural video color */}
        <div className="w-full relative z-10 h-full flex flex-col justify-end items-end pb-8 sm:pb-12 px-4 sm:px-6">
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
                    unoptimized
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                ...products.slice(0, 3),
                products.find(p => p.name === 'Toto Tundu') || products[3]
              ].map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
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
              <div className="absolute inset-0 bg-[#4f342e]/50"></div>
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">Handcrafted Excellence</h3>
              </div>
            </div>
            {/* Personalized Creations Category */}
            <div 
              className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/20240508_141055-b1.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#4f342e]/50"></div>
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">Personalized Creations</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: CategorySection */}
    </div>
  );
}
