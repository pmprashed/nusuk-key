import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { BlogListContent } from "@/components/BlogListContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "مدونة مفاتيح نسك | شروحات ورموز إحالة نسك المجانية 2026",
  description: "تعرف على كيفية الحصول على مفاتيح مسابقة نسك مجاناً، وحل مشكلة الرمز غير صالح، وأين تجد رمز الدعوة الخاص بك لزيادة فرص الفوز في مسابقة العمرة.",
  keywords: ["مدونة نسك", "رموز نسك المجانية", "مسابقة نسك للعمرة", "شرح تطبيق نسك"],
  alternates: {
    canonical: `${siteUrl}/ar/blog`,
    languages: {
      en: `${siteUrl}/blog`,
      ar: `${siteUrl}/ar/blog`,
    },
  },
};

export default function ArabicBlogIndexPage() {
  return (
    <LanguageProvider initialLocale="ar">
      <div className="min-h-screen flex flex-col bg-[#F7FAF8]" dir="rtl">
        <Header locale="ar" />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
          <BlogListContent />
        </main>
        <Footer locale="ar" />
      </div>
    </LanguageProvider>
  );
}
