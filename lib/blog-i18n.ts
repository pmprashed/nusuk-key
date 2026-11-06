import { Locale } from "./i18n";
import { BlogPost } from "./blog-data";

export interface LocalizedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  readGuideText: string;
}

// Translations of common categories
const CATEGORIES_BY_LOCALE: Record<string, Partial<Record<Locale, string>>> = {
  "Key Strategy": {
    ar: "استراتيجية المفاتيح",
    bn: "কি কৌশল ও ট্রিকস",
    ur: "چابی کی حکمت عملی",
    id: "Strategi Kunci",
    tr: "Anahtar Stratejisi",
    hi: "कीज़ रणनीति",
    fr: "Stratégie de Clés",
    es: "Estrategia de Llaves",
    de: "Schlüssel-Strategie",
    fa: "استراتژی کلیدها",
  },
  "Troubleshooting": {
    ar: "حلول المشاكل",
    bn: "সমস্যা সমাধান",
    ur: "خرابی کا ازالہ",
    id: "Pemecahan Masalah",
    tr: "Sorun Giderme",
    hi: "समस्या निवारण",
    fr: "Dépannage",
    es: "Solución de Problemas",
    de: "Fehlerbehebung",
    fa: "حل مشکلات",
  },
  "App Guides": {
    ar: "دليل التطبيق",
    bn: "অ্যাপ গাইড",
    ur: "ایپ گائیڈ",
    id: "Panduan Aplikasi",
    tr: "Uygulama Rehberi",
    hi: "ऐप गाइड",
    fr: "Guides de l'App",
    es: "Guías de la App",
    de: "App-Anleitungen",
    fa: "راهنمای برنامه",
  },
  "Competition News": {
    ar: "أخبار المسابقة",
    bn: "প্রতিযোগিতা আপডেট",
    ur: "مقابلے کی خبریں",
    id: "Berita Kompetisi",
    tr: "Yarışma Haberleri",
    hi: "प्रतियोगिता समाचार",
    fr: "Actualités du Concours",
    es: "Noticias del Concurso",
    de: "Wettbewerbs-News",
    fa: "اخبار مسابقه",
  },
  "Community Codes": {
    ar: "رموز المجتمع",
    bn: "কমিউনিটি কোড",
    ur: "کمیونٹی کوڈز",
    id: "Kode Komunitas",
    tr: "Topluluk Kodları",
    hi: "कम्युनिटी कोड्स",
    fr: "Codes Communautaires",
    es: "Códigos de la Comunidad",
    de: "Community-Codes",
    fa: "کدهای جامعه",
  },
  "Pilgrim Tips": {
    ar: "نصائح المعتمر",
    bn: "হাজীদের জন্য পরামর্শ",
    ur: "حجاج کے لیے تجاویز",
    id: "Tips Jemaah",
    tr: "Hacı İpuçları",
    hi: "तीर्थयात्री टिप्स",
    fr: "Conseils aux Pèlerins",
    es: "Consejos para Peregrinos",
    de: "Pilger-Tipps",
    fa: "نکات زائران",
  },
};

const READ_GUIDE_TEXT: Record<Locale, string> = {
  en: "Read Guide →",
  ar: "قراءة الدليل ←",
  bn: "সম্পূর্ণ গাইড পড়ুন →",
  ur: "مکمل گائیڈ پڑھیں ←",
  id: "Baca Panduan →",
  tr: "Rehberi Oku →",
  ms: "Baca Panduan →",
  fr: "Lire le Guide →",
  es: "Leer Guía →",
  de: "Anleitung lesen →",
  ru: "Читать руководство →",
  hi: "पूरी गाइड पढ़ें →",
  fa: "خواندن راهنما ←",
  zh: "阅读指南 →",
  ja: "ガイドを読む →",
  ko: "가이드 읽기 →",
  pt: "Ler Guia →",
  it: "Leggi la Guida →",
  nl: "Lees Gids →",
  sw: "Soma Mwongozo →",
  uz: "Qo‘llanmani o‘qish →",
};

const READ_TIME_MAP: Record<Locale, (mins: number) => string> = {
  en: (m) => `${m} min read`,
  ar: (m) => `قراءة في ${m} دقائق`,
  bn: (m) => `${m} মিনিট পাঠ`,
  ur: (m) => `${m} منٹ کا مطالعہ`,
  id: (m) => `${m} mnt baca`,
  tr: (m) => `${m} dk okuma`,
  ms: (m) => `${m} min baca`,
  fr: (m) => `${m} min de lecture`,
  es: (m) => `${m} min de lectura`,
  de: (m) => `${m} Min. Lesezeit`,
  ru: (m) => `${m} мин чтения`,
  hi: (m) => `${m} मिनट का पाठ`,
  fa: (m) => `${m} دقیقه مطالعه`,
  zh: (m) => `${m} 分钟阅读`,
  ja: (m) => `${m} 分で読める`,
  ko: (m) => `${m} 분 분량`,
  pt: (m) => `${m} min de leitura`,
  it: (m) => `${m} min di lettura`,
  nl: (m) => `${m} min leestijd`,
  sw: (m) => `dakika ${m} kusoma`,
  uz: (m) => `${m} daqiqa o‘qish`,
};

// Key phrases to localize titles naturally
function translateTitle(titleEn: string, titleAr: string, locale: Locale): string {
  if (locale === "en") return titleEn;
  if (locale === "ar") return titleAr;

  // Bengali translation mappings
  if (locale === "bn") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "নুসুক ওমরাহ প্রতিযোগিতা ২০২৬-এ কীভাবে ফ্রি চাবি পাবেন");
    t = t.replace(/How to Fix 'Code Not Working' or 'Already Used' in Nusuk App/i, "নুসুক অ্যাপে 'Code Not Working' বা 'Already Used' সমস্যার সহজ সমাধান");
    t = t.replace(/Where to Find Your Own Nusuk Referral Code to Share/i, "অন্যদের সাথে শেয়ার করার জন্য আপনার নিজস্ব নুসুক রেফারেল কোড কোথায় পাবেন");
    t = t.replace(/Nusuk App Complete Guide: Services, Permits & Competition Rules/i, "নুসুক অ্যাপের পূর্ণাঙ্গ গাইড: পারমিট, সার্ভিস ও প্রতিযোগিতা নিয়মাবলী");
    t = t.replace(/How Saudi Vision 2030 Digitized the Pilgrimage Experience with Nusuk/i, "সৌদি ভিশন ২০৩০ কীভাবে নুসুকের মাধ্যমে তীর্থযাত্রার অভিজ্ঞতা ডিজিটাল করেছে");
    t = t.replace(/Packing Checklist for First-Time Umrah Pilgrims in 2026/i, "২০২৬ সালে প্রথমবার ওমরাহ পালনকারীদের জন্য প্রয়োজনীয় প্যাকিং চেকলিস্ট");
    t = t.replace(/How to Use the Nusuk Direct Link Feature for Faster Entry/i, "দ্রুত প্রবেশের জন্য কীভাবে নুসুক ডিরেক্ট লিঙ্ক ফিচার ব্যবহার করবেন");
    t = t.replace(/Understanding Nusuk Key Cooldown: How Long Do You Wait\?/i, "নুসুক কি কুলডাউন সময়কাল: আপনাকে কতক্ষণ অপেক্ষা করতে হবে?");
    t = t.replace(/Free Nusuk Keys/gi, "ফ্রি নুসুক কি");
    t = t.replace(/Complete Beginner Guide/gi, "নতুনদের জন্য পূর্ণাঙ্গ গাইড");
    t = t.replace(/Step-by-Step Strategy/gi, "ধাপে ধাপে কৌশল");
    t = t.replace(/to Collect Maximum/gi, "সর্বোচ্চ সংগ্রহের জন্য");
    t = t.replace(/Umrah Competition 2026/gi, "ওমরাহ প্রতিযোগিতা ২০২৬");
    t = t.replace(/Referral Codes/gi, "রেফারেল কোড");
    t = t.replace(/in Nusuk App/gi, "নুসুক অ্যাপে");
    t = t.replace(/How to/gi, "কীভাবে");
    return t;
  }

  // Urdu translation mappings
  if (locale === "ur") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "عمرہ مقابلہ 2026 میں نسک کی مفت چابیاں کیسے حاصل کریں");
    t = t.replace(/How to Fix 'Code Not Working' or 'Already Used' in Nusuk App/i, "نسک ایپ میں 'کوڈ کام نہیں کر رہا' یا 'پہلے سے استعمال شدہ' کا حل");
    t = t.replace(/Where to Find Your Own Nusuk Referral Code to Share/i, "شیئر کرنے کے لیے اپنا نسک ریفرل کوڈ کہاں تلاش کریں");
    t = t.replace(/Nusuk App Complete Guide: Services, Permits & Competition Rules/i, "نسک ایپ مکمل گائیڈ: پرمٹ، خدمات اور مقابلے کے اصول");
    t = t.replace(/Free Nusuk Keys/gi, "مفت نسک چابیاں");
    t = t.replace(/Step-by-Step Strategy/gi, "مرحلہ وار حکمت عملی");
    t = t.replace(/Umrah Competition 2026/gi, "عمرہ مقابلہ 2026");
    t = t.replace(/Referral Codes/gi, "ریفرل کوڈز");
    return t;
  }

  // Indonesian translation mappings
  if (locale === "id") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "Cara Mendapatkan Kunci Nusuk Gratis untuk Kompetisi Umrah 2026");
    t = t.replace(/How to Fix 'Code Not Working' or 'Already Used' in Nusuk App/i, "Cara Mengatasi Kode Tidak Berfungsi atau Sudah Digunakan di Aplikasi Nusuk");
    t = t.replace(/Where to Find Your Own Nusuk Referral Code to Share/i, "Tempat Menemukan Kode Referral Nusuk Pribadi Anda untuk Dibagikan");
    t = t.replace(/Free Nusuk Keys/gi, "Kunci Nusuk Gratis");
    t = t.replace(/Complete Beginner Guide/gi, "Panduan Lengkap Pemula");
    t = t.replace(/Umrah Competition 2026/gi, "Kompetisi Umrah 2026");
    t = t.replace(/Referral Codes/gi, "Kode Referral");
    return t;
  }

  // Turkish translation mappings
  if (locale === "tr") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "2026 Umre Yarışması İçin Ücretsiz Nusuk Anahtarları Nasıl Alınır");
    t = t.replace(/How to Fix 'Code Not Working' or 'Already Used' in Nusuk App/i, "Nusuk Uygulamasında Kod Çalışmıyor veya Zaten Kullanılmış Hatası Çözümü");
    t = t.replace(/Free Nusuk Keys/gi, "Ücretsiz Nusuk Anahtarları");
    t = t.replace(/Umrah Competition 2026/gi, "Umre Yarışması 2026");
    t = t.replace(/Referral Codes/gi, "Referans Kodları");
    return t;
  }

  // French translation mappings
  if (locale === "fr") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "Comment obtenir des clés Nusuk gratuites pour le concours Omra 2026");
    t = t.replace(/How to Fix 'Code Not Working' or 'Already Used' in Nusuk App/i, "Résoudre l'erreur 'Code déjà utilisé' ou 'Invalide' dans l'application Nusuk");
    t = t.replace(/Free Nusuk Keys/gi, "Clés Nusuk Gratuites");
    t = t.replace(/Umrah Competition 2026/gi, "Concours Omra 2026");
    t = t.replace(/Referral Codes/gi, "Codes de Parrainage");
    return t;
  }

  // Spanish translation mappings
  if (locale === "es") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "Cómo obtener llaves Nusuk gratis para el concurso de Umrah 2026");
    t = t.replace(/How to Fix 'Code Not Working' or 'Already Used' in Nusuk App/i, "Solución al error 'Código ya usado' o 'Inválido' en la app Nusuk");
    t = t.replace(/Free Nusuk Keys/gi, "Llaves Nusuk Gratis");
    t = t.replace(/Umrah Competition 2026/gi, "Concurso de Umrah 2026");
    t = t.replace(/Referral Codes/gi, "Códigos de Referido");
    return t;
  }

  // Hindi translation mappings
  if (locale === "hi") {
    let t = titleEn;
    t = t.replace(/How to Get Free Nusuk Keys for the Umrah Competition 2026/i, "उमरा प्रतियोगिता 2026 के लिए मुफ्त नुसुक कीज़ कैसे प्राप्त करें");
    t = t.replace(/Free Nusuk Keys/gi, "मुफ्त नुसुक कीज़");
    t = t.replace(/Umrah Competition 2026/gi, "उमरा प्रतियोगिता 2026");
    t = t.replace(/Referral Codes/gi, "रेफरल कोड");
    return t;
  }

  // Default fallback to English
  return titleEn;
}

function translateExcerpt(post: BlogPost, locale: Locale): string {
  if (locale === "ar") return post.excerptAr;
  if (locale === "en") return post.excerptEn;

  if (locale === "bn") {
    return `নুসুক ওমরাহ প্রতিযোগিতা এবং রেফারেল কি সম্পর্কিত বিস্তারিত সহায়িকা। জানুন কীভাবে সক্রিয় NG- কোড ব্যবহার করে দ্রুত ফ্রি কি সংগ্রহ করবেন।`;
  }
  if (locale === "ur") {
    return `نسک عمرہ مقابلے کے لیے ایک جامع گائیڈ۔ جانیں کہ کس طرح فعال NG- ریفرل کوڈز استعمال کر کے مفت چابیاں حاصل کی جائیں۔`;
  }
  if (locale === "id") {
    return `Panduan lengkap untuk kompetisi Umrah Nusuk dan kode referral. Pelajari cara mengumpulkan kunci gratis menggunakan kode NG- aktif.`;
  }
  if (locale === "tr") {
    return `Nusuk Umre yarışması ve referans kodları için ayrıntılı rehber. Aktif NG- kodlarını kullanarak ücretsiz anahtarların nasıl alınacağını öğrenin.`;
  }
  if (locale === "fr") {
    return `Guide complet pour le concours Omra Nusuk et les codes de parrainage. Découvrez comment obtenir des clés gratuites avec des codes NG- actifs.`;
  }
  if (locale === "es") {
    return `Guía completa para el concurso de Umrah de Nusuk y códigos de referido. Aprende a conseguir llaves gratis usando códigos NG- activos.`;
  }
  if (locale === "hi") {
    return `नुसुक उमरा प्रतियोगिता और रेफरल कोड के लिए संपूर्ण गाइड। जानें कि सक्रिय NG- कोड का उपयोग करके मुफ्त कीज़ कैसे प्राप्त करें।`;
  }

  return post.excerptEn;
}

function translateContent(post: BlogPost, locale: Locale): string[] {
  if (locale === "ar") return post.contentAr;
  if (locale === "en") return post.contentEn;

  if (locale === "bn") {
    return [
      `নুসুক ওমরাহ প্রতিযোগিতা ২০২৬ বিশ্বজুড়ে ওমরাহযাত্রীদের জন্য একটি অভূতপূর্ব সুযোগ তৈরি করেছে। প্রতিদিন অংশগ্রহণকারীরা সক্রিয় রেফারেল কোড দিয়ে অতিরিক্ত চাবি আনলক করতে পারছেন।`,
      `মূল কৌশল: নুসুক অ্যাপে আপনার অ্যাকাউন্টে দেওয়া NG- কোডটি অন্যদের সাথে শেয়ার করুন এবং সাইট থেকে প্রাপ্ত তাজা কোডগুলো অ্যাপের Keys ট্যাবে প্রবেশ করিয়ে নতুন কি আনলক করুন।`,
      `কার্যকর পদক্ষেপ: কখনোই পূর্বে ব্যবহার করা কোড পুনরায় ব্যবহার করবেন না। নুসুককী প্ল্যাটফর্ম প্রতিমুহূর্তে নতুন কোড সরবরাহ করে যাতে আপনি নির্ভুলভাবে প্রতিদিন সর্বোচ্চ চাবি সংগ্রহ করতে পারেন।`,
      `সৌদি আরব সময়সূচি অনুযায়ী প্রতিদিনের ড্র অনুষ্ঠিত হয়, তাই সময়মতো কোড সংগ্রহ করে আপনার অংশগ্রহণ নিশ্চিত করুন।`
    ];
  }

  if (locale === "ur") {
    return [
      `نسک عمرہ مقابلہ 2026 دنیا بھر کے زائرین کے لیے ایک شاندار موقع ہے۔ فعال ریفرل کوڈز کا استعمال کر کے آپ روزانہ مفت چابیاں حاصل کر سکتے ہیں۔`,
      `بنیادی طریقہ: اپنے نسک ایپ میں موجود NG- ریفرل کوڈ کو دوسروں کے ساتھ شیئر کریں اور ہماری سائٹ سے حاصل کردہ تازہ کوڈز کو ایپ کے Keys سیکشن میں درج کریں۔`,
      `اہم نکتہ: پہلے سے استعمال شدہ کوڈ کو دوبارہ داخل نہ کریں۔ نسک کی پر ہر سیکنڈ تازہ کوڈز دستیاب ہوتے ہیں تاکہ آپ کو بلا تعطل کامیابی ملے۔`,
      `سعودی عرب کے معیاری وقت کے مطابق روزانہ قرعہ اندازی ہوتی ہے، اس لیے وقت پر اپنے کوڈز کا اندراج مکمل کریں۔`
    ];
  }

  if (locale === "id") {
    return [
      `Kompetisi Umrah Nusuk 2026 membuka kesempatan besar bagi jemaah di seluruh dunia untuk memenangkan paket perjalanan Umrah gratis dengan mengumpulkan kunci kompetisi.`,
      `Strategi utama: Setiap jemaah memiliki kode referral unik berformat NG-XXXXXXXX di aplikasi Nusuk. Masukkan kode baru di tab Kunci untuk mendapatkan progres tambahan.`,
      `Langkah praktis: Jangan gunakan kode yang sudah pernah Anda masukkan. Situs NusukKey menyediakan perputaran kode baru secara adil dan terus diperbarui.`,
      `Perhatikan waktu resmi Arab Saudi agar Anda dapat memasukkan kode pada jadwal pembagian kunci harian baru.`
    ];
  }

  if (locale === "tr") {
    return [
      `2026 Nusuk Umre Yarışması, dünya genelindeki hacı adaylarına ücretsiz Umre paketleri kazanma fırsatı sunmaktadır.`,
      `Önemli strateji: Nusuk uygulamasındaki Keys bölümüne yeni NG- kodları girerek çekiliş hakkı kazandıran anahtarları toplayın.`,
      `Pratik adım: Daha önce kullandığınız kodları tekrar girmeyin. NusukKey sistemi daima denenmiş ve aktif kodları sizlere sunar.`,
      `Suudi Arabistan saatine göre günlük kotalar yenilenmektedir, bu nedenle kodlarınızı vaktinde kullanmaya özen gösterin.`
    ];
  }

  if (locale === "fr") {
    return [
      `Le concours Omra Nusuk 2026 offre une opportunité exceptionnelle aux pèlerins du monde entier de remporter des voyages Omra tout compris.`,
      `Point clé : Utilisez des codes de parrainage NG- valides dans la section Clés de l'application officielle Nusuk pour accumuler des participations au tirage au sort quotidien.`,
      `Conseil pratique : Ne réutilisez jamais un code déjà enregistré. NusukKey assure une rotation équitable en temps réel pour vous garantir des clés valides.`,
      `Restez attentif aux horaires selon l'heure officielle d'Arabie Saoudite pour valider vos entrées avant la clôture quotidienne.`
    ];
  }

  if (locale === "es") {
    return [
      `El concurso de Umrah de Nusuk 2026 ofrece a participantes de todo el mundo la oportunidad de ganar viajes completos de peregrinación.`,
      `Estrategia clave: Introduce códigos de invitación NG- válidos en la pestaña de Llaves de la aplicación Nusuk para sumar participations adicionales al sorteo diario.`,
      `Paso práctico: Evita ingresar códigos repetidos. NusukKey rota códigos en tiempo real para que siempre recibas claves frescas.`,
      `Sigue el horario oficial de Arabia Saudita para asegurar tus entradas en cada jornada del concurso.`
    ];
  }

  return post.contentEn;
}

export function getLocalizedBlogPost(post: BlogPost, locale: Locale): LocalizedBlogPost {
  const readMins = parseInt(post.readTime) || 4;
  const timeFormatter = READ_TIME_MAP[locale] || READ_TIME_MAP.en;
  const rawCat = post.category || "Key Strategy";
  const categoryTrans = (CATEGORIES_BY_LOCALE[rawCat] && CATEGORIES_BY_LOCALE[rawCat]![locale]) || rawCat;

  return {
    slug: post.slug,
    title: translateTitle(post.titleEn, post.titleAr, locale),
    excerpt: translateExcerpt(post, locale),
    content: translateContent(post, locale),
    date: post.date,
    readTime: timeFormatter(readMins),
    category: categoryTrans,
    readGuideText: READ_GUIDE_TEXT[locale] || READ_GUIDE_TEXT.en,
  };
}
