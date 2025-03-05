"use client"
import React from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import { FaTrash } from "react-icons/fa6";
import { Select, SelectItem } from "@heroui/react";
import FavoritesAparts from "@/components/FavoritesAparts";

const MobileFavorites = () => {
  return (
    <div className="flex flex-row mx-auto max-w-[1250px] my-10">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-40">
        <Image
          src={BannerImage}
          alt="about"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute top-36 left-5 w-[90%] z-10 font-bold">
          <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-2xl ">
            Favorileriniz
          </h1>
          <p className="text-white text-xs mt-4 font-normal">
           Yüzlerce konaklama arasından seçin, <br/> favorilerinize ekleyin <br/> karar vermek için en koly yolu deneyin.
          </p>
          {/* <div className="mt-4">
            <AMPButton />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col w-full mt-44  container mx-auto">
          <div className="flex w-full justify-start items-center">
            <Select
              className="max-w-48 mb-10 mx-2"
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
          <FavoritesAparts />


        </div>

 
    </div>
  );
};

export default MobileFavorites;
