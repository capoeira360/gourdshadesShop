import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Gourd Shades | Handmade Calabash Lamps',
  description: 'Handmade Calabash Lampshades. We use dried shells of Calabash to create stunning lampshades by drilling perforated patterns on them to let the light escape.',
  openGraph: {
    title: 'Gourd Shades | Handmade Calabash Lamps',
    description: 'Unique handmade lampshades crafted from dried Calabash shells, featuring intricate perforated patterns.',
    images: ['/images/the-mission.jpg'],
  },
  alternates: {
    canonical: 'https://gourdshades.com/',
  },
};

export default function Home() {
  return <HomeClient />;
}