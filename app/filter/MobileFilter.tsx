"use client";
import React, { useState } from "react";
import { Select, SelectItem, Switch } from "@heroui/react";
import MobileMap from "@/components/maps/MobileMap";
import FilterCard from "@/components/card/FilterCard";
const MobileFilter = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const handleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };
  return (
    <div className="flex flex-col max-w-[1250px] mx-5">
      {/* BAŞLIK VE  SIRALAMA*/}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5">
        <h1 className="text-xl font-medium">Eskişehir Erkek Apartları</h1>
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
        <p className="text-sm font-medium">125 sonuç - Fotoğraflı sonuçlar</p>
      </div>

      {/* FİLTRELENENLER VE KARŞILAŞTIRMA */}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5 text-colorFirst border-colorFirst">
        <div className="text-sm font-medium">
          <div className="flex -space-x-16">
            <div className="p-2 min-w-28 border border-gray-300 bg-white rounded-lg z-50 text-center gap-2">
             ₺ Kahvaltı
            </div>
            <div className="p-2 border border-gray-300 bg-white rounded-lg z-40">
              -------{" "}
            </div>
            <div className="p-2 border border-gray-300 bg-white rounded-lg z-30">
              -------
            </div>
            <div className="relative">
              <div className="p-2 z-50 absolute left-16 top-0">
                +3
              </div>
            </div>
          </div>
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
        <FilterCard filterVisible={filterVisible} />
        <FilterCard filterVisible={filterVisible} />
        <FilterCard filterVisible={filterVisible} />
        <FilterCard filterVisible={filterVisible} />
        <FilterCard filterVisible={filterVisible} />
        <FilterCard filterVisible={filterVisible} />
        <FilterCard filterVisible={filterVisible} />
        {/* blank card */}
        <div className="w-full h-20 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MobileFilter;
