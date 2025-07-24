import React, { useEffect, useState } from "react";
import Image from "next/image";
import apart_image from "@/public/assets/apart.jpg";
import FavoriteIcon from "@/public/assets/icons/FavoritesIcon.svg";
import { Checkbox, Chip } from "@heroui/react";
import StarReadOnly from "../rating/StarReadOnly";
import { ApiApart } from "@/store/api/apartsApi";
import { useRouter } from "next/navigation";

const FilterCard = ({
  filterVisible,
  apart
}: {
  filterVisible: boolean;
  apart: ApiApart;
}) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | typeof apart_image>(apart_image);

  useEffect(() => {
    // Önce thumbnail'i kontrol et, yoksa normal resmi kullan
    if (apart.image_thumbnail && apart.image_thumbnail.length > 0) {
      setImageUrl(apart.image_thumbnail[0]);
    } else if (apart.images && apart.images.length > 0) {
      setImageUrl(apart.images[0].image);
    }
  }, [apart.image_thumbnail, apart.images]);

  const handleCardClick = () => {
    if (apart.slug) {
      router.push(`/${apart.slug}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex flex-row gap-4 min-w-[20rem] items-center w-full bg-white rounded-xl p-4 shadow-sm md:shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200`}
    >
      {/* IMAGE */}
      <div className="w-[115px] h-[115px] flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="apart"
          width={300}
          height={200}
          priority
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* KART BODY */}
      <div className="flex flex-col gap-1 w-full">
        {/* KART BODY HEADER */}
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-medium">{String(apart.apart_name) || ""}</h2>
          <div className="flex flex-row gap-2">
            <Image
              src={FavoriteIcon}
              className="cursor-pointer"
              alt="favorite"
              width={20}
              height={20}
            />
            {filterVisible && <Checkbox defaultSelected={false} />}
          </div>
        </div>

        {/* KART BODY CONTENT */}
        <div className="text-xs text-gray-500 overflow-hidden">
          {(() => {
            // Tüm servislerin service_data dizilerini birleştir
            const allServices =
              apart.services?.flatMap((service) => service.service_data) || [];
            // En fazla 10 hizmet göster
            const displayServices = allServices.slice(0, 10);
            // Eğer daha fazla hizmet varsa "..." ekle
            const hasMore = allServices.length > 10;

            return displayServices.length > 0
              ? displayServices.join(" • ") + (hasMore ? " • ..." : "")
              : "Hizmet bilgisi bulunamadı";
          })()}
        </div>

        <div className="flex flex-row gap-2 flex-wrap">
          {/* Cinsiyet Bilgisi */}
          {apart.gender === "K" && (
            <Chip size="sm" className="bg-colorFirst text-white text-xs">
              Kız
            </Chip>
          )}
          {apart.gender === "E" && (
            <Chip size="sm" className="bg-colorSecond text-white text-xs">
              Erkek
            </Chip>
          )}
          {apart.gender === "K+E" && (
            <Chip size="sm" className="bg-yellow-500 text-white text-xs">
              Kız ve Erkek
            </Chip>
          )}

          {/* Özellikler */}
          {apart.food === true && (
            <Chip size="sm" className="bg-orange-200 text-orange-700 text-xs">
              Yemek
            </Chip>
          )}
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2">
            {StarReadOnly(0)}
            <h4 className="text-xs font-bold">0.0</h4>
          </div>
          <div className="text-md font-bold">
            {apart.price}₺/
            <span className="text-xs text-gray-500 font-normal">
              {apart.price_type || "ay"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
