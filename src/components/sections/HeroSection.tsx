"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { GlassButton } from "../glass/GlassButton";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassCard } from "../glass/GlassCard";
import {
  FileDown,
  ArrowRight,
  Terminal,
  Trophy,
  Sparkles,
  Globe2,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const { isVi } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                {isVi ? "Sẵn sàng đón nhận cơ hội nghề nghiệp mới" : "Open for new software engineering opportunities"}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="text-xs font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
                {isVi ? "Kỹ sư Phần mềm | Full-Stack & Frontend" : "Software Engineer | Full-Stack & Frontend"}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {isVi ? "Xin chào, tôi là " : "Hi, I'm "}
                <span className="text-gradient">
                  {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
                </span>
              </h1>
              <div className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span>alias:</span>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20 text-sm">
                  @SatohJiro
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {isVi
                ? "Hơn 3 năm kinh nghiệm phát triển giao diện và ứng dụng Web. Thế mạnh về ReactJS, Next.js, Vue.js, TypeScript, cùng kinh nghiệm thực tế với Micro-frontend (dự án ahamo NTT Docomo), Backend APIs (Spring Boot, FastAPI) và ứng dụng AI (GPT-4)."
                : "3+ years of professional engineering experience in frontend and web development. Proficient in ReactJS, Next.js, Vue.js, TypeScript, with practical project experience in micro-frontends (ahamo NTT Docomo), backend APIs (Spring Boot, FastAPI), and AI integration (GPT-4)."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <GlassButton
                onClick={() => {
                  telemetry.track("download_cv", "hero_main_button");
                  onOpenResumeModal();
                }}
                variant="primary"
                size="md"
                icon={<FileDown className="w-4 h-4" />}
                className="whitespace-nowrap"
              >
                {isVi ? "Tải CV & Xem Resume" : "Download CV / Resume"}
              </GlassButton>

              <Link href="#projects">
                <GlassButton
                  onClick={() => telemetry.track("click", "hero_explore_projects")}
                  variant="glass"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="whitespace-nowrap"
                >
                  {isVi ? "Xem Dự Án" : "View Projects"}
                </GlassButton>
              </Link>

              <Link href="#terminal">
                <GlassButton
                  onClick={() => telemetry.track("click", "hero_open_terminal")}
                  variant="outline"
                  size="md"
                  icon={<Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                  className="whitespace-nowrap"
                >
                  Terminal
                </GlassButton>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-center shadow-xs">
                <div className="text-xl font-bold text-gradient-emerald">{statsData.yearsExperience}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Năm Kinh nghiệm" : "Years Experience"}</div>
              </div>
              <div className="p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-center shadow-xs">
                <div className="text-xl font-bold text-gradient-amber">{statsData.gpa}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Thủ Khoa GPA (NLU)" : "Valedictorian GPA"}</div>
              </div>
              <div className="p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-center shadow-xs">
                <div className="text-xl font-bold text-indigo-600 dark:text-cyan-400">{statsData.awardsCount}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Giải Thưởng / Vinh Danh" : "Honors & Awards"}</div>
              </div>
              <div className="p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-center shadow-xs">
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{statsData.performanceGain}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Tối ưu Render" : "Performance Gain"}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Focus Cards */}
          <div className="lg:col-span-5 relative space-y-3.5">
            {/* Card 1: ahamo */}
            <GlassCard className="p-4 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">Hero Solutions / NTT Docomo</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">ahamo Web Platform (Japan)</div>
                  </div>
                </div>
                <GlassBadge variant="cyan" size="sm">
                  Active
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                {isVi
                  ? "Kinh nghiệm phát triển giao diện Micro-frontend, Vue.js, ReactJS và CMS Webrelease cho thị trường Nhật Bản."
                  : "Frontend development on micro-frontends with Vue.js, ReactJS, and CMS Webrelease for Japanese platform."}
              </p>
            </GlassCard>

            {/* Card 2: Valedictorian Honor */}
            <GlassCard className="p-4 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">Nong Lam University</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {isVi ? "Thủ Khoa Toàn Khóa 2019" : "Class Valedictorian 2019"}
                    </div>
                  </div>
                </div>
                <GlassBadge variant="amber" size="sm">
                  Top 1
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                {isVi
                  ? "Bằng Kỹ sư CNTT loại Xuất sắc (GPA 3.6/4.0). Nhận Giấy khen của Hiệu trưởng Nhà trường."
                  : "Degree of Engineer in IT with Excellent rating (GPA 3.6/4.0). Certificate of Merit by University President."}
              </p>
            </GlassCard>

            {/* Card 3: AI GPT-4 */}
            <GlassCard className="p-4 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">AI Got Talent 2023</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">GPT Code Generator</div>
                  </div>
                </div>
                <GlassBadge variant="indigo" size="sm">
                  3rd Prize
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                {isVi
                  ? "Dự án ứng dụng OpenAI GPT-4 sinh mã nguồn web, kết hợp FastAPI, RabbitMQ & Next.js."
                  : "AI application converting natural language to web code with GPT-4, FastAPI, RabbitMQ & Next.js."}
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
