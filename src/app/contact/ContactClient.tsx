'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

const ContactClient: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/api/send-contact';
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID; // unified template ID
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const timestamp = new Date().toISOString();
      const useEmailJS = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

      if (useEmailJS) {
        const params = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp,
          site_url: process.env.NEXT_PUBLIC_SITE_URL || window.location.origin,
          form_type: 'Contact',
          items_summary: 'No items',
          total_items: '0',
          total_value: '$0.00',
        };
        await emailjs.send(
          EMAILJS_SERVICE_ID!,
          EMAILJS_TEMPLATE_ID!,
          params,
          { publicKey: EMAILJS_PUBLIC_KEY! }
        );
        alert('Message sent successfully! We\'ll get back to you within 24 hours.');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
        return;
      }

      // Fallback to API endpoint for non-static hosting
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp,
        }),
      });

      if (response.ok) {
        alert('Message sent successfully! We\'ll get back to you within 24 hours.');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      } else {
        let errorText = 'Failed to send message. Please try again.';
        try {
          const errorData = await response.json();
          errorText = errorData.error || errorText;
        } catch {
          const text = await response.text();
          if (text) errorText = text;
        }
        alert(errorText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 font-sans text-primary flex items-center justify-center p-4">
      
      {/* Main Card */}
      <motion.div 
        className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row min-h-[700px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Column - Image Only */}
        <div className="w-full lg:w-5/12 relative min-h-[300px] lg:min-h-auto">
          <Image 
            src="/images/IMG-20250307-WA0009-nav-contacts.jpg" 
            alt="Gourd Shades contact page image for handmade calabash lamp enquiries" 
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Right Column - Form */}
        <div className="w-full lg:w-7/12 p-8 lg:p-12 bg-white">
          <div className="mb-8">
             <h1 className="text-2xl font-light text-primary" style={{ fontFamily: 'var(--font-libre-baskerville), Arial, Helvetica, sans-serif' }}>
               Contact Gourd Shades
             </h1>
             <p className="mt-3 text-sm leading-7 text-[#4f342e]/80">
               Say hello :) Ask about handmade calabash lamps, custom lighting ideas, pricing, or product availability.
             </p>
             <p className="mt-3 text-sm leading-7 text-[#4f342e]/75">
               You can browse the <Link href="/products" className="underline underline-offset-4 hover:text-[#8f735f]">collection</Link> first,
               or read <Link href="/about" className="underline underline-offset-4 hover:text-[#8f735f]">the maker&apos;s story</Link> before sending your message.
             </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full border-b border-gray-300 py-2 focus:border-accent focus:outline-none transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full border-b border-gray-300 py-2 focus:border-accent focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border-b border-gray-300 py-2 focus:border-accent focus:outline-none transition-colors bg-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent focus:outline-none transition-colors bg-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full border-b border-gray-300 py-2 focus:border-accent focus:outline-none transition-colors bg-transparent resize-none"
              />
            </div>
            
            <div className="pt-6">
              <motion.button
                type="submit"
                className="w-full bg-[#DBB42C] text-white font-medium py-4 rounded hover:bg-[#c9a528] transition-colors shadow-md"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Submit
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactClient;
