"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { PixelButton } from "../pixel/PixelButton";
import { PixelCard } from "../pixel/PixelCard";
import { RpgStatusBar } from "../game/RpgStatusBar";
import {
  FileDown,
  Terminal,
  Trophy,
  Sparkles,
  Globe2,
  Gamepad2,
  Sword,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { sfx } from "@/lib/audio";

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-mono"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Top RPG Character Status Gauge HUD */}
        <RpgStatusBar />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Dialogue Box & Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Retro RPG Dialogue Window */}
            <div className="rpg-window p-5 sm:p-6 bg-white dark:bg-slate-900 border-3 border-slate-900 dark:border-slate-100 shadow-[5px_5px_0px_0px_#0f172a] dark:shadow-[5px_5px_0px_0px_#ffffff] space-y-4">
              <div className="flex items-center gap-2 font-game text-[10px] sm:text-xs text-amber-500 pb-2 border-b-2 border-slate-900 dark:border-slate-100">
                <Gamepad2 className="w-4 h-4" />
                <span>[ HERO PROFILE DIALOGUE ]</span>
                <span className="rpg-cursor ml-auto">▼</span>
              </div>

              <div className="space-y-2">
                <div className="font-game text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                  {isVi ? "KỸ SƯ PHẦN MỀM | FULL-STACK & FRONTEND" : "SOFTWARE ENGINEER | FULL-STACK & FRONTEND"}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-sans">
                  {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
                  <span className="font-game text-xs sm:text-sm ml-2 text-amber-500 font-normal">
                    (@SatohJiro)
                  </span>
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {isVi
                  ? "Chào mừng đến với hồ sơ RPG của tôi! Hơn 3 năm kinh nghiệm thực chiến phát triển web. Chuyên sâu ReactJS, Next.js, Vue.js, TypeScript, Micro-frontend viễn thông (ahamo NTT Docomo Nhật Bản), Spring Boot / FastAPI và tích hợp AI GPT-4."
                  : "Welcome to my RPG adventure portfolio! 3+ years of professional engineering experience in web software. Proficient in ReactJS, Next.js, Vue.js, TypeScript, Micro-frontends (ahamo NTT Docomo Japan), Spring Boot / FastAPI, and AI integration (GPT-4)."}
              </p>

              {/* Action Buttons: PRESS START style */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link href="#experience">
                  <PixelButton
                    onClick={() => {
                      sfx.levelUp();
                      telemetry.track("click", "hero_press_start");
                    }}
                    variant="game"
                    size="md"
                    icon={<Sword className="w-4 h-4" />}
                    soundType="levelUp"
                  >
                    {isVi ? "▶ KHÁM PHÁ QUEST" : "▶ START QUESTS"}
                  </PixelButton>
                </Link>

                <PixelButton
                  onClick={() => {
                    sfx.coin();
                    telemetry.track("download_cv", "hero_main_button");
                    onOpenResumeModal();
                  }}
                  variant="primary"
                  size="md"
                  soundType="coin"
                  icon={<FileDown className="w-4 h-4" />}
                >
                  {isVi ? "Tải CV / In (PDF)" : "Get ATS Resume (PDF)"}
                </PixelButton>

                <Link href="#terminal">
                  <PixelButton
                    onClick={() => telemetry.track("click", "hero_open_terminal")}
                    variant="outline"
                    size="md"
                    soundType="select"
                    icon={<Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  >
                    CLI Sandbox
                  </PixelButton>
                </Link>
              </div>
            </div>

            {/* 4 Quick Stat Coins */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div
                onMouseEnter={() => sfx.click()}
                className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              >
                <div className="font-game text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
                  {statsData.yearsExperience}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase mt-1">
                  {isVi ? "Năm Chiến Đấu" : "Years Exp"}
                </div>
              </div>

              <div
                onMouseEnter={() => sfx.click()}
                className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
              >
                <div className="font-game text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">
                  {statsData.gpa}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase mt-1">
                  {isVi ? "Thủ Khoa GPA" : "Valedictorian"}
                </div>
              </div>

              <div
                onMouseEnter={() => sfx.click()}
                className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
              >
                <div className="font-game text-sm sm:text-base font-bold text-sky-600 dark:text-sky-400">
                  {statsData.awardsCount}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase mt-1">
                  {isVi ? "Cúp Vinh Danh" : "Trophy Badges"}
                </div>
              </div>

              <div
                onMouseEnter={() => sfx.click()}
                className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
              >
                <div className="font-game text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                  {statsData.performanceGain}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase mt-1">
                  {isVi ? "Tối Ưu Tốc Độ" : "Perf Boost"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Campaign Quest Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="font-game text-[10px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase">
              <span>⚔️ KEY CAMPAIGN MISSIONS</span>
            </div>

            {/* Quest 1: ahamo NTT Docomo */}
            <PixelCard
              interactive
              title="MAIN QUEST: NTT DOCOMO"
              variant="quest"
            >
              <div className="space-y-1.5 font-mono">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    ahamo Platform (Hero Solutions)
                  </span>
                </div>
                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  Level 3+ Mission • 09/2024 - Present
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isVi
                    ? "Kiến trúc Micro-frontend viễn thông Nhật Bản, Vue.js, ReactJS và CMS Webrelease."
                    : "Japanese telecom platform micro-frontend architectures with Vue.js, ReactJS, and CMS."}
                </p>
              </div>
            </PixelCard>

            {/* Quest 2: Valedictorian Honor */}
            <PixelCard
              interactive
              title="GUILD TROPHY: VALEDICTORIAN"
              variant="quest"
            >
              <div className="space-y-1.5 font-mono">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {isVi ? "Thủ Khoa ĐH Nông Lâm TP.HCM" : "Nong Lam Univ Valedictorian"}
                  </span>
                </div>
                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  GPA 3.6 / 4.0 • Top 1 Honor
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isVi
                    ? "Tốt nghiệp Thủ khoa ngành CNTT, Giấy khen của Hiệu trưởng Nhà trường cho thành tích xuất sắc."
                    : "Graduated as Class Valedictorian in IT with Excellent rating, Certificate of Merit by University President."}
                </p>
              </div>
            </PixelCard>

            {/* Quest 3: AI GPT-4 */}
            <PixelCard
              interactive
              title="BOSS RAID: AI GOT TALENT"
              variant="quest"
            >
              <div className="space-y-1.5 font-mono">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    GPT Code Generator (TMA Solutions)
                  </span>
                </div>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                  3rd Place Award • FastAPI + RabbitMQ + GPT-4
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isVi
                    ? "Sinh mã nguồn web tự động từ prompt tự nhiên, hàng đợi phân tán RabbitMQ."
                    : "AI code generator from natural language prompts with OpenAI GPT-4 and RabbitMQ."}
                </p>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
}
