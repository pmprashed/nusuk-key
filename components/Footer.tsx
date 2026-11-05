import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = (path: string) => (locale === "ar" ? `/ar${path === "/" ? "" : path}` : path);

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
        </div>
      </div>
    </footer>
  );
}
