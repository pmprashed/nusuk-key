"use client";

import { useEffect, useState } from "react";
import { Locale, getDictionary } from "@/lib/i18n";
import { StatsResponse } from "@/lib/types";

interface HeroProps {
  locale: Locale;
  initialStats?: StatsResponse;
}

export function Hero({ locale, initialStats }: HeroProps) {
  const t = getDictionary(locale);
  const [stats, setStats] = useState<StatsResponse>(
    initialStats || { codes_ready: 0, codes_used: 0, people_last_hour: 0 }
  );
  const [currentDateString, setCurrentDateString] = useState("5 November 2026");

  useEffect(() => {
    // Format current date in Saudi context
    try {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);
      setCurrentDateString(formatted);
    } catch {
      // fallback
    }

    // Fetch live stats
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [locale]);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#072412] via-[#0d3b1f] to-[#14532D] text-white shadow-lg mb-8">
      {/* Decorative Geometric Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="islamic-geom" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#fff" strokeWidth="1" />
              <circle cx="30" cy="30" r="12" fill="none" stroke="#fff" strokeWidth="0.8" />
              <path d="M0 0 L30 30 L60 0 M0 60 L30 30 L60 60" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geom)" />
        </svg>
      </div>

      {/* Decorative Subtle Kaaba Silhouette / Arches in corner */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full object-cover text-emerald-200">
          <path d="M20 180 L20 70 Q40 30 70 70 L70 180 Z" />
          <path d="M80 180 L80 50 Q100 10 130 50 L130 180 Z" />
          <path d="M140 180 L140 70 Q160 30 190 70 L190 180 Z" />
        </svg>
      </div>

      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
          {t.hero.title}
        </h1>
        <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-4 font-normal">
          {t.hero.subtitle}
        </p>
        <p className="text-xs text-emerald-200/80 tracking-wide font-mono">
          {t.hero.updatedPrefix} {currentDateString} {t.hero.timeZone}
        </p>

        {/* 3 Real Stats Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl bg-white/95 text-gray-900 p-2.5 rounded-2xl shadow-sm border border-emerald-100/30">
          <div className="px-4 py-3 rounded-xl bg-emerald-50/50">
            <div className="text-2xl font-bold tracking-tight text-emerald-950 font-mono">
              {stats.codes_ready.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-800 font-medium">
              {t.hero.stats.codesReady}
            </div>
          </div>

          <div className="px-4 py-3 rounded-xl bg-emerald-50/50 border-t sm:border-t-0 sm:border-l border-emerald-100/50">
            <div className="text-2xl font-bold tracking-tight text-emerald-950 font-mono">
              {stats.codes_used.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-800 font-medium">
              {t.hero.stats.codeUses}
            </div>
          </div>

          <div className="px-4 py-3 rounded-xl bg-emerald-50/50 border-t sm:border-t-0 sm:border-l border-emerald-100/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-2xl font-bold tracking-tight text-emerald-950 font-mono">
                {stats.people_last_hour.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-emerald-800 font-medium">
              {t.hero.stats.peopleLastHour}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
