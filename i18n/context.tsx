'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale } from './config';

// Import translation messages
import trMessages from '../messages/tr.json';
import enMessages from '../messages/en.json';

type Messages = typeof trMessages;

const messages: Record<Locale, Messages> = {
  tr: trMessages,
  en: enMessages,
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
    // Dil kodunu normalize et (tr-TR -> tr, en-US -> en)
    const normalizedLang = lang.split('-')[0].toLowerCase();
    
    // Desteklenen diller arasında var mı?
    if (normalizedLang === 'tr') return 'tr';
    if (normalizedLang === 'en') return 'en';
  }
  
  return defaultLocale;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // Load language preference: localStorage -> browser -> default
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    
    if (savedLocale && (savedLocale === 'tr' || savedLocale === 'en')) {
      // 1. öncelik: Kayıtlı dil tercihi
      setLocale(savedLocale);
    } else {
      // 2. öncelik: Browser'ın algılanan dili
      const browserLang = detectBrowserLanguage();
      setLocale(browserLang);
      
      // Browser dilini localStorage'a kaydet (sessiz kayıt)
      try {
        localStorage.setItem('locale', browserLang);
      } catch (error) {
        console.warn('Could not save detected language to localStorage:', error);
      }
    }
  }, []);

  // Save language to localStorage when changed
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
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