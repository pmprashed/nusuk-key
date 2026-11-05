"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, AlertTriangle } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer, showToast } from "./Toast";

export function ContactView({ locale }: { locale: Locale }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      locale === "ar"
        ? "شكراً لتواصلك! تم استلام رسالتك."
        : "Thank you for reaching out! Your message was received.",
      "success"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{locale === "ar" ? "تواصل معنا" : "Contact"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {locale === "ar" ? "اتصل بنا" : "Contact Us"}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          {locale === "ar"
            ? "نحن نرحب بملاحظاتك واقتراحاتك لتحسين تجربة موقع «مفاتيح نسك»."
            : "We welcome your feedback and suggestions to make the NusukKey community experience better."}
        </p>

        {/* Official App Support Notice */}
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-5 sm:p-6 mb-8 text-amber-950">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed space-y-1">
              <p className="font-bold">
                {locale === "ar"
                  ? "هام: هل تواجه مشكلة داخل تطبيق نسك الرسمي؟"
                  : "Important: Need technical help with the official Nusuk app?"}
              </p>
              <p className="text-amber-900/90">
                {locale === "ar"
                  ? "موقع «مفاتيح نسك» هو موقع مجتمعي مستقل ولا يمكنه الوصول إلى حسابك في نسك. لمشاكل تسجيل الدخول أو تصاريح العمرة، يرجى الاتصال بالدعم الرسمي لنسك مباشرة على الرقم:"
                  : "NusukKey is an independent community website and cannot access or manage your Nusuk app account. For login, OTP or permit issues, contact the official Nusuk helpline directly at:"}
              </p>
              <div className="pt-2 flex items-center gap-2 font-mono font-bold text-base text-amber-950">
                <Phone className="w-4 h-4 text-amber-700" />
                <span>920002814</span>
              </div>
            </div>
          </div>
        </div>

        {/* Website Feedback Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-700" />
            <span>{locale === "ar" ? "ملاحظات حول موقع مفاتيح نسك" : "NusukKey Website Feedback"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            {locale === "ar"
              ? "للإبلاغ عن عطل في الموقع أو تقديم اقتراح لتحسين نظام التدوير:"
              : "To report website bugs or suggest improvements to the fair rotation:"}
          </p>

          {submitted ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-900">
              <p className="font-semibold text-sm">
                {locale === "ar"
                  ? "تم استلام رسالتك بنجاح! شكراً لمساعدتنا في تحسين الموقع."
                  : "Thank you for your feedback! Your message has been received."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  {locale === "ar" ? "الموضوع" : "Subject"}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={locale === "ar" ? "اقتراح، بلاغ عن خطأ..." : "Suggestion, bug report..."}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  {locale === "ar" ? "الرسالة" : "Message"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={locale === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors"
              >
                {locale === "ar" ? "إرسال الرسالة" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer locale={locale} />
      <ShareModal
        locale={locale}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onCodeAdded={() => {}}
      />
      <ToastContainer />
    </div>
  );
}
