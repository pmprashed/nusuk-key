import { Locale } from "./i18n";

export interface FaqItem {
  q: string;
  a: string;
}

export const SEO_FAQS_BY_LOCALE: Record<Locale, FaqItem[]> = {
  en: [
    {
      q: "What is a Nusuk Key and how does the Umrah Challenge work?",
      a: "A Nusuk Key is an official referral code (formatted as NG-XXXXXXXX) for the Nusuk Umrah Competition. Entering a verified invite code awards both you and the sender bonus keys, increasing your winning odds for free Umrah packages."
    },
    {
      q: "How do I get fresh, working Nusuk referral codes?",
      a: "Our community platform constantly rotates verified Nusuk invite codes from pilgrims. Simply click 'Copy' or 'Open in Nusuk' to automatically open the deep link and apply the fresh code."
    },
    {
      q: "Why is a Nusuk code showing 'Already Used' or 'Invalid'?",
      a: "Referral codes in the Nusuk app have limited redemption quotas. When a code reaches its cap, tap the report flag and our system instantly serves a fresh, unexpired referral key."
    },
    {
      q: "How does NusukKey prevent showing duplicate codes?",
      a: "Our smart rotation engine tracks every code you have copied or interacted with. Once copied, that key will never be presented to you again, ensuring you always get fresh codes."
    }
  ],
  ar: [
    {
      q: "ما هو مفتاح نسك (Nusuk Key) وكيف تستفيد منه؟",
      a: "مفتاح نسك هو رمز دعوة فريد يبدأ بـ NG- متبوعاً بـ 8 خانات (مثال: NG-CXEVbXwR). يُستخدم داخل تطبيق نسك الرسمي في مسابقة العمرة للحصول على مفاتيح إضافية وزيادة فرص الفوز برحلة العمرة المجانية وتذاكر الطيران."
    },
    {
      q: "كيف أحصل على رموز إحالة نسك مجانية ونشطة؟",
      a: "موقعنا يوفر نظام تدوير عادل ومحدث لحظياً لرموز إحالة نسك الصالحة التي يشاركها المعتمرون. كل ما عليك هو الضغط على 'نسخ' أو 'فتح في نسك' وسيتم نقلك مباشرة للتطبيق مع تعبئة الرمز تلقائياً."
    },
    {
      q: "لماذا تظهر رسالة أن كود نسك غير صالح أو مستخدم؟",
      a: "كل رمز دعوة في تطبيق نسك له سعة محددة من الاستخدامات. إذا اكتمل عدد المسجلين بالرمز فإنه يتوقف. بمجرد إبلاغك عنه في الموقع نقوم باستبعاده وإظهار كود جديد نشط لم يكتمل بعد."
    },
    {
      q: "كيف أضمن عدم تكرار نفس الكود بعد نسخه؟",
      a: "يعتمد الموقع نظام تدوير ذكي يحفظ الرموز التي نسختها، بحيث لا يظهر لك نفس الرمز إطلاقاً مرة أخرى سواء في البطاقة الرئيسية أو القائمة أدناه، لضمان حصولك دائماً على رموز جديدة."
    }
  ],
  bn: [
    {
      q: "নুসুক কি (Nusuk Key) কী এবং ওমরাহ প্রতিযোগিতা কীভাবে কাজ করে?",
      a: "নুসুক কি হলো একটি অফিসিয়াল রেফারেল কোড (যেমন: NG-CXEVbXwR) যা নুসুক ওমরাহ প্রতিযোগিতায় ব্যবহৃত হয়। একটি সক্রিয় কোড প্রবেশ করালে আপনি ও কোড প্রদানকারী উভয়েই বোনাস কি পান, যা ফ্রি ওমরাহ প্যাকেজ জেতার সম্ভাবনা বাড়ায়।"
    },
    {
      q: "আমি কীভাবে নতুন ও কার্যকর নুসুক রেফারেল কোড পাব?",
      a: "আমাদের প্ল্যাটফর্ম হাজীদের শেয়ার করা সক্রিয় নুসুক কোডগুলো পর্যায়ক্রমে রোটেশন করে। শুধু 'কপি' বা 'নুসুকে খুলুন' বাটনে চাপ দিন, সরাসরি অ্যাপে গিয়ে কোডটি যুক্ত হবে।"
    },
    {
      q: "কেন নুসুক কোডে 'Already Used' বা 'Invalid' দেখায়?",
      a: "নুসুক অ্যাপে প্রতিটি কোডের ব্যবহারের নির্দিষ্ট সীমা থাকে। সীমা শেষ হলে রিপোর্ট করুন, আমাদের সিস্টেম সাথে সাথে নতুন আনইউজড কোড সরবরাহ করবে।"
    },
    {
      q: "একই কোড বারবার দেখানো কিভাবে রোধ করা হয়?",
      a: "আমাদের স্মার্ট রোটেশন ইঞ্জিন আপনার কপি করা প্রতিটি কোড সেভ রাখে। একবার কপি করলে সেই কোড আপনাকে আর কখনো দেখানো হবে না, ফলে আপনি সবসময় ফ্রেশ কোড পাবেন।"
    }
  ],
  ur: [
    {
      q: "نسک کی (Nusuk Key) کیا ہے اور عمرہ مقابلہ کیسے کام کرتا ہے؟",
      a: "نسک کی ایک آفیشل ریفرل کوڈ ہے (جیسے NG-CXEVbXwR) جو نسک عمرہ چیلنج میں استعمال ہوتا ہے۔ یہ کوڈ درج کرنے سے آپ کو اور بھیجنے والے دونوں کو مفت چابیاں ملتی ہیں جس سے عمرہ جیتنے کے امکانات بڑھ جاتے ہیں۔"
    },
    {
      q: "مجھے تازہ اور کام کرنے والے نسک کوڈز کیسے مل سکتے ہیں؟",
      a: "ہماری ویب سائٹ تصدیق شدہ نسک کوڈز کو فوری روٹیشن میں فراہم کرتی ہے۔ بس 'کاپی' یا 'نسک میں کھولیں' پر کلک کریں اور ایپ میں کوڈ استعمال کریں۔"
    },
    {
      q: "کوڈ پر 'Already Used' یا 'Invalid' کا ایرر کیوں آتا ہے؟",
      a: "ہر ریفرل کوڈ کی زیادہ سے زیادہ حد ہوتی ہے۔ اگر حد مکمل ہو جائے تو رپورٹ کریں، سسٹم فوراً نیا کوڈ دکھا دے گا۔"
    },
    {
      q: "ویب سائٹ پر ڈپلیکیٹ کوڈز سے کیسے بچا جاتا ہے؟",
      a: "ہمارا سسٹم آپ کے کاپی کیے گئے کوڈز کو یاد رکھتا ہے اور دوبارہ کبھی وہی کوڈ آپ کے سامنے نہیں لاتا تاکہ آپ کو ہمیشہ نیا کوڈ ملے۔"
    }
  ],
  id: [
    {
      q: "Apa itu Kunci Nusuk (Nusuk Key) dan bagaimana cara kerja Kompetisi Umrah?",
      a: "Kunci Nusuk adalah kode referral resmi (format NG-XXXXXXXX) untuk Kompetisi Umrah Nusuk. Memasukkan kode referral yang valid memberi Anda dan pemilik kode kunci tambahan untuk undian Umrah gratis."
    },
    {
      q: "Bagaimana cara mendapatkan kode referral Nusuk yang masih aktif?",
      a: "Platform kami secara otomatis merotasi kode referral aktif dari para jemaah. Cukup klik 'Salin' atau 'Buka di Nusuk' untuk menerapkan kode baru seketika."
    },
    {
      q: "Mengapa kode Nusuk menampilkan pesan 'Already Used' atau 'Invalid'?",
      a: "Setiap kode undangan di aplikasi Nusuk memiliki batas kuota pemakaian. Jika kuota penuh, laporkan kode tersebut dan sistem kami akan langsung menyajikan kode baru."
    },
    {
      q: "Bagaimana NusukKey memastikan tidak ada kode duplikat?",
      a: "Sistem cerdas kami mencatat setiap kode yang telah Anda salin di perangkat Anda. Kode yang sudah disalin tidak akan pernah ditampilkan kembali kepada Anda."
    }
  ],
  tr: [
    {
      q: "Nusuk Anahtarı (Nusuk Key) nedir ve Umre Yarışması nasıl işler?",
      a: "Nusuk Anahtarı, Nusuk Umre Yarışması için resmi bir davet kodudur (NG-XXXXXXXX biçiminde). Geçerli bir kod girmek hem size hem de gönderene ücretsiz Umre çekilişine katılmak için ekstra anahtar kazandırır."
    },
    {
      q: "Çalışan yeni Nusuk referans kodlarını nasıl alabilirim?",
      a: "Platformumuz hacıların paylaştığı doğrulanmış Nusuk kodlarını adil bir şekilde döndürür. Yeni bir kod almak için 'Kopyala' veya 'Nusuk'ta Aç' butonuna tıklamanız yeterlidir."
    },
    {
      q: "Nusuk kodu neden 'Already Used' veya 'Invalid' hatası veriyor?",
      a: "Nusuk uygulamasındaki davet kodlarının belirli bir kullanım limiti vardır. Limit dolduğunda bildir butonuna tıklayın, sistemimiz hemen yeni bir kod sunacaktır."
    },
    {
      q: "NusukKey mükerrer kod gösterimini nasıl engeller?",
      a: "Akıllı sistemimiz daha önce kopyaladığınız kodları hatırlar ve bu kodları size bir daha asla göstermez, her zaman taze kodlar almanızı sağlar."
    }
  ],
  ms: [
    {
      q: "Apakah Kunci Nusuk dan bagaimanakah Pertandingan Umrah berfungsi?",
      a: "Kunci Nusuk ialah kod rujukan rasmi (format NG-XXXXXXXX) untuk Pertandingan Umrah Nusuk. Memasukkan kod sah memberi anda dan rakan kunci tambahan untuk cabutan Umrah percuma."
    },
    {
      q: "Bagaimanakah cara mendapatkan kod rujukan Nusuk yang sah?",
      a: "Platform komuniti kami mengitar kod rujukan Nusuk yang disahkan sepanjang masa. Klik 'Salin' atau 'Buka di Nusuk' untuk menggunakan kod baharu."
    },
    {
      q: "Mengapakah kod Nusuk menunjukkan 'Already Used' atau 'Invalid'?",
      a: "Setiap kod rujukan mempunyai kuota tebusan terhad. Jika kuota penuh, klik laporan dan sistem kami akan serta-merta menyediakan kod baharu."
    },
    {
      q: "Bagaimanakah NusukKey mengelakkan kod pendua?",
      a: "Enjin pintar kami merekodkan setiap kod yang telah anda salin supaya kod yang sama tidak dipaparkan semula kepada anda."
    }
  ],
  fr: [
    {
      q: "Qu'est-ce qu'une clé Nusuk et comment fonctionne le concours Omra ?",
      a: "Une clé Nusuk est un code de parrainage officiel (au format NG-XXXXXXXX) pour le concours Omra Nusuk. L'utilisation d'un code valide vous donne droit, ainsi qu'au parrain, à des clés supplémentaires pour le tirage au sort."
    },
    {
      q: "Comment obtenir des codes de parrainage Nusuk récents et actifs ?",
      a: "Notre plateforme fait tourner en continu les codes Nusuk vérifiés partagés par les pèlerins. Cliquez simplement sur 'Copier' ou 'Ouvrir dans Nusuk'."
    },
    {
      q: "Pourquoi un code Nusuk affiche-t-il 'Already Used' ou 'Invalid' ?",
      a: "Chaque code a un quota maximum d'utilisations. Lorsqu'un code atteint son quota, signalez-le et notre système vous proposera instantanément un nouveau code."
    },
    {
      q: "Comment NusukKey évite-t-il les doublons ?",
      a: "Notre système mémorise chaque code que vous avez déjà copié et ne vous le proposera plus jamais, garantissant des clés toujours inédites."
    }
  ],
  es: [
    {
      q: "¿Qué es una clave Nusuk y cómo funciona el concurso de Umrah?",
      a: "Una clave Nusuk es un código de invitación oficial (formato NG-XXXXXXXX) para el concurso de Umrah de Nusuk. Ingresar un código válido otorga llaves adicionales para el sorteo de viajes a la Umrah."
    },
    {
      q: "¿Cómo obtengo códigos de referido Nusuk activos y actualizados?",
      a: "Nuestra plataforma rota constantemente códigos válidos compartidos por la comunidad. Haz clic en 'Copiar' o 'Abrir en Nusuk' para usar un código reciente."
    },
    {
      q: "¿Por qué un código muestra 'Already Used' o 'Invalid'?",
      a: "Los códigos tienen un límite máximo de canje. Cuando un código se agota, repórtalo y nuestro sistema te mostrará inmediatamente un código nuevo."
    },
    {
      q: "¿Cómo evita NusukKey mostrar códigos repetidos?",
      a: "Nuestro motor inteligente recuerda cada código copiado en tu dispositivo para no mostrártelo de nuevo y ofrecerte siempre códigos nuevos."
    }
  ],
  de: [
    {
      q: "Was ist ein Nusuk-Schlüssel und wie funktioniert der Umrah-Wettbewerb?",
      a: "Ein Nusuk-Schlüssel ist ein offizieller Empfehlungscode (Format NG-XXXXXXXX) für den Nusuk Umrah-Wettbewerb. Durch die Eingabe erhalten Sie und der Absender zusätzliche Lose für die Umrah-Reise."
    },
    {
      q: "Wie erhalte ich funktionierende und frische Nusuk-Codes?",
      a: "Unsere Plattform rotiert geprüfte Nusuk-Codes von Pilgern in Echtzeit. Klicken Sie einfach auf 'Kopieren' oder 'In Nusuk öffnen'."
    },
    {
      q: "Warum zeigt ein Code 'Already Used' oder 'Invalid' an?",
      a: "Jeder Empfehlungscode hat ein Kontingent. Wenn ein Code aufgebraucht ist, melden Sie ihn bitte, und Sie erhalten sofort einen neuen Schlüssel."
    },
    {
      q: "Wie verhindert NusukKey doppelte Codes?",
      a: "Unser Rotationssystem speichert alle von Ihnen kopierten Codes lokal und zeigt Ihnen nie denselben Code zweimal an."
    }
  ],
  ru: [
    {
      q: "Что такое ключ Nusuk и как работает конкурс Умры?",
      a: "Ключ Nusuk — это официальный реферальный код (формата NG-XXXXXXXX) для участия в конкурсе Умры в приложении Nusuk. Ввод кода дает дополнительные шансы на выигрыш бесплатной поездки."
    },
    {
      q: "Как получить свежие и рабочие реферальные коды Nusuk?",
      a: "Наш сервис постоянно обновляет базу проверенных кодов от паломников. Просто нажмите 'Скопировать' или 'Открыть в Nusuk'."
    },
    {
      q: "Почему код Nusuk выдает ошибку 'Уже использован' или 'Недействителен'?",
      a: "У каждого кода есть лимит активаций. Если код исчерпан, нажмите 'Сообщить', и система немедленно предоставит вам новый код."
    },
    {
      q: "Как NusukKey исключает повторный показ кодов?",
      a: "Алгоритм фиксирует все скопированные вами коды и никогда не показывает их повторно, гарантируя только свежие ключи."
    }
  ],
  hi: [
    {
      q: "नुसुक की (Nusuk Key) क्या है और उमरा प्रतियोगिता कैसे काम करती है?",
      a: "नुसुक की एक आधिकारिक रेफरल कोड है (प्रारूप: NG-XXXXXXXX) जो नुसुक उमरा प्रतियोगिता में उपयोग किया जाता है। एक वैध कोड दर्ज करने से आपको और भेजने वाले को मुफ्त उमरा ड्रा में अतिरिक्त मौके मिलते हैं।"
    },
    {
      q: "मुझे नए और काम करने वाले नुसुक रेफरल कोड कैसे मिल सकते हैं?",
      a: "हमारा प्लेटफॉर्म तीर्थयात्रियों द्वारा साझा किए गए सत्यापित नुसुक कोड्स को रोटेट करता है। बस 'कॉपी करें' या 'नुसुक में खोलें' पर क्लिक करें।"
    },
    {
      q: "नुसुक कोड 'Already Used' या 'Invalid' त्रुटि क्यों दिखाता है?",
      a: "प्रत्येक कोड की उपयोग सीमा होती है। सीमा समाप्त होने पर रिपोर्ट करें, हमारा सिस्टम तुरंत आपको एक नया कोड देगा।"
    },
    {
      q: "NusukKey डुप्लीकेट कोड को दिखाने से कैसे रोकता है?",
      a: "हमारा स्मार्ट इंजन आपके द्वारा कॉपी किए गए प्रत्येक कोड को ट्रैक करता है और उसे दोबारा कभी नहीं दिखाता ताकि आपको हमेशा नए कोड मिलें।"
    }
  ],
  fa: [
    {
      q: "کلید نسک (Nusuk Key) چیست و مسابقه عمره چگونه کار می‌کند؟",
      a: "کلید نسک یک کد معرف رسمی (با فرمت NG-XXXXXXXX) برای مسابقه عمره در برنامه نسک است. وارد کردن این کد به شما و صاحب کد شانس‌های اضافی برای برنده شدن سفر عمره می‌دهد."
    },
    {
      q: "چگونه کدهای معرف معتبر و جدید نسک را دریافت کنم؟",
      a: "پلتفرم ما کدهای تأیید شده را به صورت چرخشی و زنده به اشتراک می‌گذارد. کافی است روی 'کپی' یا 'باز کردن در نسک' کلیک کنید."
    },
    {
      q: "چرا کد نسک خطای 'استفاده شده' یا 'نامعتبر' می‌دهد؟",
      a: "هر کد ظرفیت محدودی دارد. در صورت اتمام ظرفیت، آن را گزارش دهید تا سیستم بلافاصله کد تازه‌ای به شما ارائه دهد."
    },
    {
      q: "چگونه از نمایش کدهای تکراری جلوگیری می‌شود؟",
      a: "سیستم هوشمند ما کدهای کپی‌شده شما را ذخیره می‌کند تا دیگر هرگز به شما نمایش داده نشوند و همیشه کد جدید دریافت کنید."
    }
  ],
  zh: [
    {
      q: "什么是 Nusuk Key？副朝竞赛如何运作？",
      a: "Nusuk Key 是官方推荐码（格式为 NG-XXXXXXXX），用于在 Nusuk 应用中参加副朝竞赛。输入有效代码可为您和邀请人赢取额外机会。"
    },
    {
      q: "如何获取最新可用的 Nusuk 推荐码？",
      a: "我们的平台实时轮换朝觐者分享的有效推荐码。点击“复制”或“在 Nusuk 中打开”即可使用。"
    },
    {
      q: "为什么代码显示“已使用”或“无效”？",
      a: "每个推荐码都有使用上限。当代码达到上限时，请点击报错，系统将立即为您提供新代码。"
    },
    {
      q: "NusukKey 如何防止重复显示代码？",
      a: "智能系统会记录您复制过的所有代码，并永久从您的视图中排除，确保您始终获得全新代码。"
    }
  ],
  ja: [
    {
      q: "Nusuk Key とは何ですか？ウムラコンペはどのように機能しますか？",
      a: "Nusuk Key は Nusuk アプリの公式紹介コード（NG-XXXXXXXX 形式）です。有効なコードを入力すると、無料ウムラ旅行の抽選権を獲得できます。"
    },
    {
      q: "最新の Nusuk 紹介コードを入手するにはどうすればよいですか？",
      a: "巡礼者が共有する認証済みコードをリアルタイムでローテーションしています。「コピー」または「Nusukで開く」をクリックしてください。"
    },
    {
      q: "コードが「使用済み」または「無効」と表示されるのはなぜですか？",
      a: "各コードには引き換え制限があります。制限に達した場合は報告してください。システムがすぐに新しいコードを提供します。"
    },
    {
      q: "重複コードの表示はどのように防がれていますか？",
      a: "一度コピーしたコードは記録され、二度と表示されないため、常に未使用のコードを取得できます。"
    }
  ],
  ko: [
    {
      q: "Nusuk Key란 무엇이며 움라 대회는 어떻게 진행되나요?",
      a: "Nusuk Key는 Nusuk 앱 공식 추천 코드(NG-XXXXXXXX 형식)입니다. 유효한 코드를 입력하면 무료 움라 여행 추첨 티켓을 추가로 얻을 수 있습니다."
    },
    {
      q: "최신 Nusuk 추천 코드는 어떻게 받나요?",
      a: "저희 플랫폼은 순례자들이 공유한 확인된 코드를 실시간으로 교체 제공합니다. '복사' 또는 'Nusuk에서 열기'를 클릭하세요."
    },
    {
      q: "코드가 '이미 사용됨' 또는 '유효하지 않음'으로 표시되는 이유는 무엇인가요?",
      a: "코드마다 사용 한도가 있습니다. 한도가 소진된 경우 신고해 주시면 시스템이 즉시 새 코드를 제공합니다."
    },
    {
      q: "NusukKey는 중복 코드를 어떻게 방지하나요?",
      a: "복사한 모든 코드를 추적하여 다시 표시하지 않으므로 항상 새로운 코드를 받으실 수 있습니다."
    }
  ],
  pt: [
    {
      q: "O que é uma chave Nusuk e como funciona a competição de Umrah?",
      a: "A chave Nusuk é um código de indicação oficial (formato NG-XXXXXXXX) para a competição Umrah do Nusuk. Inserir um código válido dá chances extras de ganhar a viagem."
    },
    {
      q: "Como conseguir códigos de indicação Nusuk novos e funcionais?",
      a: "Nossa plataforma atualiza e rotaciona códigos verificados em tempo real. Basta clicar em 'Copiar' ou 'Abrir no Nusuk'."
    },
    {
      q: "Por que o código mostra 'Já usado' ou 'Inválido'?",
      a: "Cada código possui um limite de uso. Quando um código se esgota, reporte-o e nosso sistema fornecerá imediatamente um novo código."
    },
    {
      q: "Como o NusukKey evita mostrar códigos repetidos?",
      a: "Nosso motor inteligente rastreia todos os códigos copiados por você para nunca exibi-los novamente, garantindo códigos sempre novos."
    }
  ],
  it: [
    {
      q: "Cos'è una chiave Nusuk e come funziona il concorso Umrah?",
      a: "Una chiave Nusuk è un codice referral ufficiale (formato NG-XXXXXXXX) per il concorso Umrah. Inserire un codice valido assegna chiavi bonus per il sorteggio."
    },
    {
      q: "Come posso ottenere codici referral Nusuk verificati e funzionanti?",
      a: "La nostra piattaforma ruota costantemente codici freschi condivisi dai pellegrini. Clicca su 'Copia' o 'Apri in Nusuk'."
    },
    {
      q: "Perché un codice mostra 'Già utilizzato' o 'Non valido'?",
      a: "Ogni codice ha un limite di utilizzi. Quando è esaurito, segnalalo e il sistema ti mostrerà subito un nuovo codice."
    },
    {
      q: "In che modo NusukKey impedisce la visualizzazione di duplicati?",
      a: "Il nostro sistema tiene traccia dei codici che hai copiato per non riproporteli mai più."
    }
  ],
  nl: [
    {
      q: "Wat is een Nusuk-sleutel en hoe werkt de Umrah-competitie?",
      a: "Een Nusuk-sleutel is een officiële verwijzingscode (formaat NG-XXXXXXXX) voor de Nusuk Umrah-competitie waarmee u extra kansen wint op een gratis Umrah-reis."
    },
    {
      q: "Hoe krijg ik verse, werkende Nusuk-verwijzingscodes?",
      a: "Ons platform roteert voortdurend geverifieerde codes. Klik simpelweg op 'Kopiëren' of 'Openen in Nusuk'."
    },
    {
      q: "Waarom geeft een code 'Al gebruikt' of 'Ongeldig' aan?",
      a: "Elke code heeft een maximale gebruikslimiet. Rapporteer een volle code en ons systeem geeft u direct een nieuwe code."
    },
    {
      q: "Hoe voorkomt NusukKey dubbele codes?",
      a: "Ons systeem registreert welke codes u al heeft gekopieerd en toont deze nooit meer opnieuw."
    }
  ],
  sw: [
    {
      q: "Ufunguo wa Nusuk ni nini na Shindano la Umrah linafanyaje kazi?",
      a: "Ufunguo wa Nusuk ni msimbo rasmi wa mwaliko (umbizo NG-XXXXXXXX) wa Shindano la Umrah la Nusuk unaokuwezesha kupata nafasi za ziada za kushinda safari ya Umrah ya bure."
    },
    {
      q: "Ninawezaje kupata misimbo mipya ya Nusuk inayofanya kazi?",
      a: "Mfumo wetu huzungusha misimbo iliyothibitishwa mara kwa mara. Bonyeza tu 'Nakili' au 'Fungua katika Nusuk'."
    },
    {
      q: "Kwa nini msimbo unaonyesha 'Imeshatumika' au 'Si sahihi'?",
      a: "Kila msimbo una kikomo cha matumizi. Ikiisha, bonyeza ripoti na mfumo utakupatia msimbo mpya papo hapo."
    },
    {
      q: "NusukKey inazuiaje kurudia misimbo?",
      a: "Mfumo wetu hukumbuka kila msimbo ulionakili na kamwe hautakuonyesha msimbo huo tena."
    }
  ],
  uz: [
    {
      q: "Nusuk kaliti nima va Umra tanlovi qanday ishlaydi?",
      a: "Nusuk kaliti — bu Nusuk Umra tanlovi uchun rasmiy taklif kodi (NG-XXXXXXXX formati). Amal qiluvchi kodni kiritish bepul Umra yutib olish imkoniyatingizni oshiradi."
    },
    {
      q: "Yangi va ishlaydigan Nusuk kodlarini qanday olish mumkin?",
      a: "Bizning platformamiz ziyoratchilar ulashgan kodlarni doimiy yangilab turadi. 'Nusxalash' yoki 'Nusukda ochish' tugmasini bosing."
    },
    {
      q: "Nega Nusuk kodi 'Ishlatilgan' yoki 'Noto‘g‘ri' xatosini beradi?",
      a: "Har bir kodning o‘z cheklovi mavjud. Cheklov tugasa, xabar bering va tizim sizga darhol yangi kod taqdim etadi."
    },
    {
      q: "NusukKey takroriy kodlarni qanday oldini oladi?",
      a: "Tizim siz nusxalagan barcha kodlarni eslab qoladi va ularni sizga boshqa ko‘rsatmaydi."
    }
  ]
};

export function getFaqsForLocale(locale: Locale): FaqItem[] {
  return SEO_FAQS_BY_LOCALE[locale] || SEO_FAQS_BY_LOCALE.en;
}
