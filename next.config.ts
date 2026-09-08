import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Vercel optimizes images automatically, but keeping unoptimized for compatibility
    unoptimized: true,
  },
  // TEMPORARY: allow dev server access from this network's IP; revert when done
  allowedDevOrigins: ['10.175.12.212'],
};

export default nextConfig;
