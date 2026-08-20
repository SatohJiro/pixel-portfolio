"use client";

import React from "react";

interface PixelCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
  variant?: "default" | "terminal" | "emerald" | "amber" | "cyan" | "indigo";
}

export function PixelCard({
  children,
  className = "",
  interactive = false,
  title,
  headerAction,
  variant = "default",
  ...props
}: PixelCardProps) {
  const variantStyles = {
    default: "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900",
    terminal: "border-slate-900 dark:border-slate-100 bg-slate-950 text-slate-100",
    emerald: "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
    amber: "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 border-l-4 border-l-amber-500 dark:border-l-amber-400",
    cyan: "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 border-l-4 border-l-sky-600 dark:border-l-sky-400",
    indigo: "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 border-l-4 border-l-indigo-600 dark:border-l-indigo-400",
  };

  const shadowClass = interactive ? "pixel-box-interactive" : "pixel-box";

  return (
    <div
      className={`${shadowClass} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 select-none">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400">■</span>
            <span>{title}</span>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={title ? "p-4 sm:p-6" : ""}>
        {children}
      </div>
    </div>
  );
}
