import { Metadata } from "next";
import { CodesPageView } from "@/components/CodesPageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "دليل أكواد نسك النشطة - قائمة التدوير المجتمعي المعتمدة",
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
  return <CodesPageView locale="ar" />;
}
