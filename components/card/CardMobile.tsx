"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import apart_image from "@/public/assets/apart.jpg";
// import { Chip } from "@heroui/react";
import { ApiApart } from "@/store/api/apartsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
// import { toggleCompare } from "@/store/features/CompareSlice";
import { addViewed } from "@/store/features/ViewedSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
// import { MdCompareArrows } from "react-icons/md";
// import { useLanguage } from "@/i18n/context";
// import PhoneIcon from "@/public/assets/icons/PhoneIcon.svg";
import { FaEye, FaWhatsapp } from "react-icons/fa6";
import { Chip } from "@heroui/react";
import { FaWalking } from "react-icons/fa";
import { openWhatsAppLink } from "@/app/utils/contacts";
import axios from "axios";
// import { FaInfoCircle } from "react-icons/fa";

const CardMobile = ({ apart }: { apart: ApiApart }) => {
  // const { t } = useLanguage();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | typeof apart_image>(
    apart_image
  );

  const { favoriteApartIds } = useSelector(
    (state: RootState) => state.favorite
  );
  // const { compareApartIds } = useSelector((state: RootState) => state.compare);
  const { viewedApartIds } = useSelector((state: RootState) => state.viewed);

  const [localIsFavorite, setLocalIsFavorite] = useState(false);
  // const [localIsCompare, setLocalIsCompare] = useState(false);
  const [localIsViewed, setLocalIsViewed] = useState(false);

  useEffect(() => {
    // Önce thumbnail'i kontrol et, yoksa normal resmi kullan
    if (apart.image_thumbnail && apart.image_thumbnail.length > 0) {
      setImageUrl(apart.image_thumbnail[0]);
    } else if (apart.images && apart.images.length > 0) {
      setImageUrl(apart.images[0].image);
    }
  }, [apart.image_thumbnail, apart.images]);

  // Redux state'lerinden durumları güncelle
  useEffect(() => {
    if (apart && apart.id) {
      setLocalIsFavorite(favoriteApartIds.includes(apart.id));
      // setLocalIsCompare(compareApartIds.includes(apart.id));
      setLocalIsViewed(viewedApartIds.includes(apart.id));
    }
  }, [apart, favoriteApartIds, viewedApartIds]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalIsFavorite(!localIsFavorite);
    dispatch(toggleFavorite(apart.id));
  };

  // const handleToggleCompare = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (!apart) return;

  //   // Eğer zaten karşılaştırma listesindeyse, çıkarma işlemini yap
  //   if (localIsCompare) {
  //     setLocalIsCompare(false);
  //     dispatch(toggleCompare(apart.id));
  //     return;
  //   }

  //   // Eğer karşılaştırma listesinde değilse ve liste doluysa (3 öğe), kullanıcıya bildir
  //   if (compareApartIds.length >= 3) {
  //     alert(
  //       "Karşılaştırma listesine en fazla 3 apart eklenebilir. Lütfen önce listeden bir apart çıkarınız."
  //     );
  //     return;
  //   }

  //   // Karşılaştırma listesine ekle
  //   setLocalIsCompare(true);
  //   dispatch(toggleCompare(apart.id));
  // };

  const handleApartViewed = () => {
    if (apart && apart.id) {
      dispatch(addViewed(apart.id));
    }

    // Scroll pozisyonunu kaydet
    if (typeof window !== "undefined") {
      const position = {
        x: window.scrollX,
        y: window.scrollY
      };
      sessionStorage.setItem("scroll_homepage", JSON.stringify(position));
    }
  };

  const handleWhatsappClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // API çağrısı - WhatsApp tıklamasını kaydet
    if (apart.id) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-wp-clicks/`,
        {
          apart: apart.id
        }
      );
    }

    // WhatsApp linkini aç
    const apartUrl = apart.slug
      ? `https://www.aparthouse.com.tr/${apart.slug}`
      : undefined;
    openWhatsAppLink(
      apart.phone || "",
      String(apart.apart_name || ""),
      apartUrl
    );
  };

  // Metni belirli bir uzunlukta kısaltmak için helper fonksiyon
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Taşımalı servis hizmeti kontrolü
  const hasTransportationService = () => {
    if (!apart.services || !Array.isArray(apart.services)) return false;

    return apart.services.some(
      (service) =>
        service.service_name === "Taşımalı Servis Hizmeti" &&
        service.service_data &&
        service.service_data.length > 0
    );
  };

  return (
    <Link href={`/${apart.slug}`} onClick={handleApartViewed} className="block">
      <div className="w-[9rem] h-[15rem] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
        {/* Fotoğraf */}
        <div className="relative aspect-[4/3] w-full min-h-[120px] sm:min-h-[140px]">
          <Image
            src={imageUrl}
            alt={String(apart.apart_name) || "Apart"}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                typeof apart_image === "string" ? apart_image : apart_image.src;
            }}
          />

          {/* Görüntülendi etiketi */}
          {localIsViewed && (
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-white bg-opacity-90 text-colorFirst font-thin rounded-md px-1 py-0.5 sm:px-2 sm:py-1 z-20 text-xs shadow-md">
              {/* {t('cards.viewed')} */}
              <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          )}

          {/* Favori ve Karşılaştır Butonları */}
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 flex flex-col gap-1">
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
              onClick={handleToggleFavorite}
            >
              {localIsFavorite ? (
                <BsHeartFill className="w-4 h-4 sm:w-6 sm:h-6 text-rose-500" />
              ) : (
                <BsHeart className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-md" />
              )}
            </button>

            {/* <button 
              className="w-8 h-8 flex items-center justify-center"
              onClick={handleToggleCompare}
            >
              <MdCompareArrows
                className={`w-6 h-6 ${
                  localIsCompare ? "text-blue-400" : "text-white"
                } drop-shadow-md`}
              />
            </button> */}
          </div>

          <div className="flex justify-between items-center gap-1">
            {apart.food && (
              <Chip
                size="sm"
                variant="flat"
                className="rounded-none bg-colorFirst text-white text-[10px] px-0 py-0 mt-24"
              >
                Yemekli
              </Chip>
            )}
            {hasTransportationService() && (
              <Chip
                size="sm"
                variant="flat"
                className="rounded-none bg-colorFirst text-white text-[10px] px-0 py-0 mt-24"
              >
                Ücretsiz Servis
              </Chip>
            )}
          </div>
        </div>

        {/* İçerik */}
        <div className="p-2 sm:p-3 flex flex-col h-[calc(100%-120px)] sm:h-[calc(100%-140px)]">
          <div className="flex items-start justify-between mb-1 sm:mb-2">
            <h3 className="font-bold text-[12px] sm:text-xs md:text-sm text-gray-700 line-clamp-2 leading-tight flex-1 pr-1 sm:pr-2 overflow-hidden text-ellipsis">
              {String(apart.apart_name)}
            </h3>

            {/* Cinsiyet İndikatörü */}
            {/* {apart.gender && (
              <div className="flex-shrink-0">
                {apart.gender === "K" && (
                  <Chip size="sm" className="bg-colorFirst text-white text-xs px-2 py-1">
                    Kız
                  </Chip>
                )}
                {apart.gender === "E" && (
                  <Chip size="sm" className="bg-colorSecond text-white text-xs px-2 py-1">
                    Erkek
                  </Chip>
                )}
                {apart.gender === "K+E" && (
                  <Chip size="sm" className="bg-yellow-500 text-white text-xs px-2 py-1">
                   Kız/Erkek
                  </Chip>
                )}
              </div>
            )} */}
          </div>

          {/* Üniversite mesafeleri */}
          {apart.distances && apart.distances.length > 0 && (
            <div className="mb-2">
              {apart.distances.slice(0, 1).map((distance) => (
                <div key={distance.id}>
                  <p className="text-[10px] text-gray-600">
                    {truncateText(`${distance.university.name}`, 20)}
                  </p>
                  <p className="text-[10px] font-light text-gray-500 line-clamp-1 flex items-center">
                    <FaWalking className="w-3 h-3 text-gray-500 inline-block mr-1" />
                    {`${apart.distances?.[0]?.yurume || 0} dk`}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-1 sm:mt-2">
            <span className="text-xs sm:text-sm md:text-base font-gilroy text-colorFirst font-bold">
              {/* {apart.price} ₺ */}
              {/* üniversite adı */}
              {/* {apart.distances && apart.distances.length > 0 && apart.distances[0].university.image && (
                <p className="flex items-center gap-1 text-[10px] font-light text-gray-500 line-clamp-1">
                  <Image 
                    src={apart.distances[0].university.image.startsWith('http') 
                      ? apart.distances[0].university.image 
                      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${apart.distances[0].university.image}`
                    } 
                    alt={apart.distances[0].university.name || ''} 
                    width={30} 
                    height={30} 
                    className="rounded-full"
                  />
                </p>
              )} */}

              {/* <p className="text-[10px] font-light text-gray-500 line-clamp-1">
               yürüme mesafesi
              </p> */}
            </span>
            {/* İletişim ikonları */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* {apart.phone && (
                 <Image
                   src={PhoneIcon}
                   alt="PhoneIcon"
                   className="w-4 h-4"
                 />
               )} */}
            </div>
          </div>
          {/* Hemen İncele butonu */}
          {/* <div className="flex items-center justify-center mt-auto border-2 border-colorFirst rounded-md p-1 w-full">
            <span className="text-xs font-light text-colorFirst">
              Hemen İncele
            </span>
          </div> */}
          {/* Whatsapp Butonı */}
          <div
            className="flex items-center justify-center mt-auto border-2 border-green-500 rounded-md p-1 w-full bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
            onClick={handleWhatsappClick}
          >
            <FaWhatsapp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-xs font-light text-green-500">
              Fiyat Bilgisi Al
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMobile;
