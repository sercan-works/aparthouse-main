import { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: [
      'https://aparthouse.com.tr/sitemap.xml',
      'https://aparthouse.com.tr/blog/sitemap.xml',
    ],
  };
} 