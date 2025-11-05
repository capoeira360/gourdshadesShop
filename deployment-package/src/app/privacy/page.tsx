'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-white/20"
          >
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-8 text-gray-600">
                We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide when purchasing products on our website.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  Information We Collect
                </h2>
                <p className="mb-4">
                  We collect personal information when you make an inquiry for one of our products. This may include your name, email address, billing and shipping address, phone number, and payment information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use your personal information to process orders, provide customer support, communicate with you about your purchases, and improve your shopping experience. We may also use your information to send you marketing communications if you have opted in.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  Sharing Your Information
                </h2>
                <p className="mb-4">
                  We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted service providers (e.g., payment processors, shipping companies) who assist us in operating our business and delivering products to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  Data Security
                </h2>
                <p className="mb-4">
                  We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of online transmission is 100% secure, and we cannot guarantee complete security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  Your Rights
                </h2>
                <p className="mb-4">
                  You have the right to access, update, or delete your personal information at any time. To make any changes, please contact us through our website or email.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  Cookies
                </h2>
                <p className="mb-4">
                  We only use generic cookies to enhance your experience on our website. We do not analyze website traffic. You can disable cookies through your browser settings, but this may affect your ability to use some features on our site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-amber-200 pb-2">
                  Changes to This Policy
                </h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will be effective as of the date it is posted.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  If you have any questions or concerns about this Privacy Policy, please contact us.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Last updated: March 25th, 2025
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}