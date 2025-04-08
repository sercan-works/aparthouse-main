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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/aparts/${slug}`, { 
      next: { revalidate: 3600 } // 1 saat cache
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/aparts`, {
      next: { revalidate: 3600 } // 1 saat cache
    });
    
    if (!response.ok) {
      return [];
    }
    
    const apartments: ApiApart[] = await response.json();
    return apartments.map(apartment => ({
      slug: apartment.slug,
    }));
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