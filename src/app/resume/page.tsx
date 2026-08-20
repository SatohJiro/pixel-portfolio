"use client";

import React, { useState, useEffect, Suspense } from "react";
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
import { Printer, ArrowLeft, Info } from "lucide-react";

function ResumeContent() {
  const searchParams = useSearchParams();
  const initialLang = (searchParams.get("lang") as "en" | "vi") || "en";
  const [lang, setLang] = useState<"en" | "vi">(initialLang);

  useEffect(() => {
    const urlLang = searchParams.get("lang") as "en" | "vi";
    if (urlLang && (urlLang === "en" || urlLang === "vi")) {
      setLang(urlLang);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-6 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-slate-950">
      {/* Floating Action Controls Bar (hidden during print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "vi" ? "Trở về Portfolio" : "Back to Portfolio"}</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Lang Selector */}
          <div className="inline-flex rounded-xl p-0.5 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                lang === "en" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              English (ATS)
            </button>
            <button
              onClick={() => setLang("vi")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                lang === "vi" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              Tiếng Việt
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === "vi" ? "In / Lưu PDF" : "Print / Save PDF"}</span>
          </button>
        </div>
      </div>

      {/* Print Tip Banner for Standalone page (hidden during print) */}
      <div className="no-print max-w-4xl mx-auto mb-4 flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-xs text-blue-900 dark:text-blue-200 shadow-xs">
        <Info className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <span>
          {lang === "vi"
            ? "Mẹo in PDF chuẩn đẹp: Trong hộp thoại Print của trình duyệt, chọn khổ giấy A4, lề Default, và bỏ chọn mục 'Headers and footers' (Tiêu đề và chân trang) để không bị in kèm URL trang web."
            : "Print Tip: In the browser print dialog, select Paper size: A4, Margins: Default, and UNCHECK 'Headers and footers' to remove browser URLs."}
        </span>
      </div>

      {/* Main Resume Document Canvas (Monochromatic, Clean, A4-Optimized) */}
      <main className="max-w-4xl mx-auto bg-white text-slate-950 p-8 sm:p-12 rounded-2xl shadow-xl space-y-5 font-sans text-xs sm:text-sm leading-relaxed border border-slate-200 print:p-0 print:border-none print:shadow-none print:rounded-none">
        {/* Document Header */}
        <header className="resume-header text-center space-y-1.5 border-b-2 border-slate-950 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
            NGUYEN TRAN ANH
          </h1>
          <div className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
            {lang === "en"
              ? "Software Engineer | Full-Stack & Frontend Developer"
              : "Kỹ sư Phần mềm | Lập trình viên Full-Stack & Frontend"}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
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
            <span>Portfolio: satohjiro-2022.web.app</span>
          </div>
        </header>

        {/* Section 1: Professional Summary */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
            {lang === "en" ? "PROFESSIONAL SUMMARY" : "TỔNG QUAN NĂNG LỰC"}
          </h2>
          <div className="text-xs text-slate-800 space-y-1 leading-normal">
            <p>{lang === "en" ? summaryData.en[0] : summaryData.vi[0]}</p>
            <p>{lang === "en" ? summaryData.en[1] : summaryData.vi[1]}</p>
          </div>
        </section>

        {/* Section 2: Education (Clean 2-line structure) */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
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
              <span className="font-semibold text-slate-950">GPA: {educationData.gpa[lang]}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Skills */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
            {lang === "en" ? "TECHNICAL SKILLS" : "KỸ NĂNG CHUYÊN MÔN"}
          </h2>
          <div className="resume-item grid grid-cols-1 gap-1 text-xs text-slate-800">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
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
                <div key={idx} className="space-y-0.5 pl-2.5 border-l border-slate-300">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
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

        {/* Section 6: Honors & Awards (Separate section) */}
        <section className="resume-section space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5">
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
