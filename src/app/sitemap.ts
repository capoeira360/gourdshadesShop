import { MetadataRoute } from 'next';
import { products } from './products/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gourdshades.com';

  // Static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/products',
    '/privacy',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Products are high priority
  }));

  return [...routes, ...productRoutes];
}
