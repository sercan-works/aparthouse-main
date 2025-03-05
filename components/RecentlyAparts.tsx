import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Card from "./card/Card";
import { Button } from "@heroui/react";

const RecentlyAparts = () => {
  return (
    <div className="flex flex-col items-center bg-[#f6f6e1] p-4">
        <div className="w-full container mt-4">
        <h2 className="text-2xl font-bold text-gray-600 ml-6">Son Eklenenler</h2>
        <p className="text-sm text-gray-500 mt-2 ml-6">Son eklenen tüm apartlar, yenilenen özellikler, artan yerleşim imkanları ve daha fazlasını keşfedin.</p>
        </div>

       


      <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex flex-row gap-4">

        <Button className="hidden w-48 md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
          <p className="font-bold ">Daha Fazlasını Gör</p>
          <MdArrowForwardIos className="w-4 h-4 text-colorFirst" />
        </Button>
      </div>
      {/* SAYFA SONUNA ULAŞTINIZ */}
      <div className="flex md:hidden justify-center items-center">
        <Button className="border-colorFirst border-2 mt-4 mb-20 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
          <p className="font-bold ">Sayfa onuna ulaştınız...</p>
        </Button>
      </div>
    </div>
  );
};

export default RecentlyAparts;
