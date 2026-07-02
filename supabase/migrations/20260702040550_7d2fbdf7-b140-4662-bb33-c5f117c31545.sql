
CREATE TABLE IF NOT EXISTS public.booking_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL UNIQUE,
  site_slug TEXT NOT NULL DEFAULT 'master',
  service_slug TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  details TEXT,
  media_urls TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.booking_submissions TO anon, authenticated;
GRANT ALL ON public.booking_submissions TO service_role;
ALTER TABLE public.booking_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking"
  ON public.booking_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Service role reads all submissions"
  ON public.booking_submissions FOR SELECT
  TO service_role
  USING (true);

CREATE TABLE IF NOT EXISTS public.booking_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS booking_rate_limits_ip_time_idx
  ON public.booking_rate_limits (ip_hash, created_at DESC);
GRANT INSERT, SELECT ON public.booking_rate_limits TO anon, authenticated;
GRANT ALL ON public.booking_rate_limits TO service_role;
ALTER TABLE public.booking_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a rate-limit hit"
  ON public.booking_rate_limits FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Anyone can check rate-limit counts"
  ON public.booking_rate_limits FOR SELECT
  TO anon, authenticated
  USING (true);
