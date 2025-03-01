"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import apart_image from "@/public/assets/apart.jpg";
import WhatsappIcon from "@/public/assets/icons/WhatsappIcon.svg";
import PhoneIcon from "@/public/assets/icons/PhoneIcon.svg";
import RestaurantIcon from "@/public/assets/icons/RestaurantIcon.svg";
import FavoriteIcon from "@/public/assets/icons/FavoritesIcon.svg";
import CompareIcon from "@/public/assets/icons/CompareArrows.svg";
import { Button } from "@heroui/react";

const Card = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative rounded-xl overflow-hidden w-[23rem] h-[22.5rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px]">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full custom-swiper"
      >
        <SwiperSlide>
          <Image
            src={apart_image}
            alt="apart"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={apart_image}
            alt="apart"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={apart_image}
            alt="apart"
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
      </Swiper>

      {/* Icon buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button className="rounded-full">
          <Image
            src={FavoriteIcon}
            alt="Favoriye Ekle"
            className="w-8 h-8 md:w-6 md:h-6 brightness-0 invert"
          />
        </button>
        <button className="rounded-full">
          <Image src={CompareIcon} alt="Karşılaştır" className="w-8 h-8 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Daha Önce İncelediniz banner */}
      <div
        className={`absolute ${
          isExpanded ? "bottom-[33%]" : "bottom-[67%]"
        } left-0 right-0 bg-gray-500/50 p-2 transition-all duration-300 z-10`}
      >
        <p className="text-gray-100 text-sm font-medium text-center">
          Daha Önce İncelediniz
        </p>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-white p-4 md:p-3 transition-all duration-300 cursor-pointer z-10
        ${isExpanded ? "h-2/6" : "h-4/6"}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="text-gray-800">
          <div className="flex justify-center mb-1">
            <div className="w-8 h-[2px] bg-gray-600"></div>
          </div>
          {/* ÜST ÇEKMCE */}

          <div className="flex justify-between">
            <div className="w-2/3">
              <h3 className="flex items-center gap-4 font-bold text-lg md:text-medium overflow-hidden">
                Mono Kız Apart
                <span className="w-4 h-4 md:h-3 md:w-3 rounded-full bg-colorFirst"></span>
              </h3>
              <p className="mt-1 md:text-xs">Anadolu Ü. 10 dakika</p>
              <p className="mt-0 md:text-xs">Osmangazi Ü. 25 dakika</p>
            </div>
            <div className="w-1/3">
              <div className="flex flex-col items-end">
                <div className="text-xl md:text-sm font-bold ">₺100.500 ₺*</div>
                <div className="flex gap-2 mt-5">
                  <Image
                    src={WhatsappIcon}
                    alt="WhatsappIcon"
                    className="w-5 h-5 md:w-4 md:h-4"
                  />
                  <Image src={PhoneIcon} alt="PhoneIcon" className="w-5 h-5 md:w-4 md:h-4" />
                  <Image
                    src={RestaurantIcon}
                    alt="RestaurantIcon"
                    className="w-5 h-5 md:w-4 md:h-4"
                  />
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
              Wifi&bull;Park&bull;Havuz&bull;Tatlı&bull;Klima&bull;Kara
              Dışı&bull;Kara
              Dışı&bull;Wifi&bull;Park&bull;Havuz&bull;Tatlı&bull;Park&bull;Havuz&bull;Tatlı&bull;Klima&bull;Kara
              Dışı&bull;
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-300 cursor-pointer bg-opacity-50 animate-fade-in">
                <Button className="border-colorFirst border-2 mx-auto text-colorFirst flex justify-center items-center bg-opacity-0">
                  <p className="font-bold ">Daha Fazlası &#62;</p>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
