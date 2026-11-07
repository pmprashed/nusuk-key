"use client";

import { CheckCircle2, Smartphone, ShieldCheck, Zap, HelpCircle, Gift, Sparkles, Award } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

interface OpenInNusukGuideCardProps {
  locale?: Locale;
}

export function OpenInNusukGuideCard({ locale: propLocale }: OpenInNusukGuideCardProps) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  const points = locale === "ar"
    ? [
        "اضغط على «فتح في نسك» للانتقال مباشرة إلى تطبيق نسك الرسمي.",
        "على أجهزة أندرويد و iOS المثبت عليها التطبيق، ستفتح شاشة المسابقة تلقائياً.",
        "تمت تعبئة الرمز تلقائياً في خانة إدخال الكود دون الحاجة للكتابة اليدوية.",
        "اضغط فقط على «تحقق من الرمز» لاستلام مفتاحك الإضافي فوراً.",
        "إذا لم يفتح الرابط التطبيق مباشرة، اضغط على «نسخ» والصق الرمز يدوياً.",
      ]
    : locale === "bn"
    ? [
        "সরাসরি নুসুক অ্যাপে যেতে 'Open in Nusuk' বাটনে চাপ দিন।",
        "অ্যান্ড্রয়েড এবং আইওএস ডিভাইসে নুসুক ইনস্টল থাকলে সরাসরি প্রতিযোগিতার স্ক্রিন ওপেন হবে।",
        "কোড বক্সে আপনার কি কোডটি স্বয়ংক্রিয়ভাবে বসে যাবে, টাইপ করার ঝামেলা নেই।",
        "তাত্ক্ষণিকভাবে আপনার বোনাস কি সংগ্রহ করতে শুধু 'Check the code' এ চাপুন।",
        "যদি লিংকটি অ্যাপ সরাসরি না খোলে, তবে 'Copy' চেপে অ্যাপে ম্যানুয়ালি পেস্ট করুন।",
      ]
    : [
        "Tap 'Open in Nusuk' to jump straight into the official Nusuk app.",
        "On Android & iOS with Nusuk installed, the app opens directly to the competition screen.",
        "Your referral code is pre-filled in the code box automatically.",
        "Just tap 'Check the code' to collect your bonus key immediately.",
        "If the link doesn't open the app, tap 'Copy' instead and paste manually inside Nusuk.",
      ];

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
      {/* 1. Header with Icon & Active Tag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm sm:text-base font-black text-gray-900 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span>
              {locale === "ar"
                ? "كيفية استخدام ميزة «فتح في نسك»"
                : locale === "bn"
                ? "কীভাবে 'Open in Nusuk' ব্যবহার করবেন"
                : "How to use Open in Nusuk"}
            </span>
          </h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Zap className="w-3 h-3 text-emerald-600" />
            <span>1-Click</span>
          </span>
        </div>

        {/* 5 Clean Checklist Points */}
        <div className="space-y-2">
          {points.map((pt, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Visual Value Banner: Perfect layout fill that eliminates bottom empty space */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-emerald-950 flex items-center gap-1">
              <span>Earn +1 Key Both Ways</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <div className="text-[11px] text-emerald-800 font-medium">
              Every code entered gives you and the owner 1 ticket for the 100 free Umrah raffle.
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-[10px] font-bold text-emerald-900 shadow-2xs shrink-0">
          <Award className="w-3 h-3 text-amber-500" />
          <span>Fair Share</span>
        </div>
      </div>

      {/* 3. Interactive Bottom Banner: Platform support + Quick FAQ helper */}
      <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-gray-500 font-medium">
        <div className="flex items-center gap-1.5 text-gray-600">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            {locale === "ar"
              ? "مدعوم على أندرويد و iOS و iPadOS"
              : locale === "bn"
              ? "অ্যান্ড্রয়েড, আইওএস ও আইপ্যাডে সমর্থিত"
              : "Works on Android, iOS & iPadOS"}
          </span>
        </div>

        <Link
          href={p("/faq")}
          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>
            {locale === "ar"
              ? "هل تحتاج مساعدة؟ راجع الأسئلة ←"
              : locale === "bn"
              ? "সমস্যা হচ্ছে? FAQ দেখুন →"
              : "Need help? View FAQ →"}
          </span>
        </Link>
      </div>
    </div>
  );
}
