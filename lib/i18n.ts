import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

export type Locale = "en" | "ar";

export function getDictionary(locale: Locale) {
  return locale === "ar" ? ar : en;
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}
