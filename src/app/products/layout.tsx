import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Collection",
  description: "Browse our collection of handcrafted gourd lamps. From the Artisan Series to the Bronze Collection, find the perfect unique lighting for your space.",
  openGraph: {
    title: "Our Collection | Gourd Shades",
    description: "Browse our collection of handcrafted gourd lamps.",
    url: "https://gourdshades.com/products",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
