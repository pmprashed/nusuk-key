"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { LanguageProvider, useLanguage } from "./LanguageProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";
import { FaqJsonLd } from "./JsonLd";

function KeysGuideContent() {
  const { locale, t } = useLanguage();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  const faqs = (() => {
    if (locale === "ar") {
      return [
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
      ];
    }
    if (locale === "bn") {
      return [
        {
          question: "নুসুক ফ্রি ওমরাহ প্রতিযোগিতা কী?",
          answer:
            "এটি নুসুক অফিশিয়াল অ্যাপের একটি ফ্রি প্রতিযোগিতা। ১ নভেম্বর থেকে ২০ ডিসেম্বর ২০২৬ পর্যন্ত প্রতিদিন ২ জনের জন্য ওমরাহ ট্রিপ এবং জমজম ওয়াটার ড্র অনুষ্ঠিত হয়।",
        },
        {
          question: "নুসুক কি (Key) কী?",
          answer:
            "একটি কি আপনাকে একটি প্রতিযোগিতা প্রশ্ন খুলতে দেয়। সঠিক উত্তর দিলে আপনি প্রতিদিনের ওমরাহ লটারিতে প্রবেশ করবেন। প্রতিদিন একটি ফ্রি কি পাওয়া যায়।",
        },
        {
          question: "কীভাবে বাড়তি কি সংগ্রহ করবেন?",
          answer:
            "অন্যদের NG- রেফারেল কোড ব্যবহার করে অতিরিক্ত কি পাওয়া যায়। আমাদের সাইট থেকে কোড কপি করে সহজেই বাড়তি কি সংগ্রহ করতে পারবেন।",
        },
      ];
    }
    if (locale === "ur") {
      return [
        {
          question: "نسک مفت عمرہ مقابلہ کیا ہے؟",
          answer:
            "یہ نسک آفیشل ایپ کے اندر ایک مفت مقابلہ ہے۔ 1 نومبر سے 20 دسمبر 2026 تک روزانہ 2 افراد کے لیے عمرہ پیکیج اور زمزم واٹر کی قرعہ اندازی ہوتی ہے۔",
        },
        {
          question: "نسک کی (Key) کیا ہے؟",
          answer:
            "چابی آپ کو مقابلے کا سوال کھولنے کی اجازت دیتی ہے۔ صحیح جواب دینے پر آپ روزانہ کے ڈرا میں شامل ہو جاتے ہیں۔ ہر صارف کو روزانہ ایک مفت چابی ملتی ہے۔",
        },
        {
          question: "اضافی چابیاں کیسے حاصل کی جائیں؟",
          answer:
            "ہر نسک اکاؤنٹ کا ایک ریفرل کوڈ ہوتا ہے جو NG- سے شروع ہوتا ہے۔ دوسروں کا کوڈ درج کرنے پر آپ دونوں کو اضافی چابی ملتی ہے۔ ہماری سائٹ سے تازہ کوڈز حاصل کریں۔",
        },
      ];
    }
    if (locale === "id") {
      return [
        {
          question: "Apa itu Kompetisi Umrah Gratis Nusuk?",
          answer:
            "Ini adalah kompetisi resmi di aplikasi Nusuk dari 1 November hingga 20 Desember 2026 dengan undian harian perjalanan Umrah untuk 2 orang.",
        },
        {
          question: "Apa itu Kunci Nusuk?",
          answer:
            "Kunci membuka satu pertanyaan kompetisi. Menjawab dengan benar memasukkan Anda ke undian harian. Setiap orang mendapat satu kunci gratis setiap hari.",
        },
        {
          question: "Bagaimana cara mendapatkan kunci ekstra?",
          answer:
            "Setiap akun Nusuk memiliki kode referral NG-. Memasukkan kode dari pengguna lain memberi Anda berdua kunci ekstra.",
        },
      ];
    }
    if (locale === "tr") {
      return [
        {
          question: "Ücretsiz Nusuk Umre Yarışması Nedir?",
          answer:
            "Nusuk resmi uygulamasında 1 Kasım - 20 Aralık 2026 tarihleri arasında her gün 2 kişilik Umre seyahati çekilişi yapılan ücretsiz bir yarışmadır.",
        },
        {
          question: "Nusuk Anahtarı Nedir?",
          answer:
            "Bir anahtar yarışma sorusunu açmanızı sağlar. Doğru cevap sizi günlük çekilişe dahil eder. Herkese her gün 1 ücretsiz anahtar verilir.",
        },
        {
          question: "Nasıl Ekstra Anahtar Alınır?",
          answer:
            "Her hesabın NG- ile başlayan bir referans kodu vardır. Başka birinin kodunu girerek her iki taraf da ek anahtar kazanır.",
        },
      ];
    }
    return [
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
  })();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <span>{locale === "ar" ? "دليل" : locale === "bn" ? "গাইড" : "Guide"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-4">
          {locale === "ar"
            ? "كيفية الحصول على مفاتيح إضافية في مسابقة نسك"
            : locale === "bn"
            ? "নুসুক ফ্রি ওমরাহ প্রতিযোগিতায় কীভাবে অতিরিক্ত চাবি পাবেন"
            : "How to get more keys in the Nusuk Free Umrah Competition"}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          {locale === "ar"
            ? "كل ما تحتاج معرفته عن مفاتيح نسك ورموز الإحالة، بكلمات واضحة وبسيطة. محدث لشهر نوفمبر 2026."
            : locale === "bn"
            ? "নুসুক কি এবং রেফারেল কোড সম্পর্কে বিস্তারিত তথ্য ও নির্দেশনা। নভেম্বর ২০২৬।"
            : "Everything you need to know about Nusuk keys and invite codes, in plain words. Updated November 2026."}
        </p>

        {/* What is the competition */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {locale === "ar" ? "ما هي مسابقة نسك للعمرة المجانية؟" : locale === "bn" ? "নুসুক ফ্রি ওমরাহ প্রতিযোগিতা কী?" : "What is the Nusuk Free Umrah Competition?"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "ar"
              ? "هي مسابقة مجانية تُعرف بـ «تحدي نسك للعمرة» في تطبيق نسك الرسمي، المنصة السعودية الرسمية للعمرة والحج. تمتد من 1 نوفمبر إلى 20 ديسمبر 2026. يجري السحب يومياً على رحلة عمرة شاملة لفائز ومرافق من اختياره (إجمالي 100 رحلة)، بالإضافة إلى كراتين ماء زمزم اليومية. المشاركة متاحة لمن هم بعمر 18 فأكثر من كافة الجنسيات."
              : locale === "bn"
              ? "নুসুক অ্যাপের অফিশিয়াল চ্যালেঞ্জে অংশ নিয়ে ফ্রি ওমরাহ ট্রিপ জেতার সুবর্ণ সুযোগ। ১ নভেম্বর থেকে ২০ ডিসেম্বর ২০২৬ পর্যন্ত প্রতিদিন ড্র অনুষ্ঠিত হয়।"
              : "It is a free competition, also called the Nusuk Umrah Challenge, inside the official Nusuk app, the Saudi platform for Umrah and Hajj. It runs from 1 November to 20 December 2026. One winner is drawn every day for a free Umrah trip with a companion of their choice (50 winners, so 100 Umrah trips in total), and there are daily Zamzam water prizes too. It is open to everyone aged 18 and over, of all nationalities, unless the law in their country prohibits it, and each person can win only once. Always check the exact rules inside the Nusuk app."}
          </p>
        </div>

        {/* What is a Nusuk key */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {locale === "ar" ? "ما هو مفتاح نسك؟" : locale === "bn" ? "নুসুক কি কী?" : "What is a Nusuk key?"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {locale === "ar"
              ? "يتيح لك المفتاح فتح سؤال في التحدي. الإجابة الصحيحة تدخلك مباشرة في سحب ذلك اليوم. يحصل كل متسابق على مفتاح مجاني واحد يومياً تنتهي صلاحيته في نهاية اليوم، لذا تأكد من استخدامه يومياً."
              : locale === "bn"
              ? "একটি কি আপনাকে একটি প্রশ্ন আনলক করতে সাহায্য করে। প্রতিদিন একটি ফ্রি কি পাওয়া যায়, এবং অতিরিক্ত কি এর জন্য রেফারেল কোড ব্যবহার করা যায়।"
              : "A key lets you open one question. Answer it correctly and you are entered into that day's draw. Everyone gets one free key a day, and it expires at the end of the day, so use it daily."}
          </p>
        </div>

        {/* How to get extra keys */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {locale === "ar" ? "كيفية جمع المفاتيح الإضافية" : locale === "bn" ? "কীভাবে বাড়তি কি সংগ্রহ করবেন" : "How to get extra keys"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            {locale === "ar"
              ? "يمتلك كل حساب في نسك رمز دعوة خاص يبدأ بـ NG-. عند لصق رمز شخص آخر، يحصل كل منكما على مفتاح مجاني. ونظراً لأن كل ثنائي يمكنه التبادل مرة واحدة فقط، فأنت بحاجة إلى رموز متعددة يومياً لجمع أكبر عدد من المفاتيح. وهنا يأتي دور «مفاتيح نسك»: انسخ رموزاً مجانية شاركها الآخرون، وشارك رمزك ليستخدمه غيرك."
              : locale === "bn"
              ? "প্রত্যেক অ্যাকাউন্টে NG- দিয়ে শুরু হওয়া রেফারেল কোড থাকে। আমাদের সাইটে শেয়ার করা কোডগুলো দিয়ে সহজে একাধিক চাবি আনলক করতে পারেন।"
              : "Every Nusuk account has an invite code that starts with NG-. When you paste someone's code, you both get an extra key. Each pair can swap only once, so you need many different codes to collect more keys. That is exactly what NusukKey is for: copy free codes shared by other people, and share yours so they use it too."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
            <Link
              href={p("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              {locale === "ar" ? "نسخ رموز نسك الآن" : locale === "bn" ? "এখনই নুসুক কোড কপি করুন" : "Copy Nusuk codes now"}
            </Link>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-sm px-6 py-3 rounded-xl border border-emerald-200 transition-colors"
            >
              {t.nav.shareCode}
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
            {locale === "ar" ? "الأسئلة الشائعة" : locale === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1.5 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t.common.disclaimer}</span>
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

export function KeysGuideView({ locale }: { locale: Locale }) {
  return (
    <LanguageProvider initialLocale={locale}>
      <KeysGuideContent />
    </LanguageProvider>
  );
}
