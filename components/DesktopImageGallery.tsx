import React, { useState } from 'react'
import Image from 'next/image'
import apart1 from '@/public/assets/apart.jpg'
import { StaticImageData } from 'next/image'

const DesktopImageGallery = () => {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: apart1, alt: 'apart1' });

  const images = [
    { src: apart1, alt: 'apart1' },
    { src: apart1, alt: 'apart2' },
    { src: apart1, alt: 'apart3' },
    { src: apart1, alt: 'apart4' },
    { src: apart1, alt: 'apart5' },
  ];

  const openFullScreen = (image: { src: StaticImageData, alt: string }) => {
    setCurrentImage(image);
    setIsFullScreenOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='col-span-1'>
        <div className="w-full h-full overflow-hidden rounded-xl">
          <Image 
            src={images[0].src} 
            alt={images[0].alt} 
            className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
            onClick={() => openFullScreen(images[0])}
          />
        </div>
      </div>
      <div className='col-span-1'>
        <div className='grid grid-cols-2 gap-4 h-full'>
          <div className='col-span-1'>
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={images[1].src} 
                alt={images[1].alt} 
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(images[1])}
              />
            </div>
          </div>
          <div className='col-span-1'>
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={images[2].src} 
                alt={images[2].alt} 
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(images[2])}
              />
            </div>
          </div>
          <div className='col-span-1'>
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={images[3].src} 
                alt={images[3].alt} 
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(images[3])}
              />
            </div>
          </div>
          <div className='col-span-1'>
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={images[4].src} 
                alt={images[4].alt} 
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(images[4])}
              />
              <div 
                className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center cursor-pointer"
                onClick={() => openFullScreen(images[4])}
              >
                <span className="text-white text-2xl font-medium">+5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Screen Modal */}
      {isFullScreenOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <div className="relative w-full h-[85%] flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white text-4xl z-10 hover:text-gray-300"
              onClick={closeFullScreen}
            >
              &times;
            </button>
            <div className="relative w-[90%] h-[90%]">
              <Image 
                src={currentImage.src} 
                alt={currentImage.alt} 
                className="object-contain w-full h-full"
                layout="fill"
              />
            </div>
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-4 text-white text-5xl hover:text-gray-300"
              onClick={() => {
                const currentIndex = images.findIndex(img => img.alt === currentImage.alt);
                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                setCurrentImage(images[prevIndex]);
              }}
            >
              &#8249;
            </button>
            <button 
              className="absolute right-4 text-white text-5xl hover:text-gray-300"
              onClick={() => {
                const currentIndex = images.findIndex(img => img.alt === currentImage.alt);
                const nextIndex = (currentIndex + 1) % images.length;
                setCurrentImage(images[nextIndex]);
              }}
            >
              &#8250;
            </button>
          </div>
          
          {/* Thumbnails row */}
          <div className="w-full h-[15%] bg-black/80 flex items-center justify-center px-4">
            <div className="flex space-x-4 overflow-x-auto py-2 max-w-full">
              {images.map((img) => (
                <div 
                  key={img.alt}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md cursor-pointer transition-all duration-200 ${
                    currentImage.alt === img.alt ? 'border-2 border-white scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImage(img)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DesktopImageGallery
