-- Create storage bucket for bike images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bike-images',
  'bike-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for bike images
CREATE POLICY "Public can view bike images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'bike-images');

CREATE POLICY "Admins can upload bike images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'bike-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update bike images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'bike-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete bike images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'bike-images' AND
  public.has_role(auth.uid(), 'admin')
);