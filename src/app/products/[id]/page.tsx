// server component wrapper for static export

// server wrapper: only import server-safe modules
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { products } from '../data';

// Pre-render all product detail pages for static export
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const product = products.find((p) => p.id === params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} Handmade Calabash Lamp`,
    description: product.longDescription,
    keywords: [
      product.name,
      'handmade calabash lamp',
      'gourd lighting',
      product.category,
      'artisan home decor',
    ],
    openGraph: {
      title: `${product.name} Handmade Calabash Lamp | Gourd Shades`,
      description: product.longDescription,
      images: product.images.length > 0 ? [product.images[0]] : [],
      url: `https://gourdshades.com/products/${product.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} Handmade Calabash Lamp | Gourd Shades`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `https://gourdshades.com/products/${product.id}`,
    },
  };
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const priceString = product.price.replace(/[^0-9.-]/g, '');
  const prices = priceString.split('-').map(p => p.trim());
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "sku": product.id,
    "image": product.images.map(img => `https://gourdshades.com${img}`),
    "description": product.description,
    "url": `https://gourdshades.com/products/${product.id}`,
    "category": product.category,
    "material": "Calabash gourd",
    "brand": {
      "@type": "Brand",
      "name": "Gourd Shades"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Gourd Shades"
    },
    "offers": prices.length > 1 ? {
      "@type": "AggregateOffer",
      "lowPrice": prices[0],
      "highPrice": prices[1],
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    } : {
      "@type": "Offer",
      "price": prices[0],
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
