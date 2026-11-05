INSERT INTO public.codes (code, display_name, use_count, status)
VALUES
  ('NG-CXEVbXwR', 'Rashed', 1, 'active')
ON CONFLICT (code) DO NOTHING;
