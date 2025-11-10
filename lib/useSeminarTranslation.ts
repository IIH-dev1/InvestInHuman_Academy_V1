import { useLanguage } from '@/components/language-context'
import { useSeminarTranslation as useModularSeminarTranslation } from './translations/seminars/index'

export function useSeminarTranslation() {
  const { language } = useLanguage()
  const lowerLang = language.toLowerCase();

  // Use the new modular translation system
  const { t: tFunc, getSeminar, common } = useModularSeminarTranslation(null, lowerLang);

  const t = (key: string): string | string[] => {
    return tFunc(key);
  }

  return { t, language, getSeminar, common }
}
