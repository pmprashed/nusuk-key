"use client";

import { useEffect, useState, useRef } from "react";
import { Copy, ExternalLink, Sparkles, Check, RefreshCw } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem } from "@/lib/types";
import { copyToClipboard, getNusukDeepLink } from "@/lib/clipboard";
import { saveCopiedCode, getAllExcludedIds, isCodeExcluded } from "@/lib/storage";
import { INITIAL_FALLBACK_CODES } from "@/lib/initial-codes";
import { showToast } from "./Toast";

interface NextCodeCardProps {
  locale?: Locale;
  initialCode?: CodeItem | null;
  onCodeCopied?: (code: CodeItem) => void;
}

function formatTimeAgo(dateString: string, locale: Locale): string {
  try {
    const past = new Date(dateString).getTime();
    const diff = Math.max(0, Date.now() - past);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (locale === "ar") {
      if (minutes < 2) return "دقيقة واحدة";
      if (minutes < 60) return `${minutes} دقيقة`;
      if (hours === 1) return "ساعة واحدة";
      if (hours < 24) return `${hours} ساعة`;
      return `${days} يوم`;
    }

    if (locale === "bn") {
      if (minutes < 2) return "১ মিনিট";
      if (minutes < 60) return `${minutes} মিনিট`;
      if (hours === 1) return "১ ঘণ্টা";
      if (hours < 24) return `${hours} ঘণ্টা`;
      return `${days} দিন`;
    }

    if (locale === "ur") {
      if (minutes < 2) return "1 منٹ";
      if (minutes < 60) return `${minutes} منٹ`;
      if (hours === 1) return "1 گھنٹہ";
      if (hours < 24) return `${hours} گھنٹے`;
      return `${days} دن`;
    }

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  } catch {
    return locale === "ar" ? "قريباً" : locale === "bn" ? "সম্প্রতি" : "recently";
  }
}

export function NextCodeCard({
  locale: propLocale,
  initialCode,
  onCodeCopied,
}: NextCodeCardProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  // FIRST_VISIT_CODE — served once per device
  const FIRST_VISIT_CODE = "NG-CXEVbXwR";

  // Provide guaranteed initial code so card is never empty
  const defaultInitialCode: CodeItem = initialCode || {
    id: "first-visit-cxevbxwr",
    code: FIRST_VISIT_CODE,
    display_name: "Rashed",
    status: "active",
    use_count: 240,
    report_count: 0,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    last_served_at: null,
  };

  const [code, setCode] = useState<CodeItem>(() => {
    if (!isCodeExcluded(undefined, FIRST_VISIT_CODE)) {
      return defaultInitialCode;
    }
    if (initialCode && !isCodeExcluded(initialCode.id, initialCode.code)) {
      return initialCode;
    }
    const foundFallback = INITIAL_FALLBACK_CODES.find(
      (c) => !isCodeExcluded(c.id, c.code)
    );
    return foundFallback || INITIAL_FALLBACK_CODES[0] || defaultInitialCode;
  });

  const [copied, setCopied] = useState(false);
  const [rotating, setRotating] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    // If user hasn't seen FIRST_VISIT_CODE, keep it; otherwise fetch fresh
    if (!isCodeExcluded(undefined, FIRST_VISIT_CODE)) {
      setCode(defaultInitialCode);
      return;
    }

    if (initialCode && !isCodeExcluded(initialCode.id, initialCode.code)) {
      setCode(initialCode);
    } else {
      fetchNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  // Listen for codes copied anywhere else on page
  useEffect(() => {
    const handleGlobalCopy = (e: any) => {
      const detail = e.detail;
      if (detail && code && (code.id === detail.id || code.code === detail.code)) {
        fetchNext(detail.id, detail.code);
      }
    };
    window.addEventListener("nusuk:code_copied", handleGlobalCopy);
    return () => window.removeEventListener("nusuk:code_copied", handleGlobalCopy);
  }, [code]);

  async function fetchNext(additionalExcludeId?: string, additionalExcludeCode?: string) {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setRotating(true);

    try {
      const excluded = getAllExcludedIds();
      if (additionalExcludeId && !excluded.includes(additionalExcludeId)) {
        excluded.push(additionalExcludeId);
      }
      if (additionalExcludeCode && !excluded.includes(additionalExcludeCode)) {
        excluded.push(additionalExcludeCode);
      }
      if (code && !excluded.includes(code.id)) {
        excluded.push(code.id);
      }
      if (code && !excluded.includes(code.code)) {
        excluded.push(code.code);
      }

      // Query server for the next fair code
      const query = new URLSearchParams(
        excluded.length > 0 ? { exclude: excluded.slice(0, 80).join(",") } : {}
      );

      const res = await fetch(`/api/codes/next?${query.toString()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.code && data.code.code !== code?.code) {
          setCode(data.code);
          return;
        }
      }

      // Fallback 1: Query API without exclusion
      const resUnconstrained = await fetch("/api/codes/next", { cache: "no-store" });
      if (resUnconstrained.ok) {
        const data = await resUnconstrained.json();
        if (data.code && data.code.code !== code?.code) {
          setCode(data.code);
          return;
        }
      }

      // Fallback 2: Local un-excluded code from memory bundle
      const fallbackUnused = INITIAL_FALLBACK_CODES.find(
        (c) => c.code !== code?.code && !isCodeExcluded(c.id, c.code)
      );
      if (fallbackUnused) {
        setCode(fallbackUnused);
        return;
      }

      // Fallback 3: Random pick from bundle so card NEVER goes empty
      const randomIdx = Math.floor(Math.random() * INITIAL_FALLBACK_CODES.length);
      const randomPick = INITIAL_FALLBACK_CODES[randomIdx];
      if (randomPick) {
        setCode(randomPick);
      }
    } catch (err) {
      console.error("fetchNext error:", err);
      // Ensure card always shows a code
      const randomIdx = Math.floor(Math.random() * INITIAL_FALLBACK_CODES.length);
      if (INITIAL_FALLBACK_CODES[randomIdx]) {
        setCode(INITIAL_FALLBACK_CODES[randomIdx]);
      }
    } finally {
      setTimeout(() => {
        setRotating(false);
        isFetchingRef.current = false;
      }, 250);
    }
  }

  const handleCopy = async () => {
    if (!code) return;
    const currentCode = code;
    const success = await copyToClipboard(currentCode.code);
    if (success) {
      setCopied(true);
      showToast(t.common.copiedToast || "Referral code copied to clipboard", "success");

      // Save to lifetime storage and emit event
      saveCopiedCode(currentCode.id, currentCode.code);

      // Track in backend
      fetch(`/api/codes/${currentCode.id}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      if (onCodeCopied) {
        onCodeCopied(currentCode);
      }

      // Rotate immediately to the next fresh code without closing or empty state!
      setTimeout(() => {
        setCopied(false);
        fetchNext(currentCode.id, currentCode.code);
      }, 350);
    }
  };

  const handleOpenNusuk = () => {
    if (!code) return;
    const currentCode = code;
    const deepLink = getNusukDeepLink(currentCode.code);
    if (!deepLink) return;

    saveCopiedCode(currentCode.id, currentCode.code);

    fetch(`/api/codes/${currentCode.id}/copy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "open" }),
    }).catch(console.error);

    if (onCodeCopied) {
      onCodeCopied(currentCode);
    }

    // Instantly rotate to next code
    fetchNext(currentCode.id, currentCode.code);

    window.open(deepLink, "_blank");
  };

  const handleGetFreshCode = () => {
    fetchNext(code.id, code.code);
  };

  const deepLink = getNusukDeepLink(code.code);
  const timeAgoStr = formatTimeAgo(code.created_at, locale);

  // Multilingual button labels
  const getFreshCodeText =
    (t.nextCode as any)?.getFreshCode ||
    (locale === "ar"
      ? "رمز جديد"
      : locale === "bn"
      ? "নতুন কোড নিন"
      : locale === "ur"
      ? "نیا فریش کوڈ حاصل کریں"
      : locale === "id"
      ? "Dapatkan Kode Baru"
      : locale === "tr"
      ? "Yeni Kod Al"
      : "Get Fresh Code");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#0b381d] to-[#124d27] border border-emerald-500/30 text-white p-6 sm:p-8 shadow-xl mb-6 transition-all duration-300">
      {/* Decorative Subtle Geometric Mosque Arches & Rings */}
      <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="46" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="50,4 96,50 50,96 4,50" strokeWidth="1" />
          <polygon points="50,14 86,50 50,86 14,50" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Badge: Your Fresh Code */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-400/30 text-xs font-semibold text-emerald-200 mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
          <span>{t.nextCode.badge}</span>
        </div>

        {/* The Code Display Container */}
        <div className="w-full bg-black/25 border border-white/10 rounded-2xl p-4 sm:p-5 mb-3 backdrop-blur-sm shadow-inner flex flex-col sm:flex-row items-center justify-between gap-3">
          <div
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-widest font-mono text-white select-all transition-all duration-300 ${
              rotating ? "opacity-30 scale-95 blur-xs" : "opacity-100 scale-100 blur-none"
            }`}
          >
            {code.code}
          </div>

          <div className="text-xs sm:text-sm text-emerald-200/90 font-medium flex items-center gap-2 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{code.use_count} {locale === "ar" ? "استخدام" : locale === "bn" ? "বার ব্যবহৃত" : "uses"}</span>
          </div>
        </div>

        {/* Meta subtitle */}
        <p className="text-xs sm:text-sm text-emerald-200/80 mb-6 font-medium">
          {t.nextCode.sharedAgo.replace("{{time}}", timeAgoStr)} ·{" "}
          {t.nextCode.usedCount.replace("{{count}}", code.use_count.toString())}
        </p>

        {/* Buttons Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1. Get Fresh Code (Primary emerald button) */}
          <button
            onClick={handleGetFreshCode}
            disabled={rotating}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-emerald-400/30"
          >
            <RefreshCw className={`w-4 h-4 ${rotating ? "animate-spin" : ""}`} />
            <span>{getFreshCodeText}</span>
          </button>

          {/* 2. Copy Code (Crisp white card button) */}
          <button
            onClick={handleCopy}
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border-2 border-emerald-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-extrabold">{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-800" />
                <span>{t.nextCode.copyBtn}</span>
              </>
            )}
          </button>

          {/* 3. Open in Nusuk (Direct deep link action) */}
          {deepLink && (
            <button
              onClick={handleOpenNusuk}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-emerald-500/40"
            >
              <ExternalLink className="w-4 h-4 text-emerald-300" />
              <span>{t.nextCode.openBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
