import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Maker",
  description: "Learn about the mission, heritage, and craftsmanship behind Gourd Shades. Discover how we turn dried calabash shells into stunning works of art.",
  openGraph: {
    title: "About the Maker | Gourd Shades",
    description: "Learn about the mission, heritage, and craftsmanship behind Gourd Shades.",
    url: "https://gourdshades.com/about",
    images: [
      {
        url: "/images/the-mission.jpg",
        width: 1200,
        height: 630,
        alt: "Gourd Shades Artisan",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
