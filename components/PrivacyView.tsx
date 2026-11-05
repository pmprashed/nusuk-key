"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";

export function PrivacyView({ locale }: { locale: Locale }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans">
      <Header locale={locale} onOpenShareModal={() => setIsShareModalOpen(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{locale === "ar" ? "الخصوصية والأمان" : "Privacy & Security"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {locale === "ar" ? "آخر تحديث: 5 نوفمبر 2026" : "Last updated: 5 November 2026"}
        </p>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {locale === "ar" ? "1. مشروع مجتمعي مستقل" : "1. Independent Community Project"}
            </h2>
            <p>
              {locale === "ar"
                ? "موقع «مفاتيح نسك» هو أداة مجتمعية مستقلة غير تجارية لمساعدة المشاركين في مسابقة العمرة على تبادل رموز الإحالة. هذا الموقع لا يتبع لوزارة الحج والعمرة أو تطبيق نسك الرسمي بأي شكل من الأشكال."
                : "NusukKey is an independent, non-commercial community tool created to assist participants of the Umrah Competition in exchanging referral codes. This website is not affiliated with, endorsed by, or connected to Nusuk or the Ministry of Hajj and Umrah."}
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {locale === "ar" ? "2. عدم جمع بيانات الحسابات أو كلمات المرور" : "2. No Passwords or Credentials Collected"}
            </h2>
            <p>
              {locale === "ar"
                ? "نحن لا نطلب ولا نخزن أبداً كلمات المرور، أو رموز التحقق (OTP)، أو أرقام الهواتف، أو الحسابات الشخصية الخاصة بك في تطبيق نسك. احذر من أي شخص يطلب منك تلك البيانات."
                : "We never ask for, collect, or store your Nusuk account passwords, one-time verification codes (OTP), phone numbers, or credentials. You should never disclose your Nusuk credentials to any website or third party."}
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {locale === "ar" ? "3. التشفير والحماية من إساءة الاستخدام" : "3. Hashed Device Identifiers for Abuse Prevention"}
            </h2>
            <p>
              {locale === "ar"
                ? "لمنع الإزعاج والتكرار المفرط للرموز، نقوم بتشفير عنوان IP ومعرّف المتصفح عبر خوارزمية SHA-256 مع ملح عشوائي سري (Salt). لا يتم حفظ عناوين IP الحقيقية أبداً في قاعدة بياناتنا."
                : "To prevent spam and enforce fair rotation limits, IP addresses and browser user-agent headers are combined with a private salt and cryptographically hashed using SHA-256. Raw IP addresses are never stored in our database."}
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {locale === "ar" ? "4. التخزين المحلي على جهازك (LocalStorage)" : "4. Local Storage on Your Device"}
            </h2>
            <p>
              {locale === "ar"
                ? "يتم حفظ الرموز التي نسختها على متصفح جهازك فقط عبر تقنية التخزين المحلي (LocalStorage) لتسهيل تجربتك ومنع تكرار الرموز غير الصالحة، دون إرسالها إلى خوادمنا."
                : "Codes you copy are stored strictly on your local browser using HTML5 localStorage. This enables the 'Codes you copy' box on your device and ensures bad codes are hidden from you, without storing your history on our server."}
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {locale === "ar" ? "5. عدم استخدام ملفات تعريف ارتباط للإعلانات" : "5. No Advertising or Tracking Cookies"}
            </h2>
            <p>
              {locale === "ar"
                ? "لا نستخدم ملفات تعريف الارتباط الإعلانية أو أدوات التتبع الخارجية للمستخدمين."
                : "NusukKey does not use tracking cookies or third-party advertising networks."}
            </p>
          </section>
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
