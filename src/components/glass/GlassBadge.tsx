"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassBadgeProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "indigo" | "emerald" | "amber" | "rose" | "purple";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export function GlassBadge({
  children,
  variant = "default",
  size = "sm",
  className,
  dot = false,
}: GlassBadgeProps) {
  const variantStyles = {
    default:
      "bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400 dark:bg-slate-500/10 dark:text-slate-300 dark:border-white/10 dark:hover:border-white/20",
    cyan:
      "bg-cyan-50 text-cyan-800 border-cyan-300 hover:border-cyan-400 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20 dark:hover:border-cyan-500/40",
    indigo:
      "bg-indigo-50 text-indigo-800 border-indigo-300 hover:border-indigo-400 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20 dark:hover:border-indigo-500/40",
    emerald:
      "bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-400 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20 dark:hover:border-emerald-500/40",
    amber:
      "bg-amber-50 text-amber-900 border-amber-300 hover:border-amber-400 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20 dark:hover:border-amber-500/40",
    rose:
      "bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-400 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20 dark:hover:border-rose-500/40",
    purple:
      "bg-purple-50 text-purple-800 border-purple-300 hover:border-purple-400 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20 dark:hover:border-purple-500/40",
  };

  const dotColors = {
    default: "bg-slate-500 dark:bg-slate-400",
    cyan: "bg-cyan-600 dark:bg-cyan-400 dark:shadow-[0_0_8px_#22d3ee]",
    indigo: "bg-indigo-600 dark:bg-indigo-400 dark:shadow-[0_0_8px_#818cf8]",
    emerald: "bg-emerald-600 dark:bg-emerald-400 dark:shadow-[0_0_8px_#34d399]",
    amber: "bg-amber-600 dark:bg-amber-400 dark:shadow-[0_0_8px_#fbbf24]",
    rose: "bg-rose-600 dark:bg-rose-400 dark:shadow-[0_0_8px_#fb7185]",
    purple: "bg-purple-600 dark:bg-purple-400 dark:shadow-[0_0_8px_#c084fc]",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1 rounded-lg gap-1.5 font-medium",
    md: "text-sm px-3.5 py-1.5 rounded-xl gap-2 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center backdrop-blur-md border transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />
      )}
      <span>{children}</span>
    </span>
  );
}
