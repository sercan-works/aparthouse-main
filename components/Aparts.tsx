"use client";
import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";
import { useGetApartsQuery } from "@/store/api/apartsApi"; 
import CardPlaceholder from "./ui/CardPlaceholder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetCitiesQuery } from "@/store/api/filterApi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { setSelectedCity, setSelectedCategory, setSelectedUniversity } from "@/store/features/FilterSlice";

const Aparts = () => {
  const dispatch = useDispatch();
  // Redux store'dan seçilen filtreleri al
  const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
  const selectedCity = useSelector((state: RootState) => state.filter.selectedCity);
  const selectedUniversity = useSelector((state: RootState) => state.filter.selectedUniversity);
  
  const { data: cities } = useGetCitiesQuery(selectedCity || undefined);

  // Parametreler için boş bir nesne oluştur
  const queryParams: Record<string, string> = {};
  
  // Seçili değerler varsa parametrelere ekle
  if (selectedCategory) queryParams.category = selectedCategory.toString();
  if (selectedCity) queryParams.city = selectedCity.toString();
  if (selectedUniversity) queryParams.university = selectedUniversity.toString();
  
  // Tüm seçili filtreleri kullanarak API'yi çağır
  const { data: apiAparts, error, isLoading } = useGetApartsQuery(queryParams);
  

  // Yükleme durumunu kontrol et
  if (isLoading) {
    return (
      <div className="flex container flex-wrap gap-4 justify-center items-center py-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardPlaceholder key={index} />
          ))}
      </div>
    );
  }

  // API'den gelen veriyi kullan, hata varsa mock data'yı göster
  const apartments = error ? null : (apiAparts || []);
  
  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-5">
          <p className="font-bold">API Bağlantı Hatası</p>
          <p>API bağlantısı sırasında bir hata oluştu. Demo veriler gösteriliyor.</p>
          <p className="text-xs mt-1">Geliştirici için: Konsola bakın veya API endpoint&apos;i kontrol edin.</p>
        </div>
      )}
      
      {/* Aktif filtreleri göster */}
      {(selectedCategory || selectedCity || selectedUniversity) && (
        <div className="fixed bottom-10 right-10 bg-colorFirst p-4 mb-5 rounded-lg z-50 shadow-lg bg-opacity-50">
          <p className="font-semibold text-sm">Aktif Filtreler:</p>
          <div className="flex flex-col gap-2 mt-2">
            {selectedCategory && <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs text-center cursor-pointer" onClick={() => dispatch(setSelectedCategory(null))}>Kategori <FaXmark className="w-4 h-4 text-colorFirst cursor-pointer" /></span>}
            {selectedCity && <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs text-center cursor-pointer" onClick={() => dispatch(setSelectedCity(null))}>{cities?.find((city) => city.id === selectedCity)?.name}<FaXmark className="w-4 h-4 text-colorFirst cursor-pointer" /></span>}
            {selectedUniversity && <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs text-center cursor-pointer" onClick={() => dispatch(setSelectedUniversity(null))}>Üniversite <FaXmark className="w-4 h-4 text-colorFirst cursor-pointer" /></span>}
            {/* {selectedCategory && <span className="px-3 py-1 bg-white rounded-full text-sm">Kategori: {selectedCategory}</span>}
            {selectedCity && <span className="px-3 py-1 bg-white rounded-full text-sm">Şehir: {selectedCity}</span>}
            {selectedUniversity && <span className="px-3 py-1 bg-white rounded-full text-sm">Üniversite: {selectedUniversity}</span>} */}
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {apartments && apartments.length > 0 ? (
          apartments.map((apart) => (
            <Card 
              key={apart.id}
              apart={apart}
            />
          ))
        ) : (
          // Veri yoksa
          <div className="text-center py-8">Hiç apart bulunamadı.</div>
        )}
      </div>
      
      {apartments && apartments.length > 0 && (
        <>
          <Button className="hidden md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
            <p className="font-bold">Daha Fazlasını Gör</p>
          </Button>

          {/* SAYFA SONUNA ULAŞTINIZ */}
          <div className="flex md:hidden justify-center items-center">
            <Button className="border-colorFirst border-2 mt-4 mb-20 mx-auto text-colorFirst justify-center items-center bg-opacity-0">
              <p className="font-bold">Sayfa sonuna ulaştınız...</p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Aparts;
