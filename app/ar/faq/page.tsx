import { Metadata } from "next";
import { FaqPageView } from "@/components/FaqPageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة حول مفاتيح نسك ومسابقة العمرة 2026",
  description:
    "دليل شامل لأكثر من 32 سؤالاً وجواباً حول رموز إحالة نسك، حل مشكلة كود نسك غير صالح، مواعيد تجديد المفاتيح اليومية، وشروط الفوز برحلة العمرة المجانية.",
  keywords: [
    "الأسئلة الشائعة كود نسك",
    "حل مشكلة كود نسك غير صالح",
    "كيف احصل على مفاتيح نسك",
    "تحدي مسابقة العمرة نسك",
    "موعد تجديد مفاتيح نسك اليومي",
    "جوائز مسابقة نسك للعمرة",
    "كود دعوة تطبيق نسك"
  ],
  alternates: {
    canonical: `${siteUrl}/ar/faq`,
    languages: {
      en: `${siteUrl}/faq`,
      ar: `${siteUrl}/ar/faq`,
    },
  },
};

export default function ArabicFaqPage() {
  return <FaqPageView locale="ar" />;
}
