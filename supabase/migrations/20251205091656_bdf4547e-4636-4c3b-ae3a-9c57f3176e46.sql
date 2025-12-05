-- Add PERMISSIVE admin select policies for admin panel access

-- REVIEWS TABLE - Admins need to see ALL reviews (including pending)
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;
CREATE POLICY "Admins can view all reviews" 
ON public.reviews 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- HERO_IMAGES TABLE - Admins need to see inactive images too
DROP POLICY IF EXISTS "Admins can view all hero images" ON public.hero_images;
CREATE POLICY "Admins can view all hero images" 
ON public.hero_images 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- COMPANY_INFO TABLE - Admins need to see inactive items too
DROP POLICY IF EXISTS "Admins can view all company info" ON public.company_info;
CREATE POLICY "Admins can view all company info" 
ON public.company_info 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- WAITLIST_REQUESTS TABLE - Admins need to view all requests
DROP POLICY IF EXISTS "Admins can view all waitlist requests" ON public.waitlist_requests;
CREATE POLICY "Admins can view all waitlist requests" 
ON public.waitlist_requests 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'));