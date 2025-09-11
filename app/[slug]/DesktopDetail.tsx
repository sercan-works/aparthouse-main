"use client";
import DesktopImageGallery from "@/components/DesktopImageGallery";
import { Button, Link, Tab, Tabs } from "@heroui/react";
import React, { useState, useEffect, useRef } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaBoltLightning, FaCheck, FaPersonWalking, FaRegEnvelope, FaWhatsapp } from "react-icons/fa6";
import { FaBus, FaExternalLinkAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { GoHeart, GoLocation } from "react-icons/go";
import { MdCompareArrows, MdOutlineLocalPhone } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import SwiperSlideComments from "@/components/swiper/SwiperSlideComments";
import PinkPhone from "@/public/assets/images/pink-phone.png";
import Image from "next/image";
// import SimilarAparts from "@/components/SimilarAparts";
import { useGetApartmentByIdQuery } from "@/store/api/apartsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { toggleCompare } from "@/store/features/CompareSlice";
import { addViewed } from "@/store/features/ViewedSlice";
import { BsHeartFill } from "react-icons/bs";
import Highlights from "@/components/Highlights";
import ShareModal from "@/components/modals/ShareModal";
import LocationViewer from "@/components/maps/LocationViewer";
import Loading from "@/components/ui/Loading";
import { ApiApart } from "@/store/api/apartsApi";
import { getWhatsAppLink } from "../utils/contacts";
import { formatPhoneNumber } from "../utils/phoneFormatter";
import axios from "axios";



const DesktopDetail: React.FC<{ apartSlug?: string }> = ({ apartSlug }) => {
  const dispatch = useDispatch();
  const { favoriteApartIds } = useSelector(
    (state: RootState) => state.favorite
  );
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  // Add refs for each section
  const generalRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const {
    data: apart,
    isLoading,
    error
  } = useGetApartmentByIdQuery(apartSlug || "", {
    skip: !apartSlug
  });

  // Update favorite state when Redux state changes
  useEffect(() => {
    if (apart && apart.id) {
      setIsFavorite(favoriteApartIds.includes(Number(apart.id)));
      setIsCompare(compareApartIds.includes(Number(apart.id)));
    }
  }, [apart, favoriteApartIds, compareApartIds]);

  // Mark apart as viewed when loaded
  useEffect(() => {
    if (apart && apart.id) {
      dispatch(addViewed(Number(apart.id)));
    }
  }, [apart, dispatch]);

  // Reset highlight after animation completes
  useEffect(() => {
    if (highlightedSection) {
      const timer = setTimeout(() => {
        setHighlightedSection(null);
      }, 1500); // Match this with animation duration
      
      return () => clearTimeout(timer);
    }
  }, [highlightedSection]);

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
      alert(
        "Karşılaştırma listesine en fazla 3 apart eklenebilir. Lütfen önce listeden bir apart çıkarınız."
      );
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

  // Handle tab change with scroll and highlight
  const handleTabChange = (key: React.Key) => {
    setActiveTab(key.toString());
    setHighlightedSection(key.toString());
    
    // Scroll to the corresponding section with offset
    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref && ref.current) {
        const yOffset = -100; // The negative value adds padding at the top (adjust as needed)
        const element = ref.current;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    };

    switch (key) {
      case 'general':
        scrollToRef(generalRef);
        break;
      case 'services':
        scrollToRef(servicesRef);
        break;
      case 'map':
        scrollToRef(mapRef);
        break;
      case 'comments':
        scrollToRef(commentsRef);
        break;
      case 'contact':
        scrollToRef(contactRef);
        break;
    }
  };

  //Whatsaspp Click Arttır
  const handleWhatsappClick = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-wp-clicks/`, {
        apart: apart?.id,
    });
  };

  const handlePhoneClick = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-call-clicks/`, {
        apart: apart?.id,
    });
  };

  // Google Haritalar'ı aç
  const openInGoogleMaps = () => {
    const apartData = apart as unknown as ApiApart;
    if (apartData && apartData.lat && apartData.lon) {
      const url = `https://www.google.com/maps/search/?api=1&query=${apartData.lat},${apartData.lon}`;
      window.open(url, "_blank");
    }
  };

  if (isLoading)
    return (
      <div className="container h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  if (error)
    return <div className="container mt-10">Hata: {JSON.stringify(error)}</div>;
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
              <MdCompareArrows
                className={`h-6 w-6 ${
                  isCompare ? "text-blue-400" : "text-gray-500"
                }`}
              />
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
        url={
          typeof window !== "undefined"
            ? window.location.href
            : `https://aparthouse.com/${apartSlug}`
        }
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
          <div className="grid grid-cols-1 gap-2">
            <Link
              href={`tel:+${apart?.firma.phone}`}
              className="grid grid-cols-1"
            >
              <Button className="bg-colorFirst text-white h-12 font-bold" onPress={handlePhoneClick}>
               <FaBoltLightning className="w-6 h-6" /> Hemen Fiyatları Öğren
              </Button>
            </Link>
            {/* <div className="flex flex-col h-12 p-1 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
              <h3 className="text-md font-bold text-end">
                {formatCurrency(apart?.price)} ₺
              </h3>
              <div className="overflow-hidden whitespace-nowrap w-full">
                <p className="text-xs text-gray-500 text-center font-light">
                  &apos;den başlayan fiyatlar
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* TAB İÇERİKLERİ */}

      <div className="mt-5">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            {/* General section */}
            <div 
              ref={generalRef} 
              className={`transition-all duration-1000 rounded-xl ${
                highlightedSection === 'general' 
                  ? 'bg-colorFirst bg-opacity-10 shadow-lg p-4 scale-[1.02]' 
                  : ''
              }`}
            >
              <h2 className="text-2xl font-bold">Açıklama</h2>

              <div className="mt-5">
                <p className="text-gray-500">{apart?.info}</p>
              </div>

              <div className="text-gray-500 flex flex-row items-center gap-2 mt-5">
                <div className="flex flex-row items-center gap-2">
                  <GoLocation className="h-4 w-4 text-gray-500" />
                  Adres : {apart?.address}
                </div>
              </div>

              {/* Google Haritalar'da Aç Butonu */}
              {apart && (apart as unknown as ApiApart).lat && (apart as unknown as ApiApart).lon && (
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

            {/* Services section */}
            <div 
              ref={servicesRef} 
              className={`mt-10 transition-all duration-1000 rounded-xl ${
                highlightedSection === 'services' 
                  ? 'bg-colorFirst bg-opacity-10 shadow-lg p-4 scale-[1.02]' 
                  : ''
              }`}
            >
              <h2 className="text-2xl font-bold">Hizmetler</h2>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {apart?.services && Array.isArray(apart.services) && (
                  <>
                    {/* Hizmetleri kategorilerine göre grupla */}
                    {Object.entries(
                      apart.services.reduce<
                        Record<string, typeof apart.services>
                      >((acc, service) => {
                        // Kategori adına göre grupla
                        if (!acc[service.category_name]) {
                          acc[service.category_name] = [];
                        }
                        acc[service.category_name].push(service);
                        return acc;
                      }, {})
                    ).map(([categoryName, services]) => (
                      <div key={categoryName} className="col-span-1">
                        <h2 className="text-gray-500 font-medium underline mb-3">
                          {categoryName}
                        </h2>
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="flex flex-row items-center gap-2 mb-2"
                          >
                            {/* Şu an API'den icon gelmiyor, kategoriye göre varsayılan ikonlar kullanabiliriz */}
                            {categoryName === "Hizmetler" ? (
                              <FaCheck className="h-4 w-4 text-gray-500" />
                            ) : categoryName === "Faturaya Dahil Olanlar" ? (
                              <FaCheck className="h-4 w-4 text-gray-500" />
                            ) : (
                              <FaCheck className="h-4 w-4 text-gray-500" />
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

                {(!apart?.services ||
                  !Array.isArray(apart.services) ||
                  apart.services.length === 0) && (
                  <div className="col-span-3 text-gray-400 italic">
                    Hizmet bilgisi bulunamadı.
                  </div>
                )}
              </div>
            </div>

            {/* Comments section */}
            <div 
              ref={commentsRef} 
              className={`z-40 mt-10 transition-all duration-1000 rounded-xl ${
                highlightedSection === 'comments' 
                  ? 'bg-colorFirst bg-opacity-10 shadow-lg p-4 scale-[1.02]' 
                  : ''
              }`}
            >
              <h2 className="text-gray-500 font-bold my-5">Yorumlar</h2>
              <div className="flex flex-row items-center gap-2 mx-10">
                <SwiperSlideComments />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="grid grid-cols-1 justify-between gap-2 text-xs mb-5">
              <Link
                className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden"
                target="_blank"
                href={getWhatsAppLink(apart?.firma.phone, apart?.apart_name, ` https://www.aparthouse.com.tr/${apart?.slug}`)}
                onPress={handleWhatsappClick}
              >
                <FaWhatsapp className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  {formatPhoneNumber(apart?.firma.phone)}
                </p>
              </Link>
            </div>
            <div 
              ref={mapRef} 
              className={`mt-5 transition-all duration-1000 rounded-xl ${
                highlightedSection === 'map' 
                  ? 'bg-colorFirst bg-opacity-10 shadow-lg p-4 scale-[1.02]' 
                  : ''
              }`}
            >
              <h2 className="text-2xl font-bold">Harita</h2>
              {apart && <LocationViewer apart={apart as unknown as ApiApart} />}
            </div>

            {/* MESAFELER */}
            <div className="text-gray-500 flex flex-col gap-5 mt-5 text-xs">
              <h3 className="font-medium text-sm">Üniversitelere Mesafeler:</h3>

              {apart?.distances && apart.distances.length > 0 ? (
                apart.distances.map((distance) => (
                  <div
                    key={distance.id}
                    className="flex flex-col gap-3 truncate border-b-2 border-gray-200 pb-2"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <SlGraduation className="h-4 w-4 text-gray-500" />
                      <h3 className="text-gray-700 font-medium min-w-20 max-w-48 truncate">
                        {distance.university.name}:
                      </h3>
                    </div>
                    <div className="ml-6 flex flex-row justify-around items-center gap-3 ">
                      {distance.yurume > 0 && (
                        <div className="flex flex-row items-center gap-1">
                          <FaPersonWalking className="h-4 w-4 text-gray-500" />{" "}
                          {distance.yurume} dk.
                        </div>
                      )}
                      {distance.tramvay > 0 && (
                        <div className="flex flex-row items-center gap-1">
                          <FaTrainSubway className="h-4 w-4 text-gray-500" />{" "}
                          {distance.tramvay} dk.
                        </div>
                      )}
                      {distance.otobus > 0 && (
                        <div className="flex flex-row items-center gap-1">
                          <FaBus className="h-4 w-4 text-gray-500" />{" "}
                          {distance.otobus} dk.
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">
                  Mesafe bilgisi bulunamadı.
                </p>
              )}
            </div>
            <p className="text-gray-500 text-xs">powered by Google Maps</p>
          </div>
        </div>
      </div>
      <div 
        ref={contactRef} 
        className={`z-40 mt-10 mx-5 rounded-xl p-5 transition-all duration-1000 ${
          highlightedSection === 'contact' 
            ? 'bg-colorFirst bg-opacity-20 shadow-lg scale-[1.02]' 
            : 'bg-colorFirst bg-opacity-10'
        }`}
      >
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
          <Link
            href={`tel:+${apart?.firma.phone}`}
            className="grid grid-cols-1"
          >
            <div  className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden"
            onClick={handlePhoneClick}
            >
              <MdOutlineLocalPhone className="w-6 h-6 text-colorFirst" />
              <p className="text-gray-500 text-md font-bold">
                {formatPhoneNumber(apart?.firma.phone)}
              </p>
            </div>
          </Link>

          <Link
            href={getWhatsAppLink(apart?.firma.phone, apart?.apart_name, ` https://www.aparthouse.com.tr/${apart?.slug}`)}
            target="_blank"
            className="grid grid-cols-1"
            
          >
            <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden "
            onClick={handleWhatsappClick}
            >
              <FaWhatsapp className="w-6 h-6 text-colorFirst" />
              <p className="text-gray-500 text-md font-bold">
                Whatsapp
              </p>
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
      <Highlights />
    </div>
  );
};

export default DesktopDetail;
