import { Metadata } from "next";
import { KeysGuideView } from "@/components/KeysGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "How to Get More Keys in Nusuk Free Umrah Competition",
  description:
    "Learn step-by-step how to unlock more questions in the Nusuk Umrah competition using referral invite codes and daily key resets.",
  alternates: {
    canonical: `${siteUrl}/guide`,
    languages: {
      en: `${siteUrl}/guide`,
      ar: `${siteUrl}/ar/guide`,
    },
  },
};

export default function GuidePage() {
  return <KeysGuideView locale="en" />;
}
