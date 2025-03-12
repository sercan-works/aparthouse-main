import { MetadataRoute } from 'next';
import { mockAparts } from '@/data/apart';

// Sabit sayfalar ve dinamik içerik sayfaları
export default function sitemap(): MetadataRoute.Sitemap {
  // Sabit sayfalar
  const staticPages = [
    {
      url: 'https://aparthouse.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://aparthouse.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://aparthouse.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://aparthouse.com/login',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://aparthouse.com/register',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dinamik içerik sayfaları (apartments) - mockAparts verisini kullanıyoruz
  const apartmentPages = mockAparts.map((apartment) => ({
    url: `https://aparthouse.com/${apartment.slug}`,
    lastModified: new Date(), // Gerçek uygulamada burada son güncelleme tarihini kullanabilirsiniz
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...apartmentPages];
} 