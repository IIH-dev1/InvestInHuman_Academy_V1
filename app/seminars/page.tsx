"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useSeminarTranslation } from "@/lib/useSeminarTranslation"
import { getSeminars, getSeminarsByCategory, getFormattedPrice, type Seminar } from "@/lib/seminar-utils"
import Link from "next/link"
import { Users, Briefcase, Award } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useLanguage } from "@/components/language-context"

export default function SeminarsPage() {
  const t = useTranslation()
  const { language } = useLanguage()
  const { getSeminar } = useSeminarTranslation()
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="min-h-screen">
      <Navbar />
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {t("seminars_title")}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            {t("seminars_subtitle")}
          </p>
        </div>
      </section>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {filteredSeminars.map((seminar) => {
                  const translatedSeminar = getSeminar(parseInt(seminar.id));
                  return (
                    <Card key={seminar.id} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-amber-500">
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
                      <CardContent className="space-y-4">
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
                        <div>
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
                          <Link href={`/seminars/${seminar.id}`}>
                            <Button variant="outline" className="flex-1 border-amber-500 text-amber-700 hover:bg-amber-50 bg-transparent">
                              {t("seminars_details")}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
