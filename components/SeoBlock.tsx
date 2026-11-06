"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { getFaqsForLocale } from "@/lib/faq-translations";

export function SeoBlock({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic FAQs translated for the active language
  const faqs = getFaqsForLocale(locale);

  // Section titles localized
  const sectionTitle =
    locale === "ar"
      ? "دليلك الشامل لرموز مسابقة نسك للعمرة المجانية 2026"
      : locale === "bn"
      ? "ফ্রি নুসুক ওমরাহ প্রতিযোগিতা ২০২৬ ও রেফারেল কোড গাইড"
      : locale === "ur"
      ? "مفت نسک عمرہ مقابلہ 2026 اور ریفرل کوڈز کی مکمل رہنمائی"
      : locale === "id"
      ? "Panduan Lengkap Kode Referral Kompetisi Umrah Nusuk 2026"
      : locale === "tr"
      ? "Ücretsiz 2026 Nusuk Umre Yarışması Referans Kodları Rehberi"
      : locale === "fr"
      ? "Guide Complet des Codes de Parrainage pour le Concours Omra Nusuk 2026"
      : locale === "es"
      ? "Guía Completa de Códigos de Referido para el Concurso de Umrah Nusuk 2026"
      : locale === "hi"
      ? "मुफ्त नुसुक उमरा प्रतियोगिता 2026 और रेफरल कोड्स गाइड"
      : "Complete Guide to Free Nusuk Umrah Challenge Codes 2026";

  const sectionDesc =
    locale === "ar"
      ? "تتيح لك رموز الإحالة في تطبيق نسك كسب مفاتيح إضافية يومية لفتح المزيد من الأسئلة في تحدي العمرة. كل إجابة صحيحة تمنحك تذكرة دخول في السحب اليومي على رحلات عمرة مجانية لشخصين."
      : locale === "bn"
      ? "নুসুক অ্যাপে রেফারেল কোড ব্যবহার করে আপনি প্রতিদিন অতিরিক্ত চাবি আনলক করতে পারবেন। সঠিক উত্তর দিয়ে প্রতিদিন ফ্রি ওমরাহ ড্রতে অংশ নিন।"
      : locale === "ur"
      ? "نسک ایپ میں ریفرل کوڈز کے ذریعے آپ روزانہ اضافی چابیاں حاصل کر سکتے ہیں۔ صحیح جواب دے کر 100 مفت عمرہ پیکیجز کی قرعہ اندازی میں حصہ لیں۔"
      : locale === "id"
      ? "Kode referral di aplikasi Nusuk memberi Anda kunci harian tambahan untuk menjawab pertanyaan kompetisi. Jawaban benar membuka kesempatan menang undian Umrah gratis."
      : "Referral codes inside the official Nusuk application unlock free daily keys to answer competition questions. Correct answers enter you directly into the daily raffle for 100 all-inclusive Umrah trips.";

  const faqHeading =
    locale === "ar"
      ? "الأسئلة الشائعة حول مفاتيح نسك"
      : locale === "bn"
      ? "সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)"
      : locale === "ur"
      ? "نسک چابیوں سے متعلق عام سوالات"
      : locale === "id"
      ? "Pertanyaan yang Sering Diajukan (FAQ)"
      : locale === "tr"
      ? "Sıkça Sorulan Sorular (SSS)"
      : locale === "fr"
      ? "Foire Aux Questions (FAQ)"
      : locale === "es"
      ? "Preguntas Frecuentes (FAQ)"
      : locale === "hi"
      ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)"
      : "Frequently Asked Questions (FAQ)";

  return (
    <section className="rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 mb-12 shadow-xs">
      <div className="max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-3">
          {sectionTitle}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
          {sectionDesc}
        </p>

        {/* Quick Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <Link
            href={p("/guide")}
            className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-colors group"
          >
            <div className="font-bold text-sm text-emerald-950 group-hover:text-emerald-700">
              {locale === "ar" ? "كيفية الحصول على مفاتيح أكثر ←" : locale === "bn" ? "কীভাবে আরও কি পাবেন ←" : "How to get more Nusuk keys →"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {locale === "ar" ? "شرح مبسط خطوة بخطوة" : "Step-by-step strategy for extra keys"}
            </div>
          </Link>
          <Link
            href={p("/nusuk-key-not-working")}
            className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors group"
          >
            <div className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">
              {locale === "ar" ? "حل مشكلة تعطل كود نسك ←" : locale === "bn" ? "নুসুক কোড কাজ না করলে সমাধান ←" : "Fix 'Key Not Working' errors →"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {locale === "ar" ? "أسباب الرموز المنتهية والحلول" : "Common invite code issues and fixes"}
            </div>
          </Link>
        </div>

        {/* Accordion FAQs (Dynamic Language Translation) */}
        <h3 className="text-lg font-black text-gray-900 mb-4">
          {faqHeading}
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${
                    openFaq === i ? "rotate-180 text-emerald-700" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
