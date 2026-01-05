import { Metadata } from 'next';
import WishlistClient from './WishlistClient';

export const metadata: Metadata = {
  title: 'My Wishlist | Gourd Shades',
  description: 'View and manage your favorite Gourd Shades products. Save items for later and easily add them to your inquiry.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
