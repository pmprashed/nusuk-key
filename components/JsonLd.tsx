import { Locale } from "@/lib/i18n";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    alternateName: ["Nusuk Key", "Nusuk Keys", "Nusuk Code", "كود نسك", "مفتاح نسك"],
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/codes?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AutoStructuredData({ locale }: { locale: Locale }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";
  const isAr = locale === "ar";

  const faqs: FaqItem[] = isAr
    ? [
        {
          question: "ما هو مفتاح نسك (Nusuk Key)؟",
          answer:
            "مفتاح نسك هو رمز دعوة وإحالة فريد (يبدأ بـ NG- متبوعاً بـ 8 خانات) يُستخدم في مسابقة العمرة بتطبيق نسك للحصول على مفاتيح إضافية وفرص فوز أكبر.",
        },
        {
          question: "كيف أحصل على كود نسك مجاني ونشط؟",
          answer:
            "يوفر موقع NusukKey تدويرًا عادلاً لرموز الإحالة المحدثة باستمرار. انسخ الكود مباشرة أو افتحه في تطبيق نسك بنقرة واحدة.",
        },
        {
          question: "ماذا أفعل إذا ظهر كود نسك غير صالح أو مستخدم؟",
          answer:
            "اضغط على زر الإبلاغ عن الرمز في الموقع لنتحقق منه ونستبعده فوراً، وسيزودك الموقع مباشرة بكود جديد ونشط لم يسبق استخدامه.",
        },
        {
          question: "هل يمكنني مشاركة رمز نسك الخاص بي؟",
          answer:
            "نعم، اضغط على 'شارك رمزك' واكتب كود NG- الخاص بك وسيتم إدراجه في قائمة التدوير العادل بين المعتمرين.",
        },
      ]
    : [
        {
          question: "What is a Nusuk Key and what is it used for?",
          answer:
            "A Nusuk Key is an official referral code (formatted like NG-XXXXXXXX) for the Nusuk Umrah Competition. Using a verified key unlocks bonus challenge keys to win free Umrah packages.",
        },
        {
          question: "How do I get free active Nusuk referral codes?",
          answer:
            "NusukKey provides a fair, real-time rotation system. Tap 'Copy' or 'Open in Nusuk' to claim the next fresh code without duplicates.",
        },
        {
          question: "Why does my Nusuk key say invalid or already used?",
          answer:
            "Some codes reach their maximum redemption limit on the official Nusuk app. If that happens, report the code on NusukKey to receive an immediate alternative fresh code.",
        },
        {
          question: "Can I share my own Nusuk referral key?",
          answer:
            "Yes! Click 'Share your code' to submit your NG- referral key and gain reciprocal keys from fellow pilgrims across the world.",
        },
      ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NusukKey - Nusuk Referral Hub",
    operatingSystem: "All",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2540",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <WebSiteJsonLd
        url={isAr ? `${siteUrl}/ar` : siteUrl}
        name={isAr ? "مفاتيح نسك - تدوير رموز إحالة مسابقة العمرة" : "NusukKey - Free Nusuk Referral Codes"}
        description={
          isAr
            ? "احصل على رموز إحالة مجانية ونشطة لمسابقة العمرة في تطبيق نسك مع فتح فوري وتدوير عادل."
            : "Get verified, fresh Nusuk referral codes for the official Umrah Challenge with fair rotation and instant deep link."
        }
      />
      <FaqJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
    </>
  );
}
