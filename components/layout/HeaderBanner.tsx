import React from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image1.jpeg";
import FilterBar from "../FilterBar";
import { usePathname } from "next/navigation";

const HeaderBanner = () => {
  const pathname = usePathname();

  const noBannerPaths = ["/about", "/contact", "/favorites", "/filter", "/detail", "/compare","/pricing"];

  const shouldShowBanner = !noBannerPaths.includes(pathname);
  return (
    <div>
      {shouldShowBanner && (
        <>
        <div className="w-full h-[250px] relative">
          <Image
            src={BannerImage}
            alt="Banner Image"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
 

      <div className="relative">
        <div className="absolute -top-28 -left-72 w-full h-full flex flex-col justify-center items-center gap-8">
          <p className="text-2xl font-bold">
            Aparthouse ile <span className="text-colorFirst font-bold">öğrenci evini bulmak çok kolay</span>
          </p>

          <div>
            <FilterBar />
          </div>
        </div>
      </div>
      </> )}
    </div>


  );
};

export default HeaderBanner;
