"use client";
import DesktopImageGallery from "@/components/DesktopImageGallery";
import { Button, Link, Tab, Tabs } from "@heroui/react";
import React from "react";
import { CiShare2, CiWifiOn } from "react-icons/ci";
import { FaPersonWalking, FaRegEnvelope, FaWhatsapp } from "react-icons/fa6";
import { FaBus } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { GoHeart, GoLocation } from "react-icons/go";
import { MdCompareArrows, MdOutlineLocalPhone } from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { LuWashingMachine } from "react-icons/lu";
import SwiperSlideComments from "@/components/swiper/SwiperSlideComments";
import PinkPhone from "@/public/assets/images/pink-phone.png";
import Image from "next/image";
import SimilarAparts from "@/components/SimilarAparts";

const DesktopDetail: React.FC<{ apartmentId?: string }> = ({ apartmentId }) => {
  console.log('Apartment ID:', apartmentId);

  return (
    <div className="container mt-10">
      {/* DETAY HEADER KISMI */}
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Sera Apart</h1>
          <div className="flex flex-row gap-3">
            <CiShare2 className="h-6 w-6 text-gray-500" />
            <MdCompareArrows className="h-6 w-6 text-gray-500" />
            <GoHeart className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>

      {/* RESİM GALERİ KISMI */}
      <div className="mt-10">
        <DesktopImageGallery />
      </div>

      {/* TAB VE FİYAT VE ARA KISMI */}
      <div className="mt-10 grid grid-cols-4 gap-4">
        <div className="col-span-3">
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
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-colorFirst text-white h-12 font-bold">
              Ara
            </Button>
            <div className="flex flex-col h-12 p-1 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
              <h3 className="text-md font-bold text-end">120.000 ₺</h3>
              <div className="overflow-hidden whitespace-nowrap w-full">
                <p className="text-xs text-gray-500 text-center font-light">
                  &apos;den başlayan fiyatlar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* açıklama ve harita kısmı */}
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <h2 className="text-2xl font-bold">Açıklama</h2>

            <div className="mt-5">
              <p className="text-gray-500">
                DAİRELERİMİZ İki Oda ve Mutfaktan Oluşan Ferah Bağımsız Daireler
                Odalarda Ortopedik Yataklar Modüler Çalışma Masası, Ergonomik ve
                Ortapedik Çalışma Koltukları Elbise Dolabı ve Kitaplık Her Odada
                LCD Televizyon Zevkle Döşenmiş Çağdaş Tasarım Ürünü Mobilyalar
                Merkezi Sistem Isınma – Isı ve Ses Yalıtımı
              </p>
            </div>

            <div className="text-gray-500 flex flex-row items-center gap-2 mt-5">
              <div className="flex flex-row items-center gap-2">
                <GoLocation className="h-4 w-4 text-gray-500" />
                Adres : İstanbul, Beşiktaş
              </div>
            </div>

            {/* <div className="text-gray-500 flex items-start gap-2 mt-5">
              <div className="flex flex-row items-center gap-2">
                <HiOutlineBuildingOffice2 className="h-4 w-4 text-gray-500" />
                <h3 className="text-gray-500 min-w-20">Olanaklar :</h3>
              </div>
              <p className="text-xs">
                Wifi &bull; Park&bull; Havuz&bull; Tatlı &bull; Klima &bull;
                Kara Dışı &bull; Kara Dışı &bull; Wifi &bull; Park &bull; Havuz
                &bull; Tatlı &bull; Park &bull; Havuz &bull; Tatlı &bull; Klima
                &bull; Kara Dışı
              </p>
            </div> */}

            {/* <div className="text-gray-500 flex items-start gap-2 mt-5">
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
            </div> */}


          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-1 justify-between gap-2 text-xs mb-5">
              {/* <Link href="tel:+905338888888" className="grid grid-cols-1">
                <div className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                  <MdOutlineLocalPhone className="w-6 h-6 text-colorFirst" />
                  <p className="text-gray-500 font-bold text-md">
                    Ara
                  </p>
                </div>
              </Link> */}

              <Link
                href="https://wa.me/905338888888"
                target="_blank"
                className="grid grid-cols-1"
              >
                <div className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
                  <FaWhatsapp className="w-6 h-6 text-colorFirst" />
                  <p className="text-gray-500 text-md font-bold">0533 888 88 88</p>
                </div>
              </Link>
            </div>

            <h2 className="text-2xl font-bold">Harita</h2>
            {/* MESAFELER */}
            <div className="text-gray-500 flex items-start gap-2 mt-5 text-xs">
              <div className="flex flex-row items-center gap-2">
                <SlGraduation className="h-4 w-4 text-gray-500" />
                <h3 className="text-gray-500 min-w-20 max-w-36 truncate">
                  Anadolu Üni :
                </h3>
                <div className="flex flex-row items-center gap-2">
                  <FaPersonWalking className="h-4 w-4 text-gray-500" /> 10dk.
                  <FaTrainSubway className="h-4 w-4 text-gray-500" /> 10dk.
                  <FaBus className="h-4 w-4 text-gray-500" /> 10dk.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HİZMETLER KISMI */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="text-gray-500 font-medium underline">Olanaklar</h2>
          <div className="flex flex-row items-center gap-2">
            <LuWashingMachine className="h-4 w-4 text-gray-500" />
            <h3 className="text-gray-500 min-w-20 max-w-36 truncate">
              Çamaşır Makinesi
            </h3>
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="text-gray-500 font-medium underline">
            Fiyata Dahil İçerikler
          </h2>
          <div className="flex flex-row items-center gap-2">
            <CiWifiOn className="h-4 w-4 text-gray-500" />
            <h3 className="text-gray-500 min-w-20 max-w-36 truncate">Wifi</h3>
          </div>
        </div>
      </div>

      {/* YORUMLAR KISMI */}
      <div className=" z-40 mt-10 ">
        <h2 className="text-gray-500 font-bold my-5">Yorumlar</h2>
        <div className="flex flex-row items-center gap-2 mx-10">
          <SwiperSlideComments />
        </div>
      </div>

      {/* İLETİŞİM KISMI */}
      <div className=" z-40 mt-10 mx-5 bg-colorFirst bg-opacity-10 rounded-xl p-5">
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
                sheapart@hotmail.com
              </p>
            </div>
          </Link>
          <Link href="tel:+905338888888" className="grid grid-cols-1">
            <div className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
              <MdOutlineLocalPhone className="w-6 h-6 text-colorFirst" />
              <p className="text-gray-500 text-md font-bold">
                +90 533 888 88 88
              </p>
            </div>
          </Link>

          <Link
            href="https://wa.me/905338888888"
            target="_blank"
            className="grid grid-cols-1"
          >
            <div className=" flex flex-row items-center gap-2 justify-center h-12 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden">
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

      <SimilarAparts />
    </div>
  );
};

export default DesktopDetail;
