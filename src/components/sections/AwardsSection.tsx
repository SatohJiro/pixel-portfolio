"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { GlassCard } from "../glass/GlassCard";
import { GlassBadge } from "../glass/GlassBadge";
import { GlassButton } from "../glass/GlassButton";
import {
  Trophy,
  Sparkles,
  Medal,
  Award,
  PartyPopper,
  Building,
} from "lucide-react";
import confetti from "canvas-confetti";
import { telemetry } from "@/lib/telemetry";

export function AwardsSection() {
  const { isVi, isEn } = useLanguage();

  const awardIcons: Record<string, React.ReactNode> = {
    Trophy: <Trophy className="w-6 h-6 text-amber-500" />,
    Sparkles: <Sparkles className="w-6 h-6 text-cyan-500" />,
    Medal: <Medal className="w-6 h-6 text-indigo-500" />,
  };

  const handleCelebrate = (awardName: string) => {
    telemetry.track("click", `celebrate_award_${awardName}`);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="awards" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <GlassBadge variant="amber" size="md">
            {isVi ? "Thành Tích & Giải Thưởng" : "Honors & Awards"}
          </GlassBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isVi ? (
              <>
                Giải Thưởng & <span className="text-gradient-amber">Ghi Nhận Đóng Góp</span>
              </>
            ) : (
              <>
                Honors & <span className="text-gradient-amber">Key Recognitions</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isVi
              ? "Sự ghi nhận từ nhà trường và công ty cho thành tích học tập xuất sắc và đóng góp phát triển sản phẩm."
              : "Recognitions from university leadership and company teams for academic performance and project contributions."}
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awardsData.map((award) => (
            <GlassCard
              key={award.id}
              className="flex flex-col justify-between p-6 sm:p-7 space-y-6 border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/70"
              glowColor="none"
            >
              <div className="space-y-4">
                {/* Header Icon & Year */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xs">
                    {awardIcons[award.iconName] || <Award className="w-6 h-6 text-amber-500 dark:text-amber-400" />}
                  </div>
                  <GlassBadge variant={award.id === "valedictorian" ? "amber" : "cyan"} size="sm">
                    {award.year}
                  </GlassBadge>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {award.title[isVi ? "vi" : "en"]}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{award.badgeText[isVi ? "vi" : "en"]}</span>
                  </div>
                </div>

                {/* Organization */}
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5 pt-1">
                  <Building className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{award.organization[isVi ? "vi" : "en"]}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {award.description[isVi ? "vi" : "en"]}
                </p>
              </div>

              {/* Celebrate Button */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10">
                <GlassButton
                  onClick={() => handleCelebrate(award.title.en)}
                  variant="outline"
                  size="sm"
                  icon={<PartyPopper className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  className="w-full text-xs text-slate-800 dark:text-slate-200"
                >
                  {isVi ? "Chúc Mừng Thành Tích 🎉" : "Celebrate Honor 🎉"}
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
