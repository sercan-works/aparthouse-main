"use client";
import React, { useState } from 'react'
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import apart_image from "@/public/assets/apart.jpg";

const SwiperSlideImages = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 3;

  const SwiperContent = () => (
    <>
    <Swiper
      modules={[Navigation]}
      navigation
      loop={true}
      className="h-full w-full custom-swiper rounded-xl"
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      initialSlide={activeIndex}
    >
      <SwiperSlide>
        <Image
          src={apart_image}
          alt="apart"
          className="object-cover w-full h-full cursor-pointer"
          onClick={() => !isFullscreen && setIsFullscreen(true)}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={apart_image}
          alt="apart"
          className="object-cover w-full h-full cursor-pointer"
          onClick={() => !isFullscreen && setIsFullscreen(true)}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={apart_image}
          alt="apart"
          className="object-cover w-full h-full cursor-pointer"
          onClick={() => !isFullscreen && setIsFullscreen(true)}
          />
        </SwiperSlide>
      </Swiper>
{/* FOTOĞRAF SAYISI */}
      <div className="flex justify-center items-center text-gray-500 mt-2">
        {activeIndex + 1} / {totalSlides}
      </div>
    </>
  );

  return (
    <>
      <div className="w-full h-full">
        <SwiperContent />
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            ×
          </button>
          <div className="w-full h-1/2">
            <SwiperContent />
          </div>
        </div>
      )}
    </>
  )
}

export default SwiperSlideImages
