// Modular Seminar Translations System
// Each seminar has its own file for easy management
// To add a new seminar: 
// 1. Create a new file: seminar-N.ts (where N is the seminar number)
// 2. Import it below
// 3. Add it to the seminarsMap

import { seminar1Translations } from './seminar-1';
import { seminar2Translations } from './seminar-2';
import { seminar3Translations } from './seminar-3';
import { seminar4Translations } from './seminar-4';
import { seminar5Translations } from './seminar-5';
import { commonSeminarTranslations } from './common';

// Map of all seminars by ID
export const seminarsMap = {
  1: seminar1Translations,
  2: seminar2Translations,
  3: seminar3Translations,
  4: seminar4Translations,
  5: seminar5Translations,
};

// Get translation for a specific seminar
export function getSeminarTranslation(seminarId: number, language: string = 'de') {
  const seminar = seminarsMap[seminarId as keyof typeof seminarsMap];
  if (!seminar) return null;

  const lang = language as keyof typeof seminar;
  return seminar[lang] || seminar.de;
}

// Get common seminar translations
export function getCommonSeminarTranslation(language: string = 'de') {
  const lang = language as keyof typeof commonSeminarTranslations;
  return commonSeminarTranslations[lang] || commonSeminarTranslations.de;
}

// Get translation key from common or specific seminar
export function getSeminarT(seminarId: number | null, language: string = 'de') {
  const common = getCommonSeminarTranslation(language);

  return (key: string) => {
    // First check if it's a common key
    if (key in common) {
      return common[key as keyof typeof common];
    }

    // If seminarId provided, check seminar-specific translations
    if (seminarId !== null) {
      const seminarTranslation = getSeminarTranslation(seminarId, language);
      if (seminarTranslation && key in seminarTranslation) {
        return seminarTranslation[key as keyof typeof seminarTranslation];
      }
    }

    // Return key if not found
    return key;
  };
}

// Hook for use in components
export function useSeminarTranslation(seminarId: number | null = null, language: string = 'de') {
  return {
    t: getSeminarT(seminarId, language),
    getSeminar: (id: number) => getSeminarTranslation(id, language),
    common: getCommonSeminarTranslation(language),
  };
}

// Get all available seminar IDs
export function getAvailableSeminars() {
  return Object.keys(seminarsMap).map(Number);
}

// Check if a seminar exists
export function seminarExists(seminarId: number) {
  return seminarId in seminarsMap;
}

// Helper function to get available languages
export const getSeminarLanguages = () => {
  return ['de', 'en', 'fr', 'ar'];
};

// Helper function to check if a language is supported
export const isSeminarLanguageSupported = (language: string) => {
  return ['de', 'en', 'fr', 'ar'].includes(language);
};
