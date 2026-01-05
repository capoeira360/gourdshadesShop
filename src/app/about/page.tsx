import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Gourd Shades',
  description: 'Learn about Isaac Munis and his journey in creating handmade Calabash lampshades in Arusha, Tanzania.',
  openGraph: {
    title: 'About Us | Gourd Shades',
    description: 'Discover the story behind Gourd Shades and our mission to illuminate lives with handmade Calabash lamps.',
    images: ['/images/image-wm-about.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
