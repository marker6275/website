/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: "",
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
