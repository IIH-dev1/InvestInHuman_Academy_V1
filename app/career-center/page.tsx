"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target, Heart, Users, Lightbulb, TrendingUp, MessageCircle, Award, Send,
  Languages, FileText, Search, Briefcase
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { useTranslation } from "@/lib/useTranslation";
import { useSeminarTranslation } from "@/lib/useSeminarTranslation";
import { getSeminarsByCategory, type Seminar } from "@/lib/seminar-utils";
import { SectionReveal } from "@/components/section-reveal";
import Link from "next/link";

export default function CareerCenterPage() {
  const t = useTranslation();
  const { getSeminar } = useSeminarTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for scrolling
  const coachingRef = useRef<HTMLElement>(null);
  const seminarsRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const coachingServices = [
    {
      id: 1,
      icon: Target,
      title: "Orientation & Life Project",
      titleKey: "coaching_service1_title",
      description: "Discover your path and build your future with clarity and confidence",
      descKey: "coaching_service1_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 2,
      icon: MessageCircle,
      title: "Soft Skills & Communication",
      titleKey: "coaching_service2_title",
      description: "Develop essential communication and interpersonal skills for success",
      descKey: "coaching_service2_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Leadership & Self-Esteem",
      titleKey: "coaching_service3_title",
      description: "Build confidence and leadership capabilities for professional growth",
      descKey: "coaching_service3_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 4,
      icon: Users,
      title: "Multicultural Team Coaching",
      titleKey: "coaching_service4_title",
      description: "Strengthen collaboration in diverse, international team environments",
      descKey: "coaching_service4_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Personal Growth",
      titleKey: "coaching_benefit1_title",
      description: "Unlock your full potential in a global context",
      descKey: "coaching_benefit1_desc"
    },
    {
      icon: Lightbulb,
      title: "Clarity & Direction",
      titleKey: "coaching_benefit2_title",
      description: "Gain clear vision for your personal and professional journey",
      descKey: "coaching_benefit2_desc"
    },
    {
      icon: Award,
      title: "Proven Methods",
      titleKey: "coaching_benefit3_title",
      description: "Evidence-based coaching techniques tailored to you",
      descKey: "coaching_benefit3_desc"
    }
  ];

  const targets = [
    { id: "all", label: t("seminars_all"), icon: Award },
    { id: "organizations", label: t("seminars_for_organizations"), icon: Briefcase },
    { id: "candidates", label: t("seminars_for_candidates"), icon: Users },
  ];

  useEffect(() => {
    const fetchSeminars = async () => {
      setIsLoading(true);
      const seminars = await getSeminarsByCategory(selectedTarget);
      setFilteredSeminars(seminars);
      setIsLoading(false);
    };
    fetchSeminars();
  }, [selectedTarget]);

  const getTargetType = (category: string) => {
    const organizationCategories = ['Companies and Organizations', 'Diplomacy & International Relations', 'Professional Development'];
    return organizationCategories.includes(category) ? 'organizations' : 'candidates';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Navigation Buttons */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-base px-4 py-2">
              {t("career_center_badge") || "Personal & Professional Development"}
            </Badge>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t("career_center_title") || "International Career Center"}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto drop-shadow-md">
              {t("career_center_subtitle") || "Your gateway to personal growth and global career success"}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
              {t("career_center_description") || "We accompany you on your journey to international success through personalized coaching and professional training"}
            </p>
          </SectionReveal>

          {/* Navigation Buttons */}
          <SectionReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => scrollToSection(coachingRef)}
              >
                <Target className="h-5 w-5 mr-2" />
                {t("career_center_hero_btn_coaching") || "Coaching"}
              </Button>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => scrollToSection(seminarsRef)}
              >
                <Award className="h-5 w-5 mr-2" />
                {t("career_center_hero_btn_seminars") || "Seminars"}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Coaching Services Section */}
      <section ref={coachingRef} className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700 text-base px-4 py-2">
                {t("career_center_coaching_title") || "Personal Coaching & Development"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("career_center_coaching_subtitle") || "Unlock your full potential with tailored coaching"}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {coachingServices.map((service, index) => (
              <SectionReveal key={service.id} delay={0.1 + index * 0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-amber-600 transition-colors">
                      {t(service.titleKey) || service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(service.descKey) || service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>

          {/* Benefits */}
          <SectionReveal delay={0.3}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                {t("coaching_benefits_title") || "Benefits of Our Coaching"}
              </h3>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <SectionReveal key={index} delay={0.4 + index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {t(benefit.titleKey) || benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {t(benefit.descKey) || benefit.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.6}>
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setIsContactModalOpen(true);
                }}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("coaching_cta_book") || "Book Coaching Session"}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Career Boost International Program */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-500 text-white text-base px-4 py-2">
                {t("career_boost_program_badge") || "Career Development Program"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {t("career_boost_program_title") || "Career Boost International"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("career_boost_program_subtitle") || "A 6-12 week program that optimally prepares you for your international career"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <SectionReveal delay={0.3}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <Languages className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">
                    {t("career_boost_feature1_title") || "Language Training"}
                  </CardTitle>
                  <CardDescription className="min-h-[48px]">
                    {t("career_boost_feature1_desc") || "German, English, French, Arabic"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">
                    {t("career_boost_feature1_detail") || "Professional language courses for the international job market"}
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <Users className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">
                    {t("career_boost_feature2_title") || "Intercultural Competence"}
                  </CardTitle>
                  <CardDescription className="min-h-[48px]">
                    {t("career_boost_feature2_desc") || "Developing cultural intelligence"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">
                    {t("career_boost_feature2_detail") || "Understanding and navigating in different cultures"}
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.5}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <FileText className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">
                    {t("career_boost_feature3_title") || "Application & Career Start"}
                  </CardTitle>
                  <CardDescription className="min-h-[48px]">
                    {t("career_boost_feature3_desc") || "Professional application documents"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">
                    {t("career_boost_feature3_detail") || "CV optimization and interview training to international standards"}
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.6}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <Search className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">
                    {t("career_boost_feature4_title") || "Job Search & Matching"}
                  </CardTitle>
                  <CardDescription className="min-h-[48px]">
                    {t("career_boost_feature4_desc") || "Strategic job search and placement"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">
                    {t("career_boost_feature4_detail") || "Access to our international network of employers"}
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
        <SectionReveal delay={0.3}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {t("career_boost_cta_title") || "Ready to Accelerate Your International Career?"}
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              {t("career_boost_cta_subtitle") || "Join our Career Boost International program and get comprehensive preparation for your global career success"}
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setIsContactModalOpen(true);
              }}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              {t("career_boost_cta_button") || "Apply for Career Boost Program"}
            </Button>
          </div>
        </SectionReveal>
      </section>

      {/* Seminars Section */}
      <section ref={seminarsRef} className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700 text-base px-4 py-2">
                {t("career_center_seminars_title") || "Professional Seminars & Training"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("career_center_seminars_subtitle") || "Develop intercultural competence and international business etiquette"}
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="mb-12">
              <Tabs value={selectedTarget} onValueChange={setSelectedTarget} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  {targets.map((target) => (
                    <TabsTrigger key={target.id} value={target.id} className="flex items-center space-x-2">
                      <target.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{target.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </SectionReveal>

          <section className="mb-20">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">{t("loading") || "Loading..."}</p>
              </div>
            ) : filteredSeminars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">{t("no_seminars_found") || "No seminars found"}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredSeminars.map((seminar, index) => {
                  const translatedSeminar = getSeminar(parseInt(seminar.id));
                  return (
                    <SectionReveal key={seminar.id} delay={0.1 + (index % 4) * 0.1}>
                      <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {getTargetType(seminar.category) === 'organizations' ? (
                              <Briefcase className="h-8 w-8 text-amber-500" />
                            ) : (
                              <Users className="h-8 w-8 text-amber-500" />
                            )}
                            <CardTitle className="text-xl">{translatedSeminar?.title || seminar.title}</CardTitle>
                          </div>
                          <CardDescription>{translatedSeminar?.objectives || seminar.objectives}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow flex flex-col">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {getTargetType(seminar.category) === "organizations" ? t("seminars_for_organizations") : t("seminars_for_candidates")}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {t('seminars_price_on_request')}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">{t("seminars_duration")}</h4>
                            <p className="text-sm text-gray-600">{translatedSeminar?.duration || seminar.duration}</p>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900 mb-2">{t("seminars_format")}</h4>
                            <div className="flex flex-wrap gap-1">
                              {seminar.format.slice(0, 3).map((format, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {format}
                                </Badge>
                              ))}
                              {seminar.format.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{seminar.format.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 pt-4">
                            <Link href={`/seminars/${seminar.id}`} className="flex-1">
                              <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50 bg-transparent">
                                {t("seminars_details")}
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </SectionReveal>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </section>

      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={t("coaching_contact_subject") || "Coaching Session Inquiry"}
        prefilledMessage={t("coaching_contact_message") || `Dear Invest In Human Academy Team,

I am interested in booking a personalized coaching session.

I would like support in the following areas:
- Orientation & Life Project
- Soft Skills & Communication
- Leadership & Self-Esteem
- Multicultural Team Coaching

Please contact me to schedule an appointment and discuss further details.

Thank you!`}
      />
    </div>
  );
}
