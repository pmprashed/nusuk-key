"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
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
  locale?: Locale;
  onOpenShareModal?: () => void;
}

export function Header({ locale: propLocale, onOpenShareModal }: HeaderProps) {
  const { locale: contextLocale, setLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;
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

  const isHomeActive = pathname === "/" || pathname === "/ar" || pathname === "";
  const isCodesActive = pathname.includes("/codes");
  const isGuideActive = pathname.includes("/guide");
  const isBlogActive = pathname.includes("/blog");

  // Get current active language info
  const currentLang = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];

  const handleSelectLanguage = (newCode: Locale) => {
    setLocale(newCode);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href={homeHref}
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-gray-900 hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-xs">
            <KeyIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-gray-900 tracking-tight">{t.common.brand}</span>
        </Link>

        {/* Desktop Navigation Tabs (Modern Pill-Shape) */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium bg-gray-50/80 p-1.5 rounded-full border border-gray-200/60 shadow-inner">
          <Link
            href={homeHref}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isHomeActive
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-gray-700 hover:text-emerald-900 hover:bg-emerald-50/60"
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href={codesHref}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isCodesActive
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-gray-700 hover:text-emerald-900 hover:bg-emerald-50/60"
            }`}
          >
            {t.nav.codes}
          </Link>
          <Link
            href={guideHref}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isGuideActive
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-gray-700 hover:text-emerald-900 hover:bg-emerald-50/60"
            }`}
          >
            {t.nav.guide}
          </Link>
          <Link
            href={blogHref}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isBlogActive
                ? "bg-[#062413] text-white shadow-xs"
                : "text-gray-700 hover:text-emerald-950 hover:bg-emerald-50/60"
            }`}
          >
            {(t.nav as any).blog || (locale === "ar" ? "المدونة" : "Blog")}
          </Link>
          <a
            href="#faq"
            className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-950 hover:bg-emerald-50/60 transition-all"
          >
            {locale === "ar" ? "الأسئلة الشائعة" : locale === "bn" ? "জিজ্ঞাসা" : "FAQ"}
          </a>
        </nav>

        {/* Right Section: Language Dropdown & Submit Key Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* International 21-Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-gray-800 text-xs font-bold transition-all focus:outline-hidden shadow-2xs cursor-pointer"
              aria-label="Select website language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentLang.flag} {currentLang.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 max-h-84 overflow-y-auto rounded-2xl bg-white p-2 shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                  Preferred Language (21 Languages)
                </div>
                {SUPPORTED_LOCALES.map((l) => {
                  const isCurrent = locale === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => handleSelectLanguage(l.code as Locale)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                        isCurrent
                          ? "bg-emerald-50 text-emerald-950 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-emerald-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 uppercase">{l.name}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit Nusuk Key Action Pill Button */}
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-2 bg-[#062413] hover:bg-[#0a381e] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-emerald-500/30"
          >
            <span className="text-emerald-400 text-base font-bold leading-none">+</span>
            <span>{locale === "ar" ? "إضافة مفتاح نسك" : locale === "bn" ? "নুসুক কি যোগ করুন" : "Submit Nusuk Key"}</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Quick Globe button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 text-gray-700 border border-gray-200 rounded-lg text-xs flex items-center gap-1"
          >
            <span>{currentLang.flag}</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1 bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold"
          >
            <Send className="w-3 h-3 -rotate-45" />
            <span>{t.nav.shareCode}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="grid grid-cols-4 gap-1 p-1 bg-gray-50 rounded-xl">
            <Link
              href={homeHref}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                isHomeActive ? "bg-emerald-800 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              href={codesHref}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                isCodesActive ? "bg-emerald-800 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.nav.codes}
            </Link>
            <Link
              href={guideHref}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                isGuideActive ? "bg-emerald-800 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.nav.guide}
            </Link>
            <Link
              href={blogHref}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-center py-2 text-xs font-bold rounded-lg transition-colors ${
                isBlogActive ? "bg-emerald-800 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {(t.nav as any).blog || (locale === "ar" ? "المدونة" : "Blog")}
            </Link>
          </div>

          {/* Mobile 21-Language Grid */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Select Language (21 Available)
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {SUPPORTED_LOCALES.map((l) => {
                const isCurrent = locale === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => handleSelectLanguage(l.code as Locale)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      isCurrent
                        ? "bg-emerald-100 text-emerald-950 font-bold border border-emerald-300"
                        : "text-gray-700 hover:bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{l.flag}</span>
                      <span className="truncate">{l.nativeName}</span>
                    </span>
                    {isCurrent && <Check className="w-3 h-3 text-emerald-700 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
