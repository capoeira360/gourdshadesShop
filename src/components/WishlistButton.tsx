'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { usePanel } from '@/contexts/PanelContext';
import Link from 'next/link';

const WishlistButton: React.FC = () => {
  const { state } = useWishlist();
  const { state: panelState } = usePanel();

  // Hide button when navigation or enquiry panels are open, or when scrolling down
  const isHidden = panelState.isNavigationOpen || panelState.isEnquiryOpen || panelState.isScrollingDown;

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
    },
    tap: { 
      scale: 0.9
    },
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div
      className="fixed top-28 right-4 z-50"
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: isHidden ? 0 : 1, y: isHidden ? -24 : 0, scale: isHidden ? 0.98 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isHidden ? 'none' : 'auto', willChange: 'transform, opacity' }}
    >
      <Link href="/wishlist">
        <motion.button
          className="bg-accent text-primary p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="View Wishlist"
        >
          <Heart 
            size={20} 
            fill={state.totalItems > 0 ? "currentColor" : "none"}
            className="transition-all duration-300"
          />
          {state.totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-primary text-white text-[10px] sm:text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold shadow-lg"
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
