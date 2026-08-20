"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
}

export function GlassButton({
  children,
  className,
  variant = "glass",
  size = "md",
  icon,
  iconPosition = "left",
  glow = false,
  ...props
}: GlassButtonProps) {
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-xl gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5 font-medium",
  };

  const variantStyles = {
    primary: "glass-button-primary font-semibold",
    glass: "glass-button text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white font-medium",
    outline: "border border-indigo-500/30 text-slate-800 dark:text-slate-100 hover:border-indigo-500 hover:bg-indigo-500/10 font-medium",
    ghost: "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border-transparent font-medium",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]",
        sizeStyles[size],
        variantStyles[variant],
        glow && "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
