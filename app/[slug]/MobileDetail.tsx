"use client";

import React, { useState, useEffect } from "react";
import { CiShare2 } from "react-icons/ci";
import { MdCompareArrows, MdLocalPhone } from "react-icons/md";
import { GoHeart, GoLocation } from "react-icons/go";
import { SlGraduation } from "react-icons/sl";
import {
  FaPersonWalking,
  FaRegEnvelope,
  FaTrainSubway,
  FaWhatsapp
} from "react-icons/fa6";
import { FaCheck, FaExternalLinkAlt, FaUtensils, FaShieldAlt } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import SwiperSlideImages from "@/components/swiper/SwiperSlideImages";
import { Tabs, Tab, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import ContactBar from "@/components/ContactBar";
import SwiperSlideComments from "@/components/swiper/SwiperSlideComments";
import Link from "next/link";
import { useGetApartmentByIdQuery } from "@/store/api/apartsApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/features/FavoriteSlice";
import { toggleCompare } from "@/store/features/CompareSlice";
import { addViewed } from "@/store/features/ViewedSlice";
import { BsHeartFill } from "react-icons/bs";
import Loading from "@/components/ui/Loading";
import ShareModal from "@/components/modals/ShareModal";
import LocationViewer from "@/components/maps/LocationViewer";
import { openWhatsAppLink } from "../utils/contacts";
import HighlightsMobile from "@/components/HighlightsMobile";
import { formatPhoneNumber } from "../utils/phoneFormatter";

const MobileDetail: React.FC<{ apartSlug?: string }> = ({ apartSlug }) => {
  const dispatch = useDispatch();
  const { favoriteApartIds } = useSelector(
    (state: RootState) => state.favorite
  );
  const { compareApartIds } = useSelector((state: RootState) => state.compare);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

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

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (!apart) return;
    setIsFavorite(!isFavorite);
    dispatch(toggleFavorite(Number(apart.id)));
  };

  // const handleWhatsappClick = async () => {
  //   await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-wp-clicks/`,
  //     {
  //       apart: apart?.id
  //     }
  //   );
  //   // WhatsApp linkini iOS Safari uyumlu şekilde aç
  //   openWhatsAppLink(
  //     apart?.firma.phone,
  //     apart?.name,
  //     ` https://www.aparthouse.com.tr/${apart?.slug}`
  //   );
  // };

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

  // Handle tab change
  const handleTabChange = (key: React.Key) => {
    setActiveTab(key.toString());
  };

  // Google Haritalar'ı aç
  const openInGoogleMaps = () => {
    if (apart && apart.lat && apart.lon) {
      const url = `https://www.google.com/maps/search/?api=1&query=${apart.lat},${apart.lon}`;
      window.open(url, "_blank");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-48">
        <div className="flex flex-col mx-auto max-w-sm mb-48">
          <Loading />
          <p className="text-gray-500 text-sm mt-5">
            {" "}
            Apart Detayı Yükleniyor...
          </p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col mx-auto max-w-sm my-10">
        Hata: {JSON.stringify(error)}
      </div>
    );
  if (!apart)
    return (
      <div className="flex flex-col mx-auto max-w-sm my-10">
        Apart bulunamadı
      </div>
    );

  return (
    <div className="flex flex-col mx-auto max-w-sm mt-5 mb-10 gap-4 relative min-h-screen pb-24">
      {/* Kampanya Duyuru Kartı */}
 
      <SwiperSlideImages images={apart?.images || []} />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between px-4">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl font-medium">{apart?.name}</h1>
            <button 
              onClick={() => setIsVerificationOpen(true)}
              className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-green-200 rounded-full transition-colors"
              title="Doğrulanmış konaklama"
            >
              <FaShieldAlt className="w-4 h-4 text-blue-600" />
            </button>
          </div>
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

        {/* Verification Modal */}
        <Modal 
          isOpen={isVerificationOpen} 
          onOpenChange={setIsVerificationOpen}
          placement="center"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="w-5 h-5 text-green-600" />
                    <span>Doğrulanmış Konaklama</span>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-3 text-center">
                    <p className="text-gray-700">
                      Bu konaklama Aparthouse saha ekibi tarafından yerinde görülerek onaylanmıştır.
                    </p>
                    <p className="text-gray-700 font-medium">
                      Güvenle konaklayabilirsiniz. ✅
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Tamam
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* TABS */}
        <div className="mt-5">
          <Tabs
            key="underlined"
            aria-label="Tabs variants"
            variant="underlined"
            color="primary"
            selectedKey={activeTab}
            onSelectionChange={handleTabChange}
          >
            <Tab key="general" title="Genel Özellikler" />
            <Tab key="map" title="Harita" />
            {/* <Tab key="comments" title="Yorumlar" />
            <Tab key="contact" title="İletişim" /> */}
          </Tabs>
        </div>

        {/* TAB İÇERİKLERİ */}
        {activeTab === "general" && (
          <div className="mt-5 overflow-hidden flex flex-col gap-2 px-4">
            {/* AÇIKLAMA */}
            <div>
              <p className="text-gray-500">{apart?.info}</p>
            </div>

            {/* ÖZET KISMI ADRES, OLANAKLAR, FİYAT DAHİL İÇERİKLER */}
            <div className="mt-5 text-gray-500 flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <GoLocation className="h-4 w-4 text-gray-500" />
                Adres : {apart?.address}
              </div>
            </div>

            {/* Google Haritalar'da Aç Butonu */}
            {apart && apart.lat && apart.lon && (
              <div className="mt-2">
                <Button
                  color="primary"
                  variant="ghost"
                  startContent={<FaExternalLinkAlt />}
                  className="w-full"
                  onPress={openInGoogleMaps}
                >
                  Google Haritalar&apos;da Aç
                </Button>
              </div>
            )}

            {/* MESAFELER */}
            <div className="text-gray-500 flex flex-col gap-2 mt-5">
              <h3 className="font-medium text-sm">Üniversitelere Mesafeler:</h3>

              {apart?.distances && apart.distances.length > 0 ? (
                apart.distances.map((distance) => (
                  <div
                    key={distance.id}
                    className="flex flex-col gap-2 truncate border-b-2 border-gray-200 pb-2"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <SlGraduation className="h-4 w-4 text-gray-500" />
                      <h3 className="text-gray-700 font-medium min-w-20 max-w-48 truncate">
                        {distance.university.name}:
                      </h3>
                    </div>
                    <div className="ml-6 flex flex-row justify-around items-center gap-3">
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

            {/* YEMEKLİ KART*/}
            {apart?.food && (
              <Button
                variant="flat"
                className="w-full mt-1 first-letter:bg-white text-white h-12 p-0 px-1 border-2 border-primary rounded-xl"
              >
                <FaUtensils className="w-6 h-6 text-primary" />
                <div className="text-sm text-primary ">
                  <p>
                    Bu konaklama{" "}
                    <span className="font-bold">yemek hizmeti</span>{" "}
                    vermektedir.
                  </p>
                  <p className="text-gray-500 text-xs">
                    (Detaylar için WhatsApp ile iletişime geçiniz.)
                  </p>
                </div>
              </Button>
            )}

            {/* HİZMETLER */}
            <div className="mt-5 grid grid-cols-2 gap-4">
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
          </div>
        )}

        {/* HARİTA TAB İÇERİĞİ */}
        {activeTab === "map" && (
          <div className="mt-5">
            <h2 className="text-gray-600 font-medium mb-3">Konum Bilgisi</h2>
            {apart && <LocationViewer apart={apart} height="350px" />}

            <div className="mt-4 text-sm text-gray-500">
              <p>Üniversite seçerek yürüme rotasını görebilirsiniz.</p>
              <p className="mt-1 text-xs">powered by Google Maps</p>
            </div>

            {/* Google Haritalar'da Aç Butonu */}
            {apart && apart.lat && apart.lon && (
              <div className="mt-3">
                <Button
                  color="primary"
                  variant="solid"
                  startContent={<FaExternalLinkAlt />}
                  className="w-full"
                  onPress={openInGoogleMaps}
                >
                  Google Haritalar&apos;da Aç
                </Button>
              </div>
            )}
          </div>
        )}

        {/* İLETİŞİM KISMI */}
        <div className="z-40 mt-5 mx-5">
          <h2 className="text-gray-500 font-bold ">İletişim</h2>
          <p className="text-gray-500 text-sm">
            Detaylı içerik ve fiyat bilgisi için firmayla iletişime geçiniz.
          </p>

          <div className="flex flex-col gap-4 mt-5">
            <Link
              href={`mailto:${apart?.firma.mail || "info@aparthouse.com"}`}
              target="_blank"
            >
              <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <FaRegEnvelope className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  {apart?.firma.mail || "info@aparthouse.com"}
                </p>
              </div>
            </Link>
            <Link href={`tel:+${apart?.firma.phone}`}>
              <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <MdLocalPhone className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  {formatPhoneNumber(apart?.firma.phone)}
                </p>
              </div>
            </Link>

            <div
              onClick={() =>
                openWhatsAppLink(
                  apart?.firma.phone,
                  apart?.name,
                  ` https://www.aparthouse.com.tr/${apart?.slug}`
                )
              }
              className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <FaWhatsapp className="w-6 h-6 text-colorFirst" />
              <p className="text-gray-500 text-md font-bold">Whatsapp</p>
            </div>
          </div>

        </div>

        {/* blank */}
        <div className="h-20"></div>
      </div>
      {/* CONTACT BAR */}
      <div className="fixed bottom-[68px] left-0 right-0 bg-white py-2 z-50">
        <ContactBar
          phone={apart?.firma.phone}
          price={apart?.price}
          lat={apart?.lat}
          lon={apart?.lon}
          apartName={apart?.apart_name || apart?.name}
          apartSlug={apart?.slug}
          apartId={apart?.id}
          gender={
            apart?.category?.name === "Kız"
              ? "K"
              : apart?.category?.name === "Erkek"
              ? "E"
              : apart?.category?.name === "Karışık"
              ? "K+E"
              : "E"
          }
          universities={
            apart?.distances?.map((distance) => distance.university.id) || []
          }
        />
      </div>

      {/* Highlights */}
      <HighlightsMobile />
    </div>
  );
};

export default MobileDetail;
