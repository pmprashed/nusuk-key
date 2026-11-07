"use client";

import { useState, useEffect } from "react";
import { Key, Sparkles, Check, ChevronDown, X, ShieldCheck } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { COUNTRIES_LIST, CountryInfo } from "@/lib/countries";
import { saveMySubmission, getMySubmissions } from "@/lib/storage";
import { CodeItem } from "@/lib/types";
import { showToast } from "./Toast";

interface SubmitNusukKeyCardProps {
  locale?: Locale;
  onCodeAdded?: (code: CodeItem) => void;
}

export function SubmitNusukKeyCard({ locale: propLocale, onCodeAdded }: SubmitNusukKeyCardProps) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;

  const [rawText, setRawText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES_LIST[1]); // Default BD Bangladesh
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [helpedCount, setHelpedCount] = useState(0);

  useEffect(() => {
    try {
      const mySubs = getMySubmissions();
      setHelpedCount(mySubs.length);
    } catch {}
  }, []);

  const filteredCountries = COUNTRIES_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) {
      showToast("Please enter your Nusuk key or paste the link", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: rawText.trim(),
          country: selectedCountry.code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes("already listed") || res.status === 409) {
          showToast("This key is already in the rotation list!", "info");
        } else if (data.error?.includes("No valid Nusuk code")) {
          showToast("Invalid code format. Code must start with NG- followed by 8 characters.", "error");
        } else if (data.error?.includes("Daily limit")) {
          showToast("Daily limit reached: Maximum 10 codes per 24 hours.", "error");
        } else {
          showToast(data.error || "Failed to submit code.", "error");
        }
        return;
      }

      if (data.code) {
        saveMySubmission(data.code.code);
        setHelpedCount((prev) => prev + 1);
        setRawText("");
        showToast("Key successfully submitted to community rotation! ✨", "success");
        if (onCodeAdded) {
          onCodeAdded(data.code);
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Network error submitting key. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 p-5 sm:p-6 shadow-xl relative transition-all">
      {/* Header with circular key icon */}
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-[#062413] text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
          <Key className="w-5 h-5 -rotate-45" />
        </div>
        <div>
          <h2 className="text-lg font-black text-gray-900 flex items-center gap-1.5 leading-snug">
            <span>{locale === "ar" ? "أضف مفتاح نسك" : locale === "bn" ? "নুসুক কি জমা দিন" : "Submit Nusuk Key"}</span>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
          </h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            {locale === "ar"
              ? "اكسب +1 مفتاح إضافي لك وللمعتمر الذي يستخدمه"
              : locale === "bn"
              ? "আপনার এবং ব্যবহারকারীর উভয়ের জন্য +১ অতিরিক্ত কি অর্জন করুন"
              : "Earn +1 key for you & the pilgrim who uses it"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Field 1: Nusuk Key or Link */}
        <div>
          <div className="flex items-center justify-between mb-1.5 text-xs font-semibold text-gray-700">
            <label className="flex items-center gap-1">
              <span>🔑</span>
              <span>{locale === "ar" ? "رمز أو رابط نسك" : locale === "bn" ? "নুসুক কি বা লিঙ্ক" : "Nusuk Key or Link"}</span>
            </label>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {locale === "ar" ? "مطلوب" : locale === "bn" ? "প্রয়োজনীয়" : "Required"}
            </span>
          </div>
          <input
            type="text"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="NG-XXXXXXXX or paste invite link"
            className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50/60 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-mono placeholder:text-gray-400 transition-all outline-hidden text-gray-900"
            required
          />
        </div>

        {/* Field 2: Nationality Dropdown */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5 text-xs font-semibold text-gray-700">
            <label className="flex items-center gap-1">
              <span>🌐</span>
              <span>{locale === "ar" ? "الجنسية" : locale === "bn" ? "জাতীয়তা" : "Nationality"}</span>
            </label>
            <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
              {locale === "ar" ? "اختياري" : locale === "bn" ? "ঐচ্ছিক" : "Optional"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-emerald-400 text-xs font-semibold text-gray-800 transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{selectedCountry.flag}</span>
              <span className="font-bold text-gray-900">{selectedCountry.name}</span>
              <span className="text-[11px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                {selectedCountry.code}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              {selectedCountry.code !== "GLOBAL" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountry(COUNTRIES_LIST[0]);
                  }}
                  className="hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white rounded-xl shadow-xl border border-gray-200 p-2 max-h-56 overflow-y-auto">
              <input
                type="text"
                placeholder="Search country..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 mb-1.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-emerald-500 text-gray-800"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="space-y-0.5">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsDropdownOpen(false);
                      setSearchFilter("");
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedCountry.code === c.code
                        ? "bg-emerald-50 text-emerald-950 font-bold"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{c.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d4f2b] via-[#116337] to-[#157743] hover:from-[#0a4023] hover:to-[#0f6036] active:scale-[0.99] text-white px-5 py-3.5 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer border border-emerald-400/30"
        >
          <span>+</span>
          <span>
            {submitting
              ? "Submitting..."
              : locale === "ar"
              ? "إضافة مفتاح نسك"
              : locale === "bn"
              ? "নুসুক কি যোগ করুন"
              : "Submit Nusuk Key"}
          </span>
        </button>
      </form>

      {/* Footer helper */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{locale === "ar" ? "أشخاص ساعدتهم:" : locale === "bn" ? "সাহায্য পেয়েছেন:" : "People you helped:"}</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-gray-800">
          <span className="text-amber-500">🔑🔑🔑</span>
          <span>{helpedCount}</span>
        </div>
      </div>
    </div>
  );
}
