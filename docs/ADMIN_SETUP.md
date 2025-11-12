# Admin Panel Setup Guide

## Creating Your First Admin User

To access the admin panel at `/admin`, you need to create a user account and assign it the admin role.

### Step 1: Create a User Account

You have two options:

#### Option A: Using SQL (Direct Database Access)
Run this SQL in your Lovable Cloud database (replace with your email and generate a secure password):

```sql
-- This is just a placeholder - you'll need to sign up through the app first
-- Then run the query below with your actual user_id
```

#### Option B: Create a Signup Page (Recommended)
1. Ask me to create a signup page at `/signup`
2. Sign up with your email and password
3. Get your user ID from the auth.users table
4. Run the SQL below to make yourself an admin

### Step 2: Assign Admin Role

After creating your user account, run this SQL to assign the admin role (replace `YOUR_USER_ID` with your actual user ID from auth.users):

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin');
```

### Step 3: Access the Admin Panel

1. Go to `/admin`
2. Log in with your email and password
3. You should now see the full admin panel

## Admin Panel Features

### Bikes Tab
- ✅ View all bikes with real-time updates
- ✅ Change bike status (available/rented)
- ✅ Update pricing (daily, weekly, monthly)
- ✅ Upload and change bike images
- ✅ All changes reflect immediately on the client

### Reviews Tab
- ✅ View all submitted reviews
- ✅ Approve or reject reviews
- ✅ Only approved reviews appear on the website
- ✅ Real-time updates

### Tour Emails Tab
- ✅ View all tour inquiry emails
- ✅ Delete emails when processed
- ✅ Sorted by newest first

### Villa Emails Tab
- ✅ View all villa inquiry emails
- ✅ Delete emails when processed
- ✅ Sorted by newest first

## Security Features

- ✅ Server-side authentication required
- ✅ Role-based access control (admin only)
- ✅ Row Level Security (RLS) policies protect all data
- ✅ Secure image upload with file type and size validation
- ✅ Real-time synchronization across all devices

## Quick SQL to Find Your User ID

After signing up, run this to find your user ID:

```sql
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;
```

Then use the ID in the admin role assignment query above.
