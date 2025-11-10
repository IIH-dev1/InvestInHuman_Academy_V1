"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, use } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Award, Euro, Target, BookOpen, Star, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactModal from "@/components/contact-modal"
import { useSeminarTranslation } from "@/lib/useSeminarTranslation"
import { getSeminarById, getFormattedDate, getFormattedPrice, type Seminar } from "@/lib/seminar-utils"
import { useTranslation } from "@/lib/useTranslation"
import { useLanguage } from "@/components/language-context"

export default function SeminarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslation()
  const { language } = useLanguage()
  const { getSeminar } = useSeminarTranslation()
  const router = useRouter()
  const resolvedParams = use(params)
  const [seminar, setSeminar] = useState<Seminar | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showContactModal, setShowContactModal] = useState(false)

  // Get translated seminar data
  const seminarId = parseInt(resolvedParams.id)
  const translatedSeminar = getSeminar(seminarId)

  useEffect(() => {
    const fetchSeminar = async () => {
      setIsLoading(true)
      const data = await getSeminarById(resolvedParams.id)
      setSeminar(data)
      setIsLoading(false)
    }
    fetchSeminar()
  }, [resolvedParams.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">{t("loading") || "Loading..."}</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!seminar) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>{t("seminars_not_found")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/seminars")}>{t("seminars_back")}</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const getTargetType = (category: string) => {
    const organizationCategories = [
      "Companies and Organizations",
      "Diplomacy & International Relations",
      "Professional Development",
    ]
    return organizationCategories.includes(category) ? "organizations" : "candidates"
  }

  const handleRegister = () => {
    setShowContactModal(true)
  }

  const getContactSubject = () => {
    const title = translatedSeminar?.title || seminar?.title || '';
    return `${t("seminars_contact_subject")} ${title}`;
  }

  const getContactMessage = () => {
    if (!seminar) return ""
    const title = translatedSeminar?.title || seminar.title;
    const duration = translatedSeminar?.duration || seminar.duration;

    return `${t("seminars_contact_message_intro")}

${t("seminars_contact_message_seminar")} ${title}
${t("seminars_contact_message_duration")} ${duration}
${t("seminars_contact_message_format")} ${seminar.format.join(", ")}

${t("seminars_contact_message_request")}
${t("seminars_contact_message_dates")}
${t("seminars_contact_message_pricing")}
${t("seminars_contact_message_registration")}
${t("seminars_contact_message_requirements")}

${t("seminars_contact_message_thanks")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {getTargetType(seminar.category) === "organizations"
                ? t("seminars_for_organizations")
                : t("seminars_for_candidates")}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {translatedSeminar?.category || seminar.category}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {translatedSeminar?.title || seminar.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            {translatedSeminar?.objectives || seminar.objectives}
          </p>
          <div className="flex items-center justify-center space-x-6 mt-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">{translatedSeminar?.duration || seminar.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Euro className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t(`seminars_price_on_request`)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content - Takes up 3 columns */}
            <div className="xl:col-span-3 space-y-8">

              {/* Objectives & Target Audience */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Target className="w-5 h-5 text-amber-600" />
                      <span>{t("seminars_objectives")}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{translatedSeminar?.objectives || seminar.objectives}</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Users className="w-5 h-5 text-amber-600" />
                      <span>{t("seminars_target_audience")}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{translatedSeminar?.target_audience || seminar.target_audience}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Program */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <BookOpen className="w-6 h-6 text-amber-600" />
                    <span>{t("seminars_program")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(translatedSeminar?.program || seminar.program).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-amber-50 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Extras */}
              {seminar.extras.length > 0 && (
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-xl">
                      <Star className="w-6 h-6 text-amber-600" />
                      <span>{t("seminars_extras")}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(translatedSeminar?.extras || seminar.extras).map((extra, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-green-200 bg-green-50"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {extra}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Enhanced Sidebar - Takes up 1 column */}
            <div className="xl:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Registration Card */}
                <Card className="border-2 border-amber-500 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle className="text-lg font-bold">{t("seminars_register_for")}</CardTitle>
                    <CardDescription className="text-amber-100 text-sm">
                      {translatedSeminar?.title || seminar.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Price */}
                    <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Euro className="w-5 h-5 text-amber-600" />
                        <h4 className="font-semibold text-gray-900">{t("seminars_price")}</h4>
                      </div>
                      <p className="text-3xl font-bold text-amber-600">
                        {t(`seminars_price_on_request`)}
                      </p>
                    </div>

                    <Separator />

                    {/* Duration */}
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{t("seminars_duration")}</h4>
                        <p className="text-gray-700 text-sm">{translatedSeminar?.duration || seminar.duration}</p>
                      </div>
                    </div>

                    {/* Format */}
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{t("seminars_format")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {seminar.format.map((format, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certification */}
                    <div className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{t("seminars_certification")}</h4>
                        <p className="text-gray-700 text-sm">{translatedSeminar?.certification || seminar.certification}</p>
                      </div>
                    </div>

                    {/* Register Button */}
                    <div className="pt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={handleRegister}
                      >
                        {t("seminars_register")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info Card */}
                {/* <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-center">Quick Info</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{st(`seminar_${seminar.id}_category`)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium">Professional</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium">German/English</span>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        prefilledSubject={getContactSubject()}
        prefilledMessage={getContactMessage()}
        inquiryType="seminar"
      />
    </div>
  )
}
