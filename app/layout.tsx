import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

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
    "Nusuk referral code",
    "Nusuk Umrah competition",
    "Free Umrah challenge",
    "Nusuk invite code",
    "NG- codes",
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
};

export const viewport: Viewport = {
  themeColor: "#14532D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
