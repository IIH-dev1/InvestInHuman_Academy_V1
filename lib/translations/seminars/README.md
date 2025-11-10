# Modular Seminar Translations System

This directory contains a modular translation system for seminars. Each seminar has its own file, making it easy to add, edit, or remove seminars without affecting others.

## Structure

```
lib/translations/seminars/
├── index.ts          # Main entry point and utility functions
├── common.ts         # Common translations shared across all seminars
├── seminar-1.ts      # Seminar 1: Interkulturelle Kommunikation
├── seminar-2.ts      # Seminar 2: Internationale Soziale Etikette
├── seminar-3.ts      # Seminar 3: Ladylike Special Programm
├── seminar-4.ts      # Seminar 4: Business & Diplomatisches Protokoll
├── seminar-5.ts      # Seminar 5: Invest In Human
└── README.md         # This file
```

## How to Add a New Seminar

### Step 1: Create a new seminar file

Create a new file named `seminar-N.ts` (where N is the next seminar number):

```typescript
// lib/translations/seminars/seminar-6.ts
export const seminar6Translations = {
  de: {
    title: "Seminar Title in German",
    description: "Description in German",
    objectives: "Objectives in German",
    target_audience: "Target audience in German",
    duration: "Duration in German",
    certification: "Certification in German",
    category: "Category in German",
    program: [
      "Program item 1",
      "Program item 2",
      // ... more items
    ],
    extras: [
      "Extra 1",
      "Extra 2",
      // ... more extras
    ]
  },
  en: {
    title: "Seminar Title in English",
    description: "Description in English",
    // ... same structure as German
  },
  fr: {
    title: "Seminar Title in French",
    description: "Description in French",
    // ... same structure as German
  },
  ar: {
    title: "Seminar Title in Arabic",
    description: "Description in Arabic",
    // ... same structure as German
  }
};
```

### Step 2: Import and register the seminar

Edit `lib/translations/seminars/index.ts`:

```typescript
// 1. Import the new seminar
import { seminar6Translations } from './seminar-6';

// 2. Add it to the seminarsMap
export const seminarsMap = {
  1: seminar1Translations,
  2: seminar2Translations,
  3: seminar3Translations,
  4: seminar4Translations,
  5: seminar5Translations,
  6: seminar6Translations,  // <- Add your new seminar here
};
```

### Step 3: Add seminar data to seminars.json

Add the seminar data to `/seminars.json`:

```json
{
  "id": 6,
  "title": "Your Seminar Title",
  "price": 399.00,
  "currency": "EUR",
  "price_note": "zzgl. MwSt.",
  "format": ["Offline", "Online", "Inhouse", "Coaching"],
  "category": "Companies and Organizations",
  "duration": "1 Tag (09:00 – 15:00 Uhr)",
  "certification": "International anerkanntes Zertifikat",
  "objectives": "...",
  "target_audience": "...",
  "program": [...],
  "extras": [...],
  "dates": [...],
  "locations": [...]
}
```

That's it! Your new seminar is now available in all 4 languages.

## How to Delete a Seminar

### Step 1: Remove the seminar file

Delete the file `lib/translations/seminars/seminar-N.ts`

### Step 2: Remove from index

Edit `lib/translations/seminars/index.ts` and remove:
- The import statement
- The entry from `seminarsMap`

### Step 3: Remove from seminars.json

Remove the seminar object from `/seminars.json`

## How to Edit a Seminar

Simply edit the corresponding `seminar-N.ts` file. All translations for that seminar are in one place:

```typescript
// lib/translations/seminars/seminar-1.ts
export const seminar1Translations = {
  de: {
    title: "Updated German Title",  // <- Edit here
    // ...
  },
  en: {
    title: "Updated English Title",  // <- Edit here
    // ...
  }
  // ...
};
```

## Usage in Components

### Get seminar-specific translations

```typescript
import { useSeminarTranslation } from '@/lib/translations/seminars';

// In your component
const { t, getSeminar } = useSeminarTranslation(seminarId, language);

// Access translations
const title = getSeminar(1)?.title;
const description = getSeminar(1)?.description;
```

### Get common translations

```typescript
import { useSeminarTranslation } from '@/lib/translations/seminars';

// In your component
const { t, common } = useSeminarTranslation(null, language);

// Access common translations
const allSeminarsText = t('seminars_all');
const priceText = t('seminars_price');
```

### Using with useLanguage hook

```typescript
import { useLanguage } from '@/components/language-context';
import { useSeminarTranslation } from '@/lib/translations/seminars';

function SeminarComponent() {
  const { language } = useLanguage();
  const { t, getSeminar } = useSeminarTranslation(1, language);
  
  const seminar = getSeminar(1);
  
  return (
    <div>
      <h1>{seminar?.title}</h1>
      <p>{seminar?.description}</p>
      <button>{t('seminars_register')}</button>
    </div>
  );
}
```

## Available Languages

- `de` - German (Deutsch)
- `en` - English
- `fr` - French (Français)
- `ar` - Arabic (العربية)

## Translation Structure

Each seminar translation file should have this structure:

```typescript
{
  title: string;
  description: string;
  objectives: string;
  target_audience: string;
  duration: string;
  certification: string;
  category: string;
  program: string[];
  extras: string[];
}
```

## Common Translation Keys

Available in `common.ts`:

- `seminars_title` - "Our Seminars"
- `seminars_subtitle` - Page subtitle
- `seminars_all` - "All Seminars"
- `seminars_for_organizations` - "For Organizations"
- `seminars_for_candidates` - "For Individuals"
- `seminars_details` - "View Details"
- `seminars_register` - "Register"
- `seminars_price` - "Price"
- `seminars_duration` - "Duration"
- `seminars_format` - "Format"
- `seminars_certification` - "Certification"
- `seminars_objectives` - "Objectives"
- `seminars_target_audience` - "Target Audience"
- `seminars_program` - "Program"
- `seminars_extras` - "Additional Services"
- And more...

## Benefits of This System

✅ **Easy to maintain** - Each seminar in its own file
✅ **Easy to add** - Just create a new file and import it
✅ **Easy to delete** - Remove file and import
✅ **Type-safe** - Full TypeScript support
✅ **Scalable** - Add unlimited seminars
✅ **Clean** - No giant translation file
✅ **Organized** - Logical structure

## Notes

- Always maintain all 4 languages when adding/editing
- Keep the translation structure consistent across all languages
- Use descriptive category names
- Program and extras arrays should have the same number of items across languages
