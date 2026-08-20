"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { experienceData } from "@/data/portfolio-content";
import { WorkExperience } from "@/types";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import {
  Calendar,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [activeExpId, setActiveExpId] = useState<string>(experienceData[0].id);

  const activeExp =
    experienceData.find((exp) => exp.id === activeExpId) || experienceData[0];

  const handleSelectExp = (exp: WorkExperience) => {
    setActiveExpId(exp.id);
    telemetry.track("click", `select_experience_${exp.id}`, { company: exp.company });
  };

  return (
    <section id="experience" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <PixelBadge variant="cyan" size="md">
            {isVi ? "HÀNH TRÌNH NGHỀ NGHIỆP" : "WORK LOG & EXPERIENCE"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Kinh Nghiệm Làm Việc & Dấu Ấn Kỹ Thuật" : "Work Experience & Engineering Milestones"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Hơn 3 năm kinh nghiệm lập trình thực tế qua các môi trường doanh nghiệp Nhật Bản, SaaS CRM và dự án AI."
              : "Over 3 years of software engineering experience across enterprise Japanese clients, SaaS platforms, and AI projects."}
          </p>
        </div>

        {/* Layout: Sidebar Tabs (Company list) + Active Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Company Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {experienceData.map((exp) => {
              const isSelected = exp.id === activeExpId;
              const locationStr = typeof exp.location === "string" ? exp.location : exp.location[isVi ? "vi" : "en"];
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExp(exp)}
                  className={`w-full text-left p-4 border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#ffffff] translate-x-1"
                      : "border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {isSelected ? <span className="text-emerald-500">▶</span> : <span className="text-slate-400">▷</span>}
                      <span>{exp.company}</span>
                    </div>
                    {exp.current && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 border border-emerald-600 dark:border-emerald-400 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {isVi ? "Hiện tại" : "Active"}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1 pl-4">
                    {exp.title[isVi ? "vi" : "en"]}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-2.5 pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 pl-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.duration[isVi ? "vi" : "en"]}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {locationStr.split(",")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Experience View */}
          <div className="lg:col-span-8">
            <PixelCard
              title={
                <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                  <span>{activeExp.company}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-normal">{activeExp.duration[isVi ? "vi" : "en"]}</span>
                </div>
              }
            >
              <div className="space-y-6">
                {/* Header info */}
                <div className="pb-4 border-b-2 border-slate-900 dark:border-slate-100">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {activeExp.title[isVi ? "vi" : "en"]}
                  </h3>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {activeExp.company} • {typeof activeExp.location === "string" ? activeExp.location : activeExp.location[isVi ? "vi" : "en"]}
                  </div>
                </div>

                {/* Project Highlights inside this Experience */}
                <div className="space-y-6">
                  {activeExp.projectHighlights.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="space-y-3 p-4 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950/60"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="text-emerald-500 font-mono">■</span>
                          <span>{proj.name}</span>
                        </h4>
                        {proj.client && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono italic">
                            [Client: {typeof proj.client === "string" ? proj.client : proj.client[isVi ? "vi" : "en"]}]
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                        {proj.description[isVi ? "vi" : "en"]}
                      </p>

                      {/* Responsibilities */}
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase">
                          {isVi ? "Trách nhiệm chính:" : "Responsibilities:"}
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-sans">
                          {proj.responsibilities[isVi ? "vi" : "en"].map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold shrink-0">&gt;</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact Box */}
                      <div className="p-2.5 border-2 border-emerald-700 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 space-y-1">
                        <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 uppercase">
                          <TrendingUp className="w-3 h-3" />
                          <span>{isVi ? "Kết quả đạt được:" : "Measured Impact:"}</span>
                        </div>
                        <ul className="text-xs text-slate-800 dark:text-slate-200 font-sans space-y-0.5 pl-4 list-disc">
                          {proj.impacts[isVi ? "vi" : "en"].map((imp, impIdx) => (
                            <li key={impIdx}>{imp}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="pt-1 flex flex-wrap gap-1">
                        {proj.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 border border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                          >
                            [{t}]
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
}
