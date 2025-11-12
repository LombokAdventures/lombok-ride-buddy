import { Language } from '@/data/translations';
import bikesDataJson from '@/data/bikesData.json';

interface BikeData {
  id: string;
  name: string;
  model: string;
  engine: string;
  transmission: string;
  fuel_capacity: string;
  daily_price: number;
  weekly_price: number | null;
  monthly_price: number | null;
  descriptions: Record<Language, string>;
  features: Record<Language, string[]>;
}

interface DatabaseBike {
  id: string;
  name: string;
  model: string;
  engine: string;
  transmission: string;
  fuel_capacity: string;
  daily_price: number;
  weekly_price: number | null;
  monthly_price: number | null;
  status: string;
  image: string;
  description?: string;
  description_en?: string;
  description_ru?: string;
  description_id?: string;
  description_de?: string;
  description_uz?: string;
  description_ar?: string;
  features?: string[];
  features_en?: string[];
  features_ru?: string[];
  features_id?: string[];
  features_de?: string[];
  features_uz?: string[];
  features_ar?: string[];
  [key: string]: any;
}

/**
 * Get translated description for a bike
 * Priority: JSON data > Database language-specific > Database default
 */
export function getBikeDescription(bike: DatabaseBike, language: Language): string {
  // Try to find bike in JSON data
  const jsonBike = bikesDataJson.bikes.find(
    (b) => b.id === bike.id || b.name === bike.name
  ) as BikeData | undefined;

  // If found in JSON, use JSON description
  if (jsonBike?.descriptions?.[language]) {
    return jsonBike.descriptions[language];
  }

  // Fall back to database language-specific description
  const dbLangKey = `description_${language}` as keyof DatabaseBike;
  if (bike[dbLangKey] && typeof bike[dbLangKey] === 'string') {
    return bike[dbLangKey] as string;
  }

  // Fall back to default description
  return bike.description || '';
}

/**
 * Get translated features for a bike
 * Priority: JSON data > Database language-specific > Database default
 */
export function getBikeFeatures(bike: DatabaseBike, language: Language): string[] {
  // Try to find bike in JSON data
  const jsonBike = bikesDataJson.bikes.find(
    (b) => b.id === bike.id || b.name === bike.name
  ) as BikeData | undefined;

  // If found in JSON, use JSON features
  if (jsonBike?.features?.[language] && Array.isArray(jsonBike.features[language])) {
    return jsonBike.features[language];
  }

  // Fall back to database language-specific features
  const dbLangKey = `features_${language}` as keyof DatabaseBike;
  if (bike[dbLangKey] && Array.isArray(bike[dbLangKey])) {
    return bike[dbLangKey] as string[];
  }

  // Fall back to default features (will be translated by featureTranslator)
  return bike.features || [];
}

/**
 * Get all bike data from JSON
 * Useful for displaying static bike info when database is unavailable
 */
export function getAllBikesFromJson(): BikeData[] {
  return bikesDataJson.bikes as BikeData[];
}

/**
 * Get a specific bike from JSON by ID or name
 */
export function getBikeFromJson(idOrName: string): BikeData | undefined {
  return bikesDataJson.bikes.find(
    (b) => b.id === idOrName || b.name === idOrName
  ) as BikeData | undefined;
}
