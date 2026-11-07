"use client";

import { CheckCircle2, Smartphone } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

interface OpenInNusukGuideCardProps {
  locale?: Locale;
}

export function OpenInNusukGuideCard({ locale: propLocale }: OpenInNusukGuideCardProps) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;

  const points = locale === "ar"
    ? [
        "اضغط على «فتح في نسك» للانتقال مباشرة إلى تطبيق نسك الرسمي.",
        "على أجهزة أندرويد و iOS المثبت عليها التطبيق، ستفتح شاشة المسابقة تلقائياً.",
        "تمت تعبئة الرمز تلقائياً في خانة إدخال الكود.",
        "اضغط فقط على «تحقق من الرمز» لاستلام مفتاحك الإضافي فوراً.",
        "إذا لم يفتح الرابط التطبيق مباشرة، اضغط على «نسخ» والصق الرمز يدوياً داخل تطبيق نسك.",
      ]
    : locale === "bn"
    ? [
        "সরাসরি নুসুক অ্যাপে যেতে 'Open in Nusuk' বাটনে চাপ দিন।",
        "অ্যান্ড্রয়েড এবং আইওএস ডিভাইসে নুসুক অ্যাপ ইনস্টল থাকলে সরাসরি প্রতিযোগিতার স্ক্রিন ওপেন হবে।",
        "কোড বক্সে আপনার কি কোডটি স্বয়ংক্রিয়ভাবে বসে যাবে।",
        "তাত্ক্ষণিকভাবে আপনার বোনাস কি সংগ্রহ করতে শুধু 'Check the code' এ চাপুন।",
        "যদি লিংকটি অ্যাপ সরাসরি না খোলে, তবে 'Copy' চেপে কোডটি কপি করে নুসুক অ্যাপে ম্যানুয়ালি পেস্ট করুন।",
      ]
    : [
        "Tap 'Open in Nusuk' to jump straight into the Nusuk app.",
        "On Android & iOS with Nusuk installed, the app will open directly to the competition screen.",
        "Your key is already pre-filled in the code box.",
        "Just tap 'Check the code' to collect your key instantly.",
        "If the link doesn't open the app, tap 'Copy' instead and paste manually inside the Nusuk app.",
      ];

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 p-5 sm:p-6 shadow-sm">
      <h3 className="text-sm sm:text-base font-black text-gray-900 mb-3.5 flex items-center gap-2">
        <Smartphone className="w-4 h-4 text-emerald-700" />
        <span>
          {locale === "ar"
            ? "كيفية استخدام ميزة «فتح في نسك»"
            : locale === "bn"
            ? "কীভাবে 'Open in Nusuk' ব্যবহার করবেন"
            : "How to use Open in Nusuk"}
        </span>
      </h3>

      <div className="space-y-2.5">
        {points.map((pt, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{pt}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
        {locale === "ar"
          ? "يعمل على أندرويد و iOS و iPadOS. تأكد من تحديث تطبيق نسك إلى أحدث إصدار."
          : locale === "bn"
          ? "অ্যান্ড্রয়েড, আইওএস এবং আইপ্যাড ওএসে কাজ করে। নিশ্চিত করুন আপনার নুসুক অ্যাপটি আপডেট করা।"
          : "Works on Android, iOS and iPadOS. Make sure your Nusuk app is updated."}
      </div>
    </div>
  );
}
