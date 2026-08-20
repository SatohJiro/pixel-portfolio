"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language } from "@/types";
import { telemetry } from "@/lib/telemetry";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isVi: boolean;
  isEn: boolean;
  t: <T>(content: { en: T; vi: T }) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("satoh_portfolio_lang") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "vi")) {
        setLanguageState(savedLang);
      } else {
        // Check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("vi")) {
          setLanguageState("vi");
        }
      }
    } catch {
      // fallback
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("satoh_portfolio_lang", lang);
    } catch {
      // ignore
    }
    telemetry.track("lang_change", lang, { from: language, to: lang });
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "vi" : "en";
    setLanguage(nextLang);
  };

  const t = <T,>(content: { en: T; vi: T }): T => {
    return content[language];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isVi: language === "vi",
        isEn: language === "en",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
