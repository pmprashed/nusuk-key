"use client";

import Link from "next/link";
import { useState } from "react";
import { Share2, KeyRound } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";
import { FaqJsonLd } from "./JsonLd";

export function FindCodeGuideView({ locale }: { locale: Locale }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  const faqs =
    locale === "ar"
      ? [
          {
            question: "أين أجد رمز الإحالة الخاص بي في تطبيق نسك؟",
            answer:
              "افتح تطبيق نسك، وتوجه إلى صفحة مسابقة العمرة المجانية، ثم انتقل إلى تبويب «المفاتيح». ستجد هناك خيار «مشاركة الرمز للحصول على مفتاح جديد» مع زر النسخ والمشاركة.",
          },
          {
            question: "كيف يبدو شكل رمز دعوة نسك؟",
            answer:
              "يبدأ رمز نسك دائماً بالحرفين NG- يتبعهما 8 أحرف وأرقام باللغة الإنجليزية (مثال توضيحي تجريبي: NG-A1B2C3D4).",
          },
          {
            question: "أين يمكنني مشاركة رمزي لجمع المفاتيح؟",
            answer:
              "يمكنك مشاركته على موقع «مفاتيح نسك» ليظهر لآلاف المتسابقين، كما يمكنك إرساله لأصدقائك وعائلتك عبر واتساب ومجموعات التواصل.",
          },
        ]
      : [
          {
            question: "Where do I find my invite code in the Nusuk app?",
            answer:
              "Open the official Nusuk app, go to the Free Umrah Competition / Umrah Challenge screen, and tap the 'Keys' tab. You will see a section labelled 'Share code to get keys' with a copy button next to your code.",
          },
          {
            question: "What does a Nusuk invite code look like?",
            answer:
              "A valid Nusuk invite code always begins with the prefix NG- followed by 8 alphanumeric characters (for example, a clearly fake sample: NG-A1B2C3D4).",
          },
          {
            question: "Where should I share my code to get more keys?",
            answer:
              "Share your code right here on NusukKey using the 'Share a code' button. Every time a new visitor enters your code, you receive an extra key in the official app.",
          },
        ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <span>{locale === "ar" ? "رمز الدعوة" : "Invite Code Guide"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {locale === "ar"
            ? "كيف تجد وتشارك رمز دعوة نسك الخاص بك"
            : "How to find and share your Nusuk invite code"}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          {locale === "ar"
            ? "دليل مبسط من 3 خطوات لمعرفة رمز إحالتك في تطبيق نسك ومشاركته للحصول على مفاتيح إضافية مجاناً."
            : "A simple 3-step guide to locate your personal invite code in the official Nusuk app and share it to earn extra keys."}
        </p>

        {/* 3 Steps */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
            {locale === "ar" ? "3 خطوات بسيطة لإيجاد رمزك" : "3 steps to find your own code"}
          </h2>

          <div className="space-y-5">
            {[
              {
                title: locale === "ar" ? "1. افتح مسابقة العمرة في تطبيق نسك" : "1. Open the competition in the Nusuk app",
                desc: locale === "ar" ? "سجل دخولك إلى تطبيق نسك واضغط على لافتة تحدي العمرة (أو اختر مسابقة العمرة من مركز الألعاب)." : "Sign in to the official Nusuk app and tap the Umrah Challenge banner on the home screen or open it from the Games Center.",
              },
              {
                title: locale === "ar" ? "2. انتقل إلى تبويب «المفاتيح»" : "2. Go to the 'Keys' tab",
                desc: locale === "ar" ? "ابحث عن شاشة المفاتيح التي تعرض رصيدك من المفاتيح اليومية والإضافية." : "Look for the Keys tab where your daily key count and extra keys are shown.",
              },
              {
                title: locale === "ar" ? "3. انسخ رمز الإحالة الخاص بك" : "3. Copy your unique invite code",
                desc: locale === "ar" ? "ستجد قسماً بعنوان «شارك الرمز للحصول على مفاتيح». اضغط على زر النسخ أو المشاركة لنسخ رمزك." : "Locate the 'Share code to get keys' section. Tap Copy or Share to copy your personal referral text containing your NG- code.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[#15803D] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What code looks like */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-700" />
            <span>{locale === "ar" ? "كيف يبدو شكل رمز نسك؟" : "What does a Nusuk code look like?"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
            {locale === "ar"
              ? "يتكون الرمز دائماً من البادئة NG- تليها 8 خانات تتضمن حروفاً وأرقاماً إنجليزية. إليك مثال توضيحي وهمي:"
              : "A valid Nusuk invite code always begins with 'NG-' followed by exactly 8 characters (letters and numbers). Here is an example:"}
          </p>

          <div className="inline-block px-5 py-3 rounded-xl bg-gray-100 border border-gray-300 font-mono text-xl font-bold text-gray-800 tracking-wider">
            NG-A1B2C3D4
          </div>
          <span className="block mt-2 text-xs text-gray-400 italic">
            {locale === "ar" ? "(رمز توضيحي وهمي لأغراض الشرح فقط)" : "(Clearly fake example for demonstration purposes only)"}
          </span>
        </div>

        {/* Where to share */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-700" />
            <span>{locale === "ar" ? "أين تشارك رمزك؟" : "Where to share your code"}</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong>{locale === "ar" ? "موقع مفاتيح نسك: " : "On NusukKey: "}</strong>
                {locale === "ar"
                  ? "أدرج رمزك هنا ليظهر لآلاف الزوار يومياً ضمن نظام التدوير العادل."
                  : "Submit your code here so thousands of active participants can use it via fair rotation."}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong>{locale === "ar" ? "مجموعات العائلة والأصدقاء: " : "With friends & family: "}</strong>
                {locale === "ar"
                  ? "شارك الرمز عبر واتساب وتيليجرام مع المهتمين بالمسابقة."
                  : "Send your code to peers taking part in the Umrah competition."}
              </span>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors"
            >
              {locale === "ar" ? "شارك رمزك الآن" : "Share your code now"}
            </button>
            <Link
              href={p("/")}
              className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {locale === "ar" ? "تصفح الرموز المتاحة" : "Browse free codes"}
            </Link>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <ShareModal
        locale={locale}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onCodeAdded={() => {}}
      />
      <ToastContainer />
      <FaqJsonLd faqs={faqs} />
    </div>
  );
}
