import { MetadataRoute } from 'next';
import { unstable_noStore } from 'next/cache';

// Gerçek dinamik veri için API isteği yapabilirsiniz
// Bu örnek için mevcut mockAparts verisini kullanıyoruz,
// ama gerçek uygulamada API'den veri çekebilirsiniz
async function getApartments() {
  unstable_noStore(); // Önbelleğe almayı engeller, her istekte yeni veri çeker
  
    // Gerçek API kullanımı için bu kısmı aktif edebilirsiniz
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/aparts/`);
  const apartments = await response.json();
  return apartments;
  
}

// Sabit sayfalar ve dinamik içerik sayfaları
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sabit sayfalar
  const staticPages = [
    {
      url: 'https://aparthouse.com.tr',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://aparthouse.com.tr/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://aparthouse.com.tr/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://aparthouse.com.tr/login',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://aparthouse.com.tr/register',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dinamik içerik sayfaları (apartments) - artık dinamik olarak getiriyoruz
  const apartments = await getApartments();
  
  const apartmentPages = apartments.map((apartment: { slug: string }) => ({
    url: `https://aparthouse.com.tr/${apartment.slug}`,
    lastModified: new Date(), // Gerçek uygulamada burada son güncelleme tarihini kullanabilirsiniz
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...apartmentPages];
} 