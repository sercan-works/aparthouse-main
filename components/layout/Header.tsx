import Navigation from "./Navigation";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import HeaderBanner from "./HeaderBanner";
import FilterButton from "../filter-modal/FilterButton";
import SearchBar from "../SearchBar";
import CategoryBar from "../CategoryBar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
export default function Header() {
  const pathname = usePathname();
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);

  // Kategorilerin görüneceği sayfalar
  const noCategoryPaths = ["/"]; 

  const shouldShowCategory = noCategoryPaths.includes(pathname);

  // Bilgi çekmecesi için timer - sadece ana sayfada
  useEffect(() => {
    // Sadece ana sayfada çalış
    if (pathname !== "/") return;
    
    // Test için localStorage'ı temizle
    localStorage.removeItem('infoDrawerShown');
    
    const drawerShown = localStorage.getItem('infoDrawerShown');
    
    if (!drawerShown) {
      // 2 saniye bekle, sonra göster
      const showTimer = setTimeout(() => {
        setShowInfoDrawer(true);
      }, 2000);

      // 12 saniye sonra otomatik kapat (2 saniye açılma + 10 saniye görünme)
      const hideTimer = setTimeout(() => {
        setShowInfoDrawer(false);
        localStorage.setItem('infoDrawerShown', 'true');
      }, 12000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [pathname]);

  return (
    <header className=" mt-5 md:mt-0 md:bg-white md:shadow">
      {/* Anons Bar */}
      {/* TODO: Anons bar yapılacak */}

      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* LOGO */}
          <Link className="flex items-center cursor-pointer" href="/">
              <Image src={Logo} alt="Logo" width={150} height={100} />
          </Link>

          {/* ARAMA BARI */}
          <div className="flex items-center gap-4">
          <SearchBar placeholder="Arama Yap" />
          {pathname === "/filter" && (
            <FilterButton />
          )}
          </div>
          {/* NAVIGATION */}
          <Navigation />
        </div>
      </div>
      <div className="hidden md:block">
        <HeaderBanner />
      </div>

      {/* MOBILE HEADER ARAMA VE FİLTRE ÇUBUĞU*/}
      <div className="block md:hidden overflow-hidden">
        <div className="flex items-center justify-between gap-4 mx-4 max-w-full">
          <Link className="flex items-center cursor-pointer" href="/">
              <Image src={Logo} alt="Logo" width={150} height={100} />
          </Link>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            Eskişehir Apart ve Yurt Rehberi
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mx-4 max-w-full mt-2">
          <div className="w-3/4">
          <SearchBar placeholder="Şehir, Apart Adı ile ara" />

          </div>
          <div className="w-1/4">
          <FilterButton />
          
          </div>
        </div>
                 {/* Bilgi Çekmecesi */}
         {showInfoDrawer && (
           <div 
             className={`mx-4 mt-3 mb-2 transition-all duration-500 ease-in-out transform ${
               showInfoDrawer ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
             }`}
           >
             <div className="bg-primary border border-purple-200 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-opacity-50 relative">
               {/* Hareketli Ok */}
               <div className="absolute -top-4 right-8 z-10">
                 <div className="animate-bounce">
                   <div className="relative">
                     {/* Ok gövdesi */}
                     <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-purple-500 drop-shadow-lg"></div>
                     {/* Ok içi */}
                     <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-purple-300 absolute top-1 left-[3px]"></div>
                     {/* Parlama efekti */}
                     <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                   </div>
                 </div>
               </div>
               
               <div className="flex items-center gap-3">
                 <div className="flex-shrink-0">
                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                     <span className="text-blue-600 text-sm">💡</span>
                   </div>
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                     <h2 className="text-sm font-semibold text-gray-800">İpucu</h2>
                   </div>
                   <p className="text-xs text-gray-600 leading-relaxed">
                     Filtre menüsünden <span className="font-semibold text-blue-700">Üniversite</span> seçerek size en uygun apart ve yurt seçeneklerini daraltabilirsiniz.
                   </p>
                 </div>
                 {/* Kapatma butonu */}
                 <button
                   onClick={() => {
                     setShowInfoDrawer(false);
                     localStorage.setItem('infoDrawerShown', 'true');
                   }}
                   className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors duration-200"
                 >
                   <FaXmark className="text-gray-500 text-sm"/>
                 </button>
               </div>
             </div>
           </div>
         )}


      </div>

      {/* KATEGORİLER */}
      {shouldShowCategory && <CategoryBar />}

    </header>
  )
}