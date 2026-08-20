"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Heart, Zap, Award, Sparkles, Shield, Cpu, Flame, Target } from "lucide-react";
import { sfx } from "@/lib/audio";

export function RpgStatusBar() {
  const { isVi } = useLanguage();

  return (
    <div className="rpg-window p-4 sm:p-5 bg-white dark:bg-slate-900 border-3 border-slate-900 dark:border-slate-100 shadow-[5px_5px_0px_0px_#0f172a] dark:shadow-[5px_5px_0px_0px_#ffffff]">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-900 dark:border-slate-100 font-game text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <span className="w-2.5 h-2.5 bg-emerald-500 animate-ping inline-block rounded-none" />
          <span>PLAYER 1: @SatohJiro</span>
        </div>
        <div className="px-2 py-0.5 bg-amber-400 text-slate-950 font-bold text-[9px] sm:text-[10px]">
          LVL 25 MAGE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Col: Avatar Sprite Frame */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-950 text-center space-y-2">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 border-2 border-slate-900 dark:border-slate-100 bg-amber-200 dark:bg-emerald-950 flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_0px_#000]">
            {/* Retro 8-bit Sprite Avatar */}
            <div className="sprite-bob flex flex-col items-center">
              <span className="text-3xl sm:text-4xl select-none">🧙‍♂️</span>
              <span className="font-game text-[8px] mt-1 text-slate-900 dark:text-emerald-300">SATOH</span>
            </div>
            <div className="absolute top-1 right-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            </div>
          </div>
          <div className="font-game text-[9px] text-slate-900 dark:text-slate-100 uppercase tracking-tight">
            Nguyen Tran Anh
          </div>
          <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            {isVi ? "Kỹ sư Phần mềm Fullstack" : "Full-Stack Software Engineer"}
          </div>
        </div>

        {/* Right Col: Vital Stats Bars & Attribute Matrix */}
        <div className="lg:col-span-8 space-y-3.5">
          {/* HP Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-game text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>HP (CODE INTEGRITY)</span>
              </div>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">100 / 100</span>
            </div>
            <div className="rpg-bar-container">
              <div className="rpg-bar-fill-hp" style={{ width: "100%" }} />
            </div>
          </div>

          {/* MP Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-game text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>MP (FRONTEND SPEED & UI)</span>
              </div>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">95 / 100</span>
            </div>
            <div className="rpg-bar-container">
              <div className="rpg-bar-fill-mp" style={{ width: "95%" }} />
            </div>
          </div>

          {/* EXP Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-game text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <Award className="w-3.5 h-3.5 fill-current" />
                <span>EXP (VALEDICTORIAN TOP 1)</span>
              </div>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">9999 / 9999 [MAX]</span>
            </div>
            <div className="rpg-bar-container">
              <div className="rpg-bar-fill-exp" style={{ width: "100%" }} />
            </div>
          </div>

          {/* Stats Quad: STR, AGI, INT, LUK */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div
              onMouseEnter={() => sfx.click()}
              className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950 text-center hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-[10px] font-game text-rose-500">
                <Shield className="w-3 h-3" /> STR
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">90</div>
              <div className="text-[10px] text-slate-500">Backend / DB</div>
            </div>

            <div
              onMouseEnter={() => sfx.click()}
              className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950 text-center hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-[10px] font-game text-sky-500">
                <Flame className="w-3 h-3" /> AGI
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">95</div>
              <div className="text-[10px] text-slate-500">React/Vue Speed</div>
            </div>

            <div
              onMouseEnter={() => sfx.click()}
              className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950 text-center hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-[10px] font-game text-indigo-500">
                <Cpu className="w-3 h-3" /> INT
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">92</div>
              <div className="text-[10px] text-slate-500">System & AI</div>
            </div>

            <div
              onMouseEnter={() => sfx.click()}
              className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950 text-center hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-[10px] font-game text-amber-500">
                <Target className="w-3 h-3" /> LUK
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">99</div>
              <div className="text-[10px] text-slate-500">Bug Fixing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
