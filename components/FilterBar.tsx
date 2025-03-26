import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem
} from "@heroui/autocomplete";
import { Button } from "@heroui/react";
import FilterButton from "./filter-modal/FilterButton";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCity, setSelectedUniversity, setSelectedCategory } from "@/store/features/FilterSlice";
import { useGetCategoriesQuery, useGetCitiesQuery, useGetUniversitiesQuery } from "@/store/api/filterApi";

// BaseItem interface'i API'den gelen temel veri yapısını temsil eder
interface BaseItem {
  id: number;
  name: string;
}

const STORAGE_KEY_CITY = 'selectedCity';

const FilterBar = () => {
  const { data: citiesData } = useGetCitiesQuery("");
  const { data: universitiesData } = useGetUniversitiesQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  // Redux'tan seçili değerleri al
  const selectedCity = useSelector((state: RootState) => state.filter.selectedCity);
  const selectedUniversity = useSelector((state: RootState) => state.filter.selectedUniversity);
  const selectedCategory = useSelector((state: RootState) => state.filter.selectedCategory);
  const selectedGender = useSelector((state: RootState) => state.filter.selectedGender);

  // Kullanılabilir üniversitelerin listesi için state
  const [availableUniversities, setAvailableUniversities] = useState<BaseItem[]>([]);

  // Sayfa yüklendiğinde localStorage'dan şehir bilgisini al ve Redux'a yaz
  useEffect(() => {
    try {
      const savedCity = localStorage.getItem(STORAGE_KEY_CITY);
      if (savedCity && citiesData) {
        const cityId = parseInt(savedCity);
        const cityExists = citiesData.some(city => city.id === cityId);
        if (cityExists) {
          dispatch(setSelectedCity(cityId));
        }
      }
    } catch (error) {
      console.error("LocalStorage erişiminde hata oluştu:", error);
    }
  }, [citiesData, dispatch]);

  // Şehir değiştiğinde üniversiteleri güncelle
  useEffect(() => {
    if (!selectedCity || !universitiesData || !citiesData) {
      setAvailableUniversities([]);
      return;
    }

    // Şehirlerin API'den geldiğinden emin olalım
    const selectedCityData = citiesData.find(city => city.id === selectedCity);
    
    if (!selectedCityData) {
      setAvailableUniversities([]);
      return;
    }

    // API yanıtında üniversite-şehir ilişkisi yok, bu yüzden manuel olarak filtreleme yapmalıyız
    // Burada mock veri kullanılıyor - gerçek API entegrasyonunda güncellenmelidir
    // Gerçek uygulamada şehir ID'sine göre üniversite çekme API'si kullanılabilir
    const mockCityUniversityMap: Record<number, number[]> = {
      1: [1, 2, 3], // İstanbul
      2: [4, 5], // Ankara
      3: [6, 7], // İzmir
      // Diğer şehirler için ilişkiler eklenebilir
    };
    
    const universityIds = mockCityUniversityMap[selectedCityData.id] || [];
    const filteredUniversities = universitiesData.filter(uni => 
      universityIds.includes(uni.id)
    );
    
    setAvailableUniversities(filteredUniversities);
  }, [selectedCity, universitiesData, citiesData]);

  // Şehir seçimi değiştiğinde
  const handleCityChange = (key: string | number | null) => {
    if (typeof key === 'string' || typeof key === 'number') {
      // ID doğrudan sayı olarak gönderiliyor
      const cityId = citiesData?.find(c => c.id.toString() === key.toString())?.id || null;
      dispatch(setSelectedCity(cityId));
      
      // Şehir seçimini localStorage'a kaydet
      try {
        if (cityId !== null) {
          localStorage.setItem(STORAGE_KEY_CITY, cityId.toString());
        } else {
          localStorage.removeItem(STORAGE_KEY_CITY);
        }
      } catch (error) {
        console.error("LocalStorage kaydetme hatası:", error);
      }
      
      // Şehir değiştiğinde üniversite seçimini sıfırla
      dispatch(setSelectedUniversity(null));
    } else {
      dispatch(setSelectedCity(null));
      try {
        localStorage.removeItem(STORAGE_KEY_CITY);
      } catch (error) {
        console.error("LocalStorage silme hatası:", error);
      }
    }
  };

  // Üniversite seçimi değiştiğinde
  const handleUniversityChange = (key: string | number | null) => {
    if ((typeof key === 'string' || typeof key === 'number') && universitiesData) {
      const universityId = availableUniversities.find(u => u.id.toString() === key.toString())?.id || null;
      dispatch(setSelectedUniversity(universityId));
    } else {
      dispatch(setSelectedUniversity(null));
    }
  };

  // Kategori seçimi değiştiğinde
  const handleCategoryChange = (key: string | number | null) => {
    if ((typeof key === 'string' || typeof key === 'number') && categoriesData) {
      const categoryId = categoriesData.find(c => c.id.toString() === key.toString())?.id || null;
      dispatch(setSelectedCategory(categoryId));
    } else {
      dispatch(setSelectedCategory(null));
    }
  };

  // Bul butonuna tıklandığında
  const handleSearch = () => {
    // URL parametresi eklemek yerine sadece FilterSlice'a kaydediyoruz
    // Burada ek bir işlem yapmaya gerek yok, çünkü zaten seçimler Redux store'a kaydedilmiş durumda
    
    console.log("Filtreleme yapıldı:", {
      city: selectedCity,
      university: selectedUniversity, 
      gender: selectedGender,
      category: selectedCategory
    });
  };

  // Seçili şehir için key değerini bul
  const getSelectedCityKey = () => {
    if (!selectedCity) return "";
    return selectedCity.toString();
  };

  // Seçili üniversite için key değerini bul
  const getSelectedUniversityKey = () => {
    if (!selectedUniversity) return "";
    return selectedUniversity.toString();
  };

  // Seçili kategori için key değerini bul
  const getSelectedCategoryKey = () => {
    if (!selectedCategory) return "";
    return selectedCategory.toString();
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-lg px-6">
      <Autocomplete 
        className="w-[25vh]" 
        radius="none" 
        label="Şehir" 
        size="sm"
        onSelectionChange={handleCityChange}
        selectedKey={getSelectedCityKey()}
      >
        {citiesData ? citiesData.map((city) => (
          <AutocompleteItem key={city.id.toString()}>
            {city.name}
          </AutocompleteItem>
        )) : []}
      </Autocomplete>

      <Autocomplete
        className="w-[25vh]"
        radius="none"
        label="Üniversite"
        size="sm"
        onSelectionChange={handleUniversityChange}
        selectedKey={getSelectedUniversityKey()}
        isDisabled={!selectedCity}
      >
        {availableUniversities.map((university) => (
          <AutocompleteItem key={university.id.toString()}>
            {university.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Autocomplete
        className="w-[25vh]"
        radius="none"
        label="Apart Tipi"
        size="sm"
        onSelectionChange={handleCategoryChange}
        selectedKey={getSelectedCategoryKey()}
      >
        {categoriesData ? categoriesData.map((category) => (
          <AutocompleteItem key={category.id.toString()}>
            {category.name}
          </AutocompleteItem>
        )) : []}
      </Autocomplete>
      <div className="relative left-28 -top-6">
        <Button 
          className="absolute bg-colorFirst right-4 text-white rounded-lg p-6"
          onClick={handleSearch}
        >
          Bul
        </Button>
        <div className="absolute -right-20 top-1 ring-4 ring-colorFirst rounded-xl">
          <FilterButton />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
