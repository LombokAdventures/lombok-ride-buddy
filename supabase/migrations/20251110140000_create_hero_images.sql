-- Create hero_images table for homepage carousel
CREATE TABLE IF NOT EXISTS public.hero_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- Public read access for hero images
CREATE POLICY "Anyone can view hero images"
  ON public.hero_images FOR SELECT
  USING (true);

-- Admin can insert hero images (will need admin role)
CREATE POLICY "Admins can insert hero images"
  ON public.hero_images FOR INSERT
  WITH CHECK (true);

-- Admin can delete hero images (will need admin role)
CREATE POLICY "Admins can delete hero images"
  ON public.hero_images FOR DELETE
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_hero_images_updated_at BEFORE UPDATE ON public.hero_images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add some default hero images (you can replace these URLs with actual uploaded images)
INSERT INTO public.hero_images (image_url) VALUES
('/hero-background.jpg')
ON CONFLICT DO NOTHING;
