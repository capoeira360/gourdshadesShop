'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist, WishlistItem } from '@/contexts/WishlistContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import PriceDisplay from '@/components/PriceDisplay';

const WishlistPage: React.FC = () => {
  const { state: wishlistState, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToEnquiry } = useEnquiry();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleAddToEnquiry = (item: WishlistItem) => {
    addToEnquiry({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
  };

  const handleClearWishlist = () => {
    const confirmed = window.confirm('Are you sure you want to clear your entire wishlist? This action cannot be undone.');
    if (confirmed) {
      console.log('✅ User confirmed clear wishlist');
      clearWishlist();
    } else {
      console.log('❌ User cancelled clear wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="text-red-500" size={32} />
              <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
              {wishlistState.totalItems > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {wishlistState.totalItems}
                </span>
              )}
            </div>
            <p className="text-gray-600">
              {wishlistState.totalItems === 0 
                ? "Your wishlist is empty" 
                : `${wishlistState.totalItems} ${wishlistState.totalItems === 1 ? 'item' : 'items'} in your wishlist`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation and Action Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/products" 
              className="flex items-center bg-white px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:text-primary hover:border-primary hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Products</span>
            </Link>
          </motion.div>
          
          {wishlistState.totalItems > 0 && (
            <motion.button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearWishlist();
              }}
              className="text-red-600 hover:text-white hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-lg border border-red-200 hover:border-red-600 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 size={16} />
              <span className="font-medium">Clear All</span>
            </motion.button>
          )}
        </div>

        {wishlistState.totalItems === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Heart size={64} className="mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products you love to your wishlist. You can save items for later and easily find them here.
            </p>
          </motion.div>
        ) : (
          // Wishlist Items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistState.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Heart size={16} className="fill-current text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="mb-4">
                    <PriceDisplay price={`$${item.price.toFixed(2)}`} />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToEnquiry(item)}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={16} />
                      <span>Add to Enquiry</span>
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;