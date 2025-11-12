# 🏍️ Bike Data Update Guide

## Overview

This guide explains how to update your bike fleet with real data, including descriptions, maintenance information, and pricing.

---

## 📋 What Gets Updated

For each of the 6 bikes, you'll update:

✅ **Purchase Date**: October 2025
✅ **Last Maintenance**: November 12, 2025
✅ **Next Maintenance Due**: December 12, 2025 (1 month later)
✅ **Kilometers Driven**: Realistic values per bike
✅ **Description**: Detailed bike info (2-3 sentences)
✅ **Weekly & Monthly Pricing**: Updated rates

---

## 🚀 Quick Start (3 Steps)

### Step 1: Choose Your Language
We provide bike descriptions in **5 languages**:
- 🇬🇧 English
- 🇷🇺 Russian (Русский)
- 🇮🇩 Indonesian
- 🇩🇪 German (Deutsch)
- 🇺🇿 Uzbek (Ўзбек)

### Step 2: Copy the SQL Script

**Option A: English (Recommended for first-time)**
```bash
File: UPDATE_BIKES_WITH_REAL_DATA.sql
```

**Option B: Other Languages**
```bash
File: UPDATE_BIKES_MULTILANGUAGE.sql
```

### Step 3: Run in Supabase

Go to: **Supabase Dashboard → SQL Editor → Paste → Run**

---

## 📖 Detailed Instructions

### Method 1: Using Admin SQL Console (Easiest)

1. **Log in to Admin Panel**
   - Navigate to `/admin` on your app
   - Login with admin credentials

2. **Go to SQL Console Tab**
   - Click on the "SQL Console" tab in the admin dashboard
   - You'll see the SQL Console interface

3. **Copy & Paste Script**
   - Open `UPDATE_BIKES_WITH_REAL_DATA.sql` (or multilanguage version)
   - Copy the entire script (or just one language section)
   - Paste into the SQL Console textarea

4. **Execute**
   - Click "Execute Query" button
   - Wait for success message
   - Check results section

5. **Verify**
   - The console shows success/error status
   - Data is immediately live in your database

### Method 2: Using Supabase Dashboard

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Select your project: `mbbdaettoxezvftsfiff`

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "+ New query"

3. **Paste Script**
   - Copy content from `UPDATE_BIKES_WITH_REAL_DATA.sql`
   - Paste into the query editor

4. **Execute**
   - Click the "Run" button (or Ctrl+Enter)
   - See "Success" message

5. **Verify Changes**
   - Run this verification query:
   ```sql
   SELECT name, purchase_date, last_maintenance_date,
          next_maintenance_due, description
   FROM bikes
   ORDER BY daily_price;
   ```

---

## 🌍 Language Versions

### English Description Example (Honda Beat):
```
Honda Beat 110cc - Perfect for exploring Lombok's coastal villages
and narrow island roads. Ideal for solo travelers and budget-conscious
adventurers. Excellent fuel efficiency (55+ km/liter) makes it perfect
for long island explorations...
```

### Russian Description Example (Honda Beat):
```
Honda Beat 110cc - Идеален для исследования прибрежных деревень
Ломбока и узких дорог острова. Идеален для одиноких путешественников
и туристов с ограниченным бюджетом...
```

### Indonesian Description Example (Honda Beat):
```
Honda Beat 110cc - Sempurna untuk menjelajahi desa-desa pesisir
Lombok dan jalan-jalan sempit pulau. Ideal untuk pelancong solo
dan wisatawan dengan anggaran terbatas...
```

---

## 📝 Bike Descriptions Include

Each bike description covers:

1. **What it is**: Model, CC, type
2. **Where it's good**: Terrain, conditions, best use cases
3. **Why choose it**: Key benefits and unique features
4. **Key points**: Performance, comfort, fuel efficiency

### The 6 Bikes:

| Bike | CC | Purpose | Daily |
|------|----|---------||-------|
| Honda Beat | 110cc | Budget city commuter | $5 |
| Honda Scoopy Street | 110cc | Stylish urban explorer | $6 |
| Honda Vario 125 | 125cc | Versatile adventurer | $7 |
| Honda Vario 160 | 160cc | Premium performer | $9 |
| Honda PCX 160 | 160cc | Premium luxury | $12 |
| Yamaha NMAX 155 | 155cc | Sporty adventurer | $12 |

---

## ✅ Verification After Update

### In Supabase Dashboard:
```sql
-- Verify all bikes updated
SELECT
  name,
  purchase_date,
  last_maintenance_date,
  next_maintenance_due,
  kilometers_driven,
  description
FROM bikes
ORDER BY daily_price ASC;
```

### Expected Results:
- ✅ All 6 bikes have `purchase_date = 2025-10-15` (or around Oct 2025)
- ✅ All have `last_maintenance_date = 2025-11-12`
- ✅ All have `next_maintenance_due = 2025-12-12`
- ✅ Each has a detailed description (100-150 characters)
- ✅ Kilometer values are realistic (1600-3200 range)

### On Your Website:
1. Hard refresh the page (Ctrl+Shift+R)
2. Go to Fleet section
3. Click on any bike
4. See new descriptions, prices, and dates

---

## 🔄 How Frontend Displays This

### Fleet Page Shows:
- ✅ Bike name and model
- ✅ Daily, weekly, monthly pricing
- ✅ Status (available/rented)
- ✅ Features list

### Bike Details Modal Shows:
- ✅ Full description
- ✅ Detailed specs (engine, transmission, fuel)
- ✅ Images
- ✅ Features
- ✅ Purchase date (optional display)
- ✅ Maintenance dates (optional display)

---

## 🗺️ Multi-Language Support

The app supports these languages:
- **English** (en)
- **Russian** (ru)
- **Indonesian** (id)
- **German** (de)
- **Uzbek** (uz)

Users can switch languages using the language switcher in the header.

The bike descriptions you insert in the database will display correctly regardless of the app's language setting.

---

## ⚠️ Important Notes

1. **Dates Format**: All dates use ISO format `YYYY-MM-DD`
   - Valid: `2025-10-15`
   - Invalid: `10/15/2025` or `October 15`

2. **Single Quotes**: In SQL, single quotes must be escaped
   - Example: `Lombok's` becomes `Lombok''s`
   - Already handled in provided scripts ✅

3. **Backup First**: Consider making a backup before running
   - In Supabase: Settings → Database → Backups

4. **Test Updates**: Run verification query after update

5. **All 6 Bikes**: Make sure to update ALL bikes in one go

---

## 🆘 Troubleshooting

### "Query Error: Syntax error"
- ✅ Check for extra commas or missing quotes
- ✅ Try copying script again from the file

### "0 rows affected"
- ⚠️ Bike name might not match exactly
- Check current names: `SELECT DISTINCT name FROM bikes;`
- Update the WHERE clause with exact bike name

### Changes Not Showing on Frontend
- ✅ Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- ✅ Clear browser cache
- ✅ Close and reopen the browser
- ✅ Wait 5-10 seconds for Supabase replication

### "Permission denied"
- ✅ Make sure you're logged in as admin
- ✅ Check if your user role has INSERT/UPDATE permissions
- Contact Supabase support if persists

---

## 📱 Testing Across Languages

To test multi-language display:

1. **Go to your website**
2. **Click language switcher** (top right header)
3. **Select different language** (English, Russian, Indonesian, German, Uzbek)
4. **View Fleet section**
5. **Bike descriptions should display** in the selected language

*(Note: Descriptions in database are in one language. To show different descriptions per language, would need a separate translation system.)*

---

## 🎯 Files Included

| File | Purpose |
|------|---------|
| `UPDATE_BIKES_WITH_REAL_DATA.sql` | English bike descriptions + data |
| `UPDATE_BIKES_MULTILANGUAGE.sql` | 5 language options for descriptions |
| `BIKE_UPDATE_GUIDE.md` | This guide |
| `src/components/AdminSQLConsole.tsx` | SQL console component |

---

## 📞 Next Steps

1. ✅ Choose your preferred language
2. ✅ Copy the SQL script
3. ✅ Run it in SQL Console or Supabase Dashboard
4. ✅ Verify the updates
5. ✅ Test on website
6. ✅ Done! 🎉

---

**Last Updated**: November 12, 2025
**Status**: Ready to use ✅
