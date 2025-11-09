'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { X, Mail, User, Phone, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { validateContactForm, sanitizeString, sanitizeEmail, sanitizePhone } from '@/lib/validation';

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  general?: string;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ isOpen, onClose }) => {
  const { state, clearCart } = useEnquiry();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/api/send-contact';
  const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || '/api/send-enquiry';
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const EMAILJS_TEMPLATE_ID_DEFAULT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID; // unified template ID

  const validateForm = (): boolean => {
    const validation = validateContactForm(formData);
    
    if (!validation.success) {
      const newErrors: FormErrors = {};
      validation.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof FormErrors;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    }
  };

  // Removed unused overlayVariants - using inline animation instead

  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(200, 168, 130, 0.1)"
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(200, 168, 130, 0.3)"
    },
    tap: { scale: 0.98 }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrors({});

    try {
      // Sanitize form data
      const sanitizedData = {
        name: sanitizeString(formData.name),
        email: sanitizeEmail(formData.email),
        phone: sanitizePhone(formData.phone),
        message: sanitizeString(formData.message),
        items: state.items,
        totalItems: state.totalItems,
        totalValue: state.totalValue,
        timestamp: new Date().toISOString(),
      };

      // Prefer EmailJS if configured; otherwise fall back to API endpoints
      const useEmailJS = Boolean(EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_TEMPLATE_ID_DEFAULT);

      if (useEmailJS) {
        const isContact = state.items.length === 0;
        const templateId = EMAILJS_TEMPLATE_ID_DEFAULT!;

        const itemsSummary = isContact
          ? 'No items'
          : state.items
              .map((item) => `${item.name} × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
              .join('\n');

        const params = {
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          message: sanitizedData.message,
          timestamp: sanitizedData.timestamp,
          site_url: process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
          form_type: isContact ? 'Contact' : 'Enquiry',
          // Enquiry-specific params
          items_summary: itemsSummary,
          total_items: String(isContact ? 0 : state.totalItems),
          total_value: `$${(isContact ? 0 : state.totalValue).toFixed(2)}`,
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID!,
          templateId,
          params,
          { publicKey: EMAILJS_PUBLIC_KEY! }
        );

        setSubmitStatus('success');
        clearCart();
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 2000);
        return;
      }

      // Fallback to server API endpoints
      const apiEndpoint = state.items.length === 0 ? CONTACT_ENDPOINT : ENQUIRY_ENDPOINT;
      const requestBody = state.items.length === 0 
        ? {
            name: sanitizedData.name,
            email: sanitizedData.email,
            phone: sanitizedData.phone,
            message: sanitizedData.message,
            timestamp: sanitizedData.timestamp,
          }
        : sanitizedData;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Try to parse JSON; if not JSON (e.g., static 404 page), fall back to text
      type ApiError = {
        error?: string;
        details?: { field: string; message: string }[];
      };
      let result: ApiError = {};
      try {
        result = (await response.json()) as ApiError;
      } catch {
        const text = await response.text();
        result = { error: text };
      }

      if (!response.ok) {
        if (response.status === 429) {
          setErrors({ general: 'Too many requests. Please try again later.' });
        } else if (result.details) {
          const newErrors: FormErrors = {};
          result.details.forEach((detail: { field: string; message: string }) => {
            const field = detail.field.split('.').pop() as keyof FormErrors;
            newErrors[field] = detail.message;
          });
          setErrors(newErrors);
        } else {
          setErrors({ general: result.error || 'Failed to send enquiry. Please try again.' });
        }
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      clearCart();
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);

    } catch (error) {
      console.error('Error sending enquiry:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-8 max-w-md w-full text-center"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Sent!</h2>
                <p className="text-gray-600">
                  Thank you for your enquiry. We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Form Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-primary text-white p-6 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Send Enquiry</h2>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="text-gray-200 mt-2">
                  Complete your details below to send your enquiry
                </p>
              </div>

              {/* Selected Items Summary */}
              <div className="p-6 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Selected Items ({state.totalItems})</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">{item.name} × {item.quantity}</span>
                      <span className="font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Value:</span>
                    <span className="text-primary">${state.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-[#F5EFE6] text-[#1A1815] placeholder-[#7A6E5A] focus:outline-none focus:ring-2 focus:ring-[#3A332C] ${
                      errors.name ? 'border-red-500' : 'border-[#3A332C]'
                    }`}
                    placeholder="Enter your full name"
                    variants={inputVariants}
                    whileFocus="focus"
                    animate="blur"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-[#F5EFE6] text-[#1A1815] placeholder-[#7A6E5A] focus:outline-none focus:ring-2 focus:ring-[#3A332C] ${
                      errors.email ? 'border-red-500' : 'border-[#3A332C]'
                    }`}
                    placeholder="Enter your email address"
                    variants={inputVariants}
                    whileFocus="focus"
                    animate="blur"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number *
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-[#F5EFE6] text-[#1A1815] placeholder-[#7A6E5A] focus:outline-none focus:ring-2 focus:ring-[#3A332C] ${
                      errors.phone ? 'border-red-500' : 'border-[#3A332C]'
                    }`}
                    placeholder="Enter your phone number"
                    variants={inputVariants}
                    whileFocus="focus"
                    animate="blur"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-[#F5EFE6] text-[#1A1815] placeholder-[#7A6E5A] focus:outline-none focus:ring-2 focus:ring-[#3A332C] resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#3A332C]'
                    }`}
                    placeholder="Tell us about your requirements or any questions you have..."
                    variants={inputVariants}
                    whileFocus="focus"
                    animate="blur"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Error Messages */}
                {(submitStatus === 'error' || errors.general) && (
                  <motion.div
                    className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="text-red-500 mr-3" size={20} />
                    <p className="text-red-700">
                      {errors.general || 'Failed to send enquiry. Please try again or contact us directly.'}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-opacity-90 text-white'
                  }`}
                  variants={buttonVariants}
                  whileHover={!isSubmitting ? "hover" : undefined}
                  whileTap={!isSubmitting ? "tap" : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryForm;