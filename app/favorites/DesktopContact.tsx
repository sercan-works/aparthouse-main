import React from "react";
import Image from "next/image";
import AboutImage from "@/public/assets/images/pink-phone.png";
import Logo from "@/public/assets/logo.png";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import AMPButton from "@/components/helpers/AMPButton";
import ContactForm from "@/components/helpers/ContactForm";

const DesktopAbout = () => {
  return (
    <>
      <div className="flex flex-row mx-4 lg:mx-auto max-w-7xl my-10 overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] -z-40">
          <Image
            src={BannerImage}
            alt="about"
            fill
            className="object-cover brightness-50 -z-40"
          />
          <div className="relative h-full">
            <div className="absolute top-36 left-32">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-4xl select-text">
                    Bize Ulaşın
                  </h1>
                  <p className="text-white text-sm mt-5 font-normal select-text">
                    Aparthouse.com.tr&apos;ın sizlere sunduğu ilanların <br />{" "}
                    önce bizim kontrolümüzden geçip, uygun koşullar ile
                    yayınlandığını biliyor muydunuz?
                  </p>
                </div>
                <div className="relative flex flex-col justify-end items-end left-96">
                  <div className="relative z-50">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-56 mb-10 mx-2">
          <div className=" flex flex-col ">
            <h1 className="text-4xl font-normal text-start  bg-clip-text">
              Konaklamanız mı var?
            </h1>
            <div className="my-5">
              <div className="flex flex-row gap-4 w-full">
                <div className="w-1/2 text-lg font-normal gap-4 flex flex-col">
                  {" "}
                  <p className="text-lg font-normal">
                    Aparthouse ile konaklamanızı yayınlayın,yüzlerce öğrenci ile
                    buluşun.
                  </p>
                  <h2 className="text-2xl font-normal ">E-posta Adresimiz</h2>
                  <p className="text-lg font-normal">
                    {process.env.APARTHOUSE_EMAIL}
                  </p>
                  <h2 className="text-2xl font-normal">Telefonlarımız</h2>
                  <p className="text-lg font-normal">
                    {process.env.APARTHOUSE_PHONE}
                  </p>
                </div>

                <div className="absolute right-24 top-64 w-1/2 mt-20 gap-4 flex flex-col items-center">
                  <Image
                    src={AboutImage}
                    alt="about"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
          <AMPButton />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10 mx-4 lg:mx-auto w-full bg-zinc-900 text-gray-50">
        <div className="flex flex-col gap-4 px-32 py-48">
          <h2 className="text-4xl font-bold">Sorularınız mı<br/> var?</h2>
          <p className="text-lg font-normal text-start">
          İletişime geçtiğiniz için teşekkür ederiz!<br/>
          Lütfen talep formunu doldurun.<br/>
          İyi günler!
          </p>
        </div>
        <div className="flex flex-col gap-4 px-32 py-20">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default DesktopAbout;
