/** @type {import('next').NextConfig} */
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
  }
}

module.exports = nextConfig;