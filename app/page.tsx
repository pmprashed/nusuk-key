import { Metadata } from "next";
import { HomePageView } from "@/components/HomePageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "Free Nusuk Referral Codes 2026 - Instant Keys & Fair Rotation",
  description:
    "Get verified, fresh Nusuk referral codes (NG-XXXXXXXX) for the official Free Umrah Competition. Copy active keys instantly or open directly in the Nusuk app with fair rotation.",
  keywords: [
    "nusuk referral code",
    "free nusuk keys",
    "nusuk key",
    "nusuk invite code",
    "nusuk competition 2026",
    "nusuk codes today",
    "nusuk umrah challenge code",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      ar: `${siteUrl}/ar`,
    },
  },
};

export default function HomePage() {
  return <HomePageView locale="en" />;
}
