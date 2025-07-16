import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
      {/* Ana spinner container */}
      <div className="relative">
        {/* Ana spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-colorFirst rounded-full animate-spin"></div>
        
        {/* İç nokta */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-colorFirst rounded-full animate-pulse"></div>
      </div>
      
      {/* Yükleniyor yazısı */}
      <div className="mt-4 flex items-center space-x-1">
        <span className="text-colorFirst font-medium text-sm">Yükleniyor</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-colorFirst rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-colorFirst rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-1 bg-colorFirst rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      {/* Alt dalga animasyonu */}
      <div className="mt-4 flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-8 bg-gradient-to-t from-colorFirst to-colorFirst/30 rounded-full animate-pulse"
            style={{ 
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s',
              transform: `scaleY(${0.3 + (i * 0.2)})`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation; 