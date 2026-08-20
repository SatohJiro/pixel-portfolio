"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { awardsData } from "@/data/portfolio-content";
import { PixelCard } from "../pixel/PixelCard";
import { PixelBadge } from "../pixel/PixelBadge";
import { PixelButton } from "../pixel/PixelButton";
import {
  Trophy,
  Sparkles,
  Medal,
  Award,
  Building,
} from "lucide-react";
import confetti from "canvas-confetti";
import { telemetry } from "@/lib/telemetry";
import { sfx } from "@/lib/audio";

export function AwardsSection() {
  const { isVi } = useLanguage();

  const awardIcons: Record<string, React.ReactNode> = {
    Trophy: <Trophy className="w-5 h-5 text-amber-500" />,
    Sparkles: <Sparkles className="w-5 h-5 text-sky-500" />,
    Medal: <Medal className="w-5 h-5 text-indigo-500" />,
  };

  const handleCelebrate = (awardName: string) => {
    sfx.levelUp();
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
    <section id="awards" className="relative py-16 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <PixelBadge variant="amber" size="md">
            {isVi ? "PHÒNG TRƯNG BÀY CÚP & CHIẾN TÍCH" : "TROPHY ROOM & BOSS DEFEATS"}
          </PixelBadge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            {isVi ? "Cúp Vinh Danh & Danh Hiệu Đạt Được" : "Trophy Room & Key Recognitions"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            {isVi
              ? "Chiến tích vinh quang được công nhận từ Nhà trường (Thủ khoa tốt nghiệp) và các đơn vị công nghệ."
              : "Legendary accolades awarded by university leadership and technology organizations."}
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awardsData.map((award) => (
            <PixelCard
              key={award.id}
              interactive
              variant="rpg"
              title={
                <div className="flex items-center justify-between w-full font-game text-[9px]">
                  <span>{award.year}</span>
                  <span className="text-amber-500 font-bold">
                    {award.badgeText[isVi ? "vi" : "en"]}
                  </span>
                </div>
              }
              className="flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-slate-900 dark:border-slate-100 bg-amber-100 dark:bg-amber-950/60 shadow-[2px_2px_0px_0px_#000]">
                    {awardIcons[award.iconName] || <Award className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug font-sans">
                      {award.title[isVi ? "vi" : "en"]}
                    </h3>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5 pt-1">
                  <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{award.organization[isVi ? "vi" : "en"]}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed pt-1">
                  {award.description[isVi ? "vi" : "en"]}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-slate-900 dark:border-slate-100">
                <PixelButton
                  onClick={() => handleCelebrate(award.title.en)}
                  variant="outline"
                  size="sm"
                  soundType="levelUp"
                  className="w-full text-xs font-game text-[10px]"
                >
                  {isVi ? "CHÚC MỪNG 🎉" : "CELEBRATE 🎉"}
                </PixelButton>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
}
