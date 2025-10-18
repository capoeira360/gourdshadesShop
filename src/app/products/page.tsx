'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Product Image */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-light-gray to-very-light-gray">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-6xl opacity-30">{product.category === 'pendant' ? '💡' : product.category === 'chandelier' ? '✨' : product.category === 'sconce' ? '🏛️' : product.category === 'table' ? '🪔' : '🕯️'}</span>
          </motion.div>
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              className="px-6 py-3 bg-accent text-primary rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-medium text-primary group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <span className="text-lg font-semibold text-accent">
              {product.price}
            </span>
          </div>
          
          <p className="text-sm text-text-secondary uppercase tracking-wide mb-3">
            {product.category}
          </p>
          
          <p className="text-text-secondary leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: '1',
      name: 'Minimalist Pendant',
      category: 'pendant',
      price: '$299',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iODAiIGZpbGw9IiNEQkI0MkMiLz4KPGxpbmUgeDE9IjIwMCIgeTE9IjEyMCIgeDI9IjIwMCIgeTI9IjgwIiBzdHJva2U9IiM0QTQ1NEIiIHN0cm9rZS13aWR0aD0iNCIvPgo8L3N2Zz4K',
      description: 'Clean lines and modern aesthetics define this elegant pendant light.',
    },
    {
      id: '2',
      name: 'Crystal Chandelier',
      category: 'chandelier',
      price: '$1,299',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iNjAiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTYwIiBjeT0iMjQwIiByPSIyMCIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyNDAiIGN5PSIyNDAiIHI9IjIwIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI4MCIgcj0iMTUiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
      description: 'Luxurious crystal chandelier that transforms any space into a palace.',
    },
    {
      id: '3',
      name: 'Industrial Sconce',
      category: 'sconce',
      price: '$199',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE4MCIgeT0iMTUwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREJCNDJDIi8+CjxyZWN0IHg9IjE3MCIgeT0iMTQwIiB3aWR0aD0iNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM0QTQ1NEIiLz4KPHN2Zz4K',
      description: 'Raw materials meet refined design in this industrial wall sconce.',
    },
    {
      id: '4',
      name: 'Ceramic Table Lamp',
      category: 'table',
      price: '$149',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE5NSIgeT0iMjAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEE0NTRCIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNjAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjREJCNDJDIi8+CjxyZWN0IHg9IjE3MCIgeT0iMzAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIGZpbGw9IiM0QTQ1NEIiLz4KPHN2Zz4K',
      description: 'Handcrafted ceramic base with a soft linen shade for warm ambiance.',
    },
    {
      id: '5',
      name: 'Arc Floor Lamp',
      category: 'floor',
      price: '$399',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE5NSIgeT0iMTAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEE0NTRCIi8+CjxyZWN0IHg9IjE2MCIgeT0iODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIzMjAiIHI9IjMwIiBmaWxsPSIjNEE0NTRCIi8+Cjwvc3ZnPgo=',
      description: 'Sweeping arc design provides focused lighting with dramatic presence.',
    },
    {
      id: '6',
      name: 'Geometric Pendant',
      category: 'pendant',
      price: '$249',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTIwTDI2MCAyMDBIMTQwTDIwMCAxMjBaIiBmaWxsPSIjREJCNDJDIi8+CjxsaW5lIHgxPSIyMDAiIHkxPSIxMjAiIHgyPSIyMDAiIHkyPSI4MCIgc3Ryb2tlPSIjNEE0NTRCIiBzdHJva2Utd2lkdGg9IjQiLz4KPGxpbmUgeDE9IjE2MCIgeTE9IjE4MCIgeDI9IjI0MCIgeTI9IjE4MCIgc3Ryb2tlPSIjNEE0NTRCIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
      description: 'Bold geometric shapes create striking shadows and visual interest.',
    },
    {
      id: '7',
      name: 'Modern Chandelier',
      category: 'chandelier',
      price: '$899',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRBNDU0QiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CjxyZWN0IHg9IjE4MCIgeT0iMjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTYwIiBjeT0iMjQwIiByPSIxNSIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyNDAiIGN5PSIyNDAiIHI9IjE1IiBmaWxsPSIjREJCNDJDIi8+Cjwvc3ZnPgo=',
      description: 'Contemporary interpretation of the classic chandelier design.',
    },
    {
      id: '8',
      name: 'Brass Sconce',
      category: 'sconce',
      price: '$179',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE4MCIgeT0iMTUwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREJCNDJDIi8+CjxyZWN0IHg9IjE3MCIgeT0iMTQwIiB3aWR0aD0iNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM0QTQ1NEIiLz4KPHN2Zz4K',
      description: 'Warm brass finish adds sophistication to any interior space.',
    },
    {
      id: '9',
      name: 'Smart Table Lamp',
      category: 'table',
      price: '$199',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE5NSIgeT0iMjAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEE0NTRCIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNjAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjREJCNDJDIi8+CjxyZWN0IHg9IjE3MCIgeT0iMzAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIGZpbGw9IiM0QTQ1NEIiLz4KPHN2Zz4K',
      description: 'Technology meets design with app-controlled lighting features.',
    },
  ];

  const categories = ['all', 'pendant', 'chandelier', 'sconce', 'table', 'floor'];

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
    <div className="min-h-screen bg-very-light-gray pt-24">
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
                  : 'bg-white text-primary hover:bg-primary hover:text-white'
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-primary py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-light text-white mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Our lighting specialists are here to help you find the perfect solution for your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-accent text-primary rounded-full font-medium hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
            <Link href="/gallery">
              <motion.button
                className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Gallery
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;