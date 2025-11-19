"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionReveal } from "@/components/section-reveal";
import ContactModal from "@/components/contact-modal";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useTranslation } from "@/lib/useTranslation";
import {
  Globe,
  Heart,
  Users,
  TreePine,
  GraduationCap,
  CheckCircle2,
  Languages,
  MapPin,
  FileText,
  Plane,
  BookOpen,
  Building2,
  Briefcase,
  Award,
  Shield,
  Clock,
  Network,
} from "lucide-react";

export default function MobilityPage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const volunteeringRef = useRef<HTMLDivElement>(null);
  const studiesRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const statsCards = [
    {
      icon: Heart,
      title: t("stats_aupair_title") || "Au-pair",
      description: t("stats_aupair_desc") || "Childcare & Culture",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Users,
      title: t("stats_fsj_bfd_title") || "FSJ/BFD",
      description: t("stats_fsj_bfd_desc") || "Social Engagement",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TreePine,
      title: t("stats_foej_title") || "FÖJ",
      description: t("stats_foej_desc") || "Environment & Sustainability",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: t("stats_international_title") || "weltwärts/IJFD",
      description: t("stats_international_desc") || "International Cooperation",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const benefitsCards = [
    {
      icon: Shield,
      title: t("benefit_support_title") || "Full Support",
      description: t("benefit_support_desc") || "From application to return - we guide you through the entire process.",
    },
    {
      icon: FileText,
      title: t("benefit_visa_title") || "Visa & Legal",
      description: t("benefit_visa_desc") || "Complete support with visa applications, residence permits, and legal matters.",
    },
    {
      icon: Network,
      title: t("benefit_partners_title") || "Strong Partners",
      description: t("benefit_partners_desc") || "Cooperation with established organizations like Caritas, DRK, Diakonie, and AWO.",
    },
    {
      icon: Award,
      title: t("benefit_development_title") || "Personal Development",
      description: t("benefit_development_desc") || "Gain valuable experiences and develop personally and professionally.",
    },
    {
      icon: GraduationCap,
      title: t("benefit_certificates_title") || "Certificates",
      description: t("benefit_certificates_desc") || "Receive recognized certificates and proofs of participation.",
    },
    {
      icon: Clock,
      title: t("benefit_flexible_title") || "Flexible Duration",
      description: t("benefit_flexible_desc") || "Programs from 6 to 24 months according to your needs and goals.",
    },
  ];

  const studiesServices = [
    {
      icon: Languages,
      title: t("studies_service1_title") || "Pre-Departure Language Training",
      description: t("studies_service1_desc") || "Intensive language preparation before you travel abroad",
    },
    {
      icon: BookOpen,
      title: t("studies_service2_title") || "Academic & Administrative Guidance",
      description: t("studies_service2_desc") || "Complete support for university applications and visa processes",
    },
    {
      icon: Briefcase,
      title: t("studies_service3_title") || "Educational Internships",
      description: t("studies_service3_desc") || "Training internships with partner NGOs and institutions",
    },
    {
      icon: MapPin,
      title: t("studies_service4_title") || "Cultural Integration Support",
      description: t("studies_service4_desc") || "Preparation for departure and cultural adaptation abroad",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: t("studies_step1_title") || "Initial Consultation",
      description: t("studies_step1_desc") || "Assess your goals, interests and academic background",
    },
    {
      number: "02",
      title: t("studies_step2_title") || "Program Selection",
      description: t("studies_step2_desc") || "Find the perfect university and program for you",
    },
    {
      number: "03",
      title: t("studies_step3_title") || "Application Preparation",
      description: t("studies_step3_desc") || "Prepare all required documents and materials",
    },
    {
      number: "04",
      title: t("studies_step4_title") || "Visa & Departure",
      description: t("studies_step4_desc") || "Assistance with visa procedures and departure preparations",
    },
  ];

  const partnershipsPoints = [
    t("studies_partners_point1") || "Partner universities in Germany and Europe",
    t("studies_partners_point2") || "Educational NGOs for internship placements",
    t("studies_partners_point3") || "Cultural exchange programs",
    t("studies_partners_point4") || "Language certification centers",
  ];

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
              <Globe className="mr-2 h-4 w-4" />
              {t("mobility_badge") || "International Mobility"}
            </Badge>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t("mobility_title") || "International Mobility"}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto drop-shadow-md">
              {t("mobility_subtitle") || "Your gateway to international experiences and personal growth"}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
              {t("mobility_description") || "We accompany you in volunteer services, au pair stays, and studies abroad with comprehensive support"}
            </p>
          </SectionReveal>

          {/* Navigation Buttons */}
          <SectionReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => scrollToSection(volunteeringRef)}
              >
                <Heart className="h-5 w-5 mr-2" />
                {t("mobility_hero_btn_volunteering") || "Volunteer Services & Au-pair"}
              </Button>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                onClick={() => scrollToSection(studiesRef)}
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                {t("mobility_hero_btn_studies") || "Studies Abroad"}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Volunteering & Au-pair Section */}
      <section ref={volunteeringRef} className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700 text-base px-4 py-2">
                {t("mobility_volunteering_title") || "Volunteer Services & Au-pair Programs"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("mobility_volunteering_subtitle") || "Cultural exchange and social engagement in Germany"}
              </h2>
            </div>
          </SectionReveal>

          {/* Stats Cards */}
          <SectionReveal delay={0.2}>
            <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group h-full"
                  >
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-black mb-2">
                        {stat.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {stat.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </SectionReveal>

          {/* Benefits Section */}
          <SectionReveal delay={0.3}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                {t("volunteering_benefits_title") || "Benefits of Our Volunteer Programs"}
              </h3>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitsCards.map((benefit, index) => (
              <SectionReveal key={index} delay={0.4 + index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.7}>
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setIsContactModalOpen(true);
                  setContactSubject(t("volunteering_contact_subject") || "Volunteer Services & Au-pair Programs Inquiry");
                  setContactMessage(t("volunteering_contact_message") || "");
                }}
              >
                <Heart className="h-5 w-5 mr-2" />
                {t("volunteering_cta_button") || "Apply Now"}
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Studies Abroad Section */}
      <section ref={studiesRef} className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-500 text-white text-base px-4 py-2">
                <GraduationCap className="mr-2 h-4 w-4" />
                {t("mobility_studies_title") || "Studies & Internships Abroad"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("mobility_studies_subtitle") || "Academic excellence with intercultural experience"}
              </h2>
            </div>
          </SectionReveal>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {studiesServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <SectionReveal key={index} delay={0.2 + index * 0.1}>
                  <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group h-full">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-black mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </SectionReveal>
              );
            })}
          </div>

          {/* Process Steps */}
          <SectionReveal delay={0.5}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                {t("studies_process_title") || "Our Application Process"}
              </h3>
              <p className="text-gray-600">
                {t("studies_process_subtitle") || "A structured path to success abroad"}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.7}>
            <div className="text-center mb-12">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setIsContactModalOpen(true);
                  setContactSubject(t("studies_contact_subject") || "Studies & Internships Abroad Inquiry");
                  setContactMessage(t("studies_contact_message") || "");
                }}
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                {t("studies_cta_button") || "Get Information"}
              </Button>
            </div>
          </SectionReveal>

          {/* Educational Partnerships */}
          <SectionReveal delay={0.7}>
            <Card className="border-2 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black">
                  {t("studies_partners_title") || "Educational Partnerships"}
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  {t("studies_partners_desc") || "We collaborate with universities, NGOs, and educational institutions to offer quality internship and study opportunities abroad."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 md:grid-cols-2 mb-6">
                  {partnershipsPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                  <p className="text-sm">
                    <strong className="text-amber-900">
                      {t("studies_notice_title") || "Note:"}
                    </strong>{" "}
                    <span className="text-amber-800">
                      {t("studies_notice_text") || "We provide comprehensive linguistic, intercultural, and administrative support. We do not offer professional job placement services, but focus on educational internships with partner NGOs and institutions."}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
        <SectionReveal delay={0.3}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {t("mobility_cta_title") || "Ready for Your International Adventure?"}
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              {t("mobility_cta_subtitle") || "Start your journey with volunteer programs, au pair, or studies abroad"}
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsContactModalOpen(true)}
            >
              <Plane className="h-5 w-5 mr-2" />
              {t("mobility_cta_button") || "Contact Us Now"}
            </Button>
          </div>
        </SectionReveal>
      </section>

      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={contactSubject || t("mobility_contact_subject") || "International Mobility Programs Inquiry"}
        prefilledMessage={contactMessage || t("mobility_contact_message") || ""}
      />
    </div>
  );
}
