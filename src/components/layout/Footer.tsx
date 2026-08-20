"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, ShieldCheck, Heart, Activity } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { GlassButton } from "../glass/GlassButton";
import { telemetry } from "@/lib/telemetry";

interface FooterProps {
  onOpenPrivacyDrawer: () => void;
  onOpenResumeModal: () => void;
}

export function Footer({ onOpenPrivacyDrawer, onOpenResumeModal }: FooterProps) {
  const { isVi, isEn } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/90 dark:bg-slate-950/60 backdrop-blur-2xl py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/80 dark:border-white/10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center font-bold text-sm text-cyan-600 dark:text-cyan-400">
                  NTA
                </div>
              </div>
              <div>
                <div className="font-bold text-base text-slate-900 dark:text-white">
                  {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {isVi ? "Kỹ sư Phần mềm | Thủ khoa ĐH Nông Lâm" : "Software Engineer | Valedictorian"}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {isVi
                ? "Phát triển các ứng dụng Web chất lượng cao với Next.js, React, Vue.js, Spring Boot, FastAPI và ứng dụng AI GPT-4."
                : "Building responsive web applications with Next.js, React, Vue.js, Spring Boot, FastAPI, and GPT-4 AI."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("click", "footer_github")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all cursor-pointer shadow-xs"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("click", "footer_linkedin")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all cursor-pointer shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.email}
                onClick={() => telemetry.track("click", "footer_email")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all cursor-pointer shadow-xs"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.phone}
                onClick={() => telemetry.track("click", "footer_phone")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:border-amber-500/40 hover:bg-amber-500/10 transition-all cursor-pointer shadow-xs"
                aria-label="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isVi ? "Điều hướng nhanh" : "Quick Links"}
            </div>
            <ul className="space-y-2 text-xs">
              {siteConfig.navItems.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {item.label[isVi ? "vi" : "en"]}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenResumeModal}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer font-medium"
                >
                  {isVi ? "📄 Xem CV Online" : "📄 Online ATS Resume"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & Telemetry */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isVi ? "Quyền riêng tư" : "Privacy by Design"}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isVi
                ? "Website tuân thủ GDPR/CCPA. 100% không dùng Cookie bên thứ 3, không thu thập IP và không lưu dữ liệu cá nhân."
                : "GDPR/CCPA compliant. 100% cookie-free, no IP logging, and zero personal data stored."}
            </p>
            <GlassButton
              onClick={onOpenPrivacyDrawer}
              size="sm"
              variant="outline"
              icon={<Activity className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
              className="text-xs"
            >
              {isVi ? "Xem Telemetry Log" : "View Telemetry"}
            </GlassButton>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div>
            © {currentYear} Nguyen Tran Anh (SatohJiro). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Next.js & Glassmorphism
            </span>
            <span className="font-mono">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
