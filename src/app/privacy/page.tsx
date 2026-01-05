import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gourd Shades',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Gourd Shades',
    description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
  },
  alternates: {
    canonical: 'https://gourdshades.com/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
