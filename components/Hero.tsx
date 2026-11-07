"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, Sparkles, Key, Globe2, ShieldCheck } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

interface HeroProps {
  locale?: Locale;
}

function getSaudiTimeString(locale?: Locale) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const date = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
      timeZone: "Asia/Riyadh",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(now);

    return { time: formatter.format(now), date };
  } catch {
    return { time: "12:00:00 PM", date: "Today" };
  }
}

export function Hero({ locale: propLocale }: HeroProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const [saudiTime, setSaudiTime] = useState(() => getSaudiTimeString(locale));
  const [stats, setStats] = useState({
    codes_ready: 5644,
    codes_used: 954293,
    visits_last_24h: 1640,
    people_last_hour: 45,
    client_ip: "103.131.180.76",
  });
  const [iUsedCount, setIUsedCount] = useState(24);

  // Sync with localStorage for "I Used" count
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nusuk_copied_codes_v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setIUsedCount(parsed.length);
        }
      }
    } catch {}

    const handleCopy = () => {
      setIUsedCount((prev) => prev + 1);
      setStats((prev) => ({
        ...prev,
        codes_used: prev.codes_used + 1,
      }));
    };
    window.addEventListener("nusuk:code_copied", handleCopy);
    return () => window.removeEventListener("nusuk:code_copied", handleCopy);
  }, []);

  // Live clock — ticks every second
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setSaudiTime(getSaudiTimeString(locale));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, [locale]);

  // Live stats polling every 5 seconds
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setStats((prev) => ({
            ...prev,
            ...data,
            codes_used: Math.max(data.codes_used || 0, prev.codes_used || 954293),
            client_ip: data.client_ip || prev.client_ip,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    }

    fetchStats();
    const statsInterval = setInterval(fetchStats, 5000);
    return () => clearInterval(statsInterval);
  }, []);

  const totalKeys = stats.codes_ready || 5644;
  const totalUsed = stats.codes_used || 954293;
  const visits24h = stats.visits_last_24h || 1640;
  const freshKeys = Math.max(0, totalKeys - iUsedCount);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#0a351c] to-[#0f4424] text-white shadow-2xl mb-8 border border-emerald-500/30">
      {/* Decorative Geometric Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="islamic-geom-hero" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke="#fff" strokeWidth="0.8" />
              <circle cx="25" cy="25" r="10" fill="none" stroke="#fff" strokeWidth="0.6" />
              <path d="M0 0 L25 25 L50 0 M0 50 L25 25 L50 50" fill="none" stroke="#fff" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geom-hero)" />
        </svg>
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* Top Header Badge & Live Clock Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-xs font-bold text-emerald-200 shadow-sm w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {locale === "ar"
                ? "منصة مجتمعية لتبادل رموز نسك مجاناً"
                : locale === "bn"
                ? "কমিউনিটি-চালিত নুসুক কি এক্সচেঞ্জ প্ল্যাটফর্ম"
                : "A community-powered key exchange platform"}
            </span>
          </div>

          {/* Live Saudi Arabian Clock */}
          <div className="text-xs text-emerald-200/90 tracking-wide font-mono flex items-center gap-2 flex-wrap">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>{t.hero.updatedPrefix}</span>
            <span className="font-bold text-white">{saudiTime.date}</span>
            <span>{locale === "ar" ? "الساعة" : "at"}</span>
            <span className="font-extrabold text-white tabular-nums bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-400/40 shadow-xs">
              {saudiTime.time}
            </span>
            <span className="text-emerald-300 font-semibold">{t.hero.timeZone}</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3">
          <span>
            {locale === "ar"
              ? "افتح مفاتيح نسك مجانية · "
              : locale === "bn"
              ? "ফ্রি নুসুক কি আনলক করুন · "
              : "Unlock Free Nusuk Keys · "}
          </span>
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
            {locale === "ar"
              ? "تبادل الرموز واربح معنا"
              : locale === "bn"
              ? "কোড শেয়ার করুন ও একসাথে জিতুন"
              : "Swap Codes & Win Together."}
          </span>
        </h1>

        <p className="text-emerald-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed mb-6 font-medium">
          {locale === "ar"
            ? "منصة مدعومة مجتمعياً لمشاركة وطلب رموز إحالة نسك مجاناً. أدخل الرموز في تطبيق نسك لكسب مفاتيح إضافية في مسابقة العمرة اليومية."
            : locale === "bn"
            ? "নুসুক রেফারেল কোড শেয়ার এবং সংগ্রহ করার একটি উন্মুক্ত প্ল্যাটফর্ম। ওমরাহ প্রতিযোগিতার অতিরিক্ত কি জিততে কোডগুলো নুসুক অ্যাপে ব্যবহার করুন।"
            : "A community-powered platform for sharing and claiming Nusuk referral codes. Enter codes into the Nusuk app to earn bonus keys for the Umrah competition."}
        </p>

        {/* Premium 6-Box Stats Dashboard Grid (Full Width & Balanced) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* 1. Total Key */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 text-gray-900 border border-emerald-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between gap-1 mb-1 text-emerald-700">
              <Key className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                {(t.hero.stats as any).totalKey || "TOTAL KEY"}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
              {totalKeys.toLocaleString()}
            </div>
          </div>

          {/* 2. Total Used */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 text-gray-900 border border-emerald-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between gap-1 mb-1 text-emerald-700">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                {(t.hero.stats as any).totalUsed || "TOTAL USED"}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
              {totalUsed.toLocaleString()}
            </div>
          </div>

          {/* 3. Site visits last 24h */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 text-gray-900 border border-emerald-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between gap-1 mb-1 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 truncate">
                {(t.hero.stats as any).siteVisits24h || "24H VISITS"}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
              {visits24h.toLocaleString()}
            </div>
          </div>

          {/* 4. Fresh Key */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 text-gray-900 border border-emerald-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between gap-1 mb-1 text-emerald-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                {(t.hero.stats as any).freshKey || "FRESH KEY"}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-700 font-mono tabular-nums">
              {freshKeys.toLocaleString()}
            </div>
          </div>

          {/* 5. I Used */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 text-gray-900 border border-emerald-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between gap-1 mb-1 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                {(t.hero.stats as any).iUsed || "I USED"}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-mono tabular-nums">
              {iUsedCount.toLocaleString()}
            </div>
          </div>

          {/* 6. My IP Address */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 text-gray-900 border border-emerald-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between gap-1 mb-1 text-emerald-700">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                {(t.hero.stats as any).myIp || "MY IP"}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-emerald-900 font-mono truncate">
              {stats.client_ip || "103.131.180.76"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
