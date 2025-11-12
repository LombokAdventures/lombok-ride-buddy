-- Add admin policy to view all reviews (not just approved)
CREATE POLICY "Admins can view all reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Drop tour_emails and villa_emails tables
DROP TABLE IF EXISTS public.tour_emails;
DROP TABLE IF EXISTS public.villa_emails;

-- Update hero images with new Lombok beach images
DELETE FROM public.hero_images;

INSERT INTO public.hero_images (image_url, title, subtitle, display_order, is_active) VALUES
('hero-lombok-1.jpg', 'Paradise Found', 'Discover pristine beaches and crystal waters', 1, true),
('hero-lombok-2.jpg', 'Sunset Dreams', 'Experience magical golden hour moments', 2, true),
('hero-lombok-3.jpg', 'Underwater Wonder', 'Explore vibrant coral reefs', 3, true),
('hero-lombok-4.jpg', 'Mountain Majesty', 'Adventure awaits in lush tropical forests', 4, true),
('hero-lombok-5.jpg', 'Island Serenity', 'Relax in tropical paradise', 5, true);