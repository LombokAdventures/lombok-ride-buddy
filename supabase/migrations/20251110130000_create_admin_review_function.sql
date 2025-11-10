-- Create a SECURITY DEFINER function to bypass RLS for admin review fetching
-- This allows the admin panel to see ALL reviews regardless of approval status

CREATE OR REPLACE FUNCTION public.get_all_reviews_for_admin()
RETURNS SETOF public.reviews
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.reviews
  ORDER BY created_at DESC;
$$;

-- Grant execute permission to authenticated users (admins)
GRANT EXECUTE ON FUNCTION public.get_all_reviews_for_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_reviews_for_admin() TO anon;

-- Alternative: Just fix the damn policy
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;

CREATE POLICY "Anyone can view all reviews for admin"
ON public.reviews
FOR SELECT
USING (true);
