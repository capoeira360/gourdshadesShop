'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  images: string[];
  description: string;
}

interface ProductRowProps {
  product: Product;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, index, isActive, onHover, onLeave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <Link href={`/products/${product.id}`}>
      <motion.div
        ref={rowRef}
        className={`group cursor-pointer py-8 px-6 border-b border-gray-100 transition-all duration-300 ${
          isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
        }`}
        variants={rowVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className={`text-2xl md:text-3xl font-light transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
          }`}>
            {product.name}
          </h3>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            {product.description}
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <span className="text-lg font-medium text-primary">
              {product.price}
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
        <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
  );
};

interface ProductImageProps {
  product: Product | null;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  return (
    <div className="sticky top-32 h-[600px] bg-gray-50 rounded-lg overflow-hidden">
      {product ? (
        <motion.div
          key={product.id}
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h4 className="text-white text-xl font-light mb-2">
              {product.name}
            </h4>
            <p className="text-white/80 text-sm">
              {product.description}
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg 
              className="w-16 h-16 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">Hover over a product to see it here</p>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 'aurora-collection',
      name: 'Aurora Collection',
      category: 'collection',
      price: '$329 - $449',
      images: [
        '/images/20240405_131741-a1.jpg',
        '/images/20240405_131752-a2.jpg',
        '/images/20240405_132015-a3.jpg',
        '/images/20240405_132238-a4.jpg',
        '/images/20240408_112214-a5.jpg'
      ],
      description: 'A comprehensive lighting collection featuring pendant, chandelier, sconce, table, and floor lamps with sleek modern design and premium materials.',
    },
    {
      id: 'brooklyn-series',
      name: 'Brooklyn Series',
      category: 'collection',
      price: '$179 - $899',
      images: [
        '/images/20240508_141055-b1.jpg',
        '/images/20240508_141122-b2.jpg',
        '/images/20240508_141338-b3.jpg',
        '/images/20240508_141359-b4.jpg',
        '/images/20240508_141454-b5.jpg'
      ],
      description: 'Industrial-inspired lighting series combining geometric forms with warm brass finishes and smart technology integration.',
    },
    {
      id: 'crystal-line',
      name: 'Crystal Line',
      category: 'collection',
      price: '$189 - $2,199',
      images: [
        '/images/20240520_160914-c1.jpg',
        '/images/20240520_161245-c2.jpg',
        '/images/20240520_161300-c3.jpg',
        '/images/20240520_161309-c4.jpg',
        '/images/20240520_161319-c5.jpg'
      ],
      description: 'Elegant crystal and glass lighting collection featuring prismatic effects and luxurious multi-tier designs for sophisticated spaces.',
    },
    {
      id: 'designer-collection',
      name: 'Designer Collection',
      category: 'collection',
      price: '$159 - $1,299',
      images: [
        '/images/20240607_162317-d1.jpg',
        '/images/20240607_162627-d2.jpg',
        '/images/20240607_162641-d3.jpg',
        '/images/20240607_162656-d4.jpg',
        '/images/20240607_162743-d5.jpg'
      ],
      description: 'Curated designer lighting featuring industrial pendants, vintage chandeliers, and statement pieces with decorative metalwork.',
    },
    {
      id: 'essence-series',
      name: 'Essence Series',
      category: 'collection',
      price: '$169 - $1,599',
      images: [
        '/images/20240612_135043-e1.jpg',
        '/images/20240612_135118-e2.jpg',
        '/images/20240612_135256-e3.jpg',
        '/images/20240612_135313-e4.jpg',
        '/images/20240612_140355-e5.jpg'
      ],
      description: 'Minimalist to Art Deco inspired lighting series with clean geometric lines and architectural presence for contemporary spaces.',
    },
    {
      id: 'fusion-line',
      name: 'Fusion Line',
      category: 'collection',
      price: '$259 - $799',
      images: [
        '/images/20240614_140132-f2.jpg',
        '/images/20240614_140159-f3.jpg',
        '/images/20240614_140218-f4.jpg',
        '/images/20240614_135944-f5.jpg'
      ],
      description: 'Artisan-crafted lighting line featuring handcrafted details, award-winning designs, and premium materials with distinctive character.',
    },
  ];

  const categories = ['all', 'collection'];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

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
    <div className="min-h-screen bg-white pt-24">
      {/* Header Section */}
      <motion.div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        variants={headerVariants}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <h1 className="text-5xl md:text-7xl font-light text-primary mb-6">
          Our Products
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Discover our carefully curated collection of premium lighting solutions, 
          each piece selected for its exceptional design and quality craftsmanship.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mb-12"
        variants={filterVariants}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary hover:bg-primary hover:text-white border border-gray-200'
              }`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products Layout - Split View */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Names */}
          <div className="space-y-0">
            {filteredProducts.map((product, index) => (
              <ProductRow 
                key={product.id} 
                product={product} 
                index={index}
                isActive={activeProduct?.id === product.id}
                onHover={() => setActiveProduct(product)}
                onLeave={() => setActiveProduct(null)}
              />
            ))}
          </div>

          {/* Right Side - Product Image */}
          <div className="lg:block hidden">
            <ProductImage product={activeProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;