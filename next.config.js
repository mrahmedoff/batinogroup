/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 14
  // output: 'export', // API routes üçün deaktiv edildi
  trailingSlash: false,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;