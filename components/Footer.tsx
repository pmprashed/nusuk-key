"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export function Footer({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;
  const p = (path: string) => {
    if (locale === "ar") {
      return `/ar${path === "/" ? "" : path}`;
    }
    return locale === "en" ? path : `${path === "/" ? "" : path}?lang=${locale}`;
  };

  return (
    <footer className="mt-20 border-t border-gray-200/80 bg-white/70 py-12 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-medium text-emerald-800">
          <Link href={p("/")} className="hover:underline">
            {t.footer.freeCodes}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/nusuk-competition")} className="hover:underline">
            {t.footer.competition2026}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/guide")} className="hover:underline">
            {t.footer.howToGetKeys}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/nusuk-key-not-working")} className="hover:underline">
            {t.footer.keyNotWorking}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/find-nusuk-invite-code")} className="hover:underline">
            {t.footer.findCode}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/blog")} className="hover:underline text-emerald-900 font-bold">
            {(t.nav as any).blog || (locale === "ar" ? "المدونة" : "Blog")}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/privacy")} className="hover:underline">
            {t.footer.privacy}
          </Link>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <Link href={p("/contact")} className="hover:underline">
            {t.footer.contact}
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs leading-relaxed text-gray-500 max-w-3xl mx-auto space-y-2">
          <p className="text-gray-500">
            {t.common.disclaimer}
          </p>
          <p className="text-gray-400">
            {t.footer.credits}
          </p>
          <p className="text-gray-400 text-[11px]">
            {t.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
