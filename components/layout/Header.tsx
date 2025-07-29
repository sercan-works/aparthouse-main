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
import LanguageSwitcher from "../LanguageSwitcher";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUniversity } from '@/store/features/FilterSlice';
import { RootState } from '@/store';
import { useLanguage } from '@/i18n/context';
export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { t, locale } = useLanguage();
  
  // Redux'dan seçili üniversiteyi al
  const selectedUniversityFromRedux = useSelector((state: RootState) => state.filter.selectedUniversity);
  
  // Sadece Redux state'i kullan
  const selectedUniversity = selectedUniversityFromRedux?.toString();
  
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
          <SearchBar placeholder={t('header.searchPlaceholder')} />
          {pathname === "/filter" && (
            <FilterButton />
          )}
          </div>
          {/* NAVIGATION */}
          <div className="flex items-center gap-4">
            <Navigation />
            <LanguageSwitcher />
          </div>
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
            {t('header.mobileSubtitle')}
          </div>
        </div>
        {/* Find Student Home metni - sadece ana sayfada */}
        {pathname === "/" && (
          <div>
            {(locale === 'en' || locale === 'ru') && (
              <div className="text-center mx-auto mt-2">
                <span className="text-sm text-gray-600 font-semibold">
                  {t('header.findStudentHome')}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 mx-4 max-w-full mt-2">
          {pathname === "/" && (locale === 'en' || locale === 'ru') ? (
            // WhatsApp destek bloğu (İngilizce ve Rusça kullanıcılar için) - sadece ana sayfada
            <div className="w-full">
              <div 
                onClick={() => {
                  const phoneNumber = '905326267059';
                  const message = encodeURIComponent(t('whatsappSupport.message'));
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-95"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">
                      {t('whatsappSupport.title')}
                    </h3>
                    <p className="text-green-100 text-sm opacity-90">
                      {t('whatsappSupport.subtitle')}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                </div>
                
                {/* Alt kısımda buton benzeri görünüm */}
                <div className="mt-3 pt-3 border-t border-green-400 border-opacity-30">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <span>{t('whatsappSupport.buttonText')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Normal arama çubuğu (Türkçe kullanıcılar için veya diğer sayfalar)
            <>
              <div className="w-3/4">
                <SearchBar placeholder={t('header.mobileSearchPlaceholder')} />
              </div>
              <div className="w-1/4">
                <FilterButton />
              </div>
            </>
          )}
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
                     <h2 className="text-sm font-semibold text-gray-800">{t('header.infoTip')}</h2>
                   </div>
                   <p className="text-xs text-gray-600 leading-relaxed">
                     {t('header.infoText')}
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

 
       {/* ÜNİVERSİTELERE GÖRE FİLTRELEYEN HIZLI ERİŞİM LİNKLERİ - SADECE MOBİL VE ANA SAYFA */}
       {pathname === "/" && (
         <div className="block md:hidden px-2 py-3 bg-gray-50">
         <div className="flex items-center justify-between px-2 mb-3">
           <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
             {t('header.universityTitle')}
           </h3>
           {selectedUniversityFromRedux && (
             <button 
               onClick={() => dispatch(setSelectedUniversity(null))}
               className="flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md border border-red-200 transition-colors duration-200"
             >
               <FaXmark className="text-red-600 text-xs"/>
               <span className="text-xs text-red-700 font-medium">{t('header.clear')}</span>
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
                      {t('header.universities.anadolu').split(' ').map((word, i, arr) => (
                        <span key={i}>
                          {word}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </button>

                                   {/* Eskişehir Teknik Üniversitesi */}
            <button 
              onClick={() => dispatch(setSelectedUniversity(4))}
              className="flex-shrink-0 group"
            >
                               <div className={`${getUniversityCardStyle('4')} rounded-xl p-2 shadow-sm transition-all duration-200 group-active:scale-95 w-20 h-20`}>
                  <div className="flex flex-col items-center justify-center gap-1 h-full">
                  {/* Logo Placeholder */}
                                       <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${getUniversityLogoStyle('4')}`}>
                      <Image src={EstuLogo} alt="Eskişehir Teknik Üniversitesi" width={32} height={32} />
                  </div>
                  {/* Üniversite Adı */}
                  <div className="text-center">
                                         <p className="text-[10px] font-medium text-gray-800 leading-tight">
                        {t('header.universities.estu').split(' ').map((word, i, arr) => (
                          <span key={i}>
                            {word}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                  </div>
                </div>
              </div>
            </button>

                                   {/* Eskişehir Osmangazi Üniversitesi */}
            <button 
              onClick={() => dispatch(setSelectedUniversity(2))}
              className="flex-shrink-0 group"
            >
                               <div className={`${getUniversityCardStyle('2')} rounded-xl p-2 shadow-sm transition-all duration-200 group-active:scale-95 w-20 h-20`}>
                  <div className="flex flex-col items-center justify-center gap-1 h-full">
                  {/* Logo Placeholder */}
                                       <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${getUniversityLogoStyle('2')}`}>
                      <Image src={OsmangaziLogo} alt="Osmangazi Üniversitesi" width={32} height={32} />
                  </div>
                  {/* Üniversite Adı */}
                  <div className="text-center">
                                          <p className="text-[10px] font-medium text-gray-800 leading-tight">
                       {t('header.universities.osmangazi').split(' ').map((word, i, arr) => (
                         <span key={i}>
                           {word}
                           {i < arr.length - 1 && <br />}
                         </span>
                       ))}
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
                       {t('header.more')}
                     </p>
                   </div>
                 </div>
               </div>
             </Link>
         </div>
       </div>
       )}


    </header>
  )
}