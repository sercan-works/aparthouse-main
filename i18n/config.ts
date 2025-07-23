export const defaultLocale = 'tr' as const;
export const locales = ['tr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const languages = {
  tr: 'Türkçe',
  en: 'English'
} as const; 