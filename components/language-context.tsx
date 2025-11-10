"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const SUPPORTED_LANGUAGES = ["DE", "FR", "EN", "AR"];

// Map countries to languages
const COUNTRY_TO_LANGUAGE: { [key: string]: string } = {
  DE: "DE", // Germany
  AT: "DE", // Austria
  CH: "DE", // Switzerland (German speaking)
  FR: "FR", // France
  BE: "FR", // Belgium
  LU: "FR", // Luxembourg
  TN: "FR", // Tunisia
  MA: "FR", // Morocco
  DZ: "FR", // Algeria
  US: "EN", // United States
  GB: "EN", // United Kingdom
  CA: "EN", // Canada
  AU: "EN", // Australia
  IE: "EN", // Ireland
  NZ: "EN", // New Zealand
  SA: "AR", // Saudi Arabia
  AE: "AR", // United Arab Emirates
  EG: "AR", // Egypt
  JO: "AR", // Jordan
  LB: "AR", // Lebanon
  SY: "AR", // Syria
  IQ: "AR", // Iraq
  KW: "AR", // Kuwait
  QA: "AR", // Qatar
  BH: "AR", // Bahrain
  OM: "AR", // Oman
  YE: "AR", // Yemen
  LY: "AR", // Libya
  SD: "AR", // Sudan
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Function to detect user's country and return appropriate language
const detectLanguageFromLocation = async (): Promise<string> => {
  // First, try browser language as it's the most reliable
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.split("-")[0].toUpperCase();
    console.log("Browser language detected:", browserLang);
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
      console.log("Using browser language:", browserLang);
      return browserLang;
    }
  }

  // Then try geolocation APIs
  try {
    // Try multiple geolocation services for better reliability
    const apis = [
      "https://ipapi.co/json/",
      "https://api.country.is/"
    ];

    for (const apiUrl of apis) {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code || data.country;
          console.log("Country detected from API:", countryCode);

          if (countryCode) {
            const detectedLang = COUNTRY_TO_LANGUAGE[countryCode.toUpperCase()];
            if (detectedLang && SUPPORTED_LANGUAGES.includes(detectedLang)) {
              console.log("Language mapped from country:", detectedLang);
              return detectedLang;
            }
          }
        }
      } catch (err) {
        console.log(`API ${apiUrl} failed, trying next...`);
        continue;
      }
    }
  } catch (error) {
    console.log("Could not detect location from any API");
  }

  console.log("Using default language: DE");
  return "DE"; // Final fallback
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState("DE"); // Default to German
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const savedLang = localStorage.getItem("lang");

      if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        // User has previously selected a language
        setLanguageState(savedLang);
        setIsInitialized(true);
      } else {
        // First time visitor - detect language from location
        detectLanguageFromLocation().then((detectedLang) => {
          setLanguageState(detectedLang);
          localStorage.setItem("lang", detectedLang);
          setIsInitialized(true);
        });
      }

      // Listen for languageChanged event
      const handler = () => {
        const newLang = localStorage.getItem("lang") || "DE";
        setLanguageState(SUPPORTED_LANGUAGES.includes(newLang) ? newLang : "DE");
      };
      window.addEventListener("languageChanged", handler);
      return () => window.removeEventListener("languageChanged", handler);
    }
  }, [isInitialized]);

  const setLanguage = (lang: string) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      window.dispatchEvent(new Event("languageChanged"));
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
