import React from "react";
import MobileContact from "./MobileContact";
import DesktopContact from "./DesktopContact";

const About = () => {
  return (
    <>
      <div className="block md:hidden">
        <MobileContact />
      </div>
      <div className="hidden md:block">
        <DesktopContact />
      </div>
    </>
  );
};

export default About;
