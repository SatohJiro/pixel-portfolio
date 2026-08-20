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
  CheckSquare,
  Gift,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { sfx } from "@/lib/audio";

export function ExperienceSection() {
  const { isVi } = useLanguage();
  const [activeExpId, setActiveExpId] = useState<string>(experienceData[0].id);

  const activeExp =
    experienceData.find((exp) => exp.id === activeExpId) || experienceData[0];

  const handleSelectExp = (exp: WorkExperience) => {
    sfx.select();
    setActiveExpId(exp.id);
    telemetry.track("click", `select_quest_${exp.id}`, { company: exp.company });
  };

  const questTypes: Record<string, { label: { en: string; vi: string }; badge: string; color: string }> = {
    exp_hero: {
      label: { en: "👑 MAIN QUEST (ACTIVE)", vi: "👑 SỨ MỆNH CHÍNH (ĐANG THỰC HIỆN)" },
      badge: "LVL 3+ QUEST",
      color: "border-sky-500 text-sky-600 dark:text-sky-400",
    },
    exp_nexus: {
      label: { en: "⚔️ GUILD CAMPAIGN", vi: "⚔️ CHIẾN DỊCH HỘI GUILD" },
      badge: "RANK S MISSION",
      color: "border-amber-500 text-amber-600 dark:text-amber-400",
    },
    exp_tma: {
      label: { en: "🐉 BOSS RAID HACKATHON", vi: "🐉 ĐỘT KÍCH BOSS HACKATHON" },
      badge: "AWARD QUEST",
      color: "border-indigo-500 text-indigo-600 dark:text-indigo-400",
    },
  };

  return (
    <section id="experience" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <PixelBadge variant="cyan" size="md">
            {isVi ? "NHẬT KÝ NHIỆM VỤ RPG" : "RPG ADVENTURE QUEST LOG"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            {isVi ? "Kinh Nghiệm Làm Việc & Chiến Tích Quest" : "Work Experience & Quest Milestones"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Theo dõi các chiến dịch thực tế từ viễn thông Nhật Bản, nền tảng CRM doanh nghiệp đến các hệ thống AI phân tán."
              : "Track completed quests across enterprise Japanese telecom, SaaS CRM optimization, and distributed AI systems."}
          </p>
        </div>

        {/* Layout: Quest Sidebar Tabs + Active Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Quest Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-game text-[10px] text-slate-500 uppercase px-1">
              {isVi ? "DANH SÁCH NHIỆM VỤ:" : "AVAILABLE QUESTS:"}
            </div>

            {experienceData.map((exp) => {
              const isSelected = exp.id === activeExpId;
              const locationStr = typeof exp.location === "string" ? exp.location : exp.location[isVi ? "vi" : "en"];
              const questMeta = questTypes[exp.id] || {
                label: { en: "QUEST", vi: "NHIỆM VỤ" },
                badge: "MISSION",
                color: "border-slate-500 text-slate-600",
              };

              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExp(exp)}
                  className={`w-full text-left p-4 border-3 transition-all cursor-pointer ${
                    isSelected
                      ? "border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[5px_5px_0px_0px_#18181b] dark:shadow-[5px_5px_0px_0px_#ffffff] translate-x-1"
                      : "border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-game text-[9px] text-amber-500">
                      {questMeta.label[isVi ? "vi" : "en"]}
                    </span>
                    {exp.current && (
                      <span className="font-game text-[8px] px-1.5 py-0.5 bg-emerald-500 text-slate-950 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    {isSelected ? <span className="text-emerald-500 font-game text-xs">▶</span> : <span className="text-slate-400">▷</span>}
                    <span>{exp.company}</span>
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

          {/* Right: Active Quest Details */}
          <div className="lg:col-span-8">
            <PixelCard
              variant="quest"
              title={
                <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                  <span>{activeExp.company}</span>
                  <span className="text-amber-500 font-game text-[9px]">{activeExp.duration[isVi ? "vi" : "en"]}</span>
                </div>
              }
            >
              <div className="space-y-6">
                {/* Quest Header */}
                <div className="pb-4 border-b-2 border-slate-900 dark:border-slate-100 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                      {activeExp.title[isVi ? "vi" : "en"]}
                    </h3>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      {activeExp.company} • {typeof activeExp.location === "string" ? activeExp.location : activeExp.location[isVi ? "vi" : "en"]}
                    </div>
                  </div>

                  <div className="px-2.5 py-1 border-2 border-slate-900 dark:border-slate-100 bg-amber-400 text-slate-950 font-game text-[9px] font-bold shadow-[2px_2px_0px_0px_#000]">
                    QUEST IN PROGRESS
                  </div>
                </div>

                {/* Quest Projects */}
                <div className="space-y-6">
                  {activeExp.projectHighlights.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="space-y-3.5 p-4 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950/60 shadow-[3px_3px_0px_0px_#0f172a] dark:shadow-[3px_3px_0px_0px_#ffffff]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="text-amber-500 font-game text-xs">⚔️</span>
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

                      {/* Quest Objectives (Responsibilities) */}
                      <div className="space-y-1.5">
                        <div className="text-xs font-game text-slate-900 dark:text-white flex items-center gap-1.5">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{isVi ? "NHIỆM VỤ THỰC HIỆN:" : "QUEST OBJECTIVES:"}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans pl-1">
                          {proj.responsibilities[isVi ? "vi" : "en"].map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-game text-[9px] shrink-0 mt-0.5">[✓]</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quest Rewards & Measured Impact */}
                      <div className="p-3 border-2 border-amber-600 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/40 space-y-1.5">
                        <div className="text-[11px] font-game text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5" />
                          <span>{isVi ? "CHIẾN LỢI PHẨM & KẾT QUẢ ĐẠT ĐƯỢC:" : "QUEST REWARDS & MEASURED IMPACT:"}</span>
                        </div>
                        <ul className="text-xs text-slate-800 dark:text-slate-200 font-sans space-y-1 pl-4 list-disc">
                          {proj.impacts[isVi ? "vi" : "en"].map((imp, impIdx) => (
                            <li key={impIdx} className="font-medium">{imp}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Loot Pills */}
                      <div className="pt-1 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-game text-slate-500">LOOT:</span>
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
