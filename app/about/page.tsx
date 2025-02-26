import RegisterButton from "@/components/helpers/RegisterButton";
import React from "react";
import Image from "next/image";
import AboutImage from "@/public/assets/images/about-image.png";
import Logo from "@/public/assets/logo.png";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import MobileAbout from "./MobileAbout";
import DesktopAbout from "./DesktopAbout";

const About = () => {
  return (
    <>
      <div className="block md:hidden">
        <MobileAbout />
      </div>
      <div className="hidden md:block">
        <DesktopAbout />
      </div>
    </>
  );
};

export default About;
