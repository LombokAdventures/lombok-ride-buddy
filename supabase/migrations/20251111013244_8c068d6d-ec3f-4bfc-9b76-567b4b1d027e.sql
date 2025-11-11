-- Add new fields to bikes table
ALTER TABLE public.bikes
ADD COLUMN IF NOT EXISTS purchase_date DATE,
ADD COLUMN IF NOT EXISTS kilometers_driven INTEGER,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS last_maintenance_date DATE,
ADD COLUMN IF NOT EXISTS next_maintenance_due DATE;

-- Create bike_images table for multiple photos per bike
CREATE TABLE IF NOT EXISTS public.bike_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id TEXT NOT NULL REFERENCES public.bikes(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bike_images
ALTER TABLE public.bike_images ENABLE ROW LEVEL SECURITY;

-- Create policies for bike_images
CREATE POLICY "Anyone can view bike images"
  ON public.bike_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert bike images"
  ON public.bike_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update bike images"
  ON public.bike_images FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete bike images"
  ON public.bike_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create hero_images table for homepage carousel
CREATE TABLE IF NOT EXISTS public.hero_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on hero_images
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- Create policies for hero_images
CREATE POLICY "Anyone can view active hero images"
  ON public.hero_images FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all hero images"
  ON public.hero_images FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert hero images"
  ON public.hero_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hero images"
  ON public.hero_images FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hero images"
  ON public.hero_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create waitlist_requests table
CREATE TABLE IF NOT EXISTS public.waitlist_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL CHECK (item_type IN ('bike', 'tour', 'house')),
  item_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  whatsapp TEXT,
  telegram TEXT,
  email TEXT,
  preferred_contact_method TEXT CHECK (preferred_contact_method IN ('whatsapp', 'telegram', 'email')),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT at_least_one_contact CHECK (
    whatsapp IS NOT NULL OR telegram IS NOT NULL OR email IS NOT NULL
  )
);

-- Enable RLS on waitlist_requests
ALTER TABLE public.waitlist_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for waitlist_requests
CREATE POLICY "Anyone can submit waitlist requests"
  ON public.waitlist_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all waitlist requests"
  ON public.waitlist_requests FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update waitlist requests"
  ON public.waitlist_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete waitlist requests"
  ON public.waitlist_requests FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on waitlist_requests
CREATE TRIGGER update_waitlist_requests_updated_at
  BEFORE UPDATE ON public.waitlist_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default hero images (placeholders)
INSERT INTO public.hero_images (image_url, title, subtitle, display_order, is_active) VALUES
('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&h=800&fit=crop', 'Explore Lombok on Two Wheels', 'Premium motorcycle rentals for your island adventure', 1, true),
('https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&h=800&fit=crop', 'Freedom Awaits', 'Discover hidden beaches and scenic mountain roads', 2, true),
('https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&h=800&fit=crop', 'Ride the Adventure', 'Well-maintained bikes ready for your journey', 3, true),
('https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920&h=800&fit=crop', 'Tropical Paradise Tours', 'Experience the best of Lombok with our guided tours', 4, true),
('https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=1920&h=800&fit=crop', 'Your Journey Starts Here', 'Book now and start your adventure today', 5, true);