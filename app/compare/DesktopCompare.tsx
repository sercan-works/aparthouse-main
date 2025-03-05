"use client";
import React from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import apart from "@/public/assets/apart.jpg";

import { FaXmark } from "react-icons/fa6";

import { FaCheckCircle } from "react-icons/fa";

const DesktopFavorites = () => {
  // Hizmet listesini tanımlayalım
  const hizmetListesi = [
    "Fiyat",
    "Yemek hizmeti",
    "Wifi",
    "Isıtma",
    "Klima",
    "Temizlik Hizmeti",
    "Ortak alan",
    "Çalışma odası",
    "Çamaşırhane",
    "Otopark",
    "Gym",
    "Evcil hayvan dostu",
    "Konum",
    "Erişebilirlik",
    "Çevre",
    "Güvenlik"
  ];

  return (
    <>
      <div className="flex flex-row mx-4 lg:mx-auto max-w-7xl my-10 overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] -z-40">
          <Image
            src={BannerImage}
            alt="about"
            fill
            className="object-cover brightness-50 -z-40"
          />
          <div className="relative h-full">
            <div className="absolute top-36 left-32">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-4xl select-text">
                    Karşılaştırın
                  </h1>
                  <p className="text-white text-sm mt-5 font-normal select-text">
                    Yüzlerce konaklama arasından seçin, karşılaştırın <br />
                    size en uygun yaşam alanının keyfine varın.
                  </p>
                </div>
                <div className="relative flex flex-col justify-end items-end left-96">
                  <div className="relative z-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-72  container mx-auto">
          {/* BAŞLIKLAR */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border rounded-lg p-0 mt-[29vh]">
              <ul className="">
                {hizmetListesi.map((hizmet, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                  >
                    <p className="flex items-center text-md p-2">
                      <span className="mr-2"></span> {hizmet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {/* APART 1 */}
            <div className=" rounded-lg p-8 -mt-20">
              <div className="flex flex-row justify-between items-center w-full text-lg">
                <h3 className="text-gray-500">Mono Kız Apart</h3>

                <FaXmark className="text-gray-500 h-5 w-5 cursor-pointer mb-10" />

              </div>
              <div className="relative w-full h-44 mb-4">
                <Image
                  src={apart}
                  alt="Apart Image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <ul className="">
                {hizmetListesi.map((hizmet, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                  >
                    <p className="flex items-center text-md p-2">
                      <span className="mr-2"></span>{" "}
                      <FaCheckCircle className="text-green-500 h-5 w-5 mx-auto" />
                    </p>
                  </li>
                ))}
              </ul>
            </div>

                <div className=" rounded-lg p-8 -mt-20">
                  <div className="flex flex-row justify-between items-center w-full text-lg">
                    <h3 className="text-gray-500">Mono Kız Apart</h3>
                    <FaXmark className="text-gray-500 h-5 w-5 cursor-pointer mb-10" />
                    </div>
              <div className="relative w-full h-44 mb-4">
                <Image
                  src={apart}
                  alt="Apart Image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <ul className="">
                {hizmetListesi.map((hizmet, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                  >
                    <p className="flex items-center text-md p-2">
                      <span className="mr-2"></span>{" "}
                      <FaCheckCircle className="text-green-500 h-5 w-5 mx-auto" />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" rounded-lg p-8 -mt-20">
              <div className="flex flex-row justify-between items-center w-full text-lg">
                <h3 className="text-gray-500">Mono Kız Apart</h3>
                <FaXmark className="text-gray-500 h-5 w-5 cursor-pointer mb-10" />
              </div>
              <div className="relative w-full h-44 mb-4">
                <Image
                  src={apart}
                  alt="Apart Image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <ul className="">
                {hizmetListesi.map((hizmet, index) => (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                  >
                    <p className="flex items-center text-md p-2">
                      <span className="mr-2"></span>{" "}
                      <FaXmark className="text-red-500 h-5 w-5 mx-auto" />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopFavorites;
