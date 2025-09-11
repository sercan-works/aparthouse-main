"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BannerImage from "@/public/assets/images/banner_image_2.jpeg";
import { FaXmark } from "react-icons/fa6";
import { FaCheckCircle, FaLongArrowAltRight, FaTimes, FaGripVertical } from "react-icons/fa";
import apart1 from "@/public/assets/apart.jpg"; // Varsayılan apart resmi
import { ReactSortable } from "react-sortablejs";
import { ApiApart } from "@/store/api/apartsApi";
import { useDispatch } from "react-redux";
import { toggleCompare } from "@/store/features/CompareSlice";

// Hizmet listesini tanımlayalım
const hizmetListesi = [
  "Fiyat",
  "Yemek hizmeti",
  "Wifi",
  "Isıtma",
  "Klima",
  "Temizlik Hizmeti",
  "Ortak alan",
  "Çalışma odası",
  "Çamaşırhane",
  "Otopark",
  "Gym",
  "Evcil hayvan dostu",
  "Konum",
  "Erişebilirlik",
  "Çevre",
  "Güvenlik"
];

// SortableJS için gerekli olan tip
interface SortableApartTipi {
  id: number;
  isim: string;
  pinned: boolean;
  resim: string;
  ozellikler: {
    [key: string]: boolean | string;
  };
  chosen?: boolean;
}

interface MobileCompareProps {
  aparts: ApiApart[];
}

const MobileCompare: React.FC<MobileCompareProps> = ({ aparts }) => {
  const dispatch = useDispatch();
  
  // API'den gelen verileri formatla ve state'e aktar
  const [apartVerileri, setApartVerileri] = useState<SortableApartTipi[]>([]);
  
  // API'den gelen verileri formata dönüştür
  useEffect(() => {
    if (!aparts || aparts.length === 0) return;
    
    const formatlananVeriler = aparts.map((apart, index) => {
      // Özellikleri hazırla
      const ozellikler: {[key: string]: boolean | string} = {
        "Fiyat": `₺${apart.price}`,
        "Yemek hizmeti": !!apart.food,
        "Wifi": hasService(apart, "wifi"),
        "Isıtma": hasService(apart, "ısıtma") || hasService(apart, "isitma"),
        "Klima": hasService(apart, "klima"),
        "Temizlik Hizmeti": hasService(apart, "temizlik"),
        "Ortak alan": hasService(apart, "ortak alan"),
        "Çalışma odası": hasService(apart, "çalışma") || hasService(apart, "calisma"),
        "Çamaşırhane": hasService(apart, "çamaşır") || hasService(apart, "camasir"),
        "Otopark": hasService(apart, "otopark") || hasService(apart, "park"),
        "Gym": hasService(apart, "gym") || hasService(apart, "spor"),
        "Evcil hayvan dostu": hasService(apart, "evcil") || hasService(apart, "hayvan"),
        "Konum": apart.address || "Belirtilmemiş",
        "Erişebilirlik": hasService(apart, "engelli") || hasService(apart, "erişim") || hasService(apart, "erisim"),
        "Çevre": apart.address ? "Detaylar için tıklayın" : "Belirtilmemiş",
        "Güvenlik": hasService(apart, "güvenlik") || hasService(apart, "guvenlik")
      };
      
      // Resim URL'sini al
      const resimUrl = (apart.image_thumbnail && apart.image_thumbnail.length > 0) 
        ? apart.image_thumbnail[0] 
        : apart1.src; // Varsayılan resim olarak apart1'in src'sini kullan
      
      return {
        id: apart.id,
        isim: String(apart.apart_name || ""),
        pinned: index === 0, // İlk apart pinli olsun
        resim: resimUrl,
        ozellikler
      };
    });
    
    setApartVerileri(formatlananVeriler);
  }, [aparts]);
  
  // Hizmet kontrolü yardımcı fonksiyonu
  function hasService(apart: ApiApart, serviceName: string): boolean {
    if (!apart.services || !Array.isArray(apart.services)) return false;
    
    // Servis isimlerinin küçük harfe çevrilmiş halini kontrol et
    const lowerServiceName = serviceName.toLowerCase();
    
    // Tüm servis kategorilerini düz bir diziye çevir
    const allServices = apart.services.flatMap((serviceCategory) => {
      return (serviceCategory.service_data && Array.isArray(serviceCategory.service_data)) 
        ? serviceCategory.service_data.map(s => s.toLowerCase())
        : [];
    });
    
    // Servis adının içerip içermediğini kontrol et
    return allServices.some(service => service.includes(lowerServiceName));
  }
  
  // Pin butonuna basıldığında çalışacak fonksiyon
  const handlePin = (apartId: number) => {
    // Tüm apartların pinned değerini false yapıyoruz
    const yeniVeriler = apartVerileri.map(apart => ({
      ...apart,
      pinned: false
    }));
    
    // Seçilen apartı buluyoruz
    const secilenApartIndex = yeniVeriler.findIndex(apart => apart.id === apartId);
    if (secilenApartIndex === -1) return;
    
    // Seçilen apartın pinned değerini true yapıyoruz
    yeniVeriler[secilenApartIndex].pinned = true;
    
    // Seçilen apartı 1. sıraya alıyoruz (0. indeks)
    const secilenApart = yeniVeriler[secilenApartIndex];
    yeniVeriler.splice(secilenApartIndex, 1); // Seçilen apartı diziden çıkarıyoruz
    yeniVeriler.unshift(secilenApart); // Dizinin başına ekliyoruz
    
    // State'i güncelliyoruz
    setApartVerileri(yeniVeriler);
  };
  
  // Karşılaştır butonuna basıldığında çalışacak fonksiyon
  const handleKarsilastir = () => {
    // 2. ve 3. apartların yerlerini değiştiriyoruz
    if (apartVerileri.length >= 3) {
      const yeniVeriler = [...apartVerileri];
      const temp = yeniVeriler[1];
      yeniVeriler[1] = yeniVeriler[2];
      yeniVeriler[2] = temp;
      setApartVerileri(yeniVeriler);
    }
  };

  // Kaldır butonuna basıldığında çalışacak fonksiyon
  const handleRemove = (apartId: number) => {
    // Redux'a bildir - karşılaştırmadan kaldır
    dispatch(toggleCompare(apartId));
    
    // Kaldırılacak apartın indeksini buluyoruz
    const removeIndex = apartVerileri.findIndex(apart => apart.id === apartId);
    if (removeIndex === -1) return;

    // Yeni veri dizisi oluşturuyoruz
    const yeniVeriler = [...apartVerileri];
    
    // Kaldırılan apartı diziden çıkarıyoruz
    yeniVeriler.splice(removeIndex, 1);
    
    // Eğer görünür sütunlardan birini kaldırdıysak ve 3. bir apart varsa
    // 3. apartı görünür hale getiriyoruz
    if (yeniVeriler.length > 2) {
      // Apartları yeniden düzenliyoruz
      // Pinned olan her zaman 1. sırada kalacak
      const pinnedIndex = yeniVeriler.findIndex(apart => apart.pinned);
      
      if (pinnedIndex > 0) {
        // Pinned apartı 1. sıraya alıyoruz
        const pinnedApart = yeniVeriler[pinnedIndex];
        yeniVeriler.splice(pinnedIndex, 1);
        yeniVeriler.unshift(pinnedApart);
      }
    }
    
    // State'i güncelliyoruz
    setApartVerileri(yeniVeriler);
  };

  // 3. apartın ismini alıyoruz (eğer varsa)
  const ucuncuApartIsmi = apartVerileri.length >= 3 ? apartVerileri[2].isim : "Karşılaştır";

  // Eğer hiç veri yoksa boş durum göster
  if (apartVerileri.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Karşılaştırma Listeniz Boş</h2>
        <p className="text-gray-600">Karşılaştırmak istediğiniz apartları ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row mx-auto max-w-[1250px] my-10">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-40">
        <Image
          src={BannerImage}
          alt="about"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute top-36 left-5 w-[90%] z-10 font-bold">
          <h1 className="bg-gradient-to-r from-colorThird to-colorSecond text-transparent bg-clip-text text-2xl ">
            Karşılaştırma
          </h1>
          <p className="text-white text-xs mt-4 font-normal">
            Yüzlerce konaklama arasından seçin, karşılaştırın <br />
            size en uygun yaşam alanının keyfine varın.
          </p>
        </div>
        
      </div>
      <div className="flex flex-col mt-[150px] ">
        
      <div 
        className="w-full mb-4 px-5 flex flex-row justify-end items-center gap-2 cursor-pointer"
        onClick={handleKarsilastir}
      >
        {ucuncuApartIsmi} <FaLongArrowAltRight />
      </div>

      <div className="flex flex-col w-full container mx-auto">
        {/* BAŞLIKLAR */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 border rounded-lg p-0 mt-28">
            <ul className="">
              {hizmetListesi.map((hizmet, index) => (
                <li
                  key={index}
                  className="py-2 border-b border-gray-200 last:border-b-0 h-14"
                >
                  <p className="flex items-center text-md p-2">
                    <span className="mr-2"></span> {hizmet}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Apart sütunları - Sortable ile sürükle-bırak yapılabilir */}
          <ReactSortable
            list={apartVerileri}
            setList={setApartVerileri}
            className="flex col-span-7 gap-4"
            animation={200}
            handle=".drag-handle"
            delay={2}
            delayOnTouchOnly={true}
            filter=".ignore-drag"
            preventOnFilter={false}
          >
            {apartVerileri.slice(0, 2).map((apart) => (
              <div 
                key={apart.id} 
                className={`col-span-3 rounded-lg p-2 w-1/2 ${apart.pinned ? 'bg-colorFirst bg-opacity-20' : ''}`}
              >
                <div className="flex flex-col justify-between items-center w-full text-sm gap-2 mb-2">
                  <div className="flex w-full justify-between items-center">
                    <FaGripVertical className="text-gray-500 h-4 w-4 cursor-move drag-handle" title="Sürükle ve bırak" />
                    <FaXmark 
                      className="text-gray-500 h-4 w-4 cursor-pointer ignore-drag" 
                      onClick={() => handleRemove(apart.id)}
                    />
                  </div>

                  <h3 className="text-gray-500 text-xs text-center min-h-10">
                    {apart.isim}
                  </h3>

                  <div
                    className={`text-xs text-gray-500 ${apart.pinned ? 'bg-gray-200' : 'bg-indigo-200'} rounded-full px-2 py-1 text-center w-14 cursor-pointer ignore-drag`}
                    onClick={() => handlePin(apart.id)}
                  >
                    {apart.pinned ? 'Pinned' : 'Pin'}
                  </div>
                </div>

                <ul className="">
                  {hizmetListesi.map((hizmet, index) => {
                    const ozellik = apart.ozellikler[hizmet];
                    return (
                      <li
                        key={index}
                        className="py-1 border-b border-gray-200 last:border-b-0 h-14 items-center flex justify-center"
                      >
                        <p className="flex items-center text-sm p-1">
                          {typeof ozellik === 'boolean' ? (
                            ozellik ? (
                              <FaCheckCircle className="text-green-500 h-6 w-6 mx-auto" />
                            ) : (
                              <FaTimes className="text-red-500 h-6 w-6 mx-auto" />
                            )
                          ) : (
                            <span className="text-xs text-center">{ozellik}</span>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </ReactSortable>
          
          {/* 3. Apart her zaman gizli kalacak */}
          <div className="hidden">
            {/* 3. apartın içeriği burada olacak ama görünmeyecek */}
          </div>
          <div className="mt-20">
            
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MobileCompare;
