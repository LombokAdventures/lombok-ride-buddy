-- Create tour_whatsapp table
CREATE TABLE IF NOT EXISTS public.tour_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tour_telegram table
CREATE TABLE IF NOT EXISTS public.tour_telegram (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_username TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create villa_whatsapp table
CREATE TABLE IF NOT EXISTS public.villa_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create villa_telegram table
CREATE TABLE IF NOT EXISTS public.villa_telegram (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_username TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE public.tour_whatsapp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_telegram ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villa_whatsapp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villa_telegram ENABLE ROW LEVEL SECURITY;

-- Create policies for tour_whatsapp
CREATE POLICY "Anyone can submit tour whatsapp"
  ON public.tour_whatsapp FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view tour whatsapp"
  ON public.tour_whatsapp FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for tour_telegram
CREATE POLICY "Anyone can submit tour telegram"
  ON public.tour_telegram FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view tour telegram"
  ON public.tour_telegram FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for villa_whatsapp
CREATE POLICY "Anyone can submit villa whatsapp"
  ON public.villa_whatsapp FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view villa whatsapp"
  ON public.villa_whatsapp FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for villa_telegram
CREATE POLICY "Anyone can submit villa telegram"
  ON public.villa_telegram FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view villa telegram"
  ON public.villa_telegram FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
