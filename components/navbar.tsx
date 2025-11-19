"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { jwtDecode } from "jwt-decode"

import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./language-switcher"
import { useTranslation } from "@/lib/useTranslation"
import ContactModal from "@/components/contact-modal"

export default function Navbar() {
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get user from localStorage (for SSR/CSR compatibility)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      const token = localStorage.getItem("token")
      let isTokenValid = true
      if (token) {
        try {
          const decoded: any = jwtDecode(token)
          if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            isTokenValid = false
          }
        } catch (e) {
          isTokenValid = false
        }
      } else {
        isTokenValid = false
      }
      if (storedUser && isTokenValid) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
  }, [])

  useEffect(() => {
    if (!profileDropdownOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [profileDropdownOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/about-us", label: t("nav_about_us") || "About Us" },
    { href: "/language-courses", label: t("nav_language_courses") || "Language Courses" },
    { href: "/career-center", label: t("nav_career_center") || "International Career Center" },
    { href: "/mobility", label: t("nav_mobility") || "Mobility" },
    { href: "/bvmw", label: "BVMW" },
    { href: "/partnerships", label: t("nav_partnerships") || "Partnerships" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 gap-1 py-3">
          {/* Logo */}
          <div className="flex-shrink-0 mr-3">
            <Link href="/" className="flex flex-col items-center group">
              <Image
                src="/logo-heroSection.png"
                width={80}
                height={80}
                alt="InvestInHuman Logo"
                className="h-12 w-auto flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mb-2"
              />
              {/* Horizontal divider line */}
              <div className={`w-20 h-0.5 mb-2 transition-colors duration-300 ${isScrolled ? "bg-amber-500" : "bg-white/80"}`}></div>
              <div className="flex flex-col items-center space-y-0">
                <span className={`font-bold text-lg transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"} whitespace-nowrap leading-tight`}>
                  Invest<span className="text-amber-500">In</span>Human
                </span>
                <span className={`text-sm font-semibold transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"} tracking-[0.2em] leading-tight`}>
                  Academy
                </span>
              </div>
            </Link>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden xl:flex flex-1 justify-center px-2">
            <div className="flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-300 transform hover:scale-105 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"
                    } font-bold text-base tracking-wide whitespace-nowrap px-2`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="hidden xl:flex items-center gap-2.5 flex-shrink-0">
            <LanguageSwitcher />
          </div>

          {/* Large screen navigation with reduced items */}
          <div className="hidden lg:flex xl:hidden items-center gap-3 ml-auto flex-shrink-0">
            <div className="flex items-center gap-4">
              <Link
                href="/about-us"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-bold text-base tracking-wide whitespace-nowrap`}
              >
                {t("nav_about_us")}
              </Link>
              <Link
                href="/language-courses"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-bold text-base tracking-wide whitespace-nowrap`}
              >
                {t("nav_language_courses")}
              </Link>
              <Link
                href="/seminars"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-bold text-base tracking-wide whitespace-nowrap`}
              >
                {t("nav_seminars")}
              </Link>
              <Link
                href="/bvmw"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-bold text-base tracking-wide whitespace-nowrap`}
              >
                BVMW
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className={`transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"}`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white/95 backdrop-blur-md border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-black hover:text-amber-500 hover:bg-amber-50 transition-all duration-200 text-xl font-bold tracking-wide rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-3 flex flex-col gap-3 border-t border-gray-200 mt-2 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  )
}
