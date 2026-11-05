import { Metadata } from "next";
import { HomePageView } from "@/components/HomePageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "رموز إحالة نسك المجانية - تدوير عادل ونسخ فوري",
  description:
    "انسخ رموز إحالة نسك لمسابقة العمرة المجانية. تدوير عادل وإحصاءات دقيقة وفتح سريع داخل تطبيق نسك. موقع مجتمعي مستقل.",
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
