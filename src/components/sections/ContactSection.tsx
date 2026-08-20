"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassButton } from "../glass/GlassButton";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { telemetry } from "@/lib/telemetry";

export function ContactSection() {
  const { isVi, isEn } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    telemetry.track("click", `copy_${key}`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <GlassBadge variant="emerald" size="md">
            {isVi ? "Thông Tin Liên Hệ" : "Get In Touch"}
          </GlassBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Kết Nối & <span className="text-gradient">Trao Đổi Cơ Hội Nghề Nghiệp</span>
              </>
            ) : (
              <>
                Let&apos;s Connect & <span className="text-gradient">Explore Opportunities</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Bạn có thể liên hệ trực tiếp với tôi qua email, số điện thoại hoặc các mạng xã hội nghề nghiệp bên dưới."
              : "Feel free to reach out directly via email, phone, or professional networks below."}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Email */}
          <GlassCard className="p-6 sm:p-7 space-y-5 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70 flex flex-col justify-between" glowColor="none">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  onClick={() => handleCopy(contactData.email, "email")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                  title="Copy Email Address"
                >
                  {copiedKey === "email" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{isVi ? "Đã sao chép" : "Copied"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isVi ? "Sao chép" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">Email Address</div>
                <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 select-all">
                  {contactData.email}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isVi
                  ? "Kênh liên hệ chính cho các cơ hội việc làm, phỏng vấn và trao đổi chuyên môn."
                  : "Primary contact channel for recruitment, interview invitations, and project discussions."}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.links.email}
                onClick={() => telemetry.track("click", "contact_direct_email")}
                className="w-full"
              >
                <GlassButton
                  variant="primary"
                  size="md"
                  icon={<Mail className="w-4 h-4" />}
                  className="w-full text-xs font-semibold"
                >
                  {isVi ? "Gửi Email Trực Tiếp" : "Send Direct Email"}
                </GlassButton>
              </a>
            </div>
          </GlassCard>

          {/* Card 2: Phone */}
          <GlassCard className="p-6 sm:p-7 space-y-5 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70 flex flex-col justify-between" glowColor="none">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Phone className="w-6 h-6" />
                </div>
                <button
                  onClick={() => handleCopy(contactData.phone, "phone")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                  title="Copy Phone Number"
                >
                  {copiedKey === "phone" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{isVi ? "Đã sao chép" : "Copied"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isVi ? "Sao chép" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">Phone / Zalo</div>
                <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 select-all">
                  {contactData.phone}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isVi
                  ? "Sẵn sàng nhận cuộc gọi, tin nhắn SMS hoặc trao đổi qua Zalo trong giờ hành chính."
                  : "Available for phone calls, SMS, or quick messaging during business hours."}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.links.phone}
                onClick={() => telemetry.track("click", "contact_direct_phone")}
                className="w-full"
              >
                <GlassButton
                  variant="outline"
                  size="md"
                  icon={<Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  className="w-full text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  {isVi ? "Gọi Điện Thoại" : "Make a Phone Call"}
                </GlassButton>
              </a>
            </div>
          </GlassCard>

          {/* Card 3: Professional Networks (LinkedIn & GitHub) */}
          <GlassCard className="p-6 sm:p-7 space-y-5 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
            <div className="space-y-2">
              <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {isVi ? "Mạng Xã Hội Nghề Nghiệp" : "Professional Profiles"}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                LinkedIn & GitHub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isVi
                  ? "Xem lịch sử nghề nghiệp chi tiết và các mã nguồn dự án mã nguồn mở."
                  : "Explore career timeline and open-source software contributions."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("click", "contact_card_linkedin")}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">LinkedIn</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">/in/satohjiro</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              </a>

              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("click", "contact_card_github")}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:hover:bg-cyan-500/10 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">GitHub</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">/SatohJiro</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </GlassCard>

          {/* Card 4: Location & Work Mode */}
          <GlassCard className="p-6 sm:p-7 space-y-5 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70" glowColor="none">
            <div className="space-y-2">
              <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {isVi ? "Khu Vực Làm Việc" : "Location & Availability"}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>{contactData.location[isVi ? "vi" : "en"]}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isVi
                  ? "Sẵn sàng làm việc theo hình thức On-site tại TP. Hồ Chí Minh, Hybrid hoặc Remote cho các công ty trong và ngoài nước."
                  : "Available for On-site roles in Ho Chi Minh City, Hybrid setups, or Remote positions."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                ✓ {isVi ? "Sẵn sàng nhận việc" : "Available to Join"}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300">
                {isVi ? "On-site / Hybrid / Remote" : "On-site / Hybrid / Remote"}
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
