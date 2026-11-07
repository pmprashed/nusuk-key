import { Metadata } from "next";
import { HomePageView } from "@/components/HomePageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "All Free Nusuk Referral Codes - Fresh & Verified",
  description:
    "Explore the complete fair rotation list of Nusuk invite codes. Copy fresh codes to claim extra keys in the official Nusuk Umrah competition.",
  alternates: {
    canonical: `${siteUrl}/codes`,
    languages: {
      en: `${siteUrl}/codes`,
      ar: `${siteUrl}/ar/codes`,
    },
  },
};

export default function CodesPage() {
  return <HomePageView locale="en" />;
}
