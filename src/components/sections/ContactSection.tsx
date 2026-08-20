"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactData } from "@/data/portfolio-content";
import { siteConfig } from "@/config/site";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import { PixelButton } from "../pixel/PixelButton";
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
import { sfx } from "@/lib/audio";

export function ContactSection() {
  const { isVi } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    sfx.coin();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    telemetry.track("click", `copy_${key}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <PixelBadge variant="emerald" size="md">
            {isVi ? "TRẠM LIÊN LẠC GUILD HALL" : "GUILD HALL & CONTACT MATRIX"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            {isVi ? "Kết Nối & Chiêu Mộ Nhân Tài" : "Send Guild Invite & Get In Touch"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Sẵn sàng nhận thư mời phỏng vấn, trao đổi hợp tác và tham gia các chiến dịch công nghệ mới."
              : "Available for engineering interviews, team recruitment, and new project campaigns."}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Email */}
          <PixelCard
            interactive
            variant="rpg"
            className="p-5 flex flex-col justify-between space-y-4"
            title={
              <div className="flex items-center justify-between w-full font-game text-[9px]">
                <span>EMAIL CHANNEL</span>
                <span className="text-emerald-500">PRIMARY</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleCopy(contactData.email, "email")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer select-none font-mono"
                  title="Copy Email Address"
                >
                  {copiedKey === "email" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">{isVi ? "Đã chép" : "Copied"}</span>
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
                <div className="text-[10px] text-slate-500 uppercase font-game">{isVi ? "ĐỊA CHỈ HÒM THƯ" : "EMAIL ADDRESS"}</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5 select-all">
                  {contactData.email}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {isVi
                  ? "Kênh liên hệ chính cho các cơ hội việc làm, phỏng vấn và trao đổi chuyên môn."
                  : "Primary contact channel for recruitment, interview invitations, and project discussions."}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.links.email}
                onClick={() => {
                  sfx.coin();
                  telemetry.track("click", "contact_direct_email");
                }}
                className="w-full inline-block"
              >
                <PixelButton
                  variant="primary"
                  size="md"
                  soundType="coin"
                  icon={<Mail className="w-4 h-4" />}
                  className="w-full text-xs font-game text-[10px]"
                >
                  {isVi ? "GỬI EMAIL TRỰC TIẾP" : "SEND DIRECT EMAIL"}
                </PixelButton>
              </a>
            </div>
          </PixelCard>

          {/* Card 2: Phone */}
          <PixelCard
            interactive
            variant="rpg"
            className="p-5 flex flex-col justify-between space-y-4"
            title={
              <div className="flex items-center justify-between w-full font-game text-[9px]">
                <span>PHONE / ZALO</span>
                <span className="text-emerald-500">DIRECT</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleCopy(contactData.phone, "phone")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer select-none font-mono"
                  title="Copy Phone Number"
                >
                  {copiedKey === "phone" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">{isVi ? "Đã chép" : "Copied"}</span>
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
                <div className="text-[10px] text-slate-500 uppercase font-game">{isVi ? "SỐ ĐIỆN THOẠI" : "PHONE NUMBER"}</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5 select-all">
                  {contactData.phone}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {isVi
                  ? "Sẵn sàng nhận cuộc gọi, tin nhắn SMS hoặc trao đổi nhanh qua Zalo."
                  : "Available for direct phone calls, SMS, or quick messaging via Zalo."}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.links.phone}
                onClick={() => {
                  sfx.coin();
                  telemetry.track("click", "contact_direct_phone");
                }}
                className="w-full inline-block"
              >
                <PixelButton
                  variant="secondary"
                  size="md"
                  soundType="coin"
                  icon={<Phone className="w-4 h-4" />}
                  className="w-full text-xs font-game text-[10px]"
                >
                  {isVi ? "GỌI ĐIỆN THOẠI" : "CALL PHONE"}
                </PixelButton>
              </a>
            </div>
          </PixelCard>

          {/* Card 3: Professional Profiles */}
          <PixelCard
            interactive
            variant="rpg"
            className="p-5 space-y-4"
            title="PROFESSIONAL NETWORKS"
          >
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                LinkedIn & GitHub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                {isVi
                  ? "Xem lịch sử nghề nghiệp chi tiết và các mã nguồn dự án trên GitHub."
                  : "Explore career timeline and open-source project repositories."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sfx.click();
                  telemetry.track("click", "contact_card_linkedin");
                }}
                className="flex items-center justify-between p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">LinkedIn</div>
                    <div className="text-[10px] text-slate-500">/in/satohjiro</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </a>

              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sfx.click();
                  telemetry.track("click", "contact_card_github");
                }}
                className="flex items-center justify-between p-3 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-slate-100 dark:hover:bg-slate-800 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-slate-900 dark:text-white" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">GitHub</div>
                    <div className="text-[10px] text-slate-500">/SatohJiro</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </a>
            </div>
          </PixelCard>

          {/* Card 4: Location & Work Mode */}
          <PixelCard
            interactive
            variant="rpg"
            className="p-5 space-y-4"
            title="GUILD HEADQUARTERS"
          >
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 font-sans">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{contactData.location[isVi ? "vi" : "en"]}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {isVi
                  ? "Sẵn sàng làm việc theo hình thức On-site tại TP. Hồ Chí Minh, Hybrid hoặc Remote cho các công ty trong và ngoài nước."
                  : "Available for On-site roles in Ho Chi Minh City, Hybrid setups, or Remote positions."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 font-game text-[9px]">
              <span className="px-2.5 py-1 border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold">
                [✓ {isVi ? "SẴN SÀNG NHẬN VIỆC" : "AVAILABLE TO JOIN"}]
              </span>
              <span className="px-2.5 py-1 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                [ON-SITE / HYBRID / REMOTE]
              </span>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}
