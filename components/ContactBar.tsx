import React from 'react'
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { Button } from '@heroui/react'
import { getWhatsAppLink, getPhoneLink } from '@/app/utils/contacts';
import axios from 'axios';

const ContactBar = ({ phone, price, apartName, apartSlug ,apartId}: { phone: string, price: number, apartName?: string, apartSlug?: string,apartId?: number }) => {
  // Para birimini Türkçe formatına göre düzenle: 1000 -> 1.000
  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString('tr-TR');
  }
  
  const apartUrl = apartSlug ? `https://www.aparthouse.com.tr/${apartSlug}` : undefined;
  const handleWhatsappClick = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-wp-clicks/`, {
        apart: apartId,
    });
  };
  const handleCallClick = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/apart-call-clicks/`, {
        apart: apartId,
    });
  };

  return (
    <div className=''>
      <div className='flex flex-row gap-2 mx-4' >
            <Button variant="flat" onPress={() => {
              handleWhatsappClick();
              window.open(getWhatsAppLink(phone, apartName, apartUrl), '_blank');
            }} className='bg-primary text-white h-12 w-1/3 p-0'>
            <FaWhatsapp className='w-6 h-6 text-white'/>
            <p>Whatsapp</p>
        </Button>
          <Button variant="flat" onPress={() => {
            handleCallClick();
            window.open(getPhoneLink(phone), '_blank');
          }} className='bg-primary text-white h-12 w-1/3 p-0'>
            <MdOutlineLocalPhone className='w-6 h-6 text-white'/>
            <p>Ara</p>
        </Button>
        <div className='flex flex-col h-12 w-1/3 p-0 px-1 border-2 border-colorFirst rounded-xl overflow-hidden'>
            <h3 className='text-md font-bold text-end' >{formatCurrency(price)} ₺</h3>
            <div className='overflow-hidden whitespace-nowrap w-full'>
              <p className='text-xs text-gray-500 text-center font-light animate-marquee'>
                den başlayan fiyatlar
              </p>
            </div>
        </div>
      
      </div>
    </div>
  )
}

export default ContactBar
