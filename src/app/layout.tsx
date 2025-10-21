import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import StickyFooterReveal from "@/components/StickyFooterReveal";

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
        {/* Standalone Logo - positioned independently */}
        <div className="fixed top-1 left-6 z-40">
          <img 
            src="/logo-gourd-shades-square.svg" 
            alt="Gourd Shades" 
            style={{ width: '150px', height: '150px' }}
          />
        </div>
        <Navigation />
        <StickyFooterReveal>
          {children}
        </StickyFooterReveal>
      </body>
    </html>
  );
}
