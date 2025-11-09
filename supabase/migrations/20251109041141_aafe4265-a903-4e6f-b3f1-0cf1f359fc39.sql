-- Create bikes table with pricing tiers
CREATE TABLE IF NOT EXISTS public.bikes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  daily_price DECIMAL(10, 2) NOT NULL,
  weekly_price DECIMAL(10, 2),
  monthly_price DECIMAL(10, 2),
  features TEXT[] NOT NULL DEFAULT '{}',
  engine TEXT NOT NULL,
  transmission TEXT NOT NULL,
  fuel_capacity TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'rented')),
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table with approval system
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tour emails table
CREATE TABLE IF NOT EXISTS public.tour_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create villa emails table
CREATE TABLE IF NOT EXISTS public.villa_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villa_emails ENABLE ROW LEVEL SECURITY;

-- Public read access for bikes
CREATE POLICY "Anyone can view bikes"
  ON public.bikes FOR SELECT
  USING (true);

-- Public read access for approved reviews only
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews FOR SELECT
  USING (approval_status = 'approved');

-- Anyone can submit a review
CREATE POLICY "Anyone can submit reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- Anyone can submit tour emails
CREATE POLICY "Anyone can submit tour emails"
  ON public.tour_emails FOR INSERT
  WITH CHECK (true);

-- Anyone can submit villa emails
CREATE POLICY "Anyone can submit villa emails"
  ON public.villa_emails FOR INSERT
  WITH CHECK (true);

-- Insert default bikes data
INSERT INTO public.bikes (id, name, model, daily_price, weekly_price, monthly_price, features, engine, transmission, fuel_capacity, status, image) VALUES
('honda-beat', 'Honda Beat', 'Beat', 5, 30, 100, ARRAY['Free Helmet', 'Lock Included', 'Fuel Efficient', 'Perfect for City'], '110cc', 'Automatic', '4.2L', 'available', '/bikes/honda-beat.jpg'),
('honda-street', 'Honda Street', 'Scoopy Street', 6, 35, 110, ARRAY['Free Helmet', 'Lock Included', 'Comfortable Seat', 'Stylish Design'], '110cc', 'Automatic', '4.2L', 'available', '/bikes/honda-scoopy.jpg'),
('honda-vario-125', 'Honda Vario 125', 'Vario 125', 7, 40, 120, ARRAY['Free Helmet', 'Lock Included', 'USB Charger', 'Large Storage'], '125cc', 'Automatic', '5.5L', 'available', '/bikes/honda-vario-125.jpg'),
('honda-vario-160', 'Honda Vario 160', 'Vario 160', 9, 50, 150, ARRAY['Free Helmet', 'Lock Included', 'USB Charger', 'Premium Comfort'], '160cc', 'Automatic', '5.5L', 'available', '/bikes/honda-vario-160.jpg'),
('honda-pcx', 'Honda PCX 160', 'PCX 160', 12, 70, 200, ARRAY['Free Helmet', 'Lock Included', 'USB Charger', 'Premium Scooter', 'ABS Brakes'], '160cc', 'Automatic', '8L', 'rented', '/bikes/honda-pcx.jpg'),
('yamaha-nmax', 'Yamaha NMAX 155', 'NMAX 155', 12, 70, 200, ARRAY['Free Helmet', 'Lock Included', 'USB Charger', 'Sporty Design', 'ABS Brakes'], '155cc', 'Automatic', '7.1L', 'available', '/bikes/yamaha-nmax.jpg')
ON CONFLICT (id) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_bikes_updated_at BEFORE UPDATE ON public.bikes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();