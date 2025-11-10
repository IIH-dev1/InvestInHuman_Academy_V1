"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { useTranslation } from "@/lib/useTranslation";
import { SectionReveal } from "@/components/section-reveal";
import { FlagTN, FlagDE } from "@/components/flag-icon";

export default function AboutUsPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {t("about_title")}
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto drop-shadow-md">
            {t("about_subtitle")}
          </p>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-black text-center mb-12">{t("about_vision_title")}</h2>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg shadow-lg border-2 border-amber-200">
                <p className="text-xl text-gray-800 text-center leading-relaxed mb-6">
                  {t("about_vision_desc1")}
                </p>
                <p className="text-lg text-center italic font-semibold text-amber-600">
                  "{t("about_vision_quote")}"
                </p>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-black text-center mb-12">{t("about_impact_title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <Card className="text-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="text-4xl font-bold text-amber-600 mb-2">1000+</div>
                    <CardTitle className="text-lg">{t("about_impact_students")}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="text-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
                    <CardTitle className="text-lg">{t("about_impact_partners")}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="text-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
                    <CardTitle className="text-lg">{t("about_impact_countries")}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="text-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="text-4xl font-bold text-amber-600 mb-2">100+</div>
                    <CardTitle className="text-lg">{t("about_impact_programs")}</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-black text-center mb-12">{t("about_locations_title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-lg group">
                  <CardHeader>
                    <MapPin className="h-12 w-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-2xl group-hover:text-amber-600 transition-colors flex items-center justify-center gap-2">
                      <FlagTN size="lg" /> {t("about_location_tunisia")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium mb-2">{t("about_location_tunisia_city")}</p>
                    <p className="text-gray-600">{t("about_location_tunisia_desc")}</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-lg group">
                  <CardHeader>
                    <MapPin className="h-12 w-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-2xl group-hover:text-amber-600 transition-colors flex items-center justify-center gap-2">
                      <FlagDE size="lg" /> {t("about_location_germany")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium mb-2">{t("about_location_germany_city")}</p>
                    <p className="text-gray-600">{t("about_location_germany_desc")}</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </SectionReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
}