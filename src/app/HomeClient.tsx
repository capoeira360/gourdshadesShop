'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PriceDisplay from '@/components/PriceDisplay';
import { products, type Product } from '@/app/products/data';
import { motion } from 'framer-motion';

export default function HomeClient() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const topSellingProducts = [
    ...products.slice(0, 3),
    products.find((p) => p.name === 'Toto Tundu') || products[3],
  ];
  const newDesignProducts = [
    'aura-new-design-lamp',
    'comfort-new-design-lamp',
    'luster-new-design-lamp',
    'pembe-tatu-new-design-lamp',
  ]
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const categoryCards = [
    {
      id: 'handcrafted-excellence',
      title: 'Handcrafted Excellence',
      image: '/images/20240405_131741-a1.jpg',
    },
    {
      id: 'personalized-creations',
      title: 'Personalized Creations',
      image: '/images/20240508_141055-b1.jpg',
    },
    {
      id: 'eco-friendly-material',
      title: 'Eco-Friendly Material',
      image: '/images/20240612_135256-e3.jpg',
    },
  ];

  const getCategoryFlexValue = (index: number) => {
    if (hoveredCategory === null) {
      return 1;
    }

    return hoveredCategory === index ? 1.18 : 0.82;
  };

  const getProductImageAlt = (product: Product) =>
    `${product.name} handmade calabash lamp by Gourd Shades`;

  return (
    <div className="font-sans text-primary">
      {/* BEGIN: HeroSection */}
      <section 
        className="relative h-screen overflow-hidden" 
        data-purpose="hero-section"
      >
        {/* Overlay removed for natural video color */}
        <div className="w-full relative z-10 h-full flex flex-col justify-end items-end lg:items-start pb-32 sm:pb-12 px-4 sm:px-6">
          <div className="bg-black/50 text-white p-6 sm:p-10 max-w-lg rounded-sm">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:text-7xl">Gourd Shades</h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg">We use dried shells of Calabash to create stunning lampshades by drilling perforated patterns on them to let the light escape. This allows the lampshade to display exceptionally beautiful patterns and shades of light to its surrounding.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="inline-block bg-brand-orange text-white font-bold py-2 px-6 hover:bg-brand-orange-dark transition-colors text-sm sm:text-base">
                Discover the maker
              </Link>
              <Link href="/products" className="inline-block border border-white/60 text-white font-bold py-2 px-6 hover:bg-white hover:text-[#4f342e] transition-colors text-sm sm:text-base">
                Shop the collection
              </Link>
            </div>
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
                <h2 className="text-2xl sm:text-3xl font-bold tracking-widest text-white sm:text-4xl mb-4">
                  The Mission
                </h2>
                <p className="text-base sm:text-lg text-white/90 mb-8 md:mx-0">
                  Through thoughtful design and meticulous craftsmanship, I aim to bring warmth, beauty, and functionality to every space I illuminate.
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  <Link href="/about" className="inline-flex items-center border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#4f342e]">
                    Read the story
                  </Link>
                  <Link href="/contact" className="inline-flex items-center border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#4f342e]">
                    Start an enquiry
                  </Link>
                </div>

              </div>
              {/* Image */}
              <div className="flex justify-center w-full">
                <div className="relative rounded-lg overflow-hidden w-full max-w-[384px] mx-auto">
                  <Image 
                    alt="Handcrafted calabash lamp illustrating the mission behind Gourd Shades" 
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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="page-heading-surface text-2xl font-bold tracking-widest text-brand-dark sm:text-3xl mb-0">
                Top Selling
              </h2>
              <Link 
                href="/products" 
                className="page-heading-surface inline-flex items-center justify-center border border-brand-orange text-brand-orange font-semibold py-3 px-6 hover:bg-brand-orange hover:text-white transition-colors text-sm"
              >
                View All Products
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {topSellingProducts.map((product, index) => (
                <Link key={product.id} href={`/products/${product.id}`} className="products-grid-card block h-full">
                  <div className="products-grid-media">
                      <Image
                        src={product.images[0]}
                        alt={getProductImageAlt(product)}
                        fill
                        className="products-grid-image object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        priority={index === 0}
                      />
                    <div className="products-grid-overlay" />
                    <span className="products-grid-cta">View lamp</span>
                  </div>
                  <div className="products-grid-body">
                      <h3
                        className="products-grid-name text-xl font-light mb-2"
                        style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
                      >
                        {product.name}
                      </h3>
                      <p className="products-grid-description text-sm mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <PriceDisplay price={product.price} className="products-grid-price text-lg font-semibold mt-0" />
                        <span className="text-xs uppercase tracking-wider text-[#4f342e] bg-[#4f342e]/10 px-2 py-1">
                          {product.category}
                        </span>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* END: FeaturedCreationsSection */}

      {/* BEGIN: NewDesignsSection */}
      <section className="py-16 sm:py-24" data-purpose="new-designs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="page-heading-surface text-2xl font-bold tracking-widest text-brand-dark sm:text-3xl mb-3 sm:mb-2">
                New Designs
              </h2>
            </div>
            <Link
              href="/products"
              className="page-heading-surface inline-flex items-center justify-center border border-brand-orange text-brand-orange font-semibold py-3 px-6 hover:bg-brand-orange hover:text-white transition-colors text-sm"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {newDesignProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="products-grid-card block h-full"
              >
                <div className="products-grid-media">
                  <Image
                    src={product.images[0]}
                    alt={getProductImageAlt(product)}
                    fill
                    className="products-grid-image object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    priority={index === 0}
                  />
                  <div className="products-grid-overlay" />
                  <span className="products-grid-cta">View lamp</span>
                </div>
                <div className="products-grid-body">
                  <h3
                    className="products-grid-name text-xl font-light mb-2"
                    style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}
                  >
                    {product.name}
                  </h3>
                  <p className="products-grid-description text-sm mb-4">
                    {product.description}
                  </p>
                  <PriceDisplay price={product.price} className="products-grid-price text-lg font-semibold mt-0 inline-flex" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* END: NewDesignsSection */}

      {/* BEGIN: CategorySection */}
      <section className="py-16 sm:py-24" data-purpose="category-showcase">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {categoryCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="relative min-h-[300px] sm:min-h-[400px] flex-1 overflow-hidden"
                animate={{ flex: getCategoryFlexValue(index) }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div
                  className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  <motion.div
                    className="absolute inset-0 bg-black"
                    animate={{ opacity: hoveredCategory === index ? 0.18 : 0.34 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 bg-black/40 p-4 rounded-lg backdrop-blur-[2px]">
                    <h3 className="text-3xl sm:text-4xl font-bold">{card.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* END: CategorySection */}
    </div>
  );
}
