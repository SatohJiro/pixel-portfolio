"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import {
  GraduationCap,
  Sparkles,
  CheckSquare,
  Cpu,
  Layers,
  Zap,
  Target,
} from "lucide-react";

export function AboutSection() {
  const { isVi } = useLanguage();

  const engineeringPillars = [
    {
      icon: <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
      title: {
        en: "Frontend Architecture",
        vi: "Kiến Trúc Frontend",
      },
      desc: {
        en: "Modular component engineering with ReactJS, Next.js, and Vue.js.",
        vi: "Kiến trúc component module hóa cao với ReactJS, Next.js và Vue.js.",
      },
    },
    {
      icon: <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      title: {
        en: "State & Performance",
        vi: "Quản Lý State & Hiệu Năng",
      },
      desc: {
        en: "Scalable store management with Redux Toolkit and Zustand, +30% render boost.",
        vi: "Tối ưu hóa luồng state với Redux Toolkit và Zustand, tăng hơn 30% tốc độ render.",
      },
    },
    {
      icon: <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      title: {
        en: "Micro-Frontend & APIs",
        vi: "Micro-Frontend & APIs",
      },
      desc: {
        en: "Applied experience in enterprise micro-frontends (ahamo NTT Docomo) and backend APIs.",
        vi: "Kinh nghiệm thực tế kiến trúc Micro-frontend (ahamo NTT Docomo) và API backend.",
      },
    },
    {
      icon: <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      title: {
        en: "AI & Modern Tools",
        vi: "Ứng Dụng AI & Công Cụ",
      },
      desc: {
        en: "Hands-on integration of OpenAI GPT-4 with Python FastAPI and RabbitMQ queues.",
        vi: "Tích hợp OpenAI GPT-4 với FastAPI và hàng đợi message RabbitMQ.",
      },
    },
  ];

  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <PixelBadge variant="emerald" size="md">
            {isVi ? "HỒ SƠ NĂNG LỰC & HỌC VẤN" : "CHARACTER STATS & EDUCATION"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Nền Tảng Kỹ Thuật & Hành Trình Học Thuật" : "Technical Foundation & Academic Track Record"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Tốt nghiệp Thủ khoa ngành CNTT ĐH Nông Lâm TP.HCM kết hợp hơn 3 năm kinh nghiệm thực chiến phát triển ứng dụng Web."
              : "Valedictorian in IT from Nong Lam University with 3+ years of professional web software development experience."}
          </p>
        </div>

        {/* Narrative & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Story Narrative */}
          <PixelCard
            className="lg:col-span-7"
            title={
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isVi ? "TỔNG QUAN NĂNG LỰC" : "ENGINEERING PROFILE"}</span>
              </div>
            }
          >
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
              <p>
                {isVi ? summaryData.vi[0] : summaryData.en[0]}
              </p>
              <p>
                {isVi ? summaryData.vi[1] : summaryData.en[1]}
              </p>
              <p>
                {isVi
                  ? "Trong suốt quá trình làm việc, tôi luôn tập trung vào việc viết mã nguồn sạch sẽ (Clean Code), tuân thủ tiêu chuẩn chất lượng nghiêm ngặt (0-regression), tối ưu hóa trải nghiệm người dùng và liên tục nâng cao kỹ năng."
                  : "Throughout my engineering career, I focus on clean code conventions, strict testing standards (0-regression), frontend rendering optimization, and continuous skill acquisition."}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-slate-900 dark:border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Tư duy logic & giải thuật tốt" : "Solid algorithmic foundation"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Chuẩn kiểm thử (0-regression)" : "Strict quality standards (0-regression)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Tối ưu hóa hiệu năng giao diện" : "Frontend performance profiling"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Nắm bắt công nghệ mới nhanh" : "Rapid tech adoption"}</span>
              </div>
            </div>
          </PixelCard>

          {/* Education Highlight Card */}
          <PixelCard
            className="lg:col-span-5"
            variant="amber"
            title={
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{isVi ? "HỌC VẤN CHÍNH QUY" : "ACADEMIC DEGREE"}</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-amber-50 dark:bg-amber-950/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-950 dark:text-amber-300">
                    {isVi ? "Bằng Kỹ Sư CNTT (Xuất Sắc)" : "Bachelor of Engineering in IT"}
                  </span>
                  <PixelBadge variant="amber" size="sm">
                    GPA 3.6 / 4.0
                  </PixelBadge>
                </div>
                <div className="text-xs text-slate-800 dark:text-slate-200">
                  {isVi ? educationData.school.vi : educationData.school.en} • {typeof educationData.duration === "string" ? educationData.duration : (isVi ? educationData.duration.vi : educationData.duration.en)}
                </div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 pt-1">
                  <span>★</span>
                  <span>{isVi ? educationData.honors.vi : educationData.honors.en}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {isVi ? "DẤU ẤN HỌC THUẬT NỔI BẬT:" : "ACADEMIC HIGHLIGHTS:"}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold shrink-0">&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PixelCard>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {engineeringPillars.map((pillar, idx) => (
            <PixelCard
              key={idx}
              className="p-4 space-y-2"
              interactive
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 border-2 border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800">
                  {pillar.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {pillar.title[isVi ? "vi" : "en"]}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {pillar.desc[isVi ? "vi" : "en"]}
              </p>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
}
