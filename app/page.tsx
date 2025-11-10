"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Send, Award, Languages, Users, BookOpen, Globe, MessageSquare, Plane, Clock, Briefcase, Heart, Handshake, Building2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactModal from "@/components/contact-modal"
import { SectionReveal } from "@/components/section-reveal"
import { useTranslation } from "@/lib/useTranslation"
import { getSeminars, Seminar } from "@/lib/seminar-utils"
import { useState, useEffect } from "react"

export default function HomePage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactContext, setContactContext] = useState<'general' | 'partnership'>('general');
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [languageCourses, setLanguageCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchSeminarsData();
  }, []);

  const fetchSeminarsData = async () => {
    try {
      const allSeminars = await getSeminars();
      setSeminars(allSeminars.slice(0, 3));
    } catch (error) {
      console.error("Error fetching seminars:", error);
    }
  };

  const academyPrograms = [
    {
      id: 1,
      icon: Globe,
      title: t("academy_program1_title") || "German Business Etiquette",
      description: t("academy_program1_desc") || "Learn professional business etiquette"
    },
    {
      id: 2,
      icon: MessageSquare,
      title: t("academy_program2_title") || "Intercultural Communication",
      description: t("academy_program2_desc") || "Master cross-cultural communication"
    },
    {
      id: 3,
      icon: Plane,
      title: t("academy_program3_title") || "International Mobility",
      description: t("academy_program3_desc") || "Navigate international work mobility"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-40 right-1/4 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl animate-pulse delay-300"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-8">
            {/* Animated badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 shadow-lg animate-fade-in">
              <Award className="h-5 w-5 text-amber-100 mr-2 animate-pulse" />
              <span className="text-white font-semibold text-sm">{t("award_text") || "Certified Training Programs"}</span>
            </div>

            {/* Main headline with animation */}
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                {t("hero_title_1") || "Welcome to"}
                <br />
                <span className="text-amber-50 inline-block mt-2">{t("hero_title_2") || "InvestInHuman Academy"}</span>
              </h1>
              <div className="h-1.5 w-32 bg-white/80 mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-4xl mx-auto drop-shadow-lg leading-relaxed animate-fade-in-delayed">
              {t("academy_hero_subtitle") || "Professional Development, Cultural Training & Language Programs"}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-white/85 max-w-3xl mx-auto drop-shadow-md animate-fade-in-delayed-more">
              {t("hero_subtitle_2") || "Empowering global professionals through comprehensive training and education"}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delayed-most">
              <Link href="/language-courses">
                <Button
                  size="lg"
                  className="bg-white hover:bg-amber-50 text-amber-600 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 px-8 py-6 text-lg group"
                >
                  <GraduationCap className="h-6 w-6 mr-2 group-hover:rotate-12 transition-transform" />
                  {t("explore_programs") || "Explore Programs"}
                </Button>
              </Link>

              <Link href="/partnerships">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 px-8 py-6 text-lg group border-2 border-white/30"
                >
                  <Handshake className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" />
                  {t("partner_cta_button") || "Become a Partner"}
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 px-8 py-6 text-lg shadow-xl group"
                onClick={() => {
                  setContactContext('general');
                  setIsContactModalOpen(true);
                }}
              >
                <Send className="h-6 w-6 mr-2 group-hover:translate-x-1 transition-transform" />
                {t("cta_contact") || "Contact Us"}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-12 animate-fade-in-delayed-most">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="h-5 w-5 text-amber-100" />
                <span className="font-semibold">500+ Students</span>
              </div>
              <div className="h-6 w-px bg-white/30"></div>
              <div className="flex items-center gap-2 text-white/90">
                <Globe className="h-5 w-5 text-amber-100" />
                <span className="font-semibold">20+ Countries</span>
              </div>
              <div className="h-6 w-px bg-white/30"></div>
              <div className="flex items-center gap-2 text-white/90">
                <Building2 className="h-5 w-5 text-amber-100" />
                <span className="font-semibold">50+ Partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>
      {/* Overview of All Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t("services_overview_title") || "Our Services"}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services_overview_subtitle") || "Comprehensive programs for training, mobility, and human development"}</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Language Training */}
            <SectionReveal delay={0.1}>
              <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-all group-hover:scale-110">
                    <Languages className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t("service_languages_title") || "Language Training"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{t("service_languages_desc") || "German, English, French - from A1 to C1 with certified instructors"}</p>
                  <Link href="/language-courses">
                    <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                      {t("learn_more") || "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Intercultural Skills */}
            <SectionReveal delay={0.2}>
              <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-all group-hover:scale-110">
                    <Globe className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t("service_intercultural_title") || "Intercultural Skills"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{t("service_intercultural_desc") || "Cultural communication, diplomacy, and international management"}</p>
                  <Link href="/seminars">
                    <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                      {t("learn_more") || "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Coaching */}
            <SectionReveal delay={0.3}>
              <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-all group-hover:scale-110">
                    <Heart className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t("service_coaching_title") || "Coaching"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{t("service_coaching_desc") || "Personal development, leadership, and soft skills coaching"}</p>
                  <Link href="/coaching">
                    <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                      {t("learn_more") || "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Mobility Programs */}
            <SectionReveal delay={0.4}>
              <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-all group-hover:scale-110">
                    <Plane className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t("service_mobility_title") || "Mobility Programs"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{t("service_mobility_desc") || "Au Pair and international volunteering opportunities"}</p>
                  <Link href="/aupair-volunteering">
                    <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                      {t("learn_more") || "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Studies Abroad */}
            <SectionReveal delay={0.5}>
              <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-all group-hover:scale-110">
                    <GraduationCap className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t("service_studies_title") || "Studies Abroad"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{t("service_studies_desc") || "Academic guidance and educational internship support"}</p>
                  <Link href="/studies-abroad">
                    <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                      {t("learn_more") || "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Partnerships */}
            <SectionReveal delay={0.6}>
              <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-all group-hover:scale-110">
                    <Handshake className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t("service_partnerships_title") || "Partnerships"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{t("service_partnerships_desc") || "International cooperation with institutions and organizations"}</p>
                  <Link href="/partnerships">
                    <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                      {t("learn_more") || "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t("academy_seminars_title") || "Professional Seminars"}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("seminars_subtitle") || "Specialized training for professionals and organizations"}</p>
            </div>
          </SectionReveal>
          {seminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {seminars.map((seminar, index) => (
                <SectionReveal key={seminar.id} delay={0.1 + index * 0.1}>
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-500 transform hover:scale-105 h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3 mb-3">
                        {seminar.category.includes('Companies') || seminar.category.includes('Organizations') ? (
                          <Briefcase className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
                        ) : (
                          <Users className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
                        )}
                        <CardTitle className="text-lg leading-tight">{seminar.title || seminar.category}</CardTitle>
                      </div>
                      <CardDescription className="line-clamp-3 min-h-[60px]">{seminar.objectives || "Professional seminar program"}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-auto pt-4">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-white border border-gray-300 rounded text-gray-700">
                          {t("seminars_price_on_request") || "Prix sur demande"}
                        </span>
                      </div>
                      <Link href={`/seminars/${seminar.id}`}>
                        <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">{t("seminars_details") || "Voir les détails"}</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </SectionReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-8"><p className="text-gray-500">{t("no_seminars") || "Seminars coming soon"}</p></div>
          )}
          <div className="text-center">
            <Link href="/seminars">
              <Button size="lg" variant="outline" className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50">{t("view_all_seminars") || "View All Seminars"}</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-center text-black mb-12">{t("academy_format_title") || "Why Choose InvestInHuman Academy"}</h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal delay={0.1}>
              <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <Clock className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">{t("academy_format_flexible_title") || "Flexible Learning"}</h3>
                <p className="text-gray-600">{t("academy_format_flexible_desc") || "Online, in-person, and hybrid options available"}</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <Award className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">{t("academy_format_cert_title") || "Certified Programs"}</h3>
                <p className="text-gray-600">{t("academy_format_cert_desc") || "Receive recognized certificates upon completion"}</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <Languages className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">{t("academy_format_multi_title") || "Multilingual Instruction"}</h3>
                <p className="text-gray-600">{t("academy_format_multi_desc") || "Programs available in German, English, French, and Arabic"}</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center">
              <Image src="/hero image2.png" alt={t("hero_image_alt") || "InvestInHuman Academy"} width={800} height={400} className="mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" />
              <p className="text-gray-600 mt-4 italic">{t("hero_image_caption") || "Empowering professionals worldwide"}</p>
            </div>
          </SectionReveal>
        </div>
      </section>
      {/* Partnership CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-orange-400/5 to-amber-400/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-amber-100 text-amber-700 border-amber-300 text-sm px-4 py-2">
                <Handshake className="h-4 w-4 mr-2 inline" />
                {t("partner_cta_badge") || "Partnership Opportunities"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {t("partner_cta_title") || "Become a Partner in Human Development"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("partner_cta_subtitle") || "Join leading organizations in shaping the future of professional training and international cooperation"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <SectionReveal delay={0.1}>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{t("partner_type1") || "Corporate Partners"}</h3>
                <p className="text-gray-600 text-sm">{t("partner_type1_desc") || "Collaborate on training programs and talent development initiatives"}</p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{t("partner_type2") || "Educational Institutions"}</h3>
                <p className="text-gray-600 text-sm">{t("partner_type2_desc") || "Build bridges for student exchange and academic cooperation"}</p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{t("partner_type3") || "International Organizations"}</h3>
                <p className="text-gray-600 text-sm">{t("partner_type3_desc") || "Partner on global projects and cultural exchange programs"}</p>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.4}>
            <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t("partner_cta_box_title") || "Ready to Make an Impact Together?"}
                </h3>
                <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
                  {t("partner_cta_box_desc") || "Let's create innovative programs that empower people and transform organizations across borders"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/partnerships">
                    <Button size="lg" className="bg-white hover:bg-gray-100 text-amber-600 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
                      <Handshake className="h-5 w-5 mr-2" />
                      {t("partner_cta_explore") || "Explore Partnership Options"}
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    className="bg-white hover:bg-amber-50 text-amber-600 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-200 group"
                    onClick={() => {
                      setContactContext('partnership');
                      setIsContactModalOpen(true);
                    }}
                  >
                    <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    {t("partner_cta_contact") || "Contact Partnership Team"}
                  </Button>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black mb-6">{t("academy_cta_title") || "Ready to Start Your Learning Journey?"}</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">{t("academy_cta_desc") || "Join our academy and take your professional development to the next level"}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/language-courses">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 transition-all duration-300">{t("academy_cta_btn1") || "Browse Programs"}</Button>
                </Link>
                <Button size="lg" variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300" onClick={() => {
                  setContactContext('general');
                  setIsContactModalOpen(true);
                }}>
                  {t("academy_cta_btn2") || "Request Information"}
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={
          contactContext === 'partnership'
            ? t("partnerships_contact_subject") || "Partnership Inquiry"
            : t("general_contact_subject") || "General Inquiry"
        }
        prefilledMessage={
          contactContext === 'partnership'
            ? t("partnerships_contact_message") || `Dear Invest In Human Academy Team,

I am interested in exploring partnership opportunities with your organization.

I would like to discuss:
- Types of partnership programs available
- Collaboration opportunities
- Partnership benefits and requirements
- Next steps in the partnership process

Please provide me with more information about how we can work together.

Thank you for your time and consideration.`
            : t("general_contact_message") || `Dear Invest In Human Academy Team,

I am interested in learning more about your services and programs.

I would like to inquire about:
- Available programs and services
- Pricing and packages
- Enrollment process
- Any upcoming events or opportunities

Please provide me with more information.

Thank you!`
        }
      />
    </div>
  )
}
