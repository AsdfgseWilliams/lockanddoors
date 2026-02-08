import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.locksanddoors24h.com', // 👈 Cambia esto por tu dominio
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // Si usas otro dominio o CDN, añádelo aquí:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.tudominio.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
    // Alternativa para dominios antiguos (menos segura):
    // domains: ['tu-wordpress.com'],
  },
};

export default nextConfig;