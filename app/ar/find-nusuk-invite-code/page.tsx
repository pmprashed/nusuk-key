import { Metadata } from "next";
import { FindCodeGuideView } from "@/components/FindCodeGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "كيف تجد وتشارك رمز دعوة نسك الخاص بك في 3 خطوات",
  description:
    "تعرف على خطوات استخراج رمز الإحالة NG- الخاص بك من داخل تطبيق نسك الرسمي وطريقة مشاركته لجمع مفاتيح المسابقة.",
  alternates: {
    canonical: `${siteUrl}/ar/find-nusuk-invite-code`,
    languages: {
      en: `${siteUrl}/find-nusuk-invite-code`,
      ar: `${siteUrl}/ar/find-nusuk-invite-code`,
    },
  },
};

export default function ArFindInviteCodePage() {
  return <FindCodeGuideView locale="ar" />;
}
