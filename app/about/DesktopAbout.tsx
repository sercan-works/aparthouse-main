import RegisterButton from "@/components/helpers/RegisterButton";
import React from "react";
import Image from "next/image";
import AboutImage from "@/public/assets/images/about-image.png";
import Logo from "@/public/assets/logo.png";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";

const DesktopAbout = () => {
  return (
    <div className="flex flex-row mx-4 lg:mx-auto max-w-7xl my-10 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-40">
        <Image src={BannerImage} alt="about" fill className="object-cover brightness-50" />
        <div className="relative">
        <div className="absolute top-36 left-32 z-10 font-bold">
          <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-4xl ">
            Hakkımızda
          </h1>
          <p className="text-white text-sm mt-5 font-normal">
            Aparthouse.com.tr’ın sizlere sunduğu ilanların <br /> önce bizim
            kontrolümüzden geçip,
             uygun koşullar ile yayınlandığını biliyor muydunuz?
          </p>
        </div>
        </div>
      </div>
<div className="flex flex-row justify-between items-center " >
      <div className="flex flex-col mt-64 mb-10 mx-2 w-2/3">
        <div className=" flex flex-col ">
          <h1 className="text-xl font-semibold text-start  bg-clip-text">
            Öğrenci yolculuğunu anlıyoruz, çünkü biz de bu süreci yaşadık...
          </h1>
          <div className="my-10">
            <div className="">
              {" "}
              Aparthouse.com.tr, uluslararası veya yerel öğrenci konutları için
              yardımcı olur. 2024 yılında kurulduğundan beri, tecrübeli ekibimiz
              ile binlerce öğrencinin evini bulmasına yardımcı olmaktayız.
              <br />
              <br />
              Öğrenciler için özel olarak inşa edilmiş ve yönetilen en geniş ve
              özenle seçilmiş apart yelpazesine sahibiz. Bu, farklı üniversite
              yakınlarında çeşitli apartları keşfetmenizi ve karşılaştırmanızı
              sağlar, böylece doğru seçimi yapabilirsiniz.
            </div>

          

            <div>
                <br/>
              Doğru apartı seçmek, güvenli ve ilham verici bir temel sağlar.
              Büyümenize ve yolculuğunuzdan en iyi şekilde yararlanmanıza
              yardımcı olur.
            </div>
          </div>
        </div>
        <RegisterButton />
      </div>
      <div className="w-1/3 mt-52 gap-4 flex flex-col items-center mx-auto">
      <Image src={Logo} alt="logo" width={200} height={100} />

            <Image src={AboutImage} alt="about" width={490} height={356} />
              
     </div>
     </div>
    </div>
  );
};

export default DesktopAbout;
