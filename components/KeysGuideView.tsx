"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";
import { FaqJsonLd } from "./JsonLd";

export function KeysGuideView({ locale }: { locale: Locale }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  const faqs =
    locale === "ar"
      ? [
          {
            question: "ما هي مسابقة نسك للعمرة المجانية؟",
            answer:
              "هي مسابقة رسمية مجانية تسمى «تحدي نسك للعمرة» داخل تطبيق نسك الرسمي. تقام من 1 نوفمبر إلى 20 ديسمبر 2026، حيث يجرى سحب يومي على رحلة عمرة لشخصين وكراتين ماء زمزم.",
          },
          {
            question: "ما هو مفتاح نسك؟",
            answer:
              "المفتاح يتيح لك فتح سؤال في المسابقة. الإجابة الصحيحة تدخلك مباشرة في السحب اليومي. يحصل كل مستخدم على مفتاح مجاني واحد يومياً تنتهي صلاحيته بنهاية اليوم.",
          },
          {
            question: "كيف أحصل على مفاتيح إضافية؟",
            answer:
              "لكل حساب في نسك رمز إحالة يبدأ بـ NG-. عند إدخال رمز شخص آخر، يحصل كل منكما على مفتاح إضافي. لا يمكن للمستخدمين تبادل المفاتيح أكثر من مرة واحدة، لذلك أنت بحاجة إلى رموز متعددة.",
          },
        ]
      : [
          {
            question: "What is the Nusuk Free Umrah Competition?",
            answer:
              "It is a free competition, also called the Nusuk Umrah Challenge, inside the official Nusuk app, the Saudi platform for Umrah and Hajj. It runs from 1 November to 20 December 2026. One winner is drawn every day for a free Umrah trip with a companion of their choice (50 winners, so 100 Umrah trips in total), and there are daily Zamzam water prizes too. It is open to everyone aged 18 and over, of all nationalities, unless the law in their country prohibits it, and each person can win only once. Always check the exact rules inside the Nusuk app.",
          },
          {
            question: "What is a Nusuk key?",
            answer:
              "A key lets you open one question. Answer it correctly and you are entered into that day's draw. Everyone gets one free key a day, and it expires at the end of the day, so use it daily.",
          },
          {
            question: "How to get extra keys",
            answer:
              "Every Nusuk account has an invite code that starts with NG-. When you paste someone's code, you both get an extra key. Each pair can swap only once, so you need many different codes to collect more keys. That is exactly what NusukKey is for: copy free codes shared by other people, and share yours so they use it too.",
          },
        ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <span>{locale === "ar" ? "دليل" : "Guide"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {locale === "ar"
            ? "كيفية الحصول على مفاتيح إضافية في مسابقة نسك"
            : "How to get more keys in the Nusuk Free Umrah Competition"}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          {locale === "ar"
            ? "كل ما تحتاج معرفته عن مفاتيح نسك ورموز الإحالة، بكلمات واضحة وبسيطة. محدث لشهر نوفمبر 2026."
            : "Everything you need to know about Nusuk keys and invite codes, in plain words. Updated November 2026."}
        </p>

        {/* What is the competition */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {locale === "ar" ? "ما هي مسابقة نسك للعمرة المجانية؟" : "What is the Nusuk Free Umrah Competition?"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "ar"
              ? "هي مسابقة مجانية تُعرف بـ «تحدي نسك للعمرة» في تطبيق نسك الرسمي، المنصة السعودية الرسمية للعمرة والحج. تمتد من 1 نوفمبر إلى 20 ديسمبر 2026. يجري السحب يومياً على رحلة عمرة شاملة لفائز ومرافق من اختياره (إجمالي 100 رحلة)، بالإضافة إلى كراتين ماء زمزم اليومية. المشاركة متاحة لمن هم بعمر 18 فأكثر من كافة الجنسيات."
              : "It is a free competition, also called the Nusuk Umrah Challenge, inside the official Nusuk app, the Saudi platform for Umrah and Hajj. It runs from 1 November to 20 December 2026. One winner is drawn every day for a free Umrah trip with a companion of their choice (50 winners, so 100 Umrah trips in total), and there are daily Zamzam water prizes too. It is open to everyone aged 18 and over, of all nationalities, unless the law in their country prohibits it, and each person can win only once. Always check the exact rules inside the Nusuk app."}
          </p>
        </div>

        {/* What is a Nusuk key */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {locale === "ar" ? "ما هو مفتاح نسك؟" : "What is a Nusuk key?"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "ar"
              ? "يتيح لك المفتاح فتح سؤال في التحدي. الإجابة الصحيحة تدخلك مباشرة في سحب ذلك اليوم. يحصل كل متسابق على مفتاح مجاني واحد يومياً تنتهي صلاحيته في نهاية اليوم، لذا تأكد من استخدامه يومياً."
              : "A key lets you open one question. Answer it correctly and you are entered into that day's draw. Everyone gets one free key a day, and it expires at the end of the day, so use it daily."}
          </p>
        </div>

        {/* Step by step */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
            {locale === "ar" ? "كيفية المشاركة خطوة بخطوة" : "How to take part, step by step"}
          </h2>

          <div className="space-y-4">
            {[
              {
                title: locale === "ar" ? "تحميل تطبيق نسك وتحديثه" : "Download or update the Nusuk app",
                desc: locale === "ar" ? "احصل على التطبيق الرسمي من Google Play أو App Store وسجل دخولك." : "Get the official Nusuk app from Google Play or the App Store and sign in. Visitors outside Saudi Arabia usually sign in with email.",
              },
              {
                title: locale === "ar" ? "فتح مسابقة العمرة المجانية" : "Open the Free Umrah Competition",
                desc: locale === "ar" ? "في الصفحة الرئيسية، اضغط على لافتة تحدي العمرة (أو افتح مركز الألعاب)." : "On the Home page, tap Start the challenge on the banner about 100 Umrah trips (in the Arabic app it says ابدأ التحدي). Agree to the Terms and Conditions if asked. You can also find it in the Games Center.",
              },
              {
                title: locale === "ar" ? "استخدام مفتاحك اليومي المجاني" : "Use your free daily key",
                desc: locale === "ar" ? "في شاشة اختيار الباب، اختر باباً (القرآن، السيرة، مكة، المدينة) وأجب عن السؤال." : "You get one free key every day. On the Choose a door screen, pick a door: the Quran, the Prophet's Seerah, Makkah, or Madinah, and answer the question.",
              },
              {
                title: locale === "ar" ? "الإجابة الصحيحة لدخول السحب" : "Answer correctly to enter the draw",
                desc: locale === "ar" ? "الإجابة الصحيحة تدخلك السحب اليومي فوراً. وإذا أغلقت قرعة ذلك اليوم تدخل في سحب اليوم التالي تلقائياً." : "Every correct answer enters you into the daily draw. If you answer after that day's draw, you go into the next one automatically.",
              },
              {
                title: locale === "ar" ? "الحصول على مفاتيح إضافية برموز الإحالة" : "Get extra keys with invite codes",
                desc: locale === "ar" ? "في تبويب المفاتيح، الصق رمز إحالة شخص آخر (يبدأ بـ NG-) واضغط تحقق، فيحصل كلاكما على مفتاح إضافي." : "On the Keys tab, paste someone else's invite code (it starts with NG-) in the 'Add code to get new key' box and tap Check the code. You both get one extra key. Share your own code so others can do the same for you.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[#15803D] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to get extra keys */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {locale === "ar" ? "كيفية جمع المفاتيح الإضافية" : "How to get extra keys"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            {locale === "ar"
              ? "يمتلك كل حساب في نسك رمز دعوة خاص يبدأ بـ NG-. عند لصق رمز شخص آخر، يحصل كل منكما على مفتاح مجاني. ونظراً لأن كل ثنائي يمكنه التبادل مرة واحدة فقط، فأنت بحاجة إلى رموز متعددة يومياً لجمع أكبر عدد من المفاتيح. وهنا يأتي دور «مفاتيح نسك»: انسخ رموزاً مجانية شاركها الآخرون، وشارك رمزك ليستخدمه غيرك."
              : "Every Nusuk account has an invite code that starts with NG-. When you paste someone's code, you both get an extra key. Each pair can swap only once, so you need many different codes to collect more keys. That is exactly what NusukKey is for: copy free codes shared by other people, and share yours so they use it too."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={p("/")}
              className="inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors"
            >
              {locale === "ar" ? "احصل على رموز مجانية" : "Get free codes"}
            </Link>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {locale === "ar" ? "شارك رمزك" : "Share your code"}
            </button>
          </div>
        </div>

        {/* Having trouble */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-3">
            {locale === "ar" ? "تواجه مشكلة؟" : "Having trouble?"}
          </h3>
          <div className="space-y-1.5 text-xs sm:text-sm font-medium text-emerald-700">
            <div>
              <Link href={p("/nusuk-competition")} className="hover:underline">
                {locale === "ar" ? "مسابقة نسك 2026: التواريخ والجوائز" : "Nusuk competition 2026: dates and prizes"}
              </Link>
            </div>
            <div>
              <Link href={p("/nusuk-key-not-working")} className="hover:underline">
                {locale === "ar" ? "رمز أو مفتاح نسك لا يعمل؟ الحلول والإصلاحات" : "Nusuk key or code not working? Fixes"}
              </Link>
            </div>
            <div>
              <Link href={p("/find-nusuk-invite-code")} className="hover:underline">
                {locale === "ar" ? "أين تجد رمز إحالة نسك الخاص بك" : "Where to find your Nusuk invite code"}
              </Link>
            </div>
          </div>
        </div>

        {/* Stay Safe Box */}
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 sm:p-6 mb-8 text-gray-800">
          <div className="flex items-center gap-2 text-emerald-900 font-bold mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg">{locale === "ar" ? "إرشادات الأمان الهامة" : "Stay safe"}</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {locale === "ar"
              ? "لا تقم بإدخال الرموز إلا داخل تطبيق نسك الرسمي فقط. لا تقدم أبداً كلمة مرورك في نسك لأي شخص أو موقع، واحذر من الرسائل أو الروابط المشبوهة. موقع «مفاتيح نسك» لا يطلب منك تسجيل الدخول أو إدخال أي بيانات سرية إطلاقاً."
              : "Only enter codes inside the official Nusuk app. Never give your Nusuk password to any website or WhatsApp group, and be careful with links that ask you to sign in. NusukKey never asks for your login."}
          </p>
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
