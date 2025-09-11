"use client";
import React from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { useGetHiglightApartsQuery } from '@/store/api/apartsApi';
import Card from '@/components/card/Card';
import CardPlaceholder from '@/components/ui/CardPlaceholder';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const NotFound = () => {
  const { data: highlightAparts, isLoading } = useGetHiglightApartsQuery({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 404 Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Görseli */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-colorFirst opacity-20">404</h1>
          </div>
          
          {/* Başlık ve Açıklama */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Aşağıdaki önerilerden birini deneyebilir veya ana sayfaya geri dönebilirsiniz.
          </p>
          
          {/* Ana Sayfa Butonu */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              as={Link}
              href="/"
              className="bg-colorFirst text-white px-8 py-3 text-lg font-medium"
              size="lg"
            >
              Ana Sayfaya Dön
            </Button>
            <Button 
              as={Link}
              href="/filter"
              variant="bordered"
              className="border-colorFirst text-colorFirst px-8 py-3 text-lg font-medium"
              size="lg"
            >
              Apart Ara
            </Button>
          </div>
        </div>
      </div>

      {/* Önerilen Apartlar Bölümü */}
      {highlightAparts && highlightAparts.length > 0 && (
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-colorFirst mb-4">
              Önerilen Apartlar
            </h3>
            <p className="text-gray-600">
              Belki bu apartlardan biri aradığınızı karşılayabilir
            </p>
          </div>
          
          {/* Desktop - Swiper */}
          <div className="hidden md:block relative px-10">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              navigation={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="mySwiper custom-swiper"
            >
              {highlightAparts.map((apart) => (
                <SwiperSlide key={apart.id} className="">
                  <Card apart={apart} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile - Grid */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {highlightAparts.slice(0, 6).map((apart) => (
                <Card key={apart.id} apart={apart} />
              ))}
            </div>
            
            {highlightAparts.length > 6 && (
              <div className="text-center mt-6">
                <Button 
                  as={Link}
                  href="/filter"
                  className="bg-colorFirst text-white px-6 py-2"
                >
                  Tümünü Gör
                </Button>
              </div>
            )}
          </div>
          
          {/* Desktop - Tümünü Gör Butonu */}
          <div className="hidden md:flex justify-center mt-8">
            <Button 
              as={Link}
              href="/filter"
              variant="bordered"
              className="border-colorFirst text-colorFirst px-8 py-3 font-medium"
            >
              Tüm Apartları Görüntüle
            </Button>
          </div>
        </div>
      )}

      {/* Yükleme Durumu */}
      {isLoading && (
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-colorFirst mb-4">
              Önerilen Apartlar
            </h3>
            <p className="text-gray-600">
              Belki bu apartlardan biri aradığınızı karşılayabilir
            </p>
          </div>
          
          {/* Yükleme Placeholder'ları */}
          <div className="hidden md:flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardPlaceholder key={index} />
            ))}
          </div>
          
          <div className="block md:hidden grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardPlaceholder key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Yardımcı Linkler */}
      <div className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Aradığınızı bulamadınız mı?
          </h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-colorFirst hover:underline">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-colorFirst hover:underline">
              İletişim
            </Link>
            <Link href="/help" className="text-colorFirst hover:underline">
              Yardım
            </Link>
            <Link href="/favorites" className="text-colorFirst hover:underline">
              Favorilerim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
