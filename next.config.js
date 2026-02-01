/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    // Vercel optimizes images automatically, but keeping unoptimized for compatibility
    unoptimized: true,
  },
};

module.exports = nextConfig;
