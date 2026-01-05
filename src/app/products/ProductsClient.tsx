'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useView } from '@/contexts/ViewContext';

import PriceDisplay from '@/components/PriceDisplay';
import { products, Product } from './data';

interface ProductRowProps {
  product: Product;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onScrollIntoView: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, index, isActive, onHover, onLeave, onScrollIntoView }) => {
  const [isVisible] = useState(true); // Changed to true for instant visibility
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger when the element is intersecting AND reaches the center area of viewport
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          // Clear any existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Set a timeout to ensure stable detection
          scrollTimeoutRef.current = setTimeout(() => {
            onScrollIntoView();
          }, 100);
        }
      },
      { 
        threshold: [0, 0.5, 0.8, 1.0], // Multiple thresholds for precise detection
        rootMargin: '-40% 0px -40% 0px' // Only trigger when element is in center 20% of viewport
      }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [onScrollIntoView]);

  const rowVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <div
      className="relative group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
    >
      <Link href={`/products/${product.id}`} onMouseEnter={onHover} onMouseLeave={onLeave} onPointerEnter={onHover} onPointerLeave={onLeave}>
        <motion.div
          ref={rowRef}
          className={`group cursor-pointer py-6 px-4 sm:px-6 border-b border-[#4f342e]/10 transition-all duration-300 ${
            isActive ? 'bg-white/85 backdrop-blur-sm shadow-lg' : 'bg-white/40 backdrop-blur-sm hover:bg-white/60'
          }`}
          variants={rowVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onPointerEnter={onHover}
          onPointerLeave={onLeave}
        >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className={`text-2xl md:text-3xl font-light transition-colors duration-300 ${
              isActive ? 'text-primary' : 'text-brand-dark group-hover:text-primary'
            }`} style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}>
              {product.name}
            </h3>
            <p className="text-[#4f342e]/80 mt-2 text-sm md:text-base">
              {product.description}
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-lg font-semibold" style={{ color: '#786861' }}>
                {product.price}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#4f342e]/60 bg-[#4f342e]/5 px-2 py-1">
                {product.category}
              </span>
            </div>
          </div>
          <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            <svg 
              className="w-6 h-6 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        </motion.div>
      </Link>
    </div>
  );
};

interface ProductImageProps {
  product: Product | null;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(product);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (product && product.id !== currentProduct?.id) {
      // Immediate update for responsive hover behavior
      setCurrentProduct(product);
      setIsTransitioning(false);
    } else if (!product) {
      setCurrentProduct(null);
      setIsTransitioning(false);
    }
  }, [product, currentProduct?.id]);

  return (
    <div className="sticky top-24 sm:top-28 h-[400px] sm:h-[500px] lg:h-[600px] bg-white/90 backdrop-blur-sm overflow-hidden group cursor-pointer shadow-lg">
      {currentProduct ? (
        <div className="w-full h-full relative">
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-70' : 'opacity-100'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentProduct.images[0]}
                alt={currentProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <h4 className="text-xl font-light mb-2 text-white group-hover:text-[#C8A882] transition-colors duration-300" style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}>
                {currentProduct.name}
              </h4>
              <p className="text-sm text-white/80 group-hover:text-[#C8A882]/90 transition-colors duration-300">
                {currentProduct.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-[#4f342e]/30">
            <svg 
              className="w-16 h-16 mx-auto mb-4" 
              fill="none"  
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Hover over a product to see preview</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  index: number;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, priority = false }) => {
  const [isVisible] = useState(true); // Changed to true for instant visibility
  const cardRef = useRef<HTMLDivElement>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <div className="relative group h-full">
      <Link href={`/products/${product.id}`} className="h-full block">
        <motion.div
          ref={cardRef}
          className="cursor-pointer bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          whileHover={{ y: -5 }}
        >
          <div className="relative aspect-square bg-[#4f342e]/5 overflow-hidden flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-light text-[#4f342e] group-hover:text-[#C8A882] transition-colors duration-300 mb-2" style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}>
              {product.name}
            </h3>
            <p className="text-[#4f342e]/80 text-sm mb-4 line-clamp-2 group-hover:text-[#C8A882] transition-colors duration-300">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <PriceDisplay 
                price={product.price}
                className="text-lg font-semibold"
              />
              <span className="text-xs uppercase tracking-wider text-[#4f342e]/60 bg-[#4f342e]/5 px-2 py-1">
                {product.category}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default function ProductsClient() {
  const [filter, setFilter] = useState<string>('all');
  const { viewMode, setViewMode } = useView();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollProductRef = useRef<string | null>(null);

  const categories = ['all', 'collection'];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  // Only set initial active product when page loads, not on filter changes
  useEffect(() => {
    // Only set initial product if no product is currently active
    if (!activeProduct && filteredProducts.length > 0) {
      setActiveProduct(filteredProducts[0]);
    }
  }, [activeProduct, filteredProducts]); // Added missing dependencies

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headerVariants = {
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

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 font-sans text-primary">
      {/* Header Section */}
      <motion.div
        ref={headerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
        variants={headerVariants}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h1 className="text-2xl md:text-3xl font-light text-primary" style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}>
            Products
          </h1>
        </div>
      </motion.div>

      {/* Filter and View Toggle Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12"
        variants={filterVariants}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 sm:px-6 sm:py-3 font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-primary text-white'
                    : 'bg-white/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white border border-gray-200/50'
                }`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="hidden md:flex items-center bg-white/40 backdrop-blur-sm p-1 rounded">
            <button
              className={`flex items-center px-4 py-2 transition-all duration-300 rounded ${
                viewMode === 'list'
                  ? 'bg-white/90 shadow-sm text-primary'
                  : 'text-primary/70 hover:text-primary hover:bg-white/40'
              }`}
              onClick={() => setViewMode('list')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List
            </button>
            <button
              className={`flex items-center px-4 py-2 transition-all duration-300 rounded ${
                viewMode === 'grid'
                  ? 'bg-white/90 shadow-sm text-primary'
                  : 'text-primary/70 hover:text-primary hover:bg-white/40'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Grid
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        {/* List View - md+ only (hidden on small) */}
        {viewMode === 'list' && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Product Names */}
            <div className="space-y-0">
              {filteredProducts.map((product, index) => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  index={index}
                  isActive={activeProduct?.id === product.id}
                  onHover={() => {
                    setIsHovering(true);
                    setActiveProduct(product);
                  }}
                  onLeave={() => {
                    setIsHovering(false);
                    // Don't automatically change image when leaving hover
                  }}
                  onScrollIntoView={() => {
                    // Only change image when scrolling (not hovering) and product is different
                    if (!isHovering && lastScrollProductRef.current !== product.id) {
                      lastScrollProductRef.current = product.id;
                      setActiveProduct(product);
                    }
                  }}
                />
              ))}
            </div>

            {/* Right Side - Product Image */}
            <div className="md:block hidden">
              <ProductImage product={activeProduct} />
            </div>
          </div>
        )}

        {/* Grid View - always shown on small; shown on md+ when grid selected */}
        <div className={`${viewMode === 'list' ? 'grid md:hidden' : 'grid'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8`}>
          {filteredProducts.map((product, index) => (
            <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                  priority={index < 4}
                />
          ))}
        </div>
      </div>
    </div>
  );
};
