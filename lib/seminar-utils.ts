import seminarsData from '@/seminars.json';
import { getSeminarTranslation, getCommonSeminarTranslation } from '@/lib/translations/seminars/index';

export interface Seminar {
  id: string;
  title: string;
  price: number | string | null;
  currency: string;
  price_note: string;
  format: string[];
  category: string;
  duration: string;
  certification: string;
  objectives: string;
  target_audience: string;
  program: string[];
  extras: string[];
  dates: string[];
  locations: string[];
}

// Fetch seminars from static JSON file
export const getSeminars = async (): Promise<Seminar[]> => {
  try {
    // Convert the imported data to match the Seminar interface
    return seminarsData.map((seminar: any) => ({
      id: String(seminar.id),
      title: seminar.title || '',
      price: seminar.price,
      currency: seminar.currency || 'EUR',
      price_note: seminar.price_note || '',
      format: seminar.format || [],
      category: seminar.category || '',
      duration: seminar.duration || '',
      certification: seminar.certification || '',
      objectives: seminar.objectives || '',
      target_audience: seminar.target_audience || '',
      program: seminar.program || [],
      extras: seminar.extras || [],
      dates: seminar.dates || [],
      locations: seminar.locations || [],
    }));
  } catch (error) {
    console.error('Error loading seminars:', error);
    return [];
  }
};

export const getSeminarById = async (id: string | number): Promise<Seminar | null> => {
  try {
    const seminars = await getSeminars();
    const seminar = seminars.find(s => s.id === String(id));
    return seminar || null;
  } catch (error) {
    console.error('Error fetching seminar:', error);
    return null;
  }
};

export const getSeminarsByCategory = async (category: string): Promise<Seminar[]> => {
  const seminars = await getSeminars();
  if (category === 'all') return seminars;

  // Map categories to target groups
  const categoryMap: { [key: string]: string[] } = {
    'organizations': ['Companies and Organizations', 'Diplomacy & International Relations', 'Professional Development'],
    'candidates': ['Individuals', 'Individuals (Women)']
  };

  const targetCategories = categoryMap[category] || [];
  return seminars.filter(seminar => targetCategories.includes(seminar.category));
};

export const getFormattedDate = (dateString: string, language: string = 'DE'): string => {
  const date = new Date(dateString);

  // Map language codes to locale strings
  const localeMap: { [key: string]: string } = {
    'DE': 'de-DE',
    'FR': 'fr-FR',
    'EN': 'en-US',
    'AR': 'ar-TN'
  };

  const locale = localeMap[language] || 'de-DE';

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getFormattedPrice = (price: number | string | null, currency: string, language: string = 'de'): string => {
  const commonTranslations = getCommonSeminarTranslation(language.toLowerCase());

  if (price === null) {
    return commonTranslations.seminars_price_on_request || 'On Request';
  }

  // Convert string to number if needed
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(priceNum)) {
    return commonTranslations.seminars_price_on_request || 'On Request';
  }

  return `${priceNum.toFixed(2)} ${currency}`;
};
