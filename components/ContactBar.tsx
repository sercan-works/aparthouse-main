import React, { useState, useEffect } from 'react'
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { Button } from '@heroui/react'
import { getPhoneLink, openWhatsAppLink } from '@/app/utils/contacts';
import axios from 'axios';
import WhatsAppModal from './WhatsAppModal';

interface ContactBarProps {
  phone: string;
  price: number;
  apartName?: string;
  apartSlug?: string;
  apartId?: number;
  gender?: string;
  universities?: number[];
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

  // Mobil kontrolü için useEffect
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
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
        <Button variant="flat" onPress={handleWhatsappClick} className='bg-primary text-white h-12 w-1/2 p-0 px-1'>
            <FaWhatsapp className='w-6 h-6 text-white animate-bounce'/>
            <p className='text-sm'>Fiyat Bilgisi Al</p>
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
