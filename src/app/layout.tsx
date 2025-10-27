import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { EnquiryProvider } from "@/contexts/EnquiryContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import EnquiryCart from "@/components/EnquiryCart";
import WishlistButton from "@/components/WishlistButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "LampCo - Premium Lighting Solutions",
  description: "Discover our curated collection of premium lighting solutions that transform any environment into something extraordinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <EnquiryProvider>
          <WishlistProvider>
            {/* Standalone Logo - positioned independently */}
            <div className="fixed top-1 left-6 z-40">
              <Image 
                src="/logo-gourd-shades-square.svg" 
                alt="Gourd Shades" 
                width={150}
                height={150}
              />
            </div>
            <Navigation />
            <EnquiryCart />
            <WishlistButton />
            <StickyFooterReveal>
              {children}
            </StickyFooterReveal>
          </WishlistProvider>
        </EnquiryProvider>
      </body>
    </html>
  );
}
