import React from 'react';
import { createMetadata } from '@/app/utils/metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DesktopDetail from './DesktopDetail';
import MobileDetail from './MobileDetail';
import { ApiApart } from '@/store/api/apartsApi';

// API'den veri çeken fonksiyon - generateMetadata ve sayfada kullanılacak
async function getApartData(slug: string): Promise<ApiApart | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiUrl}/api/aparts/${slug}`, { 
      next: { revalidate: 3600 }, // 1 saat cache
      signal: AbortSignal.timeout(10000) // 10 saniye timeout
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching apart data:', error);
    return null;
  }
}

// Dinamik metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  // API'den apart verilerini alıyoruz
  const apartment = await getApartData(slug);
  
  if (!apartment) {
    return createMetadata({
      title: 'Apart Bulunamadı',
      description: 'Aradığınız apart bulunamadı',
      path: `/${slug}`,
    });
  }
  
  return createMetadata({
    title: apartment.name,
    description: `${apartment?.name} - ${apartment?.town?.city_name} ${apartment?.town?.name} - ${apartment?.category?.name} öğrenci apartı`,
    path: `/${slug}`,
    type: 'article',
    // Varsayılan görsel kullanıyoruz, gerçek projede apart görselini kullanabilirsiniz
    image: apartment.images[0]?.image || '/assets/apart.jpg',
  });
}

// Dinamik sayfaları statik olarak oluşturmak için sitemap API'den alınabilir
export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://127.0.0.1:8000';
    
    // Tüm apartları almak için çok büyük bir page_size kullan
    const response = await fetch(`${apiUrl}/api/aparts?page_size=1000`, {
      next: { revalidate: 3600 }, // 1 saat cache
      signal: AbortSignal.timeout(10000) // 10 saniye timeout
    });
    
    if (!response.ok) {
      console.warn('API response not ok, returning empty array');
      return [];
    }
    
    const paginatedData = await response.json();
    
    // Pagination yapısından results array'ini al
    const apartments: ApiApart[] = paginatedData?.results || [];
    
    // Array kontrolü
    if (!Array.isArray(apartments)) {
      console.warn('API response results is not an array, returning empty array');
      return [];
    }
    
    // Slug field'ları olan apartları filtrele ve map et
    const staticParams = apartments
      .filter(apartment => apartment?.slug) // Slug olmayan apartları filtrele
      .map(apartment => ({
        slug: apartment.slug,
      }));
    
    console.log(`Generated ${staticParams.length} static params for build`);
    return staticParams;
  } catch (error) {
    console.error('Error fetching aparts list for static params:', error);
    return [];
  }
}

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  
  // API'den apart verilerini alıyoruz
  const apartment = await getApartData(slug);
  
  // Eğer apartment bulunamazsa 404 göster
  if (!apartment) {
    notFound();
  }

  return (
    <>
      <div className="block md:hidden">
        <MobileDetail apartSlug={apartment.slug.toString()} />
      </div>
      <div className="hidden md:block">
        <DesktopDetail apartSlug={apartment.slug.toString()} />
      </div>
    </>
  );
};

export default DetailPage; 