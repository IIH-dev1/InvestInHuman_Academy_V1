import { useLanguage } from '@/components/language-context'
import volunteerTranslations from './volunteer-translations'

// Type for language keys
const languageKeys = ["DE", "EN", "FR", "AR"] as const;
type LanguageKey = typeof languageKeys[number];

export function useVolunteerTranslation() {
  const { language } = useLanguage()

  const t = (key: string): string => {
    const lang = languageKeys.includes(language as LanguageKey) ? (language as LanguageKey) : "DE";
    return volunteerTranslations[lang]?.[key as keyof (typeof volunteerTranslations)[LanguageKey]] || key
  }

  return { t, language }
}
