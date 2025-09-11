import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@heroui/react';
import { IoClose } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import aparthouse_logo from '@/public/assets/apart.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// API Setting - Backend endpoint konfigürasyonu
const API_SETTINGS = {
  ENDPOINT: '/api/aparts/',
  LIMIT: 10
};

// API'den gelecek apartman tipi (gerçek response'a göre güncellenmiş)
interface ApiApartment {
  id: number;
  apart_name: string;
  slug: string;
  price: number;
  price_type: string;
  phone: string;
  address: string;
  category_name: string;
  town_name: string;
  city_name: string;
  images: string[] | { id: number; cover: boolean; image: string }[];
  image_thumbnail: string[];
  favorite: boolean;
  gender: string;
  accessibility: boolean;
  pet: string | null;
  services: {
    service_name: string;
    service_data: string[];
  }[];
  lat: number;
  lon: number;
  is_approved: boolean;
  distances: {
    id: number;
    university: {
      id: number;
      name: string;
      city: {
        id: number;
        name: string;
        country: string;
        towns: {
          id: number;
          name: string;
          city: number;
        }[];
      };
      country: string | null;
      address: string | null;
      lat: number;
      lon: number;
      image: string | null;
    };
    yurume: number;
    otobus: number;
    tramvay: number;
    yurume_text: string;
    yurume_value: number;
    yurume_time_text: string;
    yurume_time_value: number;
  }[];
}

// Mock data for apartments (API hazır olmadığında fallback)
const mockApartments: ApiApartment[] = [
  {
    id: 1,
    apart_name: 'Lüks Stüdyo Daire',
    slug: 'luks-studyo-daire',
    price: 15000,
    price_type: 'Aylık',
    phone: '05454467721',
    address: 'Beşiktaş, İstanbul',
    category_name: 'Erkek',
    town_name: 'BEŞIKTAŞ',
    city_name: 'İSTANBUL',
    images: ['/images/apartment1.jpg'],
    image_thumbnail: ['/images/apartment1.jpg'],
    favorite: false,
    gender: 'E',
    accessibility: false,
    pet: null,
    services: [],
    lat: 41.0082,
    lon: 28.9784,
    is_approved: true,
    distances: []
  },
  {
    id: 2,
    apart_name: 'Modern 1+1 Daire',
    slug: 'modern-1-1-daire',
    price: 18500,
    price_type: 'Aylık',
    phone: '05454467721',
    address: 'Şişli, İstanbul',
    category_name: 'Kadın',
    town_name: 'ŞİŞLİ',
    city_name: 'İSTANBUL',
    images: ['/images/apartment2.jpg'],
    image_thumbnail: ['/images/apartment2.jpg'],
    favorite: false,
    gender: 'K',
    accessibility: false,
    pet: null,
    services: [],
    lat: 41.0082,
    lon: 28.9784,
    is_approved: true,
    distances: []
  }
];

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender?: string;
  universities?: number[];
  currentApartId?: number; // Mevcut apartmanın ID'si
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ 
  isOpen, 
  onClose, 
  gender = 'E', 
  universities = [],
  currentApartId
}) => {
  const [apartments, setApartments] = useState<ApiApartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  // Image src'ini handle eden helper function
  const getImageSrc = (images: string[] | { id: number; cover: boolean; image: string }[]): string | null => {
    if (!images || images.length === 0) return null;
    
    const firstImage = images[0];
    if (typeof firstImage === 'string') {
      return firstImage;
    } else {
      return firstImage.image;
    }
  };

  // API'den apartman verilerini çek
  const fetchApartments = async () => {
    if (!isOpen) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
             // Query parametrelerini hazırla
       const params = new URLSearchParams();
       params.append('gender', gender);
       
       // Universities array'ini virgülle ayırarak ekle
       // distances içinden gelen üniversite ID'lerini kullan
       if (universities.length > 0) {
         params.append('universities', universities.join(','));
       }
      
      // İlk 10 apartı al
      params.append('page_size', API_SETTINGS.LIMIT.toString());
      
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${API_SETTINGS.ENDPOINT}?${params.toString()}`
      );
      
      if (response.data && response.data.results) {
        // Mevcut apartmanı filtrele
        const filteredApartments = response.data.results.filter(
          (apartment: ApiApartment) => apartment.id !== currentApartId
        );
        setApartments(filteredApartments);
      } else {
        // API'den veri gelmezse mock data kullan ve mevcut apartmanı filtrele
        const filteredMockData = mockApartments.filter(
          apartment => apartment.id !== currentApartId
        );
        setApartments(filteredMockData);
      }
    } catch (err) {
      console.error('Apartman verileri alınırken hata:', err);
      setError('Apartman verileri yüklenirken bir hata oluştu');
      // Hata durumunda mock data kullan ve mevcut apartmanı filtrele
      const filteredMockData = mockApartments.filter(
        apartment => apartment.id !== currentApartId
      );
      setApartments(filteredMockData);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal açıldığında API çağrısı yap
  useEffect(() => {
    if (isOpen) {
      fetchApartments();
    }
  }, [isOpen, gender, universities, currentApartId]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="full"
      placement="center"
      className="m-4 max-w-4xl max-h-[90vh]"
      closeButton={<ModalHeader>
        <div>
          <h3 className="text-xl font-semibold text-gray-800"></h3>
        </div>
      </ModalHeader>}
    
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center p-6 border-b">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Mesajınız İletildi</h3>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </Button>
        </ModalHeader>
        
        <ModalBody className="p-6">
          <div className="text-center mb-6">
            <div className="bg-green-100 p-4 rounded-lg mb-4">
              <p className="text-green-800 font-medium">
                ✓ Firma sizinle en kısa sürede irtibata geçecektir.
              </p>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Diğer apartları da incelemek ister misin?
            </h4>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Apartmanlar yükleniyor...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-4 mb-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {!isLoading && apartments.length > 0 && (
            <div className="apartments-swiper">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={15}
                slidesPerView={2}
                slidesPerGroup={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                  768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 2,
                  },
                }}
                className="pb-12"
              >
                {apartments.map((apartment) => (
                  <SwiperSlide key={apartment.id}>
                    <Link href={`/${apartment.slug}`} onClick={onClose}>
                      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer h-full">
                                                                          <div className="relative h-24 bg-gray-50">
                           {getImageSrc(apartment.images) ? (
                             <Image
                               src={getImageSrc(apartment.images)!}
                               alt={apartment.apart_name}
                               fill
                               className="object-cover z-10"
                               onError={() => {
                                 // Görsel yüklenemezse logo göster - CSS ile kontrol edilecek
                               }}
                             />
                           ) : (
                             /* Fallback logo - sadece görsel yoksa göster */
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                               <div className="flex flex-col items-center justify-center text-gray-400">
                                 <div className="w-12 h-12 rounded overflow-hidden mb-1">
                                   <Image
                                     src={aparthouse_logo}
                                     alt="ApartHouse Logo"
                                     width={48}
                                     height={48}
                                     className="object-cover opacity-80"
                                   />
                                 </div>
                                 <span className="text-xs">ApartHouse</span>
                               </div>
                             </div>
                           )}
                         </div>
                        <div className="p-2">
                          <h5 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                            {apartment.apart_name}
                          </h5>
                                                     {apartment.distances && apartment.distances.length > 0 ? (
                             <div className="text-xs text-gray-600 mb-1">
                               <span className="text-gray-600 font-medium line-clamp-2">
                                 {apartment.distances[0].university.name}
                               </span>
                               <div className="flex items-center gap-1 mt-1">
                                 <span className="text-green-600">🚶</span>
                                 <span>{apartment.distances[0].yurume_text || `${apartment.distances[0].yurume} dk`}</span>
                               </div>
                             </div>
                           ) : (
                             <p className="text-xs text-gray-500 mb-1">
                               {apartment.town_name}
                             </p>
                           )}
                                        
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {!isLoading && apartments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Henüz benzer apartman bulunamadı.</p>
            </div>
          )}

          <div className="text-center mt-6">
            <Button 
              onPress={onClose}
              className="bg-primary text-white px-8 py-2"
            >
              Kapat
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WhatsAppModal; 