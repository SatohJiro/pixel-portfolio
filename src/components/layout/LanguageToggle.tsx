"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { setLanguage, isEn, isVi } = useLanguage();

  return (
    <div className="inline-flex items-center border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] font-mono text-xs select-none">
      <button
        onClick={() => setLanguage("vi")}
        className={`px-2 py-1 font-bold transition-colors cursor-pointer ${
          isVi
            ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
        aria-label="Chuyển sang Tiếng Việt"
      >
        VI
      </button>
      <div className="w-[1px] h-4 bg-slate-400 dark:bg-slate-600" />
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 font-bold transition-colors cursor-pointer ${
          isEn
            ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
