"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, ShieldCheck, Heart, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { PixelButton } from "../pixel/PixelButton";
import { telemetry } from "@/lib/telemetry";

interface FooterProps {
  onOpenPrivacyDrawer: () => void;
  onOpenResumeModal: () => void;
}

export function Footer({ onOpenPrivacyDrawer, onOpenResumeModal }: FooterProps) {
  const { isVi } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-950 py-12 mt-20 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b-2 border-slate-900 dark:border-slate-100">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 border-2 border-slate-900 dark:border-slate-100 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]">
                NTA
              </div>
              <div>
                <div className="font-bold text-base text-slate-900 dark:text-white">
                  {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  {isVi ? "Kỹ sư Phần mềm | Thủ khoa ĐH Nông Lâm (GPA 3.6/4.0)" : "Software Engineer | Valedictorian (GPA 3.6/4.0)"}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-sans">
              {isVi
                ? "Chuyên phát triển các ứng dụng Web chất lượng cao với Next.js, ReactJS, Vue.js, Spring Boot, FastAPI và ứng dụng AI GPT-4."
                : "Building high-performance web applications with Next.js, ReactJS, Vue.js, Spring Boot, FastAPI, and GPT-4 AI."}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("click", "footer_github")}
                className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("click", "footer_linkedin")}
                className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.email}
                onClick={() => telemetry.track("click", "footer_email")}
                className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                aria-label="Send Email"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.phone}
                onClick={() => telemetry.track("click", "footer_phone")}
                className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                aria-label="Call Phone"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-emerald-500">■</span>
              <span>{isVi ? "ĐIỀU HƯỚNG" : "NAVIGATION"}</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {siteConfig.navItems.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:underline transition-colors"
                  >
                    &gt; {item.label[isVi ? "vi" : "en"]}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenResumeModal}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-colors cursor-pointer"
                >
                  &gt; {isVi ? "[📄 Xem CV Online]" : "[📄 Online ATS Resume]"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & Telemetry */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isVi ? "BẢO MẬT & PRIVACY" : "PRIVACY BY DESIGN"}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {isVi
                ? "100% không Cookie theo dõi, không lưu IP cá nhân và tuân thủ GDPR/CCPA."
                : "100% cookie-free, no IP tracking, and fully GDPR/CCPA compliant."}
            </p>
            <PixelButton
              onClick={onOpenPrivacyDrawer}
              size="sm"
              variant="outline"
              icon={<Terminal className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
            >
              {isVi ? "Xem Telemetry Log" : "View Telemetry"}
            </PixelButton>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-4">
          <div>
            © {currentYear} Nguyen Tran Anh (SatohJiro). All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> & Pixel Craft
            </span>
            <span className="font-bold border border-slate-900 dark:border-slate-100 px-1.5 py-0.2 text-[10px] bg-slate-100 dark:bg-slate-800">
              v2.0-PIXEL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
