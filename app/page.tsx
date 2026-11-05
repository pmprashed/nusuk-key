import { Metadata } from "next";
import { HomePageView } from "@/components/HomePageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "Free Nusuk Referral Codes - Fair Rotation & Instant Copy",
  description:
    "Copy fresh Nusuk referral codes for the Free Umrah Competition. Every code gets a fair turn. Open directly in the Nusuk app.",
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
