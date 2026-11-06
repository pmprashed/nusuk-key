"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Menu, X } from "lucide-react";
import { useState } from "react";
import { Locale, getDictionary } from "@/lib/i18n";

export function KeyIcon({ className = "w-6 h-6 text-emerald-600" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3" />
    </svg>
  );
}

interface HeaderProps {
  locale: Locale;
  onOpenShareModal?: () => void;
}

export function Header({ locale, onOpenShareModal }: HeaderProps) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute equivalent URL for language switcher
  const getOppositeLocaleUrl = () => {
    if (locale === "ar") {
      // Current is Arabic, switch to English by stripping /ar
      const enPath = pathname.replace(/^\/ar(\/|$)/, "/");
      return enPath || "/";
    } else {
      // Current is English, switch to Arabic
      if (pathname === "/") return "/ar";
      return `/ar${pathname}`;
    }
  };

  const homeHref = locale === "ar" ? "/ar" : "/";
  const codesHref = locale === "ar" ? "/ar/codes" : "/codes";
  const guideHref = locale === "ar" ? "/ar/guide" : "/guide";
  const blogHref = locale === "ar" ? "/ar/blog" : "/blog";

  const isHomeActive = pathname === homeHref || (locale === "en" && pathname === "");
  const isCodesActive = pathname === codesHref;
  const isGuideActive = pathname.includes("/guide");
  const isBlogActive = pathname.includes("/blog");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href={homeHref}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <KeyIcon className="w-5 h-5 text-emerald-700" />
          </div>
          <span>{t.common.brand}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link
            href={homeHref}
            className={`transition-colors hover:text-emerald-800 ${
              isHomeActive ? "text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-1" : ""
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href={codesHref}
            className={`transition-colors hover:text-emerald-800 ${
              isCodesActive ? "text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-1" : ""
            }`}
          >
            {t.nav.codes}
          </Link>
          <Link
            href={guideHref}
            className={`transition-colors hover:text-emerald-800 ${
              isGuideActive ? "text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-1" : ""
            }`}
          >
            {t.nav.guide}
          </Link>
          <Link
            href={blogHref}
            className={`transition-colors hover:text-emerald-800 ${
              isBlogActive ? "text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-1" : ""
            }`}
          >
            {(t.nav as any).blog || (locale === "ar" ? "المدونة" : "Blog")}
          </Link>
          <Link
            href={getOppositeLocaleUrl()}
            className="text-gray-600 hover:text-emerald-800 transition-colors font-medium text-sm"
          >
            {t.nav.langSwitch}
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            <Send className="w-4 h-4 -rotate-45 mb-0.5" />
            <span>{t.nav.shareCode}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 bg-[#15803D] hover:bg-[#166534] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <Send className="w-3.5 h-3.5 -rotate-45" />
            <span>{t.nav.shareCode}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-4 space-y-2 shadow-lg">
          <Link
            href={homeHref}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-emerald-800"
          >
            {t.nav.home}
          </Link>
          <Link
            href={codesHref}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-emerald-800"
          >
            {t.nav.codes}
          </Link>
          <Link
            href={guideHref}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-emerald-800"
          >
            {t.nav.guide}
          </Link>
          <Link
            href={blogHref}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-emerald-800"
          >
            {(t.nav as any).blog || (locale === "ar" ? "المدونة" : "Blog")}
          </Link>
          <Link
            href={getOppositeLocaleUrl()}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-emerald-700"
          >
            {t.nav.langSwitch}
          </Link>
        </div>
      )}
    </header>
  );
}
