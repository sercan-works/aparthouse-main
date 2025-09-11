"use client";
import React from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import default_image from "@/public/assets/apart.jpg";
import { ApiApart } from "@/store/api/apartsApi";
import { FaXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleCompare } from "@/store/features/CompareSlice";

interface DesktopCompareProps {
  aparts: ApiApart[];
}

const DesktopCompare: React.FC<DesktopCompareProps> = ({ aparts }) => {
  const dispatch = useDispatch();

  // Karşılaştırma listesinden apart kaldırma
  const handleRemoveApart = (apartId: number) => {
    dispatch(toggleCompare(apartId));
  };

  // Hizmet özelliklerini kontrol eden yardımcı fonksiyon
  const hasService = (apart: ApiApart, serviceName: string): boolean => {
    if (!apart.services || !Array.isArray(apart.services)) return false;
    
    // Servis isimlerinin küçük harfe çevrilmiş hallerini kontrol et
    const lowerServiceName = serviceName.toLowerCase();
    
    // Tüm servis kategorilerini düz bir diziye çevir
    const allServices = apart.services.flatMap((serviceCategory) => {
      return (serviceCategory.service_data && Array.isArray(serviceCategory.service_data)) 
        ? serviceCategory.service_data.map(s => s.toLowerCase())
        : [];
    });
    
    // Servis adının içerip içermediğini kontrol et
    return allServices.some(service => service.includes(lowerServiceName));
  };

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
            
            {/* APARTS */}
            {aparts.map((apart) => (
              <div key={apart.id} className="rounded-lg p-8 -mt-20">
                <div className="flex flex-row justify-between items-center w-full text-lg">
                  <h3 className="text-gray-500">{apart.apart_name}</h3>
                  <FaXmark 
                    className="text-gray-500 h-5 w-5 cursor-pointer mb-10" 
                    onClick={() => handleRemoveApart(apart.id)}
                  />
                </div>
                <div className="relative w-full h-44 mb-4">
                  <Image
                    src={apart.image_thumbnail && apart.image_thumbnail[0] ? apart.image_thumbnail[0] : default_image}
                    alt={`${apart.apart_name} Image`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <ul className="">
                  {hizmetListesi.map((hizmet, hizmetIndex) => {
                    // Fiyat için özel gösterim
                    if (hizmet === "Fiyat") {
                      return (
                        <li
                          key={hizmetIndex}
                          className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                        >
                          <p className="flex items-center justify-center text-md p-2">
                            <span className="font-bold text-gray-700">{apart.price} ₺</span>
                          </p>
                        </li>
                      );
                    }
                    
                    // Yemek hizmeti için özel kontrol
                    if (hizmet === "Yemek hizmeti") {
                      return (
                        <li
                          key={hizmetIndex}
                          className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                        >
                          <p className="flex items-center text-md p-2">
                            <span className="mr-2"></span>{" "}
                            {apart.food ? (
                              <FaCheckCircle className="text-green-500 h-5 w-5 mx-auto" />
                            ) : (
                              <FaXmark className="text-red-500 h-5 w-5 mx-auto" />
                            )}
                          </p>
                        </li>
                      );
                    }
                    
                    // Diğer hizmetler için servis kontrolü
                    return (
                      <li
                        key={hizmetIndex}
                        className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                      >
                        <p className="flex items-center text-md p-2">
                          <span className="mr-2"></span>{" "}
                          {hasService(apart, hizmet) ? (
                            <FaCheckCircle className="text-green-500 h-5 w-5 mx-auto" />
                          ) : (
                            <FaXmark className="text-red-500 h-5 w-5 mx-auto" />
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            
            {/* Boş slotlar için placeholder göster */}
            {[...Array(3 - aparts.length)].map((_, index) => (
              <div key={`empty-${index}`} className="rounded-lg p-8 -mt-20 flex flex-col items-center justify-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-full w-full flex flex-col items-center justify-center p-4">
                  <p className="text-gray-400 text-center">Karşılaştırma için apart ekleyin</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopCompare;
