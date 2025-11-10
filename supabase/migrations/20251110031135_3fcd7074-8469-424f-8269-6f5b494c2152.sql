-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Add UPDATE policy for bikes (admins only)
CREATE POLICY "Admins can update bikes"
ON public.bikes
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for bikes (admins only)
CREATE POLICY "Admins can delete bikes"
ON public.bikes
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add INSERT policy for bikes (admins only)
CREATE POLICY "Admins can insert bikes"
ON public.bikes
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE policy for reviews (admins only)
CREATE POLICY "Admins can update reviews"
ON public.reviews
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for reviews (admins only)
CREATE POLICY "Admins can delete reviews"
ON public.reviews
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add SELECT policy for tour_emails (admins only)
CREATE POLICY "Admins can view tour emails"
ON public.tour_emails
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for tour_emails (admins only)
CREATE POLICY "Admins can delete tour emails"
ON public.tour_emails
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add SELECT policy for villa_emails (admins only)
CREATE POLICY "Admins can view villa emails"
ON public.villa_emails
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for villa_emails (admins only)
CREATE POLICY "Admins can delete villa emails"
ON public.villa_emails
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));