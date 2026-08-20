"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { skillsData } from "@/data/portfolio-content";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import {
  Layers,
  Cpu,
  Sparkles,
  Database,
  Search,
  BookOpen,
  Zap,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { sfx } from "@/lib/audio";

export function SkillsSection() {
  const { isVi } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categorySpellMeta: Record<string, { spellName: { en: string; vi: string }; icon: React.ReactNode; color: string }> = {
    frontend: {
      spellName: { en: "⚡ LIGHTNING SPELLS (FRONTEND)", vi: "⚡ PHÉP THUẬT SẤM SÉT (FRONTEND)" },
      icon: <Zap className="w-4 h-4 text-sky-500" />,
      color: "text-sky-500",
    },
    state: {
      spellName: { en: "🌀 FLOW & CHRONO MAGIC (STATE & TUNING)", vi: "🌀 MA PHÁP DÒNG CHẢY (STATE & TUNING)" },
      icon: <Layers className="w-4 h-4 text-indigo-500" />,
      color: "text-indigo-500",
    },
    backend: {
      spellName: { en: "🛡️ EARTH FORTRESS (BACKEND APIS)", vi: "🛡️ THÀNH TRÌ ĐỊA KHOÁNG (BACKEND APIS)" },
      icon: <Cpu className="w-4 h-4 text-amber-500" />,
      color: "text-amber-500",
    },
    ai: {
      spellName: { en: "🔮 ARCANE AI & ARCHITECTURE", vi: "🔮 MA THUẬT CỔ ĐẠI & AI" },
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      color: "text-emerald-500",
    },
    devops: {
      spellName: { en: "🧪 ALCHEMY FORGE (DEVOPS & TOOLS)", vi: "🧪 LÒ LUYỆN ĐAN (DEVOPS & TOOLS)" },
      icon: <Database className="w-4 h-4 text-rose-500" />,
      color: "text-rose-500",
    },
  };

  const handleCategorySelect = (id: string) => {
    sfx.select();
    setSelectedCategory(id);
    telemetry.track("click", `filter_spellbook_${id}`);
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
            {isVi ? "SÁCH MA PHÁP & CÂY KỸ NĂNG" : "SPELLBOOK & ABILITY TREE"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            {isVi ? "Bí Kíp Kỹ Thuật & Cây Năng Lực" : "Technical Spellbook & Applied Abilities"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Cây kỹ năng đã tôi luyện đến cấp độ tinh thông: Micro-frontends, React, Vue, TypeScript, Spring Boot và tối ưu hiệu năng."
              : "Abilities honed to mastery: Micro-frontends, React, Vue, TypeScript, Spring Boot, and state optimization."}
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`px-3 py-1.5 font-game text-[10px] border-2 transition-all cursor-pointer select-none ${
                selectedCategory === "all"
                  ? "border-slate-900 dark:border-slate-100 bg-amber-400 text-slate-950 font-bold shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                  : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-100"
              }`}
            >
              [ {isVi ? "Tất Cả Hệ" : "All Elements"} ]
            </button>
            {skillsData.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const meta = categorySpellMeta[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold border-2 transition-all cursor-pointer select-none ${
                    isSelected
                      ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                      : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-100"
                  }`}
                >
                  {meta?.icon}
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
              placeholder={isVi ? "Tra cứu phép thuật..." : "Search spell..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono font-bold border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
            />
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((category) => {
            const meta = categorySpellMeta[category.id] || {
              spellName: { en: category.label.en, vi: category.label.vi },
              icon: <BookOpen className="w-4 h-4" />,
              color: "text-emerald-500",
            };

            return (
              <PixelCard
                key={category.id}
                variant="rpg"
                title={
                  <div className="flex items-center gap-2">
                    {meta.icon}
                    <span>{meta.spellName[isVi ? "vi" : "en"]}</span>
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
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 font-game text-[8px]">★</span>
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        {skill.tag && (
                          <span
                            className={`text-[9px] font-game px-1.5 py-0.5 border ${
                              skill.highlight
                                ? "border-emerald-600 dark:border-emerald-400 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold"
                                : "border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            [{skill.tag[isVi ? "vi" : "en"]}]
                          </span>
                        )}
                      </div>

                      {skill.description && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed pl-3.5">
                          {skill.description[isVi ? "vi" : "en"]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
