import { Metadata } from "next";
import { HomePageView } from "@/components/HomePageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "جميع رموز إحالة نسك المجانية - قائمة التدوير العادل",
  description:
    "استعرض جميع رموز إحالة نسك المتاحة بنظام تدوير عادل للحصول على مفاتيح إضافية في مسابقة العمرة.",
  alternates: {
    canonical: `${siteUrl}/ar/codes`,
    languages: {
      en: `${siteUrl}/codes`,
      ar: `${siteUrl}/ar/codes`,
    },
  },
};

export default function ArCodesPage() {
  return <HomePageView locale="ar" />;
}
