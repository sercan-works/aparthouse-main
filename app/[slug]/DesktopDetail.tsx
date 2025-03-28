"use client";
import DesktopImageGallery from "@/components/DesktopImageGallery";
import { Button, Link, Tab, Tabs } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { CiShare2, CiWifiOn } from "react-icons/ci";
import { FaPersonWalking, FaRegEnvelope, FaWhatsapp } from "react-icons/fa6";
import { FaBus, FaExternalLinkAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { GoHeart, GoLocation } from "react-icons/go";
import { MdCompareArrows, MdOutlineLocalPhone } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { LuWashingMachine } from "react-icons/lu";
import SwiperSlideComments from "@/components/swiper/SwiperSlideComments";
import PinkPhone from "@/public/assets/images/pink-phone.png";
import Image from "next/image";
// import SimilarAparts from "@/components/SimilarAparts";
import { useGetApartmentByIdQuery } from "@/store/api/apartsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { toggleCompare } from "@/store/features/CompareSlice";
import { BsHeartFill } from "react-icons/bs";
import Highlights from "@/components/Highlights";
import ShareModal from "@/components/modals/ShareModal";
import LocationViewer from "@/components/maps/LocationViewer";
import Loading from "@/components/ui/Loading";

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

// Para birimini Türkçe formatına göre düzenle: 1000 -> 1.000
const formatCurrency = (amount: number) => {
  return amount?.toLocaleString('tr-TR');
}

const DesktopDetail: React.FC<{ apartSlug?: string }> = ({ apartSlug }) => {
  const dispatch = useDispatch();
  const { favoriteApartIds } = useSelector((state: RootState) => state.favorite);
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

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

  // Handle tab change
  const handleTabChange = (key: React.Key) => {
    setActiveTab(key.toString());
  };

  // Google Haritalar'ı aç
  const openInGoogleMaps = () => {
    if (apart && apart.lat && apart.lon) {
      const url = `https://www.google.com/maps/search/?api=1&query=${apart.lat},${apart.lon}`;
      window.open(url, '_blank');
    }
  };

  if (isLoading) return <div className="container h-screen flex justify-center items-center"><Loading/></div>;
  if (error) return <div className="container mt-10">Hata: {JSON.stringify(error)}</div>;
  if (!apart) return <div className="container mt-10">Apart bulunamadı</div>;

  return (
    <div className="container mt-10">
      {/* DETAY HEADER KISMI */}
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold text-gray-700">{apart?.name}</h1>
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
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareOpen} 
        onOpenChange={() => setIsShareOpen(!isShareOpen)}
        title={apart.name || "ApartHouse Detay"}
        url={typeof window !== 'undefined' ? window.location.href : `https://aparthouse.com/${apartSlug}`}
      />

      {/* RESİM GALERİ KISMI */}
      <div className="mt-10">
        <DesktopImageGallery images={apart?.images} />
      </div>

      {/* TAB VE FİYAT VE ARA KISMI */}
      <div className="mt-10 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Tabs
            key="underlined"
            aria-label="Tabs variants"
            variant="underlined"
            color="primary"
            selectedKey={activeTab}
            onSelectionChange={handleTabChange}
          >
            <Tab key="general" title="Genel Özellikler" />
            <Tab key="services" title="Hizmetler" />
            <Tab key="map" title="Harita" />
            <Tab key="comments" title="Yorumlar" />
            <Tab key="contact" title="İletişim" />
          </Tabs>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-2">
            <Link href={`tel:+${apart?.firma.phone}`} className="grid grid-cols-1">
              <Button className="bg-colorFirst text-white h-12 font-bold">
                Ara
              </Button>
            </Link>
            <div className="flex flex-col h-12 p-1 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
              <h3 className="text-md font-bold text-end">{formatCurrency(apart?.price)} ₺</h3>
              <div className="overflow-hidden whitespace-nowrap w-full">
                <p className="text-xs text-gray-500 text-center font-light">
                  &apos;den başlayan fiyatlar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB İÇERİKLERİ */}
      {activeTab === "general" && (
        <div className="mt-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <h2 className="text-2xl font-bold">Açıklama</h2>

              <div className="mt-5">
                <p className="text-gray-500">
                  {apart?.info}
                </p>
              </div>

              <div className="text-gray-500 flex flex-row items-center gap-2 mt-5">
                <div className="flex flex-row items-center gap-2">
                  <GoLocation className="h-4 w-4 text-gray-500" />
                  Adres : {apart?.address}
                </div>
              </div>

              {/* Google Haritalar'da Aç Butonu */}
              {apart && apart.lat && apart.lon && (
                <div className="mt-3">
                  <Button 
                    color="primary" 
                    variant="ghost" 
                    startContent={<FaExternalLinkAlt />}
                    onClick={openInGoogleMaps}
                  >
                    Google Haritalar&apos;da Aç
                  </Button>
                </div>
              )}
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-1 justify-between gap-2 text-xs mb-5">
                <Link
                  href={`https://wa.me/${apart?.firma.phone}`}
                  target="_blank"
                  className="grid grid-cols-1"
                >
                  <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                    <FaWhatsapp className="w-6 h-6 text-colorFirst" />
                    <p className="text-gray-500 text-md font-bold">{formatPhoneNumber(apart?.firma.phone)}</p>
                  </div>
                </Link>
              </div>
              <div className="mt-5">
                <h2 className="text-2xl font-bold">Harita</h2>
                <LocationViewer apart={apart} />
              </div>

              {/* MESAFELER */}
              <div className="text-gray-500 flex flex-col gap-5 mt-5 text-xs">
                <h3 className="font-medium text-sm">Üniversitelere Mesafeler:</h3>
                
                {apart?.distances && apart.distances.length > 0 ? (
                  apart.distances.map((distance) => (
                    <div key={distance.id} className="flex flex-col gap-3 truncate border-b-2 border-gray-200 pb-2">
                      <div className="flex flex-row items-center gap-2">
                        <SlGraduation className="h-4 w-4 text-gray-500" />
                        <h3 className="text-gray-700 font-medium min-w-20 max-w-48 truncate">
                          {distance.university.name}:
                        </h3>
                      </div>
                      <div className="ml-6 flex flex-row justify-around items-center gap-3 ">
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
              <p className="text-gray-500 text-xs">powered by Google Maps</p>
            </div>
          </div>
        </div>
      )}

      {/* HİZMETLER KISMI */}
      {activeTab === "services" && (
        <div className="mt-5 grid grid-cols-3 gap-4">
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
            <div className="col-span-3 text-gray-400 italic">
              Hizmet bilgisi bulunamadı.
            </div>
          )}
        </div>
      )}

      {/* HARİTA TAB İÇERİĞİ */}
      {activeTab === "map" && (
        <div className="mt-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <h2 className="text-2xl font-bold">Konum Bilgisi</h2>
              <div className="mt-5">
                <LocationViewer apart={apart} height="450px" />
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <p>Üniversite seçerek yürüme rotasını görebilirsiniz.</p>
                
                {/* Google Haritalar'da Aç Butonu */}
                {apart && apart.lat && apart.lon && (
                  <div className="mt-3">
                    <Button 
                      color="primary" 
                      startContent={<FaExternalLinkAlt />}
                      onClick={openInGoogleMaps}
                    >
                      Google Haritalar&apos;da Aç
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-gray-500 flex flex-col gap-5 text-xs">
                <h3 className="font-medium text-sm">Üniversitelere Mesafeler:</h3>
                
                {apart?.distances && apart.distances.length > 0 ? (
                  apart.distances.map((distance) => (
                    <div key={distance.id} className="flex flex-col gap-3 truncate border-b-2 border-gray-200 pb-2">
                      <div className="flex flex-row items-center gap-2">
                        <SlGraduation className="h-4 w-4 text-gray-500" />
                        <h3 className="text-gray-700 font-medium min-w-20 max-w-48 truncate">
                          {distance.university.name}:
                        </h3>
                      </div>
                      <div className="ml-6 flex flex-row justify-around items-center gap-3 ">
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
              <p className="text-gray-500 text-xs mt-2">powered by Google Maps</p>
            </div>
          </div>
        </div>
      )}

      {/* YORUMLAR KISMI */}
      {activeTab === "comments" && (
        <div className="z-40 mt-10 ">
          <h2 className="text-gray-500 font-bold my-5">Yorumlar</h2>
          <div className="flex flex-row items-center gap-2 mx-10">
            <SwiperSlideComments />
          </div>
        </div>
      )}

      {/* İLETİŞİM KISMI */}
      {activeTab === "contact" && (
        <div className="z-40 mt-10 mx-5 bg-colorFirst bg-opacity-10 rounded-xl p-5">
          <h2 className="text-gray-500 font-bold ">İletişim</h2>
          <p className="text-gray-500 text-sm">
            Detaylı içerik ve fiyat bilgisi için firmayla iletişime geçiniz.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-5">
            <Link
              href="mailto:sheapart@hotmail.com"
              target="_blank"
              className="grid grid-cols-1"
            >
              <div className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <FaRegEnvelope className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  {apart?.firma.mail}
                </p>
              </div>
            </Link>
            <Link href={`tel:+${apart?.firma.phone}`} className="grid grid-cols-1">
              <div className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <MdOutlineLocalPhone className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  {formatPhoneNumber(apart?.firma.phone)}
                </p>
              </div>
            </Link>

            <Link
              href={`https://wa.me/${apart?.firma.phone}`}
              target="_blank"
              className="grid grid-cols-1"
            >
              <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <FaWhatsapp className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">Whatsapp</p>
              </div>
            </Link>
            {/* PINK PHONE */}
            <div className="relative">
              <div className="absolute -top-36 -right-[780px]">
                <Image
                  src={PinkPhone}
                  alt="Pink Phone"
                  className="w-36 h-full opacity-30 scale-x-[-1]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Highlights />
    </div>
  );
};

export default DesktopDetail;
