"use client";

import React from "react";
import { CiShare2 } from "react-icons/ci";
import { MdCompareArrows, MdOutlineLocalPhone } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
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
import { CiWifiOn } from "react-icons/ci";
import { Tabs, Tab } from "@heroui/react";
import ContactBar from "@/components/ContactBar";
import SwiperSlideComments from "@/components/swiper/SwiperSlideComments";
import Link from "next/link";

const MobileDetail: React.FC<{ apartmentId?: string }> = ({ apartmentId }) => {
  console.log('Apartment ID:', apartmentId);

  return (
    <div className="flex flex-col mx-auto max-w-sm my-10 gap-4 relative min-h-screen pb-24">
      <SwiperSlideImages />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-medium">Sera Apart</h1>
          <div className="flex flex-row gap-3">
            <CiShare2 className="h-6 w-6 text-gray-500" />
            <MdCompareArrows className="h-6 w-6 text-gray-500" />
            <GoHeart className="h-6 w-6 text-gray-500" />
          </div>
        </div>
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
            DAİRELERİMİZ İki Oda ve Mutfaktan Oluşan Ferah Bağımsız Daireler
            Odalarda Ortopedik Yataklar Modüler Çalışma Masası, Ergonomik ve
            Ortapedik Çalışma Koltukları Elbise Dolabı ve Kitaplık Her Odada LCD
            Televizyon Zevkle Döşenmiş Çağdaş Tasarım Ürünü Mobilyalar Merkezi
            Sistem Isınma – Isı ve Ses Yalıtımı
          </p>
        </div>

        {/* ÖZET KISMI ADRES, OLANAKLAR, FİYAT DAHİL İÇERİKLER */}
        <div className="mt-5 overflow-hidden flex flex-col gap-2">
          <div className="text-gray-500 flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <GoLocation className="h-4 w-4 text-gray-500" />
              Adres : İstanbul, Beşiktaş
            </div>
          </div>

          <div className="text-gray-500 flex items-start gap-2">
            <div className="flex flex-row items-center gap-2">
              <HiOutlineBuildingOffice2 className="h-4 w-4 text-gray-500" />
              <h3 className="text-gray-500 min-w-20">Olanaklar :</h3>
            </div>
            <p className="text-xs">
              Wifi &bull; Park&bull; Havuz&bull; Tatlı &bull; Klima &bull; Kara
              Dışı &bull; Kara Dışı &bull; Wifi &bull; Park &bull; Havuz &bull;
              Tatlı &bull; Park &bull; Havuz &bull; Tatlı &bull; Klima &bull;
              Kara Dışı
            </p>
          </div>

          <div className="text-gray-500 flex items-start gap-2">
            <div className="flex flex-row items-center gap-2">
              $
              <h3 className="text-gray-500 min-w-40">
                Fiyat Dahil İçerikler :
              </h3>
            </div>
            <p className="text-xs">
              Wifi &bull; Park &bull; Havuz &bull; Tatlı &bull; Klima &bull;
              Kara Dışı
            </p>
          </div>

          <div className="text-gray-500 flex items-start gap-2 mt-5">
            <div className=" text-center">Harita Alanı</div>
          </div>

          {/* MESAFELER */}
          <div className="text-gray-500 flex items-start gap-2 mt-5">
            <div className="flex flex-row items-center gap-2">
              <SlGraduation className="h-4 w-4 text-gray-500" />
              <h3 className="text-gray-500 min-w-20 max-w-36 truncate">
                Anadolu Üniversitesi :
              </h3>
              <div className="flex flex-row items-center gap-2">
                <FaPersonWalking className="h-4 w-4 text-gray-500" /> 10dk.
                <FaTrainSubway className="h-4 w-4 text-gray-500" /> 10dk.
                <FaBus className="h-4 w-4 text-gray-500" /> 10dk.
              </div>
            </div>
          </div>

          {/* HİZMETLER */}
          <div className="mt-5">
            <h2 className="text-gray-500 font-medium underline">Olanaklar</h2>
            <div className="flex flex-row items-center gap-2">
              <LuWashingMachine className="h-4 w-4 text-gray-500" />
              <h3 className="text-gray-500 min-w-20 max-w-36 truncate">
                Çamaşır Makinesi
              </h3>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-gray-500 font-medium underline">
              Fiyata Dahil İçerikler
            </h2>
            <div className="flex flex-row items-center gap-2">
              <CiWifiOn className="h-4 w-4 text-gray-500" />
              <h3 className="text-gray-500 min-w-20 max-w-36 truncate">Wifi</h3>
            </div>
          </div>

          {/* YORUMLAR */}
          <div className=" z-40 ">
            <h2 className="text-gray-500 font-bold my-5">Yorumlar</h2>
            <div className="flex flex-row items-center gap-2 mx-10">
              <SwiperSlideComments />
            </div>
          </div>

          {/* İLETİŞİM */}
          <div className=" z-40 mt-5 mx-5">
            <h2 className="text-gray-500 font-bold ">İletişim</h2>
            <p className="text-gray-500 text-sm">
              Detaylı içerik ve fiyat bilgisi için firmayla iletişime geçiniz.
            </p>

            <div className="flex flex-col gap-4 mt-5">
              <Link href="mailto:sheapart@hotmail.com" target="_blank">
              <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <FaRegEnvelope className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  sheapart@hotmail.com
                </p>
              </div>
              </Link>
              <Link href="tel:+905338888888">
              <div className="flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                <MdOutlineLocalPhone className="w-6 h-6 text-colorFirst" />
                <p className="text-gray-500 text-md font-bold">
                  +90 533 888 88 88
                </p>
              </div>
              </Link>

              <Link href="https://wa.me/905338888888" target="_blank">
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
        <ContactBar />
      </div>
    </div>
  );
};

export default MobileDetail;
