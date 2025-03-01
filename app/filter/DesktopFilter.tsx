"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem, Switch } from "@heroui/react";
import FilterCard from "@/components/card/FilterCard";

const DesktopFilter = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Add useEffect for scroll listener with max scroll limit
  useEffect(() => {
    const handleScroll = () => {
      const listingElement = document.querySelector('.listing-column');
      if (!listingElement) return;

      const listingHeight = listingElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = listingHeight - viewportHeight;
      
      // Limit scroll offset to the maximum possible scroll
      const newScrollOffset = Math.min(window.scrollY, maxScroll);
      setScrollOffset(newScrollOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className=" justify-center mx-auto  max-w-6xl my-10 overflow-x-hidden gap-10 grid grid-cols-2">
      {/* HARİTA */}
      {/* <div className="w-1/2 bg-colorFirst h-[calc(100vh-10rem)] fixed top-50 left-5 ml-4 lg:ml-auto max-w-[calc(50%-2.5rem)]">HARİTA</div> */}
      <div className={`col-span-1 bg-colorFirst h-[calc(100vh-10rem)] w-full ml-4 lg:ml-auto transition-all duration-300 rounded-xl`} 
           style={{ marginTop: `${scrollOffset}px` }}>
        HARİTA
      </div>

      {/* FİLTRELER */}
      <div className="col-span-1 flex flex-col listing-column">
        {/* başlık ve karşılaştır */}
        <div className="flex flex-row justify-between items-center gap-2">
          <h1 className="text-xl font-medium">Eskişehir Erkek Apartları</h1>
          <div className="flex flex-row items-center gap-2 text-sm font-medium">
            <h3 className="text-gray-500">Karşılaştır</h3>
            <Switch
              defaultSelected={filterVisible}
              isSelected={filterVisible}
              onValueChange={handleFilterVisible}
              aria-label="Toggle filters"
              color="primary"
              size="sm"
            />
          </div>
        </div>
        {/* SONUÇ SAYISI */}
        <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-1 text-gray-500">
          <p className="text-sm font-medium">125 sonuç - Fotoğraflı sonuçlar</p>
        </div>

        <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5 text-colorFirst border-colorFirst">
          <div className="text-sm font-medium overflow-hidden">
            <div className="flex gap-2 ">
              <div className="px-2 py-1 border border-gray-300 bg-white rounded-lg z-50 text-center gap-2">
                ₺ Kahvaltı
              </div>
              <div className="px-2 py-1 border border-gray-300 bg-white rounded-lg z-50 text-center gap-2">
                ₺ Asansör
              </div>

            </div>
          </div>
          <div className="flex justify-end w-1/2">
            <Select className="w-1/2" placeholder="Sıralama" variant="bordered">
              <SelectItem key="1">Artan Fiyat</SelectItem>
              <SelectItem key="2">Azalan Fiyat</SelectItem>
              <SelectItem key="3">En Yeni</SelectItem>
              <SelectItem key="4">En Eski</SelectItem>
              <SelectItem key="5">En Popüler</SelectItem>
            </Select>
          </div>
        
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
    </div>
  );
};

export default DesktopFilter;
