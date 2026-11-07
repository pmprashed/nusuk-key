"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Sparkles, Key, CheckCircle2 } from "lucide-react";
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
    <section className="relative mb-14">
      {/* Main Hero Green Container with Geometric Pattern */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#09341b] to-[#0e4423] text-white shadow-2xl border border-emerald-500/30 pt-7 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 text-center">
        {/* Subtle Decorative Geometric Background */}
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

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Pill: Community Platform Badge + Site visits last 24h placed nicely here! */}
          <div className="flex items-center gap-2 flex-wrap justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-xs font-bold text-emerald-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {locale === "ar"
                  ? "منصة مجتمعية لتبادل رموز نسك مجاناً"
                  : locale === "bn"
                  ? "কমিউনিটি-চালিত নুসুক কি এক্সচেঞ্জ প্ল্যাটফর্ম"
                  : "A community-powered key exchange platform"}
              </span>
            </div>

            {/* Moved "Site visits last 24h" to top badge section */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/30 text-xs font-bold text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-200">{visits24h.toLocaleString()}</span>
              <span className="text-emerald-300 text-[11px]">visits last 24h</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3">
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

          {/* Subtitle */}
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed mb-4 font-medium">
            {locale === "ar"
              ? "منصة مدعومة مجتمعياً لمشاركة وطلب رموز إحالة نسك مجاناً. أدخل الرموز في تطبيق نسك لكسب مفاتيح إضافية في مسابقة العمرة اليومية."
              : locale === "bn"
              ? "নুসুক রেফারেল কোড শেয়ার এবং সংগ্রহ করার একটি উন্মুক্ত প্ল্যাটফর্ম। ওমরাহ প্রতিযোগিতার অতিরিক্ত কি জিততে কোডগুলো নুসুক অ্যাপে ব্যবহার করুন।"
              : "A community-powered platform for sharing and claiming Nusuk referral codes. Enter codes into the Nusuk app to earn bonus keys for the Umrah competition."}
          </p>

          {/* Live Saudi Clock */}
          <div className="text-[11px] sm:text-xs text-emerald-200/90 tracking-wide font-mono flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>{t.hero.updatedPrefix}</span>
            <span className="font-bold text-white">{saudiTime.date}</span>
            <span>{locale === "ar" ? "الساعة" : "at"}</span>
            <span className="font-extrabold text-white tabular-nums bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-400/40">
              {saudiTime.time}
            </span>
            <span className="text-emerald-300 font-semibold">{t.hero.timeZone}</span>
          </div>
        </div>
      </div>

      {/* Floating 4-Card Stats Bar positioned perfectly in the middle (50% overlapping the bottom border) */}
      <div className="relative z-20 -mt-10 sm:-mt-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-3 sm:p-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {/* Card 1: Total Key */}
          <div className="p-2 sm:p-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-600">
                {(t.hero.stats as any).totalKey || "TOTAL KEY"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tabular-nums tracking-tight">
              {totalKeys.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">Verified repository</div>
          </div>

          {/* Card 2: Total Used */}
          <div className="p-2 sm:p-3 flex flex-col items-center text-center pt-3 sm:pt-2">
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-600">
                {(t.hero.stats as any).totalUsed || "TOTAL USED"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tabular-nums tracking-tight">
              {totalUsed.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">Real-time redemptions</div>
          </div>

          {/* Card 3: Fresh Key */}
          <div className="p-2 sm:p-3 flex flex-col items-center text-center pt-3 sm:pt-2">
            <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                {(t.hero.stats as any).freshKey || "FRESH KEY"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono tabular-nums tracking-tight">
              {freshKeys.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Ready to claim</div>
          </div>

          {/* Card 4: I Used */}
          <div className="p-2 sm:p-3 flex flex-col items-center text-center pt-3 sm:pt-2">
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-600">
                {(t.hero.stats as any).iUsed || "I USED"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tabular-nums tracking-tight">
              {iUsedCount.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">Saved in browser</div>
          </div>
        </div>
      </div>
    </section>
  );
}
