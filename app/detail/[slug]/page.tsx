import React from 'react';
import DesktopDetail from '../../[slug]/DesktopDetail';
import MobileDetail from '../../[slug]/MobileDetail';
import { createMetadata } from '@/app/utils/metadata';
import { Metadata } from 'next';

// Örnek veri (gerçek implementasyonda veritabanından çekilecek)
const apartments = [
  { id: '1', slug: 'merkezi-konumda-3-1-daire', title: 'Merkezi Konumda 3+1 Daire', description: 'Üniversite yakınında öğrenciler için ideal 3+1 daire' },
  { id: '2', slug: 'deniz-manzarali-2-1-daire', title: 'Deniz Manzaralı 2+1 Daire', description: 'Harika deniz manzaralı, full eşyalı 2+1 daire' },
  { id: '3', slug: 'luks-1-1-studioflat', title: 'Lüks 1+1 StudioFlat', description: 'Modern tasarımlı full eşyalı 1+1 stüdyo daire' },
];

// Dinamik metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  // Veritabanından veri çekme simülasyonu (gerçek uygulamada API/DB sorgusu olacak)
  const apartment = apartments.find(apt => apt.slug === slug);
  
  if (!apartment) {
    return createMetadata({
      title: 'Daire Bulunamadı',
      description: 'Aradığınız daire bulunamadı',
      path: `/detail/${slug}`,
    });
  }
  
  return createMetadata({
    title: apartment.title,
    description: apartment.description,
    path: `/detail/${slug}`,
    type: 'article',
    // Gerçek uygulamada burada apartment görselini kullanabilirsiniz
    image: `/images/apartments/${apartment.id}.jpg`,
  });
}

// Dinamik bütün sayfaları önceden oluşturması için statik yolları belirtiyoruz
export async function generateStaticParams() {
  // Gerçek uygulamada bu veriler API/DB'den gelecek
  return apartments.map(apartment => ({
    slug: apartment.slug,
  }));
}

const DetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  
  // Gerçek uygulamada burada slug'a göre apartment verisi API/DB'den çekilecek
  // Örnek veriyi kullanıyoruz
  const apartment = apartments.find(apt => apt.slug === slug);
  
  // Eğer apartment bulunamazsa 404 göster
  if (!apartment) {
    // NOT_FOUND sayfasına yönlendir veya 404 içeriği göster
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Daire Bulunamadı</h1>
        <p className="mt-4">Aradığınız daire bulunamadı veya kaldırılmış olabilir.</p>
      </div>
    );
  }

  return (
    <>
      <div className="block md:hidden">
        <MobileDetail apartmentId={apartment.id} />
      </div>
      <div className="hidden md:block">
        <DesktopDetail apartmentId={apartment.id} />
      </div>
    </>
  );
};

export default DetailPage; 