import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@heroui/react";
import Image from "next/image";
import FilterIcon from "@/public/assets/icons/FilterIcon.svg";
import PriceSlider from "./PriceSlider";
export default function FilterButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
                <ul className="space-y-4">
                  <li className="border-b pb-4">
                    <h3 className="font-medium">Konaklama Kapsamı</h3>
                    <p className="text-sm text-gray-500 my-2">
                      Birden fazla seçenek seçebilirsiniz.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Kız
                      </Button>
                      <Button variant="bordered" className="">
                        Erkek
                      </Button>
                      <Button variant="bordered" className="">
                        Karışık
                      </Button>
                      <Button variant="bordered" className="">
                        Pet Dostu
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Konaklama Türü</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="bordered" className="text-colorFirst">
                        Apart
                      </Button>
                      <Button variant="bordered" className="">
                        Pansiyon
                      </Button>
                      <Button variant="bordered" className="">
                        Öğrenci Evi
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Fiyat aralığı</h3>
                    <p className="text-sm text-gray-500 my-2">
                      Oda fiyatları içeriklere göre değişiklik gösterebilir.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      <PriceSlider />
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Kontrat süresi</h3>
                    <p className="text-sm text-gray-500 my-2">
                      Birden fazla seçenek seçebilirsiniz.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Yıllık
                      </Button>
                      <Button variant="bordered" className="">
                        Aylık
                      </Button>
                      <Button variant="bordered" className="">
                        Dönemlik
                      </Button>
                      <Button variant="bordered" className="">
                        Esnek
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Yemek hizmeti</h3>
                    <p className="text-sm text-gray-500 my-2">
                      Birden fazla seçenek seçebilirsiniz.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Kahvaltı
                      </Button>
                      <Button variant="bordered" className="">
                        Öğle Yemeği
                      </Button>
                      <Button variant="bordered" className="">
                        Akşam Yemeği
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h2 className=" mb-2 font-bold">Olanaklar</h2>
                    <h3 className="font-medium mb-2">Temel olanaklar</h3>
                    <div className="flex flex-wrap gap-4 mb-5">
                      <Button variant="bordered" className="text-colorFirst">
                        Wifi
                      </Button>
                      <Button variant="bordered" className="">
                        Isıtma
                      </Button>
                      <Button variant="bordered" className="">
                        Klima
                      </Button>
                      <Button variant="bordered" className="">
                        Kişisel Bnayo
                      </Button>
                      <Button variant="bordered" className="">
                        Mutfak
                      </Button>
                      <Button variant="bordered" className="">
                        Asansör
                      </Button>
                      <Button variant="bordered" className="">
                        Çamaşırhane
                      </Button>
                      <Button variant="bordered" className="">
                        Güvenlik
                      </Button>
                      <Button variant="bordered" className="">
                        Temizlik Hizmeti
                      </Button>
                      <Button variant="bordered" className="">
                        Ortak Alan
                      </Button>
                      <Button variant="bordered" className="">
                        Çalışma Odası
                      </Button>
                      <Button variant="bordered" className="">
                        Engelli Erişimi
                      </Button>
                    </div>
                    <h3 className="font-medium mb-2">Fiyata dahil hizmetler</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Wifi
                      </Button>
                      <Button variant="bordered" className="">
                        Isıtma
                      </Button>
                      <Button variant="bordered" className="">
                        Su
                      </Button>
                      <Button variant="bordered" className="">
                        Elektrik
                      </Button>
                      <Button variant="bordered" className="">
                        Doğalgaz
                      </Button>
                      <Button variant="bordered" className="">
                        Çamaşırhane
                      </Button>
                      <Button variant="bordered" className="">
                        Yemek
                      </Button>
                    </div>
                    <h3 className="font-medium mb-2">Özellikler</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Otopark
                      </Button>
                      <Button variant="bordered" className="">
                        Gym
                      </Button>
                      <Button variant="bordered" className="">
                        Sigara Alanı
                      </Button>
                      <Button variant="bordered" className="">
                        Evcil Hayvan Dostu
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Konum</h3>
        
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Hepsi
                      </Button>
                      <Button variant="bordered" className="">
                        Üniversiteye Yürüme Mesafesi
                      </Button>
                      <Button variant="bordered" className="">
                        Üniversiteye &lt; 15 dakika
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Konaklama yaşı</h3>
        
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Hepsi
                      </Button>
                      <Button variant="bordered" className="">
                        0 - 5 Yıllık
                      </Button>
                      <Button variant="bordered" className="">
                        Yenilenmiş
                      </Button>
                      <Button variant="bordered" className="">
                        Tamamen Yeni
                      </Button>
                    </div>
                  </li>
                  <li className="border-b pb-4">
                    <h3 className="font-medium mb-2">Erişebilirlik özellikleri</h3>
        
                    <div className="flex flex-wrap gap-4">
                      <Button variant="bordered" className="text-colorFirst">
                        Basamaksız Giriş
                      </Button>
                      <Button variant="bordered" className="">
                        Engelli Park Yeri
                      </Button>
                      <Button variant="bordered" className="">
                        Engelli Asansörü
                      </Button>
                      <Button variant="bordered" className="">
                        Engelli Rampası
                      </Button>
                      <Button variant="bordered" className="">
                        Tuvalet Tutamağı
                      </Button>
                    </div>
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tümünü Temizle
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
