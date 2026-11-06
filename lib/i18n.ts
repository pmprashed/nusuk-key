import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import bn from "@/messages/bn.json";
import ur from "@/messages/ur.json";
import id from "@/messages/id.json";
import tr from "@/messages/tr.json";
import ms from "@/messages/ms.json";
import fr from "@/messages/fr.json";
import es from "@/messages/es.json";
import de from "@/messages/de.json";
import ru from "@/messages/ru.json";
import hi from "@/messages/hi.json";
import fa from "@/messages/fa.json";
import zh from "@/messages/zh.json";
import ja from "@/messages/ja.json";
import ko from "@/messages/ko.json";
import pt from "@/messages/pt.json";
import it from "@/messages/it.json";
import nl from "@/messages/nl.json";
import sw from "@/messages/sw.json";
import uz from "@/messages/uz.json";

export type Locale =
  | "en"
  | "ar"
  | "bn"
  | "ur"
  | "id"
  | "tr"
  | "ms"
  | "fr"
  | "es"
  | "de"
  | "ru"
  | "hi"
  | "fa"
  | "zh"
  | "ja"
  | "ko"
  | "pt"
  | "it"
  | "nl"
  | "sw"
  | "uz";

const dictionaries: Record<Locale, any> = {
  en,
  ar,
  bn,
  ur,
  id,
  tr,
  ms,
  fr,
  es,
  de,
  ru,
  hi,
  fa,
  zh,
  ja,
  ko,
  pt,
  it,
  nl,
  sw,
  uz,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || en;
}

export function isRtl(locale: Locale): boolean {
  return ["ar", "ur", "fa"].includes(locale);
}
