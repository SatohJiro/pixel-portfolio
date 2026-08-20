"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  interactive?: boolean;
  glowColor?: "cyan" | "indigo" | "emerald" | "amber" | "rose" | "none";
}

export function GlassCard({
  children,
  className,
  interactive = true,
  glowColor = "none",
  ...props
}: GlassCardProps) {
  const subtleGlowStyles = {
    cyan: "hover:border-cyan-500/25",
    indigo: "hover:border-indigo-500/25",
    emerald: "hover:border-emerald-500/25",
    amber: "hover:border-amber-500/25",
    rose: "hover:border-rose-500/25",
    none: "",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-200 overflow-hidden",
        interactive ? "glass-panel-interactive" : "glass-panel",
        subtleGlowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
