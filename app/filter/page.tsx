import React from "react";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./DesktopFilter";

const About = () => {
  return (
    <>
      <div className="block md:hidden">
        <MobileFilter />
      </div>
      <div className="hidden md:block">
        <DesktopFilter />
      </div>
    </>
  );
};

export default About;
