"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Globe, FileText, Users, CheckCircle, BookOpen, Plane, Building, Send } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { useTranslation } from "@/lib/useTranslation";
import { SectionReveal } from "@/components/section-reveal";
import { useState } from "react";

export default function StudiesAbroadPage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const services = [
    {
      id: 1,
      icon: BookOpen,
      title: "Pre-Departure Language Training",
      titleKey: "studies_service1_title",
      description: "Intensive language preparation before you travel abroad",
      descKey: "studies_service1_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 2,
      icon: FileText,
      title: "Academic & Administrative Guidance",
      titleKey: "studies_service2_title",
      description: "Complete support for university applications and visa processes",
      descKey: "studies_service2_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 3,
      icon: Building,
      title: "Educational Internships",
      titleKey: "studies_service3_title",
      description: "Training internships with partner NGOs and institutions",
      descKey: "studies_service3_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 4,
      icon: Globe,
      title: "Cultural Integration Support",
      titleKey: "studies_service4_title",
      description: "Preparation for departure and cultural adaptation abroad",
      descKey: "studies_service4_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  const supportSteps = [
    {
      step: "1",
      title: "Initial Consultation",
      titleKey: "studies_step1_title",
      description: "Assess your goals, interests and academic background",
      descKey: "studies_step1_desc"
    },
    {
      step: "2",
      title: "Program Selection",
      titleKey: "studies_step2_title",
      description: "Find the perfect university and program for you",
      descKey: "studies_step2_desc"
    },
    {
      step: "3",
      title: "Application Preparation",
      titleKey: "studies_step3_title",
      description: "Prepare all required documents and materials",
      descKey: "studies_step3_desc"
    },
    {
      step: "4",
      title: "Visa & Departure",
      titleKey: "studies_step4_title",
      description: "Assistance with visa procedures and departure preparations",
      descKey: "studies_step4_desc"
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
            <GraduationCap className="h-4 w-4 mr-2" />
            {t("studies_badge") || "International Education"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t("studies_hero_title") || "Studies & Internships Abroad"}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t("studies_hero_subtitle") || "Complete support for your international education journey"}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
            {t("studies_hero_description") || "InvestInHuman accompanies young people in preparing for studies and educational internships abroad through linguistic, intercultural, and administrative support"}
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsContactModalOpen(true)}
          >
            <Send className="h-5 w-5 mr-2" />
            {t("studies_cta_apply") || "Start Your Application"}
          </Button>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700">
              <strong className="text-amber-900">{t("studies_notice_title") || "Note:"}</strong>{" "}
              {t("studies_notice_text") || "We provide comprehensive linguistic, intercultural, and administrative support. We do not offer professional job placement services, but focus on educational internships with partner NGOs and institutions."}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("studies_services_title") || "Our Support Services"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("studies_services_subtitle") || "Comprehensive guidance from preparation to integration"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
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

      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("studies_process_title") || "Our Application Process"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("studies_process_subtitle") || "A structured path to success in studying abroad"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportSteps.map((step, index) => (
              <SectionReveal key={index} delay={0.1 + index * 0.1}>
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300 relative z-10">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {t(step.titleKey) || step.title}
                    </h3>
                    <p className="text-gray-600">
                      {t(step.descKey) || step.description}
                    </p>
                  </div>
                  {index < supportSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-amber-200 -translate-x-1/2 -z-10" />
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  {t("studies_partners_title") || "Educational Partnerships"}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t("studies_partners_desc") || "We collaborate with universities, NGOs, and educational institutions to offer quality internship and study opportunities abroad."}
                </p>
                <ul className="space-y-4">
                  {[
                    { textKey: "studies_partners_point1", text: "Partner universities in Germany and Europe" },
                    { textKey: "studies_partners_point2", text: "Educational NGOs for internship placements" },
                    { textKey: "studies_partners_point3", text: "Cultural exchange programs" },
                    { textKey: "studies_partners_point4", text: "Language certification centers" }
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
                  <Plane className="h-32 w-32 text-amber-600 opacity-20" />
                </div>
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
              {t("studies_cta_title") || "Ready to Study Abroad?"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("studies_cta_subtitle") || "Let us help you prepare for your international education journey"}
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 transition-all duration-300"
              onClick={() => setIsContactModalOpen(true)}
            >
              {t("studies_cta_contact") || "Contact Our Team"}
            </Button>
          </SectionReveal>
        </div>
      </section>
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={t("studies_contact_subject") || "Studies & Internships Abroad Inquiry"}
        prefilledMessage={t("studies_contact_message") || "I am interested in your studies and internships abroad program. Please provide me with more information about:\n\n- Available programs and destinations\n- Eligibility requirements\n- Application process\n- Costs and financial support\n- Timeline\n\nThank you!"}
      />
    </div>
  );
}
