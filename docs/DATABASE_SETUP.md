# Database Setup & Migration Guide

## Overview

This project uses **Supabase** as the database. All admin panel operations (bikes, reviews, emails) are stored in the database and reflected globally across all devices.

## 🔄 Automatic Migration (Recommended)

Since this project is integrated with **Lovable**, migrations are applied automatically:

1. **Push your changes to GitHub**:
   ```bash
   git push
   ```

2. **Lovable will automatically**:
   - Detect the new migration file
   - Apply it to your Supabase database
   - Update your production environment

## 🔧 Manual Migration (If Needed)

If you need to manually apply the migration:

### Option 1: Via Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. Copy and paste the contents of: `supabase/migrations/20251109120000_add_admin_policies.sql`
5. Click **Run**

### Option 2: Via Supabase CLI

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Apply all pending migrations
supabase db push
```

## 📋 What the Migration Does

The migration file `20251109120000_add_admin_policies.sql` adds the missing Row Level Security (RLS) policies:

### Bikes Table
- ✅ **UPDATE policy**: Allows admin to change prices and status
- ✅ **SELECT policy**: Already existed (public read access)

### Reviews Table
- ✅ **UPDATE policy**: Allows admin to approve/reject reviews
- ✅ **SELECT policy**: Changed to allow viewing ALL reviews (not just approved)
- ✅ **INSERT policy**: Already existed (public can submit)

### Tour Emails Table
- ✅ **SELECT policy**: Allows admin to view email inquiries
- ✅ **DELETE policy**: Allows admin to remove emails
- ✅ **INSERT policy**: Already existed (public can submit)

### Villa Emails Table
- ✅ **SELECT policy**: Allows admin to view email inquiries
- ✅ **DELETE policy**: Allows admin to remove emails
- ✅ **INSERT policy**: Already existed (public can submit)

## 🔐 Security Note

Currently, the policies allow public UPDATE/DELETE operations. The security is handled at the **application level** with password protection on the admin panel.

For production, consider implementing:
- Supabase Auth for admin users
- RLS policies that check authenticated user roles
- Admin-specific policies with `auth.uid()` checks

## ✅ Verifying Migration Success

After migration, test these in the Admin Panel (`/secret/admin`):

1. ✅ **Change bike prices** (daily/weekly/monthly)
2. ✅ **Toggle bike availability** (Available ↔ Rented)
3. ✅ **View pending reviews**
4. ✅ **Approve/reject reviews**
5. ✅ **View tour email inquiries**
6. ✅ **View villa email inquiries**
7. ✅ **Delete emails**

All changes should:
- Save to the database
- Show success toasts
- Reflect immediately on the client side (across all devices)

## 🐛 Troubleshooting

If you see errors like:
- "Failed to update price"
- "Failed to update bike status"
- "Failed to update review status"

**Check the browser console** for detailed error messages. Common issues:

1. **Migration not applied**: See manual migration steps above
2. **Wrong Supabase credentials**: Check `.env` file
3. **Network issues**: Check your internet connection
4. **RLS policies**: Verify policies exist in Supabase Dashboard → Authentication → Policies

## 📊 Database Schema

```sql
bikes (
  id TEXT PRIMARY KEY,
  name TEXT,
  model TEXT,
  daily_price DECIMAL(10,2),
  weekly_price DECIMAL(10,2),
  monthly_price DECIMAL(10,2),
  features TEXT[],
  engine TEXT,
  transmission TEXT,
  fuel_capacity TEXT,
  status TEXT CHECK (status IN ('available', 'rented')),
  image TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

reviews (
  id UUID PRIMARY KEY,
  name TEXT,
  country TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  approval_status TEXT CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

tour_emails (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMPTZ
)

villa_emails (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMPTZ
)
```

## 🚀 Next Steps

1. Push your code to GitHub (migration will auto-apply)
2. Test all admin panel features
3. Submit test reviews and emails
4. Verify everything works across different devices

Need help? Check the error messages in the browser console or Supabase logs.
