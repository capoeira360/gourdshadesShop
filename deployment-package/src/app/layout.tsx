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

export const metadata: Metadata = {
  metadataBase: new URL('https://gourdshades.com'),
  title: {
    default: "Gourd Shades | Handmade Calabash Lamps",
    template: "%s | Gourd Shades",
  },
  description: "Discover stunning handcrafted lampshades made from dried calabash shells. Our artisan lighting solutions transform any environment with beautiful shadow patterns.",
  keywords: ["gourd lamps", "calabash lampshades", "handmade lighting", "African craftsmanship", "sustainable lighting", "artisan lamps", "unique home decor"],
  authors: [{ name: "Gourd Shades" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gourdshades.com",
    title: "Gourd Shades | Handmade Calabash Lamps",
    description: "Discover stunning handcrafted lampshades made from dried calabash shells. Our artisan lighting solutions transform any environment with beautiful shadow patterns.",
    siteName: "Gourd Shades",
    images: [
      {
        url: "/images/top-intro.jpg",
        width: 1200,
        height: 630,
        alt: "Gourd Shades Handcrafted Lamps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourd Shades | Handmade Calabash Lamps",
    description: "Discover stunning handcrafted lampshades made from dried calabash shells.",
    images: ["/images/top-intro.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${libreBaskerville.variable}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Gourd Shades",
              "url": "https://gourdshades.com",
              "logo": "https://gourdshades.com/logo-gourd-shades-square.svg",
              "description": "Handcrafted lampshades made from dried calabash shells.",
              "sameAs": [
                "https://www.facebook.com/gourdshades",
                "https://www.instagram.com/gourdshades"
              ]
            })
          }}
        />
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
              <main className="relative z-10 min-h-screen">
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
