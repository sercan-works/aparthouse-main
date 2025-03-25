"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import apart_image from "@/public/assets/apart.jpg";
import WhatsappIcon from "@/public/assets/icons/WhatsappIcon.svg";
import PhoneIcon from "@/public/assets/icons/PhoneIcon.svg";
import RestaurantIcon from "@/public/assets/icons/RestaurantIcon.svg";
import FavoriteIcon from "@/public/assets/icons/FavoritesIcon.svg";
import { MdCompareArrows } from "react-icons/md";
import { Button } from "@heroui/react";
import { ApiApart } from "@/store/apiSlice";
import Loading from "../ui/Loading";

// ApiApart tipini doğrudan kullanıyoruz
const Card = ({ apart }: { apart: ApiApart }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  console.log("Card Data", apart);

  // Metni belirli bir uzunlukta kısaltmak için helper fonksiyon
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''; // null/undefined kontrolü
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  // Eğer apart verisi henüz yüklenmediyse yükleme göstergesi göster
  if (!apart) {
    return (
      <div className="relative rounded-xl overflow-hidden w-[23rem] h-[22.5rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px] flex justify-center items-center bg-gray-100">
        <div className="text-gray-500"><Loading /></div>
      </div>
    );
  }

  // Güvenli erişim için özellikleri kontrol et
  const apartId = apart?.id;
  const apartSlug = apart?.slug;
  
  console.log("Apart ID:", apartId);
  console.log("Apart Slug:", apartSlug);
  console.log("Apart Images:", apart.images);
  


  return (
    <Link href={`/${apartSlug}`} className="block">
      <div className="relative rounded-xl overflow-hidden w-[23rem] h-[22.5rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px] cursor-pointer">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full custom-swiper"
        >
          
           { apart?.image_thumbnail?.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img || apart_image}
                  alt={`${apart.apart_name || 'Apart'} resim ${index + 1}`}
                  className="object-cover w-full h-full"
                  width={500}
                  height={500}
                  priority
                />
              </SwiperSlide>
            ))}
         
        </Swiper>

        {/* Icon buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button 
            className="rounded-full"
            onClick={(e) => {
              e.preventDefault(); // Link'in çalışmasını engelle
              // Favoriye ekleme işlemi
            }}
          >
            <Image
              src={FavoriteIcon}
              alt="Favoriye Ekle"
              className="w-8 h-8 md:w-6 md:h-6 brightness-0 invert"
            />
          </button>
          <button 
            className="rounded-full"
            onClick={(e) => {
              e.preventDefault(); // Link'in çalışmasını engelle
              // Karşılaştırma işlemi
            }}
          >
            <MdCompareArrows className="w-8 h-8 md:w-6 md:h-6 text-white"  />
          </button>
        </div>



        <div
          className={`absolute bottom-0 left-0 right-0 bg-white p-4 md:p-3 transition-all duration-300 cursor-pointer z-10
          ${isExpanded ? "h-2/6" : "h-4/6"}`}
          onClick={(e) => {
            e.preventDefault(); // Link'in çalışmasını engelle
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="text-gray-800">
            <div className="flex justify-center mb-1">
              <div className="w-8 h-[2px] bg-gray-600"></div>
            </div>
            {/* ÜST ÇEKMCE */}

            <div className="flex justify-between">
              <div className="w-2/3">
                <h3 className="flex items-center gap-4 font-bold text-lg md:text-medium overflow-hidden">
                  {apart.apart_name}
                  {apart.gender == "K" && 
                  <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-colorFirst"></span>
                  }
                  {apart.gender == "E" && 
                  <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-colorSecond"></span>
                  }
                  {apart.gender == "K+E" && 
                  <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-yellow-500"></span>
                  }
                </h3>
                {/* Distances - Maksimum ilk 2 üniversite mesafesini gösteriyoruz */}
                {apart.distances && apart.distances.slice(0, 2).map((distance) => (
                  <p className="mt-1 md:text-xs" key={distance.id}>
                    {truncateText(`${distance.university.name} `, 15)} {distance.yurume} dk
                  </p>
                ))}
              </div>
              <div className="w-1/3">
                <div className="flex flex-col items-end">
                  <div className="text-xl md:text-sm font-bold ">{apart.price} ₺*</div>
                  <div className="flex gap-2 mt-5">

                    {apart.phone && (
                      <Image
                        src={WhatsappIcon}
                        alt="WhatsappIcon"
                        className="w-5 h-5 md:w-4 md:h-4"
                      />
                    )}
                    {apart.phone && (
                      <Image src={PhoneIcon} alt="PhoneIcon" className="w-5 h-5 md:w-4 md:h-4" />
                    )}
                    {apart.food && (
                      <Image
                        src={RestaurantIcon}
                        alt="RestaurantIcon"
                        className="w-5 h-5 md:w-4 md:h-4"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* ALT ÇEKMCE */}
            <div className="flex flex-col justify-between mt-4">
              <h4 className="text-gray-800 font-semibold md:text-sm">
                Öne Çıkan Özellikler
              </h4>
              <p className="text-gray-400 opacity-70 text-lg md:text-sm overflow-hidden">
                {(() => {
                  // Önce services özelliğinin var olup olmadığını kontrol et
                  if (!apart.services || !Array.isArray(apart.services)) {
                    return "Hizmet bilgisi bulunmuyor";
                  }
                  
                  // Eğer hiç hizmet yoksa
                  if (apart.services.length === 0) {
                    return "Hizmet bilgisi bulunmuyor";
                  }
                  
                  // Tüm service_data dizilerini tek bir düz dizide birleştir
                  const allServices = apart.services.flatMap(serviceCategory => {
                    // Eğer service_data varsa ve bir dizi ise kullan, yoksa boş dizi döndür
                    return (serviceCategory.service_data && Array.isArray(serviceCategory.service_data)) 
                      ? serviceCategory.service_data 
                      : [];
                  });
                  
                  // Eğer hiç hizmet yoksa
                  if (allServices.length === 0) {
                    return "Hizmet bilgisi bulunmuyor";
                  }
                  
                  // Aralarına bullet (•) işaretleri ekleyerek birleştirme
                  return allServices.join(' \u2022 ');
                })()}
              </p>
              {!isExpanded && (
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-300 cursor-pointer bg-opacity-50 animate-fade-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Doğrudan link sayfasına gitmesine izin ver
                  }}
                >
                  <Button className="border-colorFirst border-2 mx-auto text-colorFirst flex justify-center items-center bg-opacity-0">
                    <p className="font-bold ">Daha Fazlası &#62;</p>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
