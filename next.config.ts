import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Vercel optimizes images automatically, but keeping unoptimized for compatibility
    unoptimized: true,
  },
};

export default nextConfig;

