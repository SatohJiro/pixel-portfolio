"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { telemetry } from "@/lib/telemetry";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-8 h-8 border-2 border-slate-900 dark:border-slate-100 bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    telemetry.track("theme_change", nextTheme, { from: resolvedTheme || "unknown", to: nextTheme });
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center w-8 h-8 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-slate-900 dark:text-slate-100 transition-all cursor-pointer select-none"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}
