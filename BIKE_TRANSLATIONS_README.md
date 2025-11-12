# Bike Translations Management

## Overview

Bike data and translations are now managed through a **JSON file** instead of database migrations. This makes it much easier to update bike information, add new bikes, and manage translations without running SQL migrations.

## How It Works

### Priority System

The system follows this priority for bike data:
1. **JSON file** (`src/data/bikesData.json`) - Primary source
2. **Database language-specific columns** (`description_en`, `features_ru`, etc.)
3. **Database default columns** (`description`, `features`)

### Files

- **`src/data/bikesData.json`** - Main bike data file with all translations
- **`src/utils/bikeDataHelper.ts`** - Helper functions to get bike data
- **`src/utils/translationHelpers.ts`** - Translation wrapper functions

## How to Update Bike Data

### 1. Edit Existing Bike

Just edit the JSON file at `src/data/bikesData.json`:

```json
{
  "bikes": [
    {
      "id": "honda-beat",
      "name": "Honda Beat",
      "descriptions": {
        "en": "Your English description here",
        "ru": "Русское описание здесь",
        "id": "Deskripsi Indonesia di sini",
        "de": "Deutsche Beschreibung hier",
        "uz": "O'zbek tavsifi bu yerda",
        "ar": "الوصف العربي هنا"
      },
      "features": {
        "en": ["Feature 1", "Feature 2"],
        "ru": ["Функция 1", "Функция 2"],
        "id": ["Fitur 1", "Fitur 2"],
        "de": ["Funktion 1", "Funktion 2"],
        "uz": ["Xususiyat 1", "Xususiyat 2"],
        "ar": ["ميزة 1", "ميزة 2"]
      }
    }
  ]
}
```

**That's it!** No migrations needed. Just edit and save.

### 2. Add New Bike

Add a new object to the `bikes` array in `bikesData.json`:

```json
{
  "id": "new-bike-id",
  "name": "New Bike Name",
  "model": "125cc",
  "engine": "125cc",
  "transmission": "Automatic",
  "fuel_capacity": "5L",
  "daily_price": 8,
  "weekly_price": 45,
  "monthly_price": 150,
  "descriptions": {
    "en": "English description",
    "ru": "Russian description",
    "id": "Indonesian description",
    "de": "German description",
    "uz": "Uzbek description",
    "ar": "Arabic description"
  },
  "features": {
    "en": ["Feature 1", "Feature 2", "Feature 3"],
    "ru": ["Функция 1", "Функция 2", "Функция 3"],
    "id": ["Fitur 1", "Fitur 2", "Fitur 3"],
    "de": ["Funktion 1", "Funktion 2", "Funktion 3"],
    "uz": ["Xususiyat 1", "Xususiyat 2", "Xususiyat 3"],
    "ar": ["ميزة 1", "ميزة 2", "ميزة 3"]
  }
}
```

### 3. Update Prices

Just change the price values in the JSON:

```json
{
  "id": "honda-beat",
  "daily_price": 6,  // Changed from 5 to 6
  "weekly_price": 35,
  "monthly_price": 120
}
```

## Supported Languages

All bikes support these 6 languages:
- **en** - English
- **ru** - Russian (Русский)
- **id** - Indonesian (Bahasa Indonesia)
- **de** - German (Deutsch)
- **uz** - Uzbek (O'zbek)
- **ar** - Arabic (العربية)

## Best Practices

1. **Always add all 6 languages** when adding or updating bikes
2. **Match the bike ID** with the database ID for proper integration
3. **Keep descriptions concise** - 2-4 sentences is ideal
4. **Features should be short** - 2-4 words maximum
5. **Use consistent naming** - Keep bike names the same across all languages

## Example: Complete Bike Entry

```json
{
  "id": "honda-vario-125",
  "name": "Honda Vario 125",
  "model": "125cc",
  "engine": "125cc",
  "transmission": "CVT",
  "fuel_capacity": "5.5L",
  "daily_price": 8,
  "weekly_price": 45,
  "monthly_price": 150,
  "descriptions": {
    "en": "The versatile all-rounder for island adventures. Powerful enough for uphill climbs to waterfalls and temples, yet economical for city riding.",
    "ru": "Универсальный универсал для островных приключений. Достаточно мощный для подъема к водопадам и храмам, но экономичный для городской езды.",
    "id": "Serbaguna untuk petualangan pulau. Cukup kuat untuk mendaki ke air terjun dan kuil, namun ekonomis untuk berkendara di kota.",
    "de": "Der vielseitige Allrounder für Inselabenteuer. Kraftvoll genug für Bergauffahrten zu Wasserfällen und Tempeln.",
    "uz": "Orol sarguzashtlari uchun ko'p qirrali universal. Sharsharalar va ibodatxonalarga ko'tarilish uchun etarli kuchli.",
    "ar": "متعدد الاستخدامات لمغامرات الجزيرة. قوي بما يكفي للصعود إلى الشلالات والمعابد."
  },
  "features": {
    "en": ["Helmet included", "24/7 support", "USB charger", "Large storage"],
    "ru": ["Шлем включен", "Поддержка 24/7", "USB-зарядка", "Большое хранилище"],
    "id": ["Helm termasuk", "Dukungan 24/7", "Pengisi daya USB", "Penyimpanan besar"],
    "de": ["Helm inklusive", "Support 24/7", "USB-Ladegerät", "Großer Stauraum"],
    "uz": ["Dubulga kiritilgan", "24/7 yordam", "USB zaryadlovchi", "Katta saqlash"],
    "ar": ["خوذة مشمولة", "دعم 24/7", "شاحن USB", "تخزين كبير"]
  }
}
```

## Troubleshooting

### Bike not showing translations?
1. Check the bike `id` matches the database
2. Verify all language codes are correct (`en`, `ru`, `id`, `de`, `uz`, `ar`)
3. Make sure the JSON syntax is valid (no trailing commas, proper quotes)

### New bike not appearing?
1. The bike must exist in the database first
2. The JSON file provides translations only, not database entries
3. Add the bike to the database, then add translations to the JSON

## Technical Details

The translation system works as follows:

1. Component requests bike data with a language
2. `getTranslatedFeatures()` or `getTranslatedDescription()` is called
3. System checks JSON file first for that bike ID
4. If found in JSON, uses JSON data
5. If not in JSON, falls back to database columns
6. If no database translation, uses default/English

This allows for:
- **Easy updates** - Just edit JSON
- **Gradual migration** - Can migrate bikes one at a time
- **Backwards compatibility** - Old database approach still works
- **No downtime** - Changes take effect immediately
