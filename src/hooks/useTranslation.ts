import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Translations = Record<string, string>;

const useTranslation = () => {
  const { locale } = useRouter();
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        const data: Translations = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
  }, [locale]);

  return { t: (key: string) => translations[key] || key, locale };
};

export default useTranslation;