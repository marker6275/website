/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed "output: export" for Vercel deployment (enables API routes)
  // For static export (GitHub Pages), uncomment: output: "export"
  trailingSlash: true,
  images: {
    // Vercel optimizes images automatically, but keeping unoptimized for compatibility
    unoptimized: true,
  },
};

module.exports = nextConfig;
