/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'backend.sall.technology'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.sall.technology',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'backend.sall.technology',
        pathname: '/**',
      }
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig;
