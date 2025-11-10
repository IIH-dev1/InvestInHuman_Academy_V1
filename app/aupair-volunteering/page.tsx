"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Globe, Heart, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/useTranslation"
import { useVolunteerTranslation } from "@/lib/useVolunteerTranslation"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

interface VolunteerProgram {
  id: number
  service_type: string
  title: string
  description: string
  target_group: string
  min_age: number
  max_age: number
  requirements: any
  application_documents: string[]
  partner_organizations: string[]
  additional_notes: string
  duration: string
  monthly_allowance: number
  visa_support: boolean
  insurance_provided: boolean
  partners: Array<{
    id: number
    name: string
    website: string
  }>
}

const serviceTypeColors = {
  aupair: "bg-pink-100 text-pink-800 border-pink-200",
  fsj: "bg-blue-100 text-blue-800 border-blue-200",
  bfd: "bg-green-100 text-green-800 border-green-200",
  foej: "bg-emerald-100 text-emerald-800 border-emerald-200",
  weltwaerts: "bg-purple-100 text-purple-800 border-purple-200",
  ijfd: "bg-orange-100 text-orange-800 border-orange-200"
}

const serviceTypeNames = {
  aupair: "Au-pair",
  fsj: "FSJ - Freiwilliges Soziales Jahr",
  bfd: "BFD - Bundesfreiwilligendienst",
  foej: "FÖJ - Freiwilliges Ökologisches Jahr",
  weltwaerts: "weltwärts",
  ijfd: "IJFD - Internationaler Jugendfreiwilligendienst"
}

export default function AupairVolunteeringPage() {
  const t = useTranslation()
  const vt = useVolunteerTranslation()

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-24 pb-12">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">


          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {vt.t("hero_title_main")} <span className="text-amber-100">{vt.t("hero_title_highlight")}</span> {vt.t("hero_title_suffix")}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            {vt.t("hero_subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-white/90">
              <Users className="h-5 w-5 text-amber-100" />
              <span>{vt.t("hero_age_range")}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Globe className="h-5 w-5 text-amber-100" />
              <span>{vt.t("hero_location")}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Shield className="h-5 w-5 text-amber-100" />
              <span>{vt.t("hero_support")}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Statistics Cards Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vt.t("stats_aupair_title")}</h3>
                  <p className="text-gray-600">{vt.t("stats_aupair_desc")}</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vt.t("stats_fsj_bfd_title")}</h3>
                  <p className="text-gray-600">{vt.t("stats_fsj_bfd_desc")}</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vt.t("stats_foej_title")}</h3>
                  <p className="text-gray-600">{vt.t("stats_foej_desc")}</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vt.t("stats_international_title")}</h3>
                  <p className="text-gray-600">{vt.t("stats_international_desc")}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {vt.t("benefits_title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-amber-500" />,
                  title: vt.t("benefit_support_title"),
                  description: vt.t("benefit_support_desc")
                },
                {
                  icon: <Globe className="h-8 w-8 text-amber-500" />,
                  title: vt.t("benefit_visa_title"),
                  description: vt.t("benefit_visa_desc")
                },
                {
                  icon: <Users className="h-8 w-8 text-amber-500" />,
                  title: vt.t("benefit_partners_title"),
                  description: vt.t("benefit_partners_desc")
                },
                {
                  icon: <Heart className="h-8 w-8 text-amber-500" />,
                  title: vt.t("benefit_development_title"),
                  description: vt.t("benefit_development_desc")
                },
                {
                  icon: <Award className="h-8 w-8 text-amber-500" />,
                  title: vt.t("benefit_certificates_title"),
                  description: vt.t("benefit_certificates_desc")
                },
                {
                  icon: <Calendar className="h-8 w-8 text-amber-500" />,
                  title: vt.t("benefit_flexible_title"),
                  description: vt.t("benefit_flexible_desc")
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className="mb-4">{benefit.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-amber-500 to-amber-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {vt.t("cta_title")}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {vt.t("cta_subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-100"
                >
                  {vt.t("cta_apply")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-amber-600 hover:bg-white hover:text-amber-600"
                >
                  {vt.t("cta_consultation")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
