/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'api.sall.technology'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.sall.technology',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api.sall.technology',
        pathname: '/**',
      }
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig;