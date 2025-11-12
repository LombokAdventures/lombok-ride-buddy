import { Language } from '@/data/translations';

/**
 * Get translated description for a bike based on language
 * Falls back to English if translation doesn't exist
 */
export const getTranslatedDescription = (
  bike: any,
  language: Language
): string => {
  // Check for language-specific description column first
  const descriptionKey = `description_${language}` as keyof typeof bike;

  if (bike[descriptionKey]) {
    return bike[descriptionKey];
  }

  // Fallback to English description
  if (bike.description_en) {
    return bike.description_en;
  }

  // Final fallback to legacy description field (for backwards compatibility)
  return bike.description || '';
};

/**
 * Get translated features for a bike based on language
 * Falls back to English if translation doesn't exist
 */
export const getTranslatedFeatures = (
  bike: any,
  language: Language
): string[] => {
  // Check for language-specific features column first
  const featuresKey = `features_${language}` as keyof typeof bike;

  if (bike[featuresKey] && Array.isArray(bike[featuresKey]) && bike[featuresKey].length > 0) {
    return bike[featuresKey];
  }

  // Fallback to English features
  if (bike.features_en && Array.isArray(bike.features_en) && bike.features_en.length > 0) {
    return bike.features_en;
  }

  // Final fallback to legacy features field (for backwards compatibility)
  return Array.isArray(bike.features) ? bike.features : [];
};
