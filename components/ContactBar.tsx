import React, { useState, useEffect } from 'react'
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from '@heroui/react'
import { openWhatsAppLink, getPhoneLink } from '@/app/utils/contacts';
import axios from 'axios';
import WhatsAppModal from './WhatsAppModal';
import { MdOutlineLocalPhone } from 'react-icons/md';

interface ContactBarProps {
  phone: string;
  price: number;
  apartName?: string;
  apartSlug?: string;
  apartId?: number;
  gender?: string;
  universities?: number[];
  lat?: number;
  lon?: number;
}

const ContactBar: React.FC<ContactBarProps> = ({ 
  phone, 
  price, 
  apartName, 
  apartSlug, 
  apartId, 
  gender = 'E', 
  universities = []
}) => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // WhatsApp button için farklı metin seçenekleri
  const whatsappTexts = [
    { main: 'Fiyat Bilgisi Al', sub: '' },
    { main: 'Whatsapp', sub: '' },
  ];

  // Mobil kontrolü için useEffect
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // WhatsApp button metin rotasyonu için useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % whatsappTexts.length);
    }, 2000); // 2 saniyede bir değiştir

    return () => clearInterval(interval);
  }, [whatsappTexts.length]);
  
  // Para birimini Türkçe formatına göre düzenle: 1000 -> 1.000
  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString('tr-TR');
  }
  
  
  
  const apartUrl = apartSlug ? `https://www.aparthouse.com.tr/${apartSlug}` : undefined;
  const handleWhatsappClick = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-wp-clicks/`, {
        apart: apartId,
    });
    // WhatsApp linkini iOS Safari uyumlu şekilde aç
    openWhatsAppLink(phone, apartName, apartUrl);
    
    // Modal'ı sadece mobilde aç
    if (isMobile) {
      setIsWhatsAppModalOpen(true);
    }
  };
  const handleCallClick = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-call-clicks/`, {
        apart: apartId,
    });
  };

  return (
    <div className=''>
      <div className='flex flex-row gap-2 mx-4' >
      <div className='hidden flex-col h-12 w-1/3 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden'>
            <h3 className='text-md font-bold text-end' >{formatCurrency(price)} ₺</h3>
            <div className='overflow-hidden whitespace-nowrap w-full'>
              <p className='text-xs text-gray-500 text-center font-light animate-marquee'>
                den başlayan fiyatlar
              </p>
            </div>
        </div>
          
          <Button variant="flat" onPress={() => {
            handleCallClick();
            window.open(getPhoneLink(phone), '_blank');
          }} className='bg-primary text-white h-12 w-1/2 p-0'>
            <MdOutlineLocalPhone className='w-6 h-6 text-white'/>
            <p>Ara</p>
        </Button>

      
        {/* <Button variant="bordered" onPress={() => {
          window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
        }} className=' text-primary h-12 w-1/2 p-0 px-1 border-2 border-primary rounded-xl' >
            <FaMap className='w-6 h-6 text-primary'/>
            <p className='text-sm text-primary'>Konum Bilgisi</p>
        </Button> */}

        <Button variant="flat" onPress={handleWhatsappClick} className='bg-primary text-white h-12 w-1/2 p-0 px-1 relative overflow-hidden'>
            <FaWhatsapp className='w-6 h-6 text-white rounded-full'/>
            <div className='relative h-8 w-1/2 flex items-center justify-center'>
              {whatsappTexts.map((text, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                    index === textIndex
                      ? 'opacity-100 translate-y-0'
                      : index === (textIndex - 1 + whatsappTexts.length) % whatsappTexts.length
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-0 -translate-y-4'
                  }`}
                >
                  <p className='text-sm font-medium'>
                    {text.main}
                  </p>
                  {text.sub && (
                    <p className='text-xs text-white opacity-90'>
                      {text.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
        </Button>
      
      </div>
      
      {/* WhatsApp Modal - Sadece mobilde göster */}
      {isMobile && (
        <WhatsAppModal 
          isOpen={isWhatsAppModalOpen} 
          onClose={() => setIsWhatsAppModalOpen(false)}
          gender={gender}
          universities={universities}
          currentApartId={apartId}
        />
      )}
    </div>
  )
}

export default ContactBar
