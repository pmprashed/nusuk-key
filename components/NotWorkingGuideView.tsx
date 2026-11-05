"use client";

import Link from "next/link";
import { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";
import { FaqJsonLd } from "./JsonLd";

export function NotWorkingGuideView({ locale }: { locale: Locale }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  const faqs =
    locale === "ar"
      ? [
          {
            question: "نسك يقول: «تم استخدام الرمز من قبل»",
            answer:
              "لقد قمت أنت وصاحب هذا الرمز بتبادل المفاتيح سابقاً. لا يمكن لأي ثنائي التبادل أكثر من مرة واحدة، فالرمز ليس معطلاً بل استُنفد التبادل بينكما. ما عليك سوى نسخ الرمز التالي من موقعنا. وفي موقع «مفاتيح نسك»، اضغط «مشكلة؟» واختر «تم استخدام الرمز من قبل» لكي نخفيه عنك.",
          },
          {
            question: "نسك يقول: «الرمز المدخل غير صحيح»",
            answer:
              "تأكد من نسخ الرمز بالكامل، بادئاً بـ NG- بدون أي مسافات أو أحرف زائدة قبله أو بعده. ننصح بنسخه بدلاً من كتابته يدوياً لتفادي الخطأ. إذا استمر الخطأ، اضغط «مشكلة؟» واختر «الرمز غير صحيح». عند إبلاغ شخصين عن الرمز يتم حذفه من الموقع نهائياً.",
          },
          {
            question: "لصقت الرمز لكنني لم أحصل على مفتاح إضافي",
            answer:
              "تأكد من لصقه في خانة «أضف رمز للحصول على مفتاح جديد» في تبويب المفاتيح وضغطت «التحقق من الرمز». أغلق التطبيق وأعد فتحه لتحديث عداد المفاتيح. وتذكر أن كل رمز يمنحك مفتاحاً مرة واحدة فقط لكل حساب.",
          },
          {
            question: "هل هناك حد يومي للمفاتيح الإضافية؟",
            answer:
              "لم تنشر نسك حداً رسمياً معلناً، ولكن بعض المتسابقين أشاروا إلى وجود حد يومي للمفاتيح المقبولة. إذا توقف التطبيق عن قبول رموز جديدة اليوم، جرب مجدداً بعد منتصف الليل مع التجديد اليومي.",
          },
          {
            question: "متى يتجدد مفتاحي اليومي المجاني؟",
            answer:
              "يحصل الجميع على مفتاح مجاني واحد في بداية كل يوم بتوقيت السعودية (مكة المكرمة). تنتهي صلاحية المفتاح غير المستخدم بنهاية اليوم، لذلك استخدمه يومياً.",
          },
          {
            question: "رمز التحقق (OTP) لا يصل إلى هاتفي",
            answer:
              "انتظر دقيقة قبل طلب إعادة الإرسال. تحقق من مجلد الرسائل غير المرغوب فيها (Spam) إذا كنت تسجل عبر البريد، وتأكد من كتابة البريد أو رقم الهاتف بشكل صحيح. قد يكون هناك ضغط عالٍ على خوادم التطبيق أثناء الحملات الكبرى.",
          },
          {
            question: "يظهر لي أن «الحساب مسجل بالفعل»",
            answer:
              "هذا يعني أنك قمت بالتسجيل سابقاً لحجز تصريح عمرة أو زيارة. اختر «تسجيل الدخول» بدلاً من تسجيل جديد، واستخدم خيار «نسيت كلمة المرور» إذا لزم الأمر.",
          },
          {
            question: "لا أجد المسابقة في تطبيق نسك",
            answer:
              "قم بتحديث تطبيق نسك من متجر التطبيقات إلى آخر إصدار ثم أعد فتحه. في الصفحة الرئيسية، ابحث عن لافتة 100 رحلة عمرة واضغط «ابدأ التحدي». يمكنك أيضاً التوجه إلى مركز الألعاب داخل التطبيق واختيار المسابقة.",
          },
          {
            question: "بمن أتصل عند مواجهة مشاكل تقنية في تطبيق نسك؟",
            answer:
              "لمشاكل تسجيل الدخول أو رسائل الخطأ داخل تطبيق نسك، اتصل بالدعم الفني المعتمد لنسك على الرقم 920002814. لا يمكن لموقع «مفاتيح نسك» حل مشاكل حسابك الخاص في التطبيق.",
          },
          {
            question: "هل استخدام رموز «مفاتيح نسك» آمن؟",
            answer:
              "نعم وآمن تماماً. رموز الإحالة مخصصة فقط لمنح المفاتيح ولا يمكنها الوصول إلى أي معلومات شخصية في حسابك. الصق الرموز داخل تطبيق نسك الرسمي فقط، ولا تشارك كلمة مرورك مع أي جهة.",
          },
        ]
      : [
          {
            question: "Nusuk says 'The code already has been used'",
            answer:
              "You and the owner of that code have already swapped keys once. Each pair of people can only swap one time, so the code isn't broken. Just copy the next code. On NusukKey, tap Problem? and choose Nusuk says 'already used', and we won't show it to you again.",
          },
          {
            question: "Nusuk says 'The entered code is not correct'",
            answer:
              "Make sure you copied the whole code, starting with NG-, with no spaces or extra letters before or after it. Paste it instead of typing it by hand, since one wrong letter breaks it. If it still fails, tap Problem? and choose Nusuk says 'not correct'. A code is removed once two people report it.",
          },
          {
            question: "I pasted a code but didn't get an extra key",
            answer:
              "Check that you pasted it in the 'Add code to get new key' box on the Keys tab and tapped Check the code. Close and reopen the app to refresh your keys. Remember that a code gives you a key only once per pair of people.",
          },
          {
            question: "Is there a daily limit on extra keys?",
            answer:
              "Nusuk hasn't published an official limit that we could find, but some guides report a daily cap. If the app stops accepting new codes, try again after the daily reset.",
          },
          {
            question: "When does my free daily key reset?",
            answer:
              "Everyone gets one free key at the start of each day, Saudi time. An unused key expires at the end of the day, so use yours every day.",
          },
          {
            question: "The OTP (verification code) isn't arriving",
            answer:
              "Wait a minute before tapping resend, check your spam or junk folder if you used email, and make sure your email or phone number is typed correctly. Visitors outside Saudi Arabia usually sign up with email. If it still doesn't come, try again later, because the service can be busy during big campaigns.",
          },
          {
            question: "It says the account already exists",
            answer:
              "You have probably signed up before, maybe for an Umrah booking or an earlier competition. Choose sign in instead, and use Forgot password if you need to. There is no need to create a second account.",
          },
          {
            question: "I can't find the competition in the app",
            answer:
              "Update the Nusuk app from Google Play or the App Store, then reopen it. On the Home page, find the banner about 100 Umrah trips and tap Start the challenge (ابدأ التحدي in the Arabic app). You can also open the Games Center and choose the Free Umrah Competition.",
          },
          {
            question: "Who do I contact for app problems?",
            answer:
              "For sign-in problems or error messages inside the Nusuk app, call Nusuk technical support on 920002814. NusukKey can't fix problems with your Nusuk account.",
          },
          {
            question: "Is it safe to use codes from NusukKey?",
            answer:
              "Yes. An invite code only gives keys; it can't access anyone's account. Only paste codes inside the official Nusuk app, and never give your Nusuk password to any website or group. NusukKey never asks for your login.",
          },
        ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <span>{locale === "ar" ? "مساعدة" : "Help"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {locale === "ar"
            ? "رمز أو مفتاح نسك لا يعمل؟ إليك كيفية إصلاح ذلك"
            : "Nusuk key or invite code not working? Here's how to fix it"}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          {locale === "ar"
            ? "أشهر مشاكل نسك مع الرموز والمفاتيح وتسجيل الدخول، وحلولها المباشرة. محدث لشهر نوفمبر 2026."
            : "The most common Nusuk problems with codes, keys and sign in, with plain fixes. Updated November 2026."}
        </p>

        {/* 10 FAQs */}
        <div className="space-y-4 mb-10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                {faq.question}
              </h2>
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
            href={p("/find-nusuk-invite-code")}
            className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            {locale === "ar" ? "أين تجد رمزك" : "Find your invite code"}
          </Link>
        </div>

        {/* More Help Box */}
        <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-6">
          <h3 className="text-sm font-bold text-emerald-950 mb-3">
            {locale === "ar" ? "المزيد من المساعدة" : "More help"}
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm font-medium text-emerald-800">
            <li>
              <Link href={p("/guide")} className="hover:underline">
                • {locale === "ar" ? "كيفية الحصول على مفاتيح نسك (الدليل الكامل)" : "How to get more Nusuk keys (full guide)"}
              </Link>
            </li>
            <li>
              <Link href={p("/find-nusuk-invite-code")} className="hover:underline">
                • {locale === "ar" ? "أين تجد رمز إحالة نسك الخاص بك" : "Where to find your Nusuk invite code"}
              </Link>
            </li>
            <li>
              <Link href={p("/")} className="hover:underline">
                • {locale === "ar" ? "رموز مفاتيح نسك المجانية" : "Free Nusuk key codes"}
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
