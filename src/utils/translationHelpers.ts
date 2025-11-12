import { Language } from '@/data/translations';
import { getBikeDescription, getBikeFeatures } from './bikeDataHelper';

/**
 * Get translated description for a bike based on language
 * Priority: JSON data > Database language-specific > Database default
 */
export const getTranslatedDescription = (
  bike: any,
  language: Language
): string => {
  return getBikeDescription(bike, language);
};

/**
 * Get translated features for a bike based on language
 * Priority: JSON data > Database language-specific > Database default
 */
export const getTranslatedFeatures = (
  bike: any,
  language: Language
): string[] => {
  return getBikeFeatures(bike, language);
};
