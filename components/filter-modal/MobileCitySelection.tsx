import { RootState } from "@/store";
import {
  setSelectedCity,
  setSelectedUniversity
} from "@/store/features/FilterSlice";
import { useGetCitiesQuery } from "@/store/api/filterApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import Image from "next/image";
import banner_image from "@/public/assets/images/kız_erkek_aparthouse.png";

const STORAGE_KEY_CITY = "selectedCity";

const MobileCitySelection = () => {
  const { data: citiesData } = useGetCitiesQuery("");
  const selectedCity = useSelector(
    (state: RootState) => state.filter.selectedCity
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // Modal açıkken scroll'u engelle
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  // Sayfa yüklendiğinde localStorage'dan şehir bilgisini al ve Redux'a yaz
  useEffect(() => {
    try {
      const savedCity = localStorage.getItem(STORAGE_KEY_CITY);

      // Eğer local storage'da şehir yoksa modalı göster
      if (!savedCity) {
        setShowModal(true);
      } else {
        setShowModal(false);

        // Redux'a şehir bilgisini yükle
        if (citiesData) {
          const cityId = parseInt(savedCity);
          const cityExists = citiesData.some((city) => city.id === cityId);
          if (cityExists) {
            dispatch(setSelectedCity(cityId));
          }
        }
      }
    } catch (error) {
      console.error("LocalStorage erişiminde hata oluştu:", error);
    }
  }, [citiesData, dispatch]);

  // Şehir seçimi değiştiğinde
  const handleCityChange = (key: string | number | null) => {
    if (typeof key === "string" || typeof key === "number") {
      // ID doğrudan sayı olarak gönderiliyor
      const cityId =
        citiesData?.find((c) => c.id.toString() === key.toString())?.id || null;
      dispatch(setSelectedCity(cityId));

      // Şehir seçimini localStorage'a kaydet
      try {
        if (cityId !== null) {
          localStorage.setItem(STORAGE_KEY_CITY, cityId.toString());
          // Şehir seçildikten sonra modalı kapat
          setShowModal(false);
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

  const handleClose = () => {
    setShowModal(false);
  };

  const getSelectedCityKey = () => {
    if (!selectedCity) return "";
    return selectedCity.toString();
  };

  // Modalı gösterme durumunu kontrol et
  if (!showModal) return null;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-white z-50">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src={banner_image}
          alt="banner"
          className="w-full h-full object-cover rounded-b-2xl"
          priority
        />

        <p className="text-gray-500 text-center text-xl font-bold">
          Hadi öğrenci hayatına nerede başlayacağını seçelim...
        </p>
        <div className="flex flex-row justify-center items-center gap-4">
          <Autocomplete
            className="w-full"
            radius="lg"
            label="Şehir"
            size="sm"
            onSelectionChange={handleCityChange}
            selectedKey={getSelectedCityKey()}
          >
            {citiesData
              ? citiesData.map((city) => (
                  <AutocompleteItem key={city.id.toString()}>
                    {city.name}
                  </AutocompleteItem>
                ))
              : []}
          </Autocomplete>

          {/* <Button
            onPress={handleClose}
            className="w-1/3 bg-colorFirst text-white"
            size="lg"
          >
            Kapat
          </Button> */}
        </div>

        <p className="text-gray-500 text-center text-sm font-bold">
         
        </p>
        <div className="flex flex-row justify-center items-center gap-4">
         Favori Şehirler
          <Button
            className="w-1/3  text-colorFirst"
            variant="bordered"
            size="md"
            onPress={() => handleCityChange("1")}
          >
            Eskişehir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileCitySelection;
