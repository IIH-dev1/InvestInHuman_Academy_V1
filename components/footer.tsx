"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Linkedin, Facebook, Send } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import Image from "next/image"

export function Footer() {
  const t = useTranslation()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6 group">
              <Image
                src="/logo-bg.png"
                width={64}
                height={64}
                alt="InvestInHuman Logo"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <div className="flex flex-col items-center -space-y-1">
                <div className="text-2xl font-bold text-white">
                  Invest<span className="text-amber-400">In</span>Human
                </div>
                <span className="text-base font-normal text-white tracking-[0.3em]">
                  Academy
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
              {t("footer_company_desc") || "Empowering individuals and organizations through comprehensive training, cultural exchange, and human development across borders."}
            </p>

            {/* Office Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Germany Office */}
              <div className="space-y-3">
                <h4 className="font-bold text-amber-400 text-lg mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("footer_company_location1") || "Germany"}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>
                      Pfalzgrafenstraße 22<br />
                      67061 Ludwigshafen am Rhein
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <Phone className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <a href="tel:+4962115963353" className="hover:text-amber-400">+49 621 15963353</a>
                      <a href="tel:+4917631233484" className="hover:text-amber-400">+49 176 31233484</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <Mail className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <a href="mailto:info@investinhuman.de" className="hover:text-amber-400">info@investinhuman.de</a>
                  </div>
                </div>
              </div>

              {/* Tunisia Office */}
              <div className="space-y-3">
                <h4 className="font-bold text-amber-400 text-lg mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("footer_company_location2") || "Tunisia"}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Carthage Centre<br />31 Av. De Carthage, Tunis 1001</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <Phone className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <a href="tel:+21695186916" className="hover:text-amber-400">+216 95 186 916</a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                    <Mail className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <a href="mailto:info@investinhuman.tn" className="hover:text-amber-400">info@investinhuman.tn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-amber-400">{t("footer_quick_links") || "Quick Links"}</h3>
            <div className="space-y-3">
              <Link href="/about-us" className="block text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 font-medium">
                {t("nav_about_us") || "About Us"}
              </Link>
              <Link href="/language-courses" className="block text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 font-medium">
                {t("nav_language_courses") || "Language Courses"}
              </Link>
              <Link href="/career-center" className="block text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 font-medium">
                {t("nav_career_center") || "Coaching"}
              </Link>
              <Link href="/mobility" className="block text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 font-medium">
                {t("nav_mobility") || "Mobility"}
              </Link>
              <Link href="/partnerships" className="block text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 font-medium">
                {t("nav_partnerships") || "Partnerships"}
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2 font-medium">
                {t("nav_contact_us") || "Contact"}
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-amber-400">{t("footer_newsletter") || "Newsletter"}</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {t("footer_newsletter_desc") || "Subscribe to receive updates on programs, events, and opportunities."}
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder={t("footer_email_placeholder") || "Enter your email"}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-amber-400 focus:bg-white/20 transition-all"
              />
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                {t("footer_subscribe") || "Subscribe"}
              </Button>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="font-semibold text-sm text-gray-400 mb-3">{t("footer_follow_us") || "Follow Us"}</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.linkedin.com/in/manel-bannouri-0751bb40/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                >
                  <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/investinhumangermany"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                >
                  <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} InvestInHuman. {t("footer_rights") || "All rights reserved."}
              </p>
              <p className="text-gray-500 text-xs flex items-center gap-2">
                Developed by{" "}
                <a
                  href="https://github.com/MarwenKing15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  Marwen Touati
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="https://www.linkedin.com/in/marwentouati15/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  LinkedIn
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                {t("footer_privacy") || "Privacy Policy"}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
                {t("footer_terms") || "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
