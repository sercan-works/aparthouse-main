import React from 'react'

const MobileLoadingPlaceholder = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      {/* Modern Loading Spinner */}
      <div className="relative mb-6">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-colorFirst rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-colorFirst/30 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center space-y-2">
        <p className="text-gray-600 font-medium text-lg">Yükleniyor...</p>
        <p className="text-gray-400 text-sm">Apartmanlar getiriliyor</p>
      </div>
      
      {/* Loading Dots Animation */}
      <div className="flex space-x-2 mt-4">
        <div className="w-2 h-2 bg-colorFirst rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-colorFirst rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-colorFirst rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export default MobileLoadingPlaceholder 