import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Gourd Shades',
  description: 'Contact Gourd Shades to ask about handmade calabash lamps, custom artisan lighting, availability, pricing, and product enquiries.',
  keywords: [
    'contact Gourd Shades',
    'calabash lamp enquiry',
    'custom handmade lighting',
    'artisan lamp contact',
    'gourd lamp pricing',
  ],
  openGraph: {
    title: 'Contact Gourd Shades',
    description: 'Get in touch about handmade calabash lamps, custom lighting, pricing, and enquiries.',
    images: ['/images/IMG-20250307-WA0009-nav-contacts.jpg'],
    url: 'https://gourdshades.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Gourd Shades',
    description: 'Ask about handmade calabash lamps, custom lighting, and availability.',
    images: ['/images/IMG-20250307-WA0009-nav-contacts.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/contact',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Gourd Shades',
    url: 'https://gourdshades.com/contact',
    description: 'Contact page for enquiries about handmade calabash lamps and artisan lighting.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
