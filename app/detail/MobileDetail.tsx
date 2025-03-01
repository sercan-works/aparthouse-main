"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import apart_image from "@/public/assets/apart.jpg";

const MobileDetail = () => {
  return (
    <div className="flex flex-row mx-auto max-w-sm my-10">
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        className="h-full w-full custom-swiper rounded-xl"
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
    </div>
  );
};

export default MobileDetail;
