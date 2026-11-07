"use client";

import { useEffect, useState, useMemo } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToastContainer, showToast } from "./Toast";
import { ShareModal } from "./ShareModal";
import { AutoStructuredData } from "./JsonLd";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem } from "@/lib/types";
import { copyToClipboard } from "@/lib/clipboard";
import { saveCopiedCode, getAllExcludedIds, isCodeExcluded } from "@/lib/storage";
import { INITIAL_FALLBACK_CODES } from "@/lib/initial-codes";
import { COUNTRIES_LIST, CountryInfo, getCountryDetails } from "@/lib/countries";
import { Search, Filter, RefreshCw, Copy, Check, Sparkles, ShieldCheck } from "lucide-react";

interface CodesPageViewProps {
  locale: Locale;
}

export function CodesPageView({ locale }: CodesPageViewProps) {
  const { t } = useLanguage();
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchInitialCodes();
  }, []);

  async function fetchInitialCodes() {
    try {
      setLoading(true);
      const res = await fetch("/api/codes?limit=50");
      if (res.ok) {
        const data = await res.json();
        const incoming: CodeItem[] = data.codes || [];
        if (incoming.length > 0) {
          setCodes(incoming);
          return;
        }
      }
      setCodes(INITIAL_FALLBACK_CODES.slice(0, 50));
    } catch {
      setCodes(INITIAL_FALLBACK_CODES.slice(0, 50));
    } finally {
      setLoading(false);
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInitialCodes();
    setRefreshing(false);
    showToast("Codes refreshed with active rotation", "info");
  };

  const handleCopy = async (item: CodeItem) => {
    const success = await copyToClipboard(item.code);
    if (success) {
      setCopiedId(item.id);
      showToast(t.common.copiedToast || "Code copied to clipboard!", "success");

      saveCopiedCode(item.id, item.code);

      fetch(`/api/codes/${item.id}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      }).catch(console.error);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    }
  };

  const filteredCodes = useMemo(() => {
    return codes.filter((c) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        c.code.toLowerCase().includes(searchQuery.trim().toLowerCase());

      const codeCountry = c.country || "GLOBAL";
      const matchesCountry =
        selectedCountryCode === "ALL" ||
        codeCountry.toUpperCase() === selectedCountryCode.toUpperCase();

      return matchesSearch && matchesCountry;
    });
  }, [codes, searchQuery, selectedCountryCode]);

  const loadMore = () => {
    const nextLimit = (page + 1) * 30;
    const additional = INITIAL_FALLBACK_CODES.slice(codes.length, codes.length + 30);
    if (additional.length > 0) {
      setCodes((prev) => [...prev, ...additional]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 mb-12">
        {/* Top Dark Green Card (Matching Screenshot 4) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#09351a] to-[#0f4422] border-2 border-emerald-600/40 text-white p-6 sm:p-10 shadow-xl mb-8">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="46" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="50,4 96,50 50,96 4,50" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs font-bold text-emerald-200 mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {locale === "ar"
                  ? "دليل الأكواد المجتمعية النشطة"
                  : locale === "bn"
                  ? "ভেরিফায়েড কমিউনিটি কি ডিরেক্টরি"
                  : "Active Nusuk Key Codes Directory"}
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
                ? "استكشف رموز الإحالة المجتمعية المشتركة من المعتمرين حول العالم. يتم اختبار كل رمز لضمان التدوير العادل وسرعة كسب المفاتيح."
                : locale === "bn"
                ? "বিশ্বজুড়ে ওমরাহ হাজীদের শেয়ার করা সক্রিয় রেফারেল কোড খুঁজুন। প্রতিটি কোড ন্যায্য বণ্টন ও দ্রুত কি পয়েন্টের জন্য প্রস্তুত।"
                : "Explore community-shared referral codes from pilgrims worldwide. Each code is tested for fair rotation and rapid key redemption."}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === "ar"
                  ? "بحث عن كود (مثال: NG-)..."
                  : locale === "bn"
                  ? "কোড দিয়ে খুঁজুন..."
                  : "Search by code (e.g. NG-)..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-mono text-gray-900 outline-hidden transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Country Selector */}
          <div className="sm:col-span-4 relative">
            <select
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
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

          {/* Refresh Button */}
          <div className="sm:col-span-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-full h-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 text-xs font-bold text-gray-700 hover:text-emerald-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${refreshing ? "animate-spin" : ""}`} />
              <span>{locale === "ar" ? "تحديث" : locale === "bn" ? "রিফ্রেশ" : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Directory List of Codes (Matching Screenshot 4) */}
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500 font-semibold">Loading verified codes...</p>
          </div>
        ) : filteredCodes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 shadow-xs">
            <p className="text-sm font-bold text-gray-700 mb-2">No codes found matching your search</p>
            <p className="text-xs text-gray-500 mb-4">Try clearing your search query or country filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCountryCode("ALL");
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-xs hover:bg-emerald-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredCodes.map((item) => {
              const country = getCountryDetails(item.country);
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-gray-100 hover:border-emerald-300 p-3 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
                >
                  {/* Left: Country flag & Name */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700 shrink-0">
                      <span className="text-base">{country.flag}</span>
                      <span className="truncate max-w-[100px] sm:max-w-[150px] font-bold text-gray-800">
                        {country.name}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Code NG-XXXXXXXX in Bold Monospace */}
                  <div className="text-base sm:text-xl font-black font-mono tracking-wider text-gray-900 group-hover:text-emerald-950 select-all">
                    {item.code}
                  </div>

                  {/* Right: uses badge + Copy button */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      x{item.use_count}
                    </span>

                    <button
                      onClick={() => handleCopy(item)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-[#062413] hover:bg-emerald-800 text-white group-hover:scale-105"
                      }`}
                      title="Copy referral code"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white hover:bg-gray-50 text-emerald-950 font-black text-sm border-2 border-emerald-300 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span>
                    {locale === "ar"
                      ? "تحميل المزيد من الأكواد"
                      : locale === "bn"
                      ? "আরও কোড লোড করুন"
                      : "Load More Active Codes"}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer locale={locale} />
      <ShareModal
        locale={locale}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onCodeAdded={(c) => setCodes((prev) => [c, ...prev])}
      />
      <ToastContainer />
      <AutoStructuredData locale={locale} />
    </div>
  );
}
