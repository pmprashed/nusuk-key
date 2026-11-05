"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { getMySubmissions, MySubmission } from "@/lib/storage";

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface UserCodeBannerProps {
  locale: Locale;
  onAddAnother: () => void;
  latestSubmittedCode?: string;
}

export function UserCodeBanner({ locale, onAddAnother, latestSubmittedCode }: UserCodeBannerProps) {
  const t = getDictionary(locale);
  const [submission, setSubmission] = useState<MySubmission | null>(null);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    if (latestSubmittedCode) {
      setSubmission({ code: latestSubmittedCode, submittedAt: Date.now() });
      return;
    }
    const subs = getMySubmissions();
    if (subs.length > 0) {
      setSubmission(subs[0]);
    }
  }, [latestSubmittedCode]);

  // Live timer for elapsed time
  useEffect(() => {
    if (!submission) return;
    const calc = () => {
      const diff = Math.max(0, Date.now() - (submission.submittedAt || Date.now()));
      setElapsedMinutes(Math.floor(diff / 60000));
    };
    calc();
    const timer = setInterval(calc, 10000);
    return () => clearInterval(timer);
  }, [submission]);

  if (!submission) return null;

  const handleWhatsAppShare = () => {
    const text =
      locale === "ar"
        ? `شارك في مسابقة العمرة في تطبيق نسك واستخدم رمزي للحصول على مفتاح إضافي: ${submission.code}`
        : `Join the Nusuk Umrah competition and use my invite code for an extra key: ${submission.code}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const timeLabel =
    elapsedMinutes < 1
      ? locale === "ar" ? "شاركها اليوم: الآن" : "Share it today: just now"
      : locale === "ar"
        ? `شاركها اليوم: منذ ${elapsedMinutes} دقيقة`
        : `Share it today: ${elapsedMinutes}m ago`;

  return (
    <div className="mb-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-bold text-gray-900 font-mono flex items-center gap-2">
              <span>{submission.code}</span>
              <span className="text-xs font-sans font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {locale === "ar" ? "مدرج الآن" : "is listed"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              {timeLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{t.shareModal.whatsappBtn}</span>
          </button>
          <button
            onClick={onAddAnother}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.shareModal.addAnotherBtn}</span>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-center gap-2 text-xs text-gray-600">
        <div className="flex -space-x-1.5 rtl:space-x-reverse overflow-hidden">
          <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-emerald-300 text-center text-[10px] leading-5 font-bold text-emerald-800">1</div>
          <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-emerald-200 text-center text-[10px] leading-5 font-bold text-emerald-800">2</div>
          <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-emerald-100 text-center text-[10px] leading-5 font-bold text-emerald-800">3</div>
        </div>
        <span className="font-medium text-emerald-900">
          {t.shareModal.peopleHelped.replace("{{count}}", "0")}
        </span>
      </div>
    </div>
  );
}
