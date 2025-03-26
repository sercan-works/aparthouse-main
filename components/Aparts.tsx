"use client";
import React from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";
import { useGetApartsQuery } from "@/store/api/apartsApi"; 
import CardPlaceholder from "./ui/CardPlaceholder";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Aparts = () => {
  // Redux store'dan seçilen filtreleri al
  const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
  const selectedCity = useSelector((state: RootState) => state.filter.selectedCity);
  const selectedUniversity = useSelector((state: RootState) => state.filter.selectedUniversity);
  
  // Parametreler için boş bir nesne oluştur
  const queryParams: Record<string, string> = {};
  
  // Seçili değerler varsa parametrelere ekle
  if (selectedCategory) queryParams.category = selectedCategory.toString();
  if (selectedCity) queryParams.city = selectedCity.toString();
  if (selectedUniversity) queryParams.university = selectedUniversity.toString();
  
  // Tüm seçili filtreleri kullanarak API'yi çağır
  const { data: apiAparts, error, isLoading } = useGetApartsQuery(queryParams);
  
  // Hata detaylarını konsola yazdır
  React.useEffect(() => {
    if (error) {
      console.error("API Error Details:", error);
    }
  }, [error]);

  // Mock data - API çalışmazsa geçici olarak kullanmak için
  const mockData = [
    {
      id: 1,
      name: "Demo Apart 1",
      apart_name: "Demo Apart 1",
      phone: "5551234567",
      gender: "K",
      price: 1500,
      price_type: "Aylık",
      info: "Demo bilgi",
      address: "Demo adres 1",
      lat: 39.123,
      lon: 32.456,
      slug: "demo-apart-1",
      food: true,
      created_at: new Date().toISOString(),
      is_approved: true,
      images: [
        {
          id: 1,
          image: "/assets/apart.jpg",
          cover: true
        }
      ],
      category: {
        id: 1,
        name: "Kız",
        icon: "",
        sexualty: "K"
      },
      town: {
        id: 1,
        name: "Merkez",
        city_name: "Eskişehir"
      },
      services: [
        {
          service_name: "Hizmetler",
          service_data: ["WiFi", "Elektrik"]
        }
      ],
      bills: [{ id: 1, name: "250" }],
      firma: {
        id: 1,
        name: "Demo Firma",
        phone: "5551234567",
        mail: "info@demo.com",
        image: null
      },
      universitys: [
        {
          id: 1,
          name: "Demo Üniversitesi",
          address: "Demo adres",
          city_name: "Eskişehir",
          image: null
        }
      ],
      cover_image: "/assets/apart.jpg"
    },
    {
      id: 2,
      name: "Demo Apart 2",
      apart_name: "Demo Apart 2",
      phone: "5557654321",
      gender: "E",
      price: 2000,
      price_type: "Aylık",
      info: "Demo bilgi 2",
      address: "Demo adres 2",
      lat: 39.456,
      lon: 32.789,
      slug: "demo-apart-2",
      food: false,
      created_at: new Date().toISOString(),
      is_approved: true,
      images: [
        {
          id: 2,
          image: "/assets/apart.jpg",
          cover: true
        }
      ],
      category: {
        id: 2,
        name: "Erkek",
        icon: "",
        sexualty: "E"
      },
      town: {
        id: 1,
        name: "Merkez",
        city_name: "Eskişehir"
      },
      services: [
        {
          service_name: "Hizmetler",
          service_data: ["Çamaşır Makinesi"]
        }
      ],
      bills: [{ id: 2, name: "300" }],
      firma: {
        id: 2,
        name: "Demo Firma 2",
        phone: "5557654321",
        mail: "info@demo2.com",
        image: null
      },
      universitys: [
        {
          id: 2,
          name: "Demo Üniversitesi 2",
          address: "Demo adres 2",
          city_name: "Eskişehir",
          image: null
        }
      ],
      cover_image: "/assets/apart.jpg"
    }
  ];
  
  // Yükleme durumunu kontrol et
  if (isLoading) {
    return (
      <div className="flex container flex-wrap gap-4 justify-center items-center py-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardPlaceholder key={index} />
          ))}
      </div>
    );
  }

  // API'den gelen veriyi kullan, hata varsa mock data'yı göster
  const apartments = error ? mockData : (apiAparts || []);
  
  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-5">
          <p className="font-bold">API Bağlantı Hatası</p>
          <p>API bağlantısı sırasında bir hata oluştu. Demo veriler gösteriliyor.</p>
          <p className="text-xs mt-1">Geliştirici için: Konsola bakın veya API endpoint&apos;i kontrol edin.</p>
        </div>
      )}
      
      {/* Aktif filtreleri göster */}
      {(selectedCategory || selectedCity || selectedUniversity) && (
        <div className="fixed bottom-10 right-10 bg-colorFirst p-4 mb-5 rounded-lg z-50 shadow-lg bg-opacity-50">
          <p className="font-semibold">Aktif Filtreler:</p>
          <div className="flex flex-col gap-2 mt-2">
            {selectedCategory && <span className="px-3 py-1 bg-white rounded-full text-sm text-center">Kategori</span>}
            {selectedCity && <span className="px-3 py-1 bg-white rounded-full text-sm text-center">Şehir</span>}
            {selectedUniversity && <span className="px-3 py-1 bg-white rounded-full text-sm text-center">Üniversite</span>}
            {/* {selectedCategory && <span className="px-3 py-1 bg-white rounded-full text-sm">Kategori: {selectedCategory}</span>}
            {selectedCity && <span className="px-3 py-1 bg-white rounded-full text-sm">Şehir: {selectedCity}</span>}
            {selectedUniversity && <span className="px-3 py-1 bg-white rounded-full text-sm">Üniversite: {selectedUniversity}</span>} */}
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {apartments && apartments.length > 0 ? (
          apartments.map((apart) => (
            <Card 
              key={apart.id}
              apart={apart}
            />
          ))
        ) : (
          // Veri yoksa
          <div className="text-center py-8">Hiç apart bulunamadı.</div>
        )}
      </div>
      
      {apartments && apartments.length > 0 && (
        <>
          <Button className="hidden md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
            <p className="font-bold">Daha Fazlasını Gör</p>
          </Button>

          {/* SAYFA SONUNA ULAŞTINIZ */}
          <div className="flex md:hidden justify-center items-center">
            <Button className="border-colorFirst border-2 mt-4 mb-20 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
              <p className="font-bold">Sayfa sonuna ulaştınız...</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Aparts;
