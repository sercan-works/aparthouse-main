/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',  // Google profile images
      'googleusercontent.com',  
      'google.com',    // Alternatif Google domain
      '127.0.0.1',     // Yerel API görüntüleri
      'localhost',     // Yerel API görüntüleri
      'service.aparthouse.com.tr',  // API servis domain
      'aparthouse.com.tr',    // Ana site domain
    ],
  },
  // Eski URL yapısından yeni URL yapısına yönlendirme
  async redirects() {
    return [
      {
        source: '/detail/:slug',
        destination: '/:slug',
        permanent: true, // 301 kalıcı yönlendirme
      },
    ];
  },
  // API proxy ayarları - CORS sorunundan kaçınmak için
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` 
          : 'http://127.0.0.1:8000/api/:path*', // API route
        // /api/auth yollarını hariç tut - robots.txt'yi etkilemez
        missing: [
          {
            type: 'header',
            key: 'user-agent',
            value: 'Googlebot.*',
          },
        ],
      },
      // NextAuth'un /api/auth yollarını Next.js'in işlemesine izin ver
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },

  // Headers ayarları - robots.txt için
  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 