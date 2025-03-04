"use client";
import React from "react";
import Card from "./card/Card";
import { Button } from "@heroui/react";
const SimilarAparts = () => {
  return (
    <div className="hidden md:block py-8 container mx-auto mb-10">
      <h2 className="text-xl text-gray-500 font-bold my-5 px-4">Benzer Apart İlanları</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="flex justify-center mt-6">
        <Button className="border-colorFirst border-2 text-colorFirst flex justify-center items-center bg-opacity-0">
          <p className="font-bold">Daha Fazlasını Gör</p>
        </Button>
      </div>
    </div>
  );
};

export default SimilarAparts;
