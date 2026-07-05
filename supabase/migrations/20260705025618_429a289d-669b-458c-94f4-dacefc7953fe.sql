
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint)              SET search_path = public, pgmq;
ALTER FUNCTION public.enqueue_email(text, jsonb)              SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb)  SET search_path = public, pgmq;

REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)               FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)               FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint)               TO service_role;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)               TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   TO service_role;

DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.booking_submissions;
CREATE POLICY "Anyone can submit a booking"
  ON public.booking_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(coalesce(site_slug, '')) > 0
  );

DROP POLICY IF EXISTS "Anyone can submit a booking" ON public.bookings;
CREATE POLICY "Anyone can submit a booking"
  ON public.bookings FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

DROP POLICY IF EXISTS "Anyone can log a rate-limit hit" ON public.booking_rate_limits;
CREATE POLICY "Anyone can log a rate-limit hit"
  ON public.booking_rate_limits FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(ip_hash) BETWEEN 1 AND 200);

DROP POLICY IF EXISTS "Anyone can check rate-limit counts" ON public.booking_rate_limits;
CREATE POLICY "Service role reads rate-limit counts"
  ON public.booking_rate_limits FOR SELECT TO service_role
  USING (true);

DROP POLICY IF EXISTS "Anyone can upload booking media" ON storage.objects;
CREATE POLICY "Booking media uploads scoped to UUID folder"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (
    bucket_id = 'booking-media'
    AND (storage.foldername(name))[1] ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    AND char_length(name) < 300
  );

CREATE POLICY "Service role reads booking media"
  ON storage.objects FOR SELECT TO service_role
  USING (bucket_id = 'booking-media');
