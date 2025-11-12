"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Handshake, Users, TrendingUp, Award, CheckCircle, Send, Briefcase, Target } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { SectionReveal } from "@/components/section-reveal";
import { useTranslation } from "@/lib/useTranslation";
import { useState } from "react";
import { FlagTN, FlagDE } from "@/components/flag-icon";
import Link from "next/link";
import Image from "next/image";

export default function BVMWPage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const bvmwBenefits = [
    {
      icon: Building2,
      title: "900,000+ Companies",
      titleKey: "bvmw_page_benefit1_title",
      description: "Direct access to Germany's largest SME network",
      descKey: "bvmw_page_benefit1_desc"
    },
    {
      icon: Globe,
      title: "International Network",
      titleKey: "bvmw_page_benefit2_title",
      description: "Global business connections across multiple sectors",
      descKey: "bvmw_page_benefit2_desc"
    },
    {
      icon: Handshake,
      title: "Economic Cooperation",
      titleKey: "bvmw_page_benefit3_title",
      description: "Strengthen Tunisia-Germany business relations",
      descKey: "bvmw_page_benefit3_desc"
    },
    {
      icon: Users,
      title: "Educational Partnerships",
      titleKey: "bvmw_page_benefit4_title",
      description: "Collaboration between institutions and universities",
      descKey: "bvmw_page_benefit4_desc"
    },
    {
      icon: TrendingUp,
      title: "Innovation Support",
      titleKey: "bvmw_page_benefit5_title",
      description: "Promote innovation and entrepreneurship",
      descKey: "bvmw_page_benefit5_desc"
    },
    {
      icon: Award,
      title: "Sustainability Focus",
      titleKey: "bvmw_page_benefit6_title",
      description: "Support for sustainable human development",
      descKey: "bvmw_page_benefit6_desc"
    }
  ];

  const services = [
    {
      title: "Business Cooperation",
      titleKey: "bvmw_service1_title",
      description: "Facilitate connections between Tunisian and German companies for mutual growth",
      descKey: "bvmw_service1_desc",
      features: [
        t("bvmw_service1_feature1") || "Business matchmaking",
        t("bvmw_service1_feature2") || "Trade mission support",
        t("bvmw_service1_feature3") || "Partnership facilitation",
        t("bvmw_service1_feature4") || "Market access guidance"
      ]
    },
    {
      title: "Educational Programs",
      titleKey: "bvmw_service2_title",
      description: "Joint educational initiatives and professional training programs",
      descKey: "bvmw_service2_desc",
      features: [
        t("bvmw_service2_feature1") || "Executive education",
        t("bvmw_service2_feature2") || "Professional certifications",
        t("bvmw_service2_feature3") || "Exchange programs",
        t("bvmw_service2_feature4") || "Workshops and seminars"
      ]
    },
    {
      title: "Innovation & Development",
      titleKey: "bvmw_service3_title",
      description: "Support innovation, entrepreneurship, and sustainable development",
      descKey: "bvmw_service3_desc",
      features: [
        t("bvmw_service3_feature1") || "Innovation consulting",
        t("bvmw_service3_feature2") || "Startup support",
        t("bvmw_service3_feature3") || "Technology transfer",
        t("bvmw_service3_feature4") || "Sustainability initiatives"
      ]
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
            <Building2 className="h-4 w-4 mr-2" />
            {t("bvmw_badge") || "Représentation Officielle"}
          </Badge>
          <div className="flex justify-center mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <Image
                src="/logo-bvmw.jpg"
                alt="BVMW Logo"
                width={300}
                height={120}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/95 mb-6 drop-shadow-md">
            {t("bvmw_title") || "Bundesverband mittelständische Wirtschaft"}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t("bvmw_subtitle") || "Accès à plus de 900 000 entreprises allemandes et internationales"}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
            {t("bvmw_description") || "InvestInHuman Academy est la représentation officielle du BVMW en Tunisie – le plus grand réseau de PME allemandes."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <FlagTN size="md" />
              <span className="font-semibold">{t("bvmw_country_tunisia") || "Tunisia"}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <FlagDE size="md" />
              <span className="font-semibold">{t("bvmw_country_germany") || "Germany"}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <Globe className="h-5 w-5" />
              <span className="font-semibold">{t("bvmw_country_world") || "World"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is BVMW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t("bvmw_what_is_title") || "What is BVMW?"}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t("bvmw_what_is_desc") || "The Bundesverband mittelständische Wirtschaft (BVMW) is Germany's largest association representing small and medium-sized enterprises (SMEs). With over 900,000 member companies, BVMW is a powerful network driving economic growth, innovation, and international cooperation."}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <SectionReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">{t("bvmw_role_title") || "Our Role as Official Representative"}</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {t("bvmw_role_desc") || "InvestInHuman Academy proudly serves as the official representation of BVMW in Tunisia. This strategic partnership allows us to:"}
                </p>
                <ul className="space-y-4">
                  {[
                    t("bvmw_role_point1") || "Connect Tunisian businesses with German SMEs",
                    t("bvmw_role_point2") || "Facilitate bilateral trade and investment",
                    t("bvmw_role_point3") || "Promote economic and cultural cooperation",
                    t("bvmw_role_point4") || "Support innovation and entrepreneurship",
                    t("bvmw_role_point5") || "Strengthen educational partnerships",
                    t("bvmw_role_point6") || "Foster sustainable development initiatives"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl shadow-xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white p-4 rounded-xl shadow-lg">
                        <Image
                          src="/logo-bvmw.jpg"
                          alt="BVMW Logo"
                          width={200}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h4 className="text-3xl font-bold text-amber-700 mb-2">900,000+</h4>
                    <p className="text-lg text-slate-700 font-semibold">{t("bvmw_network_companies") || "Member Companies"}</p>
                  </div>
                  <div className="border-t-2 border-amber-200 pt-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <Globe className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">{t("bvmw_network_international") || "International Network"}</p>
                      </div>
                      <div>
                        <TrendingUp className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">{t("bvmw_network_growth") || "Economic Growth"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t("bvmw_benefits_title") || "Benefits of BVMW Partnership"}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t("bvmw_benefits_subtitle") || "Access a world of opportunities through our BVMW representation"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bvmwBenefits.map((benefit, index) => (
              <SectionReveal key={index} delay={0.1 + index * 0.1}>
                <Card className="border-2 border-slate-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl transform hover:scale-105 h-full bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <benefit.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl text-center text-slate-900">
                      {t(benefit.titleKey) || benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base text-slate-600">
                      {t(benefit.descKey) || benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t("bvmw_services_title") || "Our Services Through BVMW"}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t("bvmw_services_subtitle") || "Comprehensive support for businesses, institutions, and individuals"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <SectionReveal key={index} delay={0.1 + index * 0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl text-amber-700">
                      {t(service.titleKey) || service.title}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      {t(service.descKey) || service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("bvmw_cta_title") || "Ready to Connect with 900,000+ Companies?"}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {t("bvmw_cta_subtitle") || "Let us help you access the BVMW network and unlock international business opportunities"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-amber-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsContactModalOpen(true)}
              >
                <Send className="h-5 w-5 mr-2" />
                {t("bvmw_cta_contact") || "Contact BVMW Representative"}
              </Button>
              <Link href="/partnerships">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Handshake className="h-5 w-5 mr-2" />
                  {t("bvmw_cta_partnerships") || "Partnership Opportunities"}
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={t("bvmw_contact_subject") || "BVMW Partnership Inquiry"}
        prefilledMessage={t("bvmw_contact_message") || `Dear InvestInHuman Academy - BVMW Representative Team,

I am interested in learning more about BVMW partnership opportunities and how to access the network of 900,000+ German and international companies.

I would like to discuss:
- Business cooperation opportunities
- Membership and partnership options
- Access to the BVMW network
- Educational and training programs
- Economic cooperation initiatives

Please provide me with more information.

Thank you!`}
      />
    </div>
  );
}
