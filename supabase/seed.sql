-- Nusuk Key Test Seed Codes
-- WARNING: These are 10 clearly fake test codes marked for testing only.
-- REMINDER: DELETE these test codes before your production launch!
-- To delete: DELETE FROM public.codes WHERE display_name = 'Test Seed';

INSERT INTO public.codes (code, display_name, use_count, status)
VALUES
  ('NG-TEST0001', 'Test Seed', 1, 'active'),
  ('NG-TEST0002', 'Test Seed', 2, 'active'),
  ('NG-TEST0003', 'Test Seed', 0, 'active'),
  ('NG-TEST0004', 'Test Seed', 5, 'active'),
  ('NG-TEST0005', 'Test Seed', 0, 'active'),
  ('NG-TEST0006', 'Test Seed', 3, 'active'),
  ('NG-TEST0007', 'Test Seed', 1, 'active'),
  ('NG-TEST0008', 'Test Seed', 4, 'active'),
  ('NG-TEST0009', 'Test Seed', 0, 'active'),
  ('NG-TEST0010', 'Test Seed', 2, 'active')
ON CONFLICT (code) DO NOTHING;
