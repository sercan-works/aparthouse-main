"use client";
import React, { useState } from 'react'
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

// Update type definition to match actual data structure
type ImageItem = {
  image: string;
  image_medium_watermarked_url?: string;
  id?: number;
  cover?: boolean;
} | string;

const SwiperSlideImages = ({ images = [] }: { images: ImageItem[] }) => {
  // console.log('Images received in SwiperSlideImages:', images);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Normalize images to ensure each one has an image property
  const normalizedImages = React.useMemo(() => {
    return images.map((img) => {
      if (typeof img === 'string') {
        return { image: img };
      } else if (typeof img === 'object' && img !== null) {
        return img;
      }
      return { image: '' }; // Fallback
    });
  }, [images]);

  const SwiperContent = () => (
    <>
    <Swiper
      modules={[Navigation]}
      navigation
      loop={normalizedImages.length > 1}
      className="h-full w-full custom-swiper rounded-xl"
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      initialSlide={activeIndex}
    >
      {normalizedImages.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image.image_medium_watermarked_url || image.image}
            width={800}
            height={600}
            alt="apart"
            className="object-cover w-full h-full cursor-pointer"
            onClick={() => !isFullscreen && setIsFullscreen(true)}
          />
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>
        <Image
          src={apart_image}
          alt="apart"
          className="object-cover w-full h-full cursor-pointer"
          onClick={() => !isFullscreen && setIsFullscreen(true)}
        />
      </SwiperSlide> */}
     
      </Swiper>
{/* FOTOĞRAF SAYISI */}
      {normalizedImages.length > 0 && (
        <div className="flex justify-center items-center text-gray-500 mt-2">
          {activeIndex + 1 } / {normalizedImages.length}
        </div>
      )}
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
