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
        <Navigation />
        <StickyFooterReveal>
          {children}
        </StickyFooterReveal>
      </body>
    </html>
  );
}
