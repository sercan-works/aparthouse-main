import Navigation from "./Navigation";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import AnadoluLogo from "@/public/assets/images/au.png";
import EstuLogo from "@/public/assets/images/estu.png";
import OsmangaziLogo from "@/public/assets/images/osmangazi.png";
import HeaderBanner from "./HeaderBanner";
import FilterButton from "../filter-modal/FilterButton";
import SearchBar from "../SearchBar";
import CategoryBar from "../CategoryBar";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUniversity } from '@/store/features/FilterSlice';
import { RootState } from '@/store';
export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  // Redux'dan seçili üniversiteyi al
  const selectedUniversityFromRedux = useSelector((state: RootState) => state.filter.selectedUniversity);
  
  // URL ve Redux'dan gelen değerleri kontrol et (priorite URL'de)
  const selectedUniversity = searchParams.get('university') || selectedUniversityFromRedux?.toString();
  
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);

  // Kategorilerin görüneceği sayfalar
  const noCategoryPaths = ["/"]; 

  const shouldShowCategory = noCategoryPaths.includes(pathname);

  // Seçili üniversite kontrolü için helper fonksiyon
  const getUniversityCardStyle = (universityId: string) => {
    const isSelected = selectedUniversity === universityId;
    if (isSelected) {
      return "bg-blue-50 border-2 border-blue-300 shadow-md hover:shadow-lg";
    }
    return "bg-white border border-gray-100 hover:shadow-md";
  };

  const getUniversityLogoStyle = (universityId: string) => {
    const isSelected = selectedUniversity === universityId;
    if (isSelected) {
      return "ring-2 ring-blue-400 ring-offset-1 transform scale-105";
    }
    return "";
  };

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
            Eskişehir Apartlar ve Yurtlar
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

 
       {/* ÜNİVERSİTELERE GÖRE FİLTRELEYEN HIZLI ERİŞİM LİNKLERİ - SADECE MOBİL */}
       <div className="block md:hidden px-2 py-3 bg-gray-50">
         <div className="flex items-center justify-between px-2 mb-3">
           <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
             Üniversitene yakın apartları keşfet
           </h3>
           {selectedUniversityFromRedux && (
             <button 
               onClick={() => dispatch(setSelectedUniversity(null))}
               className="flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md border border-red-200 transition-colors duration-200"
             >
               <FaXmark className="text-red-600 text-xs"/>
               <span className="text-xs text-red-700 font-medium">Temizle</span>
             </button>
           )}
         </div>
         
         {/* Horizontal Scroll Container */}
         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
                                   {/* Anadolu Üniversitesi */}
            <button 
              onClick={() => dispatch(setSelectedUniversity(1))}
              className="flex-shrink-0 group"
            >
                               <div className={`${getUniversityCardStyle('1')} rounded-xl p-2 shadow-sm transition-all duration-200 group-active:scale-95 w-20 h-20`}>
                  <div className="flex flex-col items-center justify-center gap-1 h-full">
                  {/* Logo Placeholder */}
                                       <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${getUniversityLogoStyle('1')}`}>
                      <Image src={AnadoluLogo} alt="Anadolu Üniversitesi" width={32} height={32} />
                  </div>
                  {/* Üniversite Adı */}
                  <div className="text-center">
                    <p className="text-[10px] font-medium text-gray-800 leading-tight">
                      Anadolu<br/>Üniversitesi
                    </p>
                  </div>
                </div>
              </div>
            </button>

                                   {/* Eskişehir Teknik Üniversitesi */}
            <button 
              onClick={() => dispatch(setSelectedUniversity(2))}
              className="flex-shrink-0 group"
            >
                               <div className={`${getUniversityCardStyle('2')} rounded-xl p-2 shadow-sm transition-all duration-200 group-active:scale-95 w-20 h-20`}>
                  <div className="flex flex-col items-center justify-center gap-1 h-full">
                  {/* Logo Placeholder */}
                                       <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${getUniversityLogoStyle('2')}`}>
                      <Image src={EstuLogo} alt="Eskişehir Teknik Üniversitesi" width={32} height={32} />
                  </div>
                  {/* Üniversite Adı */}
                  <div className="text-center">
                                         <p className="text-[10px] font-medium text-gray-800 leading-tight">
                        Eskişehir<br/>Teknik Ünv.
                      </p>
                  </div>
                </div>
              </div>
            </button>

                                   {/* Eskişehir Osmangazi Üniversitesi */}
            <button 
              onClick={() => dispatch(setSelectedUniversity(3))}
              className="flex-shrink-0 group"
            >
                               <div className={`${getUniversityCardStyle('3')} rounded-xl p-2 shadow-sm transition-all duration-200 group-active:scale-95 w-20 h-20`}>
                  <div className="flex flex-col items-center justify-center gap-1 h-full">
                  {/* Logo Placeholder */}
                                       <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${getUniversityLogoStyle('3')}`}>
                      <Image src={OsmangaziLogo} alt="Osmangazi Üniversitesi" width={32} height={32} />
                  </div>
                  {/* Üniversite Adı */}
                  <div className="text-center">
                                          <p className="text-[10px] font-medium text-gray-800 leading-tight">
                       Osmangazi<br/>Üniversitesi
                      </p>
                  </div>
                </div>
              </div>
            </button>

                       

                         {/* Daha fazla üniversite - Filtre sayfasına yönlendirme */}
             <Link href="/filter" className="flex-shrink-0">
                                               <div className="bg-blue-50 hover:bg-blue-100 rounded-xl p-2 border border-blue-200 w-20 h-20 transition-colors duration-200">
                   <div className="flex flex-col items-center justify-center gap-1 h-full">
                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                     <span className="text-blue-600 font-bold text-sm">+</span>
                   </div>
                   <div className="text-center">
                     <p className="text-[10px] font-medium text-blue-700 leading-tight">
                       Daha<br/>Fazlası
                     </p>
                   </div>
                 </div>
               </div>
             </Link>
         </div>
       </div>
    </header>
  )
}