"use client";
import React from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";

import { Select, SelectItem } from "@heroui/react";
import { FaTrash } from "react-icons/fa6";
import FavoritesAparts from "@/components/FavoritesAparts";
import RecentlyAparts from "@/components/RecentlyAparts";
import ContactBanner from "@/components/ContactBanner";

const DesktopFavorites = () => {
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
                    Favorileriniz
                  </h1>
                  <p className="text-white text-sm mt-5 font-normal select-text">
                    Yüzlerce konaklama arasından seçin, favorilerinize ekleyin{" "}
                    <br />
                    karar vermek için en kolay yolu deneyin.
                  </p>
                </div>
                <div className="relative flex flex-col justify-end items-end left-96">
                  <div className="relative z-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-56  container mx-auto">
          <div className="flex w-full justify-start items-center">
            <Select
              className="max-w-xs mb-10 mx-2"
              label="Sıralama"
              placeholder="Seçiniz"
            >
              <SelectItem key="asss">Seçim</SelectItem>
            </Select>

            <div className="text-sm font-normal text-gray-500 mb-10 mx-2 underline cursor-pointer ">
              Favorileri Temizle
            </div>
          </div>
          <div className="flex w-full justify-between items-center container mx-auto">
            <p>Temizlemek istediğiniz konaklamaları tıklayarak seçiniz.</p>

            <div className="text-sm font-bold text-gray-500  mb-10 mx-2  cursor-pointer">
              <div className="flex flex-row items-center gap-2 text-colorFirst border border-colorFirst rounded-md px-10 py-3 hover:bg-colorFirst hover:text-white transition-all duration-300">
                <FaTrash /> Temizle
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center container mx-auto gap-10">
        <FavoritesAparts />
      </div>
      <RecentlyAparts />
      <ContactBanner />
    </>
  );
};

export default DesktopFavorites;
