"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import {
  summaryData,
  contactData,
  educationData,
  experienceData,
  projectsData,
  awardsData,
} from "@/data/portfolio-content";
import { PixelModal } from "../pixel/PixelModal";
import { PixelButton } from "../pixel/PixelButton";
import {
  Printer,
  FileDown,
  ExternalLink,
  Code,
  Info,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { isVi } = useLanguage();
  const [resumeLang, setResumeLang] = useState<"en" | "vi">("en");

  const handlePrint = () => {
    telemetry.track("download_cv", "print_button", { lang: resumeLang });
    window.open(`/resume?lang=${resumeLang}`, "_blank");
  };

  const handleDownloadJson = () => {
    telemetry.track("download_cv", "json_download");
    const exportData = {
      name: "NGUYEN TRAN ANH",
      headline: resumeLang === "en" ? "Software Engineer | Full-Stack & Frontend Developer" : "Kỹ sư Phần mềm | Lập trình viên Full-Stack & Frontend",
      education: {
        school: educationData.school[resumeLang],
        degree: educationData.degree[resumeLang],
        major: educationData.major[resumeLang],
        duration: typeof educationData.duration === "string" ? educationData.duration : educationData.duration[resumeLang],
        gpa: educationData.gpa[resumeLang],
        honors: educationData.honors[resumeLang],
      },
      experience: experienceData.map(exp => ({
        company: exp.company,
        location: typeof exp.location === "string" ? exp.location : exp.location[resumeLang],
        title: exp.title[resumeLang],
        duration: exp.duration[resumeLang],
        projects: exp.projectHighlights.map(p => ({
          name: p.name,
          client: typeof p.client === "string" ? p.client : p.client ? p.client[resumeLang] : undefined,
          description: p.description[resumeLang],
          responsibilities: p.responsibilities[resumeLang],
          technologies: p.technologies,
        })),
      })),
      projects: projectsData.map(p => ({
        name: p.name[resumeLang],
        organization: p.organization[resumeLang],
        year: typeof p.year === "string" ? p.year : p.year[resumeLang],
        description: p.description[resumeLang],
        technologies: p.technologies,
      })),
      awards: awardsData.map(a => ({
        title: a.title[resumeLang],
        organization: a.organization[resumeLang],
        year: a.year,
        description: a.description[resumeLang],
      })),
      contact: {
        phone: contactData.phone,
        email: contactData.email,
        location: contactData.location[resumeLang],
        linkedin: contactData.linkedin,
        github: contactData.github,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Nguyen_Tran_Anh_CV_${resumeLang}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PixelModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2">
          <FileDown className="w-4 h-4 text-emerald-400" />
          <span>{isVi ? "HỒ SƠ NĂNG LỰC / ATS RESUME" : "CURRICULUM VITAE / ATS RESUME"}</span>
        </div>
      }
    >
      <div className="space-y-4 font-mono">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-950">
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">
              {isVi ? "Ngôn ngữ:" : "Language:"}
            </span>
            <div className="inline-flex border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-xs">
              <button
                onClick={() => setResumeLang("en")}
                className={`px-2.5 py-1 font-bold transition-all ${
                  resumeLang === "en"
                    ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                English (ATS)
              </button>
              <div className="w-[1px] h-full bg-slate-300 dark:bg-slate-700" />
              <button
                onClick={() => setResumeLang("vi")}
                className={`px-2.5 py-1 font-bold transition-all ${
                  resumeLang === "vi"
                    ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <PixelButton
              onClick={handlePrint}
              variant="primary"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
            >
              {isVi ? "In / Lưu PDF (A4)" : "Print / PDF (A4)"}
            </PixelButton>

            <PixelButton
              onClick={handleDownloadJson}
              variant="secondary"
              size="sm"
              icon={<Code className="w-3.5 h-3.5" />}
              title="Download structured JSON resume"
            >
              JSON
            </PixelButton>
          </div>
        </div>

        {/* Print Tip Banner */}
        <div className="flex items-start gap-2 p-2.5 border-2 border-slate-900 dark:border-slate-100 bg-sky-50 dark:bg-sky-950/40 text-xs text-sky-950 dark:text-sky-200">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" />
          <span className="font-sans">
            {isVi
              ? "Mẹo in: Trong hộp thoại Print của trình duyệt, bỏ tích 'Headers and footers' (Tiêu đề và chân trang) để bản in sạch sẽ, không bị chèn URL."
              : "Print Tip: In the browser print dialog, uncheck 'Headers and footers' to ensure clean output without browser URL text."}
          </span>
        </div>

        {/* ATS Resume Preview Paper Container (Monochromatic & Clean Alignment) */}
        <div className="p-6 sm:p-8 bg-white text-slate-900 border-2 border-slate-900 space-y-4 text-xs font-sans shadow-lg">
          {/* Header */}
          <div className="text-center space-y-1 border-b-2 border-slate-900 pb-3 font-mono">
            <h1 className="text-xl font-bold tracking-tight text-slate-950 uppercase">
              NGUYEN TRAN ANH
            </h1>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {resumeLang === "en"
                ? "Software Engineer | Full-Stack & Frontend Developer"
                : "Kỹ sư Phần mềm | Lập trình viên Full-Stack & Frontend"}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-600 pt-1">
              <span>{contactData.location[resumeLang]}</span>
              <span>•</span>
              <span>{resumeLang === "en" ? "Phone:" : "Điện thoại:"} {contactData.phone}</span>
              <span>•</span>
              <span>Email: {contactData.email}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-600 pt-0.5">
              <span>LinkedIn: linkedin.com/in/satohjiro</span>
              <span>•</span>
              <span>GitHub: github.com/SatohJiro</span>
              <span>•</span>
              <span>Portfolio: satohjiro.github.io</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
              {resumeLang === "en" ? "PROFESSIONAL SUMMARY" : "TỔNG QUAN NĂNG LỰC"}
            </h2>
            <div className="text-[11px] text-slate-800 leading-relaxed space-y-1">
              <p>{resumeLang === "en" ? summaryData.en[0] : summaryData.vi[0]}</p>
              <p>{resumeLang === "en" ? summaryData.en[1] : summaryData.vi[1]}</p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
              {resumeLang === "en" ? "EDUCATION" : "HỌC VẤN"}
            </h2>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex justify-between items-baseline font-bold text-slate-950">
                <span>{educationData.school[resumeLang]}</span>
                <span className="font-normal text-slate-700">
                  {typeof educationData.duration === "string" ? educationData.duration : educationData.duration[resumeLang]}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-slate-800">
                <span>{educationData.degree[resumeLang]} — {educationData.major[resumeLang]}</span>
                <span className="font-bold text-slate-950">GPA: {educationData.gpa[resumeLang]} ({educationData.honors[resumeLang]})</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
              {resumeLang === "en" ? "TECHNICAL SKILLS" : "KỸ NĂNG CHUYÊN MÔN"}
            </h2>
            <div className="grid grid-cols-1 gap-0.5 text-[11px] text-slate-800">
              <div>
                <strong className="text-slate-950">{resumeLang === "en" ? "Core Frontend:" : "Frontend Nòng Cốt:"}</strong> ReactJS, Next.js (App Router), Vue.js (Vue 2/3), TypeScript, JavaScript (ES6+), HTML5/CSS3/SCSS, Tailwind CSS.
              </div>
              <div>
                <strong className="text-slate-950">{resumeLang === "en" ? "State & Performance:" : "Quản Lý State & Hiệu Năng:"}</strong> Redux Toolkit, Zustand, Context API, Performance Profiling.
              </div>
              <div>
                <strong className="text-slate-950">{resumeLang === "en" ? "Architecture & Backend:" : "Kiến Trúc & Backend:"}</strong> Micro-frontend Architecture, Java Spring Boot, Python (FastAPI), Node.js (NestJS, Express), Firebase, Supabase, RESTful APIs.
              </div>
              <div>
                <strong className="text-slate-950">{resumeLang === "en" ? "AI & Messaging:" : "Tích Hợp AI & Hàng Đợi:"}</strong> OpenAI GPT-4 API Integration, Prompt Engineering, Doc2Vec NLP, RabbitMQ message queues.
              </div>
              <div>
                <strong className="text-slate-950">{resumeLang === "en" ? "Databases & DevOps:" : "Cơ Sở Dữ Liệu & DevOps:"}</strong> PostgreSQL, MySQL, MongoDB, Docker, Git/GitHub, CMS Webrelease, Figma.
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
              {resumeLang === "en" ? "WORK EXPERIENCE" : "KINH NGHIỆM LÀM VIỆC"}
            </h2>

            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-1 text-[11px]">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>
                    {exp.title[resumeLang]} — {exp.company} ({typeof exp.location === "string" ? exp.location : exp.location[resumeLang]})
                  </span>
                  <span className="font-normal text-slate-700">{exp.duration[resumeLang]}</span>
                </div>
                {exp.projectHighlights.map((p, idx) => (
                  <div key={idx} className="space-y-0.5 pl-2 border-l-2 border-slate-300">
                    <div className="font-semibold text-slate-900">
                      {p.name} {p.client && (
                        <span className="text-slate-600 font-normal">
                          ({typeof p.client === "string" ? p.client : p.client[resumeLang]})
                        </span>
                      )}
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                      {p.responsibilities[resumeLang].map((r, rIdx) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>
                    <div className="text-[10px] text-slate-600 pt-0.5">
                      <strong>{resumeLang === "en" ? "Tech:" : "Công nghệ:"}</strong> {p.technologies.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Honors & Awards */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
              {resumeLang === "en" ? "HONORS & AWARDS" : "GIẢI THƯỞNG & VINH DANH"}
            </h2>
            <div className="space-y-0.5 text-[11px] text-slate-800">
              {awardsData.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline">
                  <span>
                    <strong className="text-slate-950">{a.title[resumeLang]}</strong> — {a.organization[resumeLang]}
                  </span>
                  <span className="font-normal text-slate-700">{a.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2">
          <Link
            href={`/resume?lang=${resumeLang}`}
            target="_blank"
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>{isVi ? "Mở toàn màn hình trang in Resume chuyên biệt" : "Open standalone printable resume page"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </PixelModal>
  );
}
