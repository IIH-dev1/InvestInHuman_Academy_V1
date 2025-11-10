"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import { useState } from "react"
import ContactModal from "@/components/contact-modal"

interface PackageFeature {
  name: string
  package1: boolean
  package2: boolean
  package3: boolean
  package4: boolean
}

export function PackagesSection() {
  const t = useTranslation()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const packages = [
    {
      id: 1,
      name: t("package1_name"),
      description: t("package1_desc"),
    },
    {
      id: 2,
      name: t("package2_name"),
      description: t("package2_desc"),
    },
    {
      id: 3,
      name: t("package3_name"),
      description: t("package3_desc"),
    },
    {
      id: 4,
      name: t("package4_name"),
      description: t("package4_desc"),
    },
  ]

  const features: PackageFeature[] = [
    {
      name: t("package_service1"),
      package1: true,
      package2: true,
      package3: false,
      package4: true,
    },
    {
      name: t("package_service2"),
      package1: false,
      package2: true,
      package3: false,
      package4: true,
    },
    {
      name: t("package_service3"),
      package1: false,
      package2: true,
      package3: false,
      package4: true,
    },
    {
      name: t("package_service4"),
      package1: false,
      package2: true,
      package3: false,
      package4: true,
    },
    {
      name: t("package_service5"),
      package1: false,
      package2: true,
      package3: false,
      package4: true,
    },
    {
      name: t("package_service6"),
      package1: true,
      package2: false,
      package3: true,
      package4: true,
    },
    {
      name: t("package_service7"),
      package1: false,
      package2: false,
      package3: true,
      package4: true,
    },
    {
      name: t("package_service8"),
      package1: false,
      package2: false,
      package3: true,
      package4: true,
    },
    {
      name: t("package_service9"),
      package1: false,
      package2: false,
      package3: true,
      package4: true,
    },
  ]

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("packages_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("packages_subtitle")}
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-amber-500 to-orange-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold text-lg">
                    Service
                  </th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="px-6 py-4 text-center text-white">
                      <div className="font-bold text-lg mb-1">{pkg.name}</div>
                      <div className="text-sm font-normal opacity-90">{pkg.description}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {feature.package1 ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.package2 ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.package3 ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.package4 ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg, pkgIndex) => (
              <Card key={pkg.id} className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription className="text-white/90">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {features.map((feature, idx) => {
                      const isIncluded = pkgIndex === 0 ? feature.package1 :
                        pkgIndex === 1 ? feature.package2 :
                          pkgIndex === 2 ? feature.package3 :
                            feature.package4
                      return (
                        <li key={idx} className="flex items-start gap-2">
                          {isIncluded ? (
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={isIncluded ? "text-gray-900" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => setIsContactModalOpen(true)}
            >
              {t("package_contact_us")}
            </Button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  )
}
