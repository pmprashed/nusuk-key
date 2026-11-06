import { Metadata } from "next";
import { HomePageView } from "@/components/HomePageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "رموز إحالة نسك المجانية 2026 - تدوير عادل ومفاتيح نشطة فورية",
  description:
    "احصل على رموز إحالة نسك نشطة ومجربة (NG-XXXXXXXX) لمسابقة العمرة المجانية. تدوير عادل، نسخ مباشر، وفتح فوري في تطبيق نسك.",
  keywords: [
    "كود نسك",
    "مفتاح نسك",
    "رموز إحالة نسك",
    "مسابقة نسك للعمرة",
    "تحدي نسك 2026",
    "رموز نسك مجانية",
    "كود دعوة نسك",
    "حل مشكلة كود نسك",
  ],
  alternates: {
    canonical: `${siteUrl}/ar`,
    languages: {
      en: siteUrl,
      ar: `${siteUrl}/ar`,
    },
  },
};

export default function ArHomePage() {
  return <HomePageView locale="ar" />;
}
