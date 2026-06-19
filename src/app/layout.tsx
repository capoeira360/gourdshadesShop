import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";
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
    default: "Handmade Calabash Lamps & Gourd Lighting | Gourd Shades",
    template: "%s | Gourd Shades",
  },
  description: "Discover handmade calabash lamps and artisan gourd lighting by Isaac Munis in Tanzania. Shop sculptural lampshades with carved patterns, warm light, and authentic African craftsmanship.",
  keywords: [
    "handmade calabash lamps",
    "gourd lamps",
    "calabash lampshades",
    "artisan lighting",
    "African handcrafted lamps",
    "Tanzanian home decor",
    "sustainable lighting",
    "statement lampshades",
    "unique home decor",
  ],
  authors: [{ name: "Gourd Shades" }],
  creator: "Gourd Shades",
  publisher: "Gourd Shades",
  category: "Home Decor",
  alternates: {
    canonical: "https://gourdshades.com",
  },
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
    title: "Handmade Calabash Lamps & Gourd Lighting | Gourd Shades",
    description: "Discover handmade calabash lamps and artisan gourd lighting with carved patterns, warm light, and authentic African craftsmanship.",
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
    title: "Handmade Calabash Lamps & Gourd Lighting | Gourd Shades",
    description: "Discover handmade calabash lamps and artisan gourd lighting from Tanzania.",
    images: ["/images/top-intro.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Gourd Shades",
      "url": "https://gourdshades.com",
      "logo": "https://gourdshades.com/logo-gourd-shades-square.svg",
      "description": "Handmade calabash lamps and artisan gourd lighting crafted in Tanzania.",
      "founder": {
        "@type": "Person",
        "name": "Isaac Munis"
      },
      "sameAs": [
        "https://www.facebook.com/gourdshades",
        "https://www.instagram.com/gourdshades"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Gourd Shades",
      "url": "https://gourdshades.com",
      "description": "Explore handmade calabash lamps, sculptural lighting, and artisan-crafted home decor."
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${libreBaskerville.variable}`} suppressHydrationWarning>
        {/* Use a dedicated background image for iPads and smaller screens. */}
        <div className="fixed top-0 left-0 w-full h-[120vh] sm:h-screen z-[-1] pointer-events-none min-[1025px]:hidden">
          <Image
            src="/media-background.jpeg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
            aria-hidden
            role="presentation"
          />
        </div>
        <div className="fixed top-0 left-0 hidden w-full h-[120vh] sm:h-screen z-[-1] pointer-events-none min-[1025px]:block">
          <Image
            src="/background-replace.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
            aria-hidden
            role="presentation"
          />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
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
