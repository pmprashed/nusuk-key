"use client";

import { useEffect, useState, useRef } from "react";
import { Copy, ExternalLink, Sparkles, Check, RefreshCw, Flag, Share2 } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem, ReportType } from "@/lib/types";
import { copyToClipboard, getNusukDeepLink } from "@/lib/clipboard";
import { saveCopiedCode, getAllExcludedIds, isCodeExcluded } from "@/lib/storage";
import { INITIAL_FALLBACK_CODES } from "@/lib/initial-codes";
import { getCountryDetails } from "@/lib/countries";
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

    if (minutes < 1) return locale === "ar" ? "الآن" : locale === "bn" ? "মাত্র এখন" : "just now";
    if (minutes < 60) return `${minutes}${locale === "ar" ? " د" : locale === "bn" ? " মি" : "m ago"}`;
    if (hours < 24) return `${hours}${locale === "ar" ? " س" : locale === "bn" ? " ঘণ্টা" : "h ago"}`;
    return locale === "ar" ? "اليوم" : locale === "bn" ? "আজ" : "today";
  } catch {
    return "just now";
  }
}

export function NextCodeCard({
  locale: propLocale,
  initialCode,
  onCodeCopied,
}: NextCodeCardProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const FIRST_VISIT_CODE = "NG-CXEVbXwR";

  const defaultInitialCode: CodeItem = initialCode || {
    id: "first-visit-cxevbxwr",
    code: FIRST_VISIT_CODE,
    display_name: null,
    country: "GLOBAL",
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [reporting, setReporting] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
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
      if (additionalExcludeId && !excluded.includes(additionalExcludeId)) excluded.push(additionalExcludeId);
      if (additionalExcludeCode && !excluded.includes(additionalExcludeCode)) excluded.push(additionalExcludeCode);
      if (code && !excluded.includes(code.id)) excluded.push(code.id);
      if (code && !excluded.includes(code.code)) excluded.push(code.code);

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

      // Fallback 1: Query API unconstrained
      const resUnconstrained = await fetch("/api/codes/next", { cache: "no-store" });
      if (resUnconstrained.ok) {
        const data = await resUnconstrained.json();
        if (data.code && data.code.code !== code?.code) {
          setCode(data.code);
          return;
        }
      }

      // Fallback 2: Local memory bundle
      const fallbackUnused = INITIAL_FALLBACK_CODES.find(
        (c) => c.code !== code?.code && !isCodeExcluded(c.id, c.code)
      );
      if (fallbackUnused) {
        setCode(fallbackUnused);
        return;
      }

      const randomIdx = Math.floor(Math.random() * INITIAL_FALLBACK_CODES.length);
      if (INITIAL_FALLBACK_CODES[randomIdx]) {
        setCode(INITIAL_FALLBACK_CODES[randomIdx]);
      }
    } catch (err) {
      console.error("fetchNext error:", err);
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

      saveCopiedCode(currentCode.id, currentCode.code);

      fetch(`/api/codes/${currentCode.id}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      if (onCodeCopied) onCodeCopied(currentCode);

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

    if (onCodeCopied) onCodeCopied(currentCode);

    fetchNext(currentCode.id, currentCode.code);
    window.open(deepLink, "_blank");
  };

  const handleSwapCode = () => {
    fetchNext(code.id, code.code);
  };

  const handleReport = async (type: ReportType) => {
    if (!code) return;
    setReporting(true);
    try {
      await fetch(`/api/codes/${code.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      showToast("Thank you for reporting. Here is a fresh replacement key.", "info");
      setShowReportModal(false);
      fetchNext(code.id, code.code);
    } catch {
      showToast("Report submitted.", "info");
      setShowReportModal(false);
      fetchNext(code.id, code.code);
    } finally {
      setReporting(false);
    }
  };

  const countryInfo = getCountryDetails(code.country);
  const timeAgoStr = formatTimeAgo(code.created_at, locale);
  const deepLink = getNusukDeepLink(code.code);

  // Format code cleanly on 1 single line (e.g., NG - 2MqwkXns)
  const formattedCodeDisplay = code.code.startsWith("NG-")
    ? `NG - ${code.code.slice(3)}`
    : code.code;

  const shareText = encodeURIComponent(
    `Get +1 Free Key for the Nusuk Umrah Competition using my code: ${code.code} ! Claim here: https://nusuk-keys.vercel.app`
  );
  const siteShareUrl = encodeURIComponent("https://nusuk-keys.vercel.app");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#09351a] to-[#0f4422] border-2 border-emerald-600/40 text-white p-5 sm:p-7 shadow-2xl transition-all duration-300">
      {/* Decorative Subtle Geometric Mosque Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="card-geom-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#fff" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="8" fill="none" stroke="#fff" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#card-geom-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Header Row: Badge on Left, Swap Code & Report on Right */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs font-bold text-emerald-200 shadow-xs">
            <span className="text-amber-300">💳</span>
            <span>{t.nextCode.badge || "Next code for you"}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwapCode}
              disabled={rotating}
              title="Get another fresh key"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-emerald-100 text-xs font-semibold backdrop-blur-sm transition-all border border-white/15 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-300 ${rotating ? "animate-spin" : ""}`} />
              <span>{locale === "ar" ? "تبديل الكود" : locale === "bn" ? "কোড পরিবর্তন" : "Swap Code"}</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              title="Report if invalid"
              className="p-1.5 rounded-full bg-white/10 hover:bg-red-500/30 text-emerald-200 hover:text-red-200 transition-colors border border-white/15 cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sleek, Single-Line Monospace Code Container */}
        <div className="my-2.5 py-1">
          <div
            className={`w-full py-2.5 sm:py-3.5 px-3.5 sm:px-6 rounded-2xl bg-black/30 border border-emerald-400/40 backdrop-blur-md flex items-center justify-between gap-3 shadow-inner transition-all duration-300 ${
              rotating ? "opacity-25 scale-95 blur-xs" : "opacity-100 scale-100 blur-none"
            }`}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <span className="text-amber-300 text-lg sm:text-xl drop-shadow-sm">🔑</span>
              <span className="font-mono font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wide select-all whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md">
                {formattedCodeDisplay}
              </span>
            </div>

            <div className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-[10px] sm:text-xs font-mono font-bold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Status / Nationality Row: Just now badge | Country flag badge | Ready to use */}
        <div className="flex items-center gap-2 flex-wrap mb-6 text-xs font-medium">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200">
            <span>🕒</span>
            <span>{timeAgoStr}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 font-bold">
            <span className="text-sm">{countryInfo.flag}</span>
            <span>{countryInfo.code === "GLOBAL" ? "Global" : countryInfo.code}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-emerald-200/90 ml-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{locale === "ar" ? "جاهز للاستخدام" : locale === "bn" ? "ব্যবহারের জন্য প্রস্তুত" : "Ready to use"}</span>
          </div>
        </div>

        {/* Action Buttons: Big White 'Open in Nusuk' pill + Dark 'Copy' button */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-5">
          {deepLink ? (
            <button
              onClick={handleOpenNusuk}
              className="sm:col-span-8 inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 active:bg-emerald-100 text-[#062413] px-6 py-3.5 rounded-full font-black text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <ExternalLink className="w-5 h-5 text-emerald-800" />
              <span>{t.nextCode.openBtn || "Open in Nusuk"}</span>
            </button>
          ) : null}

          <button
            onClick={handleCopy}
            className={`${
              deepLink ? "sm:col-span-4" : "sm:col-span-12"
            } inline-flex items-center justify-center gap-2 bg-emerald-950/90 hover:bg-emerald-900 active:bg-emerald-950 text-white px-5 py-3.5 rounded-full font-bold text-base border border-emerald-400/40 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 font-black">{t.common.copied || "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-emerald-300" />
                <span>{t.nextCode.copyBtn || "Copy"}</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Social Share Bar */}
        <div className="pt-3 border-t border-emerald-600/30 flex items-center justify-between gap-2 flex-wrap text-xs text-emerald-200/80">
          <div className="flex items-center gap-1.5 font-medium">
            <Share2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>{locale === "ar" ? "شارك هذا الكود:" : locale === "bn" ? "কোডটি শেয়ার করুন:" : "Share this code:"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${siteShareUrl}&quote=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-blue-200 font-semibold border border-[#1877F2]/40 transition-colors"
            >
              <span>Facebook</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/40 text-emerald-200 font-semibold border border-[#25D366]/40 transition-colors"
            >
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${siteShareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#24A1DE]/20 hover:bg-[#24A1DE]/40 text-sky-200 font-semibold border border-[#24A1DE]/40 transition-colors"
            >
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-gray-900 shadow-2xl border border-gray-100">
            <h3 className="text-base font-black text-gray-900 mb-2 flex items-center gap-2">
              <Flag className="w-4 h-4 text-amber-600" />
              <span>Report Code {code.code}</span>
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              If this code has reached its maximum daily uses or is not working inside the Nusuk app, let us know so we can replace it for everyone.
            </p>

            <div className="space-y-2 mb-4">
              <button
                onClick={() => handleReport("already_used")}
                disabled={reporting}
                className="w-full text-left px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 text-xs font-semibold text-gray-800 transition-colors"
              >
                ⚠️ Already used / max limit reached
              </button>
              <button
                onClick={() => handleReport("not_correct")}
                disabled={reporting}
                className="w-full text-left px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 text-xs font-semibold text-gray-800 transition-colors"
              >
                ❌ Invalid / incorrect code
              </button>
            </div>

            <button
              onClick={() => setShowReportModal(false)}
              className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
