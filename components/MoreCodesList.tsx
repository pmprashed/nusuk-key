"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink, RefreshCw, Check } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { CodeItem } from "@/lib/types";
import { copyToClipboard, getNusukDeepLink } from "@/lib/clipboard";
import { saveCopiedCode, getReportedIds, getCopiedCodes } from "@/lib/storage";
import { showToast } from "./Toast";

interface MoreCodesListProps {
  locale: Locale;
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

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  } catch {
    return locale === "ar" ? "قريباً" : "recently";
  }
}

export function MoreCodesList({ locale, onCodeCopiedGlobal }: MoreCodesListProps) {
  const t = getDictionary(locale);
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchBatch([]);
  }, []);

  async function fetchBatch(currentExclude: string[] = []) {
    try {
      setRefreshing(true);
      const reportedIds = Array.from(getReportedIds());
      const copiedList = getCopiedCodes().map((c) => c.id);
      const allExclude = Array.from(new Set([...currentExclude, ...reportedIds, ...copiedList]));

      const query = new URLSearchParams({
        limit: "20",
        ...(allExclude.length > 0 ? { exclude: allExclude.join(",") } : {}),
      });

      const res = await fetch(`/api/codes?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCodes(data.codes || []);
      }
    } catch (err) {
      console.error("Error fetching more codes:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Swap a single row in place when copied
  async function swapRow(index: number, oldCode: CodeItem) {
    try {
      const currentIds = codes.map((c) => c.id);
      const reportedIds = Array.from(getReportedIds());
      const copiedList = getCopiedCodes().map((c) => c.id);
      const exclude = Array.from(new Set([...currentIds, ...reportedIds, ...copiedList, oldCode.id]));

      const query = new URLSearchParams({
        limit: "1",
        exclude: exclude.join(","),
      });

      const res = await fetch(`/api/codes?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.codes && data.codes.length > 0) {
          const freshCode = data.codes[0];
          setCodes((prev) => {
            const next = [...prev];
            next[index] = freshCode;
            return next;
          });
        }
      }
    } catch (err) {
      console.error("Failed to swap row with fresh code:", err);
    }
  }

  const handleCopy = async (item: CodeItem, index: number) => {
    const success = await copyToClipboard(item.code);
    if (success) {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
      showToast(t.common.copiedToast, "success");
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

      // Swap code in-place
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
    window.location.href = deepLink;
  };

  const handleShowMoreBatch = () => {
    const currentIds = codes.map((c) => c.id);
    fetchBatch(currentIds);
  };

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {t.moreCodes.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t.moreCodes.subtitle}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-white border border-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : codes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 bg-white">
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
                className="group flex items-center justify-between gap-3 bg-white border border-gray-200/80 hover:border-emerald-300 rounded-xl p-3 sm:p-3.5 shadow-xs transition-colors"
              >
                {/* Left side: Code & details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base sm:text-lg text-gray-900 tracking-wider select-all">
                      {item.code}
                    </span>
                    {item.display_name && (
                      <span className="text-[11px] font-medium text-gray-500 truncate max-w-[100px]">
                        · {item.display_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    {formatTimeAgo(item.created_at, locale)} · {item.use_count} uses
                  </p>
                </div>

                {/* Right side: Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {deepLink && (
                    <button
                      onClick={() => handleOpenNusuk(item, index)}
                      className="inline-flex items-center gap-1.5 bg-[#15803D] hover:bg-[#166534] text-white px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.common.open}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(item, index)}
                    title={t.common.copy}
                    aria-label={`Copy code ${item.code}`}
                    className={`inline-flex items-center justify-center p-2 rounded-lg border transition-colors ${
                      isJustCopied
                        ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                        : "bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {isJustCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
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
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50/60 active:bg-emerald-100 text-emerald-900 font-semibold text-sm transition-colors shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-700 ${refreshing ? "animate-spin" : ""}`} />
          <span>{t.common.showMoreCodes}</span>
        </button>
      </div>
    </section>
  );
}
