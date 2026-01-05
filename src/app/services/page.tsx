import React from 'react';
import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Community & Services | Gourd Shades',
  description: 'Gourd Shades community outreach and exhibitions. We believe in empowering people through creativity and education.',
  openGraph: {
    title: 'Community & Services | Gourd Shades',
    description: 'Gourd Shades community outreach and exhibitions. We believe in empowering people through creativity and education.',
    images: ['/images/20241018_094717-reach-1-.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
