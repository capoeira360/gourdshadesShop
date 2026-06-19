import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About The Maker',
  description: 'Learn about Isaac Munis, the artisan behind Gourd Shades, and his journey creating handmade calabash lamps in Arusha, Tanzania.',
  keywords: [
    'Isaac Munis',
    'about Gourd Shades',
    'Tanzanian artisan',
    'handmade calabash lamp maker',
    'African craftsmanship story',
  ],
  openGraph: {
    title: 'About The Maker | Gourd Shades',
    description: 'Discover the story behind Gourd Shades and the craftsmanship of handmade calabash lamps.',
    images: ['/images/image-wm-about.jpg'],
    url: 'https://gourdshades.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Maker | Gourd Shades',
    description: 'Meet Isaac Munis and learn how Gourd Shades turns calabash shells into artisan lighting.',
    images: ['/images/image-wm-about.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Gourd Shades',
    url: 'https://gourdshades.com/about',
    description: 'The story, mission, and craftsmanship behind Gourd Shades and artisan Isaac Munis.',
    mainEntity: {
      '@type': 'Person',
      name: 'Isaac Munis',
      jobTitle: 'Artisan and Founder',
      worksFor: {
        '@type': 'Organization',
        name: 'Gourd Shades',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
