"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import {
  Code,
  Layers,
  Cpu,
  Sparkles,
  Database,
  Search,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

export function SkillsSection() {
  const { isVi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <Code className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />,
    state: <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />,
    backend: <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
    ai: <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
    devops: <Database className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    telemetry.track("click", `filter_skills_${id}`);
  };

  const displayedCategories = skillsData
    .filter((cat) => {
      if (selectedCategory === "all") return true;
      return cat.id === selectedCategory;
    })
    .map((cat) => {
      if (!searchQuery.trim()) return cat;
      const q = searchQuery.toLowerCase();
      const filteredSkills = cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description?.[isVi ? "vi" : "en"]?.toLowerCase().includes(q)
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <PixelBadge variant="cyan" size="md">
            {isVi ? "KỸ NĂNG & NĂNG LỰC" : "SKILL MATRIX"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Năng Lực Kỹ Thuật & Kinh Nghiệm Thực Tế" : "Technical Stack & Applied Engineering"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Thế mạnh nòng cốt về Frontend & tối ưu hiệu năng, kết hợp kinh nghiệm thực tế với các kiến trúc Micro-frontend, Backend APIs và tích hợp AI."
              : "Core expertise in frontend engineering and performance optimization, supported by applied experience in micro-frontends, backend APIs, and AI integrations."}
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`px-3 py-1.5 text-xs font-bold border-2 transition-all cursor-pointer select-none ${
                selectedCategory === "all"
                  ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                  : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-100"
              }`}
            >
              [ {isVi ? "Tất Cả" : "All"} ]
            </button>
            {skillsData.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 transition-all cursor-pointer select-none ${
                    isSelected
                      ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                      : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-100"
                  }`}
                >
                  {categoryIcons[cat.id]}
                  <span>{cat.label[isVi ? "vi" : "en"].split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isVi ? "Tìm kiếm kỹ năng..." : "Search skills..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono font-bold border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
            />
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((category) => (
            <PixelCard
              key={category.id}
              title={
                <div className="flex items-center gap-2">
                  {categoryIcons[category.id]}
                  <span>{category.label[isVi ? "vi" : "en"]}</span>
                </div>
              }
            >
              <div className="space-y-3">
                {category.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans pb-1">
                    {category.description[isVi ? "vi" : "en"]}
                  </p>
                )}

                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950/50 space-y-1 hover:bg-white dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {skill.name}
                      </span>
                      {skill.tag && (
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${
                            skill.highlight
                              ? "border-emerald-600 dark:border-emerald-400 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300"
                              : "border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          [{skill.tag[isVi ? "vi" : "en"]}]
                        </span>
                      )}
                    </div>

                    {skill.description && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                        {skill.description[isVi ? "vi" : "en"]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
}
