import React from "react";
import Card from "./card/Card";
// import { Button } from "@heroui/react"; -- artık kullanılmadığı için kaldırıldı
import { useGetHiglightApartsQuery } from "@/store/api/apartsApi";
// Swiper kütüphanesini import ediyoruz
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modüllerini import ediyoruz
import { Autoplay, Navigation } from 'swiper/modules';
// Swiper stillerini import ediyoruz
import 'swiper/css';
import 'swiper/css/navigation';
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Highlights = () => {
  const selectedCity = useSelector((state: RootState) => state.filter.selectedCity);

  const { data: highlightAparts } = useGetHiglightApartsQuery({
    city: selectedCity || undefined,
  });
  console.log(highlightAparts);

  return (
    <div className="hidden md:flex flex-col md:flex-row justify-center items-center py-8 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-colorFirst font-bold mb-5 mx-10">Öne Çıkanlar</h2>
        
        {/* Swiper bileşenini ekliyoruz */}
        <div className="relative px-10">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper custom-swiper"
          >
            {highlightAparts?.map((apart) => (
              <SwiperSlide key={apart.id} className="">
                <Card apart={apart} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* <Button className="border-colorFirst border-2 mx-auto text-colorFirst flex justify-center items-center bg-opacity-0">
                  <p className="font-bold ">Daha Fazlasını Gör</p>
        </Button> */}
      </div>
    </div>
  );
};

export default Highlights;
