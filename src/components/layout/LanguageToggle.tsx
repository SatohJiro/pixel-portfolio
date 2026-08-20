"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-xl p-0.5 border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 backdrop-blur-md shadow-xs">
      <button
        onClick={() => setLanguage("vi")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          isVi
            ? "bg-indigo-600 text-white shadow-xs"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
        }`}
        aria-label="Chuyển sang Tiếng Việt"
      >
        VI
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          isEn
            ? "bg-indigo-600 text-white shadow-xs"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
