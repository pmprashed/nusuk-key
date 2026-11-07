"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, BookOpen, AlertTriangle, Key, Search, Sparkles } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { getHomepageFaqs } from "@/lib/faq-data";

export function SeoBlock({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 12 Curated high-impact FAQs for homepage
  const faqs = getHomepageFaqs(locale);

  // Split into 2 columns for a balanced layout
  const col1 = faqs.slice(0, 6);
  const col2 = faqs.slice(6, 12);

  return (
    <section id="faq" className="rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 lg:p-10 mb-12 shadow-sm scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2.5 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {locale === "ar"
                ? "دليل المعرفة المعتمد"
                : locale === "bn"
                ? "প্রয়োজনীয় তথ্যাবলী ও গাইড"
                : "Knowledge Base & Guides"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight mb-2">
            {locale === "ar"
              ? "دليلك الشامل لرموز مسابقة نسك للعمرة المجانية 2026"
              : locale === "bn"
              ? "ফ্রি নুসুক ওমরাহ প্রতিযোগিতা ২০২৬ ও রেফারেল কোড গাইড"
              : "Complete Guide to Free Nusuk Umrah Challenge Codes 2026"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            {locale === "ar"
              ? "تتيح لك رموز الإحالة في تطبيق نسك كسب مفاتيح إضافية يومية لفتح المزيد من الأسئلة في تحدي العمرة والتأهل لسحب 100 رحلة مجانية."
              : locale === "bn"
              ? "নুসুক অ্যাপে রেফারেল কোড ব্যবহার করে প্রতিদিন অতিরিক্ত চাবি আনলক করুন এবং ১০০টি ফ্রি ওমরাহ ড্রতে অংশগ্রহণের সুযোগ বাড়ান।"
              : "Referral codes inside the official Nusuk application unlock free daily keys to answer competition questions. Correct answers enter you directly into the daily raffle for 100 all-inclusive Umrah trips."}
          </p>
        </div>

        {/* View All FAQs Link */}
        <Link
          href={p("/faq")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all shrink-0 w-fit"
        >
          <span>
            {locale === "ar"
              ? "عرض جميع الأسئلة (30+) ←"
              : locale === "bn"
              ? "সকল FAQ পেজ দেখুন (৩০+) →"
              : "View All 30+ FAQs →"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Feature Cards (Screenshot 4 upgrade: 2 -> 4 modern interactive cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
        {/* Card 1: How to get more keys */}
        <Link
          href={p("/guide")}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-2.5 group-hover:scale-105 transition-transform">
              <Key className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-emerald-950 group-hover:text-emerald-700 leading-snug">
              {locale === "ar" ? "كيفية الحصول على مفاتيح أكثر" : locale === "bn" ? "কীভাবে আরও কি পাবেন" : "How to get more Nusuk keys"}
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-relaxed">
              {locale === "ar" ? "استراتيجية يومية مجربة لكسب المفاتيح" : "Step-by-step strategy for extra daily keys"}
            </div>
          </div>
          <div className="text-xs text-emerald-700 font-bold mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Read Guide</span> →
          </div>
        </Link>

        {/* Card 2: Fix Key Not Working */}
        <Link
          href={p("/nusuk-key-not-working")}
          className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 to-white border border-amber-100 hover:border-amber-300 transition-all hover:shadow-sm group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-2.5 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-gray-900 group-hover:text-amber-800 leading-snug">
              {locale === "ar" ? "حل مشكلة تعطل كود نسك" : locale === "bn" ? "নুসুক কোড এরর সমাধান" : "Fix 'Key Not Working' errors"}
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-relaxed">
              {locale === "ar" ? "أسباب الرموز المنتهية والحلول الفورية" : "Common invite code limits and fixes"}
            </div>
          </div>
          <div className="text-xs text-amber-700 font-bold mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Fix Errors</span> →
          </div>
        </Link>

        {/* Card 3: Find your invite code */}
        <Link
          href={p("/find-nusuk-invite-code")}
          className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 to-white border border-blue-100 hover:border-blue-300 transition-all hover:shadow-sm group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 mb-2.5 group-hover:scale-105 transition-transform">
              <Search className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-gray-900 group-hover:text-blue-800 leading-snug">
              {locale === "ar" ? "أين تجد كود الدعوة الخاص بك" : locale === "bn" ? "আপনার ইনভাইট কোড কোথায় পাবেন" : "Find Your Nusuk Invite Code"}
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-relaxed">
              {locale === "ar" ? "خطوات استخراج كودك من التطبيق" : "Where to find your NG- code in the app"}
            </div>
          </div>
          <div className="text-xs text-blue-700 font-bold mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Find Code</span> →
          </div>
        </Link>

        {/* Card 4: Official Competition Rules */}
        <Link
          href={p("/nusuk-competition")}
          className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/70 to-white border border-purple-100 hover:border-purple-300 transition-all hover:shadow-sm group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800 mb-2.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-gray-900 group-hover:text-purple-800 leading-snug">
              {locale === "ar" ? "شروط مسابقة العمرة 2026" : locale === "bn" ? "ওমরাহ প্রতিযোগিতা ২০২৬ নিয়মাবলী" : "Nusuk Competition Rules 2026"}
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-relaxed">
              {locale === "ar" ? "تفاصيل السحب والجوائز والمؤهلين" : "Daily draw details, eligibility & packages"}
            </div>
          </div>
          <div className="text-xs text-purple-700 font-bold mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Learn Rules</span> →
          </div>
        </Link>
      </div>

      {/* 2-Column FAQ Layout (Screenshot 3 solution: balanced and attractive) */}
      <div className="mb-8">
        <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>
            {locale === "ar"
              ? "الأسئلة الشائعة حول مفاتيح نسك (FAQ)"
              : locale === "bn"
              ? "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
              : "Frequently Asked Questions (FAQ)"}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Column 1 */}
          <div className="space-y-3">
            {col1.map((faq, i) => {
              const idx = i;
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 bg-gray-50/40 hover:border-emerald-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-gray-900 hover:bg-emerald-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {col2.map((faq, i) => {
              const idx = i + 6;
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 bg-gray-50/40 hover:border-emerald-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-gray-900 hover:bg-emerald-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <div className="font-extrabold text-sm text-emerald-950">
            {locale === "ar"
              ? "هل لديك سؤال لم تجد إجابته هنا؟"
              : locale === "bn"
              ? "আপনার কাঙ্ক্ষিত প্রশ্নের উত্তর খুঁজে পাননি?"
              : "Looking for more in-depth answers?"}
          </div>
          <div className="text-xs text-gray-600 mt-0.5">
            {locale === "ar"
              ? "تصفح صفحة الأسئلة الشائعة الكاملة التي تحتوي على أكثر من 30 سؤالاً شاملاً."
              : locale === "bn"
              ? "আমাদের পূর্ণাঙ্গ FAQ পেজে ৩০টিরও বেশি প্রশ্নের বিস্তারিত উত্তর রয়েছে।"
              : "Explore our dedicated FAQ directory with 30+ answers covering errors, rules, and strategies."}
          </div>
        </div>
        <Link
          href={p("/faq")}
          className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shrink-0 shadow-xs transition-colors"
        >
          {locale === "ar" ? "تصفح كل الأسئلة" : locale === "bn" ? "সম্পূর্ণ FAQ দেখুন" : "Explore All FAQs"}
        </Link>
      </div>
    </section>
  );
}
