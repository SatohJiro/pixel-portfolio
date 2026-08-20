"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { statsData } from "@/data/portfolio-content";
import { PixelButton } from "../pixel/PixelButton";
import { PixelBadge } from "../pixel/PixelBadge";
import { PixelCard } from "../pixel/PixelCard";
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
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-mono"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Top HUD Player Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[3px_3px_0px_0px_#18181b] dark:shadow-[3px_3px_0px_0px_#ffffff]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 animate-pulse border border-slate-900 dark:border-white" />
            <span>{isVi ? "TRẠNG THÁI: SẴN SÀNG NHẬN VIỆC" : "STATUS: AVAILABLE FOR HIRE"}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PixelBadge variant="emerald" size="sm">
              LVL {statsData.yearsExperience} EXP
            </PixelBadge>
            <PixelBadge variant="amber" size="sm">
              GPA {statsData.gpa}
            </PixelBadge>
            <PixelBadge variant="cyan" size="sm">
              TOP 1 VALEDICTORIAN
            </PixelBadge>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                &gt; {isVi ? "Kỹ sư Phần mềm | Full-Stack & Frontend" : "Software Engineer | Full-Stack & Frontend"}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
              </h1>

              <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>alias:</span>
                <span className="px-2 py-0.5 border border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">
                  @SatohJiro
                </span>
                <span>•</span>
                <span>{isVi ? "Thủ khoa ĐH Nông Lâm TP.HCM" : "Valedictorian @ Nong Lam Univ"}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-sans">
              {isVi
                ? "Hơn 3 năm kinh nghiệm thực chiến phát triển ứng dụng Web. Chuyên sâu ReactJS, Next.js, Vue.js, TypeScript, cùng kinh nghiệm thực tế với Micro-frontend (dự án ahamo NTT Docomo), Backend APIs (Spring Boot, FastAPI) và tích hợp AI (GPT-4)."
                : "3+ years of professional engineering experience in web software development. Proficient in ReactJS, Next.js, Vue.js, TypeScript, with hands-on experience in micro-frontends (ahamo NTT Docomo), backend APIs (Spring Boot, FastAPI), and AI integration (GPT-4)."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <PixelButton
                onClick={() => {
                  telemetry.track("download_cv", "hero_main_button");
                  onOpenResumeModal();
                }}
                variant="primary"
                size="md"
                icon={<FileDown className="w-4 h-4" />}
              >
                {isVi ? "Tải CV & Xem Resume" : "Get ATS Resume (PDF)"}
              </PixelButton>

              <Link href="#projects">
                <PixelButton
                  onClick={() => telemetry.track("click", "hero_explore_projects")}
                  variant="secondary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {isVi ? "Xem Dự Án" : "View Projects"}
                </PixelButton>
              </Link>

              <Link href="#terminal">
                <PixelButton
                  onClick={() => telemetry.track("click", "hero_open_terminal")}
                  variant="outline"
                  size="md"
                  icon={<Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                >
                  CLI Sandbox
                </PixelButton>
              </Link>
            </div>

            {/* 4 Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center">
                <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {statsData.yearsExperience}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">
                  {isVi ? "Năm Kinh nghiệm" : "Years Experience"}
                </div>
              </div>

              <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center">
                <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400">
                  {statsData.gpa}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">
                  {isVi ? "Thủ Khoa GPA (NLU)" : "Valedictorian GPA"}
                </div>
              </div>

              <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center">
                <div className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400">
                  {statsData.awardsCount}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">
                  {isVi ? "Giải Thưởng / Vinh Danh" : "Honors & Awards"}
                </div>
              </div>

              <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-center">
                <div className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {statsData.performanceGain}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">
                  {isVi ? "Tối ưu Render" : "Performance Gain"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Focus Cards */}
          <div className="lg:col-span-5 space-y-3">
            {/* Card 1: ahamo */}
            <PixelCard
              interactive
              title={
                <div className="flex items-center justify-between w-full">
                  <span>ENTERPRISE CLIENT</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">ACTIVE</span>
                </div>
              }
              variant="cyan"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    ahamo Platform (NTT Docomo Japan)
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Hero Solutions Corporation • 09/2024 - Present
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isVi
                    ? "Kỹ sư Frontend phát triển kiến trúc Micro-frontend, Vue.js, ReactJS và CMS Webrelease cho nền tảng viễn thông Nhật Bản."
                    : "Frontend Engineer working on micro-frontend architectures with Vue.js, ReactJS, and CMS Webrelease for Japanese telecom platform."}
                </p>
              </div>
            </PixelCard>

            {/* Card 2: Valedictorian Honor */}
            <PixelCard
              interactive
              title={
                <div className="flex items-center justify-between w-full">
                  <span>ACADEMIC VALEDICTORIAN</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400">TOP 1</span>
                </div>
              }
              variant="amber"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {isVi ? "Thủ Khoa Toàn Khóa 2019 (ĐH Nông Lâm)" : "Class Valedictorian (Nong Lam Univ)"}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Bằng Kỹ sư CNTT Xuất sắc • GPA 3.6 / 4.0
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isVi
                    ? "Tốt nghiệp Thủ khoa ngành CNTT, vinh dự nhận Giấy khen của Hiệu trưởng Nhà trường cho thành tích học tập và rèn luyện xuất sắc."
                    : "Graduated as Class Valedictorian in IT with Excellent rating, awarded Certificate of Merit by University President."}
                </p>
              </div>
            </PixelCard>

            {/* Card 3: AI GPT-4 */}
            <PixelCard
              interactive
              title={
                <div className="flex items-center justify-between w-full">
                  <span>AI HACKATHON AWARD</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400">3RD PRIZE</span>
                </div>
              }
              variant="indigo"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    GPT Code Generator (AI Got Talent)
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  TMA Solutions • FastAPI + RabbitMQ + Next.js
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                  {isVi
                    ? "Phát triển công cụ sinh mã nguồn web tự động từ ngôn ngữ tự nhiên sử dụng OpenAI GPT-4, xử lý bất đồng bộ qua hàng đợi RabbitMQ."
                    : "Built AI generator converting natural language to web code using OpenAI GPT-4, FastAPI, RabbitMQ, and Next.js."}
                </p>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
}
