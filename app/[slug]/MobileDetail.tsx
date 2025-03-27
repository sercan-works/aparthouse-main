"use client";

import React, { useState, useEffect } from "react";
import { CiShare2, CiWifiOn } from "react-icons/ci";
import { MdCompareArrows, MdOutlineLocalPhone } from "react-icons/md";
import { GoHeart, GoLocation } from "react-icons/go";
import { SlGraduation } from "react-icons/sl";
import {
  FaPersonWalking,
  FaRegEnvelope,
  FaWhatsapp
} from "react-icons/fa6";
import { FaTrainSubway } from "react-icons/fa6";
import { FaBus } from "react-icons/fa";
import SwiperSlideImages from "@/components/swiper/SwiperSlideImages";
import { LuWashingMachine } from "react-icons/lu";
import { Tabs, Tab } from "@heroui/react";
import ContactBar from "@/components/ContactBar";
import SwiperSlideComments from "@/components/swiper/SwiperSlideComments";
import Link from "next/link";
import { useGetApartmentByIdQuery } from "@/store/api/apartsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { toggleCompare } from "@/store/features/CompareSlice";
import { BsHeartFill } from "react-icons/bs";
import Loading from "@/components/ui/Loading";
import ShareModal from "@/components/modals/ShareModal";

// Telefon numarasını formatlamak için yardımcı fonksiyon
const formatPhoneNumber = (phone: string = ""): string => {
  // Başında 0 yoksa ekle
  let formattedPhone = phone.startsWith("0") ? phone : `0${phone}`;
  
  // Sadece rakamları al
  formattedPhone = formattedPhone.replace(/\D/g, "");
  
  // İstenen formata dönüştür: "0 545 446 77 21"
  if (formattedPhone.length === 11) {
    return `${formattedPhone.slice(0, 1)} ${formattedPhone.slice(1, 4)} ${formattedPhone.slice(4, 7)} ${formattedPhone.slice(7, 9)} ${formattedPhone.slice(9, 11)}`;
  }
  
  return formattedPhone; // Format uygulanamadıysa olduğu gibi döndür
};

const MobileDetail: React.FC<{ apartSlug?: string }> = ({ apartSlug }) => {
  const dispatch = useDispatch();
  const { favoriteApartIds } = useSelector((state: RootState) => state.favorite);
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const { data: apart, isLoading, error } = useGetApartmentByIdQuery(apartSlug || '', {
    skip: !apartSlug
  });

  // Update favorite state when Redux state changes
  useEffect(() => {
    if (apart && apart.id) {
      setIsFavorite(favoriteApartIds.includes(Number(apart.id)));
      setIsCompare(compareApartIds.includes(Number(apart.id)));
    }
  }, [apart, favoriteApartIds, compareApartIds]);

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (!apart) return;
    setIsFavorite(!isFavorite);
    dispatch(toggleFavorite(Number(apart.id)));
  };

  // Handle compare toggle
  const handleToggleCompare = () => {
    if (!apart) return;
    
    // If already in compare list, remove it
    if (isCompare) {
      setIsCompare(false);
      dispatch(toggleCompare(Number(apart.id)));
      return;
    }
    
    // If not in compare list and list is full (3 items), notify user
    if (compareApartIds.length >= 3) {
      alert("Karşılaştırma listesine en fazla 3 apart eklenebilir. Lütfen önce listeden bir apart çıkarınız.");
      return;
    }

    // Add to compare list
    setIsCompare(true);
    dispatch(toggleCompare(Number(apart.id)));
  };

  // Handle share modal
  const handleShareClick = () => {
    setIsShareOpen(true);
  };

  if (isLoading) return <div className="flex justify-center items-center mt-48">
    <Loading />
  </div>;
  if (error) return <div className="flex flex-col mx-auto max-w-sm my-10">Hata: {JSON.stringify(error)}</div>;
  if (!apart) return <div className="flex flex-col mx-auto max-w-sm my-10">Apart bulunamadı</div>;

  return (
    <div className="flex flex-col mx-auto max-w-sm my-10 gap-4 relative min-h-screen pb-24">
      {/* API'den gelen verileri SwiperSlideImages'a uygun formatta aktarıyoruz */}
      <SwiperSlideImages images={apart?.images || []} />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-medium">{apart?.name || apart?.title}</h1>
          <div className="flex flex-row gap-3">
            <button onClick={handleShareClick}>
              <CiShare2 className="h-6 w-6 text-gray-500" />
            </button>
            
            {/* Compare Button */}
            <button onClick={handleToggleCompare}>
              <MdCompareArrows className={`h-6 w-6 ${isCompare ? 'text-blue-400' : 'text-gray-500'}`} />
            </button>
            
            {/* Favorite Button */}
            <button onClick={handleToggleFavorite}>
              {isFavorite ? (
                <BsHeartFill className="h-6 w-6 text-rose-400" />
              ) : (
                <GoHeart className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        
        {/* Share Modal */}
        <ShareModal 
          isOpen={isShareOpen} 
          onOpenChange={() => setIsShareOpen(!isShareOpen)}
          title={apart.name || apart.title || "ApartHouse Detay"}
          url={typeof window !== 'undefined' ? window.location.href : `https://aparthouse.com/${apartSlug}`}
        />
        
        {/* TABS */}
        <div className="mt-5">
          <Tabs
            key="underlined"
            aria-label="Tabs variants"
            variant="underlined"
            color="primary"
          >
            <Tab key="general" title="Genel Özellikler" />
            <Tab key="services" title="Hizmetler" />
            <Tab key="comments" title="Yorumlar" />
            <Tab key="contact" title="İletişim" />
          </Tabs>
        </div>

        {/* AÇIKLAMA */}
        <div className="mt-5">
          <p className="text-gray-500">
            {apart?.info || apart?.description}
          </p>
        </div>

        {/* ÖZET KISMI ADRES, OLANAKLAR, FİYAT DAHİL İÇERİKLER */}
        <div className="mt-5 overflow-hidden flex flex-col gap-2">
          <div className="text-gray-500 flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <GoLocation className="h-4 w-4 text-gray-500" />
              Adres : {apart?.address || apart?.location}
            </div>
          </div>

          {/* MESAFELER */}
          <div className="text-gray-500 flex flex-col gap-2 mt-5">
            <h3 className="font-medium text-sm">Üniversitelere Mesafeler:</h3>
            
            {apart?.distances && apart.distances.length > 0 ? (
              apart.distances.map((distance) => (
                <div key={distance.id} className="flex flex-col gap-2 truncate border-b-2 border-gray-200 pb-2">
                  <div className="flex flex-row items-center gap-2">
                    <SlGraduation className="h-4 w-4 text-gray-500" />
                    <h3 className="text-gray-700 font-medium min-w-20 max-w-48 truncate">
                      {distance.university.name}:
                    </h3>
                  </div>
                  <div className="ml-6 flex flex-row justify-around items-center gap-3">
                    {distance.yurume > 0 && (
                      <div className="flex flex-row items-center gap-1">
                        <FaPersonWalking className="h-4 w-4 text-gray-500" /> {distance.yurume} dk.
                      </div>
                    )}
                    {distance.tramvay > 0 && (
                      <div className="flex flex-row items-center gap-1">
                        <FaTrainSubway className="h-4 w-4 text-gray-500" /> {distance.tramvay} dk.
                      </div>
                    )}
                    {distance.otobus > 0 && (
                      <div className="flex flex-row items-center gap-1">
                        <FaBus className="h-4 w-4 text-gray-500" /> {distance.otobus} dk.
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">Mesafe bilgisi bulunamadı.</p>
            )}
          </div>

          {/* HİZMETLER */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {apart?.services && Array.isArray(apart.services) && (
              <>
                {/* Hizmetleri kategorilerine göre grupla */}
                {Object.entries(
                  apart.services.reduce<Record<string, typeof apart.services>>((acc, service) => {
                    // Kategori adına göre grupla
                    if (!acc[service.category_name]) {
                      acc[service.category_name] = [];
                    }
                    acc[service.category_name].push(service);
                    return acc;
                  }, {})
                ).map(([categoryName, services]) => (
                  <div key={categoryName} className="col-span-1">
                    <h2 className="text-gray-500 font-medium underline mb-3">{categoryName}</h2>
                    {services.map((service) => (
                      <div key={service.id} className="flex flex-row items-center gap-2 mb-2">
                        {/* Şu an API'den icon gelmiyor, kategoriye göre varsayılan ikonlar kullanabiliriz */}
                        {categoryName === "Hizmetler" ? (
                          <LuWashingMachine className="h-4 w-4 text-gray-500" />
                        ) : categoryName === "Faturaya Dahil Olanlar" ? (
                          <CiWifiOn className="h-4 w-4 text-gray-500" />
                        ) : (
                          <CiWifiOn className="h-4 w-4 text-gray-500" />
                        )}
                        <h3 className="text-gray-500 min-w-20 max-w-36 truncate">
                          {service.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
            
            {(!apart?.services || !Array.isArray(apart.services) || apart.services.length === 0) && (
              <div className="col-span-2 text-gray-400 italic">
                Hizmet bilgisi bulunamadı.
              </div>
            )}
          </div>

          {/* YORUMLAR */}
          <div className="z-40 mt-5">
            <h2 className="text-gray-500 font-bold my-5">Yorumlar</h2>
            <div className="flex flex-row items-center gap-2 mx-10">
              <SwiperSlideComments />
            </div>
          </div>

          {/* İLETİŞİM */}
          <div className="z-40 mt-5 mx-5">
            <h2 className="text-gray-500 font-bold ">İletişim</h2>
            <p className="text-gray-500 text-sm">
              Detaylı içerik ve fiyat bilgisi için firmayla iletişime geçiniz.
            </p>

            <div className="flex flex-col gap-4 mt-5">
              <Link href={`mailto:${apart?.firma.mail || 'info@aparthouse.com'}`} target="_blank">
                <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                  <FaRegEnvelope className="w-6 h-6 text-colorFirst" />
                  <p className="text-gray-500 text-md font-bold">
                    {apart?.firma.mail || 'info@aparthouse.com'}
                  </p>
                </div>
              </Link>
              <Link href={`tel:+${apart?.firma.phone}`}>
                <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                  <MdOutlineLocalPhone className="w-6 h-6 text-colorFirst" />
                  <p className="text-gray-500 text-md font-bold">
                    {formatPhoneNumber(apart?.firma.phone)}
                  </p>
                </div>
              </Link>

              <Link href={`https://wa.me/${apart?.firma.phone}`} target="_blank">
                <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                  <FaWhatsapp className="w-6 h-6 text-colorFirst" />
                  <p className="text-gray-500 text-md font-bold">
                    Whatsapp
                  </p>
                </div>
              </Link>
            </div>

           {/* MOBİLE FOOTER YAPILACAK */}
          </div>
        </div>

        {/* blank */}
        <div className="h-20"></div>
      </div>
      {/* CONTACT BAR */}
      <div className="fixed bottom-[68px] left-0 right-0 bg-white py-2 z-50">
        {/* Props göndermeyi şimdilik atlayalım */}
        <ContactBar phone={apart?.firma.phone} price={apart?.price} />
      </div>
    </div>
  );
};

export default MobileDetail;
