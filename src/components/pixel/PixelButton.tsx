"use client";

import React from "react";
import { sfx } from "@/lib/audio";

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "game" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  soundType?: "click" | "coin" | "select" | "levelUp" | "none";
}

export function PixelButton({
  variant = "secondary",
  size = "md",
  icon,
  iconPosition = "left",
  children,
  className = "",
  disabled = false,
  soundType = "click",
  onClick,
  ...props
}: PixelButtonProps) {
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-2 text-xs sm:text-sm gap-2",
    lg: "px-5 py-2.5 text-sm sm:text-base gap-2.5",
  };

  const variantStyles = {
    game: "pixel-btn-game",
    primary: "pixel-btn-primary font-mono font-bold",
    secondary: "pixel-btn font-mono font-bold",
    accent:
      "font-mono font-bold border-2 border-slate-900 dark:border-slate-100 bg-amber-400 text-slate-950 shadow-[3px_3px_0px_0px_#18181b] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:bg-amber-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer transition-all",
    outline:
      "font-mono font-bold border-2 border-slate-900 dark:border-slate-100 bg-transparent text-slate-900 dark:text-slate-100 shadow-[3px_3px_0px_0px_#18181b] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer transition-all",
    danger:
      "font-mono font-bold border-2 border-slate-900 dark:border-slate-100 bg-rose-600 text-white shadow-[3px_3px_0px_0px_#18181b] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:bg-rose-500 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer transition-all",
    ghost:
      "font-mono font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10 active:bg-slate-300 dark:active:bg-white/20 transition-colors cursor-pointer",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && soundType !== "none") {
      if (soundType === "coin") sfx.coin();
      else if (soundType === "select") sfx.select();
      else if (soundType === "levelUp") sfx.levelUp();
      else sfx.click();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center select-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
