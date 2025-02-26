import RegisterButton from "@/components/helpers/RegisterButton";
import React from "react";
import Image from "next/image";
import AboutImage from "@/public/assets/images/about-image.png";
import Logo from "@/public/assets/logo.png";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";

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
          <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-4xl ">
            Hakkımızda
          </h1>
          <p className="text-white text-xs mt-5 font-normal">
            Aparthouse.com.tr’ın sizlere sunduğu ilanların <br /> önce bizim
            kontrolümüzden geçip,
            <br /> uygun koşullar ile yayınlandığını biliyor muydunuz?
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-40 mb-10 mx-2">
        <div className=" flex flex-col ">
          <h1 className="text-xl font-semibold text-start  bg-clip-text">
            Öğrenci yolculuğunu anlıyoruz, çünkü biz de bu süreci yaşadık...
          </h1>
          <div className="my-10">
            <div className="flex flex-row gap-4">
              <div className="w-2/3">
                {" "}
                Aparthouse.com.tr, uluslararası veya yerel öğrenci konutları
                için yardımcı olur. 2024 yılında kurulduğundan beri, tecrübeli
                ekibimiz ile binlerce öğrencinin evini bulmasına yardımcı
                olmaktayız.
                <br />
                <br />
                Öğrenciler için özel olarak inşa edilmiş ve yönetilen en geniş
                ve özenle seçilmiş apart yelpazesine sahibiz. Bu, farklı
                üniversite yakınlarında çeşitli apartları keşfetmenizi ve
                karşılaştırmanızı sağlar, böylece doğru seçimi yapabilirsiniz.
              </div>

              <div className="w-1/3 mt-20 gap-4 flex flex-col items-center">
                <Image src={AboutImage} alt="about" width={700} height={700} />
                <Image src={Logo} alt="logo" width={200} height={100} />
              </div>
            </div>

            <div>
              <br />
              Doğru apartı seçmek, güvenli ve ilham verici bir temel sağlar.
              Büyümenize ve yolculuğunuzdan en iyi şekilde yararlanmanıza
              yardımcı olur.
            </div>
          </div>
        </div>
        <RegisterButton />
      </div>
    </div>
  );
};

export default MobileAbout;
