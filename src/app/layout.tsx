import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});
import Navigation from "@/components/Navigation";
import ScrollWatcher from "@/components/ScrollWatcher";
import LogoFixed from "@/components/LogoFixed";
import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/contexts/EnquiryContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ViewProvider } from "@/contexts/ViewContext";
import { PanelProvider } from "@/contexts/PanelContext";
import EnquiryCart from "@/components/EnquiryCart";
import WishlistButton from "@/components/WishlistButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gourdshades | Handmade Lamps",
  description: "Discover our curated collection of premium lighting solutions that transform any environment into something extraordinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${libreBaskerville.variable}`}>
        <EnquiryProvider>
          <WishlistProvider>
            <ViewProvider>
              <PanelProvider>
              {/* Scroll direction watcher and animated fixed logo */}
              <ScrollWatcher />
              <LogoFixed />
              <Navigation />
              <EnquiryCart />
              <WishlistButton />
              <main className="relative z-10 bg-white min-h-screen">
                {children}
              </main>
              <Footer />
              </PanelProvider>
            </ViewProvider>
          </WishlistProvider>
        </EnquiryProvider>
      </body>
    </html>
  );
}
