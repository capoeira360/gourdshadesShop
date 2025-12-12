'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/app/products/data';

export default function Home() {
  return (
    <div className="bg-very-light-gray font-sans text-primary">
      {/* BEGIN: HeroSection */}
      <section 
        className="relative h-[600px] flex items-center justify-start overflow-hidden" 
        data-purpose="hero-section"
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero-video-2.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[#4f342e]/50" style={{ backgroundColor: 'rgba(79, 52, 46, 0.5)' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#4f342e]/75 text-white p-10 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:text-6xl">Gourd Shades</h1>
            <p className="mb-8 text-lg">We use dried shells of Calabash to create stunning lampshades by drilling perforated patterns on them to let the light escape. This allows the lampshade to display exceptionally beautiful patterns and shades of light to its surrounding.</p>
            <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 hover:bg-brand-orange-dark transition-colors text-lg">
              Discover the Makers
            </Link>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: ArtisanJourneySection */}
      <section className="py-16 sm:py-24" data-purpose="artisan-journey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#4f342e] rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-widest text-white sm:text-4xl mb-4">The Mission</h2>
                <p className="text-lg text-white/90 mb-8 md:mx-0">
                  Through thoughtful design and meticulous craftsmanship, I aim to bring warmth, beauty, and functionality to every space I illuminate.
                </p>

              </div>
              {/* Image */}
              <div className="flex justify-center w-full">
                <div className="relative shadow-lg rounded-lg overflow-hidden" style={{ width: '384px', height: '432px' }}>
                  <img 
                    alt="The Mission" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src="/images/the-mission.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: ArtisanJourneySection */}

      {/* BEGIN: FeaturedCreationsSection */}
      <section className="bg-[#4f342e]/5 py-16 sm:py-24" data-purpose="featured-creations">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mt-12">
            <h2 className="absolute left-0 bottom-full mb-8 text-2xl font-bold tracking-widest text-brand-dark sm:text-3xl">Top Selling</h2>
            <Link 
              href="/products" 
              className="absolute right-0 bottom-full mb-8 inline-flex items-center justify-center bg-transparent border border-brand-orange text-brand-orange font-semibold py-2 px-6 hover:bg-brand-orange hover:text-white transition-colors text-sm"
            >
              View All Products
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product, index) => (
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
              className="relative min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/20240405_131741-a1.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#4f342e]/40" style={{ backgroundColor: 'rgba(79, 52, 46, 0.5)' }}></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Handcrafted Excellence</h3>
              </div>
            </div>
            {/* Personalized Creations Category */}
            <div 
              className="relative min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/20240508_141055-b1.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#4f342e]/40" style={{ backgroundColor: 'rgba(79, 52, 46, 0.5)' }}></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Personalized Creations</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: CategorySection */}
    </div>
  );
}
