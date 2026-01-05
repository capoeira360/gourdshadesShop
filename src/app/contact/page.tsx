import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Gourd Shades',
  description: 'Get in touch with Gourd Shades. We are here to answer your questions about our handmade Calabash lampshades.',
  openGraph: {
    title: 'Contact Us | Gourd Shades',
    description: 'Get in touch with Gourd Shades. We are here to answer your questions about our handmade Calabash lampshades.',
    images: ['/images/IMG-20250307-WA0009-nav-contacts.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
