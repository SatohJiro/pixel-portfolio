"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { projectsData } from "@/data/portfolio-content";
import { ProjectItem } from "@/types";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import { PixelButton } from "../pixel/PixelButton";
import { PixelModal } from "../pixel/PixelModal";
import {
  ExternalLink,
  Workflow,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ProjectsSection() {
  const { isVi } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "all", label: { en: "All", vi: "Tất Cả" } },
    { id: "web", label: { en: "Web Platforms", vi: "Web Platform" } },
    { id: "ai", label: { en: "AI Tools", vi: "Ứng Dụng AI" } },
    { id: "academic", label: { en: "Algorithms & Research", vi: "Học Thuật & Thuật Toán" } },
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
    <section id="projects" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <PixelBadge variant="emerald" size="md">
            {isVi ? "DỰ ÁN TIÊU BIỂU" : "PROJECT INVENTORY"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Sản Phẩm & Dự Án Đã Thực Hiện" : "Featured Projects & Case Studies"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Tổng hợp các dự án thực tế từ sản phẩm ứng dụng AI đến các nền tảng web doanh nghiệp và phần mềm thuật toán."
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
                className={`px-3 py-1.5 text-xs font-bold border-2 transition-all cursor-pointer select-none ${
                  isSelected
                    ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                    : "border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-100"
                }`}
              >
                [ {cat.label[isVi ? "vi" : "en"]} ]
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <PixelCard
              key={project.id}
              interactive
              className="flex flex-col justify-between p-5 space-y-4"
            >
              <div className="space-y-3">
                {/* Top Year & Badge */}
                <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-slate-300 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    #{typeof project.year === "string" ? project.year : project.year[isVi ? "vi" : "en"]}
                  </span>
                  {project.badge && (
                    <PixelBadge
                      variant={project.category === "ai" ? "indigo" : "emerald"}
                      size="sm"
                    >
                      {project.badge[isVi ? "vi" : "en"]}
                    </PixelBadge>
                  )}
                </div>

                {/* Project Title & Org */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {project.name[isVi ? "vi" : "en"]}
                  </h3>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    {project.organization[isVi ? "vi" : "en"]}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed line-clamp-3">
                  {project.description[isVi ? "vi" : "en"]}
                </p>

                {/* Highlights preview */}
                <div className="space-y-1 pt-1">
                  {project.highlights[isVi ? "vi" : "en"].slice(0, 2).map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold shrink-0">■</span>
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Tech Stack & Actions */}
              <div className="space-y-3 pt-3 border-t-2 border-slate-900 dark:border-slate-100">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-1.5 py-0.5 border border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-mono font-bold"
                    >
                      [{tech}]
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 border border-slate-400 text-slate-600 dark:text-slate-400 font-mono">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <PixelButton
                    onClick={() => handleOpenProjectModal(project)}
                    size="sm"
                    variant="secondary"
                    icon={<Workflow className="w-3.5 h-3.5" />}
                    className="w-full text-xs"
                  >
                    {isVi ? "Chi tiết" : "Details"}
                  </PixelButton>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => telemetry.track("click", `project_github_${project.id}`)}
                      className="p-1.5 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 cursor-pointer"
                      aria-label="GitHub Repository"
                      title="GitHub"
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
                      className="p-1.5 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 cursor-pointer"
                      aria-label="Live Demo Link"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </PixelCard>
          ))}
        </div>

        {/* Project Detail Pixel Modal */}
        <PixelModal
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
          maxWidth="xl"
          title={
            activeModalProject && (
              <div className="flex items-center gap-2">
                <span>PROJECT: {activeModalProject.name[isVi ? "vi" : "en"]}</span>
              </div>
            )
          }
        >
          {activeModalProject && (
            <div className="space-y-5">
              {/* Organization & Year */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">{isVi ? "Đơn vị / Bối cảnh" : "Organization"}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {activeModalProject.organization[isVi ? "vi" : "en"]} ({typeof activeModalProject.year === "string" ? activeModalProject.year : activeModalProject.year[isVi ? "vi" : "en"]})
                  </div>
                </div>
                {activeModalProject.badge && (
                  <PixelBadge variant="emerald" size="sm">
                    {activeModalProject.badge[isVi ? "vi" : "en"]}
                  </PixelBadge>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
                  <span className="text-emerald-500">■</span>
                  <span>{isVi ? "MÔ TẢ & MỤC TIÊU DỰ ÁN" : "PROJECT SUMMARY & GOAL"}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {activeModalProject.description[isVi ? "vi" : "en"]}
                </p>
              </div>

              {/* Architecture Blueprint if available */}
              {activeModalProject.architecture && (
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 uppercase">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{isVi ? "KIẾN TRÚC & MÔ HÌNH HỆ THỐNG" : "SYSTEM ARCHITECTURE"}</span>
                  </div>
                  <div className="p-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-950 text-emerald-400 text-xs font-mono leading-relaxed">
                    {activeModalProject.architecture[isVi ? "vi" : "en"]}
                  </div>
                </div>
              )}

              {/* Challenges & Solutions */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 uppercase">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{isVi ? "VẤN ĐỀ KỸ THUẬT & GIẢI PHÁP" : "CHALLENGES & SOLUTIONS"}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  {activeModalProject.challengesSolved[isVi ? "vi" : "en"].map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                      <span className="text-amber-600 dark:text-amber-400 font-mono font-bold shrink-0">&gt;</span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* All Technologies */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
                  <span className="text-emerald-500">■</span>
                  <span>{isVi ? "CÔNG NGHỆ ÁP DỤNG" : "TECH STACK"}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold font-mono px-2 py-0.5 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[1.5px_1.5px_0px_0px_#18181b] dark:shadow-[1.5px_1.5px_0px_0px_#ffffff]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </PixelModal>
      </div>
    </section>
  );
}
