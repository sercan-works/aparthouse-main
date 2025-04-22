'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal, ModalFooter, ModalHeader, ModalContent, ModalBody, Button } from '@heroui/react';
import { FaInfoCircle, FaWhatsapp } from 'react-icons/fa';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  old_price?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  features, 
  isPopular = false,
  old_price
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
  
    {/* PRICING CARD */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col p-6 mx-4 mb-8 rounded-lg shadow-lg h-full backdrop-blur-sm
      ${isPopular 
        ? 'bg-blue-50/90 border-2 border-blue-500' 
        : 'bg-white/80 border border-gray-200'}`}
    >
      {isPopular && (
        <div className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full self-start mb-4">
          En Popüler
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {old_price && (
          <span className="text-gray-600 ml-1 line-through">
            {old_price}
          </span>
        )}
        <span className="text-gray-600 ml-1">/yıl</span>
        <span className="text-gray-600 ml-1"> + KDV </span>
      </div>
      <ul className="mb-8 space-y-4 flex-grow">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        onPress={onOpenChange}
        className={`py-3 px-4 rounded-lg font-semibold ${
          isPopular 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        } transition-all duration-300 hover:shadow-md`}
      >
        Satın Al
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konaklama Yayınlama</ModalHeader>
              <ModalBody>
                <p>
                Bu paketi satın almak için Aparthouse Business&apos;a giriş yapıp, firma kaydınızı tamamlamanız gerekmektedir.
                </p>
        
    
                <p className='flex items-center gap-2'>
               <FaInfoCircle className='text-blue-500' /> Destek için bizimle irtibata geçebilirsiniz.
               </p>
               <p className='flex items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer justify-center border border-gray-200' onClick={() => window.open('https://wa.me/905326267059', '_blank')}>
                <FaWhatsapp className='text-green-500' /> WhatsApp
               </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Kapat
                </Button>
                <Button color="primary" onPress={() => window.open('https://business.aparthouse.com.tr', '_blank')}>
                  Aparthouse Business&apos;a Git
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
    </>
  );
};

const Pricing = () => {
  const pricingPlans: PricingCardProps[] = [
    {
      title: "Konaklama Yayınlama",
      old_price: "15.000 ₺",
      price: "10.000 ₺",
      features: [
        "1 adet konaklama yayınlama",
        "Aparthouse Business Panel",
        "Online Destek",
      ],
      isPopular: true
    },
  
  ];

  return (
    <div className="relative min-h-screen overflow-hidden mt-2 md:mt-0 ">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 -z-10"></div>
      
      {/* Blurred Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fiyatlandırma Planları
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Konaklamanızı yayınlamak için en uygun planı seçin
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
