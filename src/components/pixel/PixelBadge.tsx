"use client";

import React from "react";

interface PixelBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "emerald" | "amber" | "cyan" | "indigo" | "rose";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
  bracketed?: boolean;
}

export function PixelBadge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  icon,
  bracketed = false,
}: PixelBadgeProps) {
  const variantStyles = {
    default:
      "border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
    emerald:
      "border-emerald-700 dark:border-emerald-400 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300",
    amber:
      "border-amber-600 dark:border-amber-400 bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300",
    cyan:
      "border-sky-700 dark:border-sky-400 bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-300",
    indigo:
      "border-indigo-700 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300",
    rose:
      "border-rose-700 dark:border-rose-400 bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-300",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-bold uppercase tracking-wider border-2 shadow-[2px_2px_0px_0px_currentColor] select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{bracketed ? `[ ${children} ]` : children}</span>
    </span>
  );
}
