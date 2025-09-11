'use client';

import { useLanguage } from '@/i18n/context';
import { locales, languages } from '@/i18n/config';
import { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa6';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-sm font-medium text-gray-700"
      >
        <FaGlobe className="text-gray-500" size={14} />
        <span className="hidden md:inline">{languages[locale]}</span>
        <span className="md:hidden">{locale.toUpperCase()}</span>
        <FaChevronDown 
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          size={12} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLocale(lang);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 text-sm font-medium ${
                locale === lang 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">
                  {lang.toUpperCase()}
                </span>
                <span>{languages[lang]}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 