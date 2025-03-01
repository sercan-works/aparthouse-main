import React from "react";
import Image from "next/image";
import apart_image from "@/public/assets/apart.jpg";
import FavoriteIcon from "@/public/assets/icons/FavoritesIcon.svg";
import { Checkbox, Chip } from "@heroui/react";
import StarReadOnly from "../rating/StarReadOnly";
const FilterCard = ({ filterVisible }: { filterVisible: boolean }) => {
 
  return (
    <div className={`flex flex-row gap-4 items-center w-full bg-white rounded-xl p-4 shadow-sm md:shadow-md cursor-pointer`}>
      {/* IMAGE */}
      <div className="w-[115px] h-[115px] flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={apart_image}
          alt="apart"
          width={300}
          height={200}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* KART BODY */}
      <div className="flex flex-col gap-1 w-full">
        {/* KART BODY HEADER */}
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-medium">Sera Apart</h2>
          <div className="flex flex-row gap-2">
            <Image src={FavoriteIcon} className="cursor-pointer"  alt="favorite" width={20} height={20} />
            {filterVisible && <Checkbox defaultSelected={false} />}
          </div>
        </div>

        {/* KART BODY CONTENT */}
        <div className=" text-xs text-gray-500 overflow-hidden">
          Wifi &bull; Klima &bull; Isıtma Sistemi &bull; Kişisel Banyo &bull;
          Mutfak &bull; Otopark &bull; Balkon &bull; Çamaşırhane &bull; Güvenlik
        </div>

          <div className="flex flex-row gap-2 ">
            <Chip size="sm" className="bg-pink-100 text-pink-300 text-xs">
              Yeni Bina
            </Chip>
            <Chip size="sm" className="bg-green-200 text-green-700 text-xs">
              Engelli Erişimine Uygun
            </Chip>
    
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2">
            <StarReadOnly />
            <h4 className="text-xs font-bold">2.0</h4>
            {/* <p className='text-xs text-gray-500'></p> */}
          </div>
          <div className="text-md font-bold">
            125.000₺/
            <span className="text-xs text-gray-500 font-normal">yıl</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
