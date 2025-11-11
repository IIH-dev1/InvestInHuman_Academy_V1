"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Languages, Globe, Award, Users, Clock, CheckCircle, GraduationCap, Send } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { SectionReveal } from "@/components/section-reveal";
import { useTranslation } from "@/lib/useTranslation";
import { useState } from "react";
import { FlagIcon } from "@/components/flag-icon";

export default function LanguageCoursesPage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{
    language: string;
    level: string;
  } | null>(null);

  const handleCourseInquiry = (language: string, level: string) => {
    setSelectedCourse({ language, level });
    setIsContactModalOpen(true);
  };

  const getContactSubject = () => {
    if (!selectedCourse) return t("lang_contact_subject") || "Language Course Inquiry";
    return `${t("lang_contact_subject") || "Language Course Inquiry"} - ${selectedCourse.language} ${selectedCourse.level}`;
  };

  const getContactMessage = () => {
    if (!selectedCourse) {
      return t("lang_contact_message") || "I am interested in learning more about your language courses.";
    }

    return `${t("lang_contact_message_intro") || "Dear Invest In Human Academy Team,"}

${t("lang_contact_message_interest") || "I am interested in enrolling in the following course:"}

${t("lang_contact_message_course") || "Course:"} ${selectedCourse.language} - ${selectedCourse.level}

${t("lang_contact_message_details") || "Please provide me with information about:"}
- ${t("lang_contact_message_schedule") || "Course schedule and start dates"}
- ${t("lang_contact_message_duration") || "Duration and class times"}
- ${t("lang_contact_message_pricing") || "Pricing and payment options"}
- ${t("lang_contact_message_materials") || "Course materials and resources"}
- ${t("lang_contact_message_registration") || "Registration process"}

${t("lang_contact_message_thanks") || "Thank you!"}`;
  };

  const courseLevels = [
    {
      level: "A1",
      title: t("lang_level_a1_title") || "A1 - Beginner",
      description: t("lang_level_a1_desc") || "Start your journey with basic communication skills",
      features: [
        t("lang_level_feature_basic") || "Basic vocabulary and grammar",
        t("lang_level_feature_everyday") || "Everyday conversations",
        t("lang_level_feature_intro") || "Introduction to the language"
      ]
    },
    {
      level: "A2",
      title: t("lang_level_a2_title") || "A2 - Elementary",
      description: t("lang_level_a2_desc") || "Build confidence in simple situations",
      features: [
        t("lang_level_feature_simple") || "Simple conversations",
        t("lang_level_feature_daily") || "Daily life topics",
        t("lang_level_feature_foundation") || "Strong foundation building"
      ]
    },
    {
      level: "B1",
      title: t("lang_level_b1_title") || "B1 - Intermediate",
      description: t("lang_level_b1_desc") || "Handle most travel and work situations",
      features: [
        t("lang_level_feature_work") || "Work and travel language",
        t("lang_level_feature_opinions") || "Express opinions and ideas",
        t("lang_level_feature_texts") || "Read and write longer texts"
      ]
    },
    {
      level: "B2",
      title: t("lang_level_b2_title") || "B2 - Upper Intermediate",
      description: t("lang_level_b2_desc") || "Communicate fluently in professional settings",
      features: [
        t("lang_level_feature_professional") || "Professional communication",
        t("lang_level_feature_complex") || "Complex topics and discussions",
        t("lang_level_feature_fluency") || "Near-native fluency"
      ]
    },
    {
      level: "C1",
      title: t("lang_level_c1_title") || "C1 - Advanced",
      description: t("lang_level_c1_desc") || "Master advanced language and cultural nuances",
      features: [
        t("lang_level_feature_advanced") || "Advanced academic and professional use",
        t("lang_level_feature_nuanced") || "Nuanced expression",
        t("lang_level_feature_mastery") || "Language mastery"
      ]
    }
  ];

  const languages = [
    {
      id: 1,
      flagCode: 'de' as const,
      name: "German",
      nameKey: "lang_german",
      levels: "A1 - C1",
      exams: "TestDaF, TELC, Goethe",
      description: "From beginner to advanced, professional and academic German",
      descKey: "lang_german_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 2,
      flagCode: 'gb' as const,
      name: "English",
      nameKey: "lang_english",
      levels: "A1 - C1",
      exams: "IELTS, TOEFL, TOEIC",
      description: "General, academic, and professional English courses",
      descKey: "lang_english_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 3,
      flagCode: 'fr' as const,
      name: "French",
      nameKey: "lang_french",
      levels: "A1 - C1",
      exams: "DELF, DALF, TCF",
      description: "Professional and university-level French communication",
      descKey: "lang_french_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 4,
      flagCode: null,
      flagEmoji: "🌍",
      name: "Other Languages",
      nameKey: "lang_other",
      levels: "Various",
      exams: "Available",
      description: "Arabic, Spanish, Italian, Chinese, and more",
      descKey: "lang_other_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Native Instructors",
      titleKey: "lang_feature1_title",
      description: "Learn from experienced native-speaking teachers",
      descKey: "lang_feature1_desc"
    },
    {
      icon: Globe,
      title: "Communicative Approach",
      titleKey: "lang_feature2_title",
      description: "Focus on real-world communication and practical usage",
      descKey: "lang_feature2_desc"
    },
    {
      icon: Clock,
      title: "Flexible Schedules",
      titleKey: "lang_feature3_title",
      description: "In-person (Tunisia & Germany) and online classes available",
      descKey: "lang_feature3_desc"
    },
    {
      icon: Award,
      title: "Certified Programs",
      titleKey: "lang_feature4_title",
      description: "Preparation for internationally recognized exams",
      descKey: "lang_feature4_desc"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            <Languages className="h-4 w-4 mr-2" />
            {t("lang_badge") || "International Language Training"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t("lang_hero_title") || "Language & Intercultural Training"}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t("lang_hero_subtitle") || "Languages and intercultural skills open the doors to the world"}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
            {t("lang_hero_description") || "Our programs combine language learning with intercultural communication and international management training"}
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsContactModalOpen(true)}
          >
            <Send className="h-5 w-5 mr-2" />
            {t("lang_cta_enroll") || "Enroll Now"}
          </Button>
        </div>
      </section>

      {/* Languages Offered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("lang_offered_title") || "Languages We Teach"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("lang_offered_subtitle") || "From beginner to advanced, with certified exam preparation"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {languages.map((lang, index) => (
              <SectionReveal key={lang.id} delay={0.1 + index * 0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  <CardHeader className="flex-none">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 ${lang.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                        {lang.flagCode ? (
                          <FlagIcon countryCode={lang.flagCode} size="lg" />
                        ) : (
                          <span className="text-3xl">{lang.flagEmoji}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className={`text-2xl ${lang.color} group-hover:scale-105 transition-transform`}>
                          {t(lang.nameKey) || lang.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{lang.levels}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-base mb-4 min-h-[3rem]">
                      {t(lang.descKey) || lang.description}
                    </CardDescription>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{lang.exams}</span>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Course Levels Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("lang_levels_title") || "Available Course Levels"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
                {t("lang_levels_subtitle") || "A1 to C1 - Complete learning path for all languages"}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Badge className="bg-amber-500 text-white border-amber-600 px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  {t("lang_badge_native") || "Qualified Native Professors"}
                </Badge>
                <Badge className="bg-amber-500 text-white border-amber-600 px-4 py-2">
                  <Award className="h-4 w-4 mr-2" />
                  {t("lang_badge_certification") || "In-House Tests & Certifications"}
                </Badge>
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {courseLevels.map((course, index) => (
              <SectionReveal key={course.level} delay={0.1 + index * 0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-amber-100 text-amber-800 text-lg px-3 py-1">
                        {course.level}
                      </Badge>
                      <BookOpen className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 mb-6 flex-1">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      {languages.slice(0, 3).map((lang) => (
                        <Button
                          key={`${lang.name}-${course.level}`}
                          variant="outline"
                          className="w-full border-amber-500 text-amber-700 hover:bg-amber-50 justify-start"
                          onClick={() => handleCourseInquiry(lang.name, course.level)}
                        >
                          {lang.flagCode ? (
                            <FlagIcon countryCode={lang.flagCode} size="sm" className="mr-2" />
                          ) : (
                            <span className="mr-2">{lang.flagEmoji}</span>
                          )}
                          {t(lang.nameKey) || lang.name} {course.level}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>

          {/* What's Included Section */}
          <SectionReveal delay={0.3}>
            <Card className="border-2 border-amber-500 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  {t("lang_included_title") || "What's Included in Our Courses"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t("lang_included_professors") || "Qualified Native Professors"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("lang_included_professors_desc") || "Learn from experienced native speakers with professional teaching certifications"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t("lang_included_tests") || "In-House Testing"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("lang_included_tests_desc") || "Regular assessments to track your progress and ensure learning goals are met"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t("lang_included_certification") || "Official Certification"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t("lang_included_certification_desc") || "Receive internationally recognized certificates upon course completion"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("lang_why_choose_title") || "Why Learn With Us"}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <SectionReveal key={index} delay={0.1 + index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {t(feature.titleKey) || feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {t(feature.descKey) || feature.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  {t("lang_approach_title") || "Our Teaching Approach"}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t("lang_approach_desc") || "We use a communicative method focusing on practical skills and real-world application. Our courses combine structured learning with cultural immersion."}
                </p>
                <ul className="space-y-4">
                  {[
                    { textKey: "lang_approach_point1", text: "Interactive lessons with native speakers" },
                    { textKey: "lang_approach_point2", text: "Real-life conversation practice" },
                    { textKey: "lang_approach_point3", text: "Cultural immersion activities" },
                    { textKey: "lang_approach_point4", text: "Exam preparation support" },
                    { textKey: "lang_approach_point5", text: "Small class sizes for personalized attention" }
                  ].map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(point.textKey) || point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center hover:shadow-xl transition-shadow duration-300">
                  <GraduationCap className="h-32 w-32 text-amber-600 opacity-20" />
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Intercultural Communication & International Management Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-300">
                <Globe className="h-4 w-4 mr-2 inline" />
                Beyond Language
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {t("intercultural_section_title") || "Intercultural Communication & International Management"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("intercultural_subtitle") || "Understand and master cultural differences for better international cooperation"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <SectionReveal delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-black">Why Intercultural Skills Matter</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In today's globalized world, language proficiency alone isn't enough. Our intercultural communication training helps you navigate cultural differences and build successful international relationships.
                </p>
                <ul className="space-y-4">
                  {[
                    "Intercultural communication and diplomacy",
                    "Leadership in diverse cultural environments",
                    "International management and cultural intelligence",
                    "Cooperation between institutions and NGOs",
                    "Cross-cultural negotiation skills",
                    "Global business etiquette"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <Users className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Cultural Awareness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Understand and respect diverse cultural perspectives</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <Globe className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Global Mindset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Develop international business acumen</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Master cross-cultural communication strategies</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <Award className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Leadership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Lead diverse international teams effectively</p>
                  </CardContent>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-black mb-6">
              {t("lang_cta_title") || "Ready to Start Learning?"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("lang_cta_subtitle") || "Join our language courses and open doors to new opportunities"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsContactModalOpen(true)}
              >
                <Send className="h-5 w-5 mr-2" />
                {t("lang_cta_contact") || "Contact Us"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-600 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsContactModalOpen(true)}
              >
                {t("lang_cta_info") || "Request Information"}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setSelectedCourse(null);
        }}
        prefilledSubject={getContactSubject()}
        prefilledMessage={getContactMessage()}
        inquiryType="language-course"
        courseLanguage={selectedCourse?.language}
        courseLevel={selectedCourse?.level}
      />
    </div>
  );
}
