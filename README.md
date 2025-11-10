# InvestInHuman Academy - Website

A modern, multilingual web application for InvestInHuman Academy, offering intercultural training, language courses, seminars, and career development programs.

## 🌟 Features

### Multilingual Support (4 Languages)
- **German (DE)** - Default language
- **English (EN)**
- **French (FR)**
- **Arabic (AR)**

Real-time language switching with persistent state across all pages.

### Core Pages & Functionality

#### 🏠 Home Page
- Hero section with dynamic announcements carousel
- Services overview with animated cards
- Statistics counter
- Packages section
- Testimonials/success stories
- Social sharing capabilities

#### 📚 Seminars
- **5 Professional Seminars:**
  1. Intercultural Communication
  2. International Social Etiquette
  3. Ladylike Special Program
  4. International Business & Diplomatic Protocol
  5. Invest In Human Training & Coaching

- **Features:**
  - Modular translation system (separate file per seminar)
  - Filter by target audience (Organizations/Individuals)
  - Detailed seminar pages with program modules
  - Registration via contact modal
  - Price on request system

#### 🗣️ Language Courses
- German (A1-C1)
- English (A1-C1)
- French (A1-C1)
- Interactive level selection
- Course-specific inquiry forms

#### 🤝 Au Pair & Volunteering
- Program overview
- Country destinations
- Benefits and requirements
- Application process
- FAQ section

#### 🎯 Coaching
- Personal development services
- Career Boost International program (6-12 weeks)
- 4 coaching focus areas:
  - Orientation & Life Project
  - Soft Skills & Communication
  - Leadership & Self-Esteem
  - Multicultural Team Coaching

#### 🤝 Partnerships
- B2B collaboration opportunities
- Partner benefits
- Success stories
- Partnership inquiry system

#### 🎓 Studies Abroad
- Country programs
- University partnerships
- Application support
- Visa assistance

#### 📧 Contact
- Multi-field contact form with validation
- Real-time error checking
- Animated success/error messages
- SMTP email integration
- 7 different email templates based on inquiry type

#### ℹ️ About Us
- Company mission and vision
- Team presentation
- Core values
- Success metrics

### 🎨 Design & UI

#### Components
- **shadcn/ui** - Modern UI component library
- **Framer Motion** - Smooth animations and transitions
- **Lucide Icons** - Consistent iconography
- **Tailwind CSS** - Utility-first styling

#### Key Features
- Responsive design (mobile, tablet, desktop)
- Dark/light theme support
- Smooth scroll animations
- Section reveal effects
- Hover animations
- Gradient backgrounds
- Glass morphism effects

### 📧 Email System

#### SMTP Configuration
- Server: ssl0.ovh.net:465 (OVH)
- Account: info@investinhuman.tn
- Server-side sending via Nodemailer
- SSL encryption

#### Email Templates (7 Types)
1. **General Contact** - 📧 Blue theme
2. **Language Course** - 🎓 Amber theme with course badges
3. **Seminar** - 📚 Yellow highlight box
4. **Volunteer** - 🌟 Blue highlight box
5. **Partnership** - 🤝 Green highlight box
6. **Coaching** - 💼 Pink highlight box
7. **Studies Abroad** - ✈️ Indigo highlight box

Each template includes:
- Custom subject line
- Unique icon and color scheme
- Reply button with prefilled subject
- Sender information
- HTML and plain text versions

### 🔧 Technical Features

#### Form Validation
- Real-time error checking
- Regex validation for email and phone
- Minimum length requirements
- Error messages in 4 languages
- Animated error display/clearing

#### Analytics
- Page view tracking
- User session tracking
- Exit intent tracking
- Graceful degradation when offline

#### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Language direction support (RTL for Arabic)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MarwenKing15/InvestInHuman_Academy_V1.git
cd InvestInHuman_Academy_V1
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# SMTP Configuration
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=info@investinhuman.tn
SMTP_PASS=your_password_here
RECEIVER_EMAIL=info@investinhuman.tn

# Optional: Analytics API
NEXT_PUBLIC_API_BASE=your_api_url_here
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for production**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
InvestInHuman_Academy_V1/
├── app/                          # Next.js 14 App Router
│   ├── about-us/                 # About page
│   ├── academy/                  # Academy overview
│   ├── aupair-volunteering/      # Au Pair & Volunteering
│   │   ├── [id]/                 # Dynamic program pages
│   │   └── apply/                # Application form
│   ├── coaching/                 # Coaching services
│   ├── contact/                  # Contact page
│   ├── language-courses/         # Language courses
│   ├── partnerships/             # Partnership opportunities
│   ├── seminars/                 # Seminars
│   │   └── [id]/                 # Dynamic seminar details
│   ├── studies-abroad/           # Studies abroad programs
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── AnalyticsInitializer.tsx
│   ├── animated-card.tsx
│   ├── announcement-banner.tsx
│   ├── announcements-carousel.tsx
│   ├── contact-modal.tsx
│   ├── flag-icon.tsx
│   ├── footer.tsx
│   ├── language-context.tsx
│   ├── language-switcher.tsx
│   ├── navbar.tsx
│   ├── packages-section.tsx
│   ├── section-reveal.tsx
│   ├── seminar-registration-modal.tsx
│   ├── social-share.tsx
│   ├── stats-counter.tsx
│   └── theme-provider.tsx
│
├── lib/                          # Utilities and helpers
│   ├── translations/             # Translation system
│   │   └── seminars/             # Modular seminar translations
│   │       ├── index.ts          # Main export
│   │       ├── common.ts         # Common translations
│   │       ├── seminar-1.ts      # Seminar 1 translations
│   │       ├── seminar-2.ts      # Seminar 2 translations
│   │       ├── seminar-3.ts      # Seminar 3 translations
│   │       ├── seminar-4.ts      # Seminar 4 translations
│   │       ├── seminar-5.ts      # Seminar 5 translations
│   │       └── README.md         # Translation docs
│   ├── admin-translations.ts
│   ├── analytics-tracker.ts
│   ├── announcementUtils.ts
│   ├── api.ts
│   ├── apiClient.ts
│   ├── logger.ts
│   ├── seminar-utils.ts
│   ├── translations.ts           # Main translations
│   ├── useAdminTranslation.ts
│   ├── useSeminarTranslation.ts
│   ├── useTranslation.ts
│   ├── useVolunteerTranslation.ts
│   ├── utils.ts
│   └── volunteer-translations.ts
│
├── public/                       # Static assets
│   └── manifest.json
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── .env.local                    # Environment variables (gitignored)
├── components.json               # shadcn/ui config
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS config
├── seminars.json                 # Seminar data
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

## 🔌 API Routes

### `/api/send-email`
**POST** - Send contact form emails

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "Message content",
  "inquiryType": "general",
  "courseLanguage": "German",
  "courseLevel": "B1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Inquiry Types:**
- `general` - General contact
- `language-course` - Language course inquiry
- `seminar` - Seminar registration
- `volunteer` - Volunteer program
- `partnership` - Business partnership
- `coaching` - Coaching services
- `studies-abroad` - Study abroad programs

## 🎨 Styling Guidelines

### Color Palette
- **Primary:** Amber/Orange (`#f59e0b`, `#ea580c`)
- **Secondary:** Gray shades
- **Accent:** Blue, Green, Pink (context-specific)

### Typography
- **Font:** System font stack (Arial, sans-serif)
- **Headings:** Bold, gradient text effects
- **Body:** Regular weight, optimized line height

### Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🌍 Adding Translations

### Main Content
Edit `lib/translations.ts` and add your key in all 4 language objects:

```typescript
export const translations = {
  DE: {
    your_key: "Deutscher Text"
  },
  EN: {
    your_key: "English Text"
  },
  FR: {
    your_key: "Texte Français"
  },
  AR: {
    your_key: "النص العربي"
  }
}
```

### Adding a New Seminar

1. **Create translation file:** `lib/translations/seminars/seminar-6.ts`
```typescript
export const seminar6Translations = {
  de: { title: "...", description: "...", ... },
  en: { title: "...", description: "...", ... },
  fr: { title: "...", description: "...", ... },
  ar: { title: "...", description: "...", ... }
};
```

2. **Import and register:** Edit `lib/translations/seminars/index.ts`
```typescript
import { seminar6Translations } from './seminar-6';

export const seminarsMap = {
  ...existing,
  6: seminar6Translations
};
```

3. **Add data:** Add to `seminars.json`

See `lib/translations/seminars/README.md` for detailed instructions.

## 📧 Email Configuration

The application uses Nodemailer for server-side email sending. Configure SMTP settings in `.env.local`:

```env
SMTP_HOST=your_smtp_host
SMTP_PORT=465
SMTP_USER=your_email@domain.com
SMTP_PASS=your_password
RECEIVER_EMAIL=receiver@domain.com
```

Email templates are automatically selected based on the `inquiryType` parameter.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Language switching works on all pages
- [ ] Forms validate correctly
- [ ] Emails send with correct templates
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Animations play smoothly
- [ ] Navigation works correctly
- [ ] Contact modal opens/closes
- [ ] Seminar filtering works
- [ ] Language course selection works
- [ ] All links are functional

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

### Environment Variables on Vercel
Add these in Project Settings → Environment Variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `RECEIVER_EMAIL`
- `NEXT_PUBLIC_API_BASE` (optional)

### Other Platforms
- **Netlify:** Configure build command as `npm run build`
- **AWS Amplify:** Use Next.js deployment preset
- **Docker:** Create `Dockerfile` for containerization

## 📊 Analytics

The application includes basic analytics tracking:
- Page views
- Session duration
- User navigation patterns
- Exit intent

Configure `NEXT_PUBLIC_API_BASE` in `.env.local` to enable analytics.

## 🔒 Security

- **Environment Variables:** Never commit `.env.local`
- **SMTP Credentials:** Stored server-side only
- **Form Validation:** Both client and server-side
- **Email Sanitization:** All inputs are sanitized
- **Rate Limiting:** Consider adding for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive commit messages

## 📝 License

This project is proprietary and confidential.
© 2025 InvestInHuman Academy. All rights reserved.

## 👥 Team

**Developer:** MarwenKing15
**Organization:** InvestInHuman Academy

## 📞 Support

For questions or issues:
- **Email:** info@investinhuman.tn
- **Website:** [investinhuman.tn](https://investinhuman.tn)

## 🗺️ Roadmap

### Planned Features
- [ ] User authentication system
- [ ] Admin dashboard for content management
- [ ] Online course enrollment
- [ ] Payment integration
- [ ] Student portal
- [ ] Certificate generation
- [ ] Blog section
- [ ] Events calendar
- [ ] Newsletter integration
- [ ] Live chat support

## 📚 Documentation

- [Translation System Guide](lib/translations/seminars/README.md)
- [Email Templates Documentation](EMAIL_TEMPLATES.md)
- [Seminar Migration Guide](SEMINAR_TRANSLATIONS_MIGRATION.md)

## 🔄 Recent Updates

### Version 1.0.0
- ✅ Complete multilingual support (DE, EN, FR, AR)
- ✅ Modular seminar translation system
- ✅ 7 email templates with unique designs
- ✅ SMTP integration with Nodemailer
- ✅ Form validation with animations
- ✅ Responsive design across all devices
- ✅ Career Boost International program section
- ✅ Analytics tracking system
- ✅ Social sharing capabilities

## 🙏 Acknowledgments

- **Next.js** - React framework
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - Icon set
- **Nodemailer** - Email functionality
- **Vercel** - Hosting platform

---

**Built with ❤️ by the InvestInHuman Academy team**
