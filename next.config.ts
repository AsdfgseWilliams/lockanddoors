import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.locksanddoors24h.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.locksanddoors24h.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  i18n: undefined,
};

export default nextConfig;