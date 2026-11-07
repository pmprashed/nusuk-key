"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToastContainer, showToast } from "./Toast";
import { ShareModal } from "./ShareModal";
import { AutoStructuredData } from "./JsonLd";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem } from "@/lib/types";
import { copyToClipboard } from "@/lib/clipboard";
import { saveCopiedCode } from "@/lib/storage";
import { INITIAL_FALLBACK_CODES } from "@/lib/initial-codes";
import { COUNTRIES_LIST, getCountryDetails } from "@/lib/countries";
import { Search, RefreshCw, Copy, Check, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";

interface CodesPageViewProps {
  locale: Locale;
}

const PAGE_SIZE = 30;

export function CodesPageView({ locale }: CodesPageViewProps) {
  const { t } = useLanguage();
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rotating, setRotating] = useState(false);
  const [batchOffset, setBatchOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Fetch a batch of 30 codes (supporting offset and country filter)
  async function fetchCodesBatch(offset = 0, country = "ALL") {
    try {
      const countryQuery = country !== "ALL" ? `&country=${encodeURIComponent(country)}` : "";
      const res = await fetch(`/api/codes?limit=${PAGE_SIZE}&offset=${offset}${countryQuery}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const incoming: CodeItem[] = data.codes || [];
        if (incoming.length > 0) {
          setCodes(incoming);
          return;
        }
      }

      // Memory fallback from INITIAL_FALLBACK_CODES
      let pool = INITIAL_FALLBACK_CODES;
      if (country !== "ALL") {
        const matching = pool.filter((c) => (c.country || "GLOBAL").toUpperCase() === country.toUpperCase());
        if (matching.length > 0) pool = matching;
      }
      const safeOffset = offset % Math.max(1, pool.length);
      const slice = pool.slice(safeOffset, safeOffset + PAGE_SIZE);
      setCodes(slice.length > 0 ? slice : pool.slice(0, PAGE_SIZE));
    } catch {
      const slice = INITIAL_FALLBACK_CODES.slice(0, PAGE_SIZE);
      setCodes(slice);
    }
  }

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchCodesBatch(0, "ALL").finally(() => setLoading(false));
  }, []);

  // When country selector changes, reset offset and load first 30
  const handleCountryChange = async (country: string) => {
    setSelectedCountryCode(country);
    setBatchOffset(0);
    setLoading(true);
    await fetchCodesBatch(0, country);
    setLoading(false);
  };

  // Concept: "Show 30 New Codes" — rotates to the next 30 codes from pool
  const handleShow30NewCodes = async () => {
    setRotating(true);
    const nextOffset = batchOffset + PAGE_SIZE;
    setBatchOffset(nextOffset);

    await fetchCodesBatch(nextOffset, selectedCountryCode);
    setRotating(false);

    // Smooth scroll back to top of the codes list
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const toastMsg =
      locale === "ar"
        ? "تم عرض 30 رمزاً نشطاً جديداً! ✨"
        : locale === "bn"
        ? "নতুন ৩০টি অ্যাক্টিভ কোড লোড হয়েছে! ✨"
        : "Loaded 30 fresh referral codes! ✨";
    showToast(toastMsg, "success");
  };

  const handleCopy = async (item: CodeItem) => {
    const success = await copyToClipboard(item.code);
    if (success) {
      setCopiedId(item.id);
      showToast(t.common.copiedToast || "Code copied to clipboard!", "success");

      // Optimistically increment use_count in local state
      setCodes((prev) =>
        prev.map((c) => (c.id === item.id ? { ...c, use_count: (c.use_count || 0) + 1 } : c))
      );

      saveCopiedCode(item.id, item.code);

      // Record copy event to Supabase
      fetch(`/api/codes/${encodeURIComponent(item.id)}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    }
  };

  // Filtered view if user types search query in the input
  const displayCodes = useMemo(() => {
    if (!searchQuery.trim()) return codes;
    const query = searchQuery.trim().toLowerCase();
    return codes.filter((c) => c.code.toLowerCase().includes(query));
  }, [codes, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 mb-12">
        {/* Top Dark Green Banner (Matching Screenshot 4) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#09351a] to-[#0f4422] border-2 border-emerald-600/40 text-white p-6 sm:p-10 shadow-xl mb-8">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="46" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="50,4 96,50 50,96 4,50" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs font-bold text-emerald-200 mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {locale === "ar"
                  ? "دليل الأكواد المجتمعية النشطة · 30 رمزاً في الدفعة"
                  : locale === "bn"
                  ? "ভেরিফায়েড নুসুক কি ডিরেক্টরি · প্রতি ব্যাচে ৩০টি কোড"
                  : "Verified Nusuk Key Directory · 30 Codes Per Batch"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
              {locale === "ar"
                ? "دليل أكواد نسك النشطة والمحدثة"
                : locale === "bn"
                ? "অ্যাক্টিভ নুসুক কি কোড ডিরেক্টরি"
                : "Active Nusuk Key Codes Directory"}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              {locale === "ar"
                ? "استكشف رموز الإحالة المجتمعية النشطة. تصفح 30 رمزاً دفعة واحدة واستخدم زر «عرض 30 رمزاً جديداً» لتدوير الرموز فوراً."
                : locale === "bn"
                ? "বিশ্বজুড়ে শেয়ার করা সক্রিয় নুসুক কি কোড খুঁজুন। একবারে ৩০টি কোড দেখুন এবং 'Show 30 New Codes' বাটনে ক্লিক করে নতুন ব্যাচ আনুন।"
                : "Browse community referral codes in clean 30-code batches. Click 'Show 30 New Codes' anytime to rotate to a fresh set of ready-to-use keys."}
            </p>
          </div>
        </div>

        {/* Scroll anchor */}
        <div ref={listTopRef} />

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs">
          {/* Search Input */}
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === "ar"
                  ? "بحث عن كود (مثال: NG-)..."
                  : locale === "bn"
                  ? "কোড দিয়ে খুঁজুন (যেমন NG-)..."
                  : "Search by code (e.g. NG-)..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-mono text-gray-900 outline-hidden transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Country Selector */}
          <div className="sm:col-span-5 relative">
            <select
              value={selectedCountryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 text-xs sm:text-sm font-semibold text-gray-800 outline-hidden transition-all cursor-pointer"
            >
              <option value="ALL">
                🌍 {locale === "ar" ? "جميع البلدان (الكل)" : locale === "bn" ? "সব দেশ (All Countries)" : "All Countries"}
              </option>
              {COUNTRIES_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory List of Exactly 30 Codes */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-xs">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-600 font-bold">
              {locale === "ar" ? "جاري تحميل 30 رمزاً..." : locale === "bn" ? "৩০টি কোড লোড হচ্ছে..." : "Loading 30 active codes..."}
            </p>
          </div>
        ) : displayCodes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 shadow-xs">
            <p className="text-sm font-bold text-gray-700 mb-2">No codes found</p>
            <p className="text-xs text-gray-500 mb-4">Try clearing your search query or reset country filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCountryChange("ALL");
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-xs hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayCodes.map((item) => {
              const country = getCountryDetails(item.country);
              const isCopied = copiedId === item.id;
              const nusukUrl = `https://services.nusuk.sa/app?p=27&id=${encodeURIComponent(item.code)}`;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-gray-100 hover:border-emerald-300 p-3 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
                >
                  {/* Left: Country flag & Name */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700 shrink-0">
                      <span className="text-base">{country.flag}</span>
                      <span className="truncate max-w-[90px] sm:max-w-[140px] font-bold text-gray-800">
                        {country.name}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Code NG-XXXXXXXX in Bold Monospace */}
                  <div className="text-base sm:text-xl font-black font-mono tracking-wider text-gray-900 group-hover:text-emerald-950 select-all text-center">
                    {item.code}
                  </div>

                  {/* Right: Uses badge + Open in Nusuk + Copy button */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    {/* Uses Badge (all 300-500+) */}
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-100">
                      x{item.use_count}
                    </span>

                    {/* Open in Nusuk Deep Link */}
                    <a
                      href={nusukUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold transition-colors cursor-pointer"
                      title="Open directly in official Nusuk App"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{locale === "ar" ? "فتح في نسك" : locale === "bn" ? "নুসুকে খুলুন" : "Open in Nusuk"}</span>
                    </a>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(item)}
                      className={`h-9 px-3.5 sm:h-10 sm:px-4 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-[#062413] hover:bg-emerald-800 text-white group-hover:scale-102"
                      }`}
                      title="Copy referral code"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Prominent "Show 30 New Codes" Button (Requested Concept) */}
            <div className="pt-8 pb-4 text-center">
              <button
                onClick={handleShow30NewCodes}
                disabled={rotating}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-[#062413] via-[#09351a] to-[#0f4422] hover:from-[#09351a] hover:to-[#145a2e] text-white font-black text-sm sm:text-base border-2 border-emerald-400/50 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <RefreshCw className={`w-5 h-5 text-emerald-300 transition-transform ${rotating ? "animate-spin" : "group-hover:rotate-180"}`} />
                <span>
                  {locale === "ar"
                    ? "عرض 30 رمزاً جديداً"
                    : locale === "bn"
                    ? "নতুন ৩০টি কোড দেখুন (Show 30 New Codes)"
                    : "Show 30 New Codes"}
                </span>
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </button>
              <p className="text-xs text-gray-500 font-medium mt-2.5">
                {locale === "ar"
                  ? "انقر لتدوير الدفعة وعرض 30 رمز إحالة نشط جديد فوراً"
                  : locale === "bn"
                  ? "নতুন ৩০টি ভেরিফায়েড রেফারেল কোড রোটেশন করতে ক্লিক করুন"
                  : "Click to rotate and immediately view 30 fresh referral codes"}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer locale={locale} />
      <ShareModal
        locale={locale}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onCodeAdded={(c) => setCodes((prev) => [c, ...prev.slice(0, PAGE_SIZE - 1)])}
      />
      <ToastContainer />
      <AutoStructuredData locale={locale} />
    </div>
  );
}