-- Nusuk Key Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE CHECK (code ~ '^NG-[A-Za-z0-9]{8}$'),
  display_name TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  use_count INT NOT NULL DEFAULT 0,
  report_count INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'removed')),
  last_served_at TIMESTAMPTZ NULL
);

CREATE TABLE IF NOT EXISTS public.code_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id UUID NOT NULL REFERENCES public.codes(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('copy', 'open')),
  device_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id UUID NOT NULL REFERENCES public.codes(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('already_used', 'not_correct')),
  reporter_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_code_reporter UNIQUE (code_id, reporter_hash)
);

CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_codes_status_use_count ON public.codes (status, use_count);
CREATE INDEX IF NOT EXISTS idx_codes_created_at ON public.codes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_code_events_device_hash ON public.code_events (device_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_code_events_created_at ON public.code_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_code_id ON public.reports (code_id);
CREATE INDEX IF NOT EXISTS idx_reports_reporter_hash ON public.reports (reporter_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_submitter_hash ON public.submissions (submitter_hash, created_at DESC);

-- 3. Enable Row Level Security (RLS) on all tables with NO public policies
-- This ensures only the server with the service role key can read or write
ALTER TABLE public.codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
