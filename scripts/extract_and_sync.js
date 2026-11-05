const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rrmkrqogalodctqqtbbq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const CODE_REGEX = /\bNG-[A-Za-z0-9]{8}\b/g;

const collectedCodes = new Set([
  'NG-QfmYdMwG', 'NG-SyI1J7Br', 'NG-CXEVbXwR', 'NG-fNNJ9ZSB', 'NG-hbS3l5Iy',
  'NG-Au1o7GIA', 'NG-ugTEjK4M', 'NG-UNm7HbrU', 'NG-r5Fk0vo5', 'NG-z3ngVeix',
  'NG-FDGviieQ', 'NG-1OAsde5G', 'NG-OY3SXTle', 'NG-u5dFeraN', 'NG-uiYrymMW',
  'NG-6wHKS7lU', 'NG-Km2ZWkkP', 'NG-xcuysAKz', 'NG-NqAt7qKQ', 'NG-gdm6pciy',
  'NG-OuDqk5FB', 'NG-X9fNFmK9', 'NG-4YBx2Hg1', 'NG-BzOi5jCI', 'NG-7rrJd58v',
  'NG-fSJUJ6AI', 'NG-lMNKlXDB', 'NG-UdWc2ITM', 'NG-rbb3qd1O', 'NG-dJeqPCxd',
  'NG-czpU2pJQ', 'NG-fsCJPpEB', 'NG-TGcS7u0X', 'NG-pWuTUhyU', 'NG-pZTDM8rf',
  'NG-nT76NFUr', 'NG-I6tNLzIf', 'NG-yKsxqbkQ', 'NG-mSqu2CbH', 'NG-DTrRy5Bb',
  'NG-3rq5hX38', 'NG-55Tb0bry', 'NG-v4J2Hftr', 'NG-jx8obdTX', 'NG-6hFqXM9r',
  'NG-JTCvVsHJ', 'NG-NGIVcnKK', 'NG-l5ps6pa5', 'NG-PZtZG3nM', 'NG-LA0QFVZp',
  'NG-5GOYeADD', 'NG-IfM7lEEq', 'NG-uz3ulLfj', 'NG-41DRSH6C', 'NG-m7ICv6kc',
  'NG-QpXHQC3R', 'NG-DOQY3Fzj', 'NG-oF9wolAq', 'NG-ulVDhddS', 'NG-IGBEcwiK',
  'NG-yNpE3aSU', 'NG-xpWzdQif', 'NG-yJwBGsh2', 'NG-D22cJu0a', 'NG-kMWheLTy',
  'NG-aKmJM32Y', 'NG-FByp9Qok', 'NG-rPy6IJUn', 'NG-nudX15b5', 'NG-8BwrNL0A',
  'NG-FQKDbUDG', 'NG-bENmFlH4', 'NG-6CcVwh6s', 'NG-HJqagp7g', 'NG-82jkJTbU',
  'NG-cwCNfLRV', 'NG-w5MHBZvg', 'NG-2eii8ife', 'NG-DwzqN2ws', 'NG-EVOxpJpM',
  'NG-837JyTOF', 'NG-3YYWVFKI', 'NG-rCGvurd8', 'NG-fUbhMc87', 'NG-dSsT5RaJ',
  'NG-0T7hIPaU', 'NG-ISYW2iba', 'NG-Fa9Mwf8O', 'NG-1rXwRlIu', 'NG-5NIA5pyf',
  'NG-ZbG92qFi', 'NG-jQwjfdxv', 'NG-LurUJ4J1', 'NG-5DkIAGPB', 'NG-lxZwbMUx',
  'NG-fb272AYE', 'NG-U7eoM8AW', 'NG-QNOQzzPe', 'NG-9CxtPlrP', 'NG-awLJnrtb',
  'NG-Nsn3Ge4c', 'NG-jxKMO8E2', 'NG-5fhcpKMs', 'NG-dGG9uqCR', 'NG-t6nkgHbr',
  'NG-qFavnW0P', 'NG-45pgFqQ2', 'NG-xdh1ywzS', 'NG-XIIjOcO5', 'NG-1akEAHuB',
  'NG-K8gw1Fsg', 'NG-KiNliOHZ', 'NG-qu8xcObO', 'NG-eonVNpgr', 'NG-qSLctYH9',
  'NG-8FBN1Ckh', 'NG-cC1TyIFG', 'NG-uUK1Ibbq', 'NG-DxxRuZaO', 'NG-rGZ0DPZU',
  'NG-Pal1ARsE', 'NG-QPGZIN1V', 'NG-ZjMfFxDe', 'NG-nGR7YAKL', 'NG-bbcrbD9b',
  'NG-npIFIht5', 'NG-B7SBJ2B4', 'NG-zRQSDC8N', 'NG-ofxJonL3', 'NG-3EVtEBHz'
]);

function extractFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(CODE_REGEX);
      if (matches) {
        matches.forEach(c => collectedCodes.add(c));
        console.log(`Found ${matches.length} matches in ${filePath}`);
      }
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
}

const allCodes = Array.from(collectedCodes).sort();
console.log(`Total unique codes extracted: ${allCodes.length}`);

// Write to seed.sql
const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
let seedContent = `-- Seed data for Nusuk Key referral codes\n-- Generated on ${new Date().toISOString()}\n\n`;
seedContent += `INSERT INTO public.codes (code, display_name, use_count, status)\nVALUES\n`;
const rows = allCodes.map((c, i) => {
  return `  ('${c}', 'Nusuk Pilgrim ${i + 1}', ${Math.floor(Math.random() * 5)}, 'active')`;
});
seedContent += rows.join(',\n');
seedContent += `\nON CONFLICT (code) DO UPDATE\n  SET status = 'active';\n`;

fs.writeFileSync(seedPath, seedContent, 'utf8');
console.log(`Updated ${seedPath} with ${allCodes.length} codes.`);

async function syncToSupabase() {
  if (!SUPABASE_KEY) {
    console.log('SUPABASE_SECRET_KEY not provided in environment. Skipping direct API sync.');
    return;
  }
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false }
  });

  console.log(`Syncing ${allCodes.length} codes to Supabase at ${SUPABASE_URL}...`);
  
  const payload = allCodes.map((code, i) => ({
    code,
    display_name: `Nusuk Pilgrim ${i + 1}`,
    use_count: Math.floor(Math.random() * 5),
    status: 'active'
  }));

  for (let i = 0; i < payload.length; i += 50) {
    const chunk = payload.slice(i, i + 50);
    const { data, error } = await supabase
      .from('codes')
      .upsert(chunk, { onConflict: 'code' });
    
    if (error) {
      console.error(`Batch ${i / 50 + 1} error:`, error.message);
    } else {
      console.log(`Batch ${i / 50 + 1} (${chunk.length} items) upserted successfully.`);
    }
  }

  const { count, error: countErr } = await supabase
    .from('codes')
    .select('*', { count: 'exact', head: true });
    
  if (countErr) {
    console.error('Count query error:', countErr.message);
  } else {
    console.log(`Total codes now in Supabase 'codes' table: ${count}`);
  }
}

syncToSupabase().catch(err => {
  console.error('Supabase sync failure:', err);
});
