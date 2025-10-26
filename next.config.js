/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  images: {
    // Unoptimized for static export - Cloudflare Pages CDN handles optimization
    unoptimized: true,
    // Cloudflare will automatically serve WebP/AVIF when browser supports it
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components'],
  },
  
  // Headers for better caching and security (Cloudflare Pages handles this)
  // Note: Headers are configured in Cloudflare Pages dashboard
  
  // Redirects for SEO (handled by Cloudflare Pages redirects)
  // Note: Configure redirects in Cloudflare Pages dashboard
};

module.exports = nextConfig;
