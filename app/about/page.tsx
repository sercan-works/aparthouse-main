import React from "react";
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
