import { Metadata } from "next";
import { CompetitionGuideView } from "@/components/CompetitionGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "Nusuk Free Umrah Competition 2026: Dates, Prizes & FAQ Guide",
  description:
    "Comprehensive guide to the 2026 Nusuk Free Umrah Challenge: 100 free trips, daily draws, Zamzam prizes, rules, and how to participate.",
  alternates: {
    canonical: `${siteUrl}/nusuk-competition`,
    languages: {
      en: `${siteUrl}/nusuk-competition`,
      ar: `${siteUrl}/ar/nusuk-competition`,
    },
  },
};

export default function NusukCompetitionPage() {
  return <CompetitionGuideView locale="en" />;
}
