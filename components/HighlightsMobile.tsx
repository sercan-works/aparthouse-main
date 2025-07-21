import React, { useState } from "react";
import { useGetHiglightApartsQuery } from "@/store/api/apartsApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { addViewed } from "@/store/features/ViewedSlice";
import Image from "next/image";
import Link from "next/link";
import apart_image from "@/public/assets/apart.jpg";

const HighlightsMobile = () => {
  const [showMore, setShowMore] = useState(false);
  const selectedCity = useSelector((state: RootState) => state.filter.selectedCity);
  const { favoriteApartIds } = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();

  const { data: highlightAparts } = useGetHiglightApartsQuery({
    city: selectedCity || undefined,
  });

  const displayLimit = 10;
  const displayedAparts = showMore 
    ? highlightAparts 
    : highlightAparts?.slice(0, displayLimit);

  const handleToggleFavorite = (e: React.MouseEvent, apartId: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(apartId));
  };

  const handleApartViewed = (apartId: number) => {
    dispatch(addViewed(apartId));
  };

  if (!highlightAparts || highlightAparts.length === 0) {
    return null;
  }

  return (
    <div className="block md:hidden px-4 py-6">
      <h2 className="text-xl font-bold text-colorFirst mb-4">Öne Çıkanlar</h2>
      
      {/* Grid Layout - 2 kart yan yana */}
      <div className="grid grid-cols-2 gap-3">
        {displayedAparts?.map((apart) => (
          <Link 
            key={apart.id}
            href={`/${apart.slug}`}
            onClick={() => handleApartViewed(apart.id)}
            className="block"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
              {/* Fotoğraf */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={apart.image_thumbnail?.[0] || apart_image}
                  alt={apart.apart_name || "Apart"}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = apart_image.src || apart_image;
                  }}
                />
                
                {/* Favori Butonu */}
                <button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center"
                  onClick={(e) => handleToggleFavorite(e, apart.id)}
                >
                  {favoriteApartIds.includes(apart.id) ? (
                    <BsHeartFill className="w-6 h-6 text-rose-500" />
                  ) : (
                    <BsHeart className="w-6 h-6 text-white drop-shadow-md" />
                  )}
                </button>
              </div>

              {/* İçerik */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 leading-tight">
                  {apart.apart_name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-colorFirst">
                    {apart.price} ₺<span className="text-xs text-gray-500 font-normal">&apos;den başlayan fiyatlar</span>
                  </span>
                  
                  {/* Cinsiyet İndikatörü */}
                  {/* {apart.gender && (
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full ${
                        apart.gender === "K" 
                          ? "bg-colorFirst" 
                          : apart.gender === "E" 
                          ? "bg-colorSecond" 
                          : "bg-yellow-500"
                      }`}></span>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Daha Fazla Göster Butonu */}
      {highlightAparts && highlightAparts.length > displayLimit && !showMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowMore(true)}
            className="px-6 py-3 bg-white border-2 border-colorFirst text-colorFirst font-semibold rounded-lg hover:bg-colorFirst hover:text-white transition-colors duration-200"
          >
            Daha Fazlasını Gör
          </button>
        </div>
      )}
    </div>
  );
};

export default HighlightsMobile;
