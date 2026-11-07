import { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "اتصل بنا - مجتمع مفاتيح نسك",
  description:
    "تواصل مع إدارة موقع مفاتيح نسك للملاحظات التقنية أو اطلع على رقم هاتف الدعم الفني الرسمي لتطبيق نسك.",
  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: {
      en: `${siteUrl}/contact`,
      ar: `${siteUrl}/ar/contact`,
    },
  },
};

export default function ArContactPage() {
  return <ContactView locale="ar" />;
}
