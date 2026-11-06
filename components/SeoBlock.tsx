"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";

export function SeoBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
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
    <section className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 mb-10 shadow-xs">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3">
        {t.seoText.title}
      </h2>

      <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
        <p>{t.seoText.p1}</p>
        <p>{t.seoText.p2}</p>
      </div>

      {/* Frequently Asked Questions Accordion for SEO and Rich Snippets */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
          {isAr ? "الأسئلة الشائعة حول مفاتيح نسك" : "Frequently Asked Questions (FAQ)"}
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-100 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-start font-semibold text-xs sm:text-sm text-gray-800 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 pr-2 rtl:pr-0 rtl:pl-2">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-3.5 sm:p-4 text-xs sm:text-sm text-gray-600 bg-white border-t border-gray-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Navigation Links for SEO Siloing */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-emerald-700">
        <Link href={p("/codes")} className="hover:underline">
          {isAr ? "قائمة جميع الرموز" : "All Nusuk Codes"}
        </Link>
        <span className="text-gray-300">•</span>
        <Link href={p("/guide")} className="hover:underline">
          {t.seoText.linkKeys}
        </Link>
        <span className="text-gray-300">•</span>
        <Link href={p("/nusuk-key-not-working")} className="hover:underline">
          {t.seoText.linkTrouble}
        </Link>
        <span className="text-gray-300">•</span>
        <Link href={p("/find-nusuk-invite-code")} className="hover:underline">
          {t.seoText.linkFind}
        </Link>
        <span className="text-gray-300">•</span>
        <Link href={p("/nusuk-competition")} className="hover:underline">
          {isAr ? "دليل مسابقة العمرة" : "Umrah Challenge Guide"}
        </Link>
        <span className="text-gray-300">•</span>
        <Link href={p("/blog")} className="hover:underline font-bold text-emerald-800">
          {isAr ? "مدونة مفاتيح نسك والشروحات" : "Nusuk Key Blog & Guides"}
        </Link>
      </div>
    </section>
  );
}
