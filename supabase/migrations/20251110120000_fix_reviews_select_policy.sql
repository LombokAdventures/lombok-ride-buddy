-- FIX: Add missing SELECT policy for reviews
-- The previous migration had UPDATE and DELETE but forgot SELECT!

-- Allow admins to view ALL reviews (including pending ones)
CREATE POLICY "Admins can view all reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Also allow public to view approved reviews (for the website)
CREATE POLICY "Public can view approved reviews"
ON public.reviews
FOR SELECT
TO anon
USING (approval_status = 'approved');
