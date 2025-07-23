import React from "react";
import Image from "next/image";
import PinkPhone from "@/public/assets/images/pink-phone.png";
import Link from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/i18n/context";
const ContactBanner = () => {
  const { t } = useLanguage();
  
  // WhatsApp link oluştur (+ işareti olmadan)
  const whatsappLink = "https://wa.me/905326267059";
  
  return (
    <div className="hidden md:block bg-colorFirst py-8">
      <div className="container flex justify-around items-center mx-auto px-4">
        <div className="flex justify-center items-center opacity-50">
          <Image
            src={PinkPhone}
            alt="contact-banner"
            width={250}
            height={200}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-4 text-white text-xl font-bold">
          <h2 className="">{t('contactBanner.title')}</h2>
          
          {/* Telefon Numarası */}
          <div className="text-center mb-2">
            <p className="text-lg">+90 (532) 626 70 59</p>
          </div>
          
          {/* Telefon ve WhatsApp Butonları */}
          <div className="flex gap-4">
            {/* Telefon Butonu */}
            <Link href="tel:+905326267059">
              <div className="flex flex-col justify-center gap-2 px-6 py-3 items-center border-2 border-white rounded-lg hover:bg-white hover:text-colorFirst transition-all duration-200 min-w-[100px]">
                <FaPhone className="text-xl" />
                <span className="text-sm font-normal">
                  {t('contactBanner.callNow')}
                </span>
              </div>
            </Link>
            
            {/* WhatsApp Butonu */}
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col justify-center gap-2 px-6 py-3 items-center border-2 border-white rounded-lg hover:bg-green-500 hover:border-green-500 transition-all duration-200 min-w-[100px]">
                <FaWhatsapp className="text-xl" />
                <span className="text-sm font-normal">
                  {t('contactBanner.whatsapp')}
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center opacity-50">
          <Image
            src={PinkPhone}
            alt="contact-banner"
            width={250}
            height={200}
            className="scale-x-[-1]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
