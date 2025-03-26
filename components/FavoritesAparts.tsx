import React from 'react'
import Card from './card/Card'
import { Button } from '@heroui/react'
import { MdArrowForwardIos, MdCompareArrows } from 'react-icons/md'

const FavoritesAparts = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap gap-4 justify-center items-center">
  
        <Card />

      </div>
      <div className="flex flex-row gap-4">
      <Button className="hidden w-48 md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
      <MdCompareArrows className="md:w-5 md:h-5 text-colorFirst"  />
        <p className="font-bold ">Karşılaştır</p>
      </Button>
      <Button className="hidden w-48 md:flex border-colorFirst border-2 my-4 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
        <p className="font-bold ">Daha Fazlasını Gör</p>
        <MdArrowForwardIos className="w-4 h-4 text-colorFirst"  />
      </Button>
      </div>
      {/* SAYFA SONUNA ULAŞTINIZ */}
      <div className="flex md:hidden justify-center items-center">
        <Button className="border-colorFirst border-2 mt-4 mb-20 mx-auto text-colorFirst  justify-center items-center bg-opacity-0">
          <p className="font-bold ">Sayfa onuna ulaştınız...</p>
        </Button>
      </div>
    </div>
  )
}

export default FavoritesAparts
