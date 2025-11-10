import { useLanguage } from "@/components/language-context";
import translations from "@/lib/translations";

// Type for translation keys
const languageKeys = ["DE", "FR", "EN", "AR"] as const;
type LanguageKey = typeof languageKeys[number];
type TranslationObject = Record<string, string>;

type TranslationsType = Record<LanguageKey, TranslationObject>;

export function useTranslation() {
  const { language } = useLanguage();
  return (key: string) => {
    const lang = languageKeys.includes(language as LanguageKey) ? (language as LanguageKey) : "DE";
    return (translations as TranslationsType)[lang][key] || key;
  };
}
