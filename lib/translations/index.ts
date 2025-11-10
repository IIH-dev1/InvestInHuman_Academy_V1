import languageCoursesTranslations from './languageCourses';
import coachingTranslations from './coaching';
import studiesAbroadTranslations from './studiesAbroad';
import partnershipsTranslations from './partnerships';
import contactTranslations from './contact';
import aboutUsTranslations from './aboutUs';
import seminarsTranslations from './seminars';
import generalTranslations from './general';

// Merge all translation objects
export const mergeTranslations = (...translationObjects: any[]) => {
  const merged: any = { DE: {}, FR: {}, EN: {}, AR: {} };

  translationObjects.forEach(obj => {
    Object.keys(obj).forEach(lang => {
      merged[lang] = { ...merged[lang], ...obj[lang] };
    });
  });

  return merged;
};

// Export merged translations from all page-specific files
export const pageTranslations = mergeTranslations(
  languageCoursesTranslations,
  coachingTranslations,
  studiesAbroadTranslations,
  partnershipsTranslations,
  contactTranslations,
  aboutUsTranslations,
  seminarsTranslations,
  generalTranslations
);

// Export individual translation files
export {
  languageCoursesTranslations,
  coachingTranslations,
  studiesAbroadTranslations,
  partnershipsTranslations,
  contactTranslations,
  aboutUsTranslations,
  seminarsTranslations,
  generalTranslations
};
