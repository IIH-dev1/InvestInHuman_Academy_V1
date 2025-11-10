"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Users, Lightbulb, TrendingUp, MessageCircle, Award, Send, Languages, FileText, Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { useTranslation } from "@/lib/useTranslation";
import { SectionReveal } from "@/components/section-reveal";
import { useState } from "react";

export default function CoachingPage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
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
            {t("coaching_badge") || "Personal Development"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t("coaching_hero_title") || "Coaching & Personal Development"}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t("coaching_hero_subtitle") || "Reveal your potential and achieve success in a global context"}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
            {t("coaching_hero_description") || "InvestInHuman coaching helps each person build confidence, motivation, and success on the international stage"}
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsContactModalOpen(true)}
          >
            <Send className="h-5 w-5 mr-2" />
            {t("coaching_cta_book") || "Book a Session"}
          </Button>
        </div>
      </section>

      {/* Coaching Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("coaching_services_title") || "Our Coaching Services"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("coaching_services_subtitle") || "Personalized coaching focused on confidence, motivation, and global success"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coachingServices.map((service, index) => (
              <SectionReveal key={service.id} delay={0.1 + index * 0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group">
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {t("coaching_benefits_title") || "Why Choose Our Coaching"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <SectionReveal key={index} delay={0.2 + index * 0.1}>
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
        </div>
      </section>

      {/* Career Boost International Program */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700">
                Career Development Program
              </Badge>
              <h2 className="text-3xl font-bold text-black mb-6">Career Boost International</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A 6-12 week program that optimally prepares you for your international career
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <SectionReveal delay={0.3}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <Languages className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">Language Training</CardTitle>
                  <CardDescription className="min-h-[48px]">German, English, French, Arabic</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">Professional language courses for the international job market</p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <Users className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">Intercultural Competence</CardTitle>
                  <CardDescription className="min-h-[48px]">Developing cultural intelligence</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">Understanding and navigating in different cultures</p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.5}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <FileText className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">Application & Career Start</CardTitle>
                  <CardDescription className="min-h-[48px]">Professional application documents</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">CV optimization and interview training to international standards</p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.6}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500 h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <Search className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <CardTitle className="text-xl min-h-[56px] flex items-center justify-center">Job Search & Matching</CardTitle>
                  <CardDescription className="min-h-[48px]">Strategic job search and placement</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-sm text-gray-600">Access to our international network of employers</p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <SectionReveal delay={0.5}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              {t("career_boost_cta_title") || "Ready to Accelerate Your International Career?"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("career_boost_cta_subtitle") || "Join our Career Boost International program and get comprehensive preparation for your global career success"}
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsContactModalOpen(true)}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              {t("career_boost_cta_button") || "Apply for Career Boost Program"}
            </Button>
          </div>
        </SectionReveal>
      </section>

      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject="Career Boost International Program Application"
        prefilledMessage={`Dear Invest In Human Academy Team,

I am interested in applying for the Career Boost International program.

I would like to learn more about:
- Program schedule and duration (6-12 weeks)
- Language training options available
- Intercultural competence development
- Application support and career matching services
- Program fees and payment options
- Start dates and enrollment process

Please provide me with detailed information about the program.

Thank you!`}
      />
    </div>
  );
}
