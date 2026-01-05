import { Metadata } from 'next';
import DisclaimerClient from './DisclaimerClient';

export const metadata: Metadata = {
  title: 'Disclaimer | Gourd Shades',
  description: 'Read our disclaimer regarding the use of our website and products. Important information about product availability, pricing, and liability.',
  openGraph: {
    title: 'Disclaimer | Gourd Shades',
    description: 'Read our disclaimer regarding the use of our website and products.',
  },
  alternates: {
    canonical: 'https://gourdshades.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return <DisclaimerClient />;
}
