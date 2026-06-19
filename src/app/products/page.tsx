import { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { products } from './data';

export const metadata: Metadata = {
  title: 'Handmade Calabash Lamp Collection',
  description: 'Browse the Gourd Shades collection of handmade calabash lamps, carved gourd lighting, wildlife designs, abstract lampshades, and new statement pieces for interiors.',
  keywords: [
    'handmade calabash lamp collection',
    'gourd lighting collection',
    'artisan lamps for sale',
    'wildlife lampshades',
    'decorative handmade lighting',
  ],
  openGraph: {
    title: 'Handmade Calabash Lamp Collection | Gourd Shades',
    description: 'Explore handmade calabash lampshades from wildlife pieces to abstract and new contemporary designs.',
    images: ['/images/top-intro.jpg'],
    url: 'https://gourdshades.com/products',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handmade Calabash Lamp Collection | Gourd Shades',
    description: 'Browse handmade calabash lamps, sculptural lighting, and artisan-crafted statement pieces.',
    images: ['/images/top-intro.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/products',
  },
};

export default function ProductsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Handmade Calabash Lamp Collection',
    url: 'https://gourdshades.com/products',
    description: 'A collection of handmade calabash lamps and artisan gourd lighting by Gourd Shades.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://gourdshades.com/products/${product.id}`,
        name: product.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient />
    </>
  );
}
