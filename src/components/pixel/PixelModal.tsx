"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function PixelModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: PixelModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-3xl",
    "2xl": "max-w-5xl",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Dark pixel dither overlay */}
      <div
        className="fixed inset-0 bg-black/80 dark:bg-black/85 pixel-dither-bg transition-opacity duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        className={`relative w-full ${maxWidthMap[maxWidth]} my-8 pixel-box bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 shadow-[6px_6px_0px_0px_#18181b] dark:shadow-[6px_6px_0px_0px_#ffffff] z-10 animate-in fade-in zoom-in-95 duration-150`}
      >
        {/* Retro Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 dark:bg-slate-800 text-white border-b-2 border-slate-900 dark:border-slate-100 font-mono text-xs font-bold uppercase tracking-wider select-none">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">■</span>
            <div className="line-clamp-1">{title || "DIALOG BOX"}</div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-6 h-6 border-2 border-white bg-rose-600 hover:bg-rose-500 active:translate-x-[1px] active:translate-y-[1px] text-white font-mono font-bold text-xs cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}
