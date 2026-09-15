'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Language, translate } from '@/lib/translations';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (value: string, service?: boolean) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('sorted-dz-language');
    if (storedLanguage === 'en' || storedLanguage === 'bm') setLanguageState(storedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'bm' ? 'ms' : 'en';
    document.title = translate(language, 'Sorted by DZ — Need it? Consider it sorted.');
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', translate(language, 'A personal service-connection platform in Malaysia.'));
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem('sorted-dz-language', nextLanguage);
  };

  const t = (value: string, service = false) => translate(language, value, service);

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
