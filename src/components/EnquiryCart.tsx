'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { X, Plus, Minus, ShoppingCart, Mail } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

// Removed empty interface - using React.FC without props type
const EnquiryCart: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart } = useEnquiry();
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleProceedToForm = () => {
    setIsFormOpen(true);
    setIsOpen(false);
  };

  const cartVariants = {
    hidden: { 
      x: '100%',
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1
    },
    exit: { 
      x: '100%',
      opacity: 0
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1
    },
    exit: { 
      opacity: 0, 
      x: -20,
      scale: 0.9
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
    },
    tap: { 
      scale: 0.95
    }
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <motion.span
            className="absolute -top-2 -right-2 bg-accent text-primary text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={totalItems}
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
              transition={{ duration: 0.3 }}
            />

            {/* Cart Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
              variants={cartVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
            >
              {/* Header */}
              <div className="bg-primary text-white p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Enquiry Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex flex-col h-full">
                {state.items.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Your enquiry cart is empty</p>
                      <p className="text-sm mt-2">Add items to start your enquiry</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <motion.div 
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.2
                            }
                          }
                        }}
                      >
                        <AnimatePresence>
                          {state.items.map((item) => (
                            <motion.div
                              key={item.id}
                              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                              variants={itemVariants}
                              layout
                              transition={{ 
                                layout: { duration: 0.3 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 }
                              }}
                            >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{item.category || 'Lamp'}</p>
                                <p className="text-lg font-bold text-primary mt-2">${item.price}</p>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <X size={16} />
                              </button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-3">
                                <motion.button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  <Minus size={16} />
                                </motion.button>
                                <span className="font-semibold text-lg min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  <Plus size={16} />
                                </motion.button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Subtotal</p>
                                <p className="font-bold text-primary">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="border-t bg-gray-50 p-4 space-y-4">
                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Items:</span>
                        <span className="text-lg font-bold text-primary">{totalItems}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <motion.button
                          onClick={handleProceedToForm}
                          className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-opacity-90"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Mail size={20} />
                          <span>Send Enquiry</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={handleClearCart}
                          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Clear Cart
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enquiry Form Modal */}
      <EnquiryForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default EnquiryCart;