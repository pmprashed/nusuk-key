"use client";

import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export function HowToUseBox({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const steps = [
    t.howToUse.step1,
    t.howToUse.step2,
    t.howToUse.step3,
    t.howToUse.step4,
    t.howToUse.step5,
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50/90 via-[#F0FDF4] to-emerald-50/40 border border-emerald-200/80 p-5 sm:p-7 mb-8 text-gray-800 shadow-sm">
      <h2 className="text-base sm:text-lg font-black text-emerald-950 mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
        <span>{t.howToUse.title}</span>
      </h2>

      <ol className="space-y-3.5">
        {steps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-800 text-white text-xs font-black shrink-0 mt-0.5 shadow-xs">
              {idx + 1}
            </span>
            <span className="text-gray-700 font-medium">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-5 pt-3.5 border-t border-emerald-200/60 text-xs text-emerald-800 font-medium italic">
        {t.howToUse.footnote}
      </p>
    </div>
  );
}
