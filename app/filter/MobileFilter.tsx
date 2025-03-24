"use client";
import React, { useState } from "react";
import { Select, SelectItem, Switch } from "@heroui/react";
import MobileMap from "@/components/maps/MobileMap";
import FilterCard from "@/components/card/FilterCard";
import { useSearchParams } from "next/navigation";
import { useGetFilteredApartsQuery } from "@/store/api/apartsApi";
import Loading from "@/components/ui/Loading";

const MobileFilter = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const searchParams = useSearchParams();
  
  // URL'deki parametreleri al
  const params = Object.fromEntries(searchParams.entries());
  
  // Filtrelenmiş apartları API'den getir
  const { data: filteredAparts, isLoading, error } = useGetFilteredApartsQuery(params);
  
  // Uygulanan filtreleri gösteren chips bileşeni
  const FilterChips = () => {
    // Filtre parametrelerini hazırla
    const filterKeys = Object.keys(params).filter(key => 
      !['price_min', 'price_max'].includes(key)
    );
    
    // Price aralığı için özel durumu kontrol et
    const hasPriceFilter = params.price_min && params.price_max;
    
    if (filterKeys.length === 0 && !hasPriceFilter) return null;

    // Gösterilecek maksimum etiket sayısı
    const maxVisibleChips = 2;
    const extraChipsCount = filterKeys.length + (hasPriceFilter ? 1 : 0) - maxVisibleChips;
    
    return (
      <div className="flex -space-x-16">
        {hasPriceFilter && (
          <div className="p-2 min-w-28 border border-gray-300 bg-white rounded-lg z-50 text-center">
            {params.price_min} ₺ - {params.price_max} ₺
          </div>
        )}
        
        {filterKeys.slice(0, maxVisibleChips - (hasPriceFilter ? 1 : 0)).map((key, index) => (
          <div key={key} className={`p-2 min-w-28 border border-gray-300 bg-white rounded-lg z-${50 - (index + 1) * 10} text-center`}>
            {params[key]}
          </div>
        ))}
        
        {extraChipsCount > 0 && (
          <div className="relative">
            <div className="p-2 z-20 absolute left-16 top-0">
              +{extraChipsCount}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Sonuç sayısını hesapla
  const resultCount = filteredAparts ? filteredAparts.length : 0;
  
  return (
    <div className="flex flex-col max-w-[1250px] mx-5">
      {/* BAŞLIK VE  SIRALAMA*/}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5">
        <h1 className="text-xl font-medium">Filtrelenmiş Sonuçlar</h1>
        <div className="flex items-center w-1/3">
          <Select className="w-full" placeholder="Sıralama" variant="bordered">
            <SelectItem key="1">Artan Fiyat</SelectItem>
            <SelectItem key="2">Azalan Fiyat</SelectItem>
            <SelectItem key="3">En Yeni</SelectItem>
            <SelectItem key="4">En Eski</SelectItem>
            <SelectItem key="5">En Popüler</SelectItem>
          </Select>
        </div>
      </div>

      {/* SONUÇ SAYISI */}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5">
        <p className="text-sm font-medium">
          {isLoading ? "Yükleniyor..." : `${resultCount} sonuç - Fotoğraflı sonuçlar`}
        </p>
      </div>

      {/* FİLTRELENENLER VE KARŞILAŞTIRMA */}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5 text-colorFirst border-colorFirst">
        <div className="text-sm font-medium">
          <FilterChips />
        </div>
        <div className="flex flex-row items-center gap-2 text-sm font-medium">
          <h3 className="text-gray-500">Karşılaştır</h3>
          <Switch 
            defaultSelected={filterVisible}
            isSelected={filterVisible}
            onValueChange={setFilterVisible}
            aria-label="Toggle filters"
            color="primary"
          />
        </div>
      </div>

      {/* HARİTA */}
      <div className="flex flex-col justify-center items-center mt-5">
        <MobileMap />
      </div>

      {/* FİLTRELER */}
      <div className="flex flex-col justify-center items-center mt-5 gap-4 ">
        {isLoading ? (
          <div className="w-full py-10 flex justify-center items-center">
            <Loading />
          </div>
        ) : error ? (
          <div className="w-full py-10 text-center text-red-500">
            <p>Veriler yüklenirken bir hata oluştu.</p>
            <p>Lütfen daha sonra tekrar deneyin.</p>
          </div>
        ) : filteredAparts && filteredAparts.length === 0 ? (
          <div className="w-full py-10 text-center">
            <p className="text-lg">Belirtilen kriterlere uygun sonuç bulunamadı.</p>
            <p className="text-sm text-gray-500 mt-2">Lütfen filtre kriterlerinizi değiştirerek tekrar deneyin.</p>
          </div>
        ) : (
          filteredAparts && filteredAparts.map((apart) => (
            // @ts-expect-error - FilterCard bileşeni apart prop'u bekliyor
            <FilterCard key={apart.id} apart={apart} filterVisible={filterVisible} />
          ))
        )}
        
        {/* Alt boşluk */}
        {!isLoading && filteredAparts && filteredAparts.length > 0 && (
          <div className="w-full h-20 bg-gray-200 rounded-lg"></div>
        )}
      </div>
    </div>
  );
};

export default MobileFilter;
