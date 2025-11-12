-- Update hero images with higher quality versions
-- These use better Unsplash URLs with improved quality and dimensions

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Ocean Waves';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Island Paradise';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Sunset at Gili Islands';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Crystal Clear Waters';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Beach Bliss';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b19?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Pink Beach Paradise';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Tropical Island Escape';

UPDATE public.hero_images
SET image_url = 'https://images.unsplash.com/photo-1495363021474-4585f687a5e2?w=2000&h=1200&fit=crop&q=95'
WHERE title = 'Coastal Adventure';
