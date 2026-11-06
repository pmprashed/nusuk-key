"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Locale, getDictionary } from "@/lib/i18n";
import { SUPPORTED_LOCALES } from "@/lib/languages";

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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const homeHref = locale === "ar" ? "/ar" : "/";
  const codesHref = locale === "ar" ? "/ar/codes" : "/codes";
  const guideHref = locale === "ar" ? "/ar/guide" : "/guide";
  const blogHref = locale === "ar" ? "/ar/blog" : "/blog";

  const isHomeActive = pathname === homeHref || (locale === "en" && pathname === "");
  const isCodesActive = pathname === codesHref;
  const isGuideActive = pathname.includes("/guide");
  const isBlogActive = pathname.includes("/blog");

  // Get current active language info
  const currentLang = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all shadow-xs">
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
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
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

          {/* International 20+ Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-gray-700 text-xs font-semibold transition-all focus:outline-none"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentLang.flag} {currentLang.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-2xl bg-white p-2 shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                  Select Language
                </div>
                {SUPPORTED_LOCALES.map((l) => (
                  <Link
                    key={l.code}
                    href={l.code === "ar" ? "/ar" : "/"}
                    onClick={() => setLangDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      locale === l.code
                        ? "bg-emerald-50 text-emerald-900 font-bold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase">{l.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 active:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            <Send className="w-4 h-4 -rotate-45 mb-0.5" />
            <span>{t.nav.shareCode}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
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

          {/* Mobile Language Selector */}
          <div className="pt-3 border-t border-gray-100">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Select Language (20+ Languages)
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {SUPPORTED_LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={l.code === "ar" ? "/ar" : "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium ${
                    locale === l.code ? "bg-emerald-50 text-emerald-800 font-bold" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="truncate">{l.nativeName}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
