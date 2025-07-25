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
import WhatsappIcon from "@/public/assets/icons/WhatsappIcon.svg";
// import PhoneIcon from "@/public/assets/icons/PhoneIcon.svg";
import RestaurantIcon from "@/public/assets/icons/RestaurantIcon.svg";
import { FaEye } from "react-icons/fa6";

const CardMobile = ({ apart }: { apart: ApiApart }) => {
  // const { t } = useLanguage();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | typeof apart_image>(apart_image);
  
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
  };

  // Metni belirli bir uzunlukta kısaltmak için helper fonksiyon
  // const truncateText = (text: string, maxLength: number) => {
  //   if (!text) return "";
  //   if (text.length <= maxLength) return text;
  //   return text.slice(0, maxLength) + "...";
  // };

  return (
    <Link 
      href={`/${apart.slug}`}
      onClick={handleApartViewed}
      className="block"
    >
      <div className="w-[10rem] h-[26vh] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
        {/* Fotoğraf */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={String(apart.apart_name) || "Apart"}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = typeof apart_image === 'string' ? apart_image : apart_image.src;
            }}
          />
          
          {/* Görüntülendi etiketi */}
          {localIsViewed && (
            <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-colorFirst font-thin rounded-md px-2 py-1 z-20 text-xs shadow-md">
              {/* {t('cards.viewed')} */}
              <FaEye className="w-4 h-4" />
            </div>
          )}

          {/* Favori ve Karşılaştır Butonları */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
            <button 
              className="w-8 h-8 flex items-center justify-center"
              onClick={handleToggleFavorite}
            >
              {localIsFavorite ? (
                <BsHeartFill className="w-6 h-6 text-rose-500" />
              ) : (
                <BsHeart className="w-6 h-6 text-white drop-shadow-md" />
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
        </div>

        {/* İçerik */}
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-600 line-clamp-2 leading-tight flex-1 pr-2 overflow-hidden text-ellipsis">
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
          {/* {apart.distances && apart.distances.length > 0 && (
            <div className="mb-2">
              {apart.distances.slice(0, 1).map((distance) => (
                <p key={distance.id} className="text-xs text-gray-600">
                  {truncateText(`${distance.university.name}`, 20)} - {distance.yurume} dk
                </p>
              ))}
            </div>
          )} */}
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-gilroy text-colorFirst font-bold">
              {apart.price} ₺
              <span className="text-xs text-gray-500 font-normal">*</span>
            </span>
            
            {/* İletişim ikonları */}
            <div className="flex gap-2">
              {apart.phone && (
                <Link href={`https://wa.me/${apart.phone}`} target="_blank">
                <Image
                  src={WhatsappIcon}
                  alt="WhatsappIcon"
                  className="w-5 h-5"
                />
                </Link>
              )}
              {/* {apart.phone && (
                <Image
                  src={PhoneIcon}
                  alt="PhoneIcon"
                  className="w-4 h-4"
                />
              )} */}
              {apart.food && (
                <Image
                  src={RestaurantIcon}
                  alt="RestaurantIcon"
                  className="w-4 h-4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMobile; 