"use client";
import React, { useState } from 'react'
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CommentCard from '../card/CommentCard';

const SwiperSlideComments = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 4;

  const SwiperContent = () => (
    <>
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      loop={true}
      className="h-full w-full custom-swiper rounded-xl"
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      initialSlide={activeIndex}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 4 },
      }}
      spaceBetween={20}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={1000}
    >
      <SwiperSlide>
        <div className='  mx-auto'>
        <CommentCard />
        </div>
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

export default SwiperSlideComments
