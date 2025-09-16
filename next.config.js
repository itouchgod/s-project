/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
