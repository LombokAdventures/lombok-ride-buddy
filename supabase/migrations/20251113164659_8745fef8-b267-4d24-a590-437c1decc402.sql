-- Create company_info table for storing contact and social media information
CREATE TABLE public.company_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;

-- Anyone can view active company info
CREATE POLICY "Anyone can view active company info"
ON public.company_info
FOR SELECT
USING (is_active = true);

-- Admins can view all company info
CREATE POLICY "Admins can view all company info"
ON public.company_info
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can insert company info
CREATE POLICY "Admins can insert company info"
ON public.company_info
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can update company info
CREATE POLICY "Admins can update company info"
ON public.company_info
FOR UPDATE
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can delete company info
CREATE POLICY "Admins can delete company info"
ON public.company_info
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_company_info_updated_at
BEFORE UPDATE ON public.company_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default company info
INSERT INTO public.company_info (key, value, category, display_order) VALUES
('email', 'contact@example.com', 'contact', 1),
('whatsapp', '+1234567890', 'contact', 2),
('telegram', '@examplecompany', 'contact', 3),
('location', 'Lombok, Indonesia', 'contact', 4),
('instagram', 'https://instagram.com/example', 'social', 5),
('facebook', 'https://facebook.com/example', 'social', 6),
('youtube', 'https://youtube.com/@example', 'social', 7);