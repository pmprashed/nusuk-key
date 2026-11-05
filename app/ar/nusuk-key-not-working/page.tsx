import { Metadata } from "next";
import { NotWorkingGuideView } from "@/components/NotWorkingGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "رمز أو مفتاح نسك لا يعمل؟ حلول لأشهر أخطاء تطبيق نسك",
  description:
    "حلول سريعة لرسائل الخطأ: «تم استخدام الرمز من قبل»، «الرمز غير صحيح»، مشاكل وصول رمز التحقق، وعدم احتساب المفاتيح.",
  alternates: {
    canonical: `${siteUrl}/ar/nusuk-key-not-working`,
    languages: {
      en: `${siteUrl}/nusuk-key-not-working`,
      ar: `${siteUrl}/ar/nusuk-key-not-working`,
    },
  },
};

export default function ArNotWorkingPage() {
  return <NotWorkingGuideView locale="ar" />;
}
