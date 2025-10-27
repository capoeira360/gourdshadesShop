'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEnquiry } from '@/contexts/EnquiryContext';

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
    <div className="relative group">
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
            }`} style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
              {product.name}
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              {product.description}
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-lg font-semibold" style={{ color: '#786861' }}>
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
      setIsTransitioning(true);
      // Small delay to allow for smooth transition
      const timer = setTimeout(() => {
        setCurrentProduct(product);
        setIsTransitioning(false);
      }, 150);
      
      return () => clearTimeout(timer);
    } else if (!product) {
      setCurrentProduct(null);
      setIsTransitioning(false);
    }
  }, [product, currentProduct?.id]);

  return (
    <div className="sticky top-32 h-[600px] bg-gray-50 rounded-lg overflow-hidden group cursor-pointer">
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h4 className="text-xl font-light mb-2 text-white group-hover:text-[#C8A882] transition-colors duration-300" style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
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
          <div className="text-center text-gray-400">
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isVisible] = useState(true); // Changed to true for instant visibility
  const cardRef = useRef<HTMLDivElement>(null);

  // Removed the intersection observer since we want instant visibility
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //       }
  //     },
  //     { threshold: 0.3 }
  //   );

  //   if (cardRef.current) {
  //     observer.observe(cardRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

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
    <div className="relative group">
      <Link href={`/products/${product.id}`}>
        <motion.div
          ref={cardRef}
          className="cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          whileHover={{ y: -5 }}
        >
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-light text-gray-900 group-hover:text-[#C8A882] transition-colors duration-300 mb-2" style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-[#C8A882] transition-colors duration-300">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold" style={{ color: '#786861' }}>
                {product.price}
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollProductRef = useRef<string | null>(null);

  const products: Product[] = [
    {
      id: 'artisan-series',
      name: 'Tembo/Twiga savana',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20240405_131741-a1.jpg',
        '/images/20240405_131752-a2.jpg',
        '/images/20240405_132015-a3.jpg',
        '/images/20240405_132238-a4.jpg',
        '/images/20240408_112214-a5.jpg'
      ],
      description: 'Handcrafted lighting featuring herbivores animals in the savanna, artisanal techniques with contemporary design from natural materials.',
    },
    {
      id: 'bronze-collection',
      name: 'Spackle blue/red',
      category: 'piece',
      price: '$120 - $150',
      images: [
        '/images/20240508_141055-b1.jpg',
        '/images/20240508_141122-b2.jpg',
        '/images/20240508_141338-b3.jpg',
        '/images/20240508_141359-b4.jpg',
        '/images/20240508_141454-b5.jpg'
      ],
      description: 'Sophisticated abstract lighting combining Crystal beads elegance with modern patterns and timeless appeal.',
    },
    {
      id: 'crystal-line',
      name: 'Natural African woman',
      category: 'piece',
      price: '$150 - $180',
      images: [
        '/images/20240520_160914-c1.jpg',
        '/images/20240520_161245-c2.jpg',
        '/images/20240520_161300-c3.jpg',
        '/images/20240520_161309-c4.jpg',
        '/images/20240520_161319-c5.jpg'
      ],
      description: 'Elegant crystal beads and three sides showing different aspects of African woman featuring prismatic effects and luxurious multi-tier designs for sophisticated spaces.',
    },
    {
      id: 'designer-collection',
      name: 'Trees for life',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20240607_162317-d1.jpg',
        '/images/20240607_162627-d2.jpg',
        '/images/20240607_162641-d3.jpg',
        '/images/20240607_162656-d4.jpg',
        '/images/20240607_162743-d5.jpg'
      ],
      description: 'Three different trees on different sides, together with blue/purple crystal beads. very unique pattern design.',
    },
    {
      id: 'essence-series',
      name: 'Twiga mugshot',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20240612_135043-e1.jpg',
        '/images/20240612_135118-e2.jpg',
        '/images/20240612_135256-e3.jpg',
        '/images/20240612_135313-e4.jpg',
        '/images/20240612_140355-e5.jpg'
      ],
      description: 'A giraffe shown on three different perspectives. Minimalist to Art Deco inspired lighting with clean and architectural presence for contemporary spaces.',
    },
    {
      id: 'fusion-line',
      name: 'The wild sunset',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20240614_140132-f2.jpg',
        '/images/20240614_140159-f3.jpg',
        '/images/20240614_140218-f4.jpg',
        '/images/20240614_135944-f5.jpg',
        '/images/20240614_140121-f5.jpg'
      ],
      description: 'The mix of all the animals herbivores and carnivores on a beautiful sunset of the savanna. The design includes large to small animals.',
    },
    {
      id: 'stellar-series',
      name: 'Fallen leaves 2.0',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/IMG-20241116-WA0036-s1.jpg',
        '/images/IMG-20241116-WA0032-s2.jpg',
        '/images/IMG-20241116-WA0024-s3.jpg',
        '/images/IMG-20241116-WA0016-s4.jpg',
        '/images/IMG-20241116-WA0014-s5.jpg'
      ],
      description: 'Contemporary plant leaves-inspired lighting featuring cosmic designs and celestial aesthetics for modern spaces.',
    },
    {
      id: 'radiance-collection',
      name: 'The five mugshots',
      category: 'piece',
      price: '$200 - $250',
      images: [
        '/images/IMG-20250123-WA0028-r1.jpg',
        '/images/IMG-20250123-WA0026-r2.jpg',
        '/images/IMG-20250123-WA0022-r3.jpg',
        '/images/IMG-20250123-WA0020-r4.jpg',
        '/images/IMG-20250123-WA0016-r5.jpg'
      ],
      description: 'The big five of the animal kingdom displaying their faces all around the lamp emphasizing brilliant illumination and sophisticated design elements.',
    },
    {
      id: 'quantum-line',
      name: 'Fallen leaves 00',
      category: 'collection',
      price: '$179 - $799',
      images: [
        '/images/IMG-20250213-WA0011-q1.jpg',
        '/images/IMG-20250213-WA0017-q2.jpg',
        '/images/IMG-20250213-WA0007-q3.jpg',
        '/images/IMG-20250213-WA0015-q4.jpg',
        '/images/IMG-20250213-WA0013-q5.jpg'
      ],
      description: 'Contemporary plant-leaves,lighting featuring cosmic designs and celestial aesthetics for modern spaces.',
    },
    {
      id: 'prism-series',
      name: 'Family tree',
      category: 'piece',
      price: '$250 - $350',
      images: [
        '/images/IMG-20250501-WA0021-p1.jpg',
        '/images/IMG-20250501-WA0020-p2.jpg',
        '/images/IMG-20250501-WA0018-p3.jpg',
        '/images/IMG-20250501-WA0015-p4.jpg',
        '/images/IMG-20250501-WA0009-p5.jpg'
      ],
      description: 'A stand lamp with three branches each one faces its own directions, featuring light refraction and spectrum effects for abstracts and dynamic illumination.',
    },
    {
      id: 'orbit-collection',
      name: 'The young roar',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/IMG-20250516-WA0016-o1.jpg',
        '/images/IMG-20250516-WA0012-o2.jpg',
        '/images/IMG-20250516-WA0004-o3.jpg',
        '/images/IMG-20250516-WA0002-o4.jpg',
        '/images/IMG-20250516-WA0006-o5.jpg'
      ],
      description: 'Lion inspired design with two sides a young lion roaring and a very chilled dad each side showing a unique and dynamic patterns.',
    },
    {
      id: 'nova-line',
      name: 'Butterfly effects',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/IMG-20250527-WA0035-n1.jpg',
        '/images/IMG-20250527-WA0033-n2.jpg',
        '/images/IMG-20250527-WA0039-n3.jpg',
        '/images/IMG-20250527-WA0037-n4.jpg',
        '/images/IMG-20250527-WA0036-n5.jpg'
      ],
      description: 'Explosive butterfly design with crystal spackle, featuring burst patterns and radial designs for dramatic illumination effects.',
    },
    {
      id: 'meridian-series',
      name: 'The wild sere',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/IMG-20250606-WA0007-m1.jpg',
        '/images/IMG-20250606-WA0011-m2.jpg',
        '/images/IMG-20250606-WA0021-m3.jpg',
        '/images/IMG-20250606-WA0013-m4.jpg',
        '/images/IMG-20250606-WA0001-m5.jpg'
      ],
      description: 'The wild inspired lamp, featuring linear and directional designs for precise illumination control.',
    },
    {
      id: 'lumina-collection',
      name: 'The humming',
      category: 'collection',
      price: '$100 - $150',
      images: [
        '/images/IMG-20250616-WA0007-l1.jpg',
        '/images/IMG-20250616-WA0001-l2.jpg',
        '/images/IMG-20250616-WA0003-l4.jpg',
        '/images/IMG-20250616-WA0009-l4.jpg',
        '/images/IMG-20250616-WA0005-l5.jpg'
      ],
      description: 'Elegant design showing hummingbird with different artisanal style clean illumination and minimalist design principles.',
    },
    {
      id: 'heritage-k-series',
      name: 'African Rhinoceros',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20231002_141245_IMG_0901-k1.jpg',
        '/images/20231002_141245_IMG_0901-k2.jpg',
        '/images/20231002_141245_IMG_0901-k3.jpg',
        '/images/20231002_141052_IMG_0893-k4.jpg',
        '/images/20231002_140955_IMG_0889-k5.jpg'
      ],
      description: 'African rhino on three different carving style with traditional craftsmanship meets contemporary design in this heritage featuring intricate patterns and timeless elegance.',
    },
    {
      id: 'artisan-j-series',
      name: 'cool king',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20231004_155909_IMG_0908-j1.jpg',
        '/images/20231004_160327_IMG_0926-j2.jpg',
        '/images/20231004_160327_IMG_0926-j3.jpg',
        '/images/20231004_160327_IMG_0926-j4.jpg',
        '/images/20231004_160327_IMG_0926-j5.jpg'
      ],
      description: 'A king of the jungle in three different styles, Masterfully crafted lighting pieces showcasing exceptional artisanal techniques and sophisticated design elements.',
    },
    {
      id: 'illumina-i-series',
      name: 'Chilly cheetah',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20231011_145655_IMG_0938-i1.jpg',
        '/images/20231011_145655_IMG_0938-i2.jpg',
        '/images/20231011_145605_IMG_0937-i3.jpg',
        '/images/20231011_145655_IMG_0938-i4.jpg',
        '/images/20231011_150015_IMG_0953-i5.jpg'
      ],
      description: 'Exploration of artistry in three different sides. Innovative lighting solutions combining modern aesthetics with functional brilliance for contemporary living spaces.',
    },
    {
      id: 'terra-t-series',
      name: 'Bibi baobab',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20231014_142008_IMG_0984-t1.jpg',
        '/images/20231014_141946_IMG_0982-t2.jpg',
        '/images/20231014_142225_IMG_0989-t3.jpg',
        '/images/20231014_142151_IMG_0987-t4.jpg',
        '/images/20231014_142516_IMG_0997-t5.jpg'
      ],
      description: 'Three different aspects of a baobab tree. Earth-inspired designs featuring natural textures and organic forms that bring warmth and character to any environment.',
    },
    {
      id: 'urban-u-series',
      name: 'Brother Buffalo',
      category: 'piece',
      price: '$120 - $150',
      images: [
        '/images/20231019_144959_IMG_1031-u1.jpg',
        '/images/20231019_145104_IMG_1035-u2.jpg',
        '/images/20231019_145026_IMG_1032-u3.jpg',
        '/images/20231019_145051_IMG_1034-u4.jpg',
        '/images/20231019_145204_IMG_1038-u5.jpg'
      ],
      description: 'Three sided buffalo with metropolitan-inspired lighting featuring sleek patterns and contemporary finishes perfect for modern urban spaces.',
    },
    {
      id: 'golden-g-series',
      name: 'Tied Wave',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20240105_163859_IMG_1386-g1.jpg',
        '/images/20240105_163859_IMG_1386-g2.jpg',
        '/images/20240105_163851_IMG_1385-g3.jpg',
        '/images/20240105_163847_IMG_1384-g4.jpg',
        '/images/20240105_163754_IMG_1380-g5.jpg'
      ],
      description: 'Luxurious abstract yet undefined shapes and elegant craftsmanship for sophisticated interiors.',
    },
    {
      id: 'vintage-v-series',
      name: 'Posing Zebra',
      category: 'piece',
      price: '$100 - $160',
      images: [
        '/images/20240122_155926_IMG_1502-v1.jpg',
        '/images/20240122_160019_IMG_1505-v2.jpg',
        '/images/20240122_160128_IMG_1511-v3.jpg',
        '/images/20240122_160137_IMG_1512-v4.jpg',
        '/images/20240122_160320_IMG_1517-v5.jpg'
      ],
      description: 'The silly zebra trying to show that he got some moves. creative craftsmanship combining different styles for the same results.',
    },
    {
      id: 'harmony-h-series',
      name: 'Toto Tundu',
      category: 'piece',
      price: '$100 - $150',
      images: [
        '/images/20240326_142130_IMG_1803-h1.jpg',
        '/images/20240326_142155_IMG_1804-h2.jpg',
        '/images/20240326_142228_IMG_1805-h3.jpg',
        '/images/20240326_142228_IMG_1805-h4.jpg',
        '/images/20240326_142228_IMG_1805-h5.jpg'
      ],
      description: 'Harmoniously balanced designs featuring perfect proportions and refined aesthetics for creating peaceful ambiance.',
    }
  ];

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
    <div className="min-h-screen bg-white pt-24">
      {/* Header Section */}
      <motion.div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 py-16"
        variants={headerVariants}
        initial="hidden"
        animate={isHeaderVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h1 className="text-2xl md:text-3xl font-light text-primary" style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>
            Products
          </h1>
        </div>
      </motion.div>

      {/* Filter and View Toggle Section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mb-12"
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

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => setViewMode('list')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
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
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {viewMode === 'list' ? (
          /* List View - Original Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
            <div className="lg:block hidden">
              <ProductImage product={activeProduct} />
            </div>
          </div>
        ) : (
          /* Grid View - 4 Products Per Row */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;