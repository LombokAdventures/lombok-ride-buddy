import { Language } from '@/data/translations';

const featureTranslations: Record<string, Record<Language, string>> = {
  // Helmet features
  'Free Helmet': {
    en: 'Free Helmet',
    ru: 'Бесплатный шлем',
    id: 'Helm Gratis',
    de: 'Kostenloser Helm'
  },
  'Helmet Included': {
    en: 'Helmet Included',
    ru: 'Шлем включен',
    id: 'Helm Termasuk',
    de: 'Helm Inklusive'
  },
  
  // Lock features
  'Lock Included': {
    en: 'Lock Included',
    ru: 'Замок включен',
    id: 'Kunci Termasuk',
    de: 'Schloss Inklusive'
  },
  'Free Lock': {
    en: 'Free Lock',
    ru: 'Бесплатный замок',
    id: 'Kunci Gratis',
    de: 'Kostenloses Schloss'
  },
  
  // Fuel features
  'Fuel Efficient': {
    en: 'Fuel Efficient',
    ru: 'Экономичный',
    id: 'Hemat Bahan Bakar',
    de: 'Kraftstoffeffizient'
  },
  
  // City/Urban features
  'Perfect for City': {
    en: 'Perfect for City',
    ru: 'Идеально для города',
    id: 'Sempurna untuk Kota',
    de: 'Perfekt für die Stadt'
  },
  'City Ride': {
    en: 'City Ride',
    ru: 'Городская поездка',
    id: 'Perjalanan Kota',
    de: 'Stadtfahrt'
  },
  
  // Insurance
  'Insurance': {
    en: 'Insurance',
    ru: 'Страховка',
    id: 'Asuransi',
    de: 'Versicherung'
  },
  'Insurance Included': {
    en: 'Insurance Included',
    ru: 'Страховка включена',
    id: 'Asuransi Termasuk',
    de: 'Versicherung Inklusive'
  },
  
  // Support
  '24/7 Support': {
    en: '24/7 Support',
    ru: 'Поддержка 24/7',
    id: 'Dukungan 24/7',
    de: 'Support 24/7'
  },
  
  // GPS
  'Free GPS': {
    en: 'Free GPS',
    ru: 'Бесплатный GPS',
    id: 'GPS Gratis',
    de: 'Kostenloses GPS'
  },
  'GPS Included': {
    en: 'GPS Included',
    ru: 'GPS включен',
    id: 'GPS Termasuk',
    de: 'GPS Inklusive'
  },
  
  // Delivery
  'Free Delivery': {
    en: 'Free Delivery',
    ru: 'Бесплатная доставка',
    id: 'Pengantaran Gratis',
    de: 'Kostenlose Lieferung'
  },
  
  // Maintenance
  'Well Maintained': {
    en: 'Well Maintained',
    ru: 'Ухоженный',
    id: 'Terawat Baik',
    de: 'Gut Gewartet'
  },
  
  // Comfort
  'Comfortable': {
    en: 'Comfortable',
    ru: 'Удобный',
    id: 'Nyaman',
    de: 'Komfortabel'
  },
  'Comfortable Seat': {
    en: 'Comfortable Seat',
    ru: 'Удобное сиденье',
    id: 'Kursi Nyaman',
    de: 'Bequemer Sitz'
  },
  
  // Storage
  'Under Seat Storage': {
    en: 'Under Seat Storage',
    ru: 'Отсек под сиденьем',
    id: 'Penyimpanan Bawah Kursi',
    de: 'Stauraum unter dem Sitz'
  },
  
  // Modern
  'Modern Design': {
    en: 'Modern Design',
    ru: 'Современный дизайн',
    id: 'Desain Modern',
    de: 'Modernes Design'
  },
  
  // Popular
  'Most Popular': {
    en: 'Most Popular',
    ru: 'Самый популярный',
    id: 'Paling Populer',
    de: 'Am beliebtesten'
  },
  
  // Beginners
  'Perfect for Beginners': {
    en: 'Perfect for Beginners',
    ru: 'Идеально для начинающих',
    id: 'Sempurna untuk Pemula',
    de: 'Perfekt für Anfänger'
  },
  
  // New/Clean
  'New Model': {
    en: 'New Model',
    ru: 'Новая модель',
    id: 'Model Baru',
    de: 'Neues Modell'
  },
  'Clean': {
    en: 'Clean',
    ru: 'Чистый',
    id: 'Bersih',
    de: 'Sauber'
  }
};

export function translateFeature(feature: string, language: Language): string {
  // Try exact match first
  if (featureTranslations[feature]) {
    return featureTranslations[feature][language];
  }
  
  // Try case-insensitive match
  const lowerFeature = feature.toLowerCase();
  const matchedKey = Object.keys(featureTranslations).find(
    key => key.toLowerCase() === lowerFeature
  );
  
  if (matchedKey) {
    return featureTranslations[matchedKey][language];
  }
  
  // Return original if no translation found
  return feature;
}
