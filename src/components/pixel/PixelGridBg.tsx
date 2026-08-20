"use client";

import React from "react";

export function PixelGridBg() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Crisp 24px Pixel Grid Background */}
      <div className="absolute inset-0 pixel-grid-bg opacity-70 dark:opacity-40" />

      {/* Retro Dither Texture Accent */}
      <div className="absolute inset-0 pixel-dither-bg opacity-30 dark:opacity-20" />

      {/* Corner Pixel Crosshair Accents */}
      <div className="absolute top-4 left-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-600 select-none opacity-40">
        +---+
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-600 select-none opacity-40">
        +---+
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-600 select-none opacity-40">
        +---+
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-600 select-none opacity-40">
        +---+
      </div>
    </div>
  );
}
