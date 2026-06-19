import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { products } from './products/data';

export const metadata: Metadata = {
  title: 'Handmade Calabash Lamps From Tanzania',
  description: 'Shop handmade calabash lamps from Tanzania by Gourd Shades. Discover carved gourd lampshades with wildlife, abstract, and contemporary designs for warm statement lighting.',
  keywords: [
    'handmade calabash lamps',
    'Tanzanian lampshades',
    'carved gourd lighting',
    'artisan home lighting',
    'African handmade decor',
  ],
  openGraph: {
    title: 'Handmade Calabash Lamps From Tanzania | Gourd Shades',
    description: 'Unique handmade lampshades crafted from dried calabash shells with intricate perforated patterns.',
    images: ['/images/the-mission.jpg'],
    url: 'https://gourdshades.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handmade Calabash Lamps From Tanzania | Gourd Shades',
    description: 'Explore handmade gourd lampshades with wildlife, abstract, and modern designs.',
    images: ['/images/the-mission.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/',
  },
};

export default function Home() {
  const featuredProducts = [
    ...products.slice(0, 3),
    products.find((product) => product.id === 'aura-new-design-lamp'),
  ].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Gourd Shades Home',
    url: 'https://gourdshades.com/',
    description: 'Handmade calabash lamps and artisan gourd lighting crafted in Tanzania.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: featuredProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://gourdshades.com/products/${product!.id}`,
        name: product!.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
