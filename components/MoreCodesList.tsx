"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, RefreshCw, Check, Sparkles, ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem } from "@/lib/types";
import { copyToClipboard } from "@/lib/clipboard";
import { saveCopiedCode, getAllExcludedIds, isCodeExcluded } from "@/lib/storage";
import { INITIAL_FALLBACK_CODES } from "@/lib/initial-codes";
import { getCountryDetails } from "@/lib/countries";
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

    if (minutes < 1) return locale === "ar" ? "الآن" : locale === "bn" ? "মাত্র এখন" : "just now";
    if (minutes < 60) return `${minutes}${locale === "ar" ? " د" : locale === "bn" ? " মি" : "m ago"}`;
    if (hours < 24) return `${hours}${locale === "ar" ? " س" : locale === "bn" ? " ঘণ্টা" : "h ago"}`;
    return locale === "ar" ? "اليوم" : locale === "bn" ? "আজ" : "today";
  } catch {
    return "just now";
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
        limit: "15",
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

      // Memory fallback: filter bundle
      const fallbackClean = INITIAL_FALLBACK_CODES.filter(
        (c) => !isCodeExcluded(c.id, c.code)
      ).slice(0, 15);
      setCodes(fallbackClean.length > 0 ? fallbackClean : INITIAL_FALLBACK_CODES.slice(0, 15));
    } catch (err) {
      console.error("fetchBatch error:", err);
      setCodes(INITIAL_FALLBACK_CODES.slice(0, 15));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const handleCopyCode = async (codeItem: CodeItem) => {
    const success = await copyToClipboard(codeItem.code);
    if (success) {
      setCopiedId(codeItem.id);
      showToast(t.common.copiedToast || "Code copied to clipboard", "success");

      saveCopiedCode(codeItem.id, codeItem.code);

      fetch(`/api/codes/${codeItem.id}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      if (onCodeCopiedGlobal) {
        onCodeCopiedGlobal(codeItem);
      }

      // Remove from list immediately
      setTimeout(() => {
        setCodes((prev) => prev.filter((c) => c.id !== codeItem.id));
        setCopiedId(null);
      }, 350);
    }
  };

  return (
    <section className="my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>{locale === "ar" ? "رموز إضافية نشطة" : locale === "bn" ? "আরও সক্রিয় কোডসমূহ" : "More codes"}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {locale === "ar"
              ? "رموز إحالة مجتمعية حديثة من معتمرين حول العالم"
              : locale === "bn"
              ? "বিশ্বজুড়ে ওমরাহ যাত্রীদের শেয়ার করা সক্রিয় রেফারেল কোড"
              : "Fresh community codes from pilgrims around the world"}
          </p>
        </div>

        <button
          onClick={() => fetchBatch(codes.map((c) => c.id))}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${refreshing ? "animate-spin" : ""}`} />
          <span>{locale === "ar" ? "تحديث" : locale === "bn" ? "রিফ্রেশ" : "Refresh"}</span>
        </button>
      </div>

      {/* Code List (Matching Screenshot 3 design) */}
      <div className="space-y-2.5">
        {codes.map((item) => {
          const country = getCountryDetails(item.country);
          const timeAgo = formatTimeAgo(item.created_at, locale);
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-gray-100 hover:border-emerald-300 p-3 sm:p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
            >
              {/* Left: Country flag & Name + Time ago */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700 shrink-0">
                  <span className="text-base">{country.flag}</span>
                  <span className="truncate max-w-[90px] sm:max-w-[130px]">{country.name}</span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium shrink-0 hidden sm:inline-block">
                  {timeAgo}
                </span>
              </div>

              {/* Middle: Code NG-XXXXXXXX in Bold Monospace */}
              <div className="text-base sm:text-lg font-black font-mono tracking-wider text-gray-900 group-hover:text-emerald-950 select-all whitespace-nowrap">
                {item.code}
              </div>

              {/* Right: uses badge + 1-Click Copy Button */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">
                  x{item.use_count}
                </span>

                <button
                  onClick={() => handleCopyCode(item)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                    isCopied
                      ? "bg-emerald-600 text-white"
                      : "bg-[#062413] hover:bg-emerald-800 text-white group-hover:scale-105"
                  }`}
                  title="Copy code"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button: View all 5,000+ codes */}
      <div className="mt-5 text-center">
        <Link
          href={locale === "ar" ? "/ar/codes" : "/codes"}
          className="inline-flex items-center justify-center gap-2 bg-[#062413] hover:bg-emerald-900 text-white px-7 py-3 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <span>
            {locale === "ar"
              ? "عرض جميع الأكواد (+5,000 كود)"
              : locale === "bn"
              ? "সব কোড দেখুন (৫,০০০+ কোড)"
              : "View all 5,000+ codes"}
          </span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
