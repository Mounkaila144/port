import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import type { Locale } from "@/lib/i18n/routing";

export type Language = Locale;

export const translations: Record<Language, typeof en> = {
  en,
  fr,
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[lang];
  for (const k of keys) {
    if (value && typeof value === "object") {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}
