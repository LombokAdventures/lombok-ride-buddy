# 🚀 Apply This When Lovable Limit Resets

## ⚠️ Current Status
- ✅ Code is ready and pushed
- ✅ Migration file exists
- ❌ **Lovable daily limit hit** - Can't apply migration yet

## ✅ What To Do When Limit Resets (Tomorrow)

### Option 1: Tell Lovable (Easiest)
In Lovable chat, say:
```
Apply the database migration from supabase/migrations/20251109120000_add_admin_policies.sql
```

### Option 2: Manual SQL (If Needed)
If Lovable doesn't respond, copy this SQL:

```sql
-- Add missing policies for admin operations
CREATE POLICY "Anyone can update bikes"
  ON public.bikes FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can update reviews"
  ON public.reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
CREATE POLICY "Anyone can view all reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view tour emails"
  ON public.tour_emails FOR SELECT
  USING (true);

CREATE POLICY "Anyone can delete tour emails"
  ON public.tour_emails FOR DELETE
  USING (true);

CREATE POLICY "Anyone can view villa emails"
  ON public.villa_emails FOR SELECT
  USING (true);

CREATE POLICY "Anyone can delete villa emails"
  ON public.villa_emails FOR DELETE
  USING (true);
```

Then in Lovable, say:
```
Run this SQL on the database: [paste SQL above]
```

---

## 🎯 What This Will Fix

Once applied:
- ✅ Admin can change bike prices → Reflects globally
- ✅ Admin can toggle bike status → Updates everywhere
- ✅ Admin can view all reviews (pending, approved, rejected)
- ✅ Admin can approve/reject reviews
- ✅ Admin can view tour and villa email inquiries
- ✅ All changes sync across ALL devices worldwide

---

## ⏰ Timeline

**Right Now:** Lovable limit hit - migration can't be applied
**Tomorrow:** Limit resets → Apply migration → Everything works!

Your code is 100% ready. Just waiting for Lovable to apply the database permissions.

---

## 🔍 Verify It Worked

After applying, run:
```bash
npm run check-db
```

You should see all tests pass ✅
