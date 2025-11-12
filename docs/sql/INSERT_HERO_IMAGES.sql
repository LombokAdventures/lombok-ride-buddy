-- Direct INSERT script for Lombok hero images
-- Run this in your Supabase SQL editor to insert the images

INSERT INTO public.hero_images (image_url, title, subtitle, display_order, is_active)
VALUES
  (
    'https://images.unsplash.com/photo-1537225228614-b4fad34a0b19?w=1600&h=900&fit=crop',
    'Pink Beach Paradise',
    'Discover the stunning pink sand beaches of Lombok',
    1,
    true
  ),
  (
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop',
    'Tropical Island Escape',
    'Explore pristine waters and lush landscapes',
    2,
    true
  ),
  (
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&h=900&fit=crop',
    'Crystal Clear Waters',
    'Experience the beauty of Lombok''s pristine beaches',
    3,
    true
  ),
  (
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=900&fit=crop',
    'Sunset at Gili Islands',
    'Witness breathtaking sunsets over tropical paradise',
    4,
    true
  ),
  (
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&h=900&fit=crop',
    'Beach Bliss',
    'White sand and azure waters await you',
    5,
    true
  ),
  (
    'https://images.unsplash.com/photo-1495363021474-4585f687a5e2?w=1600&h=900&fit=crop',
    'Coastal Adventure',
    'Ride through Lombok''s scenic coastal routes',
    6,
    true
  ),
  (
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop',
    'Ocean Waves',
    'Feel the rhythm of the Indian Ocean',
    7,
    true
  ),
  (
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=900&fit=crop',
    'Island Paradise',
    'Lombok: Your ultimate tropical getaway',
    8,
    true
  );
