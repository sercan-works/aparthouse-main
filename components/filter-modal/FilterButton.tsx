"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem
} from "@heroui/react";
import Image from "next/image";
import FilterIcon from "@/public/assets/icons/FilterIcon.svg";
import PriceSlider from "./PriceSlider";
import { useGetFiltersQuery } from "@/store/api/filterApi";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { prepareSearchParams, useGetPaginatedApartsQuery } from "@/store/api/apartsApi";

interface FilterOption {
  value: string | number;
  label: string;
  filter_key?: string;
  city?: number;
}

interface FilterCategory {
  category_name: string;
  filter_key: string;
  options?: FilterOption[];
  range?: boolean;
  min?: number;
  max?: number;
  dynamic?: boolean;
  depends_on?: string;
}

interface ServiceFilter {
  category_name: string;
  filter_key: string;
  options: FilterOption[];
}

interface FiltersResponse {
  filters: FilterCategory[];
  service_filters: ServiceFilter[];
}

interface SelectedFilters {
  [key: string]: (string | number)[];
}

const STORAGE_KEY_CITY = 'selectedCity';

export default function FilterButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isSuccess } = useGetFiltersQuery();
  const filters = isSuccess && data ? (data as unknown as FiltersResponse) : null;
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [filteredUniversities, setFilteredUniversities] = useState<FilterOption[]>([]);
  const router = useRouter();

  // LocalStorage'dan şehir bilgisini al
  useEffect(() => {
    try {
      const savedCity = localStorage.getItem(STORAGE_KEY_CITY);
      if (savedCity && filters?.filters) {
        const cityId = parseInt(savedCity);
        // Filtre verilerinde bu şehrin olup olmadığını kontrol et
        const cityExists = filters.filters.find(f => f.filter_key === "city")?.options?.some(
          option => Number(option.value) === cityId
        );

        if (cityExists) {
          // Mevcut selectedFilters'a şehri ekle
          setSelectedFilters(prev => ({
            ...prev,
            city: [cityId]
          }));
        } else {
          // Şehir mevcut değilse default olarak şehir ID'si 1'i ayarla
          const defaultCityExists = filters.filters.find(f => f.filter_key === "city")?.options?.some(
            option => Number(option.value) === 1
          );
          
          if (defaultCityExists) {
            setSelectedFilters(prev => ({
              ...prev,
              city: [1]
            }));
            localStorage.setItem(STORAGE_KEY_CITY, "1");
          }
        }
      } else if (filters?.filters) {
        // LocalStorage'da şehir yoksa default olarak şehir ID'si 1'i ayarla
        const defaultCityExists = filters.filters.find(f => f.filter_key === "city")?.options?.some(
          option => Number(option.value) === 1
        );
        
        if (defaultCityExists) {
          setSelectedFilters(prev => ({
            ...prev,
            city: [1]
          }));
          localStorage.setItem(STORAGE_KEY_CITY, "1");
        }
      }
    } catch (error) {
      console.error("LocalStorage erişiminde hata oluştu:", error);
    }
  }, [filters]);

  // Şehir değişikliğini localStorage'a kaydet
  useEffect(() => {
    const cityId = selectedFilters["city"]?.[0];
    if (cityId !== undefined) {
      try {
        localStorage.setItem(STORAGE_KEY_CITY, cityId.toString());
      } catch (error) {
        console.error("LocalStorage kaydetme hatası:", error);
      }
    }
  }, [selectedFilters["city"]]);

  // Seçili şehir ID'sini al - number tipinde dönüştürdüm
  const selectedCityId = useMemo(() => {
    const cityId = selectedFilters["city"]?.[0];
    return cityId !== undefined ? Number(cityId) : null;
  }, [selectedFilters]);

  // API parametrelerini hazırla
  const searchParams = useMemo(() => {
    return prepareSearchParams(selectedFilters);
  }, [selectedFilters]);

  // Filtrelenmiş apartları getir - pagination kullan
  const { data: paginatedData, isLoading: isFiltering } = useGetPaginatedApartsQuery(
    {
      ...searchParams,
      page_size: 100 // Filtre modal'da daha fazla sonuç göster
    },
    { 
      skip: Object.keys(searchParams).length === 0, // Filtre yoksa sorguyu atlayın
    }
  );

  // Paginated data'dan apartları çıkar
  const filteredAparts = paginatedData?.results || [];

  // Şehir değiştiğinde üniversite listesini güncelle
  useEffect(() => {
    if (!selectedCityId || !filters) {
      // console.log("Şehir seçilmedi veya filtreler yüklenmedi");
      setFilteredUniversities([]);
      return;
    }
    
    const universityFilter = filters.filters.find(f => f.filter_key === "university");
    if (!universityFilter || !universityFilter.options) {
      // console.log("Üniversite filtresi veya seçenekler bulunamadı");
      setFilteredUniversities([]);
      return;
    }
    
    // console.log("Seçili şehir ID:", selectedCityId, "Tipi:", typeof selectedCityId);
    // console.log("Tüm üniversiteler:", JSON.stringify(universityFilter.options, null, 2));
    
    // Şehir ID'si ile üniversitenin city özelliğini karşılaştır
    const filtered = universityFilter.options.filter(uni => {
      // console.log(`Üniversite: ${uni.label}, City ID: ${uni.city} (${typeof uni.city}), Seçili ID: ${selectedCityId} (${typeof selectedCityId})`);
      // Number tipinde karşılaştır
      return Number(uni.city) === selectedCityId;
    });
    
    // console.log("Filtrelenmiş üniversiteler:", filtered.length ? JSON.stringify(filtered, null, 2) : "Boş");
    setFilteredUniversities(filtered);
  }, [selectedCityId, filters]);

  const handleFilterSelect = (filterKey: string, value: string | number) => {
    // console.log(`${filterKey} seçimi yapıldı, değer:`, value, "tipi:", typeof value);
    
    setSelectedFilters(prev => {
      const currentValues = prev[filterKey] || [];
      
      // Eğer değer zaten seçili ise, kaldır
      if (currentValues.includes(value)) {
        const newFilters = {
          ...prev,
          [filterKey]: currentValues.filter((val) => val !== value)
        };
        
        // Şehir değişirse veya temizlenirse üniversite seçimini de temizle
        if (filterKey === "city") {
          newFilters["university"] = [];
          // Şehir seçimi kaldırıldıysa localStorage'dan da kaldır
          try {
            localStorage.removeItem(STORAGE_KEY_CITY);
          } catch (error) {
            console.error("LocalStorage silme hatası:", error);
          }
        }
        
        return newFilters;
      }
      
      // Şehir için sadece tek seçim olabilir, diğer seçimleri temizle
      if (filterKey === "city") {
        const newFilters = {
          ...prev,
          [filterKey]: [value],  // Önceki değerleri sil, sadece yeni değeri ekle
          "university": []  // Üniversite seçimini temizle
        };
        return newFilters;
      }
      
      // Değer seçili değilse, ekle
      return {
        ...prev,
        [filterKey]: [...currentValues, value]
      };
    });
  };

  const isFilterSelected = (filterKey: string, value: string | number) => {
    return selectedFilters[filterKey]?.includes(value) || false;
  };

  const clearAllFilters = () => {
    setSelectedFilters({});

    // Tüm filtreler temizlendiğinde localStorage'dan da şehir bilgisini temizle işlemini devre dışı bırakıyorum
    // try {
    //   localStorage.removeItem(STORAGE_KEY_CITY);
    // } catch (error) {
    //   console.error("LocalStorage silme hatası:", error);
    // }
  };

  const handleSearch = (onClose: () => void) => {
    // Seçili filtrelerden arama parametrelerini oluştur

    const params = prepareSearchParams(selectedFilters);
    
    // URL parametrelerini oluştur
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.set(key, value.toString());
      }
    });
    
    // URL'i güncelle (sayfa yenilemeden)
    const url = queryParams.toString() ? `/filter?${queryParams.toString()}` : '/filter';
    
    // console.log('Arama yapılıyor:', params);
    // console.log('Yönlendirilen URL:', url);
    
    // Modal'ı kapat
    onClose();
    
    // Filtre sayfasına yönlendir
    router.push(url);
  };

  // Filtre kategorisini ve seçeneklerini render eden yardımcı fonksiyon
  const renderFilterOptions = (categoryName: string, filterKey: string, options: FilterOption[]) => {
    return (
      <li className="border-b pb-4">
        <h3 className="font-medium mb-2">{categoryName}</h3>
        <p className="text-sm text-gray-500 my-2">
          Birden fazla seçenek seçebilirsiniz.
        </p>
        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <Button 
              key={option.value}
              variant="bordered" 
              className={`${isFilterSelected(filterKey, option.value) ? "text-colorFirst bg-blue-50" : ""}`}
              onPress={() => handleFilterSelect(filterKey, option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </li>
    );
  };

  return (
    <div className="w-full">
      <Button className="w-full bg-gray-100 h-10" onPress={onOpen}>
        <Image src={FilterIcon} alt="Filter" width={18} height={16} />
        Filtre
      </Button>
      <Modal
        isOpen={isOpen}
        size="full"
        className="md:max-w-screen-sm mx-auto"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Filtreler
              </ModalHeader>
              <ModalBody>
                {!isSuccess || !filters ? (
                  <div>Yükleniyor...</div>
                ) : (
                  <ul className="space-y-4">
                    {/* Konaklama Kapsamı */}
                    {filters.filters.find(f => f.filter_key === "gender") && 
                      renderFilterOptions(
                        "Konaklama Kapsamı",
                        "gender",
                        filters.filters.find(f => f.filter_key === "gender")?.options || []
                      )
                    }

                      {/* Şehir */}
                      {filters.filters.find(f => f.filter_key === "city") && (
                      <li className="border-b pb-4">
                        <h3 className="font-medium mb-2">Şehir</h3>
                        <Autocomplete 
                          className="w-full" 
                          label="Şehir seçiniz" 
                          variant="bordered"
                          defaultItems={filters.filters.find(f => f.filter_key === "city")?.options || []}
                          onSelectionChange={(key) => {
                            if (key) {
                              console.log("Şehir seçildi:", key);
                              handleFilterSelect("city", key as string | number);
                            }
                          }}
                          selectedKey={selectedFilters["city"]?.[0]?.toString()}
                        >
                          {(item) => (
                            <AutocompleteItem key={item.value} textValue={item.label}>
                              {item.label}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      </li>
                    )}

                    {/* Üniversite - Sadece şehir seçildiğinde göster */}
                    {selectedCityId && filteredUniversities.length > 0 ? (
                      renderFilterOptions(
                        "Üniversite",
                        "university",
                        filteredUniversities
                      )
                    ) : (
                      selectedCityId && <li className="border-b pb-4">
                        <h3 className="font-medium mb-2">Üniversite</h3>
                        <p className="text-sm text-gray-500">Seçili şehirde üniversite bulunamadı.</p>
                      </li>
                    )}


                    {/* Konaklama Türü */}
                    {/* {filters.filters.find(f => f.filter_key === "category") && 
                      renderFilterOptions(
                        "Konaklama Türü",
                        "category",
                        filters.filters.find(f => f.filter_key === "category")?.options || []
                      )
                    } */}

                    {/* Fiyat Aralığı */}
                    <li className="border-b pb-4">
                      <h3 className="font-medium mb-2">Fiyat aralığı</h3>
                      <p className="text-sm text-gray-500 my-2">
                        Oda fiyatları içeriklere göre değişiklik gösterebilir.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        <PriceSlider 
                          min={filters.filters.find(f => f.filter_key === "price")?.min || 0} 
                          max={filters.filters.find(f => f.filter_key === "price")?.max || 10000}
                          onChange={(values) => setSelectedFilters(prev => ({...prev, price: values}))}
                        />
                      </div>
                    </li>

                    {/* Fiyat Türü */}
                    {filters.filters.find(f => f.filter_key === "price_type") && 
                      renderFilterOptions(
                        "Fiyat Türü",
                        "price_type",
                        filters.filters.find(f => f.filter_key === "price_type")?.options || []
                      )
                    }

                  
                    {/* Özellikler */}
                    {filters.filters.find(f => f.filter_key === "features") && 
                      renderFilterOptions(
                        "Özellikler",
                        "features",
                        filters.filters.find(f => f.filter_key === "features")?.options || []
                      )
                    }

                    {/* Service Filters */}
                    {filters.service_filters.map((serviceFilter) => (
                      <li key={serviceFilter.category_name} className="border-b pb-4">
                        <h3 className="font-medium mb-2">{serviceFilter.category_name}</h3>
                        <div className="flex flex-wrap gap-4">
                          {serviceFilter.options.map((option) => (
                            <Button 
                              key={option.value}
                              variant="bordered" 
                              className={`${isFilterSelected(serviceFilter.filter_key, option.value) ? "text-colorFirst bg-blue-50" : ""}`}
                              onPress={() => handleFilterSelect(serviceFilter.filter_key, option.value)}
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </ModalBody>
              <ModalFooter className="mb-16 md:mb-0">
                <Button color="danger" variant="light" onPress={clearAllFilters}>
                  Tümünü Temizle
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => handleSearch(onClose)}
                  isLoading={isFiltering}
                >
                  {Object.keys(searchParams).length > 0 ? `Göster (${filteredAparts?.length || 0} sonuç)` : 'Göster'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
