/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better error handling
  experimental: {
    // Improve error handling during build
    forceSwcTransforms: true,
  },
  
  // Better handling of build errors
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Configure image domains for Strapi
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.sall.technology',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.sall.technology',
        port: '',
        pathname: '/uploads/**',
      }
    ],
    // Add fallback for missing images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://backend.sall.technology',
  },
  
  // Better error handling for static generation
  staticPageGenerationTimeout: 60, // 60 seconds timeout
  
  // Configure output for better deployment
  output: 'standalone',
  
  // Add custom webpack config for better error handling
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Better error handling in production
    if (!dev && isServer) {
      config.optimization.minimize = false;
    }
    
    // Handle potential module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    return config;
  },
  
  // Custom page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Better handling of redirects and rewrites
  async redirects() {
    return [
      // Add any redirects you need
    ];
  },
  
  // Add headers for better caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // Enable compression
  compress: true,
  
  // Configure trailing slash behavior
  trailingSlash: false,
  
  // Configure build output
  generateBuildId: async () => {
    // Return a build ID based on timestamp to ensure uniqueness
    return `build-${Date.now()}`;
  },
  
  // Add error boundary for better error handling
  onError: (err, errorInfo) => {
    console.error('Next.js error:', err);
    console.error('Error info:', errorInfo);
  },
};

module.exports = nextConfig;