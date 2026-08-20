"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { ThemeToggle } from "./ThemeToggle";
import { SoundToggle } from "../game/SoundToggle";
import { PixelButton } from "../pixel/PixelButton";
import { sfx } from "@/lib/audio";
import {
  FileDown,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Layers,
  Cpu,
  Trophy,
  Terminal,
  Mail,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export function Navbar({ onOpenResumeModal }: NavbarProps) {
  const { isVi } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = siteConfig.navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    sfx.select();
    telemetry.track("click", `nav_${id}`);
    setMobileMenuOpen(false);
  };

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-3.5 h-3.5" />,
    User: <User className="w-3.5 h-3.5" />,
    Briefcase: <Briefcase className="w-3.5 h-3.5" />,
    Layers: <Layers className="w-3.5 h-3.5" />,
    Cpu: <Cpu className="w-3.5 h-3.5" />,
    Trophy: <Trophy className="w-3.5 h-3.5" />,
    Terminal: <Terminal className="w-3.5 h-3.5" />,
    Mail: <Mail className="w-3.5 h-3.5" />,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-150 ${scrolled
          ? "py-2 bg-white/95 dark:bg-slate-950/95 border-b-2 border-slate-900 dark:border-slate-100 shadow-[0_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0px_0px_rgba(255,255,255,0.05)]"
          : "py-3 bg-white/80 dark:bg-slate-950/80 border-b-2 border-slate-900/40 dark:border-slate-100/40"
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <Link
          href="#home"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="px-2.5 py-1 border-2 border-slate-900 dark:border-slate-100 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-mono font-bold text-xs shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
            NTA
          </div>
          <div className="hidden sm:block text-left font-mono">
            <div className="font-bold text-xs tracking-tight text-slate-900 dark:text-white leading-tight">
              {isVi ? "Nguyễn Trần Anh" : "Nguyen Tran Anh"}
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wider leading-tight">
              @SatohJiro
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 p-1 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]">
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold whitespace-nowrap transition-all duration-100 ${isActive
                    ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {iconMap[item.icon]}
                <span>{item.label[isVi ? "vi" : "en"]}</span>
              </Link>
            );
          })}
        </nav>

        {/* Compact Nav for Medium screens (lg to xl) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-0.5 p-1 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]">
          {siteConfig.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                title={item.label[isVi ? "vi" : "en"]}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-mono font-bold whitespace-nowrap transition-all duration-100 ${isActive
                    ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {iconMap[item.icon]}
                <span className="text-[11px]">{item.label[isVi ? "vi" : "en"]}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions (Sound, Theme, Download CV, Mobile Menu Toggle) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <SoundToggle />
          <ThemeToggle />

          <PixelButton
            onClick={() => {
              telemetry.track("download_cv", "navbar_cta");
              onOpenResumeModal();
            }}
            variant="primary"
            size="sm"
            icon={<FileDown className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex whitespace-nowrap"
          >
            {isVi ? "Tải CV" : "Resume"}
          </PixelButton>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-2 font-mono">
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 border-2 text-xs font-bold whitespace-nowrap transition-all ${isActive
                      ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                      : "border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    }`}
                >
                  {iconMap[item.icon]}
                  <span>{item.label[isVi ? "vi" : "en"]}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t-2 border-slate-900 dark:border-slate-100 flex justify-center">
            <PixelButton
              onClick={() => {
                telemetry.track("download_cv", "mobile_nav_cta");
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              variant="primary"
              size="md"
              icon={<FileDown className="w-4 h-4" />}
              className="w-full"
            >
              {isVi ? "Xem & Tải CV (PDF)" : "View & Download CV (PDF)"}
            </PixelButton>
          </div>
        </div>
      )}
    </header>
  );
}
