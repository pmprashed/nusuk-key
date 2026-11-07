import type { Metadata } from "next";
import { ArLayoutClient } from "./ArLayoutClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "رموز إحالة نسك المجانية - تدوير عادل ونسخ فوري",
    template: "%s | مفاتيح نسك",
  },
  description:
    "احصل على رموز إحالة نسك لمسابقة العمرة المجانية. تدوير عادل للرموز، إحصاءات حقيقية، وفتح مباشر في تطبيق نسك. موقع مجتمعي مستقل.",
  openGraph: {
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    url: `${siteUrl}/ar`,
    title: "رموز إحالة نسك المجانية - مفاتيح نسك",
    description:
      "احصل على مفاتيح إضافية مجانية لمسابقة نسك الرسمية للعمرة مع رموز إحالة نشطة ومحدثة باستمرار.",
    siteName: "مفاتيح نسك",
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <ArLayoutClient>
      <div dir="rtl" lang="ar" className="font-sans">
        {children}
      </div>
    </ArLayoutClient>
  );
}
