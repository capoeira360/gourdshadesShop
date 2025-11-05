import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: "export",
  // Ensure Next Image works in static export by disabling optimization
  images: {
    unoptimized: true,
  },
  // Improve compatibility with static hosts that expect folder/index.html
  trailingSlash: true,
};

export default nextConfig;
