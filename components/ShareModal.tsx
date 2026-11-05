"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { CodeItem } from "@/lib/types";
import { saveMySubmission } from "@/lib/storage";
import { INITIAL_CODES_DATA } from "@/lib/initial-codes";
import { WhatsAppIcon } from "./UserCodeBanner";

interface ShareModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
  onCodeAdded: (code: CodeItem) => void;
}

export function ShareModal({ locale, isOpen, onClose, onCodeAdded }: ShareModalProps) {
  const t = getDictionary(locale);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
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
          name: name.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError(t.shareModal.errorDuplicate);
        } else if (res.status === 429) {
          setError(t.shareModal.errorLimit);
        } else {
          setError(data.error || t.shareModal.errorGeneric);
        }
        return;
      }

      const createdCode = data.code as CodeItem;
      saveMySubmission(createdCode.code);
      setSuccessCode(createdCode);
      onCodeAdded(createdCode);
    } catch (err) {
      console.error("Error submitting code:", err);
      setError(t.shareModal.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForAnother = () => {
    setText("");
    setName("");
    setError(null);
    setSuccessCode(null);
  };

  const handleWhatsAppShare = () => {
    if (!successCode) return;
    const shareText =
      locale === "ar"
        ? `شارك في مسابقة العمرة في تطبيق نسك واستخدم رمزي للحصول على مفتاح إضافي: ${successCode.code}`
        : `Join the Nusuk Umrah competition and use my invite code for an extra key: ${successCode.code}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {successCode ? (
          <div className="text-center py-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {t.shareModal.successTitle}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {t.shareModal.successCode.replace("{{code}}", successCode.code)}
            </p>

            <div className="inline-block px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-xl font-bold text-emerald-900 mb-6 select-all">
              {successCode.code}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{t.shareModal.whatsappBtn}</span>
              </button>

              <button
                onClick={handleResetForAnother}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.shareModal.addAnotherBtn}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-800"
              >
                {t.shareModal.doneBtn}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Send className="w-4 h-4 -rotate-45" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                {t.shareModal.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">
              {t.shareModal.description}
            </p>

            {error && (
              <div className="mb-4 flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  {t.shareModal.textLabel}
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t.shareModal.textPlaceholder}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 text-gray-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  {t.shareModal.nameLabel}
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.shareModal.namePlaceholder}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs sm:text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 text-gray-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <span>{loading ? t.shareModal.submitting : t.shareModal.submitBtn}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
