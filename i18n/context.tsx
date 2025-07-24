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

// Browser dilini algılayan yardımcı fonksiyon (sadece gerektiğinde çalışır)
const detectBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }
  
  // İlk olarak navigator.languages'i kontrol et (Chrome'da en güncel)
  if (navigator.languages && navigator.languages.length > 0) {
    const primaryLang = navigator.languages[0];
    if (primaryLang) {
      const normalizedPrimary = primaryLang.split('-')[0].toLowerCase().trim();
      
      // Desteklenen diller arasında var mı?
      if (normalizedPrimary === 'en') return 'en';
      if (normalizedPrimary === 'tr') return 'tr';
      if (normalizedPrimary === 'ru') return 'ru';
      if (normalizedPrimary === 'kk') return 'ru'; // Kazakça -> Rusça
    }
  }
  
  // Fallback için navigator.language kontrolü
  if (navigator.language) {
    const normalizedLang = navigator.language.split('-')[0].toLowerCase().trim();
    if (normalizedLang === 'en') return 'en';
    if (normalizedLang === 'tr') return 'tr';
    if (normalizedLang === 'ru') return 'ru';
  }
  
  // iOS cihazlarda Türkçe'yi öncelikli yap
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) return 'tr';
  
  return 'en'; // Chrome varsayılanı
};

// LocalStorage güvenli erişim fonksiyonları
const safeGetItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

// HTML lang attribute'unu güncelle
const updateHtmlLang = (locale: Locale) => {
  if (typeof document === 'undefined') return;
  try {
    document.documentElement.lang = locale;
  } catch {
    // Sessizce ignore et
  }
};

// localStorage'dan güvenli dil yükleme
const getStoredLanguage = (): { locale: Locale | null; isManual: boolean } => {
  const storedLocale = safeGetItem('locale') as Locale;
  const isManual = safeGetItem('userManuallyChanged') === 'true';
  
  // Geçerli dil kodlarını kontrol et
  const validLocale = (storedLocale === 'tr' || storedLocale === 'en' || storedLocale === 'ru') 
    ? storedLocale 
    : null;
    
  return { locale: validLocale, isManual };
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // İlk dil belirleme - sadece bir kez çalışır
  useEffect(() => {
    const browserLang = detectBrowserLanguage();
    const { locale: storedLocale, isManual } = getStoredLanguage();
    
    let finalLocale: Locale;
    
    if (storedLocale && isManual) {
      // Kullanıcı manuel seçim yapmışsa o tercihi kullan
      finalLocale = storedLocale;
    } else {
      // Manuel seçim yoksa browser dilini kullan
      finalLocale = browserLang;
      
      // Eğer stored locale browser'dan farklıysa güncelle
      if (storedLocale !== browserLang) {
        safeSetItem('locale', browserLang);
        safeSetItem('userManuallyChanged', 'false');
      }
    }
    
    setLocale(finalLocale);
    updateHtmlLang(finalLocale);
    setIsHydrated(true);
  }, []);

  // Sadece manual değişiklik olmadığında ve sayfa focus aldığında kontrol et
  useEffect(() => {
    if (!isHydrated) return;
    
    const { isManual } = getStoredLanguage();
    if (isManual) return; // Manuel seçim varsa browser dilini takip etme
    
    const handleFocus = () => {
      // Sadece focus alındığında kontrol et, sürekli değil
      const currentBrowserLang = detectBrowserLanguage();
      if (currentBrowserLang !== locale) {
        setLocale(currentBrowserLang);
        updateHtmlLang(currentBrowserLang);
        safeSetItem('locale', currentBrowserLang);
      }
    };

    // Sadece window focus event'ini dinle
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [locale, isHydrated]);

  // Manuel dil değiştirme
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    updateHtmlLang(newLocale);
    safeSetItem('locale', newLocale);
    safeSetItem('userManuallyChanged', 'true');
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
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