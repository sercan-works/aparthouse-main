'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale } from './config';

// Import translation messages
import trMessages from '../messages/tr.json';
import enMessages from '../messages/en.json';
import ruMessages from '../messages/ru.json';

type Messages = typeof trMessages;

const messages: Record<Locale, Messages> = {
  tr: trMessages,
  en: enMessages,
  ru: ruMessages,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Browser dilini algılayan yardımcı fonksiyon
const detectBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;
  
  // Navigator dillerini kontrol et
  const browserLangs = navigator.languages || [navigator.language];
  
  for (const lang of browserLangs) {
    // Dil kodunu normalize et (tr-TR -> tr, en-US -> en, ru-RU -> ru)
    const normalizedLang = lang.split('-')[0].toLowerCase();
    
    // Desteklenen diller arasında var mı?
    if (normalizedLang === 'tr') return 'tr';
    if (normalizedLang === 'en') return 'en';
    if (normalizedLang === 'ru') return 'ru';
  }
  
  return defaultLocale;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // Load language preference: localStorage -> browser -> default
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    const userManuallyChanged = localStorage.getItem('userManuallyChanged') === 'true';
    
    if (savedLocale && (savedLocale === 'tr' || savedLocale === 'en' || savedLocale === 'ru') && userManuallyChanged) {
      // Kullanıcı manuel olarak değiştirdiyse, kayıtlı tercihi kullan
      setLocale(savedLocale);
    } else {
      // Kullanıcı manuel değiştirmediyse, tarayıcı dilini kullan
      const browserLang = detectBrowserLanguage();
      setLocale(browserLang);
      
      // Browser dilini localStorage'a kaydet
      try {
        localStorage.setItem('locale', browserLang);
        localStorage.setItem('userManuallyChanged', 'false');
      } catch (error) {
        console.warn('Could not save detected language to localStorage:', error);
      }
    }
  }, []);

  // Tarayıcı dil değişikliklerini dinle
  useEffect(() => {
    const userManuallyChanged = localStorage.getItem('userManuallyChanged') === 'true';
    
    // Kullanıcı manuel değiştirmediyse, tarayıcı dilini takip et
    if (!userManuallyChanged) {
      const checkBrowserLanguage = () => {
        const browserLang = detectBrowserLanguage();
        if (browserLang !== locale) {
          setLocale(browserLang);
          localStorage.setItem('locale', browserLang);
        }
      };

      // Sayfa yüklendiğinde kontrol et
      checkBrowserLanguage();

      // Dil değişikliklerini dinle (bazı tarayıcılarda desteklenir)
      if (typeof window !== 'undefined') {
        window.addEventListener('languagechange', checkBrowserLanguage);
        return () => {
          window.removeEventListener('languagechange', checkBrowserLanguage);
        };
      }
    }
  }, [locale]);

  // Save language to localStorage when changed
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    localStorage.setItem('userManuallyChanged', 'true'); // Kullanıcı manuel değiştirdi
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 