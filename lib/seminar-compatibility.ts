import { Seminar } from './seminar-utils';

/**
 * Maps a new Seminar object to the old format for backward compatibility
 */
export const mapSeminarToLegacyFormat = (seminar: Seminar) => {
  const getTargetType = (category: string) => {
    const organizationCategories = ['Companies and Organizations', 'Diplomacy & International Relations', 'Professional Development'];
    return organizationCategories.includes(category) ? 'organizations' : 'candidates';
  };

  return {
    id: seminar.id,
    titleKey: `seminar_${seminar.id}_title`,
    descriptionKey: `seminar_${seminar.id}_description`,
    target: getTargetType(seminar.category),
    dates: seminar.dates,
    topicsKeys: seminar.program.slice(0, 3).map((_, idx) => `seminar_${seminar.id}_topic_${idx + 1}`)
  };
};

/**
 * Maps multiple seminars to legacy format
 */
export const mapSeminarsToLegacyFormat = (seminars: Seminar[]) => {
  return seminars.map(mapSeminarToLegacyFormat);
};
