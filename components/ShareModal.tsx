"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, Plus, ChevronDown } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { CodeItem } from "@/lib/types";
import { saveMySubmission } from "@/lib/storage";
import { INITIAL_CODES_DATA } from "@/lib/initial-codes";
import { COUNTRIES_LIST, CountryInfo } from "@/lib/countries";
import { WhatsAppIcon } from "./UserCodeBanner";

interface ShareModalProps {
  locale?: Locale;
  isOpen: boolean;
  onClose: () => void;
  onCodeAdded: (code: CodeItem) => void;
}

export function ShareModal({ locale: propLocale, isOpen, onClose, onCodeAdded }: ShareModalProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const [text, setText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES_LIST[1]); // Default BD
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<CodeItem | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const match = text.match(/NG-[A-Za-z0-9]{8}/i);
    if (!match) {
      setError(t.shareModal.errorNoCode);
      return;
    }

    const extractedCode = match[0].toUpperCase();
    if (INITIAL_CODES_DATA.some((c) => c.toUpperCase() === extractedCode)) {
      setError(t.shareModal.errorDuplicate);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          country: selectedCountry.code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "duplicate") {
          setError(t.shareModal.errorDuplicate);
        } else if (data.error === "limit_exceeded") {
          setError(t.shareModal.errorLimit || "You have reached the daily submission limit (10 codes per day)");
        } else {
          setError(t.shareModal.errorGeneric);
        }
        return;
      }

      if (data.code) {
        saveMySubmission(data.code.code);
        setSuccessCode(data.code);
        onCodeAdded(data.code);
      }
    } catch {
      setError(t.shareModal.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setSelectedCountry(COUNTRIES_LIST[1]);
    setError(null);
    setSuccessCode(null);
  };

  const shareText = successCode
    ? t.userCodeBanner.whatsappShareText.replace("{{code}}", successCode.code)
    : "";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {successCode ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t.shareModal.successTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {t.shareModal.successDesc}
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center mb-6">
              <span className="font-mono font-black text-2xl text-emerald-950 tracking-wider">
                {successCode.code}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{t.userCodeBanner.shareWhatsapp}</span>
              </a>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.userCodeBanner.addAnother}</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-1">
              {locale === "ar" ? "أضف مفتاح نسك" : locale === "bn" ? "নুসুক কি যোগ করুন" : "Submit Nusuk Key"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-5">
              {locale === "ar"
                ? "اكسب +1 مفتاح إضافي لك وللمعتمر الذي يستخدمه"
                : locale === "bn"
                ? "আপনার এবং ব্যবহারকারীর উভয়ের জন্য +১ অতিরিক্ত কি অর্জন করুন"
                : "Earn +1 key for you & the pilgrim who uses it"}
            </p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {locale === "ar" ? "رمز أو رابط نسك" : locale === "bn" ? "নুসুক কি বা লিঙ্ক" : "Nusuk Key or Link"}
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="NG-XXXXXXXX or paste invite link"
                  required
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm font-mono placeholder:font-sans transition-all outline-hidden text-gray-900"
                />
              </div>

              {/* Nationality Selector */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {locale === "ar" ? "الجنسية" : locale === "bn" ? "জাতীয়তা" : "Nationality (Optional)"}
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white hover:border-emerald-500 text-sm font-semibold text-gray-800 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{selectedCountry.flag}</span>
                    <span className="font-bold text-gray-900">{selectedCountry.name}</span>
                    <span className="text-xs text-gray-400 font-mono">({selectedCountry.code})</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white rounded-xl shadow-xl border border-gray-200 p-2 max-h-48 overflow-y-auto">
                    {COUNTRIES_LIST.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
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
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 -rotate-45" />
                  <span>{loading ? (t.common.loading || "Submitting...") : (t.shareModal.submitBtn || "Submit Key")}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
