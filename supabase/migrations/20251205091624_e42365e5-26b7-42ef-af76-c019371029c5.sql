-- Fix RLS policies: Change RESTRICTIVE to PERMISSIVE for public access policies

-- BIKES TABLE
DROP POLICY IF EXISTS "Anyone can view bikes" ON public.bikes;
CREATE POLICY "Anyone can view bikes" 
ON public.bikes 
FOR SELECT 
TO public
USING (true);

-- BIKE_IMAGES TABLE
DROP POLICY IF EXISTS "Anyone can view bike images" ON public.bike_images;
CREATE POLICY "Anyone can view bike images" 
ON public.bike_images 
FOR SELECT 
TO public
USING (true);

-- HERO_IMAGES TABLE
DROP POLICY IF EXISTS "Anyone can view active hero images" ON public.hero_images;
CREATE POLICY "Anyone can view active hero images" 
ON public.hero_images 
FOR SELECT 
TO public
USING (is_active = true);

-- COMPANY_INFO TABLE
DROP POLICY IF EXISTS "Anyone can view active company info" ON public.company_info;
CREATE POLICY "Anyone can view active company info" 
ON public.company_info 
FOR SELECT 
TO public
USING (is_active = true);

-- REVIEWS TABLE - public access for approved reviews
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
CREATE POLICY "Anyone can view approved reviews" 
ON public.reviews 
FOR SELECT 
TO public
USING (approval_status = 'approved');

-- REVIEWS TABLE - public insert for anyone to submit reviews
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
CREATE POLICY "Anyone can submit reviews" 
ON public.reviews 
FOR INSERT 
TO public
WITH CHECK (true);

-- WAITLIST_REQUESTS TABLE - public insert
DROP POLICY IF EXISTS "Anyone can submit waitlist requests" ON public.waitlist_requests;
CREATE POLICY "Anyone can submit waitlist requests" 
ON public.waitlist_requests 
FOR INSERT 
TO public
WITH CHECK (true);