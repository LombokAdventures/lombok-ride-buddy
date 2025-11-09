-- Add missing policies for admin operations
-- Since we don't have user authentication yet, we'll allow public UPDATE/DELETE
-- The admin panel is password-protected at the application level

-- Bikes: Allow public UPDATE
CREATE POLICY "Anyone can update bikes"
  ON public.bikes FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews: Allow public UPDATE (for approval/rejection)
CREATE POLICY "Anyone can update reviews"
  ON public.reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews: Allow public SELECT ALL (admin needs to see pending reviews)
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
CREATE POLICY "Anyone can view all reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Tour Emails: Allow public SELECT (admin needs to view)
CREATE POLICY "Anyone can view tour emails"
  ON public.tour_emails FOR SELECT
  USING (true);

-- Tour Emails: Allow public DELETE (admin can remove)
CREATE POLICY "Anyone can delete tour emails"
  ON public.tour_emails FOR DELETE
  USING (true);

-- Villa Emails: Allow public SELECT (admin needs to view)
CREATE POLICY "Anyone can view villa emails"
  ON public.villa_emails FOR SELECT
  USING (true);

-- Villa Emails: Allow public DELETE (admin can remove)
CREATE POLICY "Anyone can delete villa emails"
  ON public.villa_emails FOR DELETE
  USING (true);
