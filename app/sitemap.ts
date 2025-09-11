import { MetadataRoute } from 'next';
import { unstable_noStore } from 'next/cache';
import { ApiApart } from '@/store/api/apartsApi';

// Gerçek dinamik veri için API isteği yapabilirsiniz
async function getApartments() {
  unstable_noStore(); // Önbelleğe almayı engeller, her istekte yeni veri çeker
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiUrl}/api/aparts/?page_size=1000`, {
      next: { revalidate: 3600 }, // 1 saat cache
      signal: AbortSignal.timeout(10000) // 10 saniye timeout
    });
    
    if (!response.ok) {
      console.warn('API response not ok, returning empty array for sitemap');
      return [];
    }
    
    const paginatedData = await response.json();
    
    // Pagination yapısından results array'ini al
    const apartments = paginatedData?.results || [];
    
    // Array kontrolü
    if (!Array.isArray(apartments)) {
      console.warn('API response results is not an array, returning empty array for sitemap');
      return [];
    }
    
    return apartments;
  } catch (error) {
    console.error('Error fetching apartments for sitemap:', error);
    return [];
  }
}

// Sabit sayfalar ve dinamik içerik sayfaları
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sabit sayfalar
  const staticPages = [
    {
      url: 'https://aparthouse.com.tr',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: 'https://aparthouse.com.tr/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
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
      priority: 0.1,
    },
    {
      url: 'https://aparthouse.com.tr/register',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Blog sayfaları
    {
      url: 'https://aparthouse.com.tr/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dinamik içerik sayfaları (apartments) - artık dinamik olarak getiriyoruz
  const apartments = await getApartments();
  
  const apartmentPages = apartments
    .filter((apartment: ApiApart) => apartment?.slug) // Slug olmayan apartları filtrele
    .map((apartment: ApiApart) => ({
      url: `https://aparthouse.com.tr/${apartment.slug}`,
      lastModified: new Date(apartment.created_at || new Date()),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...apartmentPages];
} 