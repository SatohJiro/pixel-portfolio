"use client";

import React, { useState, useEffect, useCallback } from "react";
import { sfx, initAudio } from "@/lib/audio";
import { Sparkles, Terminal, Swords, Volume2 } from "lucide-react";

interface PixelGameLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

const BOOT_LOGS = [
  { progress: 12, text: "INIT 8-BIT HARDWARE BIOS & ARCHITECTURE... [OK]" },
  { progress: 26, text: "SYNTHESIZING CHIPTUNE STEREO AUDIO ENGINE... [OK]" },
  { progress: 42, text: "COMPILING SAKURA PETAL PARTICLE SHADERS... [OK]" },
  { progress: 58, text: "PARSING VALEDICTORIAN & HONORS QUEST LOG... [OK]" },
  { progress: 74, text: "LOADING TECH STACK: REACT, NEXT.JS, FASTAPI... [OK]" },
  { progress: 88, text: "CONFIGURING MICRO-FRONTEND & AI GPT-4 RUNTIME... [OK]" },
  { progress: 100, text: "ALL SYSTEMS 100% READY! WAITING FOR PLAYER... [START]" },
];

export function PixelGameLoader({
  onComplete,
  minDurationMs = 4200,
}: PixelGameLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Eagerly pre-warm audio context
  useEffect(() => {
    initAudio();
  }, []);

  const handleStart = useCallback(() => {
    if (isExiting || isFinished) return;
    setIsExiting(true);
    // Unlocks browser audio context on user gesture and plays fanfare
    initAudio();
    sfx.levelUp();
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 450);
  }, [isExiting, isFinished, onComplete]);

  // Stepped progress animation
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress((prev) => {
        const next = Math.max(prev, rawProgress);
        if (next >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return next;
      });

      const matchedIndex = BOOT_LOGS.findIndex((log) => log.progress >= rawProgress);
      if (matchedIndex !== -1) {
        setCurrentLogIndex(matchedIndex);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [minDurationMs]);

  // Keyboard shortcut: ONLY active on the loading screen. Cleaned up immediately when exited.
  useEffect(() => {
    if (isFinished || isExiting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReady || e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReady, isExiting, isFinished, handleStart]);

  if (isFinished) return null;

  // Segmented 20-block pixel bar
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const barString = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

  return (
    <div
      onClick={isReady ? handleStart : undefined}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-slate-950 text-emerald-400 font-mono select-none transition-all duration-500 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      } ${isReady ? "cursor-pointer" : ""}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%),
          linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))
        `,
        backgroundSize: "100% 4px, 6px 100%",
      }}
    >
      {/* Ambient pixel CRT Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-transparent to-black pointer-events-none" />

      {/* Main Retro Terminal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg mx-4 p-6 sm:p-8 border-4 border-slate-700 bg-slate-900/95 shadow-[0_0_50px_rgba(16,185,129,0.25)] rounded-xs"
      >
        {/* Retro Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-800 text-xs text-slate-400 font-bold tracking-widest">
          <div className="flex items-center gap-2 text-emerald-400">
            <Swords className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>NTA-OS v2.0 [8-BIT ARCADE]</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>READY</span>
          </div>
        </div>

        {/* Title & Avatar badge */}
        <div className="text-center my-3 sm:my-4 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SatohJiro RPG Adventure</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-[11px] text-slate-400 font-mono tracking-wider">
            Lv.99 Full-Stack Sorcerer &bull; Valedictorian
          </div>
        </div>

        {/* Dynamic State: Loading Progress vs Press Start Button */}
        {!isReady ? (
          <div className="my-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>BOOTING SYSTEM ASSETS</span>
              </span>
              <span className="font-mono text-amber-400 text-sm">{progress}%</span>
            </div>

            {/* 8-bit Block Bar */}
            <div className="p-2.5 bg-black/80 border-2 border-slate-700 text-emerald-400 font-mono text-xs sm:text-sm tracking-widest text-center shadow-inner overflow-hidden select-none">
              <span className="text-emerald-400 tracking-normal">{barString}</span>
            </div>
          </div>
        ) : (
          <div className="my-5 space-y-3 animate-in zoom-in-95 duration-200">
            <button
              onClick={handleStart}
              className="w-full py-3.5 px-4 border-2 border-slate-900 dark:border-white bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-black text-sm sm:text-base tracking-widest uppercase shadow-[4px_4px_0px_0px_#ffffff] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2 animate-pulse">
                <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>[ ▶ PRESS START TO ENTER ◀ ]</span>
                <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
              </div>
            </button>

            <div className="text-center text-[11px] text-emerald-300 font-bold tracking-wider animate-pulse">
              BẤM ENTER, SPACE HOẶC CLICK VÀO ĐÂY ĐỂ BẮT ĐẦU
            </div>
          </div>
        )}

        {/* Dynamic Booting Log Terminal */}
        <div className="h-16 sm:h-20 p-2.5 bg-black/70 border border-slate-800 text-[11px] font-mono space-y-0.5 overflow-hidden">
          {BOOT_LOGS.slice(0, currentLogIndex + 1).map((log, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                index === currentLogIndex
                  ? "text-emerald-300 font-bold"
                  : "text-slate-500"
              }`}
            >
              <span className="text-slate-600 text-[10px]">&gt;</span>
              <span className="truncate">{log.text}</span>
            </div>
          ))}
        </div>

        {/* Footer & Audio status */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>CHIPTUNE AUDIO ENGINE READY</span>
          </div>

          <button
            onClick={handleStart}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-white text-[10px] uppercase cursor-pointer"
          >
            [ VÀO TRANG / SKIP ⏩ ]
          </button>
        </div>
      </div>
    </div>
  );
}
