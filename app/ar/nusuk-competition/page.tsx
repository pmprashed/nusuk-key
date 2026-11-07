import { Metadata } from "next";
import { CompetitionGuideView } from "@/components/CompetitionGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "دليل مسابقة نسك للعمرة المجانية 2026: التواريخ والجوائز والأسئلة الشائعة",
  description:
    "كل ما تريد معرفته عن تحدي نسك للعمرة 2026: 100 رحلة عمرة مجانية، كراتين ماء زمزم اليومية، وطريقة السحب والشروط.",
  alternates: {
    canonical: `${siteUrl}/ar/nusuk-competition`,
    languages: {
      en: `${siteUrl}/nusuk-competition`,
      ar: `${siteUrl}/ar/nusuk-competition`,
    },
  },
};

export default function ArNusukCompetitionPage() {
  return <CompetitionGuideView locale="ar" />;
}
