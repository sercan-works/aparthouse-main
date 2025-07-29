import React, { useState } from "react";
import { useGetHiglightApartsQuery } from "@/store/api/apartsApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { addViewed } from "@/store/features/ViewedSlice";
import Image from "next/image";
import Link from "next/link";
import apart_image from "@/public/assets/apart.jpg";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Chip } from "@heroui/react";

// Array'i random karışmak için Fisher-Yates shuffle algoritması
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const HighlightsMobile = () => {
  const [showMore, setShowMore] = useState(false);
  const selectedCity = useSelector(
    (state: RootState) => state.filter.selectedCity
  );
  const { favoriteApartIds } = useSelector(
    (state: RootState) => state.favorite
  );
  const dispatch = useDispatch();

  const { data: highlightAparts } = useGetHiglightApartsQuery({
    city: selectedCity || undefined
  });

  const displayLimit = 10;
  
  // Verileri random sırala ve sonra limit uygula
  const shuffledAparts = highlightAparts ? shuffleArray(highlightAparts) : [];
  const displayedAparts = showMore
    ? shuffledAparts
    : shuffledAparts?.slice(0, displayLimit);

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

      {/* Swiper Carousel */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={12}
          slidesPerView={2.2}
          navigation={false}
          loop={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          breakpoints={{
            320: { slidesPerView: 1.8, spaceBetween: 10 },
            375: { slidesPerView: 2.1, spaceBetween: 12 },
            425: { slidesPerView: 2.3, spaceBetween: 12 }
          }}
          className="mySwiper custom-swiper"
        >
          {displayedAparts?.map((apart) => (
            <SwiperSlide key={apart.id}>
              <Link
                href={`/${apart.slug}`}
                onClick={() => handleApartViewed(apart.id)}
                className="block"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative h-[16rem] flex flex-col">
                  {/* Fotoğraf */}
                  <div className="relative aspect-[4/3] w-full flex-shrink-0">
                {apart?.food && (
                  <div className="absolute top-2 left-6 z-10 w-8 h-8 flex items-center justify-center">
                    <Chip color="primary" variant="solid" className="text-white text-xs font-light">
                      Yemekli
                    </Chip>
                  </div>
                )}
                    <Image
                      src={apart.image_thumbnail?.[0] || apart_image}
                      alt={String(apart.apart_name || "Apart")}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          typeof apart_image === "string"
                            ? apart_image
                            : apart_image.src;
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
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 leading-tight">
                      {String(apart.apart_name || "")}
                    </h3>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        {/* üniversite adı */}
                        {apart.distances && apart.distances.length > 0 && (
                          <p className="flex items-center gap-1 text-[10px] font-light text-gray-500">
                            <FaUniversity /> {apart.distances[0].university.name}
                          </p>
                        )}

                        {/* yürüme mesafesi */}
                        {apart.distances && apart.distances.length > 0 && (
                          <p className="text-[10px] font-light text-gray-500">
                            {`${apart.distances[0].yurume} dk`}
                          </p>
                        )}
                      </div>

                      {/* Hemen İncele butonu */}
                      <div className="flex items-center justify-center mt-2 border-2 border-colorFirst rounded-md p-1 w-full">
                        <span className="text-xs font-light text-colorFirst">
                          Hemen İncele
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Daha Fazla Göster Butonu */}
      {highlightAparts &&
        highlightAparts.length > displayLimit &&
        !showMore && (
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
