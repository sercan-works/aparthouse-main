"use client";
import React from 'react';
import { Button } from '@heroui/react';
import Link from 'next/link';
import HighlightsMobile from '@/components/HighlightsMobile';
import Highlights from '@/components/Highlights';

const NotFound = () => {

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
      <div className="pb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-colorFirst mb-4">
            Önerilen Apartlar
          </h3>
          <p className="text-gray-600">
            Belki bu apartlardan biri aradığınızı karşılayabilir
          </p>
        </div>
        
        {/* Desktop - Highlights Component */}
        <div className="hidden md:block">
          <Highlights />
        </div>

        {/* Mobile - HighlightsMobile Component */}
        <div className="block md:hidden">
          <HighlightsMobile />
        </div>
        
        {/* Tümünü Gör Butonu */}
        <div className="flex justify-center mt-8">
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