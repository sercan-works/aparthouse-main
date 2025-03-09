/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',  // Google profile images
      'googleusercontent.com',  
      'google.com',    // Alternatif Google domain
    ],
  },
};

module.exports = nextConfig; 