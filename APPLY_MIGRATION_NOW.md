# 🚨 URGENT: Apply Database Migration to Fix Admin Panel

## The Problem
You're getting "new row violates security policy for bikes" because the database policies haven't been applied yet.

## Quick Fix - Copy & Paste This SQL

### Step 1: Try to access Supabase Dashboard
Your project: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff

### Step 2: Click "SQL Editor" → "New Query"

### Step 3: Copy & Paste This Entire SQL Block:

```sql
-- Bikes: Allow public UPDATE
CREATE POLICY "Anyone can update bikes"
  ON public.bikes FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews: Allow public UPDATE
CREATE POLICY "Anyone can update reviews"
  ON public.reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews: Show ALL reviews (not just approved)
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
CREATE POLICY "Anyone can view all reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Tour Emails: Allow SELECT and DELETE
CREATE POLICY "Anyone can view tour emails"
  ON public.tour_emails FOR SELECT
  USING (true);

CREATE POLICY "Anyone can delete tour emails"
  ON public.tour_emails FOR DELETE
  USING (true);

-- Villa Emails: Allow SELECT and DELETE
CREATE POLICY "Anyone can view villa emails"
  ON public.villa_emails FOR SELECT
  USING (true);

CREATE POLICY "Anyone can delete villa emails"
  ON public.villa_emails FOR DELETE
  USING (true);
```

### Step 4: Click "RUN"

### Step 5: Test
Go to `/secret/admin` and try changing a bike - it should work now!

---

## If You Can't Access Supabase Dashboard

Wait for Lovable daily limit to reset OR contact Lovable support to apply the migration.
