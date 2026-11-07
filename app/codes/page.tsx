import { Metadata } from "next";
import { CodesPageView } from "@/components/CodesPageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "Active Nusuk Key Codes Directory - Verified Community Repository",
  description:
    "Explore community-shared referral codes from pilgrims worldwide. Each code is tested for fair rotation and rapid key redemption.",
  alternates: {
    canonical: `${siteUrl}/codes`,
    languages: {
      en: `${siteUrl}/codes`,
      ar: `${siteUrl}/ar/codes`,
    },
  },
};

export default function CodesPage() {
  return <CodesPageView locale="en" />;
}
