"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { ProjectItem } from "@/types";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassButton } from "../glass/GlassButton";
import { GlassModal } from "../glass/GlassModal";
import {
  ExternalLink,
  Workflow,
  CheckCircle2,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi, isEn } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "all", label: { en: "All Projects", vi: "Tất Cả Dự Án" } },
    { id: "web", label: { en: "Web Platforms", vi: "Dự Án Web" } },
    { id: "ai", label: { en: "AI Tools", vi: "Ứng Dụng AI" } },
    { id: "academic", label: { en: "Academic & Algorithms", vi: "Học Thuật & Thuật Toán" } },
  ];

  const filteredProjects = projectsData.filter((proj) => {
    if (filter === "all") return true;
    return proj.category === filter;
  });

  const handleFilterChange = (id: string) => {
    setFilter(id);
    telemetry.track("click", `filter_projects_${id}`);
  };

  const handleOpenProjectModal = (project: ProjectItem) => {
    setActiveModalProject(project);
    telemetry.track("click", `view_project_modal_${project.id}`, { name: project.name.en });
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <GlassBadge variant="emerald" size="md">
            {isVi ? "Dự Án Tiêu Biểu" : "Featured Projects"}
          </GlassBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Dự Án Tiêu Biểu & <span className="text-gradient-emerald">Sản Phẩm Đã Làm</span>
              </>
            ) : (
              <>
                Featured Works & <span className="text-gradient-emerald">Projects Delivered</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Tổng hợp các dự án thực tế từ sản phẩm ứng dụng AI đến các nền tảng web và phần mềm học thuật."
              : "Curated collection of production web platforms, AI tools, and algorithm research projects."}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-xs border border-emerald-500/40"
                    : "glass-button text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {cat.label[isVi ? "vi" : "en"]}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <GlassCard
              key={project.id}
              className="flex flex-col justify-between p-6 space-y-5 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70"
              glowColor="none"
            >
              <div className="space-y-4">
                {/* Top Badge & Year */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                    {typeof project.year === "string" ? project.year : project.year[isVi ? "vi" : "en"]}
                  </div>
                  {project.badge && (
                    <GlassBadge variant={project.category === "ai" ? "indigo" : "cyan"} size="sm">
                      {project.badge[isVi ? "vi" : "en"]}
                    </GlassBadge>
                  )}
                </div>

                {/* Project Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {project.name[isVi ? "vi" : "en"]}
                  </h3>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    {project.organization[isVi ? "vi" : "en"]}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {project.description[isVi ? "vi" : "en"]}
                </p>

                {/* Highlights preview */}
                <div className="space-y-1.5 pt-1">
                  {project.highlights[isVi ? "vi" : "en"].slice(0, 2).map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Tech Stack & Actions */}
              <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-white/10">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-mono font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <GlassButton
                    onClick={() => handleOpenProjectModal(project)}
                    size="sm"
                    variant="outline"
                    icon={<Workflow className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                    className="w-full text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                  >
                    {isVi ? "Chi tiết Dự án" : "Details & Architecture"}
                  </GlassButton>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => telemetry.track("click", `project_github_${project.id}`)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-cyan-500/40 transition-all shrink-0 cursor-pointer shadow-xs"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => telemetry.track("click", `project_live_${project.id}`)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-emerald-500/40 transition-all shrink-0 cursor-pointer shadow-xs"
                      aria-label="Live Demo Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Project Modal */}
        <GlassModal
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
          maxWidth="xl"
          title={
            activeModalProject && (
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
                <Workflow className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{activeModalProject.name[isVi ? "vi" : "en"]}</span>
              </div>
            )
          }
        >
          {activeModalProject && (
            <div className="space-y-6 text-slate-800 dark:text-slate-100">
              {/* Organization & Year */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{isVi ? "Đơn vị / Bối cảnh" : "Organization / Context"}</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeModalProject.organization[isVi ? "vi" : "en"]}
                  </div>
                </div>
                {activeModalProject.badge && (
                  <GlassBadge variant="indigo" size="md">
                    {activeModalProject.badge[isVi ? "vi" : "en"]}
                  </GlassBadge>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  {isVi ? "Mô Tả & Mục Tiêu Dự Án" : "Project Summary & Mission"}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeModalProject.description[isVi ? "vi" : "en"]}
                </p>
              </div>

              {/* Architecture Blueprint if available */}
              {activeModalProject.architecture && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mô Hình / Kiến Trúc Áp Dụng" : "System / Architecture Pipeline"}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-300 leading-relaxed shadow-sm">
                    {activeModalProject.architecture[isVi ? "vi" : "en"]}
                  </div>
                </div>
              )}

              {/* Challenges & Solutions */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{isVi ? "Vấn Đề Kỹ Thuật & Giải Pháp" : "Technical Challenges & Solutions"}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalProject.challengesSolved[isVi ? "vi" : "en"].map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* All Technologies */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  {isVi ? "Công Nghệ Sử Dụng" : "Technologies Used"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.technologies.map((t, idx) => (
                    <GlassBadge key={idx} variant="cyan" size="sm">
                      {t}
                    </GlassBadge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </GlassModal>
      </div>
    </section>
  );
}
