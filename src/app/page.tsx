'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/app/products/data';

export default function Home() {
  return (
    <div className="bg-[#f9fdff] font-sans text-[#333]">
      {/* BEGIN: HeroSection */}
      <section 
        className="relative h-[600px] flex items-center justify-start bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/hero-image-2.jpg')" }}
        data-purpose="hero-section"
      >
        <div className="absolute inset-0 bg-black/50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-black/75 text-white p-10 max-w-lg">
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-widest text-brand-dark sm:text-4xl mb-4">The Mission</h2>
              <p className="text-lg text-brand-text mb-8 max-w-xl mx-auto md:mx-0">
                Through thoughtful design and meticulous craftsmanship, I aim to bring warmth, beauty, and functionality to every space I illuminate.
              </p>

            </div>
            {/* Image */}
            <div className="flex justify-center">
              <img 
                alt="Artisan jewelry" 
                className="shadow-xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxy6-jajQCT_6FLDGvwTZqAYQUdT_qkt7zYCXBRdpiQVhAGd8_6Hgnp9EdK0qXDwXvgWWmW0I5OERVHESVzjhgh_pN7UhZWCLSxRHJgMWa3BbUeC1l7j0U1BRp-8EpGkeQox3wIwKWVqnMAKFF_YkbCDsi-tkeJTEl36GGHGVAxHVWcqL6sKRV2UwM2qzpxsH5GsYdOolT6TuFeAt9RGJd-O7Yhl8ytChNNb4QZ6iG7K2rPbVWbtWoG2O-FYiR04kYQcxR9BhM_ja1"
              />
            </div>
          </div>
        </div>
      </section>
      {/* END: ArtisanJourneySection */}

      {/* BEGIN: FeaturedCreationsSection */}
      <section className="bg-[#f9fdff] py-16 sm:py-24" data-purpose="featured-creations">
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
            {/* Earthenware & Pottery Category */}
            <div 
              className="relative min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBW1JIf6u1yDHod31otjNchEO5-EsrdYW2_VlrkBHWCeWrNE7xEVrP2wd4PzJL3uHsbEXYfIqvRcaiyGqQEGFjHljeFGpSxqUu57VZee1nEF7OZXLRN6S2BzgxiQUF5xBdG4I8KT6NUGpXjL7aW37z2EmosmwrWaahhgOQhG9JRtaHstGtBzzVy7Th6kp2XhCkDq0Qshi484Et5Q67yTxKNcTSLA8giF7NATv1J8dvDthxXRAz2JUsqrLuYIbOJUSTawrqky1zJwb1d)' }}
            >
              <div className="absolute inset-0 bg-black/40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Earthenware & Pottery</h3>
                <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 hover:bg-brand-orange-dark transition-colors text-lg">
                  Explore the Collection
                </Link>
              </div>
            </div>
            {/* Woven Textiles Category */}
            <div 
              className="relative min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDwegxkQ-8ip-nJ_Ym5c2IV733NZlrKJ-somy2Pq__G9oOwZMPnz6Nr-4H5tCBi3SeUHKSBGbYqZolX996hm7CutHECUSiESswUT_dikmOX2NipMXmu_Qp4UiY8-vziZz9WbuICCeVsLNQ5_aNdUvXLtPUo9O6UHVbTM2OIx3tF898XmiIN2_QauSNs76SbHC5I9f_LdRcZw09nvNwCgEBH8Yg7GhGQZ5bk_hV2S7hS6OGf-D9YZPSwONKWqeMFebmfhMqvE2OcYHCr)' }}
            >
              <div className="absolute inset-0 bg-black/40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Woven Textiles</h3>
                <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 hover:bg-brand-orange-dark transition-colors text-lg">
                  Explore the Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: CategorySection */}
    </div>
  );
}
