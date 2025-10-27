'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import Link from 'next/link';

const WishlistButton: React.FC = () => {
  const { state } = useWishlist();

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
    },
    tap: { 
      scale: 0.9
    }
  };

  return (
    <motion.div
      className="fixed top-36 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Link href="/wishlist">
        <motion.button
          className="bg-accent text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="View Wishlist"
        >
          <Heart 
            size={24} 
            fill={state.totalItems > 0 ? "currentColor" : "none"}
            className="transition-all duration-300"
          />
          {state.totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={state.totalItems}
            >
              {state.totalItems}
            </motion.span>
          )}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default WishlistButton;