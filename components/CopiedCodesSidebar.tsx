"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Trash2, CheckCircle2 } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { CopiedCodeLocal, ReportType } from "@/lib/types";
import { getCopiedCodes, markCodeReported, clearCopiedCodes } from "@/lib/storage";
import { showToast } from "./Toast";

interface CopiedCodesSidebarProps {
  locale: Locale;
  refreshTrigger?: number;
}

export function CopiedCodesSidebar({ locale, refreshTrigger }: CopiedCodesSidebarProps) {
  const t = getDictionary(locale);
  const [copiedCodes, setCopiedCodes] = useState<CopiedCodeLocal[]>([]);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  useEffect(() => {
    setCopiedCodes(getCopiedCodes());
  }, [refreshTrigger]);

  const handleReport = async (item: CopiedCodeLocal, type: ReportType) => {
    setActiveReportId(null);
    markCodeReported(item.id);
    setCopiedCodes(getCopiedCodes());
    showToast(t.codesYouCopy.reportedToast, "info");

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
    <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs mb-8">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          {t.codesYouCopy.title}
        </h3>
        {copiedCodes.length > 0 && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            title={t.codesYouCopy.clearHistory}
            aria-label={t.codesYouCopy.clearHistory}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-4">
        {t.codesYouCopy.subtitle}
      </p>

      {copiedCodes.length === 0 ? (
        <div className="rounded-xl bg-gray-50/70 border border-dashed border-gray-200 p-6 text-center text-xs text-gray-400">
          {t.codesYouCopy.empty}
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {copiedCodes.map((item) => {
            const isMenuOpen = activeReportId === item.id;

            return (
              <div
                key={item.id}
                className="relative rounded-xl border border-gray-100 bg-gray-50/60 p-2.5 transition-all text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono font-bold text-gray-900 select-all">
                      {item.code}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveReportId(isMenuOpen ? null : item.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-md border border-amber-200/70 transition-colors"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{t.codesYouCopy.problemBtn}</span>
                  </button>
                </div>

                {/* Problem Selection Dropdown */}
                {isMenuOpen && (
                  <div className="mt-2 pt-2 border-t border-gray-200/60 space-y-1.5 animate-in fade-in duration-150">
                    <button
                      onClick={() => handleReport(item, "already_used")}
                      className="w-full text-left rtl:text-right px-2.5 py-1.5 rounded-lg text-xs bg-white hover:bg-red-50 text-red-800 border border-red-100 transition-colors font-medium"
                    >
                      • {t.codesYouCopy.reasonAlreadyUsed}
                    </button>
                    <button
                      onClick={() => handleReport(item, "not_correct")}
                      className="w-full text-left rtl:text-right px-2.5 py-1.5 rounded-lg text-xs bg-white hover:bg-red-50 text-red-800 border border-red-100 transition-colors font-medium"
                    >
                      • {t.codesYouCopy.reasonNotCorrect}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
