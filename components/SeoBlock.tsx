"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export function SeoBlock({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);
  const isAr = locale === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = isAr
    ? [
        {
          q: "ما هو مفتاح نسك (Nusuk Key) وكيف تستفيد منه؟",
          a: "مفتاح نسك هو رمز دعوة فريد يبدأ بـ NG- متبوعاً بـ 8 خانات (مثال: NG-CXEVbXwR). يُستخدم داخل تطبيق نسك الرسمي في مسابقة العمرة للحصول على مفاتيح إضافية وزيادة فرص الفوز برحلة العمرة المجانية وتذاكر الطيران.",
        },
        {
          q: "كيف أحصل على رموز إحالة نسك مجانية ونشطة؟",
          a: "موقعنا يوفر نظام تدوير عادل ومحدث لحظياً لرموز إحالة نسك الصالحة التي يشاركها المعتمرون. كل ما عليك هو الضغط على 'نسخ' أو 'فتح في نسك' وسيتم نقلك مباشرة للتطبيق مع تعبئة الرمز تلقائياً.",
        },
        {
          q: "لماذا تظهر رسالة أن كود نسك غير صالح أو مستخدم؟",
          a: "كل رمز دعوة في تطبيق نسك له سعة محددة من الاستخدامات. إذا اكتمل عدد المسجلين بالرمز فإنه يتوقف. بمجرد إبلاغك عنه في الموقع نقوم باستبعاده وإظهار كود جديد نشط لم يكتمل بعد.",
        },
        {
          q: "كيف أضمن عدم تكرار نفس الكود بعد نسخه؟",
          a: "يعتمد الموقع نظام تدوير ذكي يحفظ الرموز التي نسختها، بحيث لا يظهر لك نفس الرمز إطلاقاً مرة أخرى سواء في البطاقة الرئيسية أو القائمة أدناه، لضمان حصولك دائماً على رموز جديدة.",
        },
      ]
    : [
        {
          q: "What is a Nusuk Key and how does the Umrah Challenge work?",
          a: "A Nusuk Key is an official referral code (formatted as NG-XXXXXXXX) for the Nusuk Umrah Competition. Entering a verified invite code awards both you and the sender bonus keys, increasing your winning odds for free Umrah packages.",
        },
        {
          q: "How do I get fresh, working Nusuk referral codes?",
          a: "Our community platform constantly rotates verified Nusuk invite codes from pilgrims. Simply click 'Copy' or 'Open in Nusuk' to automatically open the deep link and apply the fresh code.",
        },
        {
          q: "Why is a Nusuk code showing 'Already Used' or 'Invalid'?",
          a: "Referral codes in the Nusuk app have limited redemption quotas. When a code reaches its cap, tap the report flag and our system instantly serves a fresh, unexpired referral key.",
        },
        {
          q: "How does NusukKey prevent showing duplicate codes?",
          a: "Our smart rotation engine tracks every code you have copied or interacted with. Once copied, that key will never be presented to you again, ensuring you always get fresh codes.",
        },
      ];

  return (
    <section className="rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 mb-12 shadow-xs">
      <div className="max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-3">
          {isAr
            ? "دليلك الشامل لرموز مسابقة نسك للعمرة المجانية 2026"
            : locale === "bn"
            ? "ফ্রি নুসুক ওমরাহ প্রতিযোগিতা ২০২৬ ও রেফারেল কোড গাইড"
            : "Complete Guide to Free Nusuk Umrah Challenge Codes 2026"}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
          {isAr
            ? "تتيح لك رموز الإحالة في تطبيق نسك كسب مفاتيح إضافية يومية لفتح المزيد من الأسئلة في تحدي العمرة. كل إجابة صحيحة تمنحك تذكرة دخول في السحب اليومي على رحلات عمرة مجانية لشخصين."
            : locale === "bn"
            ? "নুসুক অ্যাপে রেফারেল কোড ব্যবহার করে আপনি প্রতিদিন অতিরিক্ত চাবি আনলক করতে পারবেন। সঠিক উত্তর দিয়ে প্রতিদিন ফ্রি ওমরাহ ড্রতে অংশ নিন।"
            : "Referral codes inside the official Nusuk application unlock free daily keys to answer competition questions. Correct answers enter you directly into the daily raffle for 100 all-inclusive Umrah trips."}
        </p>

        {/* Quick Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <Link
            href={p("/guide")}
            className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-colors group"
          >
            <div className="font-bold text-sm text-emerald-950 group-hover:text-emerald-700">
              {isAr ? "كيفية الحصول على مفاتيح أكثر ←" : locale === "bn" ? "কীভাবে আরও কি পাবেন ←" : "How to get more Nusuk keys →"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {isAr ? "شرح مبسط خطوة بخطوة" : "Step-by-step strategy for extra keys"}
            </div>
          </Link>
          <Link
            href={p("/nusuk-key-not-working")}
            className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors group"
          >
            <div className="font-bold text-sm text-gray-900 group-hover:text-emerald-700">
              {isAr ? "حل مشكلة تعطل كود نسك ←" : locale === "bn" ? "নুসুক কোড কাজ না করলে সমাধান ←" : "Fix 'Key Not Working' errors →"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {isAr ? "أسباب الرموز المنتهية والحلول" : "Common invite code issues and fixes"}
            </div>
          </Link>
        </div>

        {/* Accordion FAQs */}
        <h3 className="text-lg font-black text-gray-900 mb-4">
          {isAr ? "الأسئلة الشائعة حول مفاتيح نسك" : locale === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}
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
