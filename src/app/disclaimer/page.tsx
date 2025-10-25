'use client';

import { motion } from 'framer-motion';
import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Section */}
      <motion.div
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Disclaimer
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Important information regarding the use of our website and products
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6 text-gray-700 leading-relaxed"
            >
              <p>
                The information provided on this website is intended for general informational purposes only. While we make every effort to ensure the accuracy, completeness, and reliability of the content presented, we do not guarantee that the information, including product descriptions, images, availability, or prices, is error-free or up-to-date. All content on this site is provided &ldquo;as is,&rdquo; and we are not responsible for any inaccuracies, errors, or omissions.
              </p>

              <p>
                Products sold through our website are subject to availability, and we reserve the right to modify, update, or discontinue any product at any time without prior notice. Prices and product details are subject to change without notice. You should carefully review all product information before making a purchase.
              </p>

              <p>
                We are not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of this website or the products purchased from it. This includes, but is not limited to, any loss of data, business interruptions, or any damages caused by the use or misuse of the products or information provided on the site.
              </p>

              <p>
                In the event that a product is incorrectly priced or described, we reserve the right to refuse or cancel any orders placed for that product, even if the order has been confirmed and your payment method charged. If an error in pricing or product details is discovered after your order is placed, we will notify you and offer the option to cancel the order or purchase the product at the correct price.
              </p>

              <p>
                By using this website, you acknowledge that you are doing so at your own risk and agree to take full responsibility for any actions taken based on the information provided. For any product-related questions or concerns, please contact us directly before making a purchase.
              </p>

              <p>
                We are not responsible for any third-party links, advertisements, or content found on external websites linked from our site. We do not endorse, control, or assume responsibility for any external content.
              </p>

              <p>
                This disclaimer may be updated periodically, and any changes will be posted on this page. By continuing to use the website, you agree to be bound by the updated terms.
              </p>

              <motion.div
                className="mt-8 pt-6 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <p className="text-sm text-gray-500 font-medium">
                  <strong>Last updated:</strong> October, 2025
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-12 h-12 bg-amber-200 rounded-full opacity-20"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default DisclaimerPage;