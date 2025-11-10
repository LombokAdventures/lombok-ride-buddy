import { Language } from '@/data/translations';

const featureTranslations: Record<string, Record<Language, string>> = {
  // Helmet features
  'Free Helmet': {
    en: 'Free Helmet',
    ru: 'Бесплатный шлем',
    id: 'Helm Gratis',
    de: 'Kostenloser Helm',
    uz: 'Bepul Dubulga'
  },
  'Helmet Included': {
    en: 'Helmet Included',
    ru: 'Шлем включен',
    id: 'Helm Termasuk',
    de: 'Helm Inklusive',
    uz: 'Dubulga Kiritilgan'
  },

  // Lock features
  'Lock Included': {
    en: 'Lock Included',
    ru: 'Замок включен',
    id: 'Kunci Termasuk',
    de: 'Schloss Inklusive',
    uz: 'Qulf Kiritilgan'
  },
  'Free Lock': {
    en: 'Free Lock',
    ru: 'Бесплатный замок',
    id: 'Kunci Gratis',
    de: 'Kostenloses Schloss',
    uz: 'Bepul Qulf'
  },

  // Fuel features
  'Fuel Efficient': {
    en: 'Fuel Efficient',
    ru: 'Экономичный',
    id: 'Hemat Bahan Bakar',
    de: 'Kraftstoffeffizient',
    uz: 'Yoqilg\'i Tejamkor'
  },

  // City/Urban features
  'Perfect for City': {
    en: 'Perfect for City',
    ru: 'Идеально для города',
    id: 'Sempurna untuk Kota',
    de: 'Perfekt für die Stadt',
    uz: 'Shahar Uchun Mukammal'
  },
  'City Ride': {
    en: 'City Ride',
    ru: 'Городская поездка',
    id: 'Perjalanan Kota',
    de: 'Stadtfahrt',
    uz: 'Shahar Sayohati'
  },

  // Insurance
  'Insurance': {
    en: 'Insurance',
    ru: 'Страховка',
    id: 'Asuransi',
    de: 'Versicherung',
    uz: 'Sug\'urta'
  },
  'Insurance Included': {
    en: 'Insurance Included',
    ru: 'Страховка включена',
    id: 'Asuransi Termasuk',
    de: 'Versicherung Inklusive',
    uz: 'Sug\'urta Kiritilgan'
  },

  // Support
  '24/7 Support': {
    en: '24/7 Support',
    ru: 'Поддержка 24/7',
    id: 'Dukungan 24/7',
    de: 'Support 24/7',
    uz: '24/7 Yordam'
  },

  // GPS
  'Free GPS': {
    en: 'Free GPS',
    ru: 'Бесплатный GPS',
    id: 'GPS Gratis',
    de: 'Kostenloses GPS',
    uz: 'Bepul GPS'
  },
  'GPS Included': {
    en: 'GPS Included',
    ru: 'GPS включен',
    id: 'GPS Termasuk',
    de: 'GPS Inklusive',
    uz: 'GPS Kiritilgan'
  },

  // Delivery
  'Free Delivery': {
    en: 'Free Delivery',
    ru: 'Бесплатная доставка',
    id: 'Pengantaran Gratis',
    de: 'Kostenlose Lieferung',
    uz: 'Bepul Yetkazib Berish'
  },

  // Maintenance
  'Well Maintained': {
    en: 'Well Maintained',
    ru: 'Ухоженный',
    id: 'Terawat Baik',
    de: 'Gut Gewartet',
    uz: 'Yaxshi Parvarish Qilingan'
  },

  // Comfort
  'Comfortable': {
    en: 'Comfortable',
    ru: 'Удобный',
    id: 'Nyaman',
    de: 'Komfortabel',
    uz: 'Qulay'
  },
  'Comfortable Seat': {
    en: 'Comfortable Seat',
    ru: 'Удобное сиденье',
    id: 'Kursi Nyaman',
    de: 'Bequemer Sitz',
    uz: 'Qulay O\'rindiq'
  },

  // Storage
  'Under Seat Storage': {
    en: 'Under Seat Storage',
    ru: 'Отсек под сиденьем',
    id: 'Penyimpanan Bawah Kursi',
    de: 'Stauraum unter dem Sitz',
    uz: 'O\'rindiq Ostida Saqlash'
  },
  'Large Storage': {
    en: 'Large Storage',
    ru: 'Большой багажник',
    id: 'Penyimpanan Besar',
    de: 'Großer Stauraum',
    uz: 'Katta Saqlash'
  },

  // Modern
  'Modern Design': {
    en: 'Modern Design',
    ru: 'Современный дизайн',
    id: 'Desain Modern',
    de: 'Modernes Design',
    uz: 'Zamonaviy Dizayn'
  },

  // Popular
  'Most Popular': {
    en: 'Most Popular',
    ru: 'Самый популярный',
    id: 'Paling Populer',
    de: 'Am beliebtesten',
    uz: 'Eng Mashhur'
  },

  // Beginners
  'Perfect for Beginners': {
    en: 'Perfect for Beginners',
    ru: 'Идеально для начинающих',
    id: 'Sempurna untuk Pemula',
    de: 'Perfekt für Anfänger',
    uz: 'Yangi Boshlanuvchilar Uchun'
  },

  // New/Clean
  'New Model': {
    en: 'New Model',
    ru: 'Новая модель',
    id: 'Model Baru',
    de: 'Neues Modell',
    uz: 'Yangi Model'
  },
  'Clean': {
    en: 'Clean',
    ru: 'Чистый',
    id: 'Bersih',
    de: 'Sauber',
    uz: 'Toza'
  },

  // USB Charger
  'USB Charger': {
    en: 'USB Charger',
    ru: 'USB зарядка',
    id: 'Pengisi USB',
    de: 'USB-Ladegerät',
    uz: 'USB Zaryadlovchi'
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
