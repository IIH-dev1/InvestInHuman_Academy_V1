# Email Templates Documentation

## Overview
The contact form system supports different email templates based on the type of inquiry. Each template has a unique design with specific icons, colors, and formatting.

## Inquiry Types

### 1. **General Contact** (`general`)
- **Icon:** 📧
- **Subject:** `📧 Contact général - [subject]`
- **Usage:** Default template for general inquiries from the contact page
- **Example:**
  ```typescript
  inquiryType: 'general'
  ```

### 2. **Language Course** (`language-course`)
- **Icon:** 🎓
- **Subject:** `🎓 Demande de cours de langue - [language] [level]`
- **Color Theme:** Amber/Orange badges
- **Special Fields:**
  - Course Language (displayed in badge)
  - Course Level (displayed in badge)
- **Usage:** Inquiries from language courses page
- **Example:**
  ```typescript
  inquiryType: 'language-course',
  courseLanguage: 'German',
  courseLevel: 'A1'
  ```

### 3. **Seminar** (`seminar`)
- **Icon:** 📚
- **Subject:** `📚 Demande d'information - Séminaire`
- **Color Theme:** Amber/Yellow highlight box
- **Usage:** Inquiries about professional seminars
- **Example:**
  ```typescript
  inquiryType: 'seminar'
  ```

### 4. **Volunteer/Au Pair** (`volunteer`)
- **Icon:** 🌟
- **Subject:** `🌟 Demande de volontariat / Au Pair`
- **Color Theme:** Blue highlight box
- **Usage:** Inquiries about volunteer programs or Au Pair opportunities
- **Example:**
  ```typescript
  inquiryType: 'volunteer'
  ```

### 5. **Partnership** (`partnership`)
- **Icon:** 🤝
- **Subject:** `🤝 Demande de partenariat`
- **Color Theme:** Green highlight box
- **Usage:** Business partnership inquiries
- **Example:**
  ```typescript
  inquiryType: 'partnership'
  ```

### 6. **Coaching** (`coaching`)
- **Icon:** 💼
- **Subject:** `💼 Demande de coaching professionnel`
- **Color Theme:** Pink highlight box
- **Usage:** Professional coaching inquiries
- **Example:**
  ```typescript
  inquiryType: 'coaching'
  ```

### 7. **Studies Abroad** (`studies-abroad`)
- **Icon:** ✈️
- **Subject:** `✈️ Demande d'information - Études à l'étranger`
- **Color Theme:** Indigo highlight box
- **Usage:** Inquiries about international study programs
- **Example:**
  ```typescript
  inquiryType: 'studies-abroad'
  ```

## How to Use

### Contact Modal Component
```tsx
<ContactModal
  isOpen={isContactModalOpen}
  onClose={() => setIsContactModalOpen(false)}
  prefilledSubject="Course Inquiry"
  prefilledMessage="I'm interested in..."
  inquiryType="language-course"  // Specify the type
  courseLanguage="German"         // Optional for language-course
  courseLevel="A1"               // Optional for language-course
/>
```

### API Endpoint
Send POST request to `/api/send-email` with:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+216 12 345 678",
  "subject": "Course Inquiry",
  "message": "I'm interested in learning German",
  "inquiryType": "language-course",
  "courseLanguage": "German",
  "courseLevel": "A1"
}
```

## Email Template Structure

Each email includes:
- **Header:** Gradient background with icon and title
- **Type Badge:** Color-coded highlight box (for specific inquiry types)
- **Contact Details:**
  - Name
  - Email (clickable link)
  - Phone (if provided)
  - Course info (for language courses)
- **Subject & Message:** Formatted with proper spacing
- **Footer:** 
  - Submission timestamp (Tunisia timezone)
  - Reply instruction

## Adding New Inquiry Types

1. Update the `InquiryType` in `/app/api/send-email/route.ts`
2. Add a new case in the `generateEmailTemplate` function
3. Define:
   - `emailSubject` - Email subject line
   - `headerIcon` - Emoji icon
   - `headerTitle` - Email header title
   - `specificFields` - Any special fields/badges to display
4. Update the ContactModal interface if needed

## Example Email Output

**Language Course Inquiry:**
```
Subject: 🎓 Demande de cours de langue - German A1

Header: 🎓 Nouvelle demande de cours de langue

[Badge: German] [Badge: A1]

👤 Nom: John Doe
📧 Email: john@example.com
📱 Téléphone: +216 12 345 678
📋 Sujet: German A1 Course
💬 Message: I would like to enroll...

📅 Date de soumission: [Tunisia time]
✅ Vous pouvez répondre directement à cet email
```

## SMTP Configuration

Emails are sent via:
- **Host:** ssl0.ovh.net
- **Port:** 465 (SSL)
- **From:** info@investinhuman.tn
- **To:** info@investinhuman.tn

Configure in `.env.local`:
```bash
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=info@investinhuman.tn
SMTP_PASS=investinvest2025.
RECEIVER_EMAIL=info@investinhuman.tn
```
