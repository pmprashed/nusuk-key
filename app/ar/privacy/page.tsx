import { Metadata } from "next";
import { PrivacyView } from "@/components/PrivacyView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - موقع مفاتيح نسك المجتمعي",
  description:
    "سياسة خصوصية موقع مفاتيح نسك: لا نطلب ولا نحفظ أبداً كلمات المرور أو أرقام الهواتف أو بيانات تسجيل الدخول. حماية كاملة للمستخدمين.",
  alternates: {
    canonical: `${siteUrl}/ar/privacy`,
    languages: {
      en: `${siteUrl}/privacy`,
      ar: `${siteUrl}/ar/privacy`,
    },
  },
};

export default function ArPrivacyPage() {
  return <PrivacyView locale="ar" />;
}
