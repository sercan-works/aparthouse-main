import React from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import FacebookIcon from "@/public/assets/icons/FacebookIcon.svg";
import TiktokIcon from "@/public/assets/icons/TiktokIcon.svg";
import InstagramIcon from "@/public/assets/icons/InstagramIcon.svg";
import LinkedInIcon from "@/public/assets/icons/LinkedinIcon.svg";
import paymentImage from "@/public/assets/images/payment_logos.png";
import Link from "next/link"; 

const Footer = () => {
  return (
    <div className="bg-gray-50 py-4 md:py-8 font-thin text-gray-600 mb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-start md:ml-20 mb-4 md:mb-8 items-center">
          <Image src={Logo} alt="logo" width={140} height={30} className="w-32 md:w-auto" />
        </div>
        
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-6 md:hidden px-4">
          <div className="flex flex-col gap-2">
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="tel:+905326267059" className="text-gray-600 hover:text-gray-900">
                  +90 532 626 70 59
                </Link>
              </li>
              <li>
                <Link href="mailto:info@aparthouse.com.tr" className="text-gray-600 hover:text-gray-900">
                  info@aparthouse.com.tr
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Büyükdere Mah. Altınçağ Sok. No:17 Odunpazarı/ESKİŞEHİR
                </Link>
              </li>
              <li>
                <Link href="https://business.aparthouse.com.tr/" className="text-gray-600 hover:text-gray-900">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">Konaklamalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Apart
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Yurt
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Pansiyon
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Öğrenci Evi
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">Yasal Bilgiler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gizlilik-politikasi" className="text-gray-600 hover:text-gray-900">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/iptal-ve-iade-kosullari" className="text-gray-600 hover:text-gray-900">
                  İptal ve İade Koşulları
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis-sozlesmesi" className="text-gray-600 hover:text-gray-900">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/kullanici-sozlesmesi" className="text-gray-600 hover:text-gray-900">
                  Kullanıcı Sözleşmesi
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 mb-2">
              <Link href="https://www.instagram.com/aparthouse.com.tr/" className="text-gray-600 hover:text-gray-900">  
                <Image
                  className="cursor-pointer"
                  src={InstagramIcon}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </Link>
              <Image
                className="cursor-pointer"
                src={FacebookIcon}
                alt="Facebook"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={LinkedInIcon}
                alt="LinkedIn"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={TiktokIcon}
                alt="Tiktok"
                width={20}
                height={20}
              />
            </div>
            <p className="text-gray-600 text-sm">Bizi Sosyal Medyada Takip Edin</p>
            <div className="relative w-full h-10 mt-4">
              <Image src={paymentImage} alt="payment" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* Logo ve Şirket Bilgisi */}
          <div className="flex mx-auto flex-col gap-4">
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="tel:+905326267059" className="text-gray-600 hover:text-gray-900">
                  +90 532 626 70 59
                </Link>
              </li>
              <li>
                <Link href="mailto:info@aparthouse.com.tr" className="text-gray-600 hover:text-gray-900">
                  info@aparthouse.com.tr
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                 Büyükdere Mah. Altınçağ Sok. No:17 Odunpazarı/ESKİŞEHİR
                </Link>
              </li>
              <li>
                <Link href="https://business.aparthouse.com.tr/" className="text-gray-600 hover:text-gray-900">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-bold mb-4">Konaklamalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Apart
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Yurt
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Pansiyon
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Öğrenci Evi
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="font-bold mb-4">Yasal Bilgiler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gizlilik-politikasi" className="text-gray-600 hover:text-gray-900">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/iptal-ve-iade-kosullari" className="text-gray-600 hover:text-gray-900">
                  İptal ve İade Koşulları
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis-sozlesmesi" className="text-gray-600 hover:text-gray-900">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/kullanici-sozlesmesi" className="text-gray-600 hover:text-gray-900">
                  Kullanıcı Sözleşmesi
                </Link>
              </li>
            </ul>
          </div>
         
          {/* Sosyal Medya */}
          <div className="gap-4">
            <h3 className="font-bold mb-4 flex items-center gap-4">
              <Link href="https://www.instagram.com/aparthouse.com.tr/" className="text-gray-600 hover:text-gray-900">  
              <Image
                className="cursor-pointer"
                src={InstagramIcon}
                alt="Instagram"
                width={20}
                height={20}
              />
              </Link>
              <Image
                className="cursor-pointer"
                src={FacebookIcon}
                alt="Facebook"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={LinkedInIcon}
                alt="LinkedIn"
                width={20}
                height={20}
              />
              <Image
                className="cursor-pointer"
                src={TiktokIcon}
                alt="Tiktok"
                width={20}
                height={20}
              />
            </h3>
            <p className="text-gray-600">Bizi Sosyal Medyada Takip Edin</p>
            <div className="text-xs md:text-base text-left font-bold cursor-pointer mt-4 text-colorFirst hover:text-colorFirst/80">
             <Link href="/pricing">Fiyatlandırma</Link>
            </div>
            <div className="relative w-full h-10 mt-10">
              <Image src={paymentImage} alt="payment" layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 md:mt-8 px-4">
        <div className="flex justify-center items-center">
          <p className="text-gray-600 text-xs md:text-base text-center">
            &copy; 2025 Aparthouse. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
