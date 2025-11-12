import { Language } from '@/data/translations';

const transmissionTranslations: Record<string, Record<Language, string>> = {
  'Automatic': {
    en: 'Automatic',
    ru: 'Автомат',
    id: 'Otomatis',
    de: 'Automatik',
    uz: 'Avtomat',
    ar: 'أوتوماتيك'
  },
  'Manual': {
    en: 'Manual',
    ru: 'Ручная',
    id: 'Manual',
    de: 'Schaltgetriebe',
    uz: 'Qo\'lda',
    ar: 'يدوي'
  },
  'CVT': {
    en: 'CVT',
    ru: 'Вариатор',
    id: 'CVT',
    de: 'Stufenlos',
    uz: 'CVT',
    ar: 'CVT'
  }
};

export function translateTransmission(transmission: string, language: Language): string {
  const normalizedTransmission = transmission.trim();

  if (transmissionTranslations[normalizedTransmission]) {
    return transmissionTranslations[normalizedTransmission][language];
  }

  return transmission;
}