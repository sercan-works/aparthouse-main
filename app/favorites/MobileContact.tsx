import React from "react";
import Image from "next/image";
import AboutImage from "@/public/assets/images/pink-phone.png";
import Logo from "@/public/assets/logo.png";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import AMPButton from "@/components/helpers/AMPButton";

const MobileAbout = () => {
  return (
    <div className="flex flex-row mx-auto max-w-[1250px] my-10">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-40">
        <Image
          src={BannerImage}
          alt="about"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute top-36 left-5 w-[90%] z-10 font-bold">
          <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-2xl ">
            Bize Ulaşın
          </h1>
          <p className="text-white text-xs mt-4 font-normal">
            Aparthouse.com.tr&apos;ın sizlere sunduğu ilanların <br /> önce bizim
            kontrolümüzden geçip,
            <br /> uygun koşullar ile yayınlandığını biliyor muydunuz?
          </p>
          {/* <div className="mt-4">
            <AMPButton />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col mt-48 mb-10 mx-2">
        <div className=" flex flex-col ">
          <h1 className="text-xl font-normal text-start  bg-clip-text">
            Konaklamanız mı var?
          </h1>
          <div className="my-5">
            <div className="flex flex-row gap-4">
              <div className="w-1/2 text-sm font-normal gap-4 flex flex-col">
                {" "}
                <p className="text-sm font-normal">
                  Aparthouse ile konaklamanızı yayınlayın,yüzlerce öğrenci ile buluşun.
                </p>
          
                <h2 className="text-lg font-normal ">
                  E-posta Adresimiz
                </h2>
                <p className="text-sm font-normal">
                  {process.env.APARTHOUSE_EMAIL}
                </p>
                <h2 className="text-lg font-normal">
                  Telefonlarımız
                </h2>
                <p className="text-sm font-normal">
                  {process.env.APARTHOUSE_PHONE}
                </p>
        
              </div>

              <div className="w-1/2 mt-20 gap-4 flex flex-col items-center">
                <Image src={AboutImage} alt="about" width={700} height={700} />
              </div>
            </div>

            
          </div>
        </div>
        <AMPButton />
        
        
     
      </div>
    </div>
  );
};

export default MobileAbout;
