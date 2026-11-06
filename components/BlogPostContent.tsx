"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import { useLanguage } from "./LanguageProvider";
import { getLocalizedBlogPost } from "@/lib/blog-i18n";
import { ArrowLeft, ArrowRight, Sparkles, KeyRound } from "lucide-react";

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { locale, isRtl } = useLanguage();
  const localized = getLocalizedBlogPost(post, locale);

  const homeHref = locale === "ar" ? "/ar" : "/";
  const blogHref = locale === "ar" ? "/ar/blog" : "/blog";

  const breadcrumbHome = locale === "ar" ? "الرئيسية" : locale === "bn" ? "হোম" : locale === "ur" ? "ہوم" : "Home";
  const breadcrumbBlog = locale === "ar" ? "المدونة" : locale === "bn" ? "ব্লগ" : locale === "ur" ? "بلاگ" : "Blog";

  const ctaTitle =
    locale === "ar"
      ? "هل أنت مستعد للحصول على رمز إحالة جديد مجاناً؟"
      : locale === "bn"
      ? "এখনই আপনার নতুন ফ্রি নুসুক রেফারেল কি পেতে চান?"
      : locale === "ur"
      ? "کیا آپ فوری طور پر مفت نسک کوڈ حاصل کرنا چاہتے ہیں؟"
      : locale === "id"
      ? "Siap Mendapatkan Kode Referral Nusuk Baru Sekarang?"
      : locale === "tr"
      ? "Hemen Yeni Bir Ücretsiz Nusuk Kodu Almaya Hazır mısınız?"
      : locale === "fr"
      ? "Prêt à obtenir votre code de parrainage Nusuk gratuit ?"
      : locale === "es"
      ? "¿Listo para obtener tu código de referido Nusuk gratis?"
      : "Ready to get a fresh, working Nusuk referral code?";

  const ctaDesc =
    locale === "ar"
      ? "احصل على رمز إحالة نشط وغير مستخدم مسبقاً بنقرة واحدة عبر نظام التدوير الذكي."
      : locale === "bn"
      ? "আমাদের স্মার্ট রোটেশন সিস্টেম থেকে আনইউজড সক্রিয় রেফারেল কোড এক ক্লিকেই সংগ্রহ করুন।"
      : locale === "ur"
      ? "سمارٹ روٹیشن سسٹم کے ذریعے بغیر انتظار کیے ایک کلک پر تازہ کوڈ حاصل کریں۔"
      : locale === "id"
      ? "Dapatkan kode referral aktif tanpa antre menggunakan sistem rotasi pintar kami."
      : "Get an unused, active referral code right now with our smart fair rotation.";

  const ctaBtn =
    locale === "ar"
      ? "احصل على رمز مجاني الآن"
      : locale === "bn"
      ? "এখনই ফ্রি কোড নিন"
      : locale === "ur"
      ? "ابھی مفت کوڈ حاصل کریں"
      : locale === "id"
      ? "Dapatkan Kode Gratis Sekarang"
      : locale === "tr"
      ? "Ücretsiz Kodu Şimdi Al"
      : locale === "fr"
      ? "Obtenir un Code Gratuit"
      : locale === "es"
      ? "Obtener Código Gratis"
      : "Get Free Code Now";

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2 font-medium flex-wrap">
        <Link href={homeHref} className="hover:text-emerald-700 transition-colors">
          {breadcrumbHome}
        </Link>
        <span>/</span>
        <Link href={blogHref} className="hover:text-emerald-700 transition-colors">
          {breadcrumbBlog}
        </Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-xs font-semibold">{localized.title}</span>
      </nav>

      {/* Main Article Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">
        <header className="mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3 text-xs text-emerald-800 font-bold mb-3">
            <span className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              {localized.category}
            </span>
            <span>•</span>
            <span>{localized.readTime}</span>
            <span>•</span>
            <span className="text-gray-400 font-normal">{localized.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            {localized.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60">
            {localized.excerpt}
          </p>
        </header>

        {/* Content Paragraphs */}
        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
          {localized.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Call to Action Box */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-[#062413] to-[#124d27] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-emerald-500/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                {ctaTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90">
              {ctaDesc}
            </p>
          </div>

          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <KeyRound className="w-4 h-4 text-emerald-700" />
            <span>{ctaBtn}</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
