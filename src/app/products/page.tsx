import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Our Products | Gourd Shades',
  description: 'Explore our collection of handmade calabash lampshades. From the African savanna to modern abstract designs, find the perfect lighting for your space.',
  openGraph: {
    title: 'Our Products | Gourd Shades',
    description: 'Explore our collection of handmade calabash lampshades. From the African savanna to modern abstract designs.',
    images: ['/images/top-intro.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/products',
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
