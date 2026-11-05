"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink, Sparkles, Check } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { CodeItem } from "@/lib/types";
import { copyToClipboard, getNusukDeepLink } from "@/lib/clipboard";
import { saveCopiedCode } from "@/lib/storage";
import { showToast } from "./Toast";

interface NextCodeCardProps {
  locale: Locale;
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

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  } catch {
    return locale === "ar" ? "قريباً" : "recently";
  }
}

export function NextCodeCard({ locale, initialCode, onCodeCopied }: NextCodeCardProps) {
  const t = getDictionary(locale);
  const [code, setCode] = useState<CodeItem | null>(initialCode || null);
  const [loading, setLoading] = useState(!initialCode);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!initialCode) {
      fetchNext();
    }
  }, [initialCode]);

  async function fetchNext() {
    try {
      setLoading(true);
      const res = await fetch("/api/codes/next");
      if (res.ok) {
        const data = await res.json();
        setCode(data.code);
      }
    } catch (err) {
      console.error("Error fetching next code:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = async () => {
    if (!code) return;
    const success = await copyToClipboard(code.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast(t.common.copiedToast, "success");
      saveCopiedCode(code.id, code.code);

      // Record event in backend
      fetch(`/api/codes/${code.id}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      if (onCodeCopied) {
        onCodeCopied(code);
      }
    }
  };

  const handleOpenNusuk = () => {
    if (!code) return;
    const deepLink = getNusukDeepLink(code.code);
    if (!deepLink) return;

    saveCopiedCode(code.id, code.code);

    // Record open event
    fetch(`/api/codes/${code.id}/copy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "open" }),
    }).catch(console.error);

    if (onCodeCopied) {
      onCodeCopied(code);
    }

    window.location.href = deepLink;
  };

  const deepLink = code ? getNusukDeepLink(code.code) : null;

  if (loading && !code) {
    return (
      <div className="rounded-2xl bg-[#14532D] text-white p-6 sm:p-8 animate-pulse mb-6">
        <div className="h-6 w-32 bg-emerald-800 rounded-lg mb-4" />
        <div className="h-10 w-64 bg-emerald-800 rounded-lg mb-3" />
        <div className="h-4 w-40 bg-emerald-800/60 rounded mb-6" />
        <div className="h-12 w-full bg-emerald-800 rounded-xl" />
      </div>
    );
  }

  if (!code) {
    return null;
  }

  const timeAgoStr = formatTimeAgo(code.created_at, locale);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#104324] to-[#14532D] border border-emerald-800 text-white p-6 sm:p-7 shadow-md mb-6">
      {/* Decorative background geometric lines */}
      <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="4 4" />
          <polygon points="50,5 95,50 50,95 5,50" strokeWidth="1" />
          <polygon points="50,15 85,50 50,85 15,50" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-700/50 text-xs font-medium text-emerald-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>{t.nextCode.badge}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-wider font-mono text-white select-all">
            {code.code}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-emerald-200/80 mb-6 font-medium">
          {t.nextCode.sharedAgo.replace("{{time}}", timeAgoStr)} ·{" "}
          {t.nextCode.usedCount.replace("{{count}}", code.use_count.toString())}
        </p>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {deepLink && (
            <button
              onClick={handleOpenNusuk}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-900"
            >
              <ExternalLink className="w-4 h-4 text-emerald-800" />
              <span>{t.nextCode.openBtn}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              deepLink
                ? "bg-emerald-800/80 hover:bg-emerald-700/90 text-white border border-emerald-700/60"
                : "w-full bg-white hover:bg-emerald-50 text-emerald-950 shadow-sm"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.nextCode.copyBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
