# 🚨 FIX REVIEWS NOW - Run This SQL

## The Problem
Your admin panel fetches **0 reviews** but you have **3 reviews** in the database.
This means the SELECT policy is blocking access.

## The Solution - Run This SQL in Supabase:

```sql
-- Step 1: Check current policy on reviews
SELECT * FROM pg_policies WHERE tablename = 'reviews';

-- Step 2: Drop the restrictive policy
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can view all reviews" ON public.reviews;

-- Step 3: Create a new policy that shows ALL reviews
CREATE POLICY "Admin can view all reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

-- Step 4: Test - This should return your 3 reviews
SELECT * FROM reviews;
```

## OR Quick Test - Run This:

```sql
-- Disable RLS temporarily to test
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Check if you can see reviews now
SELECT * FROM reviews;

-- If that works, the problem is definitely the policy
-- Then re-enable RLS:
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- And apply the correct policy above
```

## After Running the SQL:

1. Go back to admin panel
2. Click "Refresh Reviews" button
3. Check console - should now show "Total reviews: 3"

**Run the SQL now and tell me what happens!**
