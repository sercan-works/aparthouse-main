"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Data models
interface PricingPlan {
  id: number;
  title: string;
  price: number;
  accommodationRights: number;
  isBusinessPlan: boolean;
  features: string[];
}

interface PurchaseInfo {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
}

interface BillingInfo {
  country: string;
  city: string;
  address: string;
  zipCode: string;
  taxId?: string;
  taxOffice?: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

// Sample pricing data
const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: "Başlangıç Paketi",
    price: 15000,
    accommodationRights: 1,
    isBusinessPlan: true,
    features: ["7/24 Destek", "Temel Analitikler", "Maksimum 1 Konaklama"]
  }
];

// Sample city data
const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", 
  "Adana", "Konya", "Gaziantep", "Şanlıurfa", "Kocaeli"
];

// Step component
interface StepProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const Step = ({ stepNumber, title, isActive, isCompleted }: StepProps) => {
  return (
    <div className="flex items-center">
      <div 
        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
          isActive 
            ? "border-indigo-600 bg-indigo-600 text-white" 
            : isCompleted 
              ? "border-green-500 bg-green-500 text-white"
              : "border-gray-300 text-gray-500"
        }`}
      >
        {isCompleted ? (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span>{stepNumber}</span>
        )}
      </div>
      <span className={`ml-2 text-sm font-medium ${isActive ? "text-indigo-600" : isCompleted ? "text-green-500" : "text-gray-500"}`}>
        {title}
      </span>
    </div>
  );
};

// Main component
const Pricing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>({
    fullName: "",
    email: "",
    phone: "",
    company: ""
  });
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    country: "Türkiye",
    city: "",
    address: "",
    zipCode: "",
    taxId: "",
    taxOffice: ""
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setProcessingPayment(true);
    
    // Simulate API request
    setTimeout(() => {
      setProcessingPayment(false);
      setCurrentStep(5);
    }, 2000);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Aparthouse Business
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Birkaç adımda Business üyeliğinizi tamamlayın
          </p>
        </div>

        {/* Progress Steps - Fix mobile responsiveness */}
        <div className="mb-12 overflow-hidden">
          {/* Desktop View */}
          <div className="hidden sm:flex justify-between items-center">
            <Step 
              stepNumber={1} 
              title="Paket Seçimi" 
              isActive={currentStep === 1}
              isCompleted={currentStep > 1}
            />
            <div className={`flex-1 h-0.5 mx-2 ${currentStep > 1 ? "bg-green-500" : "bg-gray-200"}`}></div>
            <Step 
              stepNumber={2} 
              title="Satın Alma Bilgileri" 
              isActive={currentStep === 2}
              isCompleted={currentStep > 2}
            />
            <div className={`flex-1 h-0.5 mx-2 ${currentStep > 2 ? "bg-green-500" : "bg-gray-200"}`}></div>
            <Step 
              stepNumber={3} 
              title="Fatura Bilgileri" 
              isActive={currentStep === 3}
              isCompleted={currentStep > 3}
            />
            <div className={`flex-1 h-0.5 mx-2 ${currentStep > 3 ? "bg-green-500" : "bg-gray-200"}`}></div>
            <Step 
              stepNumber={4} 
              title="Ödeme" 
              isActive={currentStep === 4}
              isCompleted={currentStep > 4}
            />
            <div className={`flex-1 h-0.5 mx-2 ${currentStep > 4 ? "bg-green-500" : "bg-gray-200"}`}></div>
            <Step 
              stepNumber={5} 
              title="Onay" 
              isActive={currentStep === 5}
              isCompleted={currentStep > 5}
            />
          </div>

          {/* Mobile View - Compact Steps */}
          <div className="flex sm:hidden justify-between items-center px-1">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep === step 
                      ? "border-indigo-600 bg-indigo-600 text-white" 
                      : currentStep > step 
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step ? (
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                {step < 5 && (
                  <div className={`w-full h-0.5 mt-4 ${currentStep > step ? "bg-green-500" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Step Title - Show only current step */}
          <div className="mt-3 sm:hidden text-center">
            <span className="text-sm font-medium text-indigo-600">
              {currentStep === 1 && "Paket Seçimi"}
              {currentStep === 2 && "Satın Alma Bilgileri"}
              {currentStep === 3 && "Fatura Bilgileri"}
              {currentStep === 4 && "Ödeme"}
              {currentStep === 5 && "Onay"}
            </span>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Paket Seçimi</h2>
                <div className="space-y-6">
                  {pricingPlans.map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`border-2 p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPlan?.id === plan.id 
                          ? "border-indigo-600 bg-indigo-50" 
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                          <div className="mt-1 flex items-baseline">
                            <span className="text-2xl font-bold tracking-tight text-gray-900">
                              {plan.price.toLocaleString('tr-TR')} ₺
                            </span>
                            <span className="ml-1 text-base text-gray-500">
                              /yıl + KDV
                            </span>
                          </div>
                        </div>
                        
                        {plan.isBusinessPlan && (
                          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
                            Aparthouse Business
                          </span>
                        )}
                      </div>
                      
                      <hr className="my-4 border-gray-200" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 rounded-full p-1 bg-green-100">
                            <svg className="h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700">
                            {plan.accommodationRights} adet konaklama yayınlama hakkı
                          </p>
                        </div>
                        
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="flex-shrink-0 rounded-full p-1 bg-green-100">
                              <svg className="h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="ml-3 text-sm text-gray-700">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!selectedPlan}
                    className={`px-5 py-2 rounded-lg font-medium ${
                      selectedPlan
                        ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } transition-colors duration-200`}
                  >
                    Devam Et
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Purchase Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Satın Alma Bilgileri</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      İsim Soyisim <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={purchaseInfo.fullName}
                      onChange={(e) => setPurchaseInfo({...purchaseInfo, fullName: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="İsim Soyisim"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={purchaseInfo.email}
                      onChange={(e) => setPurchaseInfo({...purchaseInfo, email: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={purchaseInfo.phone}
                      onChange={(e) => setPurchaseInfo({...purchaseInfo, phone: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="05XX XXX XX XX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Şirket Adı
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={purchaseInfo.company}
                      onChange={(e) => setPurchaseInfo({...purchaseInfo, company: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Şirket Adı"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-5 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Geri
                  </button>
                  
                  <button
                    onClick={nextStep}
                    disabled={!purchaseInfo.fullName || !purchaseInfo.email || !purchaseInfo.phone}
                    className={`px-5 py-2 rounded-lg font-medium ${
                      purchaseInfo.fullName && purchaseInfo.email && purchaseInfo.phone
                        ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } transition-colors duration-200`}
                  >
                    Devam Et
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Billing Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Fatura Bilgileri</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Ülke <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={billingInfo.country}
                      onChange={(e) => setBillingInfo({...billingInfo, country: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 focus:outline-none"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Şehir <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="city"
                      value={billingInfo.city}
                      onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" disabled>Şehir Seçin</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Adres <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      value={billingInfo.address}
                      onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      placeholder="Adres"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Posta Kodu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={billingInfo.zipCode}
                      onChange={(e) => setBillingInfo({...billingInfo, zipCode: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="34000"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                        Vergi No / T.C. Kimlik No
                      </label>
                      <input
                        type="text"
                        id="taxId"
                        value={billingInfo.taxId}
                        onChange={(e) => setBillingInfo({...billingInfo, taxId: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Vergi No / T.C. Kimlik No"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="taxOffice" className="block text-sm font-medium text-gray-700 mb-1">
                        Vergi Dairesi
                      </label>
                      <input
                        type="text"
                        id="taxOffice"
                        value={billingInfo.taxOffice}
                        onChange={(e) => setBillingInfo({...billingInfo, taxOffice: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Vergi Dairesi"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-5 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Geri
                  </button>
                  
                  <button
                    onClick={nextStep}
                    disabled={!billingInfo.city || !billingInfo.address || !billingInfo.zipCode}
                    className={`px-5 py-2 rounded-lg font-medium ${
                      billingInfo.city && billingInfo.address && billingInfo.zipCode
                        ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } transition-colors duration-200`}
                  >
                    Devam Et
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Bilgileri</h2>
                
                {selectedPlan && (
                  <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedPlan.title}</h3>
                        <p className="text-sm text-gray-600">{selectedPlan.accommodationRights} adet konaklama yayınlama hakkı</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{selectedPlan.price.toLocaleString('tr-TR')} ₺</div>
                        <div className="text-xs text-gray-600">+ KDV</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Numarası <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Üzerindeki İsim <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      value={paymentInfo.cardHolder}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardHolder: e.target.value})}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Kart Üzerindeki İsim"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Son Kullanma Tarihi <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="AA/YY"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="XXX"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        <span>Sözleşme şartlarını okudum ve kabul ediyorum.</span>
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 ml-1">Sözleşmeyi görüntüle</a>
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-5 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Geri
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={
                      !paymentInfo.cardNumber || 
                      !paymentInfo.cardHolder || 
                      !paymentInfo.expiryDate || 
                      !paymentInfo.cvv || 
                      !termsAccepted ||
                      processingPayment
                    }
                    className={`px-5 py-2 rounded-lg font-medium flex items-center ${
                      paymentInfo.cardNumber && 
                      paymentInfo.cardHolder && 
                      paymentInfo.expiryDate && 
                      paymentInfo.cvv && 
                      termsAccepted &&
                      !processingPayment
                        ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } transition-colors duration-200`}
                  >
                    {processingPayment && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {processingPayment ? "İşlem Yapılıyor..." : "Ödemeyi Tamamla"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ type: "tween", duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Ödeme Tamamlandı!</h2>
                <p className="text-gray-600 mb-6">
                  Satın alımınız başarıyla tamamlandı. İşlem detayları e-posta adresinize gönderildi.
                </p>
                
                {selectedPlan && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                    <div className="text-left">
                      <h3 className="font-medium">Satın Alınan Paket</h3>
                      <p className="text-gray-700">{selectedPlan.title}</p>
                      
                      <h3 className="font-medium mt-3">Fiyat</h3>
                      <p className="text-gray-700">{selectedPlan.price.toLocaleString('tr-TR')} ₺ + KDV</p>
                      
                      <h3 className="font-medium mt-3">Başlangıç Tarihi</h3>
                      <p className="text-gray-700">{new Date().toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    className="px-5 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Hesabıma Git
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
