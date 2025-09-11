import React from 'react'

const CardPlaceholder = () => {
  return (
    <div className="relative rounded-xl overflow-hidden w-[23rem] h-[22.5rem] sm:w-[360px] sm:h-[360px] md:w-[320px] md:h-[320px] lg:w-[280px] lg:h-[280px] flex justify-center items-center bg-gray-100">
      <div className="w-full h-full p-4 space-y-4 animate-pulse">
        {/* Resim alanı */}
        <div className="h-3/5 w-full bg-gray-200 rounded-lg"></div>
        
        {/* İçerik alanı */}
        <div className="h-2/5 space-y-2">
          <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
          <div className="flex justify-between mt-4">
            <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPlaceholder
