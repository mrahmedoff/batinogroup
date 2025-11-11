'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.az;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract locale from pathname as fallback
  const pathnameLocale = pathname?.split('/')[1] as Language;
  const currentLocale = (params?.locale as Language) || pathnameLocale || 'en';
  
  // Initialize with the current locale to match server rendering
  const [language, setLanguageState] = useState<Language>(currentLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (currentLocale && ['az', 'en'].includes(currentLocale)) {
      setLanguageState(currentLocale);
    }
    setIsHydrated(true);
  }, [currentLocale]);

  const setLanguage = (lang: Language) => {
    if (!isHydrated) return;
    
    // Save to cookie for middleware
    document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
    
    // Navigate to new locale
    const newPathname = pathname.replace(`/${language}`, `/${lang}`);
    router.push(newPathname);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
