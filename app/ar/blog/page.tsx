import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "مدونة مفاتيح نسك | شروحات ورموز إحالة نسك المجانية 2026",
  description: "تعرف على كيفية الحصول على مفاتيح مسابقة نسك مجاناً، وحل مشكلة الرمز غير صالح، وأين تجد رمز الدعوة الخاص بك لزيادة فرص الفوز في مسابقة العمرة.",
  keywords: ["مدونة نسك", "رموز نسك المجانية", "مسابقة نسك للعمرة", "شرح تطبيق نسك"],
  alternates: {
    canonical: "https://nusuk-keys.vercel.app/ar/blog",
    languages: {
      en: "https://nusuk-keys.vercel.app/blog",
      ar: "https://nusuk-keys.vercel.app/ar/blog",
    },
  },
};

import { LanguageProvider } from "@/components/LanguageProvider";

export default function ArabicBlogIndexPage() {
  return (
    <LanguageProvider initialLocale="ar">
      <div className="min-h-screen flex flex-col bg-[#FBFDFB]" dir="rtl">
        <Header locale="ar" />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Title & Introduction */}
        <div className="mb-10 text-center sm:text-right">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            المقالات والشروحات
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            دليل ورؤى مفاتيح نسك
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            كل ما تحتاجه حول رموز إحالة تطبيق نسك، حلول المشاكل الشائعة، وطرق مضاعفة فرصك في الفوز بمسابقة العمرة.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-right"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug hover:text-emerald-700 transition-colors">
                  <Link href={`/ar/blog/${post.slug}`}>
                    {post.titleAr}
                  </Link>
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                  {post.excerptAr}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/ar/blog/${post.slug}`}
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                >
                  قراءة المقال <span className="group-hover:-translate-x-1 transition-transform">←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer locale="ar" />
      </div>
    </LanguageProvider>
  );
}
