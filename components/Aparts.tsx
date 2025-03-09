"use client";
import React from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";
import { mockAparts } from "@/data/apart"; // Sadece mockAparts'ı import ediyoruz

const Aparts = () => {
  // RTK Query yerine doğrudan mockAparts verilerini kullanıyoruz
  const apartments = mockAparts;
  console.log("Aparts Data", apartments);

  
  return (
    <div className="flex flex-col justify-center items-center">
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
