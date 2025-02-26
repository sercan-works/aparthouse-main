import React from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import FacebookIcon from "@/public/assets/icons/FacebookIcon.svg";
import TiktokIcon from "@/public/assets/icons/TiktokIcon.svg";
import InstagramIcon from "@/public/assets/icons/InstagramIcon.svg";
import LinkedInIcon from "@/public/assets/icons/LinkedinIcon.svg";

const Footer = () => {
  return (
    <div className="hidden md:block bg-gray-50 py-8 font-thin text-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex ml-20 mb-8 justify-start items-center">
          <Image src={Logo} alt="logo" width={180} height={40} />
        </div>
        <div className="grid  grid-cols-4 gap-8">
          {/* Logo ve Şirket Bilgisi */}
          <div className="flex mx-auto flex-col gap-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  +90 532 626 70 59
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  info@aparthouse.com.tr
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Bize Mesaj Gönderin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  İş Ortaklığı
                </a>
              </li>
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-bold mb-4">Konaklamalar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Apart
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Yurt
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Pansiyon
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Öğrenci Evi
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="font-bold mb-4">Şehirler</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Eskişehir</li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div className="gap-4">
            <h3 className="font-bold mb-4 flex items-center gap-4">
              <Image
                className="cursor-pointer"
                src={InstagramIcon}
                alt="Instagram"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={FacebookIcon}
                alt="Instagram"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={LinkedInIcon}
                alt="Instagram"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={TiktokIcon}
                alt="Instagram"
                width={20}
                height={20}
              />
            </h3>
            <p className="text-gray-600">Bizi Sosyal Medyada Takip Edin</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 px-4">
        <div className="flex justify-center items-center">
          <p className="text-gray-600">
            &copy; 2025 Aparthouse. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
