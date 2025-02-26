import React from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image1.jpeg";
import BannerImage2 from "@/public/assets/images/banner_image_2.jpeg";
import FilterBar from "../FilterBar";
import { usePathname } from "next/navigation";

const bannerConfig = {
  "/": {
    image: BannerImage,
    title: "Aparthouse ile",
    description: "öğrenci evini bulmak çok kolay",
    title2: "",
    description2: "öğrenci evini bulmak çok kolay",
    showFilterBar: true,
    objectPosition: "center 20%"
  },
  "/about": {
    image: BannerImage2,
    title: "Kiralık Daireler",
    description: "size uygun kiralık daireleri keşfedin",
    title2: "Hakkımızda",
    description2:
      "Aparthouse.com.tr'nin sizlere sunduğu ilanlarınızın önce bizim kontrolümüzden geçip, uygun koşullar ile yayınlandığını biliyor muydunuz?",
    showFilterBar: false,
    objectPosition: "center 80%"
  }
};

const HeaderBanner = () => {
  const pathname = usePathname();

  const currentBanner =
    bannerConfig[pathname as keyof typeof bannerConfig] || bannerConfig["/"];

  return (
    <div>
      <div className="w-full h-[250px] relative">
        <Image
          src={currentBanner.image}
          alt="Banner Image"
          fill
          className="object-cover"
          style={{ objectPosition: currentBanner.objectPosition }}
          priority
        />
      </div>

      <div className="relative">
        <div className="absolute -top-28 -left-72 w-full h-full flex flex-col justify-center items-center gap-8">
          {currentBanner.showFilterBar && (
            <>
              <p className="text-2xl font-bold">
                {currentBanner.title}{" "}
                <span className="text-colorFirst font-bold">
                  {currentBanner.description}
                </span>
              </p>
              <div>
                <FilterBar />
              </div>
            </>
          )}

          {!currentBanner.showFilterBar && (
            <div className="flex flex-col justify-start items-start gap-4 max-w-[640px]">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text">
                {currentBanner.title2}
              </h1>
              <p className="text-md text-gray-50 font-medium">{currentBanner.description2}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
