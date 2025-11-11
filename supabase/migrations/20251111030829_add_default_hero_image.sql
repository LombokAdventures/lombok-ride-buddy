-- Add the default hero background image to the database
-- This image is used as the fallback when no other images are available
INSERT INTO public.hero_images (image_url, title, subtitle, display_order, is_active)
VALUES (
  '/assets/hero-background.jpg',
  'Lombok Island Adventure',
  'Experience the thrill of riding in paradise',
  0,
  true
);
