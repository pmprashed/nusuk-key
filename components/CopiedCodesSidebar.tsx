"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Trash2, CheckCircle2, History } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CopiedCodeLocal, ReportType } from "@/lib/types";
import { getCopiedCodes, markCodeReported, clearCopiedCodes } from "@/lib/storage";
import { showToast } from "./Toast";

interface CopiedCodesSidebarProps {
  locale?: Locale;
  refreshTrigger?: number;
}

export function CopiedCodesSidebar({ locale: propLocale, refreshTrigger }: CopiedCodesSidebarProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const [copiedCodes, setCopiedCodes] = useState<CopiedCodeLocal[]>([]);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  useEffect(() => {
    setCopiedCodes(getCopiedCodes());
  }, [refreshTrigger]);

  useEffect(() => {
    const handleGlobalCopy = () => {
      setCopiedCodes(getCopiedCodes());
    };
    window.addEventListener("nusuk:code_copied", handleGlobalCopy);
    return () => window.removeEventListener("nusuk:code_copied", handleGlobalCopy);
  }, []);

  const handleReport = async (item: CopiedCodeLocal, type: ReportType) => {
    setActiveReportId(null);
    markCodeReported(item.id);
    setCopiedCodes(getCopiedCodes());
    showToast(t.codesYouCopy.reportedToast || "Report received. Code removed from your list.", "info");

    try {
      await fetch(`/api/codes/${item.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
    } catch (err) {
      console.error("Failed to report code:", err);
    }
  };

  const handleClear = () => {
    clearCopiedCodes();
    setCopiedCodes([]);
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-3xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-700" />
          <span>{t.codesYouCopy.title}</span>
        </h3>
        {copiedCodes.length > 0 && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
            title={t.codesYouCopy.clearHistory}
            aria-label={t.codesYouCopy.clearHistory}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-3.5 font-medium leading-relaxed">
        {t.codesYouCopy.subtitle}
      </p>

      {copiedCodes.length === 0 ? (
        <div className="py-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          {locale === "ar"
            ? "لم تقم بنسخ أي رمز بعد"
            : locale === "bn"
            ? "আপনি এখনও কোনো কোড কপি করেননি"
            : locale === "ur"
            ? "آپ نے ابھی تک کوئی کوڈ کاپی نہیں کیا"
            : "No codes copied yet"}
        </div>
      ) : (
        /* Compact clean scrollable height matching the left guide height */
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {copiedCodes.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 py-2 px-3 bg-emerald-50/40 border border-emerald-100 rounded-xl transition-all"
            >
              <div className="min-w-0 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono font-bold text-xs sm:text-sm text-gray-900 tracking-wider truncate">
                  {item.code}
                </span>
              </div>

              {activeReportId === item.id ? (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleReport(item, "not_correct")}
                    className="px-2 py-0.5 bg-red-100 hover:bg-red-200 text-red-800 rounded text-[10px] font-bold"
                  >
                    {t.codesYouCopy.reportInvalid}
                  </button>
                  <button
                    onClick={() => handleReport(item, "already_used")}
                    className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded text-[10px] font-bold"
                  >
                    {t.codesYouCopy.reportUsed}
                  </button>
                  <button
                    onClick={() => setActiveReportId(null)}
                    className="px-1 text-gray-400 hover:text-gray-600 text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveReportId(item.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-amber-700 transition-colors p-1"
                  title={t.codesYouCopy.reportCode}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.codesYouCopy.reportCode}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
