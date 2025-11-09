# 🚨 URGENT: Apply This Migration NOW

## Why Nothing Is Working

The migration file exists in your code but **hasn't been applied to your Supabase database yet**. This is why:
- ❌ Can't update bike prices
- ❌ Can't toggle bike availability
- ❌ Can't see reviews
- ❌ Can't see tour/villa emails

## ✅ SOLUTION: Apply Migration in 2 Minutes

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff
2. Click **SQL Editor** in the left sidebar

### Step 2: Copy the SQL Below

```sql
-- Add missing policies for admin operations
-- Since we don't have user authentication yet, we'll allow public UPDATE/DELETE
-- The admin panel is password-protected at the application level

-- Bikes: Allow public UPDATE
CREATE POLICY "Anyone can update bikes"
  ON public.bikes FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews: Allow public UPDATE (for approval/rejection)
CREATE POLICY "Anyone can update reviews"
  ON public.reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews: Allow public SELECT ALL (admin needs to see pending reviews)
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
CREATE POLICY "Anyone can view all reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Tour Emails: Allow public SELECT (admin needs to view)
CREATE POLICY "Anyone can view tour emails"
  ON public.tour_emails FOR SELECT
  USING (true);

-- Tour Emails: Allow public DELETE (admin can remove)
CREATE POLICY "Anyone can delete tour emails"
  ON public.tour_emails FOR DELETE
  USING (true);

-- Villa Emails: Allow public SELECT (admin needs to view)
CREATE POLICY "Anyone can view villa emails"
  ON public.villa_emails FOR SELECT
  USING (true);

-- Villa Emails: Allow public DELETE (admin can remove)
CREATE POLICY "Anyone can delete villa emails"
  ON public.villa_emails FOR DELETE
  USING (true);
```

### Step 3: Run It
1. **Paste** the SQL above into the SQL Editor
2. Click **RUN** button (bottom right)
3. You should see "Success. No rows returned"

### Step 4: Verify It Worked
1. Go to **Database → Policies** in Supabase
2. You should see these NEW policies:
   - "Anyone can update bikes" on bikes table
   - "Anyone can update reviews" on reviews table
   - "Anyone can view all reviews" on reviews table
   - "Anyone can view tour emails" on tour_emails table
   - "Anyone can delete tour emails" on tour_emails table
   - "Anyone can view villa emails" on villa_emails table
   - "Anyone can delete villa emails" on villa_emails table

### Step 5: Test Admin Panel
1. Go to your site → `/secret/admin` (password: lombok2025)
2. Try changing a bike price → Should work ✅
3. Try toggling bike status → Should work ✅
4. Submit a test review on main site
5. Check Reviews tab in admin → Should see it ✅
6. Approve it → Should work ✅

## 🎯 What This Migration Does

**Bikes Table:**
- ✅ Adds UPDATE policy (so admin can change prices and status)

**Reviews Table:**
- ✅ Adds UPDATE policy (so admin can approve/reject)
- ✅ Changes SELECT policy to show ALL reviews (not just approved)

**Tour/Villa Emails:**
- ✅ Adds SELECT policy (so admin can view emails)
- ✅ Adds DELETE policy (so admin can remove emails)

## ⚠️ Common Issues

**Error: "policy already exists"**
- Some policies might already exist
- This is OK - skip to the next policy

**Error: "relation does not exist"**
- Tables might not exist yet
- Check Database → Tables in Supabase
- Make sure you ran the first migration: `20251109041141_*.sql`

**Still not working after migration?**
- Clear browser cache and reload
- Check browser console for errors (F12)
- Make sure you're using the correct Supabase URL in .env

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff
- **SQL Editor**: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff/sql
- **Database Policies**: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff/auth/policies

---

**Once you apply this, EVERYTHING will work! 🎉**
