import { Metadata } from "next";
import { KeysGuideView } from "@/components/KeysGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "كيفية الحصول على مفاتيح إضافية في مسابقة نسك للعمرة",
  description:
    "شرح شامل لكيفية زيادة رصيدك من مفاتيح مسابقة نسك عبر رموز الدعوة والإحالة واستخدامها يومياً لدخول السحب.",
  alternates: {
    canonical: `${siteUrl}/ar/guide`,
    languages: {
      en: `${siteUrl}/guide`,
      ar: `${siteUrl}/ar/guide`,
    },
  },
};

export default function ArGuidePage() {
  return <KeysGuideView locale="ar" />;
}
