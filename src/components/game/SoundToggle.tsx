"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sfx } from "@/lib/audio";
import { telemetry } from "@/lib/telemetry";

export function SoundToggle() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sfx.getIsMuted();
  });

  const handleToggle = () => {
    const nextMuted = sfx.toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      sfx.coin();
    }
    telemetry.track("click", nextMuted ? "sfx_mute" : "sfx_unmute");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex items-center gap-1.5 px-2 py-1 border-2 border-slate-900 dark:border-slate-100 font-game text-[10px] shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer select-none ${
        muted
          ? "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          : "bg-amber-400 dark:bg-amber-500 text-slate-950 font-bold"
      }`}
      aria-label={muted ? "Unmute 8-bit sound effects" : "Mute 8-bit sound effects"}
      title={muted ? "Unmute Retro SFX (8-bit sound effects)" : "Mute Retro SFX"}
    >
      {muted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">SFX: OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
          <span className="hidden sm:inline">SFX: ON</span>
        </>
      )}
    </button>
  );
}
