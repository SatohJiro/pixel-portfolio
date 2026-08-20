"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  contactData,
  summaryData,
  educationData,
  experienceData,
  projectsData,
  awardsData,
} from "@/data/portfolio-content";
import { PixelButton } from "@/components/pixel/PixelButton";
import { Printer, ArrowLeft, Info } from "lucide-react";

function ResumeContent() {
  const searchParams = useSearchParams();
  const paramLang = searchParams.get("lang") === "vi" ? "vi" : "en";
  const [selectedLang, setSelectedLang] = useState<"en" | "vi" | null>(null);
  const lang = selectedLang ?? paramLang;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-6 px-4 sm:px-6 lg:px-8 font-mono print:p-0 print:bg-white print:text-slate-950">
      {/* Floating Action Controls Bar (hidden during print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-3.5 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[3px_3px_0px_0px_#18181b] dark:shadow-[3px_3px_0px_0px_#ffffff]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "vi" ? "Trở về Portfolio" : "Back to Portfolio"}</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Lang Selector */}
          <div className="inline-flex border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-xs">
            <button
              onClick={() => setSelectedLang("en")}
              className={`px-2.5 py-1 font-bold transition-all cursor-pointer ${
                lang === "en" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              English (ATS)
            </button>
            <div className="w-[1px] bg-slate-300 dark:bg-slate-700" />
            <button
              onClick={() => setSelectedLang("vi")}
              className={`px-2.5 py-1 font-bold transition-all cursor-pointer ${
                lang === "vi" ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              Tiếng Việt
            </button>
          </div>

          <PixelButton
            onClick={handlePrint}
            variant="primary"
            size="sm"
            icon={<Printer className="w-4 h-4" />}
          >
            {lang === "vi" ? "In / Lưu PDF" : "Print / PDF"}
          </PixelButton>
        </div>
      </div>

      {/* Print Tip Banner for Standalone page (hidden during print) */}
      <div className="no-print max-w-4xl mx-auto mb-4 flex items-center gap-2 p-3 border-2 border-slate-900 dark:border-slate-100 bg-sky-50 dark:bg-sky-950/40 text-xs text-sky-950 dark:text-sky-200">
        <Info className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" />
        <span className="font-sans">
          {lang === "vi"
            ? "Mẹo in PDF chuẩn đẹp: Trong hộp thoại Print của trình duyệt, chọn khổ giấy A4, lề Default, và bỏ chọn mục 'Headers and footers' (Tiêu đề và chân trang) để không bị in kèm URL trang web."
            : "Print Tip: In the browser print dialog, select Paper size: A4, Margins: Default, and UNCHECK 'Headers and footers' to remove browser URLs."}
        </span>
      </div>

      {/* Main Resume Document Canvas (Monochromatic, Clean, A4-Optimized) */}
      <main className="max-w-4xl mx-auto bg-white text-slate-950 p-8 sm:p-12 space-y-4 font-sans text-xs sm:text-sm leading-relaxed border-2 border-slate-900 shadow-xl print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <header className="resume-header text-center space-y-1 border-b-2 border-slate-950 pb-3 font-mono">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
            NGUYEN TRAN ANH
          </h1>
          <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
            {lang === "en"
              ? "Software Engineer | Full-Stack & Frontend Developer"
              : "Kỹ sư Phần mềm | Lập trình viên Full-Stack & Frontend"}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 pt-1">
            <span>{contactData.location[lang]}</span>
            <span>•</span>
            <span>{lang === "en" ? "Phone:" : "Điện thoại:"} {contactData.phone}</span>
            <span>•</span>
            <span>Email: {contactData.email}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-700 font-medium">
            <span>LinkedIn: linkedin.com/in/satohjiro</span>
            <span>•</span>
            <span>GitHub: github.com/SatohJiro</span>
            <span>•</span>
            <span>Portfolio: satohjiro.github.io</span>
          </div>
        </header>

        {/* Section 1: Professional Summary */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
            {lang === "en" ? "PROFESSIONAL SUMMARY" : "TỔNG QUAN NĂNG LỰC"}
          </h2>
          <div className="text-xs text-slate-800 space-y-1 leading-normal">
            <p>{lang === "en" ? summaryData.en[0] : summaryData.vi[0]}</p>
            <p>{lang === "en" ? summaryData.en[1] : summaryData.vi[1]}</p>
          </div>
        </section>

        {/* Section 2: Education */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
            {lang === "en" ? "EDUCATION" : "HỌC VẤN"}
          </h2>
          <div className="resume-item space-y-0.5 text-xs text-slate-800">
            <div className="flex justify-between items-baseline font-bold text-slate-950">
              <span>{educationData.school[lang]}</span>
              <span className="font-normal text-slate-700">
                {typeof educationData.duration === "string" ? educationData.duration : educationData.duration[lang]}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>{educationData.degree[lang]} — {educationData.major[lang]}</span>
              <span className="font-bold text-slate-950">GPA: {educationData.gpa[lang]} ({educationData.honors[lang]})</span>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Skills */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
            {lang === "en" ? "TECHNICAL SKILLS" : "KỸ NĂNG CHUYÊN MÔN"}
          </h2>
          <div className="resume-item grid grid-cols-1 gap-0.5 text-xs text-slate-800">
            <div>
              <strong className="text-slate-950">{lang === "en" ? "Core Frontend:" : "Frontend Nòng Cốt:"}</strong> ReactJS, Next.js (App Router), Vue.js (Vue 2/3), TypeScript, JavaScript (ES6+), HTML5/CSS3/SCSS, Tailwind CSS.
            </div>
            <div>
              <strong className="text-slate-950">{lang === "en" ? "State & Performance:" : "Quản Lý State & Hiệu Năng:"}</strong> Redux Toolkit, Zustand, Context API, Performance Profiling.
            </div>
            <div>
              <strong className="text-slate-950">{lang === "en" ? "Architecture & Backend:" : "Kiến Trúc & Backend:"}</strong> Micro-frontend Architecture, Java Spring Boot, Python (FastAPI), Node.js (NestJS, Express), Firebase, Supabase, RESTful APIs.
            </div>
            <div>
              <strong className="text-slate-950">{lang === "en" ? "AI & Messaging:" : "Tích Hợp AI & Hàng Đợi:"}</strong> OpenAI GPT-4 API Integration, Prompt Engineering, Doc2Vec NLP, RabbitMQ message queues.
            </div>
            <div>
              <strong className="text-slate-950">{lang === "en" ? "Databases & DevOps:" : "Cơ Sở Dữ Liệu & DevOps:"}</strong> PostgreSQL, MySQL, MongoDB, Docker, Git/GitHub, CMS Webrelease, Figma.
            </div>
          </div>
        </section>

        {/* Section 4: Work Experience */}
        <section className="resume-section space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
            {lang === "en" ? "WORK EXPERIENCE" : "KINH NGHIỆM LÀM VIỆC"}
          </h2>

          {experienceData.map((exp) => (
            <div key={exp.id} className="resume-item space-y-1 text-xs">
              <div className="flex justify-between items-baseline font-bold text-slate-950">
                <span>
                  {exp.title[lang]} — {exp.company} ({typeof exp.location === "string" ? exp.location : exp.location[lang]})
                </span>
                <span className="font-normal text-slate-700">{exp.duration[lang]}</span>
              </div>
              {exp.projectHighlights.map((p, idx) => (
                <div key={idx} className="space-y-0.5 pl-2.5 border-l-2 border-slate-300">
                  <div className="font-semibold text-slate-900">
                    {p.name} {p.client && (
                      <span className="text-slate-600 font-normal">
                        ({typeof p.client === "string" ? p.client : p.client[lang]})
                      </span>
                    )}
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    {p.responsibilities[lang].map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-slate-600 pt-0.5">
                    <strong>{lang === "en" ? "Tech:" : "Công nghệ:"}</strong> {p.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Section 5: Key Projects */}
        <section className="resume-section space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
            {lang === "en" ? "KEY PROJECTS" : "DỰ ÁN TIÊU BIỂU"}
          </h2>
          <div className="space-y-1.5 text-xs text-slate-800">
            {projectsData.slice(0, 3).map((proj) => (
              <div key={proj.id} className="resume-item space-y-0.5">
                <div className="flex justify-between items-baseline font-bold text-slate-950">
                  <span>{proj.name[lang]} {proj.badge && <span className="font-normal text-slate-700">({proj.badge[lang]})</span>}</span>
                  <span className="font-normal text-slate-700">
                    {typeof proj.year === "string" ? proj.year : proj.year[lang]}
                  </span>
                </div>
                <p className="text-slate-800">{proj.description[lang]}</p>
                <div className="text-[11px] text-slate-600">
                  <strong>{lang === "en" ? "Stack:" : "Công nghệ:"}</strong> {proj.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Honors & Awards */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 font-mono">
            {lang === "en" ? "HONORS & AWARDS" : "GIẢI THƯỞNG & VINH DANH"}
          </h2>
          <div className="resume-item space-y-1 text-xs text-slate-800">
            {awardsData.map((award) => (
              <div key={award.id} className="flex justify-between items-baseline">
                <span>
                  <strong className="text-slate-950">{award.title[lang]}</strong> — {award.organization[lang]}
                </span>
                <span className="font-normal text-slate-700">{award.year}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading resume...</div>}>
      <ResumeContent />
    </Suspense>
  );
}
