import React from "react";
import Image from "next/image";
import Image1 from "@/public/assets/images/info_banner_1.png";
import Image2 from "@/public/assets/images/info_banner_2.png";
import { useLanguage } from "@/i18n/context";
const HomeInfoBanner = () => {
  const { t } = useLanguage();
  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-[#FFF4D1] py-8">
      <div className="container flex flex-col justify-center items-center mx-auto px-4">
        <h2 className="text-2xl font-medium">
          {t('homeInfoBanner.title')}
        </h2>
        <p className="text-gray-500 text-justify">
          {t('homeInfoBanner.description')}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center gap-20 py-8">
        <div className="flex flex-col justify-center items-center max-w-xs gap-4">
          <Image src={Image1} width={120} height={120} alt="home-info-banner" />
          <h3 className="text-md font-medium">{t('homeInfoBanner.title1')}</h3>
          <p className="text-gray-500 text-sm text-justify">
            {t('homeInfoBanner.description1')}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center max-w-xs gap-4">
          <Image src={Image2} width={120} height={120} alt="home-info-banner" />
          <h3 className="text-md font-medium">{t('homeInfoBanner.title2')}</h3>
          <p className="text-gray-500 text-sm text-justify">
            {t('homeInfoBanner.description2')}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center max-w-xs gap-4">
          <Image src={Image1} width={120} height={120} alt="home-info-banner" />
          <h3 className="text-md font-medium">{t('homeInfoBanner.title3')}</h3>
          <p className="text-gray-500 text-sm text-justify">
            {t('homeInfoBanner.description3')}
          </p>
        </div>
      </div>

    </div>
  );
};

export default HomeInfoBanner;
