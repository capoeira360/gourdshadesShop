'use client';

import { motion } from 'framer-motion';
import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-[-1] w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/20240612_135238-featured-2-min.jpg)' }}
      />
      {/* Header Section */}
      <motion.div
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Disclaimer
          </motion.h1>
          <motion.p
            className="text-xl text-[#4f342e]/80 max-w-2xl mx-auto"
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
        <div className="bg-white/90 backdrop-blur-sm shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6 text-[#4f342e] leading-relaxed"
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
                className="mt-8 pt-6 border-t border-[#4f342e]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <p className="text-sm text-[#4f342e]/60 font-medium">
                  <strong>Last updated:</strong> October, 2025
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DisclaimerPage;