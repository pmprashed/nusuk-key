# Nusuk Key

> Free community website for sharing and copying referral (invite) codes for the official Nusuk Free Umrah Competition.

Nusuk Key gives participants a fair rotation of fresh codes, one-tap copy, deep-link access to the Nusuk app, and a community-driven bad code reporting system. Built for high performance, mobile-first responsiveness, and free-tier hosting on Vercel Hobby + Supabase.

---

## Features

- **Fair Code Rotation:** Codes are served in order of lowest usage with random tie-breaks to ensure every user's code gets fair exposure.
- **Instant Copy & Swap:** When a code is copied, it is automatically swapped in place with a fresh code from the database.
- **Deep Link Integration:** "Open in Nusuk" button links directly to the official Nusuk service (`https://services.nusuk.sa/app?p=27&id={code}`), where `{code}` is substituted with the active key (e.g., `NG-CXEVbXwR`).
- **Device-Only Copied Codes:** Codes copied on each device are tracked locally in `localStorage` with a 2-tap problem report menu ("Nusuk says already used", "Nusuk says not correct").
- **Automatic Bad Code Removal:** Codes receiving 2 independent reports are automatically removed from public rotation.
- **Abuse Prevention:** Submitter and reporter rate limiting (3 submissions per day, 60 copy/report events per hour) using salted SHA-256 hashes of IP and User-Agent. No raw IPs are ever stored.
- **Live Real Stats:** Real counts of active codes, total code uses, and active participants in the last hour. No fake counters.
- **Bilingual & RTL:** Complete English and Arabic (`/ar`) versions with proper right-to-left layout and `hreflang` tags.
- **PWA Ready:** Installable web application with offline app-shell caching, manifest, and icons.
- **Zero Ongoing Costs:** Optimized for Vercel Hobby and Supabase free tier.

---

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS
- **Database:** Supabase Postgres (accessed server-side only via `@supabase/supabase-js` service role)
- **Deployment:** Vercel Hobby (Serverless functions, zero cron jobs, lightweight queries)

---

## Deployment & Setup Guide

### 1. Set Up Supabase Database (Free Tier)
1. Go to [supabase.com](https://supabase.com) and create a new free project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` in this repo, copy its contents, paste them into the SQL Editor, and click **Run**.
4. *(Optional for testing)* Run `supabase/seed.sql` to insert 10 clearly marked test codes. **Remember to delete these before production launch!**

### 2. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit of Nusuk Key"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### 3. Deploy on Vercel Hobby
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. In **Environment Variables**, add the following keys:

| Variable | Description | Value |
| :--- | :--- | :--- |
| `SUPABASE_URL` | Your Supabase project URL | `https://xyzproject.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role secret key | `eyJhbGciOi...` |
| `HASH_SALT` | Random string for salted SHA-256 device hashing | `long_random_salt_12345678` |
| `NEXT_PUBLIC_SITE_URL` | Your public domain | `https://nusukkey.com` |
| `NEXT_PUBLIC_NUSUK_DEEP_LINK_TEMPLATE` | Confirmed Nusuk deep link (pre-configured) | `https://services.nusuk.sa/app?p=27&id={code}` |
| `NUSUK_DEEP_LINK_TEMPLATE` | Same as above (server-side) | `https://services.nusuk.sa/app?p=27&id={code}` |

4. Click **Deploy**. Vercel will build and deploy the app in under 2 minutes.

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for English, or [http://localhost:3000/ar](http://localhost:3000/ar) for Arabic.

*Note:* When `SUPABASE_URL` is not yet set, the app runs with an in-memory test store so you can verify all features locally without configuration.

---

## Launch Checklist

- [ ] Run `supabase/schema.sql` in the Supabase SQL editor.
- [ ] Connect GitHub repository to Vercel.
- [ ] Set all environment variables in Vercel project settings.
- [ ] Run `npm run build` locally and ensure zero errors.
- [ ] Test the mobile view (375px width) on mobile Safari and Chrome.
- [ ] Test code copy, code submission (format checking and daily limits), and problem reporting.
- [ ] Verify the Arabic version (`/ar`) for RTL alignment.
- [ ] Delete any test seed codes (`DELETE FROM codes WHERE display_name = 'Test Seed';`).
- [ ] Add your custom production domain in Vercel.
- [ ] Submit `sitemap.xml` to Google Search Console.

---

## Safety & Disclaimer

NusukKey is an independent community website and is not run by Nusuk or the Ministry of Hajj and Umrah. The competition happens strictly inside the official Nusuk app. NusukKey never asks for your password, OTP, or login credentials.
