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
    { href: "/seminars", label: t("nav_seminars") || "Seminars" },
    { href: "/coaching", label: t("career_center_title") || "Career Center" },
    { href: "/aupair-volunteering", label: t("nav_mobility") || "Mobility" },
    { href: "/studies-abroad", label: t("nav_studies") || "Studies Abroad" },
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
            <div className="flex items-center gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-300 transform hover:scale-105 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"
                    } font-semibold text-[15px] whitespace-nowrap px-1`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="hidden xl:flex items-center gap-2.5 flex-shrink-0">
            <LanguageSwitcher />
            {user ? (
              user.userType === "admin" ? (
                <Link href="/admin/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-amber-500 text-amber-500 hover:bg-amber-50 transition-all duration-300 ${isScrolled ? "bg-white" : "bg-white/80"} whitespace-nowrap`}
                  >
                    {t("nav_dashboard")}
                  </Button>
                </Link>
              ) : (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-amber-500 text-amber-500 hover:bg-amber-50 flex items-center gap-1 transition-all duration-300 ${isScrolled ? "bg-white" : "bg-white/80"} whitespace-nowrap`}
                    onClick={() => setProfileDropdownOpen((open) => !open)}
                    aria-haspopup="true"
                    aria-expanded={profileDropdownOpen}
                  >
                    {t("nav_profile")}
                    <svg className={`h-4 w-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </Button>
                  {profileDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                    >
                      <Link href="/edit-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t("nav_edit_profile")}</Link>
                      <button
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          setUser(null);
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          window.location.href = "/";
                        }}
                      >{t("nav_sign_out")}</button>
                    </div>
                  )}
                </div>
              )
            ) : null}
            {/* Contact Button - Commented out */}
            {/* {!user || user.userType !== "admin" ? (
              <Button
                size="sm"
                className={`transition-all duration-300 ${isScrolled ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-amber-500/90 hover:bg-amber-500 text-white backdrop-blur-sm"} whitespace-nowrap px-4`}
                onClick={() => setIsContactModalOpen(true)}
              >
                {t("nav_contact_us")}
              </Button>
            ) : null} */}
          </div>

          {/* Large screen navigation with reduced items */}
          <div className="hidden lg:flex xl:hidden items-center gap-3 ml-auto flex-shrink-0">
            <div className="flex items-center gap-3">
              <Link
                href="/about-us"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-semibold text-[15px] whitespace-nowrap`}
              >
                {t("nav_about_us")}
              </Link>
              <Link
                href="/language-courses"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-semibold text-[15px] whitespace-nowrap`}
              >
                {t("nav_language_courses")}
              </Link>
              <Link
                href="/seminars"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-semibold text-[15px] whitespace-nowrap`}
              >
                {t("nav_seminars")}
              </Link>
              <Link
                href="/bvmw"
                className={`transition-colors duration-300 ${isScrolled ? "text-black hover:text-amber-500" : "text-white hover:text-amber-300"} font-semibold text-[15px] whitespace-nowrap`}
              >
                BVMW
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {user ? (
                user.userType === "admin" ? (
                  <Link href="/admin/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-amber-500 text-amber-500 hover:bg-amber-50 transition-all duration-300 ${isScrolled ? "bg-white" : "bg-white/80"}`}
                    >
                      {t("nav_dashboard")}
                    </Button>
                  </Link>
                ) : (
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-amber-500 text-amber-500 hover:bg-amber-50 transition-all duration-300 ${isScrolled ? "bg-white" : "bg-white/80"}`}
                      onClick={() => setProfileDropdownOpen((open) => !open)}
                    >
                      {t("nav_profile")}
                    </Button>
                    {profileDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                      >
                        <Link href="/edit-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t("nav_edit_profile")}</Link>
                        <button
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            setUser(null);
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.href = "/";
                          }}
                        >{t("nav_sign_out")}</button>
                      </div>
                    )}
                  </div>
                )
              ) : null}
              {/* Contact Button - Commented out */}
              {/* {!user || user.userType !== "admin" ? (
                <Button
                  size="sm"
                  className={`transition-all duration-300 ${isScrolled ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-amber-500/90 hover:bg-amber-500 text-white backdrop-blur-sm"} whitespace-nowrap px-3`}
                  onClick={() => setIsContactModalOpen(true)}
                >
                  {t("nav_contact_us")}
                </Button>
              ) : null} */}
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-black hover:text-amber-500 transition-colors duration-200 text-lg font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Only show Dashboard for admin users */}
              {user && user.userType === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="block px-3 py-2 text-black hover:text-amber-500 transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav_dashboard")}
                </Link>
              )}
              <div className="px-3 py-3 flex flex-col gap-3 border-t border-gray-200 mt-2 pt-3">
                <LanguageSwitcher />
                {user ? (
                  user.userType === "admin" ? (
                    <span className="text-sm font-medium text-gray-700">{t("nav_logged_in_as")} {user.username || user.fullname || user.email}</span>
                  ) : (
                    <>
                      <Link href="/edit-profile" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full border-amber-500 text-amber-500 hover:bg-amber-50"
                        >
                          {t("nav_edit_profile")}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-red-500 text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.preventDefault();
                          setUser(null);
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          setIsMenuOpen(false);
                          window.location.href = "/";
                        }}
                      >
                        {t("nav_sign_out")}
                      </Button>
                    </>
                  )
                ) : null}
                {/* Contact Button - Commented out */}
                {/* {!user || user.userType !== "admin" ? (
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsContactModalOpen(true)
                    }}
                  >
                    {t("nav_contact_us")}
                  </Button>
                ) : null} */}
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
