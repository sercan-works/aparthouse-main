"use client";
import React, { useEffect, useCallback, useRef } from "react";
import Card from "./card/Card";
import { useGetPaginatedApartsQuery } from "@/store/api/apartsApi"; 
import CardPlaceholder from "./ui/CardPlaceholder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetCitiesQuery } from "@/store/api/filterApi";
import { FaXmark } from "react-icons/fa6";
import { 
  setSelectedCity, 
  setSelectedCategory, 
  setSelectedUniversity 
} from "@/store/features/FilterSlice";
import { 
  appendPaginatedAparts, 
  setCurrentPage, 
  setTotalPages, 
  setHasMore, 
  setIsLoadingMore, 
  resetPagination,
  setPaginatedAparts 
} from "@/store/features/ApartSlice";
import Loading from "./ui/Loading";
import { useLanguage } from "@/i18n/context";
import { Switch } from "@heroui/react";
import { loadViewedFromStorage } from "@/store/features/ViewedSlice";
// import MobileCitySelection from "./filter-modal/MobileCitySelection";

interface ClientApartsProps {
  initialCategory?: string;
  initialCity?: string;
  initialUniversity?: string;
}


const ClientAparts = ({ 
  initialCategory,
  initialCity,
  initialUniversity
}: ClientApartsProps) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const observer = useRef<IntersectionObserver | null>(null);
  const currentPageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const isLoadingMoreRef = useRef(false);
  const lastTriggerTime = useRef(0);
  
  // Redux state'leri
  const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
  const selectedCity = useSelector((state: RootState) => state.filter.selectedCity);
  const selectedUniversity = useSelector((state: RootState) => state.filter.selectedUniversity);
  
  // Apart pagination state'leri
  const paginatedAparts = useSelector((state: RootState) => state.apart.paginatedAparts);
  const currentPage = useSelector((state: RootState) => state.apart.currentPage);
  const hasMore = useSelector((state: RootState) => state.apart.hasMore);
  const isLoadingMore = useSelector((state: RootState) => state.apart.isLoadingMore);
  const pageSize = useSelector((state: RootState) => state.apart.pageSize);
  
  // Viewed apartları için Redux state
  const { viewedApartIds, isHydrated: viewedIsHydrated } = useSelector((state: RootState) => state.viewed);
  
  // Toplam apart sayısını tutmak için state
  const [totalApartCount, setTotalApartCount] = React.useState(0);
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  // Görüntülenenleri gizle switch state'i - default false (disable)
  const [hideViewedAparts, setHideViewedAparts] = React.useState(false);

  // Ref'leri güncel tut
  React.useEffect(() => {
    currentPageRef.current = currentPage;
    hasMoreRef.current = hasMore;
    isLoadingMoreRef.current = isLoadingMore;
  }, [currentPage, hasMore, isLoadingMore]);
  
  // İlk yükleme sırasında başlangıç değerlerini Redux store'a ekle
  useEffect(() => {
    if (initialCategory) dispatch(setSelectedCategory(parseInt(initialCategory)));
    if (initialCity) dispatch(setSelectedCity(parseInt(initialCity)));
    if (initialUniversity) dispatch(setSelectedUniversity(parseInt(initialUniversity)));
  }, [dispatch, initialCategory, initialCity, initialUniversity]);

  // Hydration kontrolü ve viewed apartları yükle
  React.useEffect(() => {
    setIsHydrated(true);
    dispatch(loadViewedFromStorage());
  }, [dispatch]);

  // filterApi.ts'te tanımlandığı gibi boş string parametresi kullan
  const { data: cities } = useGetCitiesQuery("");

  // Query parametrelerini hazırla
  const queryParams = React.useMemo(() => {
    const params: Record<string, string | number> = {
      page: currentPage,
      page_size: pageSize,
    };
    
    if (selectedCategory) params.category = selectedCategory;
    if (selectedCity) params.city = selectedCity;
    if (selectedUniversity) params.university = selectedUniversity;
    
    return params;
  }, [currentPage, pageSize, selectedCategory, selectedCity, selectedUniversity]);

  // Paginated data fetch
  const { data: paginatedData, error, isLoading, isFetching } = useGetPaginatedApartsQuery(queryParams);
  
  // Viewed apartları filtrele (eğer switch aktifse)
  const filteredAparts = React.useMemo(() => {
    if (!hideViewedAparts || !viewedIsHydrated) {
      return paginatedAparts;
    }
    return paginatedAparts.filter(apart => !viewedApartIds.includes(apart.id));
  }, [paginatedAparts, hideViewedAparts, viewedApartIds, viewedIsHydrated]);



  // Filtreler değiştiğinde pagination'ı sıfırla
  useEffect(() => {
    dispatch(resetPagination());
    // Ref'leri de sıfırla
    currentPageRef.current = 1;
    hasMoreRef.current = true;
    isLoadingMoreRef.current = false;
    lastTriggerTime.current = 0;
  }, [selectedCategory, selectedCity, selectedUniversity, dispatch]);

  // API'den gelen veriler geldiğinde state'i güncelle
  useEffect(() => {
    if (paginatedData && typeof paginatedData === 'object') {
      setTotalApartCount(paginatedData.count || 0);
      
      const results = Array.isArray(paginatedData.results) ? paginatedData.results : [];
      const currentPageNum = Number(paginatedData.current_page) || 1;
      const totalPagesNum = Number(paginatedData.total_pages) || 1;
      
      if (currentPageNum === 1) {
        dispatch(setPaginatedAparts(results));
      } else {
        dispatch(appendPaginatedAparts(results));
      }
      
      dispatch(setTotalPages(totalPagesNum));
      dispatch(setHasMore(currentPageNum < totalPagesNum));
      dispatch(setIsLoadingMore(false));
    }
  }, [paginatedData, dispatch]);

  // Intersection Observer callback
  const lastApartElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore || !hasMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    if (node) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreRef.current && !isLoadingMoreRef.current) {
            const now = Date.now();
            if (now - lastTriggerTime.current < 1000) return;
            lastTriggerTime.current = now;
            
            dispatch(setIsLoadingMore(true));
            dispatch(setCurrentPage(currentPageRef.current + 1));
          }
        },
        {
          threshold: 0.1,
          rootMargin: '20px'
        }
      );
      
      observer.current.observe(node);
    }
  }, [dispatch, hasMore, isLoadingMore]);

  // Aktif filtreleri kaldır
  const RemoveActiveFilter = (filter: string) => {
    dispatch(setSelectedCategory(null));
    dispatch(setSelectedCity(null));
    dispatch(setSelectedUniversity(null));
    localStorage.removeItem(filter);
  };

  // İlk yükleme durumu veya hydration bekleniyor
  if (!isHydrated || (isLoading && paginatedAparts.length === 0)) {
    return (
      <div className="flex container flex-wrap gap-4 justify-center items-center py-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CardPlaceholder key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-5">
          <p className="font-bold">Hata</p>
        </div>
      )}

      {/* Aktif filtreleri göster */}
      {(selectedCategory || selectedCity || selectedUniversity) && (
        <div className="fixed md:bottom-10 md:right-10 bottom-16 right-2 md:bg-gray-50 p-3 md:p-4 mb-5 rounded-lg z-50 md:shadow-lg bg-opacity-50 max-w-[90vw] md:max-w-xs">
          <p className="font-semibold hidden md:block text-xs md:text-sm">{t('pages.activeFilters')}:</p>
          <div className="flex flex-wrap md:flex-col gap-2 mt-2 opacity-75">
            {selectedCategory && (
              <span 
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-colorFirst rounded-full text-xs text-center cursor-pointer" 
                onClick={() => RemoveActiveFilter("selectedCategory")}
              >
                Kategori <FaXmark className="w-3 h-3 md:w-4 md:h-4 md:text-white text-white cursor-pointer" />
              </span>
            )}
            {selectedCity && (
              <span 
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-colorFirst rounded-full text-xs text-center cursor-pointer" 
                onClick={() => RemoveActiveFilter("selectedCity")}
              >
                {cities?.find((city) => city.id === selectedCity)?.name}
                <FaXmark className="w-3 h-3 md:w-4 md:h-4 md:text-white text-white cursor-pointer" />
              </span>
            )}
            {selectedUniversity && (
              <span 
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-colorFirst rounded-full text-xs text-center cursor-pointer" 
                onClick={() => RemoveActiveFilter("selectedUniversity")}
              >
                Üniversite <FaXmark className="w-3 h-3 md:w-4 md:h-4 md:text-white text-white cursor-pointer" />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Görüntülenenleri gizle-göster switch  */}
      <div className="flex flex-wrap gap-2 justify-end items-center mb-4 w-full">
      <p className="text-sm font-gilroy text-colorFirst">İncelenenleri gizle</p>

        <Switch 
          isSelected={hideViewedAparts}
          onValueChange={setHideViewedAparts}
          color="primary"
          size="sm"
        />
      </div>

      {/* Apart kartları */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {filteredAparts && filteredAparts.length > 0 ? (
          filteredAparts.map((apart, index) => {
            if (filteredAparts.length === index + 1) {
              return (
                <div key={apart.id} ref={lastApartElementRef}>
                  <Card apart={apart} />
                </div>
              );
            } else {
              return <Card key={apart.id} apart={apart} />;
            }
          })
        ) : (
          !isLoading && (
            <div className="text-center py-8">
             <Loading/>
            </div>
          )
        )}
      </div>

      {/* Yükleme durumu */}
      {(isLoadingMore || isFetching) && (
        <div className="flex container flex-wrap gap-4 justify-center items-center py-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardPlaceholder key={`loading-${index}`} />
          ))}
        </div>
      )}

      {/* Sayfa sonuna ulaşıldığında göster */}
      {!hasMore && paginatedAparts.length > 0 && isHydrated && (
        <div className="flex flex-col justify-center items-center mt-8 mb-20 space-y-4">
          {/* Dekoratif çizgi */}
          <div className="flex items-center space-x-4 w-full max-w-md">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-colorFirst to-transparent opacity-50"></div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-colorFirst rounded-full"></div>
              <div className="w-2 h-2 bg-colorFirst rounded-full opacity-60"></div>
              <div className="w-2 h-2 bg-colorFirst rounded-full opacity-30"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-colorFirst to-transparent opacity-50"></div>
          </div>
          
          {/* Ana mesaj */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-colorFirst mb-2">
              {t('pages.endOfPage')}
            </h3>
            <p className="text-gray-600 text-sm">
             {t('pages.totalAparts')} <span className="font-semibold text-colorFirst">{totalApartCount || 0}</span> apart başarıyla gösterildi
            </p>
          </div>
          
          {/* Alt bilgi */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>{t('pages.changeFilters')}</p>
            <p>{t('pages.checkLater')}</p>
          </div>
        </div>
      )}    

      {/* Mobile şehir seçimi modal */}
      {/* <div className="md:hidden">
        <MobileCitySelection />
      </div> */}
    </div>
  );
};

export default ClientAparts; 