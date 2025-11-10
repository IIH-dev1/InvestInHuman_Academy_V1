"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-context"
import { FlagDE, FlagFR, FlagGB, FlagSA } from "@/components/flag-icon"

const LANGUAGES = [
  { code: "DE", label: "Deutsch", FlagComponent: FlagDE },
  { code: "FR", label: "Français", FlagComponent: FlagFR },
  { code: "EN", label: "English", FlagComponent: FlagGB },
  { code: "AR", label: "العربية", FlagComponent: FlagSA },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]
  const CurrentFlag = currentLang.FlagComponent

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 h-9 px-3 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-300 group"
        >
          <span className="transform group-hover:scale-110 transition-transform duration-300">
            <CurrentFlag />
          </span>
          <span className="font-medium text-sm">{currentLang.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] p-1">
        {LANGUAGES.map((lang) => {
          const Flag = lang.FlagComponent
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-3 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 rounded-md px-3 py-2.5 ${language === lang.code ? 'bg-amber-50 dark:bg-amber-950/20' : ''
                }`}
            >
              <Flag />
              <div className="flex flex-col flex-1">
                <span className="font-medium text-sm">{lang.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{lang.code}</span>
              </div>
              {language === lang.code && (
                <span className="text-amber-500 font-bold">✓</span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
