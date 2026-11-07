import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Nusuk Referral Codes - Fair Rotation & Instant Copy",
    template: "%s | NusukKey",
  },
  description:
    "Copy fresh Nusuk referral codes for the Free Umrah Competition. Fair rotation, real database counters, and instant Nusuk app access. Independent community platform.",
  applicationName: "NusukKey",
  authors: [{ name: "NusukKey Community" }],
  generator: "Next.js",
  keywords: [
    "Nusuk",
    "Nusuk key",
    "Nusuk keys",
    "Nusuk referral code",
    "free nusuk keys",
    "nusuk invite code",
    "nusuk competition 2026",
    "nusuk umrah challenge",
    "how to get more keys in nusuk",
    "nusuk key not working",
    "nusuk referral code free",
    "nusuk invite code today",
    "nusuk keys list",
    "free umrah trip nusuk",
    "nusuk competition invite code",
    "nusuk referral codes daily",
    "nusuk deep link code",
    "nusuk referral code generator",
    "nusuk promo code",
    "nusuk extra keys",
    "كود نسك",
    "مفتاح نسك",
    "رموز إحالة نسك",
    "مسابقة نسك للعمرة",
    "تحدي نسك للعمرة 2026",
    "كود دعوة نسك مجاني",
    "رموز نسك نشطة",
    "حل مشكلة كود نسك غير صالح",
    "طريقة زيادة مفاتيح نسك",
    "kode referral nusuk",
    "cara dapat kunci nusuk gratis",
    "nusuk referans kodu",
    "nusuk umre çekilişi anahtar",
    "nusuk referral code bd",
    "নুসুক রেফারেল কোড",
    "নুসুক ওমরাহ প্রতিযোগিতা কী",
    "نسک ریفرل کوڈ",
    "نسک مفت چابیاں",
    "code parrainage nusuk",
    "codigo referido nusuk",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: siteUrl,
    title: "Free Nusuk Referral Codes - NusukKey",
    description:
      "Get free extra keys for the official Nusuk Umrah Competition with verified, fresh referral codes.",
    siteName: "NusukKey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Nusuk Referral Codes - NusukKey",
    description:
      "Fresh referral codes for the Nusuk Free Umrah Competition with fair rotation.",
  },
  verification: {
    google: "1aa3ad58d43a8521",
  },
};

export const viewport: Viewport = {
  themeColor: "#14532D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://nusuk-keys.vercel.app/#website",
      "url": "https://nusuk-keys.vercel.app",
      "name": "NusukKey",
      "description": "Free Nusuk referral codes for the Nusuk Free Umrah Competition. Fair rotation, real database counters.",
      "inLanguage": ["en", "ar"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://nusuk-keys.vercel.app/codes?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://nusuk-keys.vercel.app/#organization",
      "name": "NusukKey Community",
      "url": "https://nusuk-keys.vercel.app",
      "description": "Community platform for sharing and discovering free Nusuk referral codes for the Umrah competition.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nusuk-keys.vercel.app/icons/icon-192.svg"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://nusuk-keys.vercel.app/#webpage",
      "url": "https://nusuk-keys.vercel.app",
      "name": "Free Nusuk Referral Codes - Fair Rotation & Instant Copy",
      "isPartOf": { "@id": "https://nusuk-keys.vercel.app/#website" },
      "about": { "@id": "https://nusuk-keys.vercel.app/#organization" },
      "description": "Copy fresh Nusuk referral codes for the Free Umrah Competition. Fair rotation, real database counters, and instant Nusuk app access.",
      "inLanguage": "en"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Nusuk referral code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Nusuk referral code (NG-XXXXXXXX) is a unique invite code used in the Nusuk app for the Free Umrah Competition. When someone uses your code, both of you receive +1 key to enter the draw."
          }
        },
        {
          "@type": "Question",
          "name": "How do I use a Nusuk key?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Open the Nusuk app, go to Keys section, tap 'Add code to get new key', paste the NG- code, and tap 'Check the code'. Both you and the code owner receive +1 key."
          }
        },
        {
          "@type": "Question",
          "name": "Are the codes on NusukKey free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all Nusuk referral codes on NusukKey are completely free. The platform is a community sharing tool where pilgrims help each other by sharing their NG- codes."
          }
        },
        {
          "@type": "Question",
          "name": "Why is my Nusuk code not working?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nusuk codes can reach their daily usage limit. If a code doesn't work, tap 'Swap Code' on NusukKey to get a fresh replacement code instantly."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon-192.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7FAF8] antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration skipped:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
