"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { summaryData, educationData } from "@/data/portfolio-content";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Target,
} from "lucide-react";

export function AboutSection() {
  const { isVi, isEn } = useLanguage();

  const engineeringPillars = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      title: {
        en: "Frontend Engineering",
        vi: "Kỹ Thuật Frontend",
      },
      desc: {
        en: "Modular component architecture with ReactJS, Next.js, and Vue.js.",
        vi: "Kiến trúc component module hóa với ReactJS, Next.js và Vue.js.",
      },
    },
    {
      icon: <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: {
        en: "State & Performance",
        vi: "Quản Lý State & Hiệu Năng",
      },
      desc: {
        en: "Scalable store management with Redux Toolkit and Zustand, +30% boost.",
        vi: "Tối ưu hóa state với Redux Toolkit và Zustand, tăng hơn 30% tốc độ.",
      },
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      title: {
        en: "Micro-Frontend & APIs",
        vi: "Micro-Frontend & APIs",
      },
      desc: {
        en: "Experience with micro-frontends (ahamo NTT Docomo) and backend APIs.",
        vi: "Kinh nghiệm thực tế với Micro-frontend (ahamo NTT Docomo) và API backend.",
      },
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: {
        en: "AI & Modern Tools",
        vi: "Ứng Dụng AI & Công Cụ Mới",
      },
      desc: {
        en: "Integrated OpenAI GPT-4 with Python FastAPI and RabbitMQ queues.",
        vi: "Tích hợp OpenAI GPT-4 với FastAPI và hàng đợi RabbitMQ.",
      },
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <GlassBadge variant="indigo" size="md">
            {isVi ? "Giới Thiệu & Học Vấn" : "About & Academic Background"}
          </GlassBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Hành Trình Kỹ Thuật & <span className="text-gradient-amber">Nền Tảng Vững Chắc</span>
              </>
            ) : (
              <>
                Engineering Journey & <span className="text-gradient-amber">Core Background</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Tốt nghiệp Thủ khoa ngành CNTT ĐH Nông Lâm TP.HCM kết hợp hơn 3 năm kinh nghiệm thực chiến phát triển ứng dụng Web."
              : "Nong Lam University IT Valedictorian combined with 3+ years of hands-on web software engineering experience."}
          </p>
        </div>

        {/* Story & Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Story Narrative */}
          <GlassCard className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isVi ? "Tổng Quan Bản Thân" : "Professional Background"}
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                {isVi ? summaryData.vi[0] : summaryData.en[0]}
              </p>
              <p>
                {isVi ? summaryData.vi[1] : summaryData.en[1]}
              </p>
              <p>
                {isVi
                  ? "Trong suốt quá trình làm việc, tôi luôn tập trung vào việc viết mã nguồn sạch sẽ, tuân thủ tiêu chuẩn chất lượng, tối ưu hóa giao diện người dùng và không ngừng học hỏi, làm chủ các công nghệ mới."
                  : "Throughout my journey, I focus on writing clean code, adhering to quality standards, optimizing user interfaces, and rapidly adapting to emerging technologies."}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Tư duy logic & thuật toán tốt" : "Solid algorithmic foundation"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Tuân thủ quy trình kiểm thử (0-regression)" : "Strict quality standards (0-regression)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Tối ưu hóa hiệu năng giao diện" : "Frontend performance profiling"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "Khả năng tự học & nắm bắt công nghệ nhanh" : "Rapid self-learning & adaptation"}</span>
              </div>
            </div>
          </GlassCard>

          {/* Education Highlight Card */}
          <GlassCard className="lg:col-span-5 p-6 sm:p-8 space-y-6 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase">{isVi ? "Học Vấn Chính Quy" : "Academic Background"}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isVi ? educationData.school.vi : educationData.school.en}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">{isVi ? "Bằng Kỹ Sư Công Nghệ Thông Tin" : "Degree of Engineer in IT"}</span>
                <GlassBadge variant="amber" size="sm">GPA 3.6 / 4.0</GlassBadge>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                {isVi ? educationData.major.vi : educationData.major.en} • {typeof educationData.duration === "string" ? educationData.duration : (isVi ? educationData.duration.vi : educationData.duration.en)}
              </div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isVi ? educationData.honors.vi : educationData.honors.en}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isVi ? "Dấu Ấn Nổi Bật" : "Academic Highlights"}
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {(isVi ? educationData.highlights.vi : educationData.highlights.en).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {engineeringPillars.map((pillar, idx) => (
            <GlassCard
              key={idx}
              className="p-5 space-y-3 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70"
              glowColor="none"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {pillar.title[isVi ? "vi" : "en"]}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {pillar.desc[isVi ? "vi" : "en"]}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
