"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink, RefreshCw, Check } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem } from "@/lib/types";
import { copyToClipboard, getNusukDeepLink } from "@/lib/clipboard";
import { saveCopiedCode, getAllExcludedIds, isCodeExcluded } from "@/lib/storage";
import { INITIAL_FALLBACK_CODES } from "@/lib/initial-codes";
import { showToast } from "./Toast";

interface MoreCodesListProps {
  locale?: Locale;
  onCodeCopiedGlobal?: (code: CodeItem) => void;
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

export function MoreCodesList({ locale: propLocale, onCodeCopiedGlobal }: MoreCodesListProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchBatch([]);
  }, []);

  // Listen for global code copy events so this list immediately purges copied codes
  useEffect(() => {
    const handleGlobalCopy = (e: any) => {
      const detail = e.detail;
      if (detail) {
        setCodes((prev) => prev.filter((c) => c.id !== detail.id && c.code !== detail.code));
      }
    };
    window.addEventListener("nusuk:code_copied", handleGlobalCopy);
    return () => window.removeEventListener("nusuk:code_copied", handleGlobalCopy);
  }, []);

  async function fetchBatch(currentExclude: string[] = []) {
    try {
      setRefreshing(true);
      const allExcluded = Array.from(new Set([...currentExclude, ...getAllExcludedIds()]));

      const query = new URLSearchParams({
        limit: "20",
        ...(allExcluded.length > 0 ? { exclude: allExcluded.slice(0, 100).join(",") } : {}),
      });

      const res = await fetch(`/api/codes?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        const incoming: CodeItem[] = data.codes || [];
        const clean = incoming.filter((c) => !isCodeExcluded(c.id, c.code));
        if (clean.length > 0) {
          setCodes(clean);
          return;
        }
      }

      // Fallback to initial fallback codes if needed
      const fallbackClean = INITIAL_FALLBACK_CODES.filter((c) => !isCodeExcluded(c.id, c.code)).slice(0, 20);
      setCodes(fallbackClean.length > 0 ? fallbackClean : INITIAL_FALLBACK_CODES.slice(0, 20));
    } catch (err) {
      console.error("Error fetching more codes:", err);
      setCodes(INITIAL_FALLBACK_CODES.slice(0, 20));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Swap a single row in place when copied with a fresh un-seen code
  async function swapRow(index: number, oldCode: CodeItem) {
    try {
      const currentIds = codes.map((c) => c.id);
      const exclude = Array.from(new Set([...currentIds, ...getAllExcludedIds(), oldCode.id, oldCode.code]));

      const query = new URLSearchParams({
        limit: "1",
        exclude: exclude.slice(0, 80).join(","),
      });

      const res = await fetch(`/api/codes?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.codes && data.codes.length > 0) {
          const freshCode = data.codes[0];
          if (!isCodeExcluded(freshCode.id, freshCode.code)) {
            setCodes((prev) => {
              const next = [...prev];
              next[index] = freshCode;
              return next;
            });
            return;
          }
        }
      }

      // Memory fallback swap
      const memoryFresh = INITIAL_FALLBACK_CODES.find(
        (c) => !exclude.includes(c.id) && !exclude.includes(c.code) && !isCodeExcluded(c.id, c.code)
      );
      if (memoryFresh) {
        setCodes((prev) => {
          const next = [...prev];
          next[index] = memoryFresh;
          return next;
        });
        return;
      }

      // If truly all excluded, remove row
      setCodes((prev) => prev.filter((c) => c.id !== oldCode.id));
    } catch (err) {
      console.error("Failed to swap row with fresh code:", err);
      setCodes((prev) => prev.filter((c) => c.id !== oldCode.id));
    }
  }

  const handleCopy = async (item: CodeItem, index: number) => {
    const success = await copyToClipboard(item.code);
    if (success) {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
      showToast(t.common.copiedToast || "Referral code copied to clipboard", "success");

      // Lifetime save
      saveCopiedCode(item.id, item.code);

      // Increment use count on backend
      fetch(`/api/codes/${item.id}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      if (onCodeCopiedGlobal) {
        onCodeCopiedGlobal(item);
      }

      // Immediately replace this row with a fresh code
      swapRow(index, item);
    }
  };

  const handleOpenNusuk = (item: CodeItem, index: number) => {
    const deepLink = getNusukDeepLink(item.code);
    if (!deepLink) return;

    saveCopiedCode(item.id, item.code);

    fetch(`/api/codes/${item.id}/copy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "open" }),
    }).catch(console.error);

    if (onCodeCopiedGlobal) {
      onCodeCopiedGlobal(item);
    }

    swapRow(index, item);
    window.open(deepLink, "_blank");
  };

  const handleShowMoreBatch = () => {
    const currentIds = codes.map((c) => c.id);
    fetchBatch(currentIds);
  };

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          {t.moreCodes.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
          {t.moreCodes.subtitle}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-white border border-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : codes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 bg-white">
          {t.moreCodes.empty}
        </div>
      ) : (
        <div className="space-y-2.5">
          {codes.map((item, index) => {
            const deepLink = getNusukDeepLink(item.code);
            const isJustCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="group flex items-center justify-between gap-3 bg-white border border-gray-200/90 hover:border-emerald-400/80 rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Left side: Code & details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base sm:text-lg text-gray-900 tracking-wider select-all">
                      {item.code}
                    </span>
                    {item.display_name && (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                        {item.display_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    {formatTimeAgo(item.created_at, locale)} · {item.use_count} {locale === "ar" ? "استخدام" : locale === "bn" ? "ব্যবহার" : "uses"}
                  </p>
                </div>

                {/* Right side: Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {deepLink && (
                    <button
                      onClick={() => handleOpenNusuk(item, index)}
                      className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.common.open}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(item, index)}
                    title={t.common.copy}
                    aria-label={`Copy code ${item.code}`}
                    className={`inline-flex items-center justify-center p-2 rounded-xl border transition-all ${
                      isJustCopied
                        ? "bg-emerald-100 border-emerald-400 text-emerald-800 shadow-xs"
                        : "bg-white border-gray-300 hover:bg-emerald-50/60 hover:border-emerald-300 text-gray-700 shadow-xs active:scale-95"
                    }`}
                  >
                    {isJustCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-emerald-800" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show 20 new codes button */}
      <div className="mt-5">
        <button
          onClick={handleShowMoreBatch}
          disabled={refreshing}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border-2 border-emerald-300 bg-white hover:bg-emerald-50/70 active:bg-emerald-100 text-emerald-950 font-bold text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-700 ${refreshing ? "animate-spin" : ""}`} />
          <span>{t.common.showMoreCodes}</span>
        </button>
      </div>
    </section>
  );
}
