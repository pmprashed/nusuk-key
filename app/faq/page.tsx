import { Metadata } from "next";
import { FaqPageView } from "@/components/FaqPageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "Nusuk Key FAQ - 32+ Answers on Umrah Competition, Codes & Resets",
  description:
    "Comprehensive guide and FAQ directory for the Nusuk Free Umrah Competition 2026. Learn how to get more keys, fix invalid code errors, daily reset times, and raffle rules.",
  keywords: [
    "nusuk key faq",
    "how to get more nusuk keys",
    "nusuk referral code not working",
    "nusuk invite code already used",
    "nusuk daily key reset time",
    "nusuk umrah competition 2026 winners",
    "nusuk app referral code error",
    "how does nusuk key work",
    "nusuk free umrah challenge rules",
    "nusuk referral code validity",
    "nusuk code format ng-",
    "nusuk bonus keys hack",
    "free nusuk referral codes bd sa pk",
    "nusuk deep link invite code",
    "nusuk daily question raffle draw"
  ],
  alternates: {
    canonical: `${siteUrl}/faq`,
    languages: {
      en: `${siteUrl}/faq`,
      ar: `${siteUrl}/ar/faq`,
    },
  },
};

export default function FaqPage() {
  return <FaqPageView locale="en" />;
}
