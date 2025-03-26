"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@heroui/react";
import FilterCard from "@/components/card/FilterCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetFilteredApartsQuery } from "@/store/api/apartsApi";
import { 
  useGetCitiesQuery, 
  useGetUniversitiesQuery, 
  useGetCategoriesQuery,
  useGetFiltersQuery
} from "@/store/api/filterApi";
import Loading from "@/components/ui/Loading";

const DesktopFilter = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL'deki parametreleri al
  const params = Object.fromEntries(searchParams.entries());
  
  // API'den filtreleri çek
  const { data: cities = [] } = useGetCitiesQuery();
  const { data: universities = [] } = useGetUniversitiesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: filters = [] } = useGetFiltersQuery();
  
  // Filtrelenmiş apartları API'den getir
  const { data: filteredAparts, isLoading, error } = useGetFilteredApartsQuery(params);

  // Sonuç sayısını hesapla
  const resultCount = filteredAparts ? filteredAparts.length : 0;

  // Sıralama işlemi için handler fonksiyonu
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Mevcut URL parametrelerini al
    const currentParams = new URLSearchParams(searchParams.toString());
    
    // Ordering parametresini ekle - seçilen değeri al
    if (e.target.value) {
      currentParams.set('ordering', e.target.value);
    }
    
    // URL'yi güncelle
    router.push(`/filter?${currentParams.toString()}`, { scroll: false });
  };

  // Add useEffect for scroll listener with max scroll limit
  useEffect(() => {
    const handleScroll = () => {
      const listingElement = document.querySelector('.listing-column');
      if (!listingElement) return;

      const listingHeight = listingElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = listingHeight - viewportHeight;
      
      // Limit scroll offset to the maximum possible scroll
      const newScrollOffset = Math.min(window.scrollY, maxScroll);
      setScrollOffset(newScrollOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };

  // Filtre değerlerini öğelerin ID'sine göre bulmak için yardımcı fonksiyon
  const getFilterDisplayValue = (key: string, value: string): string => {
    // Önce anahtara göre hangi filtre tipini kullanacağımızı belirle
    switch (key) {
      case 'city':
        return cities.find(city => city.id.toString() === value)?.name || value;
      
      case 'university':
        return universities.find(uni => uni.id.toString() === value)?.name || `Üniversite: ${value}`;
      
      case 'category':
        return categories.find(cat => cat.id.toString() === value)?.name || value;
      
      case 'gender':
        // Cinsiyet için manuel dönüşüm
        return value === 'E' ? 'Erkek' : value === 'K' ? 'Kadın' : value === 'K+E' ? 'Karışık' : value;
      
      default:
        // Diğer filtreler için güvenli kontrol
        try {
          // Önce filters'in dizi olup olmadığını kontrol et
          if (Array.isArray(filters) && filters.length > 0) {
            const filter = filters.find(f => f.id.toString() === value);
            if (filter && filter.name) return filter.name;
          }
          // Eğer filters dizi değilse veya filtre bulunamazsa, değeri doğrudan döndür
          return value;
        } catch (error) {
          console.error('Filtre çözümleme hatası:', error);
          return value; // Hata durumunda değeri olduğu gibi döndür
        }
    }
  };

  // Uygulanan filtreleri gösteren chips bileşeni
  const FilterChips = () => {
    // Filtre parametrelerini hazırla
    const filterKeys = Object.keys(params).filter(key => 
      !['price_min', 'price_max', 'ordering'].includes(key)
    );
    
    // Price aralığı için özel durumu kontrol et
    const hasPriceFilter = params.price_min && params.price_max;
    
    if (filterKeys.length === 0 && !hasPriceFilter) return null;
    
    // Filtre chip'ini kaldırmak için fonksiyon
    const removeFilter = (key: string, specificValue?: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      
      if (key === 'price_filter') {
        // Fiyat filtresini kaldır
        currentParams.delete('price_min');
        currentParams.delete('price_max');
      } else if (specificValue) {
        // Virgülle ayrılmış değerlerden biri kaldırılıyorsa
        const values = currentParams.get(key)?.split(',') || [];
        const filteredValues = values.filter(v => v !== specificValue);
        
        if (filteredValues.length > 0) {
          currentParams.set(key, filteredValues.join(','));
        } else {
          currentParams.delete(key);
        }
      } else {
        // Normal filtreyi kaldır
        currentParams.delete(key);
      }
      
      // URL'yi güncelle
      router.push(`/filter?${currentParams.toString()}`, { scroll: false });
    };
    
    // Virgülle ayrılmış değerleri içeren chipleri oluştur
    const renderCommaDelimitedChips = (key: string, value: string) => {
      // Değeri virgülle bölüp dizi haline getir
      const valueArray = value.split(',');
      
      // Her değer için ayrı bir chip oluştur
      return (
        <>
          {valueArray.map((val) => (
            <div key={`${key}-${val}`} className="px-2 py-1 border border-gray-300 bg-white rounded-lg z-50 text-center gap-2 flex items-center">
              <span>{getFilterDisplayValue(key, val)}</span>
              <button 
                onClick={() => removeFilter(key, val)}
                className="ml-2 text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                aria-label={`Remove ${key} filter`}
              >
                ✕
              </button>
            </div>
          ))}
        </>
      );
    };
    
    return (
      <div className="flex gap-2 flex-wrap">
        {hasPriceFilter && (
          <div className="px-2 py-1 border border-gray-300 bg-white rounded-lg z-50 text-center gap-2 flex items-center">
            <span>Fiyat: {params.price_min} ₺ - {params.price_max} ₺</span>
            <button
              onClick={() => removeFilter('price_filter')}
              className="ml-2 text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
              aria-label="Remove price filter"
            >
              ✕
            </button>
          </div>
        )}
        
        {filterKeys.map(key => {
          // Virgülle ayrılmış değerler için ayrı işlem yap
          if (params[key].includes(',')) {
            return renderCommaDelimitedChips(key, params[key]);
          }
          
          // Tek değerli filterler için normal chip göster
          return (
            <div key={key} className="px-2 py-1 border border-gray-300 bg-white rounded-lg z-50 text-center gap-2 flex items-center">
              <span>{getFilterDisplayValue(key, params[key])}</span>
              <button 
                onClick={() => removeFilter(key)}
                className="ml-2 text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                aria-label={`Remove ${key} filter`}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className=" justify-center mx-auto  max-w-6xl my-10 overflow-x-hidden gap-10 grid grid-cols-2">
      {/* HARİTA */}
      {/* <div className="w-1/2 bg-colorFirst h-[calc(100vh-10rem)] fixed top-50 left-5 ml-4 lg:ml-auto max-w-[calc(50%-2.5rem)]">HARİTA</div> */}
      <div className={`col-span-1 bg-colorFirst h-[calc(100vh-10rem)] w-full ml-4 lg:ml-auto transition-all duration-300 rounded-xl`} 
           style={{ marginTop: `${scrollOffset}px` }}>
        HARİTA
      </div>

      {/* FİLTRELER */}
      <div className="col-span-1 flex flex-col listing-column">
        {/* başlık ve karşılaştır */}
        <div className="flex flex-row justify-between items-center gap-2">
          <h1 className="text-xl font-medium">Filtrelenmiş Sonuçlar</h1>
          <div className="flex flex-row items-center gap-2 text-sm font-medium">
            <h3 className="text-gray-500">Karşılaştır</h3>
            <Switch
              defaultSelected={filterVisible}
              isSelected={filterVisible}
              onValueChange={handleFilterVisible}
              aria-label="Toggle filters"
              color="primary"
              size="sm"
            />
          </div>
        </div>
        {/* SONUÇ SAYISI */}
        <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-1 text-gray-500">
          <p className="text-sm font-medium">
            {isLoading ? "Yükleniyor..." : `${resultCount} sonuç - Fotoğraflı sonuçlar`}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5 text-colorFirst border-colorFirst">
          <div className="text-sm font-medium overflow-hidden">
            <FilterChips />
          </div>
          <div className="flex justify-end w-1/2">
            <select 
              className="w-1/2 border border-gray-300 rounded-md p-2" 
              onChange={handleSortChange}
              value={params.ordering || ''}
            >
              <option value="" disabled>Sıralama</option>
              <option value="price">Artan Fiyat</option>
              <option value="-price">Azalan Fiyat</option>
              <option value="created_at">En Yeni</option>
              <option value="-created_at">En Eski</option>
            </select>
          </div>
        
        </div>
        {/* FİLTRELER */}
        <div className="flex flex-col justify-center items-center mt-5 gap-4 ">
          {isLoading ? (
            <div className="w-full py-10 flex justify-center items-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="w-full py-10 text-center text-red-500">
              <p>Veriler yüklenirken bir hata oluştu.</p>
              <p>Lütfen daha sonra tekrar deneyin.</p>
            </div>
          ) : filteredAparts && filteredAparts.length === 0 ? (
            <div className="w-full py-10 text-center">
              <p className="text-lg">Belirtilen kriterlere uygun sonuç bulunamadı.</p>
              <p className="text-sm text-gray-500 mt-2">Lütfen filtre kriterlerinizi değiştirerek tekrar deneyin.</p>
            </div>
          ) : (
            filteredAparts && filteredAparts.map((apart) => (
              // @ts-expect-error - FilterCard bileşeni apart prop'u bekliyor
              <FilterCard key={apart.id} apart={apart} filterVisible={filterVisible} />
            ))
          )}

          {/* Alt boşluk */}
          {!isLoading && filteredAparts && filteredAparts.length > 0 && (
            <div className="w-full h-20 bg-gray-200 rounded-lg"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopFilter;
