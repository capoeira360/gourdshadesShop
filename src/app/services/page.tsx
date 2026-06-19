import React from 'react';
import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Community & Services | Gourd Shades',
  description: 'Explore Gourd Shades community outreach, exhibitions, and creative education work in Tanzania through artisan craft and handmade lighting.',
  keywords: [
    'Gourd Shades community',
    'artisan outreach Tanzania',
    'creative education',
    'handmade lighting exhibitions',
    'community art programs',
  ],
  openGraph: {
    title: 'Community & Services | Gourd Shades',
    description: 'Community outreach, exhibitions, and creative education through artisan craft and handmade lighting.',
    images: ['/images/20241018_094717-reach-1-.jpg'],
    url: 'https://gourdshades.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community & Services | Gourd Shades',
    description: 'See Gourd Shades outreach work, exhibitions, and artisan community programs.',
    images: ['/images/20241018_094717-reach-1-.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/services',
  },
};

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Gourd Shades Community and Services',
    url: 'https://gourdshades.com/services',
    description: 'Community outreach, exhibitions, and creativity-focused education by Gourd Shades.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
