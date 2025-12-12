'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PriceDisplay from '@/components/PriceDisplay';
import { Product } from '@/app/products/data';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isVisible] = useState(true);
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
              <PriceDisplay 
                price={product.price}
                className="text-lg font-semibold"
              />
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

export default ProductCard;
