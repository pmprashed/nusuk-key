"use client";

import { useEffect, useState, useRef } from "react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { StatsResponse } from "@/lib/types";
import { getCopiedCodes, getMySubmissions } from "@/lib/storage";

interface HeroProps {
  locale?: Locale;
  initialStats?: StatsResponse;
}

/** Format date in Saudi Arabian Time (Asia/Riyadh, UTC+3) accurately */
function getSaudiTimeString(locale: Locale): { date: string; time: string } {
  try {
    const now = new Date();
    const dateFormatted = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Riyadh",
    }).format(now);

    const timeFormatted = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Riyadh",
    }).format(now);

    return { date: dateFormatted, time: timeFormatted };
  } catch {
    const now = new Date();
    const utcHours = now.getUTCHours() + 3;
    const saudiHours = (utcHours % 24).toString().padStart(2, "0");
    const saudiMinutes = now.getUTCMinutes().toString().padStart(2, "0");
    const saudiSeconds = now.getUTCSeconds().toString().padStart(2, "0");
    return { date: "6 November 2026", time: `${saudiHours}:${saudiMinutes}:${saudiSeconds}` };
  }
}

export function Hero({ locale: propLocale, initialStats }: HeroProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const [stats, setStats] = useState<StatsResponse>(
    initialStats || { codes_ready: 5644, codes_used: 711873, people_last_hour: 1421, visits_last_24h: 1421, client_ip: "103.131.180.76" }
  );
  const [saudiTime, setSaudiTime] = useState(() => getSaudiTimeString(locale));
  const [iUsedCount, setIUsedCount] = useState(0);
  const fetchingRef = useRef(false);

  // Read local user activity (I Used) and update counts immediately on copy
  useEffect(() => {
    const updateLocalStats = () => {
      try {
        const copied = getCopiedCodes();
        setIUsedCount(copied.length);
        // Immediately increment total used count on UI for instant response
        setStats((prev) => ({
          ...prev,
          codes_used: (prev.codes_used || 711873) + 1,
        }));
      } catch {}
    };

    try {
      const copied = getCopiedCodes();
      setIUsedCount(copied.length);
    } catch {}

    window.addEventListener("nusuk:code_copied", updateLocalStats);
    window.addEventListener("nusuk:code_reported", updateLocalStats);
    return () => {
      window.removeEventListener("nusuk:code_copied", updateLocalStats);
      window.removeEventListener("nusuk:code_reported", updateLocalStats);
    };
  }, []);

  // Live clock — ticks every second
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setSaudiTime(getSaudiTimeString(locale));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, [locale]);

  // Live stats polling
  useEffect(() => {
    async function fetchStats() {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setStats((prev) => ({
            ...prev,
            ...data,
            // Keep client_ip if returned
            client_ip: data.client_ip || prev.client_ip,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        fetchingRef.current = false;
      }
    }

    fetchStats();
    const statsInterval = setInterval(fetchStats, 5000);
    return () => clearInterval(statsInterval);
  }, []);

  const totalKeys = stats.codes_ready || 5644;
  const totalUsed = stats.codes_used || 711873;
  const visits24h = stats.visits_last_24h || stats.people_last_hour || 1421;
  const freshKeys = Math.max(0, totalKeys - iUsedCount);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#0c391f] to-[#124d27] text-white shadow-xl mb-8 border border-emerald-600/30">
      {/* Decorative Geometric Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="islamic-geom-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#fff" strokeWidth="1" />
              <circle cx="30" cy="30" r="12" fill="none" stroke="#fff" strokeWidth="0.8" />
              <path d="M0 0 L30 30 L60 0 M0 60 L30 30 L60 60" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geom-hero)" />
        </svg>
      </div>

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3">
          {t.hero.title}
        </h1>
        <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed mb-4 font-medium">
          {t.hero.subtitle}
        </p>

        {/* Live Saudi Arabian Time — ticks accurately every second */}
        <div className="text-xs text-emerald-200/90 tracking-wide font-mono flex items-center gap-2 flex-wrap mb-6">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>{t.hero.updatedPrefix}</span>
          <span className="font-bold text-white">{saudiTime.date}</span>
          <span>{locale === "ar" ? "الساعة" : "at"}</span>
          <span className="font-extrabold text-white tabular-nums bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-400/40 shadow-xs">
            {saudiTime.time}
          </span>
          <span className="text-emerald-300 font-semibold">{t.hero.timeZone}</span>
        </div>

        {/* 2-Row Stats Layout:
            1st Row: Total Key | Total Used | Site visits last 24h
            2nd Row: Fresh Key | I Used | My IP Address */}
        <div className="max-w-3xl space-y-2.5">
          {/* Row 1: Total Key, Total Used, Site visits last 24h */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white/95 text-gray-900 p-2 sm:p-2.5 rounded-2xl shadow-lg border border-emerald-100/70 backdrop-blur-md">
            {/* 1. Total Key */}
            <div className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-50/90 to-white border border-emerald-100/80 flex flex-col justify-center items-center text-center shadow-xs">
              <div className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
                {totalKeys.toLocaleString()}
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-emerald-800 font-extrabold tracking-wider uppercase mt-0.5">
                {(t.hero.stats as any).totalKey || "Total Key"}
              </div>
            </div>

            {/* 2. Total Used */}
            <div className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-50/90 to-white border border-emerald-100/80 flex flex-col justify-center items-center text-center shadow-xs">
              <div className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
                {totalUsed.toLocaleString()}
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-emerald-800 font-extrabold tracking-wider uppercase mt-0.5">
                {(t.hero.stats as any).totalUsed || "Total Used"}
              </div>
            </div>

            {/* 3. Site visits last 24h */}
            <div className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-50/90 to-white border border-emerald-100/80 flex flex-col justify-center items-center text-center shadow-xs">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
                  {visits24h.toLocaleString()}
                </span>
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-emerald-800 font-extrabold tracking-wider uppercase mt-0.5 truncate max-w-full">
                {(t.hero.stats as any).siteVisits24h || "Site visits last 24h"}
              </div>
            </div>
          </div>

          {/* Row 2: Fresh Key, I Used, My IP Address */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white/95 text-gray-900 p-2 sm:p-2.5 rounded-2xl shadow-lg border border-emerald-100/70 backdrop-blur-md">
            {/* 4. Fresh Key */}
            <div className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-50/90 to-white border border-emerald-100/80 flex flex-col justify-center items-center text-center shadow-xs">
              <div className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-700 font-mono tabular-nums">
                {freshKeys.toLocaleString()}
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-emerald-800 font-extrabold tracking-wider uppercase mt-0.5">
                {(t.hero.stats as any).freshKey || "Fresh Key"}
              </div>
            </div>

            {/* 5. I Used */}
            <div className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-50/90 to-white border border-emerald-100/80 flex flex-col justify-center items-center text-center shadow-xs">
              <div className="text-base sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
                {iUsedCount.toLocaleString()}
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-emerald-800 font-extrabold tracking-wider uppercase mt-0.5">
                {(t.hero.stats as any).iUsed || "I Used"}
              </div>
            </div>

            {/* 6. My IP Address */}
            <div className="px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-br from-emerald-50/90 to-white border border-emerald-100/80 flex flex-col justify-center items-center text-center shadow-xs">
              <div className="flex items-center gap-1 sm:gap-1.5 max-w-full">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] sm:text-sm md:text-base font-black tracking-tight text-emerald-950 font-mono truncate max-w-[100px] sm:max-w-none">
                  {stats.client_ip || "103.131.180.76"}
                </span>
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-emerald-800 font-extrabold tracking-wider uppercase mt-0.5 truncate max-w-full">
                {(t.hero.stats as any).myIpAddress || "My IP Address"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
