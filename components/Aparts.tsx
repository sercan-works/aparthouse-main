"use client";
import React from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";
const Aparts = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Button className="hidden md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
        <p className="font-bold ">Daha Fazlasını Gör</p>
      </Button>

      {/* SAYFA SONUNA ULAŞTINIZ */}
      <div className="flex md:hidden justify-center items-center">
        <Button className="border-colorFirst border-2 mt-4 mb-20 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
          <p className="font-bold ">Sayfa onuna ulaştınız...</p>
        </Button>
      </div>
    </div>
  );
};

export default Aparts;
