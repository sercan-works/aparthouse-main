"use client";
import React, { useState } from "react";
import { Switch } from "@heroui/react";
import FilterMap from "@/components/maps/FilterMap";
import FilterCard from "@/components/card/FilterCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetApartsQuery, ApiApart } from "@/store/api/apartsApi";
import { 
  useGetCitiesQuery, 
  useGetUniversitiesQuery, 
  useGetCategoriesQuery,
  useGetFiltersQuery
} from "@/store/api/filterApi";
import Loading from "@/components/ui/Loading";

const MobileFilter = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedApart, setSelectedApart] = useState<ApiApart | null>(null);
  const [showMap, setShowMap] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL'deki parametreleri al
  const params = Object.fromEntries(searchParams.entries());
  
  // API'den filtreleri çek
  const { data: cities = [] } = useGetCitiesQuery('');
  const { data: universities = [] } = useGetUniversitiesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: filters = [] } = useGetFiltersQuery();
  
  // Filtrelenmiş apartları API'den getir
  const { data: filteredAparts, isLoading, error } = useGetApartsQuery(params);
  
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

  // Apartın seçilmesi için handler
  const handleApartSelect = (apart: ApiApart) => {
    setSelectedApart(apart);
  };

  // Haritayı göster/gizle
  const toggleMap = () => {
    setShowMap(!showMap);
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

    // Virgülle ayrılmış değerleri işleyen yardımcı fonksiyon
    const processCommaDelimitedValues = (key: string, value: string): string[] => {
      if (value.includes(',')) {
        return value.split(',').map(v => getFilterDisplayValue(key, v));
      }
      return [getFilterDisplayValue(key, value)];
    };

    // Gösterilecek maksimum etiket sayısı
    const maxVisibleChips = 2;
    
    // İşlenmemiş chip sayısını hesapla
    let totalChipsCount = (hasPriceFilter ? 1 : 0);
    const processedChips: {key: string, values: string[]}[] = [];
    
    // Tüm filtreleri işle
    filterKeys.forEach(key => {
      const displayValues = processCommaDelimitedValues(key, params[key]);
      processedChips.push({key, values: displayValues});
      totalChipsCount += displayValues.length;
    });
    
    // Kaç tane daha etiket gösterilmeyecek
    const extraChipsCount = totalChipsCount - maxVisibleChips;
    
    // Kaç tane etiket gösterildi (fiyat etiketi dahil)
    let shownChipsCount = hasPriceFilter ? 1 : 0;
    
    return (
      <div className="flex -space-x-16">
        {hasPriceFilter && (
          <div className="p-2 min-w-28 border border-gray-300 bg-white rounded-lg z-50 text-center">
            Fiyat: {params.price_min} ₺ - {params.price_max} ₺
          </div>
        )}
        
        {/* Öncelikle tüm işlenmiş chipleri göster, maxVisibleChips sınırına kadar */}
        {processedChips.map(({key, values}) => {
          return values.map((displayValue, valueIndex) => {
            // Maksimum görünür chip sayısını aştıysak gösterme
            if (shownChipsCount >= maxVisibleChips) return null;
            
            // Bu chip'i gösterdiğimizi takip et
            shownChipsCount++;
            
            return (
              <div 
                key={`${key}-${valueIndex}`} 
                className={`p-2 min-w-28 border border-gray-300 bg-white rounded-lg z-${50 - shownChipsCount * 10} text-center`}
              >
                {displayValue}
              </div>
            );
          });
        }).flat().filter(Boolean)}
        
        {extraChipsCount > 0 && (
          <div className="relative">
            <div className="p-2 z-20 absolute left-16 top-0">
              +{extraChipsCount}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Sonuç sayısını hesapla
  const resultCount = filteredAparts ? filteredAparts.length : 0;
  
  return (
    <div className="flex flex-col max-w-[1250px] mx-5">
      {/* BAŞLIK VE  SIRALAMA*/}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5">
        <h1 className="text-xl font-medium">Filtrelenmiş Sonuçlar</h1>
        <div className="flex items-center w-1/3">
          <select 
            className="w-full border border-gray-300 rounded-md p-2" 
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

      {/* SONUÇ SAYISI */}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5">
        <p className="text-sm font-medium">
          {isLoading ? "Yükleniyor..." : `${resultCount} sonuç - Fotoğraflı sonuçlar`}
        </p>
      </div>

      {/* FİLTRELENENLER VE KARŞILAŞTIRMA */}
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden mt-5 text-colorFirst border-colorFirst">
        <div className="text-sm font-medium">
          <FilterChips />
        </div>
        <div className="flex flex-row items-center gap-2 text-sm font-medium">
          <h3 className="text-gray-500">Karşılaştır</h3>
          <Switch 
            defaultSelected={filterVisible}
            isSelected={filterVisible}
            onValueChange={setFilterVisible}
            aria-label="Toggle filters"
            color="primary"
          />
        </div>
      </div>

      {/* HARİTA GÖSTER BUTON */}
      <button
        onClick={toggleMap}
        className="w-full py-3 mt-4 bg-white border border-gray-300 rounded-lg text-center font-medium text-gray-700 flex items-center justify-center gap-2 shadow-sm"
      >
        {showMap ? "Haritayı Gizle" : "Haritayı Göster"}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </button>

      {/* HARİTA */}
      {showMap && (
        <div className="w-full h-[400px] mt-4 rounded-lg overflow-hidden">
          <FilterMap 
            aparts={filteredAparts || []} 
            selectedApart={selectedApart}
            onApartSelect={handleApartSelect}
            height="100%"
          />
        </div>
      )}

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
  );
};

export default MobileFilter;
