"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Building2, GraduationCap, Users, Globe, Briefcase, Heart, Target, Send } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/contact-modal";
import { SectionReveal } from "@/components/section-reveal";
import { useTranslation } from "@/lib/useTranslation";
import { useState } from "react";
import { FlagTN, FlagDE } from "@/components/flag-icon";

export default function PartnershipsPage() {
  const t = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const partnershipTypes = [
    {
      id: 1,
      icon: Briefcase,
      title: "Corporate Training",
      titleKey: "partnerships_type1_title",
      description: "Continuous professional development programs for companies and institutions",
      descKey: "partnerships_type1_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Educational Projects",
      titleKey: "partnerships_type2_title",
      description: "Joint educational and cultural initiatives with universities and schools",
      descKey: "partnerships_type2_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 3,
      icon: Heart,
      title: "Civic Initiatives",
      titleKey: "partnerships_type3_title",
      description: "Social responsibility and community development programs",
      descKey: "partnerships_type3_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 4,
      icon: Globe,
      title: "International Network",
      titleKey: "partnerships_type4_title",
      description: "Tunisia - Germany - Global partner ecosystem for human development",
      descKey: "partnerships_type4_desc",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  const partnerCategories = [
    {
      icon: Building2,
      title: "Enterprises & Corporations",
      titleKey: "partnerships_cat1_title",
      description: "Custom training solutions for workforce development",
      descKey: "partnerships_cat1_desc"
    },
    {
      icon: GraduationCap,
      title: "Universities & Schools",
      titleKey: "partnerships_cat2_title",
      description: "Academic collaboration and student exchange programs",
      descKey: "partnerships_cat2_desc"
    },
    {
      icon: Users,
      title: "NGOs & Associations",
      titleKey: "partnerships_cat3_title",
      description: "Joint projects for social impact and community development",
      descKey: "partnerships_cat3_desc"
    },
    {
      icon: Target,
      title: "Public Institutions",
      titleKey: "partnerships_cat4_title",
      description: "Government partnerships for capacity building initiatives",
      descKey: "partnerships_cat4_desc"
    }
  ];

  const benefits = [
    {
      title: "Expertise",
      titleKey: "partnerships_benefit1_title",
      description: "Access to specialized training and consulting services",
      descKey: "partnerships_benefit1_desc"
    },
    {
      title: "Network",
      titleKey: "partnerships_benefit2_title",
      description: "Connect with international partners across Tunisia, Germany, and beyond",
      descKey: "partnerships_benefit2_desc"
    },
    {
      title: "Impact",
      titleKey: "partnerships_benefit3_title",
      description: "Create meaningful change through collaborative human development",
      descKey: "partnerships_benefit3_desc"
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
            <Handshake className="h-4 w-4 mr-2" />
            {t("partnerships_badge") || "International Cooperation"}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t("partnerships_hero_title") || "Partnerships & International Cooperation"}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {t("partnerships_hero_subtitle") || "Building bridges for human development across borders"}
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-4xl mx-auto">
            {t("partnerships_hero_description") || "We collaborate with enterprises, universities, NGOs, and public institutions to create joint programs for training and human development"}
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsContactModalOpen(true)}
          >
            <Send className="h-5 w-5 mr-2" />
            {t("partnerships_cta_partner") || "Become a Partner"}
          </Button>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("partnerships_types_title") || "Partnership Opportunities"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("partnerships_types_subtitle") || "Collaborative programs designed for mutual growth and impact"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <SectionReveal key={type.id} delay={0.1 + index * 0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group">
                  <CardHeader>
                    <div className={`w-16 h-16 ${type.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <type.icon className={`h-8 w-8 ${type.color}`} />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-amber-600 transition-colors">
                      {t(type.titleKey) || type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(type.descKey) || type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("partnerships_categories_title") || "Who We Partner With"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("partnerships_categories_subtitle") || "Building diverse partnerships for comprehensive impact"}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerCategories.map((category, index) => (
              <SectionReveal key={index} delay={0.1 + index * 0.1}>
                <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                      <category.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-lg">
                      {t(category.titleKey) || category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t(category.descKey) || category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {t("partnerships_benefits_title") || "Partnership Benefits"}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <SectionReveal key={index} delay={0.1 + index * 0.1}>
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-amber-600 mb-4">
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

      {/* Global Network */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center">
              <Globe className="h-16 w-16 text-amber-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-black mb-6">
                {t("partnerships_network_title") || "Tunisia - Germany - World"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t("partnerships_network_desc") || "Our international partner network connects organizations across borders for human development, training, and cultural exchange"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="px-6 py-3 bg-amber-100 text-amber-800 text-xl hover:scale-110 transition-transform flex items-center gap-2">
                  <FlagTN size="md" /> Tunisia
                </Badge>
                <Badge className="px-6 py-3 bg-amber-100 text-amber-800 text-xl hover:scale-110 transition-transform flex items-center gap-2">
                  <FlagDE size="md" /> Germany
                </Badge>
                <Badge className="px-6 py-3 bg-amber-100 text-amber-800 text-xl hover:scale-110 transition-transform">
                  <span className="mr-2">🌍</span> Worldwide
                </Badge>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-black mb-6">
              {t("partnerships_cta_title") || "Let's Create Impact Together"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("partnerships_cta_subtitle") || "Partner with InvestInHuman for training and human development cooperation"}
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white transform hover:scale-105 transition-all duration-300"
              onClick={() => setIsContactModalOpen(true)}
            >
              <Handshake className="h-5 w-5 mr-2" />
              {t("partnerships_cta_contact") || "Contact Us"}
            </Button>
          </SectionReveal>
        </div>
      </section>

      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledSubject={t("partnerships_contact_subject") || "Partnership Inquiry"}
        prefilledMessage={t("partnerships_contact_message") || `Dear Invest In Human Academy Team,

I am interested in exploring partnership opportunities with your organization.

I would like to discuss:
- Types of partnership programs available
- Collaboration opportunities
- Partnership benefits and requirements
- Next steps in the partnership process

Please provide me with more information about how we can work together.

Thank you for your time and consideration.`}
      />
    </div>
  );
}
