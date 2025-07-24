import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import apart_image from "@/public/assets/apart.jpg";
import { Checkbox, Chip } from "@heroui/react";
import { ApiApart } from "@/store/api/apartsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { addViewed } from "@/store/features/ViewedSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const FilterCardMobile = ({
  filterVisible,
  apart
}: {
  filterVisible: boolean;
  apart: ApiApart;
}) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | typeof apart_image>(apart_image);
  
  const { favoriteApartIds } = useSelector(
    (state: RootState) => state.favorite
  );

  useEffect(() => {
    // Önce thumbnail'i kontrol et, yoksa normal resmi kullan
    if (apart.image_thumbnail && apart.image_thumbnail.length > 0) {
      setImageUrl(apart.image_thumbnail[0]);
    } else if (apart.images && apart.images.length > 0) {
      setImageUrl(apart.images[0].image);
    }
  }, [apart.image_thumbnail, apart.images]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(apart.id));
  };

  const handleApartViewed = () => {
    if (apart && apart.id) {
      dispatch(addViewed(apart.id));
    }
  };

  return (
    <Link 
      href={`/${apart.slug}`}
      onClick={handleApartViewed}
      className="block"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
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
          
          {/* Favori Butonu */}
          <button 
            className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center"
            onClick={handleToggleFavorite}
          >
            {favoriteApartIds.includes(apart.id) ? (
              <BsHeartFill className="w-6 h-6 text-rose-500" />
            ) : (
              <BsHeart className="w-6 h-6 text-white drop-shadow-md" />
            )}
          </button>

          {/* Checkbox (eğer filter görünümündeyse) */}
          {filterVisible && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox 
                defaultSelected={false}
                className="bg-white bg-opacity-80 rounded-md"
              />
            </div>
          )}
        </div>

        {/* İçerik */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 leading-tight">
            {String(apart.apart_name)}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-colorFirst">
              {apart.price} ₺
              {/* <span className="text-xs text-gray-500 font-normal">
                /{apart.price_type || "ay"}
              </span> */}
            </span>
            
            {/* Cinsiyet İndikatörü */}
            {apart.gender && (
              <div className="flex items-center">
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
                    Karışık
                  </Chip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilterCardMobile; 