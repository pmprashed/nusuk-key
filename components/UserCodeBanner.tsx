"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { getMySubmissions, MySubmission } from "@/lib/storage";

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface UserCodeBannerProps {
  locale?: Locale;
  onAddAnother: () => void;
  latestSubmittedCode?: string;
}

export function UserCodeBanner({ locale: propLocale, onAddAnother, latestSubmittedCode }: UserCodeBannerProps) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

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

  const shareText = t.userCodeBanner.whatsappShareText.replace("{{code}}", submission.code);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="rounded-3xl bg-emerald-50/90 border border-emerald-200/90 p-4 sm:p-5 mb-6 text-emerald-950 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-emerald-950">
                {t.userCodeBanner.title}
              </span>
              <span className="font-mono font-black text-sm bg-white border border-emerald-300 px-2 py-0.5 rounded-md text-emerald-900 select-all shadow-xs">
                {submission.code}
              </span>
            </div>
            <p className="text-xs text-emerald-800/80 mt-1 font-medium">
              {t.userCodeBanner.inRotation} · {elapsedMinutes}m ago
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>{t.userCodeBanner.shareWhatsapp}</span>
          </a>

          <button
            onClick={onAddAnother}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.userCodeBanner.addAnother}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
