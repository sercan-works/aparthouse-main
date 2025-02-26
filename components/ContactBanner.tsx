import React from "react";
import Image from "next/image";
import PinkPhone from "@/public/assets/images/pink-phone.png";
import Link from "next/link";
const ContactBanner = () => {
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
          <h2 className="">İletişim Hattı</h2>
          <Link href="tel:+905326267059"> 
          <p className="flex flex-col justify-center gap-4 px-10 items-center border-2 border-white rounded-lg py-2">
            +90 (532) 626 70 59 <span className="text-xs font-normal text-gray-50">Şimdi Ara</span>
          </p>
        </Link>

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
