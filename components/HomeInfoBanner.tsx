import React from "react";
import Image from "next/image";
import Image1 from "@/public/assets/images/info_banner_1.png";
import Image2 from "@/public/assets/images/info_banner_2.png";
const HomeInfoBanner = () => {
  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-[#FFF4D1] py-8">
      <div className="container flex flex-col justify-center items-center mx-auto px-4">
        <h2 className="text-2xl font-medium">
          Size En uygun barınma imkanını bulmada yardımcı oluyoruz.
        </h2>
        <p className="text-gray-500 text-justify">
          Güvenlik, fiyat, barınma imkanlarında üst düzey ve memnuniyet içeren
          apartları ve yurtları sizler için listeliyor, güncel tutuyoruz.
        </p>
      </div>

      <div className="flex flex-row justify-center items-center gap-20 py-8">
        <div className="flex flex-col justify-center items-center max-w-xs gap-4">
          <Image src={Image1} width={120} height={120} alt="home-info-banner" />
          <h3 className="text-md font-medium">Gelişmiş Sonuçlar</h3>
          <p className="text-gray-500 text-sm text-justify">
            Güvenlik, fiyat, barınma imkanlarında üst düzey ve memnuniyet içeren
            apartları ve yurtları sizler için listeliyor, güncel tutuyoruz.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center max-w-xs gap-4">
          <Image src={Image2} width={120} height={120} alt="home-info-banner" />
          <h3 className="text-md font-medium">Bütçe dostu konaklamalar</h3>
          <p className="text-gray-500 text-sm text-justify">
            Güvenlik, fiyat, barınma imkanlarında üst düzey ve memnuniyet içeren
            apartları ve yurtları sizler için listeliyor, güncel tutuyoruz.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center max-w-xs gap-4">
          <Image src={Image1} width={120} height={120} alt="home-info-banner" />
          <h3 className="text-md font-medium">Uluslararası kapsama</h3>
          <p className="text-gray-500 text-sm text-justify">
            Güvenlik, fiyat, barınma imkanlarında üst düzey ve memnuniyet içeren
            apartları ve yurtları sizler için listeliyor, güncel tutuyoruz.
          </p>
        </div>
      </div>

    </div>
  );
};

export default HomeInfoBanner;
