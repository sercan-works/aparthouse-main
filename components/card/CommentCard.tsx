import React from 'react'
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const CommentCard = () => {
  return (
    <div className="w-full min-h-48 bg-stone-100 rounded-xl p-5">
      <div className="flex flex-col  gap-2">
        <BiSolidQuoteAltLeft className="h-20 w-20 text-colorFirst text-left" />
        <p className="text-gray-500 font-medium min-h-20">
          Henüz yorum yapılmamış.
        </p>
        <h4 className="text-gray-500 font-medium mt-10">
            
        </h4>
      </div>
    </div>
  )
}

export default CommentCard
