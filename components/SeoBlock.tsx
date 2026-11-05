import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";

export function SeoBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = (path: string) => (locale === "ar" ? `/ar${path}` : path);

  return (
    <section className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 mb-10 shadow-xs">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3">
        {t.seoText.title}
      </h2>

      <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
        <p>{t.seoText.p1}</p>
        <p>{t.seoText.p2}</p>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-emerald-700">
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
      </div>
    </section>
  );
}
