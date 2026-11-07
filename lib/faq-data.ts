import { Locale } from "./i18n";

export interface FaqItem {
  id: string;
  category: "basics" | "codes" | "competition" | "troubleshooting" | "rules" | "security";
  q: string;
  a: string;
}

export const COMPREHENSIVE_FAQS: FaqItem[] = [
  // 1. Basics & Keys
  {
    id: "faq-1",
    category: "basics",
    q: "What is a Nusuk Key and how does the Umrah Challenge work?",
    a: "A Nusuk Key is an official referral draw token (formatted as NG-XXXXXXXX) in the Nusuk app competition. Each key unlocks 1 competition question. Answering questions correctly enters your name into the daily raffle for 100 all-inclusive Umrah trips."
  },
  {
    id: "faq-2",
    category: "basics",
    q: "How many free keys do I get every day in the Nusuk app?",
    a: "The official Nusuk system gives every registered pilgrim 1 free key automatically at the start of each day (12:00 AM Saudi Arabia Time). You can earn unlimited bonus keys by sharing and claiming invite codes."
  },
  {
    id: "faq-3",
    category: "basics",
    q: "What is the format of a valid Nusuk referral code?",
    a: "All official Nusuk referral codes begin with 'NG-' followed by exactly 8 alphanumeric characters (such as NG-CXEVbXwR, NG-2MqwkXns). Codes are case-insensitive when entered into the app."
  },
  {
    id: "faq-4",
    category: "basics",
    q: "Do Nusuk keys and competition entries cost real money?",
    a: "No! Participating in the Nusuk Umrah competition and using referral keys on NusukKey is 100% free. Nusuk never asks for bank details, credit card numbers, or payments to enter the draw."
  },
  {
    id: "faq-5",
    category: "basics",
    q: "Who is eligible to participate in the Nusuk Free Umrah Competition?",
    a: "Anyone with an active Nusuk mobile account—including international pilgrims, Saudi citizens, and GCC residents—can participate in the daily challenge directly from the Nusuk app."
  },

  // 2. Codes & Exchange Platform
  {
    id: "faq-6",
    category: "codes",
    q: "How does the NusukKey code exchange work?",
    a: "NusukKey is an open community platform where pilgrims swap codes. When you copy and use someone's code in the Nusuk app, both of you earn +1 free key. You can also submit your own code so other pilgrims will use it for you."
  },
  {
    id: "faq-7",
    category: "codes",
    q: "How do I get fresh, working Nusuk referral codes?",
    a: "Our system runs a smart fair-rotation queue across thousands of verified community codes. Simply tap 'Next code for you' or 'Swap Code' on our homepage, or browse our active /codes directory."
  },
  {
    id: "faq-8",
    category: "codes",
    q: "How does 'Open in Nusuk' deep-linking work?",
    a: "When you tap 'Open in Nusuk' on a mobile device, our platform uses the verified deep link (https://services.nusuk.sa/app?p=27&id=NG-XXXXXXXX) to launch your installed Nusuk app directly to the competition screen with the code pre-filled."
  },
  {
    id: "faq-9",
    category: "codes",
    q: "Why do I see codes from different countries like BD, SA, PK, and AE?",
    a: "Pilgrims from over 120 nations submit their codes to NusukKey. Any valid NG- code can be used internationally by any pilgrim regardless of nationality."
  },
  {
    id: "faq-10",
    category: "codes",
    q: "How does NusukKey prevent showing duplicate codes to me?",
    a: "Our smart storage tracks every code you copy. Once a code is copied, it is automatically excluded from your future rotation queue so you always receive fresh, unused keys."
  },
  {
    id: "faq-11",
    category: "codes",
    q: "Can I submit my own Nusuk referral code to NusukKey?",
    a: "Yes! Use the 'Submit Nusuk Key' form on our homepage. Paste your NG- code or your invite link, select your nationality, and tap submit. Thousands of active daily visitors will start redeeming your code."
  },
  {
    id: "faq-12",
    category: "codes",
    q: "What is the daily submission limit for visitors?",
    a: "To prevent bot spam and protect fair distribution for individual pilgrims, our system allows up to 10 key submissions per visitor every 24 hours."
  },

  // 3. Competition & Prizes
  {
    id: "faq-13",
    category: "competition",
    q: "What are the prizes in the official Nusuk Umrah Challenge 2026?",
    a: "The Ministry of Hajj and Umrah awards 100 all-inclusive Umrah packages in the daily raffle, covering round-trip flights, 5-star hotel accommodations in Makkah and Madinah, ground transportation, and official Umrah visa processing."
  },
  {
    id: "faq-14",
    category: "competition",
    q: "How are the daily winners selected in the Nusuk competition?",
    a: "Winners are drawn via an automated, verified electronic raffle managed by the Ministry of Hajj and Umrah. Each correct answer backed by a key counts as an independent raffle ticket."
  },
  {
    id: "faq-15",
    category: "competition",
    q: "Where are the official winners announced?",
    a: "Official winners are announced daily on the 'Winners' tab inside the Nusuk app and through the verified Ministry of Hajj and Umrah social media accounts."
  },
  {
    id: "faq-16",
    category: "competition",
    q: "Can winners bring a companion or family member?",
    a: "Yes, standard Umrah packages awarded through the Nusuk competition include complimentary coverage for the winner plus one accompanying family member or companion."
  },
  {
    id: "faq-17",
    category: "competition",
    q: "When does the 2026 Umrah competition officially conclude?",
    a: "The competition runs throughout the Umrah season leading up to Hajj. Specific deadline announcements are published inside the Nusuk app challenge banner."
  },

  // 4. Troubleshooting & Errors
  {
    id: "faq-18",
    category: "troubleshooting",
    q: "Why does the Nusuk app say 'Code already used' or 'Invalid code'?",
    a: "Every Nusuk invite code has a daily redemption limit set by the Nusuk servers. If multiple people enter the same code simultaneously, the quota fills up. Simply tap 'Swap Code' on NusukKey to instantly get another active code."
  },
  {
    id: "faq-19",
    category: "troubleshooting",
    q: "Why won't 'Open in Nusuk' launch my application?",
    a: "Deep linking requires the official Nusuk app to be installed and updated to the latest version on Android or iOS. If the link opens a browser tab instead, tap 'Copy' and paste the code manually into Nusuk."
  },
  {
    id: "faq-20",
    category: "troubleshooting",
    q: "Can I enter my own referral code into my own Nusuk app?",
    a: "No, self-referrals are rejected by the Nusuk server. You must enter a code belonging to another pilgrim to receive your bonus key."
  },
  {
    id: "faq-21",
    category: "troubleshooting",
    q: "Why didn't my key counter increment after using a code?",
    a: "The Nusuk server occasionally experiences high traffic spikes. Pull down to refresh the 'Keys' screen in the Nusuk app or restart the app to reflect your updated key balance."
  },
  {
    id: "faq-22",
    category: "troubleshooting",
    q: "How do I report a broken or maxed-out code on NusukKey?",
    a: "Tap the flag icon (⚑) next to the code on our homepage or click 'Problem?' in your copied codes list. Our system automatically down-ranks reported codes and serves you a fresh key immediately."
  },

  // 5. App Rules & Daily Resets
  {
    id: "faq-23",
    category: "rules",
    q: "At what time does the Nusuk key reset take place daily?",
    a: "Daily keys and competition questions reset at 12:00 AM (00:00) Saudi Arabia Standard Time (AST / GMT+3). Our homepage features an accurate live Saudi Arabian clock to track resets."
  },
  {
    id: "faq-24",
    category: "rules",
    q: "Is there a limit on how many keys I can collect in one day?",
    a: "The Nusuk app allows you to redeem up to 10 referral codes from other pilgrims per day, giving you 10 bonus keys in addition to your 1 free daily login key."
  },
  {
    id: "faq-25",
    category: "rules",
    q: "Do unused Nusuk keys roll over to the next day?",
    a: "Daily login keys must be used within the 24-hour cycle before the reset. However, tickets gained from correctly answered questions stay active in the seasonal prize pool."
  },
  {
    id: "faq-26",
    category: "rules",
    q: "Can I use the same referral code more than once?",
    a: "No, the Nusuk system only accepts each referral code once per account. To get more keys, you must enter unique codes from different pilgrims."
  },

  // 6. Security, Privacy & App Install
  {
    id: "faq-27",
    category: "security",
    q: "Is NusukKey affiliated with the Saudi Ministry of Hajj and Umrah?",
    a: "No, NusukKey is an independent, non-profit community platform built by pilgrims to help fellow pilgrims exchange public referral codes. All actual gameplay and prize draws occur inside the official Nusuk app."
  },
  {
    id: "faq-28",
    category: "security",
    q: "Does NusukKey store personal data or account passwords?",
    a: "Never! NusukKey does not require login, passwords, OTPs, or passport numbers. We only store anonymized public NG- referral strings."
  },
  {
    id: "faq-29",
    category: "security",
    q: "How can I install NusukKey as a Progressive Web App (PWA)?",
    a: "Tap the 'Mobile App' button in our navbar. On Android/Chrome, tap 'Install App'. On iPhone/Safari, tap the Share icon and select 'Add to Home Screen' for instant 1-tap access."
  },
  {
    id: "faq-30",
    category: "security",
    q: "Why are personal owner names hidden on NusukKey?",
    a: "To protect pilgrim privacy, our platform removed all personal display names. All codes are labeled as 'Global' or by general country code to ensure anonymity."
  },
  {
    id: "faq-31",
    category: "troubleshooting",
    q: "What should I do if a competition question is difficult?",
    a: "Questions focus on Islamic history, Prophet Muhammad's (PBUH) life, and holy sites in Makkah and Madinah. Reviewing authentic Seerah sources before answering will maximize your win rate."
  },
  {
    id: "faq-32",
    category: "security",
    q: "Is it safe to copy codes from NusukKey?",
    a: "Yes, 100% safe. Every code on NusukKey is verified against the strict official NG-XXXXXXXX format and checked against blacklist filters before publication."
  }
];

export function getHomepageFaqs(locale: Locale): FaqItem[] {
  // Return a curated selection of 12 highly relevant FAQs for the homepage
  return COMPREHENSIVE_FAQS.slice(0, 12);
}

export function getAllFaqs(): FaqItem[] {
  return COMPREHENSIVE_FAQS;
}
