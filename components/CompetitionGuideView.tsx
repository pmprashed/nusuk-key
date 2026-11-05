"use client";

import Link from "next/link";
import { useState } from "react";
import { Locale, getDictionary } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";
import { FaqJsonLd } from "./JsonLd";

export function CompetitionGuideView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  const faqs =
    locale === "ar"
      ? [
          {
            question: "متى تبدأ مسابقة نسك ومتى تنتهي؟",
            answer:
              "بدأت المسابقة في 1 نوفمبر 2026 وتستمر حتى 20 ديسمبر 2026 بحسب الأسئلة الشائعة الرسمية، أي لمدة 50 يوماً مع سحب يومي.",
          },
          {
            question: "كم عدد الفائزين في المسابقة؟",
            answer:
              "يتم سحب فائز واحد يومياً لرحلة عمرة مجانية له ولمرافق من اختياره (إجمالي 50 فائزاً و 100 رحلة عمرة)، كما يتم سحب 7 فائزين يومياً بماء زمزم (إجمالي 350 كرتون).",
          },
          {
            question: "ماذا تشمل جائزة العمرة المجانية؟",
            answer:
              "تشمل الجائزة تذاكر الطيران للفائز ومرافقه، وتأشيرة العمرة، وإقامة فندقية لمدة 10 ليالٍ في مكة المكرمة والمدينة المنورة، وخدمات النقل والإرشاد. لا يمكن تحويل الجائزة أو استبدالها بمبلغ نقدي.",
          },
          {
            question: "ما هي جائزة ماء زمزم؟",
            answer:
              "يحصل كل فائز يومي على كرتون من ماء زمزم يتم توصيله إليه، وتقتصر هذه الجائزة على المقيمين داخل المملكة العربية السعودية.",
          },
          {
            question: "كيف تعمل مفاتيح نسك؟",
            answer:
              "تحصل على مفتاح مجاني واحد يومياً تنتهي صلاحيته في نهاية اليوم. وكل مشاركة ناجحة لرمز الإحالة تمنحك أنت والطرف الآخر مفتاحاً إضافياً لكل منكما.",
          },
          {
            question: "متى يجرى السحب اليومي؟",
            answer:
              "يجرى السحب في وقت عشوائي كل يوم. إذا كانت إجابتك صحيحة بعد سحب ذلك اليوم، تدخل تلقائياً في سحب اليوم التالي.",
          },
          {
            question: "كيف يتم إعلان الفائزين؟",
            answer:
              "يتم إعلان الفائزين يومياً عبر حسابات نسك الرسمية (@Nu5uk)، وتظهر أسماؤهم في صفحة الفائزين داخل التطبيق. كما يتم التواصل معهم عبر البريد الإلكتروني.",
          },
          {
            question: "من يحق له المشاركة في المسابقة؟",
            answer:
              "يحق لكل شخص يبلغ من العمر 18 عاماً فأكثر من أي جنسية المشاركة، ما لم تمنع قوانين بلده ذلك. ويمكن لكل شخص الفوز مرة واحدة فقط.",
          },
          {
            question: "هل المشاركة في المسابقة مجانية؟",
            answer:
              "نعم، المشاركة مجانية تماماً. لا تدفع أي رسوم ولا تشارك أبداً كلمة مرورك أو رمز التحقق (OTP). لا تتواصل نسك لطلب أموال لتسليم الجوائز.",
          },
          {
            question: "لدي مشكلة في تطبيق نسك، بمن أتصل؟",
            answer:
              "لمشاكل تسجيل الدخول أو التطبيق، اتصل بالدعم الفني الموحد لنسك على الرقم 920002814.",
          },
          {
            question: "هل موقع «مفاتيح نسك» رسمي؟",
            answer:
              "لا، هذا موقع مجتمعي مستقل تماماً لمشاركة الرموز بين المتسابقين، ولا يتبع لنسك أو وزارة الحج والعمرة، ولا يطلب بيانات تسجيل الدخول أبداً.",
          },
        ]
      : [
          {
            question: "When does the Nusuk competition start and end?",
            answer:
              "The competition started on 1 November 2026 and ends on 20 December 2026 according to the official FAQ. That is 50 days with a draw every day.",
          },
          {
            question: "How many winners are there?",
            answer:
              "One winner is drawn every day for a free Umrah trip for themselves and a companion of their choice (50 winners, so 100 Umrah trips in total), and 7 winners are drawn daily for Zamzam water (350 winners in total).",
          },
          {
            question: "What does the free Umrah prize include?",
            answer:
              "Flights for the winner and one companion, Umrah visa, 10 nights accommodation in Makkah and Madinah, plus transportation and guidance services. The prize cannot be transferred or exchanged for cash.",
          },
          {
            question: "What is the Zamzam water prize?",
            answer:
              "Each daily Zamzam winner receives cartons of Zamzam water delivered to them. Delivery is only available to residents inside Saudi Arabia.",
          },
          {
            question: "How do Nusuk keys work?",
            answer:
              "You get one free key every day, and it expires at the end of the day. Each successful code swap gives you and the other person one extra key each.",
          },
          {
            question: "When is the draw held?",
            answer:
              "The draw is held at random once a day. If your answer is correct after that day's draw, your answer is in that draw automatically and the app shows you when that is.",
          },
          {
            question: "How are winners announced?",
            answer:
              "Winners are announced every day on Nusuk's official accounts (@Nu5uk), and their names appear on the 'Winners' page inside the game in the app. Winners are contacted by email.",
          },
          {
            question: "Who can take part?",
            answer:
              "Anyone aged 18 or over, of any nationality, unless the law in their country prohibits it. Each person can win only once.",
          },
          {
            question: "Does it cost anything to take part?",
            answer:
              "No. Taking part is completely free. Ignore any message asking you to pay a fee, share your password or OTP, or pay a processing fee to claim a prize.",
          },
          {
            question: "I have a problem with the app. Who do I contact?",
            answer:
              "For sign-in problems or error messages inside the Nusuk app, call Nusuk technical support on 920002814. NusukKey cannot fix problems with your Nusuk account.",
          },
          {
            question: "Is NusukKey official?",
            answer:
              "No. NusukKey is an independent community website where people swap invite codes. It is not run by Nusuk or the Ministry of Hajj and Umrah, and it never asks for your Nusuk login.",
          },
        ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <span>{locale === "ar" ? "دليل المسابقة" : "Competition guide"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {locale === "ar" ? "مسابقة نسك للعمرة المجانية 2026" : "Nusuk Free Umrah Competition 2026"}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          {locale === "ar"
            ? "كيف تعمل مسابقة العمرة المجانية في تطبيق نسك الرسمي: التواريخ، والجوائز، والمفاتيح، والسحب اليومي، وكيفية إعلان الفائزين. استناداً إلى الأسئلة الشائعة في تطبيق نسك. موقع «مفاتيح نسك» موقع مجتمعي مستقل لا يتبع لنسك. آخر تحديث: 5 نوفمبر 2026."
            : "How the Free Umrah competition in the official Nusuk app works: dates, prizes, keys, the daily draw and how winners are announced. Based on the official competition FAQ in the Nusuk app. NusukKey is an independent community site, not run by Nusuk. Updated 5 November 2026."}
        </p>

        {/* How to take part */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
            {locale === "ar" ? "كيفية المشاركة خطوة بخطوة" : "How to take part"}
          </h2>

          <div className="space-y-4">
            {[
              {
                title: locale === "ar" ? "تحميل تطبيق نسك وتسجيل الدخول" : "Download the Nusuk app and sign in",
                desc: locale === "ar" ? "حمّل تطبيق نسك الرسمي من متجر Google Play أو App Store وسجّل دخولك." : "Get the official Nusuk app from Google Play or the App Store, published by the Ministry of Hajj and Umrah.",
              },
              {
                title: locale === "ar" ? "الموافقة على الشروط والأحكام" : "Agree to the Terms and Conditions",
                desc: locale === "ar" ? "اقرأ الشروط للمسابقة لمعرفة التفاصيل والفئات المؤهلة." : "Be aware the official rules for dates, prizes and who can enter.",
              },
              {
                title: locale === "ar" ? "اضغط على «ابدأ التحدي» في الصفحة الرئيسية" : "Tap Start the challenge on the Home page",
                desc: locale === "ar" ? "ابحث عن لافتة مسابقة العمرة أو افتح مركز الألعاب." : "Find the banner about 100 Umrah trips on the home page. You can also open the Games Center and choose the Free Umrah Competition.",
              },
              {
                title: locale === "ar" ? "اختر باباً وأجب عن السؤال" : "Choose a door and answer the question",
                desc: locale === "ar" ? "اختر أحد الأبواب (القرآن، السيرة النبوية، مكة، المدينة) وأجب عن السؤال اليومي لدخول السحب." : "Each door covers one category. Every correct answer qualifies you directly for the draw. Categories cover the Quran, the Prophet's Seerah, Makkah and Madinah.",
              },
              {
                title: locale === "ar" ? "احصل على مفاتيح إضافية بالمشاركة" : "Get extra keys by sharing",
                desc: locale === "ar" ? "كل رمز إحالة صحيح يتم تبادله يمنحك أنت والطرف الآخر مفتاحاً إضافياً لفتح سؤال جديد." : "Each valid code entered gives one key to you and one to the person you swapped with. Share your code and enter other NG- codes from other people to collect more keys.",
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

        {/* FAQs */}
        <div className="space-y-6 mb-10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <Link
            href={p("/")}
            className="inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-xs transition-colors"
          >
            {locale === "ar" ? "احصل على رموز مجانية" : "Get free codes"}
          </Link>
          <Link
            href={p("/guide")}
            className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            {locale === "ar" ? "كيف تحصل على المزيد من المفاتيح" : "How to get more keys"}
          </Link>
        </div>

        {/* More Help Links */}
        <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-6">
          <h4 className="text-sm font-bold text-emerald-950 mb-3">
            {locale === "ar" ? "المزيد من المساعدة" : "More help"}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm font-medium text-emerald-800">
            <li>
              <Link href={p("/")} className="hover:underline">
                • {locale === "ar" ? "رموز نسك المجانية (محدثة طوال اليوم)" : "Free Nusuk key codes (Updated all day)"}
              </Link>
            </li>
            <li>
              <Link href={p("/guide")} className="hover:underline">
                • {locale === "ar" ? "كيفية الحصول على مفاتيح نسك" : "How to get more Nusuk keys"}
              </Link>
            </li>
            <li>
              <Link href={p("/find-nusuk-invite-code")} className="hover:underline">
                • {locale === "ar" ? "أين تجد رمز إحالة نسك الخاص بك" : "Where to find your Nusuk invite code"}
              </Link>
            </li>
            <li>
              <Link href={p("/nusuk-key-not-working")} className="hover:underline">
                • {locale === "ar" ? "رمز نسك لا يعمل؟ الحلول والإصلاحات" : "Nusuk key not working? Fixes"}
              </Link>
            </li>
          </ul>
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
