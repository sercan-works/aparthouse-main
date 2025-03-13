import React, { useState } from 'react'
import Image from 'next/image'
import apart1 from '@/public/assets/apart.jpg'

// String dizisi veya obje dizisi olarak kabul edecek şekilde güncelliyorum
type ImageType = string | { image: string, id?: number };

const DesktopImageGallery = ({ images = [] }: { images?: ImageType[] | string[] }) => {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Resimleri normalize et - ya string[] ya da obje[] olabilir
  const normalizedImages = React.useMemo(() => {
    if (!images || images.length === 0) {
      // Varsayılan resim dizisi
      return [
        { src: apart1, alt: 'apart-default-1' },
        { src: apart1, alt: 'apart-default-2' },
        { src: apart1, alt: 'apart-default-3' },
        { src: apart1, alt: 'apart-default-4' },
        { src: apart1, alt: 'apart-default-5' }
      ];
    }

    return images.map((img, index) => {
      if (typeof img === 'string') {
        return { 
          src: img, 
          alt: `apart-image-${index}` 
        };
      } else if (typeof img === 'object' && img.image) {
        return { 
          src: img.image, 
          alt: `apart-image-${img.id || index}` 
        };
      } else {
        return { 
          src: apart1, 
          alt: `apart-image-${index}` 
        };
      }
    });
  }, [images]);

  const openFullScreen = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullScreenOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Eksik resimleri tamamlamak için varsayılan resim dizisi
  const displayImages = normalizedImages.length >= 5 
    ? normalizedImages 
    : [...normalizedImages, ...Array(5 - normalizedImages.length).fill({ src: apart1, alt: 'default-apart' })];

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='col-span-1'>
        <div className="w-full h-full overflow-hidden rounded-xl">
          <Image 
            src={displayImages[0].src} 
            alt={displayImages[0].alt} 
            width={500}
            height={300}
            className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
            onClick={() => openFullScreen(0)}
          />
        </div>
      </div>
      <div className='col-span-1'>
        <div className='grid grid-cols-2 gap-4 h-full'>
          <div className='col-span-1'>
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={displayImages[1].src}
                alt={displayImages[1].alt}
                width={240}
                height={150}
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(1)}
              />
            </div>
          </div>
          <div className='col-span-1'>
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={displayImages[2].src}
                alt={displayImages[2].alt}
                width={240}
                height={150}
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(2)}
              />
            </div>
          </div>
          <div className='col-span-1'>
            <div className="w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={displayImages[3].src}
                alt={displayImages[3].alt}
                width={240}
                height={150}
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(3)}
              />
            </div>
          </div>
          <div className='col-span-1'>
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <Image 
                src={displayImages[4].src}
                alt={displayImages[4].alt}
                width={240}
                height={150}
                className='w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105' 
                onClick={() => openFullScreen(4)}
              />
              {normalizedImages.length > 5 && (
                <div 
                  className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center cursor-pointer"
                  onClick={() => openFullScreen(4)}
                >
                  <span className="text-white text-2xl font-medium">+{normalizedImages.length - 4}</span>
                </div>
              )}
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
                src={displayImages[currentImageIndex].src}
                alt={displayImages[currentImageIndex].alt}
                className="object-contain w-full h-full"
                fill
              />
            </div>
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-4 text-white text-5xl hover:text-gray-300"
              onClick={() => {
                setCurrentImageIndex((currentImageIndex - 1 + normalizedImages.length) % normalizedImages.length);
              }}
            >
              &#8249;
            </button>
            <button 
              className="absolute right-4 text-white text-5xl hover:text-gray-300"
              onClick={() => {
                setCurrentImageIndex((currentImageIndex + 1) % normalizedImages.length);
              }}
            >
              &#8250;
            </button>
          </div>
          
          {/* Thumbnails row */}
          <div className="w-full h-[15%] bg-black/80 flex items-center justify-center px-4">
            <div className="flex space-x-4 overflow-x-auto py-2 max-w-full">
              {normalizedImages.map((img, index) => (
                <div 
                  key={img.alt}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md cursor-pointer transition-all duration-200 ${
                    currentImageIndex === index ? 'border-2 border-white scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
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
