"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
import { MdCompareArrows } from "react-icons/md";
import { Button } from "@heroui/react";
import { ApiApart } from "@/store/api/apartsApi";
import Loading from "../ui/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { toggleCompare } from "@/store/features/CompareSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

// ApiApart tipini doğrudan kullanıyoruz
const Card = ({ apart }: { apart: ApiApart }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();
  const { favoriteApartIds } = useSelector(
    (state: RootState) => state.favorite
  );
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  const [localIsFavorite, setLocalIsFavorite] = useState(false);
  const [localIsCompare, setLocalIsCompare] = useState(false);
  const router = useRouter();
  // Redux state'inden favori durumunu güncelle
  useEffect(() => {
    if (apart && apart.id) {
      setLocalIsFavorite(favoriteApartIds.includes(apart.id));
    }
  }, [apart, favoriteApartIds]);

  // Redux state'inden karşılaştırma durumunu güncelle
  useEffect(() => {
    if (apart && apart.id) {
      setLocalIsCompare(compareApartIds.includes(apart.id));
    }
  }, [apart, compareApartIds]);

  // Favorilere ekleme/çıkarma işlemi
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link'in çalışmasını engelle

    if (!apart) return;

    // UI'da anında geri bildirim için önce yerel durumu güncelle
    setLocalIsFavorite(!localIsFavorite);

    // Redux store'da favori durumunu güncelle
    dispatch(toggleFavorite(apart.id));

    // Not: API entegrasyonu devre dışı bırakıldı - Sadece localStorage kullanılıyor
    // Kullanıcı giriş yapmış olsa bile API'ye istek göndermiyoruz
  };

  // Karşılaştırmaya ekleme/çıkarma işlemi
  const handleToggleCompare = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link'in çalışmasını engelle

    if (!apart) return;

    // Eğer zaten karşılaştırma listesindeyse, çıkarma işlemini yap
    if (localIsCompare) {
      setLocalIsCompare(false);
      dispatch(toggleCompare(apart.id));
      return;
    }

    // Eğer karşılaştırma listesinde değilse ve liste doluysa (3 öğe), kullanıcıya bildir
    if (compareApartIds.length >= 3) {
      alert(
        "Karşılaştırma listesine en fazla 3 apart eklenebilir. Lütfen önce listeden bir apart çıkarınız."
      );
      return;
    }

    // Karşılaştırma listesine ekle
    setLocalIsCompare(true);
    dispatch(toggleCompare(apart.id));
  };

  // Metni belirli bir uzunlukta kısaltmak için helper fonksiyon
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""; // null/undefined kontrolü
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Eğer apart verisi henüz yüklenmediyse yükleme göstergesi göster
  if (!apart) {
    return (
      <div className="relative rounded-xl overflow-hidden w-[23rem] h-[22.5rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px] flex justify-center items-center bg-gray-100">
        <div className="text-gray-500">
          <Loading />
        </div>
      </div>
    );
  }

  // Güvenli erişim için özellikleri kontrol et
  // const apartId = apart?.id;
  const apartSlug = apart?.slug;

  // console.log("Apart ID:", apartId);
  // console.log("Apart Slug:", apartSlug);
  // console.log("Apart Images:", apart.images);

  return (
    <Link href={`/${apartSlug}`} className="block">
      <div className="relative rounded-xl overflow-hidden w-[21rem] h-[21rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px] cursor-pointer">
      <div className="aspect-square w-full relative">
     <Swiper
       modules={[Navigation]}
       navigation
       loop={true}
       className="h-full w-full custom-swiper"
       slidesPerView={1}
       spaceBetween={1}
     >
       {apart?.image_thumbnail?.map((img: string, index: number) => (
         <SwiperSlide 
           key={index}
           className="aspect-square w-full relative" // Önemli: aspect-square ve relative
         >
           <Image
             src={img || apart_image}
             alt={`${apart.apart_name || "Apart"} resim ${index + 1}`}
             fill // layout="fill" yerine sadece fill kullanın (Next.js 13+)
             style={{objectFit: "cover"}} // objectFit yerine style içinde
             priority
           />
         </SwiperSlide>
       ))} 
     </Swiper>
   </div>

        {/* Icon buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button className="rounded-full" onClick={handleToggleFavorite}>
            {localIsFavorite ? (
              <BsHeartFill className={`w-8 h-8 md:w-6 md:h-6 text-rose-400`} />
            ) : (
              <BsHeart className={`w-7 h-7 md:w-6 md:h-6 text-white`} />
            )}
          </button>
          <button className="rounded-full" onClick={handleToggleCompare}>
            <MdCompareArrows
              className={`w-8 h-8 md:w-6 md:h-6 ${
                localIsCompare ? "text-blue-400" : "text-white"
              }`}
            />
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
                  {apart.gender == "K" && (
                    <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-colorFirst"></span>
                  )}
                  {apart.gender == "E" && (
                    <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-colorSecond"></span>
                  )}
                  {apart.gender == "K+E" && (
                    <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-yellow-500"></span>
                  )}
                </h3>
                {/* Distances - Maksimum ilk 2 üniversite mesafesini gösteriyoruz */}
                {apart.distances &&
                  apart.distances.slice(0, 2).map((distance) => (
                    <React.Fragment key={distance.id}>
                    <p className="mt-1 md:text-xs">
                      {truncateText(`${distance.university.name} `, 15)}{" "}
                      {distance.yurume} dk
                    </p>
                    {/* placeholder */}
                    {apart.distances && apart.distances.length < 2 &&  <div className="h-6 w-6 bg-white rounded-full opacity-0">placeholder</div>}
                    </React.Fragment>
                  ))}
              </div>
              <div className="w-1/3">
                <div className="flex flex-col items-end">
                  <div className="text-xl md:text-sm font-bold ">
                    {apart.price} ₺*
                  </div>
                  <div className="flex gap-2 mt-5">
                    {apart.phone && (
                      <Image
                        src={WhatsappIcon}
                        alt="WhatsappIcon"
                        className="w-5 h-5 md:w-4 md:h-4"
                      />
                    )}
                    {apart.phone && (
                      <Image
                        src={PhoneIcon}
                        alt="PhoneIcon"
                        className="w-5 h-5 md:w-4 md:h-4"
                      />
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
                  const allServices = apart.services.flatMap(
                    (serviceCategory) => {
                      // Eğer service_data varsa ve bir dizi ise kullan, yoksa boş dizi döndür
                      return serviceCategory.service_data &&
                        Array.isArray(serviceCategory.service_data)
                        ? serviceCategory.service_data
                        : [];
                    }
                  );

                  // Eğer hiç hizmet yoksa
                  if (allServices.length === 0) {
                    return "Hizmet bilgisi bulunmuyor";
                  }

                  // Aralarına bullet (•) işaretleri ekleyerek birleştirme
                  return allServices.join(" \u2022 ");
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
                  <Button 
                  onPress={() => {
                    router.push(`/${apartSlug}`);
                  }}
                  className="border-colorFirst border-2 mx-auto text-colorFirst flex justify-center items-center bg-opacity-0">
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
