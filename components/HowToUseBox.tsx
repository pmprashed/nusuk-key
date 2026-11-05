import { Locale, getDictionary } from "@/lib/i18n";

export function HowToUseBox({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const steps = [
    t.howToUse.step1,
    t.howToUse.step2,
    t.howToUse.step3,
    t.howToUse.step4,
    t.howToUse.step5,
  ];

  return (
    <div className="rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] p-5 sm:p-6 mb-8 text-gray-800 shadow-xs">
      <h2 className="text-base sm:text-lg font-bold text-emerald-950 mb-4">
        {t.howToUse.title}
      </h2>

      <ol className="space-y-3.5">
        {steps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#15803D] text-white text-xs font-bold shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <span className="text-gray-700">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 pt-3 border-t border-emerald-200/50 text-[11px] sm:text-xs text-gray-500 italic">
        {t.howToUse.footnote}
      </p>
    </div>
  );
}
