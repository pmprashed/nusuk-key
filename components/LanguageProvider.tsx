"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, getDictionary, isRtl } from "@/lib/i18n";
import { SUPPORTED_LOCALES } from "@/lib/languages";

interface LanguageContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  t: ReturnType<typeof getDictionary>;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: getDictionary("en"),
  isRtl: false,
});

export function LanguageProvider({
  initialLocale = "en",
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Read saved preference or ?lang= query param on client mount
  useEffect(() => {
    try {
      const validCodes = SUPPORTED_LOCALES.map((l) => l.code as string);
      const params = new URLSearchParams(window.location.search);
      const queryLang = params.get("lang") as Locale | null;

      if (queryLang && validCodes.includes(queryLang)) {
        setLocaleState(queryLang);
        return;
      }

      // If user is not on an explicit /ar path and has a saved preference, apply it
      if (initialLocale === "en" && !window.location.pathname.startsWith("/ar")) {
        const saved = localStorage.getItem("nusuk_pref_lang") as Locale | null;
        if (saved && validCodes.includes(saved)) {
          setLocaleState(saved);
        }
      } else if (window.location.pathname.startsWith("/ar")) {
        setLocaleState("ar");
      }
    } catch {}
  }, [initialLocale]);

  // Synchronize document lang & dir attributes
  useEffect(() => {
    try {
      const rtl = isRtl(locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = rtl ? "rtl" : "ltr";
    } catch {}
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("nusuk_pref_lang", newLocale);
      const url = new URL(window.location.href);
      if (newLocale === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", newLocale);
      }
      window.history.replaceState({}, "", url.toString());
      // Trigger a custom event so non-context scripts or listeners also get notified
      window.dispatchEvent(new CustomEvent("nusuk:lang_changed", { detail: { locale: newLocale } }));
    } catch {}
  };

  const t = getDictionary(locale);
  const rtl = isRtl(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRtl: rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
