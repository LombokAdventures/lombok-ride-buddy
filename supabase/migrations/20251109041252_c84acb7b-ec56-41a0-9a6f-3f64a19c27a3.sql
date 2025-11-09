-- Fix function search path security issue by dropping and recreating
DROP TRIGGER IF EXISTS update_bikes_updated_at ON public.bikes;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
DROP FUNCTION IF EXISTS update_updated_at_column();

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER update_bikes_updated_at BEFORE UPDATE ON public.bikes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();