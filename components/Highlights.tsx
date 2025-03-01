import React from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";

const Highlights = () => {
  return (
    <div className="hidden md:flex flex-col md:flex-row justify-center items-center py-8 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-colorFirst font-bold mb-5 mx-10">Öne Çıkanlar</h2>
        <div className="flex flex-wrap gap-4 my-4 justify-center items-center">
          <Card />
          <Card />
          <Card />
          <Card />
      
        </div>
        <Button className="border-colorFirst border-2 mx-auto text-colorFirst flex justify-center items-center bg-opacity-0">
                  <p className="font-bold ">Daha Fazlasını Gör</p>
        </Button>
      </div>
    </div>
  );
};

export default Highlights;
