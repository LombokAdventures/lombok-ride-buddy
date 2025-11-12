-- Add multi-language description columns to bikes table
ALTER TABLE public.bikes
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_ru TEXT,
ADD COLUMN IF NOT EXISTS description_id TEXT,
ADD COLUMN IF NOT EXISTS description_de TEXT,
ADD COLUMN IF NOT EXISTS description_uz TEXT,
ADD COLUMN IF NOT EXISTS features_en TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS features_ru TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS features_id TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS features_de TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS features_uz TEXT[] DEFAULT '{}';

-- Copy existing English descriptions to new column (for backwards compatibility)
UPDATE public.bikes
SET description_en = description
WHERE description IS NOT NULL AND description_en IS NULL;

-- Migrate existing features to English column
UPDATE public.bikes
SET features_en = features
WHERE features IS NOT NULL AND array_length(features, 1) > 0 AND features_en = '{}';
